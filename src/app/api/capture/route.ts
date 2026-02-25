import { NextRequest, NextResponse } from 'next/server';
import { captureOrder, isOrderCompleted } from '@/lib/paypal';
import { getProductById } from '@/data/products';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, productId } = body;

    if (!orderId || !productId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const captureResponse = await captureOrder(orderId);

    if (!isOrderCompleted(captureResponse)) {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Get product details
    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Return product content (prompts)
    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        prompts: product.prompts,
      },
      transactionId: captureResponse.id,
    });
  } catch (error) {
    console.error('Error capturing order:', error);
    return NextResponse.json(
      { error: 'Failed to capture order' },
      { status: 500 }
    );
  }
}

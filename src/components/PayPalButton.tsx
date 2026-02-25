'use client';

import { useEffect, useRef, useState } from 'react';
import { Product } from '@/data/products';

interface PayPalButtonProps {
  product: Product;
  onSuccess: (data: { product: { id: string; name: string; prompts: string[] }; transactionId: string }) => void;
  onError: (error: Error) => void;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError: (err: Error) => void;
      }) => {
        render: (container: string) => void;
      };
    };
  }
}

export default function PayPalButton({ product, onSuccess, onError }: PayPalButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scriptId = 'paypal-sdk';

    // Check if script is already loaded
    if (document.getElementById(scriptId)) {
      setIsLoaded(true);
      return;
    }

    // Load PayPal SDK
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
    };

    script.onerror = () => {
      setError('Failed to load PayPal SDK');
    };

    document.body.appendChild(script);

    return () => {
      // Don't remove the script on unmount to avoid reloading issues
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.paypal || !containerRef.current) return;

    // Clear any existing buttons
    containerRef.current.innerHTML = '';

    window.paypal.Buttons({
      createOrder: async () => {
        try {
          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: product.price,
              productName: product.name,
              productId: product.id,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to create order');
          }

          const order = await response.json();
          return order.id;
        } catch (err) {
          onError(err as Error);
          throw err;
        }
      },
      onApprove: async (data) => {
        try {
          const response = await fetch('/api/capture', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: data.orderID,
              productId: product.id,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to capture payment');
          }

          const result = await response.json();
          onSuccess(result);
        } catch (err) {
          onError(err as Error);
        }
      },
      onError: (err) => {
        onError(err);
      },
    }).render(`#paypal-button-container-${product.id}`);

  }, [isLoaded, product, onSuccess, onError]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        {error}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
        <span className="ml-2 text-gray-500">Loading payment...</span>
      </div>
    );
  }

  return (
    <div id={`paypal-button-container-${product.id}`} ref={containerRef} className="w-full" />
  );
}

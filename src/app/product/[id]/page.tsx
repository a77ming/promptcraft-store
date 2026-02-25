'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PayPalButton from '@/components/PayPalButton';
import { getProductById, products } from '@/data/products';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = getProductById(productId);

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [purchasedContent, setPurchasedContent] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  if (!product) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">产品未找到</h1>
          <Link href="/" className="text-violet-600 hover:underline">返回首页</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handlePaymentSuccess = (data: { product: { id: string; name: string; prompts: string[] }; transactionId: string }) => {
    setPaymentStatus('success');
    setPurchasedContent(data.product.prompts);
  };

  const handlePaymentError = (error: Error) => {
    setPaymentStatus('error');
    setErrorMessage(error.message);
  };

  // Show purchased content
  if (paymentStatus === 'success') {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">购买成功！</h1>
            <p className="text-gray-600">感谢您的购买，以下是您获取的提示词内容：</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{product.name}</h2>

            <div className="space-y-6">
              {purchasedContent.map((prompt, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-violet-600">提示词 #{index + 1}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(prompt);
                        alert('已复制到剪贴板！');
                      }}
                      className="text-sm text-violet-600 hover:text-violet-700"
                    >
                      复制
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-gray-700 text-sm font-mono">{prompt}</pre>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                💡 建议您将以上内容保存到本地，以便随时使用。
              </p>
              <button
                onClick={() => {
                  const content = purchasedContent.join('\n\n---\n\n');
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${product.name}-prompts.txt`;
                  a.click();
                }}
                className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors"
              >
                下载全部提示词
              </button>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="text-violet-600 hover:underline">
              返回首页继续购物
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-violet-600">首页</Link></li>
              <li><span className="text-gray-400">/</span></li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full rounded-2xl shadow-lg"
              />
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-medium">
                  限时优惠 -{discount}%
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="inline-block bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">已售 {product.salesCount.toLocaleString()} 份</span>
              </div>

              {/* Price */}
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-bold text-violet-600">${product.price}</span>
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                    省 ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>

                {/* Payment Section */}
                {paymentStatus === 'error' && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    支付失败：{errorMessage}
                  </div>
                )}

                <PayPalButton
                  product={product}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </div>

              {/* Features */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">包含内容</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">你可能还喜欢</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products
                .filter(p => p.id !== product.id)
                .slice(0, 3)
                .map(relatedProduct => (
                  <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-gray-900">{relatedProduct.name}</h3>
                      <p className="text-violet-600 font-bold">${relatedProduct.price}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">支付成功！</h1>
        <p className="text-gray-600">感谢您的购买</p>
        {transactionId && (
          <p className="text-sm text-gray-500 mt-2">
            交易ID: {transactionId}
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-gray-600 mb-6">
          您的提示词内容将在购买完成后显示在此页面。
        </p>
        <Link
          href="/"
          className="inline-block bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense fallback={
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
        </div>
      }>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}

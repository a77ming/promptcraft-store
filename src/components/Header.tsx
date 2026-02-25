'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              PromptCraft
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#products" className="text-gray-600 hover:text-violet-600 transition-colors">
              产品
            </Link>
            <Link href="#features" className="text-gray-600 hover:text-violet-600 transition-colors">
              特点
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-violet-600 transition-colors">
              常见问题
            </Link>
          </nav>

          <a
            href="#products"
            className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-violet-500/30 transition-all"
          >
            立即购买
          </a>
        </div>
      </div>
    </header>
  );
}

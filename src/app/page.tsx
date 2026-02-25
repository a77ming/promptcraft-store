import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16 md:py-24">
            <div className="inline-flex items-center px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium mb-6">
              <span className="animate-pulse mr-2">🔥</span>
              限时特惠 · 全场最高省70%
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              精选 AI 提示词
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                让你的 AI 效率翻倍
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              专业团队精心打磨的 100+ 高质量提示词，覆盖写作、编程、营销、商业、设计全领域。
              购买即用，永久有效。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-violet-500/30 transition-all"
              >
                立即选购
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold text-lg hover:border-violet-300 hover:text-violet-600 transition-all"
              >
                了解更多
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-violet-600">100+</div>
                <div className="text-gray-500 mt-1">精选提示词</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-violet-600">5K+</div>
                <div className="text-gray-500 mt-1">满意用户</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-violet-600">4.9</div>
                <div className="text-gray-500 mt-1">平均评分</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              选择适合你的提示词包
            </h2>
            <p className="text-xl text-gray-600">
              每个包都经过精心设计，确保实用性
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              为什么选择 PromptCraft?
            </h2>
            <p className="text-xl text-gray-600">
              我们专注于提供最实用的 AI 提示词
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">质量保证</h3>
              <p className="text-gray-600">
                每个提示词都经过专业团队测试优化，确保输出效果优秀
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">即买即用</h3>
              <p className="text-gray-600">
                购买后立即获得完整内容，无需等待，马上提升效率
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">持续更新</h3>
              <p className="text-gray-600">
                购买后永久有效，且持续免费更新新的提示词内容
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              常见问题
            </h2>
          </div>

          <div className="space-y-6">
            <details className="group border border-gray-200 rounded-xl p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-gray-900">购买后如何获取内容？</h3>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                支付成功后，页面会立即显示完整的提示词内容。同时你也可以通过邮件获取内容链接。
              </p>
            </details>

            <details className="group border border-gray-200 rounded-xl p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-gray-900">提示词适用于哪些 AI 工具？</h3>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                我们的提示词适用于 ChatGPT、Claude、文心一言等主流 AI 对话工具。大部分提示词也适用于 Midjourney、Stable Diffusion 等图像生成工具。
              </p>
            </details>

            <details className="group border border-gray-200 rounded-xl p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-gray-900">支持退款吗？</h3>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                由于数字商品的特殊性，购买后不支持退款。但我们承诺每个提示词都经过严格测试，确保实用性。
              </p>
            </details>

            <details className="group border border-gray-200 rounded-xl p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <h3 className="font-semibold text-gray-900">购买后会有更新吗？</h3>
                <span className="text-gray-500 group-open:rotate-180 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 text-gray-600">
                是的！购买后您将永久获得该提示词包的所有更新，无需额外付费。
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            准备好提升你的 AI 效率了吗？
          </h2>
          <p className="text-xl text-violet-100 mb-8">
            立即获取专业提示词，让 AI 为你创造更多价值
          </p>
          <a
            href="#products"
            className="inline-block bg-white text-violet-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all"
          >
            立即选购
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">PromptCraft</span>
            </div>
            <p className="text-gray-400 max-w-md">
              精选高质量AI提示词，助你释放AI的全部潜力。专业团队精心打磨，持续更新。
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><Link href="#products" className="hover:text-violet-400 transition-colors">产品</Link></li>
              <li><Link href="#features" className="hover:text-violet-400 transition-colors">特点</Link></li>
              <li><Link href="#faq" className="hover:text-violet-400 transition-colors">常见问题</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">支持</h3>
            <ul className="space-y-2">
              <li><a href="mailto:support@promptcraft.store" className="hover:text-violet-400 transition-colors">联系我们</a></li>
              <li><Link href="/privacy" className="hover:text-violet-400 transition-colors">隐私政策</Link></li>
              <li><Link href="/terms" className="hover:text-violet-400 transition-colors">服务条款</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} PromptCraft Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

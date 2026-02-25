# PromptCraft Store

精选 AI 提示词商店 - 购买高质量 AI 提示词，提升你的 AI 使用效率。

## 功能特点

- 🎨 精美的响应式设计
- 💳 PayPal 支付集成
- 📦 6 个精心设计的提示词包
- ⚡ 基于 Next.js 14 的快速性能
- 🎯 购买后即时内容交付

## 产品

| 产品 | 描述 | 价格 |
|------|------|------|
| 写作大师提示词包 | 20+专业写作提示词 | $19.99 |
| 编程高手提示词包 | 30+编程提示词 | $29.99 |
| 营销专家提示词包 | 25+营销提示词 | $24.99 |
| 商业策略提示词包 | 20+商业策略提示词 | $34.99 |
| 创意设计提示词包 | 25+设计相关提示词 | $22.99 |
| 全能大师包 | 100+提示词全收录 | $69.99 |

## 本地开发

```bash
# 安装依赖
npm install

# 创建 .env.local 文件并添加以下变量
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox

# 启动开发服务器
npm run dev
```

## 部署到 Vercel

### 方法一：通过 Vercel Dashboard

1. 访问 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入你的 GitHub 仓库 `a77ming/promptcraft-store`
4. 添加环境变量：
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
   - `PAYPAL_MODE`
5. 点击 "Deploy"

### 方法二：通过 CLI

```bash
npm i -g vercel
vercel
```

## 环境变量

| 变量名 | 描述 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal 客户端 ID | ARHnt3ft... |
| `PAYPAL_CLIENT_SECRET` | PayPal 客户端密钥 | EBYWnov6... |
| `PAYPAL_MODE` | PayPal 模式 | sandbox 或 live |

## 技术栈

- [Next.js 14](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [PayPal JS SDK](https://developer.paypal.com/docs/archive/javascript-sdk/) - 支付集成

## License

MIT

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  category: string;
  features: string[];
  prompts: string[];
  imageUrl: string;
  salesCount: number;
  rating: number;
}

export const products: Product[] = [
  {
    id: "writing-master",
    name: "写作大师提示词包",
    description: "包含20+专业写作提示词，涵盖文章写作、文案创作、故事编写等多种场景。让你轻松创作出高质量内容，告别写作障碍。",
    shortDescription: "20+专业写作提示词，解决所有写作难题",
    price: 19.99,
    originalPrice: 49.99,
    category: "写作",
    features: [
      "20+精选写作提示词",
      "支持中英文写作",
      "多种文体覆盖",
      "持续更新",
      "购买后永久使用"
    ],
    prompts: [
      "## 专业文章写手\n你是一位经验丰富的专业文章写手，擅长创作引人入胜的内容。请根据以下要求撰写文章：\n\n主题：[输入主题]\n目标读者：[输入目标读者]\n文章长度：[输入字数]\n风格：[正式/轻松/专业/幽默]\n\n要求：\n1. 开头要吸引眼球\n2. 结构清晰，逻辑连贯\n3. 包含具体案例或数据\n4. 结尾有力，引发思考",
      "## 营销文案专家\n你是一位顶尖的营销文案专家，深谙消费者心理。请为以下产品创作营销文案：\n\n产品名称：[输入产品名]\n产品特点：[输入特点]\n目标用户：[输入目标用户]\n主要卖点：[输入卖点]\n\n请创作：\n1. 一个吸引眼球的标题\n2. 3-5个产品优势描述\n3. 一个强有力的行动号召",
      "## 故事创作助手\n你是一位才华横溢的故事创作者。请根据以下元素创作一个引人入胜的故事：\n\n故事类型：[悬疑/爱情/科幻/奇幻/其他]\n主要角色：[描述角色]\n故事背景：[描述背景]\n核心冲突：[描述冲突]\n\n要求：\n1. 情节跌宕起伏\n2. 人物性格鲜明\n3. 结局出人意料但合乎逻辑"
    ],
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    salesCount: 1280,
    rating: 4.9
  },
  {
    id: "coding-genius",
    name: "编程高手提示词包",
    description: "专为开发者打造的编程提示词集合，涵盖代码审查、调试、架构设计、代码优化等多个维度，助你提升10倍开发效率。",
    shortDescription: "30+编程提示词，提升开发效率10倍",
    price: 29.99,
    originalPrice: 79.99,
    category: "编程",
    features: [
      "30+编程相关提示词",
      "支持多种编程语言",
      "代码审查与优化",
      "架构设计指导",
      "Bug修复助手"
    ],
    prompts: [
      "## 代码审查专家\n你是一位资深的代码审查专家，请对以下代码进行全面审查：\n\n```\n[粘贴代码]\n```\n\n请从以下维度进行审查：\n1. 代码质量与可读性\n2. 潜在的Bug或安全问题\n3. 性能优化建议\n4. 最佳实践建议\n5. 重构建议\n\n请给出具体的修改建议和示例代码。",
      "## Bug修复助手\n你是一位经验丰富的调试专家。请帮助分析以下Bug：\n\n问题描述：[描述问题]\n期望行为：[描述期望]\n实际行为：[描述实际]\n相关代码：\n```\n[粘贴相关代码]\n```\n\n请分析：\n1. 可能的原因\n2. 推荐的解决方案\n3. 预防措施",
      "## 系统架构师\n你是一位经验丰富的系统架构师。请帮助设计以下系统：\n\n需求描述：[描述需求]\n预期用户量：[用户量]\n性能要求：[性能要求]\n\n请提供：\n1. 系统架构图描述\n2. 技术栈推荐\n3. 数据库设计\n4. 关键技术决策\n5. 扩展性考虑"
    ],
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    salesCount: 856,
    rating: 4.8
  },
  {
    id: "marketing-pro",
    name: "营销专家提示词包",
    description: "数字营销全攻略提示词，包含SEO优化、社媒运营、广告文案、用户增长等核心模块，让你的营销效果翻倍。",
    shortDescription: "25+营销提示词，打造爆款营销策略",
    price: 24.99,
    originalPrice: 59.99,
    category: "营销",
    features: [
      "25+营销专业提示词",
      "SEO优化指南",
      "社媒内容创作",
      "广告文案撰写",
      "用户增长策略"
    ],
    prompts: [
      "## SEO优化专家\n你是一位资深的SEO专家。请为以下网站提供SEO优化方案：\n\n网站类型：[输入类型]\n目标关键词：[输入关键词]\n当前问题：[描述问题]\n\n请提供：\n1. 关键词优化建议\n2. 内容策略\n3. 技术SEO检查清单\n4. 外链建设方案\n5. 预期效果时间线",
      "## 社媒内容策划师\n你是一位社交媒体营销专家。请为以下品牌策划社媒内容：\n\n品牌名称：[输入品牌]\n行业：[输入行业]\n目标平台：[微信/抖音/小红书/微博]\n目标用户：[描述用户]\n\n请提供一周内容日历：\n1. 每天主题\n2. 内容形式建议\n3. 互动策略\n4. 话题标签",
      "## 广告文案大师\n你是一位顶级广告文案撰写人。请为以下产品创作广告文案：\n\n产品：[输入产品]\n卖点：[输入卖点]\n投放平台：[输入平台]\n预算：[输入预算]\n\n请创作：\n1. 5个标题变体\n2. 3个正文版本\n3. CTA按钮文案\n4. A/B测试建议"
    ],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    salesCount: 1523,
    rating: 4.9
  },
  {
    id: "business-strategy",
    name: "商业策略提示词包",
    description: "创业者必备的商业策略提示词，涵盖商业计划、竞品分析、融资路演、团队管理等关键场景。",
    shortDescription: "商业策略全套提示词，创业者必备",
    price: 34.99,
    originalPrice: 89.99,
    category: "商业",
    features: [
      "20+商业策略提示词",
      "商业计划书模板",
      "竞品分析框架",
      "融资路演准备",
      "团队管理指南"
    ],
    prompts: [
      "## 商业计划书专家\n你是一位经验丰富的商业顾问。请帮助撰写商业计划书：\n\n项目名称：[输入项目]\n行业：[输入行业]\n创业阶段：[阶段]\n\n请提供以下章节框架：\n1. 执行摘要\n2. 市场分析\n3. 产品/服务描述\n4. 商业模式\n5. 竞争分析\n6. 团队介绍\n7. 财务预测\n8. 融资需求",
      "## 竞品分析专家\n请对以下竞品进行全面分析：\n\n我的产品：[描述产品]\n竞品名称：[输入竞品]\n竞品网址：[输入网址]\n\n请从以下维度分析：\n1. 产品功能对比\n2. 定价策略\n3. 目标用户\n4. 营销策略\n5. 优劣势分析\n6. 差异化建议",
      "## 融资路演教练\n你是一位成功的融资顾问。请帮助准备融资路演：\n\n公司名称：[输入公司]\n融资轮次：[轮次]\n融资金额：[金额]\n行业：[行业]\n\n请提供：\n1. 路演PPT结构（10-12页）\n2. 核心话术\n3. 可能的问题及回答\n4. 投资人关注重点"
    ],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    salesCount: 678,
    rating: 4.7
  },
  {
    id: "creative-design",
    name: "创意设计提示词包",
    description: "设计师的AI助手，包含UI/UX设计、品牌设计、插画创作、Logo设计等创意提示词。",
    shortDescription: "设计师必备，创意无限",
    price: 22.99,
    originalPrice: 54.99,
    category: "设计",
    features: [
      "25+设计相关提示词",
      "UI/UX设计指南",
      "品牌视觉设计",
      "AI绘画提示词",
      "设计评审助手"
    ],
    prompts: [
      "## UI/UX设计专家\n你是一位资深的UI/UX设计师。请对以下界面提供设计建议：\n\n产品类型：[输入类型]\n目标用户：[描述用户]\n当前问题：[描述问题]\n\n请提供：\n1. 用户旅程分析\n2. 信息架构建议\n3. 视觉设计建议\n4. 交互设计要点\n5. 可用性改进建议",
      "## AI绘画提示词工程师\n请帮助生成高质量的AI绘画提示词：\n\n描述：[描述想要的图像]\n风格：[输入风格]\n用途：[输入用途]\n\n请生成：\n1. 详细的英文Prompt\n2. 负面提示词\n3. 参数建议（尺寸、风格强度等）\n4. 多个变体版本",
      "## 品牌设计顾问\n你是一位品牌设计专家。请为以下品牌提供设计建议：\n\n品牌名称：[输入名称]\n行业：[输入行业]\n品牌定位：[描述定位]\n目标用户：[描述用户]\n\n请提供：\n1. 品牌调性关键词\n2. 色彩方案建议\n3. 字体搭配建议\n4. 视觉元素建议\n5. Logo设计方向"
    ],
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    salesCount: 934,
    rating: 4.8
  },
  {
    id: "all-in-one",
    name: "全能大师包（限时特惠）",
    description: "包含以上所有提示词包的完整合集！100+精选提示词，覆盖写作、编程、营销、商业、设计全领域，一次购买，终身受益。",
    shortDescription: "100+提示词全收录，超值合集",
    price: 69.99,
    originalPrice: 199.99,
    category: "合集",
    features: [
      "100+精选提示词",
      "5大领域全覆盖",
      "持续免费更新",
      "优先客服支持",
      "未来新包免费"
    ],
    prompts: [
      "此包包含所有其他提示词包的完整内容",
      "涵盖：写作大师 + 编程高手 + 营销专家 + 商业策略 + 创意设计",
      "购买后即可获取所有提示词"
    ],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    salesCount: 2156,
    rating: 5.0
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

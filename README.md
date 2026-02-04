# 个人导航网站

> 一个现代化的个人导航网站，用于展示和管理 249 个精心收集的网站链接，涵盖 12 个不同分类

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/next.js-16.0-black.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue.svg)
![Tailwind](https://img.shields.io/badge/tailwind-4.0-38bdf8.svg)

---

## 项目介绍

个人导航网站是一个现代化的网站导航工具，帮助用户高效管理和访问常用的网站链接。项目包含 249 个精心收集的网站链接，涵盖 12 个不同分类，提供实时搜索、分类导航、深色模式等功能。

### 核心特性

- **📱 响应式设计**: 完美支持移动端和桌面端
- **🔍 实时搜索**: 快速查找目标网站
- **🏷️ 分类导航**: 12 个精心组织的分类
- **🌓 深色模式**: 支持浅色/深色主题切换
- **⚡ 快速加载**: 优化的性能和用户体验
- **🎨 美观 UI**: 现代化的卡片式设计
- **🎯 SEO 优化**: 静态生成，零服务器成本

---

## 功能清单

| 功能名称 | 功能说明 | 技术栈 | 状态 |
|---------|---------|--------|------|
| 响应式设计 | 移动端和桌面端自适应 | Tailwind CSS | ✅ 稳定 |
| 实时搜索 | 快速过滤和查找网站 | React Hooks | ✅ 稳定 |
| 分类导航 | 12 个分类展示 | TypeScript | ✅ 稳定 |
| 深色模式 | 浅色/深色主题切换 | localStorage | ✅ 稳定 |
| 网站图标 | 自动获取网站 Favicon | Google API | ✅ 稳定 |
| 数据管理 | Excel 转 JSON | Python | ✅ 稳定 |

---

## 技术架构

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.0 | React 框架 |
| React | 19.2 | UI 库 |
| TypeScript | 5.0 | 类型系统 |
| Tailwind CSS | 4.0 | CSS 框架 |
| Lucide Icons | 0.556 | 图标库 |

---

## 安装说明

### 环境要求

- Node.js 18+
- npm / pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

---

## 使用说明

### 基础使用

```
浏览分类 → 搜索网站 → 点击访问 → 主题切换
```

1. **浏览分类**: 12 个分类展示不同的网站类型
2. **搜索网站**: 在搜索栏输入关键词快速过滤
3. **点击访问**: 点击卡片直接跳转到目标网站
4. **主题切换**: 点击右上角切换深色/浅色模式

### 数据更新

```bash
# 1. 编辑 Excel 文件（项目父目录）
vi ../website_links_complete.xlsx

# 2. 运行转换脚本
python3 scripts/convert-excel.py

# 3. 提交更改
git add public/data/links.json
git commit -m "Update links data"
git push
```

---

## 配置说明

### 部署配置

项目支持多种部署方式，配置文件如下：

| 部署方式 | 配置文件 |
|---------|---------|
| Vercel | `vercel.json` |
| Netlify | `netlify.toml` |
| EdgeOne | 手动配置 |

### 构建配置

```json
{
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

---

## 项目结构

```
navigation-website/
├── app/                      # Next.js App Router
│   ├── components/           # React 组件
│   │   ├── CategorySection.tsx  # 分类区域
│   │   ├── LinkCard.tsx         # 链接卡片
│   │   ├── SearchBar.tsx        # 搜索栏
│   │   └── ThemeToggle.tsx      # 主题切换
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 首页
├── lib/                     # 工具库
│   └── types.ts             # TypeScript 类型
├── public/                  # 静态资源
│   └── data/
│       └── links.json       # 链接数据（249 个）
├── scripts/                 # 脚本工具
│   └── convert-excel.py     # Excel 转 JSON
├── .gitignore
├── next.config.ts           # Next.js 配置
├── tailwind.config.ts       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
├── package.json             # 项目依赖
├── vercel.json              # Vercel 配置
├── netlify.toml             # Netlify 配置
└── README.md                # 本文件
```

---

## 开发指南

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run lint

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

### 脚本工具

```bash
# 快速启动
bash quick-start.sh

# 转换 Excel 数据
python3 scripts/convert-excel.py

# 验证数据格式
cat public/data/links.json | head -20
```

---

## 部署指南

### Vercel（推荐）

1. **推送代码到 GitHub**
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

2. **在 Vercel 部署**
   - 访问 [Vercel](https://vercel.com) 并登录
   - 点击 "Add New Project"
   - 导入你的 GitHub 仓库
   - Vercel 会自动检测 Next.js 配置并部署
   - 部署成功后获得 `.vercel.app` 域名

3. **自定义域名（可选）**
   - 在 Vercel 项目设置中进入 "Domains"
   - 添加自定义域名
   - 配置 DNS 记录

### Netlify

1. **推送代码到 GitHub**（同上）

2. **在 Netlify 部署**
   - 访问 [Netlify](https://www.netlify.com) 并登录
   - 点击 "Add new site" > "Import an existing project"
   - 选择 GitHub 仓库
   - Netlify 自动读取 `netlify.toml` 配置
   - 点击 "Deploy site"

**构建设置：**
- Build command: `npm run build`
- Publish directory: `.next`

### EdgeOne（国内访问优化）

1. **构建静态文件**
```bash
npm run build
```

2. **部署到 EdgeOne**
   - 登录 [EdgeOne 控制台](https://edgeone.ai)
   - 创建静态网站托管服务
   - 上传 `.next` 目录
   - 配置 CDN 和域名

---

## 性能指标

| 指标 | 数值 |
|------|------|
| 首屏加载时间 | < 2 秒 |
| Lighthouse 性能评分 | 90+ |
| 总包体积 | < 100 KB (gzip) |
| 静态生成 | 零服务器成本 |

---

## 常见问题

<details>
<summary>Q: 构建失败，找不到数据文件？</summary>

A: 确保 `public/data/links.json` 文件存在，运行 `python3 scripts/convert-excel.py` 生成数据。
</details>

<details>
<summary>Q: TypeScript 类型错误？</summary>

A: 确保 `lib/types.ts` 文件存在，运行 `npm run build` 检查类型错误。
</details>

<details>
<summary>Q: Tailwind 样式不生效？</summary>

A: 确保 `app/globals.css` 第一行是 `@import "tailwindcss";`，检查 `tailwind.config.ts` 配置。
</details>

<details>
<summary>Q: 深色模式不工作？</summary>

A: 检查浏览器 localStorage 是否启用，清除浏览器缓存和 localStorage。
</details>

<details>
<summary>Q: 搜索功能无反应？</summary>

A: 检查浏览器控制台是否有 JavaScript 错误，确保 `public/data/links.json` 数据格式正确。
</details>

<details>
<summary>Q: 网站图标显示不正常？</summary>

A: 图标从 Google API 获取，检查网络连接，某些网站可能没有 favicon。
</details>

<details>
<summary>Q: Vercel 部署失败？</summary>

A: 检查本地构建 `npm run build`，查看 Vercel 部署日志获取详细错误。
</details>

---

## 页脚信息

网站底部包含以下信息：
- **更新日期**: 自动显示最新的数据更新时间
- **联系方式**: 微信和邮箱
- **技术支持**: 由 Next.js 和 OpenSpec 提供

---

## 联系方式

- **微信**: laohaibao2025
- **邮箱**: 75271002@qq.com

---

## License

MIT License

---

## 致谢

本项目由以下技术和工具构建：

- **[Claude](https://claude.ai)** - AI 编程助手
- **[OpenSpec](https://github.com/anthropics/openspec)** - 开源规范
- **[Next.js](https://nextjs.org/)** - React 框架
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS 框架
- **[Lucide Icons](https://lucide.dev/)** - 图标库

---

## 技术交流群

欢迎加入技术交流群，分享你的使用心得和反馈建议：

![技术交流群](https://mypicture-1258720957.cos.ap-nanjing.myqcloud.com/Obsidian/image-20260204143234495.png)

---

## 打赏

如果这个项目对你有帮助，欢迎请我喝杯咖啡 ☕

**微信支付**

![微信支付](https://mypicture-1258720957.cos.ap-nanjing.myqcloud.com/Obsidian/image-20250914152855543.png)

---

## Star History

如果觉得项目不错，欢迎点个 Star ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=xiaohuihui202504/navigation-website&type=Date)](https://star-history.com/#xiaohuihui202504/navigation-website&Date)

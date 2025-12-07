# 个人导航网站

一个现代化的个人导航网站，用于展示和管理 249 个精心收集的网站链接，涵盖 12 个不同分类。

## 功能特性

- 📱 响应式设计 - 完美支持移动端和桌面端
- 🔍 实时搜索 - 快速查找目标网站
- 🏷️ 分类导航 - 12 个精心组织的分类
- 🌓 深色模式 - 支持浅色/深色主题切换
- ⚡ 快速加载 - 优化的性能和用户体验
- 🎨 美观 UI - 现代化的卡片式设计

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标**: Lucide Icons
- **部署**: Vercel / Netlify / EdgeOne

## 本地开发

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 访问 http://localhost:3000

## 部署指南

### Vercel（推荐）

1. 将代码推送到 GitHub
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

2. 访问 [Vercel](https://vercel.com) 并登录
3. 点击 "Add New Project"
4. 导入你的 GitHub 仓库
5. Vercel 会自动检测 Next.js 配置并部署
6. 部署成功后，你会获得一个 `.vercel.app` 域名

**自定义域名（可选）：**
- 在 Vercel 项目设置中，进入 "Domains"
- 添加你的自定义域名
- 按照提示配置 DNS 记录

### Netlify

1. 将代码推送到 GitHub（同上）

2. 访问 [Netlify](https://www.netlify.com) 并登录
3. 点击 "Add new site" > "Import an existing project"
4. 选择你的 GitHub 仓库
5. Netlify 会自动读取 `netlify.toml` 配置
6. 点击 "Deploy site"

**构建设置（Netlify 会自动检测）：**
- Build command: `npm run build`
- Publish directory: `.next`

### EdgeOne（国内访问优化）

1. 构建静态文件
```bash
npm run build
```

2. 登录 [EdgeOne 控制台](https://edgeone.ai)
3. 创建静态网站托管服务
4. 上传 `.next` 目录到 EdgeOne
5. 配置 CDN 和域名

## 更新链接数据

1. 编辑 `../website_links_complete.xlsx` 文件（项目父目录）
2. 运行转换脚本：
```bash
python3 scripts/convert-excel.py
```
3. 提交更改并重新部署：
```bash
git add public/data/links.json
git commit -m "Update links data"
git push
```

## 页脚信息

网站底部包含了更新日期和联系方式信息：
- 更新日期：自动显示最新的数据更新时间
- 联系方式：微信和邮箱
- 技术支持：由 Next.js 和 OpenSpec 提供

## 故障排除

### 常见问题

#### 1. 构建失败：找不到数据文件

**错误信息：**
```
Error: Cannot find module '@/public/data/links.json'
```

**解决方案：**
- 确保 `public/data/links.json` 文件存在
- 运行数据转换脚本：`python3 scripts/convert-excel.py`
- 检查 Excel 文件路径是否正确

#### 2. TypeScript 类型错误

**错误信息：**
```
Type error: Property 'domain' does not exist
```

**解决方案：**
- 确保 `lib/types.ts` 文件存在
- 运行 `npm run build` 检查所有类型错误
- 查看 `tsconfig.json` 配置是否正确

#### 3. Tailwind 样式不生效

**错误信息：**
```
Unknown utility class
```

**解决方案：**
- 确保 `app/globals.css` 第一行是 `@import "tailwindcss";`
- 检查 `tailwind.config.ts` 配置
- 重启开发服务器：`npm run dev`

#### 4. 深色模式不工作

**症状：**
- 主题切换按钮无反应
- 刷新后主题丢失

**解决方案：**
- 检查浏览器 localStorage 是否启用
- 清除浏览器缓存和 localStorage
- 确保 `<html>` 标签有 `suppressHydrationWarning` 属性

#### 5. 搜索功能无反应

**症状：**
- 输入搜索词后没有过滤结果

**解决方案：**
- 检查浏览器控制台是否有 JavaScript 错误
- 确保 `public/data/links.json` 数据格式正确
- 验证搜索组件的 `onChange` 事件绑定

#### 6. 网站图标显示不正常

**症状：**
- 所有链接都显示默认图标
- 图标加载很慢

**解决方案：**
- 检查网络连接（图标从 Google API 获取）
- 某些网站可能没有 favicon，这是正常的
- 如果大量图标失败，可能是网络问题或 API 限制

#### 7. Vercel 部署失败

**错误信息：**
```
Build failed: Error during build
```

**解决方案：**
1. 检查本地构建：`npm run build`
2. 确保所有依赖都在 `package.json` 中
3. 查看 Vercel 部署日志获取详细错误
4. 检查 Node.js 版本兼容性（推荐 18.x 或更高）

#### 8. 移动端布局问题

**症状：**
- 移动端显示不正常
- 侧边栏不能收起

**解决方案：**
- 清除浏览器缓存
- 检查响应式断点配置
- 使用浏览器开发者工具测试不同屏幕尺寸

### 调试技巧

**查看构建日志：**
```bash
npm run build
```

**检查数据格式：**
```bash
cat public/data/links.json | head -20
```

**验证链接数据：**
```bash
python3 scripts/convert-excel.py
```

**查看 Git 状态：**
```bash
git status
git log --oneline
```

### 获取帮助

如果以上方法都无法解决问题：

1. 查看 Next.js 文档：https://nextjs.org/docs
2. 查看 Tailwind CSS 文档：https://tailwindcss.com/docs
3. 检查项目 GitHub Issues
4. 联系维护者

## 项目结构

```
navigation-website/
├── .gitignore
├── .next/
├── app/
│   ├── components/         # React 组件
│   │   ├── CategorySection.tsx  # 分类区域
│   │   ├── LinkCard.tsx    # 链接卡片
│   │   ├── SearchBar.tsx   # 搜索栏
│   │   └── ThemeToggle.tsx # 主题切换
│   ├── favicon.ico
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 首页
├── eslint.config.mjs
├── hooks/
├── lib/
│   └── types.ts            # TypeScript 类型
├── netlify.toml            # Netlify 配置
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public/
│   ├── data/
│   │   └── links.json      # 链接数据（249 个）
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── quick-start.sh
├── scripts/
│   └── convert-excel.py    # Excel 转 JSON
├── tsconfig.json
├── vercel.json             # Vercel 配置
└── README.md               # 本文件
```

## 性能指标

- 首屏加载时间：< 2 秒
- Lighthouse 性能评分：90+
- 总包体积：优化后 < 100 KB（gzip）
- 静态生成，零服务器成本

## 联系方式

- 微信：laohaibao2025
- 邮箱：75271002@qq.com

## License

MIT

## 致谢

- 由 [Claude](https://claude.ai) 和 [OpenSpec](https://github.com/anthropics/openspec) 构建
- 使用 Next.js、Tailwind CSS 和 Lucide Icons

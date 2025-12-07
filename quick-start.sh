#!/bin/bash
# Navigation Website 快速启动脚本

echo "🚀 Navigation Website 快速启动"
echo "================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，请先安装 Node.js 18.x 或更高版本"
    echo "   下载地址: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js 版本: $(node --version)"
echo ""

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 未检测到 npm"
    exit 1
fi

echo "✓ npm 版本: $(npm --version)"
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 请在 navigation-website 目录下运行此脚本"
    exit 1
fi

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo "✓ 依赖安装完成"
    echo ""
fi

# 检查数据文件
if [ ! -f "public/data/links.json" ]; then
    echo "⚠️  警告: 未找到链接数据文件"
    echo "   如果需要，请运行: python3 scripts/convert-excel.py"
    echo ""
fi

echo "🎯 选择操作:"
echo "  1) 启动开发服务器 (npm run dev)"
echo "  2) 构建生产版本 (npm run build)"
echo "  3) 启动生产服务器 (npm start)"
echo ""
read -p "请选择 [1-3]: " choice

case $choice in
    1)
        echo ""
        echo "🔥 启动开发服务器..."
        echo "访问: http://localhost:3000"
        echo ""
        npm run dev
        ;;
    2)
        echo ""
        echo "🔨 构建生产版本..."
        npm run build
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ 构建成功！"
            echo "运行 'npm start' 启动生产服务器"
        fi
        ;;
    3)
        echo ""
        echo "🚀 启动生产服务器..."
        echo "访问: http://localhost:3000"
        echo ""
        npm start
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

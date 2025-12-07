'use client';

import { useState, useMemo, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CategorySection from './components/CategorySection';
import ThemeToggle from './components/ThemeToggle';
import { LinksData, Category, Link } from '@/lib/types';
import { Menu } from 'lucide-react';

// 导入链接数据
import linksData from '@/public/data/links.json';

const data: LinksData = linksData as LinksData;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  // 搜索过滤逻辑
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return data.categories;
    }

    const query = searchQuery.toLowerCase();

    return data.categories
      .map((category) => ({
        ...category,
        links: category.links.filter(
          (link) =>
            link.name.toLowerCase().includes(query) ||
            link.description?.toLowerCase().includes(query) ||
            link.url.toLowerCase().includes(query) ||
            link.domain?.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.links.length > 0);
  }, [searchQuery]);

  // 计算匹配结果数量
  const resultsCount = useMemo(() => {
    return filteredCategories.reduce((sum, cat) => sum + cat.links.length, 0);
  }, [filteredCategories]);

  // 在客户端格式化日期，避免水合错误
  useEffect(() => {
    setFormattedDate(new Date(data.updatedAt).toLocaleDateString('zh-CN'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* 顶部导航栏 */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                海老豹个人导航
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                {data.totalCategories} 个分类 · {data.totalLinks} 个链接
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 侧边栏 - 分类导航 */}
        <aside
          className={`
            fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64
            bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
            overflow-y-auto z-10 transition-transform duration-300
            ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
              分类
            </h2>
            <ul className="space-y-1">
              {data.categories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#${category.id}`}
                    onClick={() => setShowSidebar(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {category.links.length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* 移动端侧边栏遮罩 */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* 主内容区域 */}
        <main className="flex-1 w-full">
          {/* 搜索栏 */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            resultsCount={searchQuery ? resultsCount : undefined}
          />

          {/* 内容区域 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  未找到匹配的链接
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                  试试其他搜索词
                </p>
              </div>
            )}
          </div>

          {/* 页脚 */}
          <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                {/* 左下角个人联系方式 */}
                <div className="flex flex-col">
                  <p className="font-medium">联系方式</p>
                  <p className="mt-1">微信: laohaibao2025</p>
                  <p>邮箱: 75271002@qq.com</p>
                </div>
                
                {/* 中心信息 */}
                <div className="text-center">
                  <p>
                    更新于 {formattedDate}
                  </p>
                  <p className="mt-2">
                    由{' '}
                    <a
                      href="https://github.com/wwwzhouhui/dify-for-dsl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      wwwzhouhui
                    </a>{' '}
                    和 OpenSpec 构建
                  </p>
                </div>
                
                {/* 右下角留空 */}
                <div></div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

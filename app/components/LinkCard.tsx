'use client';

import { ExternalLink, Globe } from 'lucide-react';
import { Link } from '@/lib/types';
import { useState } from 'react';

interface LinkCardProps {
  link: Link;
}

export default function LinkCard({ link }: LinkCardProps) {
  const [iconError, setIconError] = useState(false);
  
  const getFaviconUrl = (domain: string) => {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        {/* 网站图标 */}
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {link.domain ? (
            !iconError ? (
              <img
                src={getFaviconUrl(link.domain)}
                alt={`${link.name} icon`}
                className="w-6 h-6"
                onError={() => setIconError(true)}
              />
            ) : (
              <Globe className="w-6 h-6 text-gray-400" />
            )
          ) : (
            <Globe className="w-6 h-6 text-gray-400" />
          )}
        </div>

        {/* 链接信息 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {link.name}
            </h3>
            <ExternalLink className="flex-shrink-0 w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </div>

          {link.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {link.description}
            </p>
          )}

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500 truncate">
            {link.domain}
          </p>
        </div>
      </div>
    </a>
  );
}

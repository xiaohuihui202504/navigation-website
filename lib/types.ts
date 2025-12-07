// 链接数据类型定义

export interface Link {
  id: number;
  name: string;
  url: string;
  description: string | null;
  domain: string | null;
}

export interface Category {
  id: string;
  name: string;
  links: Link[];
}

export interface LinksData {
  version: string;
  updatedAt: string;
  totalLinks: number;
  totalCategories: number;
  categories: Category[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  tags: string[];
  author: string;
  language: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface NewsFilter {
  category?: string;
  language?: string;
  status?: string;
  author?: string;
  search?: string;
}

export type NewsCategory = 
  | 'Company News'
  | 'Industry Updates'
  | 'Product Launch'
  | 'Partnership'
  | 'Awards'
  | 'Research';
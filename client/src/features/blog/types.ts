export interface BlogPost {
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

export interface BlogFilter {
  category?: string;
  language?: string;
  status?: string;
  author?: string;
  search?: string;
}

export type BlogCategory = 
  | 'Technology'
  | 'Research'
  | 'Environment'
  | 'Industry News'
  | 'Company Updates'
  | 'Innovation';
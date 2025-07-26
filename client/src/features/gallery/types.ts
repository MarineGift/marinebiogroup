export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  language: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface GalleryFilter {
  category?: string;
  language?: string;
  status?: string;
  search?: string;
}

export interface PaginatedGalleryResponse {
  data: GalleryItem[];
  total: number;
  page: number;
  limit: number;
}

export type GalleryCategory = 
  | 'Research' 
  | 'Products' 
  | 'Technology' 
  | 'Environment' 
  | 'Manufacturing'
  | 'Events'
  | 'Quality'
  | 'Company'
  | 'Education'
  | 'Awards'
  | 'Conservation'
  | 'Logistics'
  | 'Customer';
export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  features: string[];
  specifications: Record<string, string>;
  applications: string[];
  language: string;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilter {
  category?: string;
  language?: string;
  status?: string;
  search?: string;
}

export type ProductCategory = 
  | 'MarinePack' 
  | 'Marine Cream Bar' 
  | 'Marine Soap' 
  | 'Marine Cosmetics'
  | 'Industrial Solutions'
  | 'Research Materials';
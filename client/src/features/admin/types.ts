export interface AdminUser {
  id: string;
  username: string;
  email?: string;
  role: 'admin' | 'super_admin';
  firstName?: string;
  lastName?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

export interface AdminStats {
  totalContacts: number;
  todayContacts: number;
  totalNewsletters: number;
  todayNewsletters: number;
  totalBlogPosts: number;
  todayBlogPosts: number;
  totalNews: number;
  todayNews: number;
  totalGalleryItems: number;
  todayGalleryItems: number;
}
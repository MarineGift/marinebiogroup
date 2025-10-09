import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'marinebiogroup-nextjs'
    }
  }
})

// Types for database tables
export interface Contact {
  id: string
  name: string
  email: string
  inquiry_type: string
  message: string
  language: string
  site: string
  created_at: string
}

export interface Newsletter {
  id: string
  email: string
  language: string
  site: string
  subscribed_at: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  featured_image: string
  status: 'draft' | 'published' | 'archived'
  language: string
  site: string
  created_at: string
  updated_at: string
}

export interface News {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  featured_image: string
  status: 'draft' | 'published' | 'archived'
  language: string
  site: string
  created_at: string
  updated_at: string
}

export interface Gallery {
  id: string
  title: string
  description: string
  image_url: string
  alt_text: string
  category: string
  display_order: number
  status: 'draft' | 'published' | 'archived'
  language: string
  site: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description: string
  image_url: string
  category: string
  features: string[]
  specifications: Record<string, any>
  display_order: number
  status: 'draft' | 'published' | 'archived'
  language: string
  site: string
  created_at: string
  updated_at: string
}

export interface Carousel {
  id: string
  title: string
  description: string
  image_url: string
  link_url: string
  button_text: string
  display_order: number
  is_active: boolean
  language: string
  site: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  username: string
  email: string
  role: 'user' | 'admin' | 'super_admin'
  first_name: string
  last_name: string
  is_active: boolean
  site: string
  created_at: string
  updated_at: string
}
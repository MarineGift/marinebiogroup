// types/inquiry.ts
export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: 'pending' | 'answered' | 'closed'
  category: string
  priority: 'high' | 'medium' | 'low'
  created_at: string
  updated_at: string
  replied_at?: string
  reply_message?: string
}
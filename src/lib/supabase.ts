// src/lib/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Supabase 클라이언트가 사용 가능한지 확인
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

// 더미 클라이언트 (환경 변수가 없을 때 사용)
const dummyClient = {
  from: () => ({
    select: () => Promise.resolve({ data: [], error: new Error('Supabase not configured') }),
    insert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    update: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    delete: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    upsert: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
  }),
  auth: {
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: new Error('Supabase not configured') }),
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: new Error('Supabase not configured') }),
    signOut: () => Promise.resolve({ error: new Error('Supabase not configured') }),
    getUser: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase not configured') }),
    getSession: () => Promise.resolve({ data: { session: null }, error: new Error('Supabase not configured') }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    resetPasswordForEmail: () => Promise.resolve({ error: new Error('Supabase not configured') }),
  },
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      download: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      remove: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
    }),
  },
} as any

// 실제 Supabase 클라이언트 또는 더미 클라이언트 생성
export const supabase: SupabaseClient = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : dummyClient

// 환경 변수 체크 함수
export function checkSupabaseConfig(): { configured: boolean; missing: string[] } {
  const missing: string[] = []
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missing.push('NEXT_PUBLIC_SUPABASE_URL')
  }
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  
  return {
    configured: missing.length === 0,
    missing
  }
}

// 개발 환경에서 설정 상태 로그
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const config = checkSupabaseConfig()
  if (!config.configured) {
    console.warn('⚠️ Supabase 환경 변수가 설정되지 않았습니다:', config.missing)
    console.warn('샘플 데이터를 사용합니다. 실제 기능을 위해서는 다음 환경 변수를 설정해주세요:')
    config.missing.forEach(key => console.warn(`- ${key}`))
  } else {
    console.log('✅ Supabase 설정이 완료되었습니다.')
  }
}

// 안전한 Supabase 작업을 위한 헬퍼 함수들
export const safeSupabaseOperation = {
  // 안전한 데이터 조회
  async select<T = any>(table: string, query: string = '*'): Promise<{ data: T[] | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      console.warn(`Supabase 미설정: ${table} 테이블 조회 시도`)
      return { data: [], error: new Error('Supabase not configured') }
    }
    
    try {
      const { data, error } = await supabase.from(table).select(query)
      return { data: data as T[], error }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  },

  // 안전한 데이터 삽입
  async insert<T = any>(table: string, values: any): Promise<{ data: T | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      console.warn(`Supabase 미설정: ${table} 테이블 삽입 시도`)
      return { data: null, error: new Error('Supabase not configured') }
    }
    
    try {
      const { data, error } = await supabase.from(table).insert(values).select()
      return { data: data?.[0] as T, error }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  },

  // 안전한 데이터 업데이트
  async update<T = any>(table: string, values: any, condition: any): Promise<{ data: T | null; error: Error | null }> {
    if (!isSupabaseConfigured) {
      console.warn(`Supabase 미설정: ${table} 테이블 업데이트 시도`)
      return { data: null, error: new Error('Supabase not configured') }
    }
    
    try {
      const { data, error } = await supabase.from(table).update(values).match(condition).select()
      return { data: data?.[0] as T, error }
    } catch (error) {
      return { data: null, error: error as Error }
    }
  },

  // 안전한 데이터 삭제
  async delete(table: string, condition: any): Promise<{ error: Error | null }> {
    if (!isSupabaseConfigured) {
      console.warn(`Supabase 미설정: ${table} 테이블 삭제 시도`)
      return { error: new Error('Supabase not configured') }
    }
    
    try {
      const { error } = await supabase.from(table).delete().match(condition)
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }
}

// 개발용 샘플 데이터 생성 함수
export function generateSampleData() {
  return {
    inquiries: [
      {
        id: '1',
        name: '김철수',
        email: 'kim@example.com',
        phone: '010-1234-5678',
        subject: '제품 문의',
        message: '마린기프트 비누에 대해 자세히 알고 싶습니다. 성분과 효능에 대해 설명해주세요.',
        status: 'pending',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z',
        category: '제품문의',
        priority: 'high'
      },
      {
        id: '2',
        name: '이영희',
        email: 'lee@example.com',
        phone: '010-9876-5432',
        subject: '배송 관련 문의',
        message: '주문한 상품이 언제 도착하나요? 배송 추적이 안되고 있어서 문의드립니다.',
        status: 'answered',
        created_at: '2024-01-14T14:20:00Z',
        updated_at: '2024-01-14T14:20:00Z',
        category: '배송문의',
        priority: 'medium',
        replied_at: '2024-01-14T16:30:00Z',
        reply_message: '안녕하세요. 주문하신 상품은 내일(1월 15일) 도착 예정입니다. 배송 추적번호는 별도로 문자로 발송드리겠습니다.'
      },
      {
        id: '3',
        name: '박민수',
        email: 'park@example.com',
        phone: '010-5555-1234',
        subject: '환불 요청',
        message: '구매한 제품에 불만이 있어 환불을 요청합니다. 절차를 안내해주세요.',
        status: 'pending',
        created_at: '2024-01-13T09:15:00Z',
        updated_at: '2024-01-13T09:15:00Z',
        category: '환불문의',
        priority: 'high'
      },
      {
        id: '4',
        name: '정수진',
        email: 'jung@example.com',
        phone: '010-7777-8888',
        subject: '사용법 문의',
        message: '마린크림바 사용법을 자세히 알려주세요. 얼마나 자주 사용해야 하나요?',
        status: 'closed',
        created_at: '2024-01-12T16:45:00Z',
        updated_at: '2024-01-12T16:45:00Z',
        category: '사용법문의',
        priority: 'low',
        replied_at: '2024-01-12T18:00:00Z',
        reply_message: '마린크림바는 하루 1-2회 사용하시면 됩니다. 아침, 저녁으로 세안 후 사용하시길 권장드립니다.'
      },
      {
        id: '5',
        name: '최동욱',
        email: 'choi@example.com',
        phone: '010-3333-9999',
        subject: '대량 구매 문의',
        message: '사업용으로 대량 구매를 하고 싶습니다. 할인 혜택이 있는지 문의드립니다.',
        status: 'pending',
        created_at: '2024-01-11T11:30:00Z',
        updated_at: '2024-01-11T11:30:00Z',
        category: '대량구매',
        priority: 'medium'
      }
    ],
    userProfiles: [
      {
        id: 'admin-001',
        email: 'admin@kictgroup.com',
        display_name: '관리자',
        role: 'admin',
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ]
  }
}

export default supabase
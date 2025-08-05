// src/lib/auth.ts - Supabase 인증 헬퍼 함수들
import { supabase } from './supabase'
import { User, Session } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  email: string
  display_name?: string
  avatar_url?: string
  bio?: string
  role: 'user' | 'admin' | 'manager'
  is_active: boolean
  last_seen?: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  success: boolean
  error?: string
  user?: User
  session?: Session
}

// 인증 관련 헬퍼 함수들
export const auth = {
  // 로그인
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.',
      }
    }
  },

  // 회원가입
  async signUp(email: string, password: string, displayName?: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || email.split('@')[0],
          }
        }
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.',
      }
    }
  },

  // 로그아웃
  async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.',
      }
    }
  },

  // 비밀번호 재설정
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '비밀번호 재설정 중 오류가 발생했습니다.',
      }
    }
  },

  // 현재 사용자 가져오기
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error)
      return null
    }
  },

  // 현재 세션 가져오기
  async getCurrentSession(): Promise<Session | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      return session
    } catch (error) {
      console.error('세션 정보 조회 실패:', error)
      return null
    }
  },

  // 사용자 프로필 가져오기
  async getUserProfile(userId?: string): Promise<UserProfile | null> {
    try {
      const targetUserId = userId || (await this.getCurrentUser())?.id
      
      if (!targetUserId) {
        return null
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', targetUserId)
        .single()

      if (error) {
        console.error('프로필 조회 실패:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('프로필 조회 중 오류:', error)
      return null
    }
  },

  // 사용자 프로필 업데이트
  async updateUserProfile(updates: Partial<Omit<UserProfile, 'id' | 'email' | 'created_at'>>): Promise<{ success: boolean; error?: string }> {
    try {
      const user = await this.getCurrentUser()
      
      if (!user) {
        return { success: false, error: '로그인이 필요합니다.' }
      }

      const { error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '프로필 업데이트 중 오류가 발생했습니다.',
      }
    }
  },

  // 인증 상태 변경 리스너
  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback)
  },

  // 권한 확인
  async hasRole(requiredRole: UserProfile['role']): Promise<boolean> {
    try {
      const profile = await this.getUserProfile()
      
      if (!profile) return false

      const roleHierarchy = {
        'user': 1,
        'manager': 2,
        'admin': 3,
      }

      return roleHierarchy[profile.role] >= roleHierarchy[requiredRole]
    } catch (error) {
      console.error('권한 확인 실패:', error)
      return false
    }
  },

  // 관리자 여부 확인
  async isAdmin(): Promise<boolean> {
    return this.hasRole('admin')
  },

  // 매니저 이상 권한 확인
  async isManagerOrAbove(): Promise<boolean> {
    return this.hasRole('manager')
  },
}

// --------------------------------------------------

// src/hooks/useAuth.ts - React Hook
import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { auth, UserProfile } from '@/lib/auth'

interface UseAuthReturn {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
  isManager: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, displayName?: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 초기 세션 확인
    const initializeAuth = async () => {
      try {
        const session = await auth.getCurrentSession()
        const user = await auth.getCurrentUser()
        
        setSession(session)
        setUser(user)

        if (user) {
          const profile = await auth.getUserProfile(user.id)
          setProfile(profile)
        }
      } catch (error) {
        console.error('인증 초기화 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // 인증 상태 변경 리스너
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        const profile = await auth.getUserProfile(session.user.id)
        setProfile(profile)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const result = await auth.signIn(email, password)
    setLoading(false)
    return result
  }

  const signUp = async (email: string, password: string, displayName?: string) => {
    setLoading(true)
    const result = await auth.signUp(email, password, displayName)
    setLoading(false)
    return result
  }

  const signOut = async () => {
    setLoading(true)
    const result = await auth.signOut()
    setLoading(false)
    return result
  }

  const resetPassword = async (email: string) => {
    return auth.resetPassword(email)
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const result = await auth.updateUserProfile(updates)
    
    if (result.success && user) {
      // 프로필 업데이트 성공 시 로컬 상태 갱신
      const updatedProfile = await auth.getUserProfile(user.id)
      setProfile(updatedProfile)
    }
    
    return result
  }

  return {
    user,
    profile,
    session,
    loading,
    isAdmin: profile?.role === 'admin',
    isManager: profile?.role === 'manager' || profile?.role === 'admin',
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  }
}

// --------------------------------------------------

// src/components/ProtectedRoute.tsx - 권한 기반 라우트 보호
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'user' | 'manager' | 'admin'
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requiredRole = 'user', 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (profile && requiredRole) {
        const roleHierarchy = { 'user': 1, 'manager': 2, 'admin': 3 }
        const userLevel = roleHierarchy[profile.role]
        const requiredLevel = roleHierarchy[requiredRole]

        if (userLevel < requiredLevel) {
          router.push('/unauthorized')
          return
        }
      }
    }
  }, [user, profile, loading, requiredRole, redirectTo, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || (profile && requiredRole && !profile)) {
    return null
  }

  return <>{children}</>
}
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// TypeScript 타입 가드 함수
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return '알 수 없는 오류가 발생했습니다.'
}

export async function GET() {
  try {
    // 환경변수 체크
    const envCheck = {
      supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      node_env: process.env.NODE_ENV,
      railway_env: process.env.RAILWAY_ENVIRONMENT || 'local'
    }

    // Supabase 연결 테스트
    let supabaseConnected = false
    let supabaseError = null
    let testQueryResult = null

    if (envCheck.supabase_url && envCheck.supabase_anon_key) {
      try {
        // Supabase 클라이언트 생성
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // 1. 기본 연결 테스트 - 인증 세션 확인
        const { data: authData, error: authError } = await supabase.auth.getSession()
        
        if (!authError) {
          supabaseConnected = true
          
          // 2. 실제 데이터베이스 테이블 접근 테스트 (선택사항)
          // 가장 간단한 시스템 테이블 조회 시도
          try {
            const { data: tables, error: tableError } = await supabase
              .from('information_schema.tables')
              .select('table_name')
              .eq('table_schema', 'public')
              .limit(5)
            
            if (!tableError && tables) {
              testQueryResult = `발견된 테이블: ${tables.map(t => t.table_name).join(', ')}`
            }
          } catch (tableTestError) {
            // 테이블 조회 실패해도 기본 연결은 성공한 것으로 처리
            testQueryResult = '기본 연결 성공 (테이블 조회는 권한 필요)'
          }
        } else {
          supabaseError = authError.message
        }
      } catch (error) {
        supabaseError = getErrorMessage(error)
      }
    } else {
      supabaseError = 'Supabase 환경변수가 설정되지 않았습니다'
    }

    // 결과 반환
    const allGood = supabaseConnected && envCheck.supabase_url && envCheck.supabase_anon_key
    
    return NextResponse.json({
      success: allGood,
      message: allGood 
        ? 'Supabase 연결 성공! SQL 쿼리 사용 가능' 
        : 'Supabase 연결 또는 환경변수 문제',
      connections: {
        supabase: supabaseConnected,
        timestamp: new Date().toISOString()
      },
      test_result: testQueryResult,
      env_check: envCheck,
      errors: supabaseError ? { supabase: supabaseError } : null,
      recommendations: getRecommendations(envCheck, supabaseConnected),
      sql_ready: allGood
    }, { 
      status: allGood ? 200 : 500 
    })

  } catch (error) {
    console.error('API 라우트 오류:', error)
    const errorMessage = getErrorMessage(error)
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: 'API 라우트에서 예상치 못한 오류가 발생했습니다.',
      env_check: {
        supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    }, { status: 500 })
  }
}

function getRecommendations(envCheck: any, supabaseConnected: boolean): string[] {
  const recommendations: string[] = []

  if (!envCheck.supabase_url) {
    recommendations.push('Railway Variables에 NEXT_PUBLIC_SUPABASE_URL을 설정하세요')
  }
  
  if (!envCheck.supabase_anon_key) {
    recommendations.push('Railway Variables에 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정하세요')
  }

  if (envCheck.supabase_url && envCheck.supabase_anon_key && !supabaseConnected) {
    recommendations.push('Supabase 프로젝트 설정과 키 값을 다시 확인하세요')
  }

  if (envCheck.supabase_url && envCheck.supabase_anon_key && supabaseConnected) {
    recommendations.push('✅ Supabase 연결 성공! 이제 SQL 쿼리를 사용할 수 있습니다')
    recommendations.push('SqlService.customQuery() 함수로 순수 SQL 문장을 실행하세요')
    recommendations.push('TableService 클래스로 기본 CRUD 작업을 수행하세요')
  }

  return recommendations
}
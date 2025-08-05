'use client'

import { useState } from 'react'
import { SqlService, TableService } from '@/lib/supabase'

export default function SqlExamples() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runExample = async (exampleName: string, queryFunction: () => Promise<any>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await queryFunction()
      setResults({ example: exampleName, ...result })
    } catch (err) {
      setError(err instanceof Error ? err.message : '쿼리 실행 오류')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">🗃️ SQL 쿼리 사용 예시</h1>

      {/* 쿼리 버튼들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        
        {/* 1. 기본 테이블 조회 */}
        <button
          onClick={() => runExample('기본 조회', async () => {
            return await SqlService.customQuery(`
              SELECT table_name, table_type 
              FROM information_schema.tables 
              WHERE table_schema = 'public' 
              LIMIT 10
            `)
          })}
          disabled={loading}
          className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          📋 테이블 목록 조회
        </button>

        {/* 2. 프로젝트 목록 조회 (Supabase 테이블 직접 접근) */}
        <button
          onClick={() => runExample('프로젝트 조회', async () => {
            return await TableService.getProjects()
          })}
          disabled={loading}
          className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          📁 프로젝트 목록
        </button>

        {/* 3. 복잡한 JOIN 쿼리 예시 */}
        <button
          onClick={() => runExample('복잡한 조회', async () => {
            return await SqlService.customQuery(`
              SELECT 
                p.id,
                p.title,
                p.status,
                p.created_at,
                u.name as created_by
              FROM projects p
              LEFT JOIN users u ON p.created_by = u.id
              WHERE p.status = $1
              ORDER BY p.created_at DESC
              LIMIT 20
            `, ['active'])
          })}
          disabled={loading}
          className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
        >
          🔗 JOIN 쿼리
        </button>

        {/* 4. 집계 쿼리 */}
        <button
          onClick={() => runExample('통계', async () => {
            return await SqlService.customQuery(`
              SELECT 
                status,
                COUNT(*) as count,
                AVG(progress) as avg_progress
              FROM projects 
              GROUP BY status
              ORDER BY count DESC
            `)
          })}
          disabled={loading}
          className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
        >
          📊 프로젝트 통계
        </button>

        {/* 5. 데이터 삽입 예시 */}
        <button
          onClick={() => runExample('데이터 삽입', async () => {
            const sampleProject = {
              title: `테스트 프로젝트 ${Date.now()}`,
              description: 'SQL로 생성된 테스트 프로젝트',
              status: 'draft',
              progress: 0
            }
            return await SqlService.insert('projects', sampleProject)
          })}
          disabled={loading}
          className="p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
        >
          ➕ 프로젝트 생성
        </button>

        {/* 6. 날짜 기반 조회 */}
        <button
          onClick={() => runExample('최근 데이터', async () => {
            return await SqlService.customQuery(`
              SELECT 
                id,
                title,
                created_at,
                DATE_PART('day', NOW() - created_at) as days_ago
              FROM projects 
              WHERE created_at >= NOW() - INTERVAL '30 days'
              ORDER BY created_at DESC
            `)
          })}
          disabled={loading}
          className="p-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
        >
          📅 최근 30일 데이터
        </button>
      </div>

      {/* 로딩 표시 */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600">쿼리 실행 중...</p>
        </div>
      )}

      {/* 오류 표시 */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-800 mb-2">⚠️ 쿼리 실행 오류</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* 결과 표시 */}
      {results && !loading && (
        <div className="bg-gray-50 border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">📋 쿼리 결과: {results.example}</h3>
            <span className="text-sm text-gray-500">
              {results.data ? `${Array.isArray(results.data) ? results.data.length : 1}개 결과` : '결과 없음'}
            </span>
          </div>
          
          {results.error ? (
            <div className="bg-red-100 text-red-800 p-3 rounded">
              <strong>오류:</strong> {JSON.stringify(results.error, null, 2)}
            </div>
          ) : (
            <div className="bg-white p-4 rounded border overflow-auto max-h-96">
              <pre className="text-sm">
                {JSON.stringify(results.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* SQL 사용법 안내 */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 SQL 사용법 가이드</h3>
        <div className="space-y-4 text-blue-700">
          <div>
            <h4 className="font-medium mb-2">1. 순수 SQL 쿼리 실행:</h4>
            <code className="block bg-blue-100 p-2 rounded text-sm">
              {`const result = await SqlService.customQuery(
  "SELECT * FROM projects WHERE status = $1", 
  ["active"]
)`}
            </code>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">2. 기본 CRUD 작업:</h4>
            <code className="block bg-blue-100 p-2 rounded text-sm">
              {`// 조회
const projects = await SqlService.select("projects", "*", "status = $1", ["active"])

// 삽입
const newProject = await SqlService.insert("projects", { title: "새 프로젝트" })

// 업데이트
const updated = await SqlService.update("projects", { status: "done" }, "id = $1", [123])`}
            </code>
          </div>

          <div>
            <h4 className="font-medium mb-2">3. Supabase 테이블 직접 조작:</h4>
            <code className="block bg-blue-100 p-2 rounded text-sm">
              {`// TableService 사용
const projects = await TableService.getProjects()
const newProject = await TableService.createProject({ title: "프로젝트" })`}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
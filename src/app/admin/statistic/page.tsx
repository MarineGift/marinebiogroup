'use client'

import { useState, useEffect } from 'react'

interface SEOSettings {
  global: {
    siteTitle: string
    siteDescription: string
    siteKeywords: string
    canonicalUrl: string
    robotsTxt: string
    sitemapUrl: string
    googleAnalyticsId: string
    googleSearchConsoleId: string
    facebookPixelId: string
    twitterCardType: 'summary' | 'summary_large_image' | 'app' | 'player'
    openGraphImage: string
    faviconUrl: string
  }
  meta: {
    defaultTitle: string
    titleTemplate: string
    defaultDescription: string
    defaultKeywords: string
    language: string
    charset: string
    viewport: string
  }
  schema: {
    organizationType: string
    organizationName: string
    organizationLogo: string
    organizationUrl: string
    contactPhone: string
    contactEmail: string
    socialProfiles: string[]
  }
  redirects: {
    id: number
    from: string
    to: string
    type: '301' | '302' | '307'
    isActive: boolean
  }[]
}

interface SEOAnalysis {
  pages: {
    url: string
    title: string
    titleLength: number
    description: string
    descriptionLength: number
    keywords: string
    h1Count: number
    h2Count: number
    imgAltMissing: number
    issues: string[]
    score: number
  }[]
  overview: {
    totalPages: number
    goodTitles: number
    goodDescriptions: number
    duplicateTitles: number
    duplicateDescriptions: number
    averageScore: number
  }
}

export default function SEOAdminPage() {
  const [settings, setSettings] = useState<SEOSettings | null>(null)
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [selectedTab, setSelectedTab] = useState('global') // global, meta, schema, redirects, analysis

  // 리다이렉트 추가 모달
  const [showRedirectModal, setShowRedirectModal] = useState(false)
  const [redirectForm, setRedirectForm] = useState({
    from: '',
    to: '',
    type: '301' as '301' | '302' | '307',
    isActive: true
  })

  // 데이터 로드
  const fetchSEOData = async () => {
    setLoading(true)
    setError('')

    try {
      const [settingsResponse, analysisResponse] = await Promise.all([
        fetch('/api/admin/seo/settings'),
        fetch('/api/admin/seo/analysis')
      ])

      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json()
        setSettings(settingsData.data)
      }

      if (analysisResponse.ok) {
        const analysisData = await analysisResponse.json()
        setAnalysis(analysisData.data)
      }
    } catch (err) {
      setError('SEO 데이터를 불러오는데 실패했습니다.')
      console.error('Error fetching SEO data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSEOData()
  }, [])

  // 설정 저장
  const saveSettings = async () => {
    if (!settings) return

    setSaving(true)

    try {
      const response = await fetch('/api/admin/seo/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        alert('SEO 설정이 저장되었습니다.')
      } else {
        alert('저장 중 오류가 발생했습니다.')
      }
    } catch (err) {
      console.error('Save error:', err)
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  // 리다이렉트 추가
  const addRedirect = async () => {
    if (!redirectForm.from.trim() || !redirectForm.to.trim()) {
      alert('From과 To URL을 모두 입력해주세요.')
      return
    }

    try {
      const response = await fetch('/api/admin/seo/redirects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(redirectForm)
      })

      if (response.ok) {
        alert('리다이렉트가 추가되었습니다.')
        setShowRedirectModal(false)
        setRedirectForm({ from: '', to: '', type: '301', isActive: true })
        fetchSEOData()
      } else {
        alert('추가 중 오류가 발생했습니다.')
      }
    } catch (err) {
      console.error('Add redirect error:', err)
      alert('추가 중 오류가 발생했습니다.')
    }
  }

  // 리다이렉트 삭제
  const deleteRedirect = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/admin/seo/redirects/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('리다이렉트가 삭제되었습니다.')
        fetchSEOData()
      } else {
        alert('삭제 중 오류가 발생했습니다.')
      }
    } catch (err) {
      console.error('Delete redirect error:', err)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  // 사이트맵 생성
  const generateSitemap = async () => {
    try {
      const response = await fetch('/api/admin/seo/generate-sitemap', {
        method: 'POST'
      })

      if (response.ok) {
        alert('사이트맵이 생성되었습니다.')
      } else {
        alert('사이트맵 생성에 실패했습니다.')
      }
    } catch (err) {
      console.error('Generate sitemap error:', err)
      alert('사이트맵 생성 중 오류가 발생했습니다.')
    }
  }

  // SEO 분석 실행
  const runSEOAnalysis = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/admin/seo/analyze', {
        method: 'POST'
      })

      if (response.ok) {
        alert('SEO 분석이 완료되었습니다.')
        fetchSEOData()
      } else {
        alert('SEO 분석에 실패했습니다.')
      }
    } catch (err) {
      console.error('SEO analysis error:', err)
      alert('SEO 분석 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // 점수에 따른 색상 반환
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading && !settings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !settings) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'SEO 데이터를 불러올 수 없습니다.'}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">SEO 관리</h1>
        <div className="flex gap-2">
          <button
            onClick={generateSitemap}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            사이트맵 생성
          </button>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {saving ? '저장 중...' : '설정 저장'}
          </button>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'global', label: '기본 설정' },
          { key: 'meta', label: 'Meta 태그' },
          { key: 'schema', label: '구조화 데이터' },
          { key: 'redirects', label: '리다이렉트' },
          { key: 'analysis', label: 'SEO 분석' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTab === tab.key
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 기본 설정 탭 */}
      {selectedTab === 'global' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">기본 SEO 설정</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">사이트 제목</label>
                <input
                  type="text"
                  value={settings.global.siteTitle}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    global: { ...prev.global, siteTitle: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="KICT Group"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Canonical URL</label>
                <input
                  type="url"
                  value={settings.global.canonicalUrl}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    global: { ...prev.global, canonicalUrl: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://kictgroup.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">사이트 설명</label>
              <textarea
                value={settings.global.siteDescription}
                onChange={(e) => setSettings(prev => prev ? {
                  ...prev,
                  global: { ...prev.global, siteDescription: e.target.value }
                } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="혁신적인 ICT 솔루션으로 미래를 선도합니다"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">사이트 키워드</label>
              <input
                type="text"
                value={settings.global.siteKeywords}
                onChange={(e) => setSettings(prev => prev ? {
                  ...prev,
                  global: { ...prev.global, siteKeywords: e.target.value }
                } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="ICT, 기술, 솔루션, 혁신"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Google Analytics ID</label>
                <input
                  type="text"
                  value={settings.global.googleAnalyticsId}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    global: { ...prev.global, googleAnalyticsId: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Facebook Pixel ID</label>
                <input
                  type="text"
                  value={settings.global.facebookPixelId}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    global: { ...prev.global, facebookPixelId: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="123456789012345"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Robots.txt</label>
              <textarea
                value={settings.global.robotsTxt}
                onChange={(e) => setSettings(prev => prev ? {
                  ...prev,
                  global: { ...prev.global, robotsTxt: e.target.value }
                } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                rows={6}
                placeholder={`User-agent: *\nAllow: /\n\nSitemap: https://kictgroup.com/sitemap.xml`}
              />
            </div>
          </div>
        </div>
      )}

      {/* Meta 태그 탭 */}
      {selectedTab === 'meta' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Meta 태그 설정</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">기본 제목</label>
              <input
                type="text"
                value={settings.meta.defaultTitle}
                onChange={(e) => setSettings(prev => prev ? {
                  ...prev,
                  meta: { ...prev.meta, defaultTitle: e.target.value }
                } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="KICT Group - 혁신적인 ICT 솔루션"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">제목 템플릿</label>
              <input
                type="text"
                value={settings.meta.titleTemplate}
                onChange={(e) => setSettings(prev => prev ? {
                  ...prev,
                  meta: { ...prev.meta, titleTemplate: e.target.value }
                } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="%s | KICT Group"
              />
              <p className="text-xs text-gray-500 mt-1">%s는 페이지 제목으로 대체됩니다</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">기본 설명</label>
              <textarea
                value={settings.meta.defaultDescription}
                onChange={(e) => setSettings(prev => prev ? {
                  ...prev,
                  meta: { ...prev.meta, defaultDescription: e.target.value }
                } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                placeholder="첨단 기술과 창의적 사고로 고객의 성공을 위한 최적의 ICT 솔루션을 제공합니다."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">언어</label>
                <input
                  type="text"
                  value={settings.meta.language}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    meta: { ...prev.meta, language: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="ko-KR"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">문자 인코딩</label>
                <input
                  type="text"
                  value={settings.meta.charset}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    meta: { ...prev.meta, charset: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="UTF-8"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">뷰포트</label>
                <input
                  type="text"
                  value={settings.meta.viewport}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    meta: { ...prev.meta, viewport: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="width=device-width, initial-scale=1"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 구조화 데이터 탭 */}
      {selectedTab === 'schema' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">구조화 데이터 (Schema.org)</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">조직 유형</label>
                <select
                  value={settings.schema.organizationType}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    schema: { ...prev.schema, organizationType: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Organization">조직</option>
                  <option value="Corporation">기업</option>
                  <option value="LocalBusiness">지역 사업체</option>
                  <option value="ProfessionalService">전문 서비스</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">조직명</label>
                <input
                  type="text"
                  value={settings.schema.organizationName}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    schema: { ...prev.schema, organizationName: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="KICT Group"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">로고 URL</label>
                <input
                  type="url"
                  value={settings.schema.organizationLogo}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    schema: { ...prev.schema, organizationLogo: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://kictgroup.com/logo.png"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">웹사이트 URL</label>
                <input
                  type="url"
                  value={settings.schema.organizationUrl}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    schema: { ...prev.schema, organizationUrl: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://kictgroup.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">연락처 전화번호</label>
                <input
                  type="tel"
                  value={settings.schema.contactPhone}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    schema: { ...prev.schema, contactPhone: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="+1-703-123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">연락처 이메일</label>
                <input
                  type="email"
                  value={settings.schema.contactEmail}
                  onChange={(e) => setSettings(prev => prev ? {
                    ...prev,
                    schema: { ...prev.schema, contactEmail: e.target.value }
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="contact@kictgroup.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">소셜 미디어 프로필</label>
              <textarea
                value={settings.schema.socialProfiles.join('\n')}
                onChange={(e) => setSettings(prev => prev ? {
                  ...prev,
                  schema: { ...prev.schema, socialProfiles: e.target.value.split('\n').filter(url => url.trim()) }
                } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="https://facebook.com/kictgroup&#10;https://twitter.com/kictgroup&#10;https://linkedin.com/company/kictgroup"
              />
              <p className="text-xs text-gray-500 mt-1">각 URL을 새 줄에 입력하세요</p>
            </div>
          </div>
        </div>
      )}

      {/* 리다이렉트 탭 */}
      {selectedTab === 'redirects' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">URL 리다이렉트</h2>
            <button
              onClick={() => setShowRedirectModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              리다이렉트 추가
            </button>
          </div>

          <div className="space-y-3">
            {settings.redirects.map((redirect) => (
              <div key={redirect.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {redirect.from} → {redirect.to}
                  </div>
                  <div className="text-xs text-gray-500">
                    {redirect.type} {redirect.isActive ? '(활성)' : '(비활성)'}
                  </div>
                </div>
                <button
                  onClick={() => deleteRedirect(redirect.id)}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  삭제
                </button>
              </div>
            ))}
            {settings.redirects.length === 0 && (
              <p className="text-gray-500 text-center py-8">리다이렉트가 설정되지 않았습니다.</p>
            )}
          </div>
        </div>
      )}

      {/* SEO 분석 탭 */}
      {selectedTab === 'analysis' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">SEO 분석</h2>
              <button
                onClick={runSEOAnalysis}
                disabled={loading}
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 disabled:opacity-50"
              >
                {loading ? '분석 중...' : '분석 실행'}
              </button>
            </div>

            {analysis && (
              <>
                {/* 분석 개요 */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold">{analysis.overview.totalPages}</div>
                    <div className="text-sm text-gray-600">총 페이지</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{analysis.overview.goodTitles}</div>
                    <div className="text-sm text-gray-600">좋은 제목</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{analysis.overview.goodDescriptions}</div>
                    <div className="text-sm text-gray-600">좋은 설명</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">{analysis.overview.duplicateTitles}</div>
                    <div className="text-sm text-gray-600">중복 제목</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-600">{analysis.overview.duplicateDescriptions}</div>
                    <div className="text-sm text-gray-600">중복 설명</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(analysis.overview.averageScore)}`}>
                      {analysis.overview.averageScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">평균 점수</div>
                  </div>
                </div>

                {/* 페이지별 분석 */}
                <div className="space-y-3">
                  <h3 className="font-medium">페이지별 SEO 분석</h3>
                  {analysis.pages.map((page, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="font-medium">{page.title}</div>
                          <div className="text-sm text-gray-500">{page.url}</div>
                        </div>
                        <div className={`text-lg font-bold ${getScoreColor(page.score)}`}>
                          {page.score}/100
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-600">제목 길이:</span>
                          <span className={`ml-1 ${page.titleLength >= 30 && page.titleLength <= 60 ? 'text-green-600' : 'text-red-600'}`}>
                            {page.titleLength}자
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">설명 길이:</span>
                          <span className={`ml-1 ${page.descriptionLength >= 120 && page.descriptionLength <= 160 ? 'text-green-600' : 'text-red-600'}`}>
                            {page.descriptionLength}자
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">H1:</span>
                          <span className={`ml-1 ${page.h1Count === 1 ? 'text-green-600' : 'text-red-600'}`}>
                            {page.h1Count}개
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Alt 누락:</span>
                          <span className={`ml-1 ${page.imgAltMissing === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {page.imgAltMissing}개
                          </span>
                        </div>
                      </div>

                      {page.issues.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-red-600 mb-1">개선 사항:</div>
                          <ul className="text-sm text-red-600 list-disc list-inside">
                            {page.issues.map((issue, issueIndex) => (
                              <li key={issueIndex}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {!analysis && !loading && (
              <p className="text-gray-500 text-center py-8">
                SEO 분석을 실행하여 웹사이트의 검색 엔진 최적화 상태를 확인하세요.
              </p>
            )}
          </div>
        </div>
      )}

      {/* 리다이렉트 추가 모달 */}
      {showRedirectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">리다이렉트 추가</h2>
              <button
                onClick={() => setShowRedirectModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">From URL</label>
                <input
                  type="text"
                  value={redirectForm.from}
                  onChange={(e) => setRedirectForm(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="/old-page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">To URL</label>
                <input
                  type="text"
                  value={redirectForm.to}
                  onChange={(e) => setRedirectForm(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="/new-page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">리다이렉트 타입</label>
                <select
                  value={redirectForm.type}
                  onChange={(e) => setRedirectForm(prev => ({ ...prev, type: e.target.value as '301' | '302' | '307' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="301">301 (영구적)</option>
                  <option value="302">302 (임시적)</option>
                  <option value="307">307 (임시적, 메서드 보존)</option>
                </select>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={redirectForm.isActive}
                    onChange={(e) => setRedirectForm(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="mr-2"
                  />
                  활성화
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowRedirectModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={addRedirect}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
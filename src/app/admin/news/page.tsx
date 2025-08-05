'use client'

import { useState, useEffect } from 'react'
import Pagination from '@/components/Pagination'

interface NewsItem {
  id: number
  title: string
  content: string
  summary?: string
  category: 'news' | 'notice' | 'event'
  status: 'draft' | 'published' | 'archived'
  isImportant: boolean
  isPinned: boolean
  viewCount: number
  publishedAt?: string
  createdAt: string
  updatedAt: string
  author: string
  tags: string[]
  thumbnail?: string
}

interface NewsResponse {
  success: boolean
  data: NewsItem[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export default function NewsAdminPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 필터 및 검색
  const [categoryFilter, setCategoryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // 뉴스 편집 모달
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: 'news' as NewsItem['category'],
    status: 'draft' as NewsItem['status'],
    isImportant: false,
    isPinned: false,
    tags: '',
    publishedAt: ''
  })
  const [saving, setSaving] = useState(false)

  // 뉴스 데이터 로드
  const fetchNews = async (page = 1) => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        ...(categoryFilter && { category: categoryFilter }),
        ...(statusFilter && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery })
      })

      const response = await fetch(`/api/admin/news?${params}`)
      const data: NewsResponse = await response.json()

      if (data.success) {
        setNewsItems(data.data)
        setCurrentPage(data.pagination.currentPage)
        setTotalPages(data.pagination.totalPages)
        setTotalItems(data.pagination.totalItems)
      } else {
        setError('뉴스 데이터를 불러오는데 실패했습니다.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
      console.error('Error fetching news:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(currentPage)
  }, [currentPage, categoryFilter, statusFilter, searchQuery])

  // 뉴스 편집 모달 열기
  const openEditModal = (news?: NewsItem) => {
    if (news) {
      setEditingNews(news)
      setFormData({
        title: news.title,
        content: news.content,
        summary: news.summary || '',
        category: news.category,
        status: news.status,
        isImportant: news.isImportant,
        isPinned: news.isPinned,
        tags: news.tags.join(', '),
        publishedAt: news.publishedAt ? new Date(news.publishedAt).toISOString().slice(0, 16) : ''
      })
    } else {
      setEditingNews(null)
      setFormData({
        title: '',
        content: '',
        summary: '',
        category: 'news',
        status: 'draft',
        isImportant: false,
        isPinned: false,
        tags: '',
        publishedAt: ''
      })
    }
    setShowEditModal(true)
  }

  // 뉴스 저장
  const saveNews = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('제목과 내용은 필수입니다.')
      return
    }

    setSaving(true)

    try {
      const newsData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        publishedAt: formData.publishedAt || null
      }

      const url = editingNews 
        ? `/api/admin/news/${editingNews.id}`
        : '/api/admin/news'
      
      const method = editingNews ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newsData)
      })

      if (response.ok) {
        alert(editingNews ? '뉴스가 수정되었습니다.' : '뉴스가 추가되었습니다.')
        setShowEditModal(false)
        fetchNews(currentPage)
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

  // 뉴스 삭제
  const deleteNews = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('뉴스가 삭제되었습니다.')
        fetchNews(currentPage)
      } else {
        alert('삭제 중 오류가 발생했습니다.')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  // 상태 변경
  const updateNewsStatus = async (id: number, status: NewsItem['status']) => {
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        fetchNews(currentPage)
      } else {
        alert('상태 변경에 실패했습니다.')
      }
    } catch (err) {
      console.error('Status update error:', err)
      alert('상태 변경 중 오류가 발생했습니다.')
    }
  }

  // 중요도/고정 토글
  const toggleFlag = async (id: number, field: 'isImportant' | 'isPinned', value: boolean) => {
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [field]: !value })
      })

      if (response.ok) {
        fetchNews(currentPage)
      } else {
        alert('설정 변경에 실패했습니다.')
      }
    } catch (err) {
      console.error('Toggle error:', err)
      alert('설정 변경 중 오류가 발생했습니다.')
    }
  }

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchNews(1)
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 카테고리 배지 스타일
  const getCategoryBadge = (category: string) => {
    const styles = {
      news: 'bg-blue-100 text-blue-800',
      notice: 'bg-red-100 text-red-800',
      event: 'bg-green-100 text-green-800'
    }
    const labels = {
      news: '뉴스',
      notice: '공지사항',
      event: '이벤트'
    }
    return { style: styles[category as keyof typeof styles], label: labels[category as keyof typeof labels] }
  }

  // 상태 배지 스타일
  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800',
      published: 'bg-green-100 text-green-800',
      archived: 'bg-yellow-100 text-yellow-800'
    }
    const labels = {
      draft: '임시저장',
      published: '발행됨',
      archived: '보관됨'
    }
    return { style: styles[status as keyof typeof styles], label: labels[status as keyof typeof labels] }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">뉴스/공지사항 관리</h1>
        <button
          onClick={() => openEditModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          새 글 작성
        </button>
      </div>

      {/* 검색 및 필터 */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">검색</label>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목, 내용으로 검색..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </form>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">카테고리</label>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">전체</option>
            <option value="news">뉴스</option>
            <option value="notice">공지사항</option>
            <option value="event">이벤트</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">상태</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">전체</option>
            <option value="draft">임시저장</option>
            <option value="published">발행됨</option>
            <option value="archived">보관됨</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => fetchNews(currentPage)}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            새로고침
          </button>
        </div>
      </div>

      {/* 로딩 및 에러 상태 */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">로딩 중...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* 뉴스 목록 테이블 */}
      {!loading && !error && (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    설정
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    조회수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작성일
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newsItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
                        {item.summary && (
                          <div className="text-sm text-gray-500 truncate">{item.summary}</div>
                        )}
                        <div className="text-xs text-gray-400">작성자: {item.author}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBadge(item.category).style}`}>
                        {getCategoryBadge(item.category).label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={item.status}
                        onChange={(e) => updateNewsStatus(item.id, e.target.value as NewsItem['status'])}
                        className={`text-xs border border-gray-300 rounded px-2 py-1 ${getStatusBadge(item.status).style}`}
                      >
                        <option value="draft">임시저장</option>
                        <option value="published">발행됨</option>
                        <option value="archived">보관됨</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={item.isImportant}
                            onChange={() => toggleFlag(item.id, 'isImportant', item.isImportant)}
                            className="mr-1"
                          />
                          중요
                        </label>
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={item.isPinned}
                            onChange={() => toggleFlag(item.id, 'isPinned', item.isPinned)}
                            className="mr-1"
                          />
                          고정
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.viewCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                      {item.publishedAt && (
                        <div className="text-xs text-green-600">
                          발행: {new Date(item.publishedAt).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          편집
                        </button>
                        <button
                          onClick={() => deleteNews(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 빈 상태 */}
          {newsItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">뉴스가 없습니다.</p>
            </div>
          )}

          {/* 페이지네이션 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showInfo={true}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
          />
        </>
      )}

      {/* 뉴스 편집/작성 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingNews ? '뉴스 편집' : '새 글 작성'}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">제목 *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="뉴스 제목"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">카테고리</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as NewsItem['category'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="news">뉴스</option>
                    <option value="notice">공지사항</option>
                    <option value="event">이벤트</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">요약</label>
                <input
                  type="text"
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="간단한 요약 (선택사항)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">내용 *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={12}
                  placeholder="뉴스 내용을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">태그</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="태그1, 태그2, 태그3 (쉼표로 구분)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">발행일시</label>
                  <input
                    type="datetime-local"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">상태</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as NewsItem['status'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">임시저장</option>
                    <option value="published">발행</option>
                    <option value="archived">보관</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isImportant}
                      onChange={(e) => setFormData(prev => ({ ...prev, isImportant: e.target.checked }))}
                      className="mr-2"
                    />
                    중요 뉴스
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isPinned}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                      className="mr-2"
                    />
                    상단 고정
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={saving}
              >
                취소
              </button>
              <button
                onClick={saveNews}
                disabled={saving || !formData.title.trim() || !formData.content.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? '저장 중...' : editingNews ? '수정' : '작성'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
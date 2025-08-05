'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Pagination from '@/components/Pagination'

interface Banner {
  id: number
  title: string
  description?: string
  imageUrl: string
  linkUrl?: string
  position: 'main-top' | 'main-middle' | 'main-bottom' | 'sidebar' | 'footer'
  isActive: boolean
  order: number
  startDate?: string
  endDate?: string
  clickCount: number
  impressionCount: number
  createdAt: string
  updatedAt: string
}

interface BannerResponse {
  success: boolean
  data: Banner[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

export default function BannerAdminPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 필터 및 검색
  const [positionFilter, setPositionFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // 배너 편집 모달
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    linkUrl: '',
    position: 'main-top' as Banner['position'],
    isActive: true,
    order: 1,
    startDate: '',
    endDate: ''
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [saving, setSaving] = useState(false)

  // 배너 데이터 로드
  const fetchBanners = async (page = 1) => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        ...(positionFilter && { position: positionFilter }),
        ...(statusFilter && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery })
      })

      const response = await fetch(`/api/admin/banners?${params}`)
      const data: BannerResponse = await response.json()

      if (data.success) {
        setBanners(data.data)
        setCurrentPage(data.pagination.currentPage)
        setTotalPages(data.pagination.totalPages)
        setTotalItems(data.pagination.totalItems)
      } else {
        setError('배너 데이터를 불러오는데 실패했습니다.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
      console.error('Error fetching banners:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBanners(currentPage)
  }, [currentPage, positionFilter, statusFilter, searchQuery])

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.')
        return
      }

      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  // 배너 편집 모달 열기
  const openEditModal = (banner?: Banner) => {
    if (banner) {
      setEditingBanner(banner)
      setFormData({
        title: banner.title,
        description: banner.description || '',
        linkUrl: banner.linkUrl || '',
        position: banner.position,
        isActive: banner.isActive,
        order: banner.order,
        startDate: banner.startDate ? new Date(banner.startDate).toISOString().slice(0, 16) : '',
        endDate: banner.endDate ? new Date(banner.endDate).toISOString().slice(0, 16) : ''
      })
      setPreviewUrl(banner.imageUrl)
    } else {
      setEditingBanner(null)
      setFormData({
        title: '',
        description: '',
        linkUrl: '',
        position: 'main-top',
        isActive: true,
        order: banners.length + 1,
        startDate: '',
        endDate: ''
      })
      setPreviewUrl('')
    }
    setSelectedFile(null)
    setShowEditModal(true)
  }

  // 배너 저장
  const saveBanner = async () => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    if (!editingBanner && !selectedFile) {
      alert('이미지를 선택해주세요.')
      return
    }

    setSaving(true)

    try {
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('linkUrl', formData.linkUrl)
      submitData.append('position', formData.position)
      submitData.append('isActive', formData.isActive.toString())
      submitData.append('order', formData.order.toString())
      submitData.append('startDate', formData.startDate)
      submitData.append('endDate', formData.endDate)

      if (selectedFile) {
        submitData.append('image', selectedFile)
      }

      const url = editingBanner 
        ? `/api/admin/banners/${editingBanner.id}`
        : '/api/admin/banners'
      
      const method = editingBanner ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        body: submitData
      })

      if (response.ok) {
        alert(editingBanner ? '배너가 수정되었습니다.' : '배너가 추가되었습니다.')
        setShowEditModal(false)
        fetchBanners(currentPage)
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

  // 배너 삭제
  const deleteBanner = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/admin/banners/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('배너가 삭제되었습니다.')
        fetchBanners(currentPage)
      } else {
        alert('삭제 중 오류가 발생했습니다.')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  // 활성화 상태 토글
  const toggleActive = async (id: number, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/banners/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !isActive })
      })

      if (response.ok) {
        fetchBanners(currentPage)
      } else {
        alert('상태 변경에 실패했습니다.')
      }
    } catch (err) {
      console.error('Toggle error:', err)
      alert('상태 변경 중 오류가 발생했습니다.')
    }
  }

  // 순서 변경
  const updateOrder = async (id: number, newOrder: number) => {
    try {
      const response = await fetch(`/api/admin/banners/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order: newOrder })
      })

      if (response.ok) {
        fetchBanners(currentPage)
      } else {
        alert('순서 변경에 실패했습니다.')
      }
    } catch (err) {
      console.error('Order update error:', err)
      alert('순서 변경 중 오류가 발생했습니다.')
    }
  }

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchBanners(1)
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 위치 배지 스타일
  const getPositionBadge = (position: string) => {
    const styles = {
      'main-top': 'bg-red-100 text-red-800',
      'main-middle': 'bg-blue-100 text-blue-800',
      'main-bottom': 'bg-green-100 text-green-800',
      'sidebar': 'bg-purple-100 text-purple-800',
      'footer': 'bg-gray-100 text-gray-800'
    }
    const labels = {
      'main-top': '메인 상단',
      'main-middle': '메인 중간',
      'main-bottom': '메인 하단',
      'sidebar': '사이드바',
      'footer': '푸터'
    }
    return { style: styles[position as keyof typeof styles], label: labels[position as keyof typeof labels] }
  }

  // 날짜 상태 확인
  const getDateStatus = (startDate?: string, endDate?: string) => {
    const now = new Date()
    const start = startDate ? new Date(startDate) : null
    const end = endDate ? new Date(endDate) : null

    if (start && start > now) return { status: 'scheduled', label: '예약됨', color: 'text-yellow-600' }
    if (end && end < now) return { status: 'expired', label: '만료됨', color: 'text-red-600' }
    return { status: 'active', label: '진행중', color: 'text-green-600' }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">배너 관리</h1>
        <button
          onClick={() => openEditModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          새 배너 추가
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
              placeholder="제목으로 검색..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </form>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">위치</label>
          <select
            value={positionFilter}
            onChange={(e) => {
              setPositionFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">전체</option>
            <option value="main-top">메인 상단</option>
            <option value="main-middle">메인 중간</option>
            <option value="main-bottom">메인 하단</option>
            <option value="sidebar">사이드바</option>
            <option value="footer">푸터</option>
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
            <option value="active">활성</option>
            <option value="inactive">비활성</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={() => fetchBanners(currentPage)}
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

      {/* 배너 목록 */}
      {!loading && !error && (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이미지
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    위치
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    기간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    통계
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    순서
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {banners.map((banner) => {
                  const dateStatus = getDateStatus(banner.startDate, banner.endDate)
                  return (
                    <tr key={banner.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative w-20 h-12">
                          <Image
                            src={banner.imageUrl}
                            alt={banner.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-sm font-medium text-gray-900 truncate">{banner.title}</div>
                          {banner.description && (
                            <div className="text-sm text-gray-500 truncate">{banner.description}</div>
                          )}
                          {banner.linkUrl && (
                            <div className="text-xs text-blue-500 truncate">
                              <a href={banner.linkUrl} target="_blank" rel="noopener noreferrer">
                                {banner.linkUrl}
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPositionBadge(banner.position).style}`}>
                          {getPositionBadge(banner.position).label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => toggleActive(banner.id, banner.isActive)}
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              banner.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {banner.isActive ? '활성' : '비활성'}
                          </button>
                          <span className={`text-xs ${dateStatus.color}`}>
                            {dateStatus.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {banner.startDate && (
                          <div>시작: {new Date(banner.startDate).toLocaleDateString()}</div>
                        )}
                        {banner.endDate && (
                          <div>종료: {new Date(banner.endDate).toLocaleDateString()}</div>
                        )}
                        {!banner.startDate && !banner.endDate && (
                          <div className="text-gray-400">기간 제한 없음</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>클릭: {banner.clickCount.toLocaleString()}</div>
                        <div>노출: {banner.impressionCount.toLocaleString()}</div>
                        {banner.impressionCount > 0 && (
                          <div className="text-xs text-blue-600">
                            CTR: {((banner.clickCount / banner.impressionCount) * 100).toFixed(2)}%
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={banner.order}
                          onChange={(e) => updateOrder(banner.id, parseInt(e.target.value))}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                          min="1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(banner)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            편집
                          </button>
                          <button
                            onClick={() => deleteBanner(banner.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* 빈 상태 */}
          {banners.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">배너가 없습니다.</p>
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

      {/* 배너 편집/추가 모달 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingBanner ? '배너 편집' : '새 배너 추가'}
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">제목 *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="배너 제목"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">설명</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="배너 설명 (선택사항)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">링크 URL</label>
                <input
                  type="url"
                  value={formData.linkUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">위치</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value as Banner['position'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="main-top">메인 상단</option>
                    <option value="main-middle">메인 중간</option>
                    <option value="main-bottom">메인 하단</option>
                    <option value="sidebar">사이드바</option>
                    <option value="footer">푸터</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">순서</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">시작일</label>
                  <input
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">종료일</label>
                  <input
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  배너 이미지 {editingBanner ? '' : '*'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* 미리보기 */}
              {previewUrl && (
                <div>
                  <label className="block text-sm font-medium mb-2">미리보기</label>
                  <div className="relative w-full h-48 border rounded">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="mr-2"
                  />
                  활성화
                </label>
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
                onClick={saveBanner}
                disabled={saving || !formData.title.trim() || (!editingBanner && !selectedFile)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? '저장 중...' : editingBanner ? '수정' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
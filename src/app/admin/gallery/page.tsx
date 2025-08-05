'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Pagination from '@/components/Pagination' // 페이지네이션 컴포넌트

interface GalleryItem {
  id: number
  title: string
  image: string
  category: string
  description?: string
  createdAt: string
  updatedAt: string
}

interface GalleryResponse {
  success: boolean
  data: GalleryItem[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
  categories: string[]
}

export default function GalleryAdminPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage] = useState(12)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 이미지 업로드 상태
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadCategory, setUploadCategory] = useState('')
  const [uploadDescription, setUploadDescription] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  // 갤러리 데이터 로드
  const fetchGalleryData = async (page = 1, category = '', search = '') => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        ...(category && { category }),
        ...(search && { search })
      })

      const response = await fetch(`/api/gallery?${params}`)
      const data: GalleryResponse = await response.json()

      if (data.success) {
        setGalleryItems(data.data)
        setCurrentPage(data.pagination.currentPage)
        setTotalPages(data.pagination.totalPages)
        setTotalItems(data.pagination.totalItems)
        setCategories(data.categories)
      } else {
        setError('갤러리 데이터를 불러오는데 실패했습니다.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
      console.error('Error fetching gallery data:', err)
    } finally {
      setLoading(false)
    }
  }

  // 페이지 로드시 데이터 가져오기
  useEffect(() => {
    fetchGalleryData(currentPage, selectedCategory, searchQuery)
  }, [currentPage, selectedCategory, searchQuery])

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageFiles = files.filter(file => file.type.startsWith('image/'))

    if (imageFiles.length !== files.length) {
      alert('이미지 파일만 업로드 가능합니다.')
    }

    // 최대 5개까지만 선택 가능
    const limitedFiles = imageFiles.slice(0, 5)
    setSelectedFiles(limitedFiles)

    // 미리보기 URL 생성
    const urls = limitedFiles.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
  }

  // 개별 파일 삭제
  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    const newUrls = previewUrls.filter((_, i) => i !== index)
    
    // 기존 URL 해제
    URL.revokeObjectURL(previewUrls[index])
    
    setSelectedFiles(newFiles)
    setPreviewUrls(newUrls)
  }

  // 이미지 업로드
  const handleUpload = async () => {
    if (!uploadTitle.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    if (!uploadCategory.trim()) {
      alert('카테고리를 입력해주세요.')
      return
    }

    if (selectedFiles.length === 0) {
      alert('이미지를 선택해주세요.')
      return
    }

    setUploading(true)

    try {
      for (const file of selectedFiles) {
        const formData = new FormData()
        formData.append('title', uploadTitle)
        formData.append('category', uploadCategory)
        formData.append('description', uploadDescription)
        formData.append('image', file)

        const response = await fetch('/api/gallery', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('업로드 실패')
        }
      }

      alert('이미지가 성공적으로 업로드되었습니다.')
      
      // 폼 초기화
      setUploadTitle('')
      setUploadCategory('')
      setUploadDescription('')
      setSelectedFiles([])
      setPreviewUrls([])
      setShowUploadModal(false)

      // 데이터 새로고침
      fetchGalleryData(currentPage, selectedCategory, searchQuery)

    } catch (err) {
      console.error('Upload error:', err)
      alert('업로드 중 오류가 발생했습니다.')
    } finally {
      setUploading(false)
    }
  }

  // 이미지 삭제
  const deleteImage = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('이미지가 삭제되었습니다.')
        fetchGalleryData(currentPage, selectedCategory, searchQuery)
      } else {
        alert('삭제 중 오류가 발생했습니다.')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  // 검색 핸들러
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchGalleryData(1, selectedCategory, searchQuery)
  }

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">갤러리 관리</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          새 이미지 추가
        </button>
      </div>

      {/* 검색 및 필터 */}
      <div className="mb-6 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">검색</label>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목으로 검색..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              검색
            </button>
          </form>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">카테고리</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setCurrentPage(1)
            }}
            className="px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">전체</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
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

      {/* 갤러리 그리드 */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {galleryItems.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  {item.description && (
                    <p className="text-xs text-gray-600 truncate">{item.description}</p>
                  )}
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => deleteImage(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 빈 상태 */}
          {galleryItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">갤러리 항목이 없습니다.</p>
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

      {/* 업로드 모달 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">새 이미지 추가</h2>
              <button
                onClick={() => setShowUploadModal(false)}
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
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="이미지 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">카테고리 *</label>
                <input
                  type="text"
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="카테고리를 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">설명</label>
                <textarea
                  value={uploadDescription}
                  onChange={(e) => setUploadDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="이미지 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">이미지 선택 (최대 5개) *</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* 미리보기 */}
              {previewUrls.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">미리보기</label>
                  <div className="grid grid-cols-3 gap-2">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square border rounded">
                        <Image
                          src={url}
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={uploading}
              >
                취소
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading || selectedFiles.length === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? '업로드 중...' : '업로드'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
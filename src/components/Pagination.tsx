'use client'

import { useState, useEffect } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showInfo?: boolean
  itemsPerPage?: number
  totalItems?: number
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true,
  itemsPerPage = 10,
  totalItems = 0
}: PaginationProps) {
  const [visiblePages, setVisiblePages] = useState<number[]>([])

  // 보여줄 페이지 번호들 계산
  useEffect(() => {
    const getVisiblePages = () => {
      const maxVisible = 5 // 한 번에 보여줄 페이지 수
      const pages: number[] = []

      if (totalPages <= maxVisible) {
        // 전체 페이지가 maxVisible 이하면 모든 페이지 보여주기
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // 현재 페이지를 중심으로 페이지 범위 계산
        const half = Math.floor(maxVisible / 2)
        let start = Math.max(1, currentPage - half)
        let end = Math.min(totalPages, start + maxVisible - 1)

        // 끝에서부터 시작점 재조정
        if (end - start + 1 < maxVisible) {
          start = Math.max(1, end - maxVisible + 1)
        }

        for (let i = start; i <= end; i++) {
          pages.push(i)
        }
      }

      return pages
    }

    setVisiblePages(getVisiblePages())
  }, [currentPage, totalPages])

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handleFirstClick = () => {
    if (currentPage !== 1) {
      onPageChange(1)
    }
  }

  const handleLastClick = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages)
    }
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      {/* 페이지 정보 */}
      {showInfo && (
        <div className="text-sm text-gray-600">
          페이지 {currentPage} / {totalPages} 
          {totalItems > 0 && (
            <span className="ml-2">
              (총 {totalItems.toLocaleString()}개 항목, 페이지당 {itemsPerPage}개)
            </span>
          )}
        </div>
      )}

      {/* 페이지네이션 버튼들 */}
      <div className="flex items-center gap-1">
        {/* 첫 페이지 버튼 */}
        <button
          onClick={handleFirstClick}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="첫 페이지"
        >
          ««
        </button>

        {/* 이전 페이지 버튼 */}
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="이전 페이지"
        >
          ‹
        </button>

        {/* 첫 페이지가 보이는 범위에 없으면 ... 표시 */}
        {visiblePages.length > 0 && visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => handlePageClick(1)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-2 py-2 text-sm text-gray-400">...</span>
            )}
          </>
        )}

        {/* 페이지 번호들 */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-2 text-sm border rounded-md ${
              page === currentPage
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}

        {/* 마지막 페이지가 보이는 범위에 없으면 ... 표시 */}
        {visiblePages.length > 0 && visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 py-2 text-sm text-gray-400">...</span>
            )}
            <button
              onClick={() => handlePageClick(totalPages)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* 다음 페이지 버튼 */}
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="다음 페이지"
        >
          ›
        </button>

        {/* 마지막 페이지 버튼 */}
        <button
          onClick={handleLastClick}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          title="마지막 페이지"
        >
          »»
        </button>
      </div>

      {/* 페이지 이동 입력 */}
      <div className="flex items-center gap-2 text-sm">
        <span>페이지 이동:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const value = parseInt((e.target as HTMLInputElement).value)
              if (value >= 1 && value <= totalPages) {
                handlePageClick(value)
                ;(e.target as HTMLInputElement).value = ''
              }
            }
          }}
          placeholder={currentPage.toString()}
        />
        <span>/ {totalPages}</span>
      </div>
    </div>
  )
}
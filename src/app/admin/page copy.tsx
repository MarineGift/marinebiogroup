// ============ src/app/admin/page.tsx (아이콘 없는 버전) ============
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { sendReplyEmail } from '@/utils/emailService'

interface Project {
  id: number
  title: string
  description: string
  status: string
  createdAt: string
}

interface Service {
  id: number
  name: string
  category: string
  price: string
  description: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

interface Inquiry {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: string
}

const KICTAdminDashboard = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    activeMembers: 0,
    newRequests: 0
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // 프로젝트 데이터 가져오기
      const projectsResponse = await fetch('/api/projects')
      if (projectsResponse.ok) {
        const projectsData = await projectsResponse.json()
        setProjects(projectsData)
        setStats(prev => ({
          ...prev,
          totalProjects: projectsData.length,
          completedProjects: projectsData.filter((p: Project) => p.status === 'completed').length
        }))
      }

      // 서비스 데이터 가져오기 (선택사항)
      try {
        const servicesResponse = await fetch('/api/services')
        if (servicesResponse.ok) {
          const servicesData = await servicesResponse.json()
          setServices(servicesData)
        }
      } catch (error) {
        console.log('서비스 API 없음 (정상)')
      }

      // 사용자 데이터 가져오기 (선택사항)
      try {
        const usersResponse = await fetch('/api/users')
        if (usersResponse.ok) {
          const usersData = await usersResponse.json()
          setUsers(usersData)
          setStats(prev => ({
            ...prev,
            activeMembers: usersData.length
          }))
        }
      } catch (error) {
        console.log('사용자 API 없음 (정상)')
      }

      // 문의 데이터 가져오기 (선택사항)
      try {
        const inquiriesResponse = await fetch('/api/inquiries')
        if (inquiriesResponse.ok) {
          const inquiriesData = await inquiriesResponse.json()
          setInquiries(inquiriesData)
          setStats(prev => ({
            ...prev,
            newRequests: inquiriesData.filter((i: Inquiry) => i.status === 'pending').length
          }))
        }
      } catch (error) {
        console.log('문의 API 없음 (정상)')
      }

    } catch (error) {
      console.error('데이터 가져오기 오류:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReplyToInquiry = async (inquiry: Inquiry, replyMessage: string) => {
    try {
      const success = await sendReplyEmail(
        inquiry.email,
        inquiry.subject,
        replyMessage,
        inquiry
      )
      
      if (success) {
        alert('답변이 성공적으로 전송되었습니다.')
        // 문의 상태 업데이트
        setInquiries(inquiries.map(i => 
          i.id === inquiry.id 
            ? { ...i, status: 'replied' }
            : i
        ))
      } else {
        alert('답변 전송에 실패했습니다.')
      }
    } catch (error) {
      console.error('답변 전송 오류:', error)
      alert('답변 전송 중 오류가 발생했습니다.')
    }
  }

  const tabs = [
    { id: 'dashboard', label: '대시보드' },
    { id: 'projects', label: '프로젝트 관리' },
    { id: 'services', label: '서비스 관리' },
    { id: 'users', label: '사용자 관리' },
    { id: 'inquiries', label: '문의 관리' }
  ]

  const managementCards = [
    {
      id: 'website',
      title: '웹사이트 관리',
      description: '웹사이트 콘텐츠를 관리할 수 있습니다',
      color: 'bg-blue-500',
      isHighlighted: false
    },
    {
      id: 'menu',
      title: '메뉴 관리',
      description: '사이트 내 메뉴를 관리할 수 있습니다',
      color: 'bg-blue-600',
      isHighlighted: true
    },
    {
      id: 'gallery',
      title: '갤러리 관리',
      description: '이미지 갤러리를 관리할 수 있습니다',
      color: 'bg-indigo-500',
      isHighlighted: false
    },
    {
      id: 'slider',
      title: '슬라이더 관리',
      description: '메인 슬라이더를 관리할 수 있습니다',
      color: 'bg-purple-500',
      isHighlighted: false
    },
    {
      id: 'news',
      title: '뉴스/공지사항',
      description: '공지사항을 관리할 수 있습니다',
      color: 'bg-green-500',
      isHighlighted: false
    },
    {
      id: 'banner',
      title: '배너 관리',
      description: '광고 배너를 관리할 수 있습니다',
      color: 'bg-orange-500',
      isHighlighted: false
    }
  ]

  const quickActions = [
    { label: '새 웹사이트 추가', color: 'bg-blue-600' },
    { label: '새 공지사항 작성', color: 'bg-blue-600' },
    { label: '새 이벤트 등록', color: 'bg-blue-600' },
    { label: '새 구성 요소', color: 'bg-blue-600' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold">⚙️</span>
          </div>
          <h1 className="text-2xl font-bold">KICT Group 관리자 대시보드</h1>
        </div>
        <p className="text-purple-100">효율적인 관리자 업무 관리 시스템</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.totalProjects}</div>
            <div className="text-sm text-gray-600">총 프로젝트</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-500 mb-1">{stats.completedProjects}</div>
            <div className="text-sm text-gray-600">완료된 프로젝트</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-1">{stats.activeMembers}</div>
            <div className="text-sm text-gray-600">활성 멤버</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-1">{stats.newRequests}</div>
            <div className="text-sm text-gray-600">새로운 요청들</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Management Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {managementCards.map((card) => (
          <div
            key={card.id}
            className={`relative bg-white rounded-2xl p-6 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
              card.isHighlighted 
                ? 'border-blue-200 bg-blue-50 ring-2 ring-blue-200' 
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white text-2xl">🌐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
            {card.isHighlighted && (
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-orange-500 text-xl">⚡</span>
          <h2 className="text-lg font-semibold text-gray-900">빠른 작업</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`${action.color} text-white px-4 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">프로젝트 관리</h2>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <span>+</span>
          <span>새 프로젝트</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">설명</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">생성일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{project.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{project.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status === 'completed' ? '완료' : 
                     project.status === 'in_progress' ? '진행중' : '계획중'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(project.createdAt).toLocaleDateString('ko-KR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">편집</button>
                    <button className="text-red-600 hover:text-red-900">삭제</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return renderProjects()
      case 'services':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚙️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">서비스 관리</h3>
            <p className="text-gray-600">서비스 관리 기능이 곧 추가됩니다.</p>
          </div>
        )
      case 'users':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">사용자 관리</h3>
            <p className="text-gray-600">사용자 관리 기능이 곧 추가됩니다.</p>
          </div>
        )
      case 'inquiries':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">문의 관리</h3>
            <p className="text-gray-600">문의 관리 기능이 곧 추가됩니다.</p>
          </div>
        )
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">KICT Group</h1>
              <span className="ml-3 text-sm text-gray-500">관리자 시스템</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm text-gray-700">관리자님 환영합니다</span>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">관</span>
                </div>
              </div>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  )
}

export default KICTAdminDashboard
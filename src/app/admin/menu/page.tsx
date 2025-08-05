'use client'

import { useState, useEffect } from 'react'

interface MenuItem {
  id: number
  title: string
  url: string
  parentId?: number
  order: number
  isActive: boolean
  target: '_self' | '_blank'
  icon?: string
  description?: string
  children?: MenuItem[]
}

interface MenuGroup {
  id: number
  name: string
  location: 'header' | 'footer' | 'sidebar'
  items: MenuItem[]
  isActive: boolean
}

export default function MenuAdminPage() {
  const [menuGroups, setMenuGroups] = useState<MenuGroup[]>([])
  const [selectedGroup, setSelectedGroup] = useState<MenuGroup | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 메뉴 편집 모달
  const [showMenuModal, setShowMenuModal] = useState(false)
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null)
  const [menuFormData, setMenuFormData] = useState({
    title: '',
    url: '',
    parentId: '',
    order: 1,
    isActive: true,
    target: '_self' as MenuItem['target'],
    icon: '',
    description: ''
  })

  // 그룹 편집 모달
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [editingGroup, setEditingGroup] = useState<MenuGroup | null>(null)
  const [groupFormData, setGroupFormData] = useState({
    name: '',
    location: 'header' as MenuGroup['location'],
    isActive: true
  })

  const [saving, setSaving] = useState(false)

  // 메뉴 그룹 로드
  const fetchMenuGroups = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/menus')
      const data = await response.json()

      if (data.success) {
        setMenuGroups(data.data)
        if (data.data.length > 0 && !selectedGroup) {
          setSelectedGroup(data.data[0])
        }
      } else {
        setError('메뉴 데이터를 불러오는데 실패했습니다.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
      console.error('Error fetching menus:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMenuGroups()
  }, [])

  // 메뉴 항목 편집 모달 열기
  const openMenuModal = (menu?: MenuItem, parentId?: number) => {
    if (menu) {
      setEditingMenu(menu)
      setMenuFormData({
        title: menu.title,
        url: menu.url,
        parentId: menu.parentId?.toString() || '',
        order: menu.order,
        isActive: menu.isActive,
        target: menu.target,
        icon: menu.icon || '',
        description: menu.description || ''
      })
    } else {
      setEditingMenu(null)
      const maxOrder = selectedGroup?.items.length ? Math.max(...selectedGroup.items.map(item => item.order)) : 0
      setMenuFormData({
        title: '',
        url: '',
        parentId: parentId?.toString() || '',
        order: maxOrder + 1,
        isActive: true,
        target: '_self',
        icon: '',
        description: ''
      })
    }
    setShowMenuModal(true)
  }

  // 그룹 편집 모달 열기
  const openGroupModal = (group?: MenuGroup) => {
    if (group) {
      setEditingGroup(group)
      setGroupFormData({
        name: group.name,
        location: group.location,
        isActive: group.isActive
      })
    } else {
      setEditingGroup(null)
      setGroupFormData({
        name: '',
        location: 'header',
        isActive: true
      })
    }
    setShowGroupModal(true)
  }

  // 메뉴 저장
  const saveMenu = async () => {
    if (!menuFormData.title.trim() || !menuFormData.url.trim()) {
      alert('제목과 URL은 필수입니다.')
      return
    }

    if (!selectedGroup) {
      alert('메뉴 그룹을 선택해주세요.')
      return
    }

    setSaving(true)

    try {
      const menuData = {
        ...menuFormData,
        parentId: menuFormData.parentId ? parseInt(menuFormData.parentId) : null,
        groupId: selectedGroup.id
      }

      const url = editingMenu 
        ? `/api/admin/menus/items/${editingMenu.id}`
        : '/api/admin/menus/items'
      
      const method = editingMenu ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(menuData)
      })

      if (response.ok) {
        alert(editingMenu ? '메뉴가 수정되었습니다.' : '메뉴가 추가되었습니다.')
        setShowMenuModal(false)
        fetchMenuGroups()
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

  // 그룹 저장
  const saveGroup = async () => {
    if (!groupFormData.name.trim()) {
      alert('그룹명은 필수입니다.')
      return
    }

    setSaving(true)

    try {
      const url = editingGroup 
        ? `/api/admin/menus/groups/${editingGroup.id}`
        : '/api/admin/menus/groups'
      
      const method = editingGroup ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupFormData)
      })

      if (response.ok) {
        alert(editingGroup ? '그룹이 수정되었습니다.' : '그룹이 추가되었습니다.')
        setShowGroupModal(false)
        fetchMenuGroups()
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

  // 메뉴 삭제
  const deleteMenu = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까? 하위 메뉴도 함께 삭제됩니다.')) return

    try {
      const response = await fetch(`/api/admin/menus/items/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('메뉴가 삭제되었습니다.')
        fetchMenuGroups()
      } else {
        alert('삭제 중 오류가 발생했습니다.')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  // 그룹 삭제
  const deleteGroup = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까? 그룹에 속한 모든 메뉴가 삭제됩니다.')) return

    try {
      const response = await fetch(`/api/admin/menus/groups/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('그룹이 삭제되었습니다.')
        setSelectedGroup(null)
        fetchMenuGroups()
      } else {
        alert('삭제 중 오류가 발생했습니다.')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  // 순서 변경
  const updateOrder = async (id: number, newOrder: number) => {
    try {
      const response = await fetch(`/api/admin/menus/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order: newOrder })
      })

      if (response.ok) {
        fetchMenuGroups()
      } else {
        alert('순서 변경에 실패했습니다.')
      }
    } catch (err) {
      console.error('Order update error:', err)
      alert('순서 변경 중 오류가 발생했습니다.')
    }
  }

  // 메뉴 트리 렌더링
  const renderMenuTree = (items: MenuItem[], level = 0) => {
    const parentItems = items.filter(item => !item.parentId)
    const childItems = items.filter(item => item.parentId)

    return parentItems.map(item => (
      <div key={item.id} className={`ml-${level * 4}`}>
        <div className="flex items-center justify-between p-3 border rounded-lg mb-2 bg-white">
          <div className="flex items-center gap-3">
            {item.icon && <span className="text-lg">{item.icon}</span>}
            <div>
              <div className="font-medium">{item.title}</div>
              <div className="text-sm text-gray-500">{item.url}</div>
              {item.description && (
                <div className="text-xs text-gray-400">{item.description}</div>
              )}
            </div>
            {!item.isActive && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">비활성</span>
            )}
            {item.target === '_blank' && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">새창</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={item.order}
              onChange={(e) => updateOrder(item.id, parseInt(e.target.value))}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
              min="1"
            />
            <button
              onClick={() => openMenuModal(undefined, item.id)}
              className="text-green-600 hover:text-green-900 text-sm"
            >
              하위추가
            </button>
            <button
              onClick={() => openMenuModal(item)}
              className="text-blue-600 hover:text-blue-900 text-sm"
            >
              편집
            </button>
            <button
              onClick={() => deleteMenu(item.id)}
              className="text-red-600 hover:text-red-900 text-sm"
            >
              삭제
            </button>
          </div>
        </div>
        {/* 하위 메뉴 렌더링 */}
        {childItems.filter(child => child.parentId === item.id).length > 0 && (
          <div className="ml-6 border-l-2 border-gray-200 pl-4">
            {renderMenuTree(childItems.filter(child => child.parentId === item.id), level + 1)}
          </div>
        )}
      </div>
    ))
  }

  const getLocationLabel = (location: string) => {
    const labels = {
      header: '헤더',
      footer: '푸터',
      sidebar: '사이드바'
    }
    return labels[location as keyof typeof labels] || location
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">메뉴 관리</h1>
        <button
          onClick={() => openGroupModal()}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          새 그룹 추가
        </button>
      </div>

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

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 메뉴 그룹 목록 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">메뉴 그룹</h2>
              <div className="space-y-2">
                {menuGroups.map(group => (
                  <div
                    key={group.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedGroup?.id === group.id
                        ? 'bg-blue-50 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedGroup(group)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{group.name}</div>
                        <div className="text-sm text-gray-500">{getLocationLabel(group.location)}</div>
                        <div className="text-xs text-gray-400">
                          {group.items.length}개 메뉴
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {!group.isActive && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                            비활성
                          </span>
                        )}
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              openGroupModal(group)
                            }}
                            className="text-blue-600 hover:text-blue-900 text-xs"
                          >
                            편집
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteGroup(group.id)
                            }}
                            className="text-red-600 hover:text-red-900 text-xs"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 메뉴 항목 목록 */}
          <div className="lg:col-span-3">
            {selectedGroup ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">{selectedGroup.name} 메뉴</h2>
                    <p className="text-sm text-gray-500">
                      {getLocationLabel(selectedGroup.location)} • {selectedGroup.items.length}개 항목
                    </p>
                  </div>
                  <button
                    onClick={() => openMenuModal()}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    메뉴 추가
                  </button>
                </div>

                {selectedGroup.items.length > 0 ? (
                  <div className="space-y-2">
                    {renderMenuTree(selectedGroup.items)}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p>메뉴가 없습니다.</p>
                    <button
                      onClick={() => openMenuModal()}
                      className="mt-2 text-blue-500 hover:text-blue-700"
                    >
                      첫 번째 메뉴 추가하기
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                <p>메뉴 그룹을 선택해주세요.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 메뉴 편집/추가 모달 */}
      {showMenuModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingMenu ? '메뉴 편집' : '새 메뉴 추가'}
              </h2>
              <button
                onClick={() => setShowMenuModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">메뉴명 *</label>
                <input
                  type="text"
                  value={menuFormData.title}
                  onChange={(e) => setMenuFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="메뉴 이름"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL *</label>
                <input
                  type="text"
                  value={menuFormData.url}
                  onChange={(e) => setMenuFormData(prev => ({ ...prev, url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="/about, https://example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">상위 메뉴</label>
                  <select
                    value={menuFormData.parentId}
                    onChange={(e) => setMenuFormData(prev => ({ ...prev, parentId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">없음 (최상위)</option>
                    {selectedGroup?.items.filter(item => !item.parentId).map(item => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">순서</label>
                  <input
                    type="number"
                    value={menuFormData.order}
                    onChange={(e) => setMenuFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">아이콘</label>
                <input
                  type="text"
                  value={menuFormData.icon}
                  onChange={(e) => setMenuFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="🏠 (이모지 또는 아이콘 클래스)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">설명</label>
                <input
                  type="text"
                  value={menuFormData.description}
                  onChange={(e) => setMenuFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="메뉴 설명 (선택사항)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">링크 대상</label>
                  <select
                    value={menuFormData.target}
                    onChange={(e) => setMenuFormData(prev => ({ ...prev, target: e.target.value as MenuItem['target'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="_self">같은 창</option>
                    <option value="_blank">새 창</option>
                  </select>
                </div>
                <div className="flex items-center mt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={menuFormData.isActive}
                      onChange={(e) => setMenuFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="mr-2"
                    />
                    활성화
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowMenuModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={saving}
              >
                취소
              </button>
              <button
                onClick={saveMenu}
                disabled={saving || !menuFormData.title.trim() || !menuFormData.url.trim()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? '저장 중...' : editingMenu ? '수정' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 그룹 편집/추가 모달 */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingGroup ? '그룹 편집' : '새 그룹 추가'}
              </h2>
              <button
                onClick={() => setShowGroupModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">그룹명 *</label>
                <input
                  type="text"
                  value={groupFormData.name}
                  onChange={(e) => setGroupFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="메뉴 그룹 이름"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">위치</label>
                <select
                  value={groupFormData.location}
                  onChange={(e) => setGroupFormData(prev => ({ ...prev, location: e.target.value as MenuGroup['location'] }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="header">헤더</option>
                  <option value="footer">푸터</option>
                  <option value="sidebar">사이드바</option>
                </select>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={groupFormData.isActive}
                    onChange={(e) => setGroupFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="mr-2"
                  />
                  활성화
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowGroupModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={saving}
              >
                취소
              </button>
              <button
                onClick={saveGroup}
                disabled={saving || !groupFormData.name.trim()}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? '저장 중...' : editingGroup ? '수정' : '추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
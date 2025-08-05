'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AdminPage() {
  const [inquiry, setInquiries] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('inquiry').select('*').order('created_at', { ascending: false })
      if (error) {
        console.error('불러오기 실패:', error)
      } else {
        setInquiries(data || [])
      }
    }
    fetchData()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">고객 문의 내역</h1>
      <ul className="space-y-4">
        {inquiry.map((item) => (
          <li key={item.id} className="border rounded p-4">
            <p><strong>이름:</strong> {item.name}</p>
            <p><strong>이메일:</strong> {item.email}</p>
            <p><strong>내용:</strong> {item.message}</p>
            <p className="text-gray-500 text-sm">{new Date(item.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
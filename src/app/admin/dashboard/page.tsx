'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AdminDashboard() {
  const [admins, setAdmins] = useState([])
  const router = useRouter()

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in')
    if (!loggedIn) {
      router.push('/admin')
    } else {
      fetchAdmins()
    }
  }, [])

  const fetchAdmins = async () => {
    const { data, error } = await supabase.from('admin').select('*')
    if (!error && data) {
      setAdmins(data)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Domain</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin: any) => (
            <tr key={admin.id}>
              <td className="border px-4 py-2">{admin.username}</td>
              <td className="border px-4 py-2">{admin.domain}</td>
              <td className="border px-4 py-2">{new Date(admin.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

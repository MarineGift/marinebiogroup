'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Mail, 
  FileText, 
  Image, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  LogOut,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { title: 'Total Contacts', value: '1,234', icon: Mail, change: '+12%' },
    { title: 'Newsletter Subscribers', value: '5,678', icon: Users, change: '+8%' },
    { title: 'Blog Posts', value: '42', icon: FileText, change: '+3%' },
    { title: 'Products', value: '18', icon: ShoppingBag, change: '+5%' },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'contacts', label: 'Contacts', icon: Mail },
    { id: 'newsletter', label: 'Newsletter', icon: Users },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 marine-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h1 className="text-xl font-bold text-marine">Admin Dashboard</h1>
            </div>
            
            <Button
              onClick={onLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-marine text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-marine mb-6">Dashboard Overview</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-lg p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-marine">{stat.value}</p>
                          <p className="text-sm text-green-600">{stat.change}</p>
                        </div>
                        <stat.icon className="h-8 w-8 text-marine" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-marine mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { action: 'New contact form submission', time: '2 minutes ago', type: 'contact' },
                      { action: 'Newsletter subscription', time: '15 minutes ago', type: 'newsletter' },
                      { action: 'Blog post published', time: '1 hour ago', type: 'blog' },
                      { action: 'Product updated', time: '3 hours ago', type: 'product' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className="w-8 h-8 marine-gradient rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{activity.type[0].toUpperCase()}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'contacts' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-marine">Contact Messages</h2>
                  <Button className="bg-marine hover:bg-marine/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Recent Contacts</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {[
                      { name: 'John Smith', email: 'john@example.com', type: 'Partnership', date: '2024-01-15' },
                      { name: 'Sarah Johnson', email: 'sarah@example.com', type: 'Product Info', date: '2024-01-14' },
                      { name: 'Mike Davis', email: 'mike@example.com', type: 'Investment', date: '2024-01-13' },
                    ].map((contact, index) => (
                      <div key={index} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.email}</p>
                            <p className="text-xs text-gray-400">{contact.type} • {contact.date}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Other tabs would be implemented similarly */}
            {activeTab !== 'overview' && activeTab !== 'contacts' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg shadow-sm p-8 text-center"
              >
                <h2 className="text-2xl font-bold text-marine mb-4">
                  {tabs.find(tab => tab.id === activeTab)?.label} Management
                </h2>
                <p className="text-gray-600 mb-6">
                  This section is under development. Full functionality will be available soon.
                </p>
                <Button className="bg-marine hover:bg-marine/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
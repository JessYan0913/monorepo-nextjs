'use client'

import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const GrowthReportPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('online')

  const handleBack = () => {
    router.back()
  }

  // 模拟成长报告数据
  const reports = [
    {
      id: 1,
      title: '成长报告',
      date: '2025.05.29 23:59 59',
      teacher: '乐动智慧',
      image: '/api/placeholder/120/80'
    },
    {
      id: 2,
      title: '成长报告',
      date: '2025.05.29 23:59 59',
      teacher: '乐动智慧',
      image: '/api/placeholder/120/80'
    },
    {
      id: 3,
      title: '成长报告',
      date: '2025.05.29 23:59 59',
      teacher: '乐动智慧',
      image: '/api/placeholder/120/80'
    },
    {
      id: 4,
      title: '成长报告',
      date: '2025.05.29 23:59 59',
      teacher: '乐动智慧',
      image: '/api/placeholder/120/80'
    }
  ]

  return (
    <div className="min-h-screen bg-orange-50">
      {/* 顶部导航栏 */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <button 
            onClick={handleBack}
            className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-medium text-gray-900">成长报告</h1>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* 左侧选项卡区域 */}
        <div className="w-32 bg-orange-50 p-4 flex flex-col space-y-3">
          <button
            onClick={() => setActiveTab('online')}
            className={`px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'online'
                ? 'bg-orange-400 text-white shadow-md'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
            }`}
          >
            线上
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
              activeTab === 'offline'
                ? 'bg-orange-400 text-white shadow-md'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
            }`}
          >
            线下
          </button>
        </div>

        {/* 右侧成长报告列表区域 */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                {/* 报告图片区域 */}
                <div className="relative h-32 bg-gradient-to-br from-sky-300 to-sky-400 flex items-center justify-center">
                  {/* 卡通机器人角色 */}
                  <div className="relative">
                    {/* 机器人主体 */}
                    <div className="w-16 h-20 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center relative">
                      {/* 机器人脸部 */}
                      <div className="flex space-x-1.5 mb-1">
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                      </div>
                      <div className="w-4 h-1 bg-gray-600 rounded-full mb-2"></div>
                      
                      {/* 机器人身体装饰 */}
                      <div className="w-8 h-6 bg-sky-100 rounded flex items-center justify-center">
                        <div className="text-xs">📊</div>
                      </div>
                    </div>
                    
                    {/* 机器人帽子 */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-4 bg-yellow-400 rounded-t-lg flex items-center justify-center">
                        <div className="w-1 h-1 bg-yellow-600 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* 机器人手臂 */}
                    <div className="absolute left-0 top-6 transform -translate-x-2">
                      <div className="w-3 h-6 bg-white rounded shadow-md flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm flex items-center justify-center">
                          <span className="text-xs">👋</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-0 top-6 transform translate-x-2">
                      <div className="w-3 h-6 bg-white rounded shadow-md"></div>
                    </div>
                  </div>
                </div>

                {/* 报告信息区域 */}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-500 mb-1">{report.date}</p>
                  <div className="inline-block px-3 py-1 bg-sky-100 text-sky-600 text-sm rounded-full">
                    {report.teacher}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GrowthReportPage
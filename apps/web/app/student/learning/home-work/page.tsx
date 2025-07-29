"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@repo/ui/components/ui/button'
import { DetailLayout } from '@/components/detail-layout'

export default function HomeWorkPage() {
  // 状态管理
  const [activeTab, setActiveTab] = useState<'online' | 'offline'>('online')
  
  // 课后作业数据
  const homeworks = [
    {
      id: 'homework-1',
      title: '乐动智趣课包——第一节课小节作业',
      courseTitle: '乐动智趣课程',
      status: 'completed',
      feedback: '已反馈',
      teacher: '老师已反馈',
      date: '2025.05.02',
      thumbnail: '/api/placeholder/800/450',
      category: '综合能力',
      type: 'online'
    },
    {
      id: 'homework-2',
      title: '乐动智趣课包——第一节课小节作业',
      courseTitle: '乐动智趣课程',
      status: 'waiting',
      feedback: '等待老师反馈',
      teacher: '等待老师反馈',
      date: '2025.05.02',
      thumbnail: '/api/placeholder/800/450',
      category: '综合能力',
      type: 'online'
    },
    {
      id: 'homework-3',
      title: '乐动智趣课包——第一节课小节作业',
      courseTitle: '乐动智趣课程',
      status: 'incomplete',
      feedback: '未完成作业',
      teacher: '未完成作业',
      date: '2025.05.02',
      thumbnail: '/api/placeholder/800/450',
      category: '综合能力',
      type: 'online'
    },
    {
      id: 'homework-4',
      title: '儿童编程基础课——第二节课小节作业',
      courseTitle: '儿童编程基础课',
      status: 'completed',
      feedback: '已反馈',
      teacher: '老师已反馈',
      date: '2025.05.01',
      thumbnail: '/api/placeholder/800/450',
      category: '编程启蒙',
      type: 'offline'
    },
    {
      id: 'homework-5',
      title: '英语口语训练——第三节课小节作业',
      courseTitle: '英语口语训练',
      status: 'waiting',
      feedback: '等待老师反馈',
      teacher: '等待老师反馈',
      date: '2025.04.30',
      thumbnail: '/api/placeholder/800/450',
      category: '语言学习',
      type: 'offline'
    },
    {
      id: 'homework-6',
      title: '数学思维训练——第四节课小节作业',
      courseTitle: '数学思维训练',
      status: 'incomplete',
      feedback: '未完成作业',
      teacher: '未完成作业',
      date: '2025.04.29',
      thumbnail: '/api/placeholder/800/450',
      category: '数学思维',
      type: 'offline'
    }
  ]

  // 根据当前选中的标签筛选作业
  const filteredHomeworks = homeworks.filter(homework => homework.type === activeTab)

  return (
    <DetailLayout title="课后作业">
      {/* 内容区域 */}
      <div className="flex gap-6 h-full">
        {/* 左侧选项卡 - 垂直排列 */}
        <div className="w-1/3 md:w-48 py-6 px-2 space-y-2 bg-orange-50 rounded-xl flex-shrink-0">
          <button
            onClick={() => setActiveTab('online')}
            className={`w-full py-4 px-6 rounded-xl text-center font-medium transition-all duration-200 ${
              activeTab === 'online'
                ? 'bg-orange-400 text-white shadow-lg'
                : 'bg-orange-200 text-orange-800 hover:bg-orange-300'
            }`}
          >
            线上
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={`w-full py-4 px-6 rounded-xl text-center font-medium transition-all duration-200 ${
              activeTab === 'offline'
                ? 'bg-orange-400 text-white shadow-lg'
                : 'bg-orange-200 text-orange-800 hover:bg-orange-300'
            }`}
          >
            线下
          </button>
        </div>
        
        {/* 右侧作业列表区域 */}
        <div className="flex-1 py-6 overflow-y-auto rounded-xl bg-orange-50">
          <div className="space-y-4 px-6">
            {filteredHomeworks.map((homework) => (
              <Link 
                href={`/student/learning/home-work/${homework.id}`} 
                key={homework.id}
                className="block bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300"
              >
                <div className="flex items-center p-4">
                  {/* 左侧课程图标 */}
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">📚</span>
                    </div>
                  </div>
                  
                  {/* 中间作业信息 */}
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                      {homework.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{homework.teacher}</span>
                    </div>
                  </div>
                  
                  {/* 右侧状态和日期 */}
                  <div className="flex flex-col items-end">
                    {/* 状态标签 */}
                    <div className="mb-2">
                      {homework.status === 'completed' && (
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                          已完成
                        </span>
                      )}
                      {homework.status === 'waiting' && (
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                          已完成
                        </span>
                      )}
                      {homework.status === 'incomplete' && (
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
                          未完成
                        </span>
                      )}
                    </div>
                    
                    {/* 日期 */}
                    <div className="text-xs text-gray-400">
                      {homework.date}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* 无作业时的提示 */}
          {filteredHomeworks.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">暂无{activeTab === 'online' ? '线上' : '线下'}作业</p>
            </div>
          )}
        </div>
      </div>
    </DetailLayout>
  )
}

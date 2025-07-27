'use client'

import Link from 'next/link'
import { Play } from 'lucide-react'
import { DetailLayout } from '@/components/detail-layout'
import { Button } from '@repo/ui/components/ui/button'

export default function RecommendVideosPage() {
  // 模拟热门视频数据
  const hotVideos = [
    {
      id: '1',
      title: '乐动智趣课包——第一节课试播',
      date: '2025.05.02',
      time: '14:12',
      tag: '乐动智趣',
      thumbnail: '/api/placeholder/800/450'
    },
    {
      id: '2',
      title: '乐动智趣课包——第一节课试播',
      date: '2025.05.02',
      time: '14:12',
      tag: '乐动智趣',
      thumbnail: '/api/placeholder/800/450'
    },
    {
      id: '3',
      title: '乐动智趣课包——第一节课试播',
      date: '2025.05.02',
      time: '14:12',
      tag: '乐动智趣',
      thumbnail: '/api/placeholder/800/450'
    },
    {
      id: '4',
      title: '乐动智趣课包——第一节课试播',
      date: '2025.05.02',
      time: '14:12',
      tag: '体能活动',
      thumbnail: '/api/placeholder/800/450'
    },
    {
      id: '5',
      title: '乐动智趣课包——第一节课试播',
      date: '2025.05.02',
      time: '14:12',
      tag: '乐动智趣',
      thumbnail: '/api/placeholder/800/450'
    },
    {
      id: '6',
      title: '乐动智趣课包——第一节课试播',
      date: '2025.05.02',
      time: '14:12',
      tag: '乐动智趣',
      thumbnail: '/api/placeholder/800/450'
    }
  ]

  return (
    <DetailLayout title="推荐课程">
      {/* 页面标题 - 移动端显示 */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 md:hidden">
        推荐课程
      </h1>
      
      {/* 视频列表 - 响应式网格布局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {hotVideos.map((video) => (
          <Link 
            href={`/student/course/${video.id}`} 
            key={video.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300"
          >
            {/* 视频缩略图区域 */}
            <div className="relative w-full h-48 md:h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
              {/* 视频缩略图背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20"></div>
              
              {/* 播放按钮 - 适应iPad更大的触控区域 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/95 hover:bg-white dark:bg-white/90 dark:hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Play className="w-7 h-7 md:w-8 md:h-8 text-orange-600 ml-1 transition-colors" fill="currentColor" />
                </div>
              </div>
            </div>
            
            {/* 视频信息区域 */}
            <div className="p-4 md:p-5">
              {/* 视频标题 */}
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {video.title}
              </h3>
              
              {/* 时间和标签 */}
              <div className="flex flex-wrap justify-between items-center mt-3">
                <div className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                  {video.date} {video.time}
                </div>
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-sm font-medium rounded-full">
                  {video.tag}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
          
      {/* 分页或加载更多按钮 - 适应iPad */}
      <div className="mt-8 md:mt-12 flex justify-center">
        <Button className="px-6 py-3 md:py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center shadow-md">
          <span>加载更多</span>
        </Button>
      </div>
    </DetailLayout>
  )
}

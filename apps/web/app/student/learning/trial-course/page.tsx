'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@repo/ui/components/ui/button'
import { Play, ChevronLeft, Clock, User } from 'lucide-react'

export default function TrialCoursePage() {
  const router = useRouter()
  // 体验课程数据
  const trialCourses = [
    {
      id: 'trial-1',
      title: '乐动智趣体验课 - 音乐启蒙',
      description: '通过音乐和节奏培养孩子的乐感和协调能力',
      duration: '45分钟',
      tag: '音乐启蒙',
      level: '初级',
      students: 128,
      teacher: '张老师',
      thumbnail: '/api/placeholder/800/450',
      category: '艺术'
    },
    {
      id: 'trial-2',
      title: '小小科学家 - 物理实验',
      description: '简单有趣的物理实验，激发孩子科学兴趣',
      duration: '60分钟',
      tag: '科学实验',
      level: '初级',
      students: 95,
      teacher: '李教授',
      thumbnail: '/api/placeholder/800/450',
      category: '科学'
    },
    {
      id: 'trial-3',
      title: '创意美术 - 水彩画基础',
      description: '学习基本水彩技巧，培养艺术创造力',
      duration: '50分钟',
      tag: '美术创作',
      level: '入门',
      students: 76,
      teacher: '王老师',
      thumbnail: '/api/placeholder/800/450',
      category: '艺术'
    },
    {
      id: 'trial-4',
      title: '少儿编程 - Scratch入门',
      description: '通过游戏学习编程思维',
      duration: '60分钟',
      tag: '编程启蒙',
      level: '入门',
      students: 203,
      teacher: '陈老师',
      thumbnail: '/api/placeholder/800/450',
      category: '科技'
    },
    {
      id: 'trial-5',
      title: '趣味英语 - 动物世界',
      description: '通过动物主题学习基础英语',
      duration: '40分钟',
      tag: '英语启蒙',
      level: '初级',
      students: 156,
      teacher: 'Sarah',
      thumbnail: '/api/placeholder/800/450',
      category: '语言'
    },
    {
      id: 'trial-6',
      title: '少儿体适能 - 基础训练',
      description: '培养孩子基础运动能力',
      duration: '55分钟',
      tag: '体能训练',
      level: '初级',
      students: 89,
      teacher: '张教练',
      thumbnail: '/api/placeholder/800/450',
      category: '体育'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* 顶部导航栏 - 适应iPad */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-6 py-4 md:py-5">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost"
              onClick={() => router.back()}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-base md:text-lg"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span>返回</span>
            </Button>
            
            {/* iPad上显示的页面标题 */}
            <h2 className="hidden md:block text-lg font-medium text-gray-700 dark:text-gray-300">
              体验课程
            </h2>
          </div>
        </div>
      </div>
      
      {/* 内容区域 - 支持滚动 */}
      <div className="flex-1 overflow-y-auto">  
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* 页面标题 - 移动端显示 */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 md:hidden">
            体验课程
          </h1>
          
          {/* 视频列表 - 响应式网格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {trialCourses.map((course) => (
              <Link 
                href={`/student/course/${course.id}`} 
                key={course.id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300"
              >
                {/* 课程缩略图区域 */}
                <div className="relative w-full h-48 md:h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
                  {/* 根据课程类别显示不同颜色的渐变背景 */}
                  <div className={`absolute inset-0 ${
                    course.category === '艺术' ? 'bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20' :
                    course.category === '科学' ? 'bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20' :
                    course.category === '科技' ? 'bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20' :
                    course.category === '语言' ? 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20' :
                    'bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20'
                  }`}></div>
                  
                  {/* 播放按钮 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white/95 hover:bg-white dark:bg-white/90 dark:hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-orange-600 ml-1 transition-colors" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* 课程时长 */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {course.duration}
                  </div>
                </div>
                
                {/* 课程信息区域 */}
                <div className="p-4 md:p-5">
                  {/* 课程类别标签 */}
                  <span className="inline-block px-2 py-1 text-xs font-medium mb-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                    {course.category}
                  </span>
                  
                  {/* 课程标题 */}
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  {/* 课程描述 */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  
                  {/* 课程信息 */}
                  <div className="flex flex-wrap justify-between items-center mt-2">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <User className="w-4 h-4 mr-1" />
                      {course.teacher}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {course.students}人已体验
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* 分页或加载更多按钮 - 适应iPad */}
          <div className="mt-8 md:mt-12 flex justify-center">
            <button className="px-6 py-3 md:py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center shadow-md">
              <span>加载更多</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

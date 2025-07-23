import Link from 'next/link'
import { Play, ArrowLeft } from 'lucide-react'

interface CourseDetailPageProps {
  params: {
    id: string
  }
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  // 模拟课程数据
  const courseData = {
    id: params.id,
    title: '木工坊课程学习技能突破',
    date: '2025.04.21',
    time: '09:32',
    tag: '乐动智慧',
    teacher: '李如如',
    content: '课程计划：这是根据教育目的和不同类型学校的教育任务，由国家教育主管部门制定的有关教学和教育工作的指导性文件。它主要针对各级各类学校，包含教学科目的设置、学',
    videoThumbnail: '/api/placeholder/800/450'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* 顶部导航栏 - 适应iPad */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-6 py-4 md:py-5">
          <div className="flex justify-between items-center">
            <Link 
              href="/student" 
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-base md:text-lg"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span>返回</span>
            </Link>
            
            {/* iPad上显示的课程标题 */}
            <h2 className="hidden md:block text-lg font-medium text-gray-700 dark:text-gray-300 truncate max-w-md">
              {courseData.title}
            </h2>
          </div>
        </div>
      </div>
      
      {/* 内容区域 - 支持滚动 */}
      <div className="flex-1 overflow-y-auto">  
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* 课程视频区域 - 适应iPad */}
          <div className="relative mb-8">
            <div className="relative w-full h-64 md:h-96 lg:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl overflow-hidden shadow-lg">
              {/* 视频缩略图背景 */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20"></div>
              
              {/* 播放按钮 - 适应iPad更大的触控区域 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 md:w-24 md:h-24 bg-white/95 hover:bg-white dark:bg-white/90 dark:hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 group">
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-blue-600 ml-1 group-hover:text-blue-700 transition-colors" fill="currentColor" />
                </button>
              </div>
              
              {/* 视频时长标签 */}
              <div className="absolute bottom-4 right-4">
                <span className="bg-black/70 text-white text-sm px-2 py-1 rounded">
                  15:32
                </span>
              </div>
            </div>
          </div>

          {/* 课程信息卡片 - 适应iPad */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 md:p-10">
              {/* 课程标题 - 适应iPad更大字体 */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 leading-tight">
                {courseData.title}
              </h1>
              
              {/* 时间和标签行 - 适应iPad */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <div className="text-sm md:text-base text-gray-500 dark:text-gray-400">
                  {courseData.date} {courseData.time}
                </div>
                <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-sm md:text-base font-medium rounded-full">
                  {courseData.tag}
                </span>
              </div>
            
              {/* 分隔线 */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>
              
              {/* 课程简介 - 适应iPad */}
              <div className="mb-8 md:mb-10">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4 md:mb-6 flex items-center">
                  <div className="w-1 h-6 md:h-8 bg-blue-500 rounded-full mr-3"></div>
                  课程简介
                </h2>
              </div>
              
              {/* 课程详细信息 - 适应iPad */}
              <div className="space-y-6 md:space-y-8">
                {/* 教师信息 */}
                <div className="flex items-center p-4 md:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-4 md:mr-6">
                    <span className="text-blue-600 dark:text-blue-300 font-semibold text-sm md:text-base">师</span>
                  </div>
                  <div>
                    <div className="text-sm md:text-base text-gray-500 dark:text-gray-400">授课教师</div>
                    <div className="font-medium text-gray-900 dark:text-white text-base md:text-lg">{courseData.teacher}</div>
                  </div>
                </div>
                
                {/* 内容描述 - 适应iPad */}
                <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-2 md:mb-3">课程内容</div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">{courseData.content}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 底部操作区域 - 适应iPad */}
          <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-center md:justify-between items-center space-y-4 md:space-y-0">
            {/* iPad上显示的额外操作按钮 */}
            <div className="flex space-x-4 md:order-1">
              <button className="px-6 py-3 md:py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200 flex items-center">
                <span className="mr-2">收藏课程</span>
              </button>
              <button className="px-6 py-3 md:py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200 flex items-center">
                <span className="mr-2">分享</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
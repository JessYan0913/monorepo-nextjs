import Link from 'next/link'
import { Play, ArrowLeft } from 'lucide-react'

export default function HotVideosPage() {
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
    }
  ]

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
            
            {/* iPad上显示的页面标题 */}
            <h2 className="hidden md:block text-lg font-medium text-gray-700 dark:text-gray-300">
              热门视频
            </h2>
          </div>
        </div>
      </div>
      
      {/* 内容区域 - 支持滚动 */}
      <div className="flex-1 overflow-y-auto">  
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* 页面标题 - 移动端显示 */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 md:hidden">
            热门视频
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
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-blue-600 ml-1 transition-colors" fill="currentColor" />
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
            <button className="px-6 py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center shadow-md">
              <span>加载更多</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

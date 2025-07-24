import Link from 'next/link'
import { Play, ArrowLeft, Clock, User } from 'lucide-react'

export default function MyCourseListPage() {
  // 我的课程数据
  const myCourses = [
    {
      id: 'course-1',
      title: '乐动智趣课程 - 第一阶段',
      description: '音乐与运动结合的综合能力培养课程',
      duration: '12课时',
      tag: '综合能力',
      level: '初级',
      progress: 75,
      teacher: '张老师',
      thumbnail: '/api/placeholder/800/450',
      category: '综合',
      nextClass: '2025.07.26'
    },
    {
      id: 'course-2',
      title: '儿童编程思维培养',
      description: '通过图形化编程培养逻辑思维和创造力',
      duration: '16课时',
      tag: '编程启蒙',
      level: '中级',
      progress: 50,
      teacher: '陈老师',
      thumbnail: '/api/placeholder/800/450',
      category: '科技',
      nextClass: '2025.07.25'
    },
    {
      id: 'course-3',
      title: '英语口语强化训练',
      description: '通过情景对话提升英语口语表达能力',
      duration: '24课时',
      tag: '语言学习',
      level: '进阶',
      progress: 30,
      teacher: 'Sarah',
      thumbnail: '/api/placeholder/800/450',
      category: '语言',
      nextClass: '2025.07.27'
    },
    {
      id: 'course-4',
      title: '数学思维训练营',
      description: '培养数学逻辑思维和解题能力',
      duration: '20课时',
      tag: '数学思维',
      level: '中级',
      progress: 60,
      teacher: '李教授',
      thumbnail: '/api/placeholder/800/450',
      category: '学科',
      nextClass: '2025.07.29'
    },
    {
      id: 'course-5',
      title: '创意美术进阶课程',
      description: '多种绘画技法与艺术表现形式的探索',
      duration: '18课时',
      tag: '艺术创作',
      level: '进阶',
      progress: 40,
      teacher: '王老师',
      thumbnail: '/api/placeholder/800/450',
      category: '艺术',
      nextClass: '2025.07.30'
    },
    {
      id: 'course-6',
      title: '科学实验探索课',
      description: '通过动手实验了解科学原理',
      duration: '15课时',
      tag: '科学探索',
      level: '初级',
      progress: 20,
      teacher: '赵博士',
      thumbnail: '/api/placeholder/800/450',
      category: '科学',
      nextClass: '2025.08.01'
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
              我的课程
            </h2>
          </div>
        </div>
      </div>
      
      {/* 内容区域 - 支持滚动 */}
      <div className="flex-1 overflow-y-auto">  
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* 页面标题 - 移动端显示 */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 md:hidden">
            我的课程
          </h1>
          
          {/* 课程列表 - 响应式网格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {myCourses.map((course) => (
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
                  
                  {/* 进度条 */}
                  <div className="absolute bottom-3 left-3 right-16 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-500" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
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
                      下节课：{course.nextClass}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* 分页或加载更多按钮 - 适应iPad */}
          <div className="mt-8 md:mt-12 flex justify-center">
            <button className="px-6 py-3 md:py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center shadow-md">
              <span>查看全部课程</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

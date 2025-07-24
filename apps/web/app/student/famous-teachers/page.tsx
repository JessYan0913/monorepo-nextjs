import Link from 'next/link'
import { ArrowLeft, Star, Award, Users } from 'lucide-react'

export default function FamousTeachersPage() {
  // 模拟名师数据
  const famousTeachers = [
    {
      id: '1',
      name: '双双老师',
      school: '顺义校区',
      specialties: ['感觉统合大运动', '幼儿感统', '规范与指令约束'],
      title: '感觉统合训练指导师(高级)',
      avatar: '/api/placeholder/200/200',
      rating: 4.9,
      students: 156,
      experience: '5年教学经验'
    },
    {
      id: '2',
      name: '李明老师',
      school: '朝阳校区',
      specialties: ['注意力训练', '认知能力提升', '学习能力培养'],
      title: '注意力训练专家',
      avatar: '/api/placeholder/200/200',
      rating: 4.8,
      students: 203,
      experience: '8年教学经验'
    },
    {
      id: '3',
      name: '王芳老师',
      school: '海淀校区',
      specialties: ['语言发育训练', '社交能力培养', '情绪管理'],
      title: '语言发育训练师',
      avatar: '/api/placeholder/200/200',
      rating: 4.9,
      students: 178,
      experience: '6年教学经验'
    },
    {
      id: '4',
      name: '张华老师',
      school: '西城校区',
      specialties: ['精细动作训练', '手眼协调', '书写能力培养'],
      title: '精细动作训练专家',
      avatar: '/api/placeholder/200/200',
      rating: 4.7,
      students: 134,
      experience: '4年教学经验'
    },
    {
      id: '5',
      name: '刘丽老师',
      school: '东城校区',
      specialties: ['感觉统合训练', '平衡协调', '本体觉训练'],
      title: '感觉统合训练指导师',
      avatar: '/api/placeholder/200/200',
      rating: 4.8,
      students: 189,
      experience: '7年教学经验'
    },
    {
      id: '6',
      name: '陈强老师',
      school: '丰台校区',
      specialties: ['体能训练', '大运动发展', '运动协调'],
      title: '体能训练专家',
      avatar: '/api/placeholder/200/200',
      rating: 4.9,
      students: 167,
      experience: '9年教学经验'
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
              名师团队
            </h2>
          </div>
        </div>
      </div>
      
      {/* 内容区域 - 支持滚动 */}
      <div className="flex-1 overflow-y-auto">  
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* 页面标题 - 移动端显示 */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 md:hidden">
            名师团队
          </h1>
          
          {/* 名师列表 - 响应式网格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {famousTeachers.map((teacher) => (
              <div 
                key={teacher.id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 cursor-pointer"
              >
                {/* 教师头像区域 */}
                <div className="relative w-full h-48 md:h-56 bg-gradient-to-br from-orange-50 to-blue-50 dark:from-orange-900/20 dark:to-blue-900/20 overflow-hidden">
                  {/* 头像背景装饰 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-blue-100/50 dark:from-orange-900/30 dark:to-blue-900/30"></div>
                  
                  {/* 教师头像 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-28 md:h-28 bg-white dark:bg-gray-700 rounded-full border-4 border-white dark:border-gray-600 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full bg-gradient-to-br from-orange-200 to-blue-200 dark:from-orange-800 dark:to-blue-800 flex items-center justify-center">
                        <span className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-300">
                          {teacher.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 评分标识 */}
                  <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-800/95 rounded-full px-2 py-1 flex items-center shadow-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{teacher.rating}</span>
                  </div>
                </div>
                
                {/* 教师信息区域 */}
                <div className="p-4 md:p-5">
                  {/* 教师姓名和校区 */}
                  <div className="mb-3">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {teacher.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{teacher.school}</p>
                  </div>
                  
                  {/* 职称 */}
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 text-sm font-medium rounded-full">
                      <Award className="w-3 h-3 mr-1" />
                      {teacher.title}
                    </span>
                  </div>
                  
                  {/* 专长领域 */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">擅长：</p>
                    <div className="flex flex-wrap gap-1">
                      {teacher.specialties.slice(0, 2).map((specialty, index) => (
                        <span 
                          key={index}
                          className="inline-block px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs rounded-md"
                        >
                          {specialty}
                        </span>
                      ))}
                      {teacher.specialties.length > 2 && (
                        <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                          +{teacher.specialties.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* 统计信息 */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{teacher.students}位学员</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {teacher.experience}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 分页或加载更多按钮 - 适应iPad */}
          <div className="mt-8 md:mt-12 flex justify-center">
            <button className="px-6 py-3 md:py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center shadow-md">
              <span>查看更多名师</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
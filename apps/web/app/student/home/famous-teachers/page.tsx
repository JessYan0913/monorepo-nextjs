'use client'

import { useState } from 'react'
import { Star, Award, Users } from 'lucide-react'
import { DetailLayout } from '@/components/detail-layout'

export default function FamousTeachersPage() {
  const [currentSchool, setCurrentSchool] = useState<string>('顺义校区')
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
    <DetailLayout title="名师团队">
      {/* 内容区域 - 支持滚动 */}
      <div className="flex h-full gap-6">  
        {/* 左侧选项卡 - 垂直排列 */}
        <div className="w-1/3 md:w-48 py-6 px-2 space-y-2 bg-orange-50 rounded-xl flex-shrink-0">
          {["顺义校区", "朝阳校区", "海淀校区", "西城校区", "东城校区", "丰台校区"].map((school) => (
            <button
              key={school}
              onClick={() => setCurrentSchool(school)}
              className={`w-full py-4 px-6 rounded-xl text-center font-medium transition-all duration-200 ${
                currentSchool === school
                  ? 'bg-orange-400 text-white shadow-lg'
                  : 'bg-orange-200 text-orange-800 hover:bg-orange-300'
              }`}
            >
              {school}
            </button>
          ))}
        </div>
        
        <div className="flex-1 py-6 px-8 overflow-y-auto rounded-xl bg-orange-50">
          {/* 名师列表 */}
          <div className="flex flex-col gap-4">
            {famousTeachers.map((teacher) => (
              <div 
                key={teacher.id}
                className="w-full flex p-2 gap-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* 教师头像区域 */}
                <div className="w-[156px] h-[167px] rounded-sm bg-orange-50">
                </div>
                
                {/* 教师信息区域 */}
                <div className="flex-1">
                  {/* 教师姓名和校区 */}
                  <div className="mb-3 flex items-center">
                    <h3 className="text-lg flex-1/4 md:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {teacher.name}
                    </h3>
                    <p className="text-sm flex-3/4 text-gray-500 dark:text-gray-400">{teacher.school}</p>
                  </div>
                  
                  {/* 职称 */}
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 text-sm font-medium rounded-full">
                      <Award className="w-3 h-3 mr-1" />
                      {teacher.title}
                    </span>
                  </div>
                  
                  {/* 专长领域 */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">擅长： { teacher.specialties.join(', ') }</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 分页或加载更多按钮 - 适应iPad */}
          <div className="mt-8 md:mt-12 flex justify-center col-span-full">
            <button className="px-6 py-3 md:py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center shadow-md">
              <span>查看更多名师</span>
            </button>
          </div>
        </div>
      </div>
    </DetailLayout>
  )
}
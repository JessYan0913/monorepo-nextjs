'use client'

import React from 'react'
import { Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@repo/ui/components/ui/progress'

const ProfilePage = () => {
  const router = useRouter()

  const services = [
    {
      id: 'report',
      title: '成长报告',
      bgColor: 'from-blue-100 to-blue-200',
      robotBg: 'bg-blue-100',
      path: '/student/growth-report'
    },
    {
      id: 'question',
      title: '问卷报告', 
      bgColor: 'from-yellow-100 to-yellow-200',
      robotBg: 'bg-yellow-100',
      path: '/student/questionnaire'
    },
    {
      id: 'orders',
      title: '我的订单',
      bgColor: 'from-green-100 to-green-200',
      robotBg: 'bg-green-100',
      path: '/student/orders'
    }
  ]

  const handleServiceClick = (service: typeof services[0]) => {
    router.push(service.path)
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      {/* 容器 - 固定宽度适配iPad */}
      <div className="w-full mx-auto px-6 py-8 min-h-screen flex flex-col">
        
        {/* 顶部卡片区域 - 严格按照图片比例 */}
        <div className="flex-2/3 w-full flex gap-4 mb-6">
          {/* 用户信息卡片 */}
          <div className="flex-2/5 flex flex-col bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden">
            {/* 用户头像和信息 */}
            <div className="flex-1/2 flex p-6 items-center mb-6">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mr-4 backdrop-blur-sm border-2 border-white/30">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-base">陈</span>
                </div>
              </div>
              <div className="flex-1 h-full grid grid-cols-1 grid-rows-3">
                <h1 className="text-4xl font-bold mb-1">陈小乐</h1>
                <p className="text-white/90 text-xl mb-0.5">13808298531</p>
                <p className="text-white/90 text-xl">顺义校区</p>
              </div>
            </div>

            {/* VIP进度区域 */}
            <div className="flex-1/2 flex-col items-center">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/90 text-sm font-medium">VIP2</span>
                <span className="text-white/90 text-sm font-medium">VIP3</span>
              </div>
              <Progress value={50} className="w-full h-4 rounded-full bg-white/10" />
              <div className="text-center text-white/90 text-sm font-medium">12/36</div>
            </div>

            {/* 右下角目标图标 */}
            <div className="absolute bottom-8 right-8">
              <Settings className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* BEST YOU 宣传卡片 */}
          <div className="flex-3/5 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden">
            {/* 太空装饰元素 */}
            <div className="absolute inset-0 opacity-30">
              {/* 彩色方块装饰 */}
              <div className="absolute top-6 right-8 w-6 h-6 bg-pink-400 rounded-md rotate-12"></div>
              <div className="absolute top-12 right-14 w-4 h-4 bg-yellow-400 rounded rotate-45"></div>
              <div className="absolute bottom-20 right-10 w-8 h-8 bg-green-400 rounded-lg -rotate-12"></div>
              <div className="absolute top-10 left-8 w-3 h-3 bg-orange-400 rounded-full"></div>
              <div className="absolute bottom-12 left-10 w-5 h-5 bg-cyan-400 rounded rotate-12"></div>
              <div className="absolute top-16 right-6 w-3 h-3 bg-red-400 rounded-full"></div>
            </div>

            {/* 顶部云朵笑脸 */}
            <div className="absolute top-4 left-4">
              <div className="w-10 h-6 bg-white rounded-full relative">
                <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                <div className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                <div className="absolute bottom-1 left-3 w-3 h-0.5 bg-gray-800 rounded-full"></div>
              </div>
            </div>

            {/* 中央宇航员 */}
            <div className="flex justify-center items-center h-32 mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍🚀</span>
                </div>
              </div>
            </div>

            {/* 底部文字 */}
            <div className="text-center mt-auto">
              <h2 className="text-2xl font-bold mb-1">BEST YOU</h2>
              <p className="text-base mb-0.5">博思优体适能成长空间</p>
              <p className="text-white/90 text-sm">欢迎与我们一起！</p>
            </div>
          </div>
        </div>

        {/* 其他服务区域 - 占满剩余空间 */}
        <div className="flex-1/3 flex flex-col">
          <h3 className="text-lg font-medium text-gray-800 mb-4">其他服务</h3>
          
          <div className="grid grid-cols-3 gap-4 flex-1">
            {services.map((service, index) => (
              <div 
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col items-center justify-center"
              >
                {/* 3D机器人图标 */}
                <div className="flex justify-center mb-4">
                  <div className={`w-20 h-24 ${service.robotBg} rounded-xl flex flex-col items-center justify-center relative shadow-sm`}>
                    {/* 机器人主体 */}
                    <div className="w-12 h-14 bg-white rounded-lg shadow-sm flex flex-col items-center justify-center relative border border-gray-100">
                      {/* 机器人脸部 */}
                      <div className="flex space-x-1 mb-1">
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                      </div>
                      <div className="w-3 h-0.5 bg-gray-600 rounded-full mb-1"></div>
                      
                      {/* 服务图标 */}
                      <div className="text-sm">
                        {index === 0 && '📊'}
                        {index === 1 && '📝'}
                        {index === 2 && '🛍️'}
                      </div>
                    </div>
                    
                    {/* 机器人天线 */}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-0.5 h-2 bg-gray-400"></div>
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full -mt-0.5"></div>
                    </div>
                    
                    {/* 机器人手臂 */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1">
                      <div className="w-2 h-4 bg-white rounded shadow-sm border border-gray-100"></div>
                    </div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                      <div className="w-2 h-4 bg-white rounded shadow-sm border border-gray-100"></div>
                    </div>
                  </div>
                </div>
                
                {/* 服务标题 */}
                <h4 className="text-center text-gray-800 font-medium">{service.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@repo/ui/components/ui/card'
import { Button } from '@repo/ui/components/ui/button'
import { Badge } from '@repo/ui/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@repo/ui/components/ui/carousel'
import { ChevronRight, Play } from 'lucide-react'

export default function StudentPage() {
  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900 pb-8">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* 左侧和中间内容区域 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 顶部欢迎栏和用户信息 */}
          <div className="pt-6 pb-4 flex-col items-center">
            <div className="w-full flex justify-between">
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-orange-500">Hello</span>
                  <span className="text-gray-700 dark:text-gray-200">，你好</span>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">欢迎使用博思优教学系统</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm">
                  <div className="relative">
                    <Image 
                      src="/placeholder.svg" 
                      alt="用户头像" 
                      width={36} 
                      height={36} 
                      className="rounded-full border-2 border-yellow-400"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs text-white font-bold">v</div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">王蒙蒙</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">顺义校区</div>
                  </div>
                </div>
              </div>
            </div>
            {/* 今日课程 */}
            <div>
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 mr-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6.5V9.5M12 17.5V14.5M7 4C4.79086 4 3 5.79086 3 8C3 9.48168 3.80428 10.7747 5 11.4M7 20C4.79086 20 3 18.2091 3 16C3 14.5183 3.80428 13.2253 5 12.6M17 4C19.2091 4 21 5.79086 21 8C21 9.48168 20.1957 10.7747 19 11.4M17 20C19.2091 20 21 18.2091 21 16C21 14.5183 20.1957 13.2253 19 12.6M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    今日课程
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">共5节课</span>
                  </h2>
                </div>
                <a href="#" className="text-sm text-orange-500 hover:text-orange-600 flex items-center">
                  查看详情 <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              
              {/* 课程时间表 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {[
                    { time: '09:30~10:30', title: '木工坊', status: '已完成', active: false },
                    { time: '10:30~11:30', title: '感统综合', status: '待上课', active: true },
                    { time: '12:30~13:30', title: '感统综合', status: '待上课', active: true },
                    { time: '14:30~15:30', title: '暂无', status: '', active: false },
                    { time: '16:30~17:30', title: '暂无', status: '', active: false },
                  ].map((course, index) => (
                    <div 
                      key={index} 
                      className={`flex-shrink-0 w-28 flex flex-col items-center p-3 rounded-lg ${course.active ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-gray-50 dark:bg-gray-700/30'}`}
                    >
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{course.time}</div>
                      <div className={`text-sm font-medium ${course.active ? 'text-orange-500' : 'text-gray-700 dark:text-gray-300'} mb-1`}>{course.title}</div>
                      {course.status && (
                        <div className="flex items-center">
                          {course.status === '已完成' ? (
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6L5.5 7.5L8 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 3V6L8 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                          <span className={`text-xs ml-1 ${course.status === '已完成' ? 'text-green-500' : 'text-orange-500'}`}>{course.status}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* 轮播图区域 */}
          <Carousel className="relative rounded-xl overflow-hidden">
            <CarouselContent>
              <CarouselItem>
                <div className="aspect-[16/7] bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900/30 dark:to-blue-900/30 rounded-xl relative">
                  <div className="absolute inset-0 flex flex-col justify-center px-8">
                    <h2 className="text-2xl font-bold mb-2">快乐成长，协调未来</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">在趣味地址中培养体感觉，让每一步都成为自律的起点！</p>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="aspect-[16/7] bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl relative">
                  <div className="absolute inset-0 flex flex-col justify-center px-8">
                    <h2 className="text-2xl font-bold mb-2">探索潜能，发现自我</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">在博思优教学系统中，每个孩子都能找到自己的闪光点！</p>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="aspect-[16/7] bg-gradient-to-r from-green-100 to-yellow-100 dark:from-green-900/30 dark:to-yellow-900/30 rounded-xl relative">
                  <div className="absolute inset-0 flex flex-col justify-center px-8">
                    <h2 className="text-2xl font-bold mb-2">科学教育，快乐学习</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">基于脑科学的教学方法，让学习变得更加高效有趣！</p>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
          </Carousel>

          {/* 热门视频 */}
          <div>
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 mr-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.9101 11.6722C16.1302 11.8155 16.1302 12.1845 15.9101 12.3278L10.5376 15.6387C10.2888 15.8074 9.94995 15.6307 9.94995 15.3109L9.94995 8.68911C9.94995 8.36933 10.2888 8.19262 10.5376 8.36136L15.9101 11.6722Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  热门视频
                </h2>
              </div>
              <Link href="/student/home/hot-videos" className="text-sm text-orange-500 hover:text-orange-600 flex items-center">
                更多 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* 视频列表 */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { title: '体适能训练基础单元', thumbnail: '/video-thumbnail-1.jpg' },
                { title: '0-3岁如何建立孩子的专注力', thumbnail: '/video-thumbnail-2.jpg' },
                { title: '0-3岁训练基础单元', thumbnail: '/video-thumbnail-2.jpg' },
                { title: '1-2岁训练基础单元', thumbnail: '/video-thumbnail-2.jpg' },
                { title: '1-2岁训练基础单元', thumbnail: '/video-thumbnail-2.jpg' },
                { title: '1-2岁训练基础单元', thumbnail: '/video-thumbnail-2.jpg' },
              ].map((video, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 relative">
                    <Link href={`/student/course/${index}`}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/80 hover:bg-white dark:bg-white/70 dark:hover:bg-white/80"
                      >
                        <Play className="w-5 h-5 text-gray-800 ml-0.5" fill="currentColor" />
                      </Button>
                    </Link>
                  </div>
                  <h3 className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">{video.title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* 师资展示 */}
          <div>
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 mr-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21M23 21V19C23 16.7909 21.2091 15 19 15H18M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM19 11C19 12.1046 18.1046 13 17 13C15.8954 13 15 12.1046 15 11C15 9.89543 15.8954 9 17 9C18.1046 9 19 9.89543 19 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  师资展示
                </h2>
              </div>
              <Link href="/student/home/famous-teachers" className="text-sm text-orange-500 hover:text-orange-600 flex items-center">
                更多 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* 教师列表 */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((teacher) => (
                <Card key={teacher} className="border-0 shadow-sm overflow-hidden">
                  <CardContent className="p-4 flex">
                    <div className="w-20 h-20 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex-shrink-0 mr-4">
                      {/* 教师头像占位 */}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">双双老师</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">顺义校区</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">擅长：感觉统合、大运动、幼儿感统、规范与指令约束</p>
                      <Badge variant="outline" className="text-xs bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/50">
                        感觉统合训练指导师(高级)
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

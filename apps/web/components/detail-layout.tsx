'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@repo/ui/components/ui/button'
import { cn } from '@repo/ui/lib/utils'

export function DetailLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* 顶部导航栏 - 适应iPad */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost"
              onClick={() => router.back()}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-base md:text-lg p-2 md:p-3"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 mr-2" />
              <span>返回</span>
            </Button>
            
            {/* iPad上显示的页面标题 */}
            <h2 className="hidden md:block text-lg lg:text-xl font-medium text-gray-700 dark:text-gray-300">
              {title}
            </h2>
          </div>
        </div>
      </div>
      
      {/* 内容区域 - 支持滚动，针对iPad优化padding */}
      <main className="flex-1 overflow-y-auto max-w-6xl w-full mx-auto px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">  
        {children}
      </main>
    </div>
  )
}

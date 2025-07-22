import Image from "next/image"
import { Card, CardContent } from "@repo/ui/components/ui/card"
import { Button } from "@repo/ui/components/ui/button"
import { Play } from "lucide-react"

export default function StudentPage() {
  return (
    <div className="h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* 页面标题 */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-green-500 dark:text-green-400"
              >
                <path 
                  d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">体验课程</h1>
        </div>

        {/* 主视频卡片 */}
        <div className="mb-10">
          <Card className="overflow-hidden border-0 shadow-lg dark:shadow-gray-800/10 dark:bg-gray-800/50 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="relative aspect-[12/4] bg-orange-100 dark:bg-orange-900/30 rounded-xl overflow-hidden">
                {/* 纯色背景 */}
                
                {/* 播放按钮 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    size="lg" 
                    className="w-20 h-20 rounded-full bg-white/90 hover:bg-white dark:bg-white/80 dark:hover:bg-white/90 text-gray-700 shadow-xl border-0 transition-transform hover:scale-105"
                    variant="ghost"
                  >
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* 主卡片标题 */}
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4 ml-1">XXXXX协调性体验课</h2>
        </div>

        {/* 底部三个小视频卡片 */}
        <div className="grid grid-cols-3 gap-5 md:gap-8 pb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <div key={index}>
              <Card className="overflow-hidden border-0 shadow-md dark:shadow-gray-800/10 dark:bg-gray-800/50 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                    {/* 小卡片纯色背景 */}
                    <div className={`absolute inset-0 ${
                      index === 1 
                        ? 'bg-blue-100 dark:bg-blue-900/30' 
                        : index === 2 
                        ? 'bg-yellow-100 dark:bg-yellow-900/30'
                        : 'bg-green-100 dark:bg-green-900/30'
                    }`}></div>
                    
                    {/* 小播放按钮 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        size="sm" 
                        className="w-14 h-14 rounded-full bg-white/90 hover:bg-white dark:bg-white/80 dark:hover:bg-white/90 text-gray-700 shadow-md border-0 transition-transform hover:scale-105"
                        variant="ghost"
                      >
                        <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 小卡片标题 */}
              <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100 mt-3 ml-1">XXXXX协调性体验课</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
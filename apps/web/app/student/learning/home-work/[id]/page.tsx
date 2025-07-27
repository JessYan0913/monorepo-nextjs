"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronLeft, FileText, CheckCircle2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@repo/ui/components/ui/button'

interface HomeworkDetailPageProps {
  params: {
    id: string
  }
}

export default function HomeworkDetailPage({ params }: HomeworkDetailPageProps) {
  const router = useRouter()
  const [submissionText, setSubmissionText] = useState('')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  // 模拟作业数据
  const homework = {
    id: params.id,
    title: '乐动智趣课包——第一节课',
    completedDate: '2025.04.26',
    student: '李小萌',
    content: `1.该课程结构清晰，内容丰富，讲解深入浅出，令人受益匪浅。2.教师授课风格生动有趣，让我对这门课程产生了浓厚的兴趣。3.这门课程的互动氛围非常好，同学1.该课程结构`,
    status: 'completed'
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // 这里应该处理文件上传逻辑
      console.log('上传文件:', files)
    }
  }

  const handleSubmit = () => {
    console.log('提交作业:', { text: submissionText, images: uploadedImages })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* 导航栏 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Button 
            variant="ghost"
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span>返回</span>
          </Button>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* 作业标题和基本信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {homework.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <span className="text-gray-500 dark:text-gray-400 w-20">完成时间：</span>
              <span className="text-gray-900 dark:text-white">{homework.completedDate}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 dark:text-gray-400 w-20">学生：</span>
              <span className="text-gray-900 dark:text-white">{homework.student}</span>
            </div>
          </div>
        </div>

        {/* 作业内容和完成情况 - 左右分栏 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：作业内容 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center mr-3">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                作业内容
              </h2>
            </div>
            
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {homework.content}
            </div>
          </div>

          {/* 右侧：完成情况描述 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center mr-3">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                完成情况描述
              </h2>
            </div>
            
            {/* 文本输入区域 */}
            <textarea
              value={submissionText}
              onChange={(e) => setSubmissionText(e.target.value)}
              placeholder="请描述您的完成情况..."
              className="w-full h-32 p-3 border border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
            
            {/* 图片上传区域 */}
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-3">
                {/* 上传按钮 */}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <ImageIcon className="w-6 h-6 text-blue-500" />
                  </div>
                </label>
                
                {/* 已上传的图片预览 */}
                {uploadedImages.map((image, index) => (
                  <div key={index} className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-blue-500" />
                  </div>
                ))}
                
                {/* 占位图片框 */}
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 底部提交按钮 */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-12 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors duration-200 shadow-lg"
          >
            提交
          </button>
        </div>
      </div>
    </div>
  )
}
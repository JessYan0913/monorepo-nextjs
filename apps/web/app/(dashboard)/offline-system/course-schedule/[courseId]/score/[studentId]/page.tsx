'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card'
import { Button } from '@repo/ui/components/ui/button'
import { Badge } from '@repo/ui/components/ui/badge'
import { ArrowLeft, Calendar, Clock, MapPin, User, Users } from 'lucide-react'
import { Avatar, AvatarFallback } from '@repo/ui/components/ui/avatar'
import { LessonPlanScoring } from '../../components/LessonPlanScoring'
import { ScoringLessonPlan } from '../../types'

export default function CourseScheduleScorePage({ params }: { params: { id: string, studentId: string } }) {
  const router = useRouter()
  
  // 从路由参数中获取课程ID和学生ID
  // 路径是/course-schedule/[id]/score/[studentId]
  const courseId = params.id 
  const studentId = params.studentId
  const [isLoading, setIsLoading] = useState(true)
  const [courseDetail, setCourseDetail] = useState<any>(null)
  const [studentDetail, setStudentDetail] = useState<any>(null)

  // 模拟获取课程和学生详情
  useEffect(() => {
    // 模拟API请求延迟
    const timer = setTimeout(() => {
      setCourseDetail({
        id: courseId,
        subject: '英语发音与口语交流课',
        date: '2025年5月16日',
        timeSlot: '09:45-11:15',
        courseType: '常规课程',
        location: 'A101',
        teacher: '张教授'
      })
      
      setStudentDetail({
        id: studentId,
        name: `学生${studentId?.slice(-1)}`,
        availableHours: 35
      })
      
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [courseId, studentId])

  const [lessonPlan, setLessonPlan] = useState<ScoringLessonPlan>({
    topic: '英语发音与口语交流课',
    actions: [
      {
        action: '单词发音练习',
        requirement: '正确发音，注意音调',
        purpose: '提高发音准确性',
        beginnerStep: { 
          content: '基础单词发音', 
          duration: '5分钟',
          score: undefined,
          comment: ''
        },
        intermediateStep: { 
          content: '连读和弱读', 
          duration: '7分钟',
          score: undefined,
          comment: ''
        },
        advancedStep: { 
          content: '语调和重音', 
          duration: '8分钟',
          score: undefined,
          comment: ''
        }
      },
      {
        action: '对话练习',
        requirement: '流利表达，自然交流',
        purpose: '提高口语交流能力',
        beginnerStep: { 
          content: '简单问候对话', 
          duration: '10分钟',
          score: undefined,
          comment: ''
        },
        intermediateStep: { 
          content: '日常情景对话', 
          duration: '15分钟',
          score: undefined,
          comment: ''
        },
        advancedStep: { 
          content: '复杂话题讨论', 
          duration: '20分钟',
          score: undefined,
          comment: ''
        }
      }
    ]
  })

  const handleScoreChange = (actionIndex: number, stepKey: 'beginnerStep' | 'intermediateStep' | 'advancedStep', value: number) => {
    const newLessonPlan = { ...lessonPlan }
    newLessonPlan.actions[actionIndex][stepKey].score = value
    setLessonPlan(newLessonPlan)
  }

  const handleCommentChange = (actionIndex: number, stepKey: 'beginnerStep' | 'intermediateStep' | 'advancedStep', value: string) => {
    const newLessonPlan = { ...lessonPlan }
    newLessonPlan.actions[actionIndex][stepKey].comment = value
    setLessonPlan(newLessonPlan)
  }

  const handleSubmit = () => {
    // TODO: Implement actual score submission logic
    console.log('Submitting scores:', lessonPlan)
    router.push(`/offline-system/course-schedule/detail?id=${courseId}`)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* 顶部导航 */}
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href={`/offline-system/course-schedule/${courseId}`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">学生评分</h1>
      </div>

      {/* 课程信息卡片 */}
      {!isLoading && courseDetail && studentDetail ? (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{courseDetail.subject}</CardTitle>
              <Badge variant="outline" className="ml-2">{courseDetail.courseType}</Badge>
            </div>
            <CardDescription>课程详情与学生信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 课程信息 */}
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-muted-foreground">日期：</span>
                  <span className="ml-2 font-medium">{courseDetail.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-muted-foreground">时间：</span>
                  <span className="ml-2 font-medium">{courseDetail.timeSlot}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-muted-foreground">地点：</span>
                  <span className="ml-2 font-medium">{courseDetail.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <User className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-muted-foreground">教师：</span>
                  <span className="ml-2 font-medium">{courseDetail.teacher}</span>
                </div>
              </div>
              
              {/* 学生信息 */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>{studentDetail.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{studentDetail.name}</p>
                    <p className="text-xs text-muted-foreground">学生ID: {studentDetail.id}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-muted-foreground">可用课时：</span>
                  <span className="ml-2 font-medium">{studentDetail.availableHours} 小时</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center justify-center h-24">
          <p className="text-sm text-muted-foreground">加载中...</p>
        </div>
      )}

      {/* 评分表单 */}
      {!isLoading && (
        <LessonPlanScoring 
          lessonPlan={lessonPlan}
          onScoreChange={handleScoreChange}
          onCommentChange={handleCommentChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
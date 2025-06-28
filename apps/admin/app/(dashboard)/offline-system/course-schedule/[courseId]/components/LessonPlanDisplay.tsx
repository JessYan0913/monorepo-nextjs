'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LessonPlan } from '../types'

interface LessonPlanDisplayProps {
  lessonPlan: LessonPlan
  className?: string
}

export function LessonPlanDisplay({ lessonPlan, className = '' }: LessonPlanDisplayProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>教案详情</CardTitle>
        <CardDescription>详细查看本课程的教学计划</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 课程时间安排 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">课程时间安排</h3>
          <div className="space-y-2 bg-muted/30 p-3 rounded-md">
            <div className="flex justify-between">
              <p className="text-sm font-medium">召集时间：{lessonPlan.gatheringDuration || '未定义'}</p>
              <p className="text-sm text-muted-foreground">{lessonPlan.gatheringContent || '无详细描述'}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm font-medium">热身时间：{lessonPlan.warmupDuration || '未定义'}</p>
              <p className="text-sm text-muted-foreground">{lessonPlan.warmupContent || '无详细描述'}</p>
            </div>
          </div>
        </div>

        {/* 动作要求与训练 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">动作要求与训练</h3>
          <div className="space-y-2">
            {lessonPlan.actions.map((action, index) => (
              <div key={index} className="space-y-2 bg-muted/30 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">动作：{action.action}</p>
                  <p className="text-sm text-muted-foreground">目的：{action.purpose}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-sm">
                    <p className="font-medium">初级阶段</p>
                    <p className="text-muted-foreground">{action.beginnerStep.content} ({action.beginnerStep.duration})</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">中级阶段</p>
                    <p className="text-muted-foreground">{action.intermediateStep.content} ({action.intermediateStep.duration})</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">高级阶段</p>
                    <p className="text-muted-foreground">{action.advancedStep.content} ({action.advancedStep.duration})</p>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <p className="font-medium">动作要求</p>
                  <p className="text-muted-foreground">{action.requirement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

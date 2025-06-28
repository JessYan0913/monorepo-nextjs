'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ScoringLessonPlan } from '../types'

interface LessonPlanScoringProps {
  lessonPlan: ScoringLessonPlan
  onScoreChange: (actionIndex: number, stepKey: 'beginnerStep' | 'intermediateStep' | 'advancedStep', value: number) => void
  onCommentChange: (actionIndex: number, stepKey: 'beginnerStep' | 'intermediateStep' | 'advancedStep', value: string) => void
  onSubmit: () => void
  className?: string
}

export function LessonPlanScoring({ 
  lessonPlan, 
  onScoreChange, 
  onCommentChange, 
  onSubmit, 
  className = '' 
}: LessonPlanScoringProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>学生成绩评分</CardTitle>
        <CardDescription>为学生的课程表现进行详细评分</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 课程主题 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">课程主题</h3>
          <div className="bg-muted/30 p-3 rounded-md">
            <p className="text-sm font-semibold">{lessonPlan.topic}</p>
          </div>
        </div>

        {/* 动作要求与训练评分 */}
        {lessonPlan.actions.map((action, actionIndex) => (
          <div key={actionIndex} className="space-y-4">
            <h3 className="text-lg font-medium">{action.action}</h3>
            <div className="space-y-2 bg-muted/30 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">动作要求：{action.requirement}</p>
                <p className="text-sm text-muted-foreground">训练目的：{action.purpose}</p>
              </div>

              {/* 初级阶段评分 */}
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">初级阶段：{action.beginnerStep.content} ({action.beginnerStep.duration})</h4>
                <div className="flex items-center space-x-4">
                  <Label className="text-sm">分数</Label>
                  <Input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={action.beginnerStep.score ?? ''} 
                    onChange={(e) => onScoreChange(actionIndex, 'beginnerStep', Number(e.target.value))} 
                    className="w-24"
                  />
                  <Label className="text-sm">备注</Label>
                  <Input 
                    type="text" 
                    value={action.beginnerStep.comment ?? ''} 
                    onChange={(e) => onCommentChange(actionIndex, 'beginnerStep', e.target.value)} 
                    className="flex-grow"
                  />
                </div>
              </div>

              {/* 中级阶段评分 */}
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">中级阶段：{action.intermediateStep.content} ({action.intermediateStep.duration})</h4>
                <div className="flex items-center space-x-4">
                  <Label className="text-sm">分数</Label>
                  <Input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={action.intermediateStep.score ?? ''} 
                    onChange={(e) => onScoreChange(actionIndex, 'intermediateStep', Number(e.target.value))} 
                    className="w-24"
                  />
                  <Label className="text-sm">备注</Label>
                  <Input 
                    type="text" 
                    value={action.intermediateStep.comment ?? ''} 
                    onChange={(e) => onCommentChange(actionIndex, 'intermediateStep', e.target.value)} 
                    className="flex-grow"
                  />
                </div>
              </div>

              {/* 高级阶段评分 */}
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">高级阶段：{action.advancedStep.content} ({action.advancedStep.duration})</h4>
                <div className="flex items-center space-x-4">
                  <Label className="text-sm">分数</Label>
                  <Input 
                    type="number" 
                    min="0" 
                    max="100" 
                    value={action.advancedStep.score ?? ''} 
                    onChange={(e) => onScoreChange(actionIndex, 'advancedStep', Number(e.target.value))} 
                    className="w-24"
                  />
                  <Label className="text-sm">备注</Label>
                  <Input 
                    type="text" 
                    value={action.advancedStep.comment ?? ''} 
                    onChange={(e) => onCommentChange(actionIndex, 'advancedStep', e.target.value)} 
                    className="flex-grow"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 提交按钮 */}
        <div className="flex justify-end mt-6">
          <Button onClick={onSubmit}>提交评分</Button>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { toast } from "@repo/ui/components/ui/sonner"
import { ProfileForm } from "@/components/settings/profile-form"
import { SecurityForm } from "@/components/settings/security-form"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"

export default function SettingsPage() {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">系统设置</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="security">安全设置</TabsTrigger>
          <TabsTrigger value="notifications">通知设置</TabsTrigger>
          <TabsTrigger value="appearance">外观设置</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>个人资料</CardTitle>
              <CardDescription>管理您的个人信息和偏好设置</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>安全设置</CardTitle>
              <CardDescription>管理您的密码和安全选项</CardDescription>
            </CardHeader>
            <CardContent>
              <SecurityForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>配置您希望接收的通知类型</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>外观设置</CardTitle>
              <CardDescription>自定义系统的外观和显示选项</CardDescription>
            </CardHeader>
            <CardContent>
              <AppearanceSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

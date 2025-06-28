"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    systemUpdates: true,
    securityAlerts: true,
    userActivities: false,
    weeklyDigest: true,
    marketingEmails: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    })
  }

  const handleSave = () => {
    setIsLoading(true)

    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false)
      console.log(settings)

      toast({
        title: "通知设置已更新",
        description: "您的通知偏好设置已成功保存",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="emailNotifications">电子邮件通知</Label>
            <p className="text-sm text-muted-foreground">启用后，系统将通过电子邮件发送通知</p>
          </div>
          <Switch
            id="emailNotifications"
            checked={settings.emailNotifications}
            onCheckedChange={() => handleToggle("emailNotifications")}
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-sm font-medium">通知类型</h3>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="systemUpdates">系统更新</Label>
              <p className="text-sm text-muted-foreground">关于系统更新、维护和新功能的通知</p>
            </div>
            <Switch
              id="systemUpdates"
              checked={settings.systemUpdates}
              onCheckedChange={() => handleToggle("systemUpdates")}
              disabled={!settings.emailNotifications}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="securityAlerts">安全警报</Label>
              <p className="text-sm text-muted-foreground">关于账户安全的重要通知和警报</p>
            </div>
            <Switch
              id="securityAlerts"
              checked={settings.securityAlerts}
              onCheckedChange={() => handleToggle("securityAlerts")}
              disabled={!settings.emailNotifications}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="userActivities">用户活动</Label>
              <p className="text-sm text-muted-foreground">关于其他用户活动的通知</p>
            </div>
            <Switch
              id="userActivities"
              checked={settings.userActivities}
              onCheckedChange={() => handleToggle("userActivities")}
              disabled={!settings.emailNotifications}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="weeklyDigest">每周摘要</Label>
              <p className="text-sm text-muted-foreground">每周系统活动和统计数据摘要</p>
            </div>
            <Switch
              id="weeklyDigest"
              checked={settings.weeklyDigest}
              onCheckedChange={() => handleToggle("weeklyDigest")}
              disabled={!settings.emailNotifications}
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label htmlFor="marketingEmails">营销邮件</Label>
              <p className="text-sm text-muted-foreground">关于新产品、功能和促销的邮件</p>
            </div>
            <Switch
              id="marketingEmails"
              checked={settings.marketingEmails}
              onCheckedChange={() => handleToggle("marketingEmails")}
              disabled={!settings.emailNotifications}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          onClick={() =>
            setSettings({
              emailNotifications: true,
              systemUpdates: true,
              securityAlerts: true,
              userActivities: false,
              weeklyDigest: true,
              marketingEmails: false,
            })
          }
        >
          重置
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            "保存设置"
          )}
        </Button>
      </div>
    </div>
  )
}

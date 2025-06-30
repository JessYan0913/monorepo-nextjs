"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Separator } from "@repo/ui/components/ui/separator"
import { Calendar, MapPin, Clock, User, Smartphone, Mail, Home, Briefcase, Award, Image as ImageIcon, Edit } from "lucide-react"

// 模拟用户数据，实际项目中应该从API获取
const user = {
  id: "user-001",
  name: "张三",
  nickname: "小张",
  gender: "男",
  birthdate: "1990-05-15",
  idNumber: "11010119900515****",
  avatar: "/placeholder-user.jpg",
  campus: "北京校区",
  email: "zhangsan@example.com",
  phone: "138****1234",
  address: "北京市朝阳区建国路88号",
  status: "在职",
  hireDate: "2020-03-10T08:30:00Z",
  position: "高级教师",
  role: "教师",
  teachingQualification: "高级教师资格证",
  workPhotos: [
    "/placeholder-work-1.jpg",
    "/placeholder-work-2.jpg",
    "/placeholder-work-3.jpg"
  ],
  registrationDate: "2023-01-15T08:30:00Z",
  lastLogin: "2023-05-17T14:22:10Z"
}

// 信息卡片组件
const InfoCard = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center space-x-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      {children}
    </CardContent>
  </Card>
)

// 信息项组件
const InfoItem = ({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) => (
  <div className="space-y-1">
    <div className="flex items-center text-sm text-muted-foreground">
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </div>
    <p>{value}</p>
  </div>
)

export default function ProfileInfoPage() {
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* 顶部头像区域 */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="relative">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-4xl">
              {user.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute -bottom-2 -right-2 rounded-full h-10 w-10"
            onClick={() => {/* 编辑头像逻辑 */}}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">编辑头像</span>
          </Button>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.position} · {user.role}</p>
        </div>
        <Button variant="outline" className="mt-2">
          <Edit className="mr-2 h-4 w-4" />
          编辑资料
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 基本信息 */}
        <InfoCard title="基本信息" icon={User}>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="姓名" value={user.name} icon={User} />
            <InfoItem label="性别" value={user.gender} icon={User} />
            <InfoItem label="出生日期" value={user.birthdate} icon={Calendar} />
            <InfoItem label="身份证号" value={user.idNumber} icon={User} />
            <InfoItem label="昵称" value={user.nickname} icon={User} />
            <InfoItem label="状态" value={user.status} icon={User} />
          </div>
        </InfoCard>

        {/* 联系信息 */}
        <InfoCard title="联系信息" icon={Smartphone}>
          <div className="space-y-4">
            <InfoItem label="手机号" value={user.phone} icon={Smartphone} />
            <InfoItem label="邮箱" value={user.email} icon={Mail} />
            <InfoItem label="联系地址" value={user.address} icon={Home} />
            <InfoItem label="校区" value={user.campus} icon={MapPin} />
          </div>
        </InfoCard>

        {/* 工作信息 */}
        <InfoCard title="工作信息" icon={Briefcase}>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="入职时间" value={formatDate(user.hireDate)} icon={Calendar} />
            <InfoItem label="职位" value={user.position} icon={Briefcase} />
            <InfoItem label="角色" value={user.role} icon={User} />
            <InfoItem label="教学资质" value={user.teachingQualification} icon={Award} />
          </div>
        </InfoCard>

        {/* 工作照墙 */}
        <InfoCard title="工作照墙" icon={ImageIcon}>
          <div className="grid grid-cols-3 gap-4">
            {user.workPhotos.map((photo, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-md border">
                <img
                  src={photo}
                  alt={`工作照 ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </InfoCard>
      </div>
    </div>
  )
}
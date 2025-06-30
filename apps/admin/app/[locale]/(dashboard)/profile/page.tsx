"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Separator } from "@repo/ui/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Badge } from "@repo/ui/components/ui/badge"
import { Calendar, MapPin, Clock, User, Smartphone, Mail, Home, Briefcase, Award, Image as ImageIcon, Edit, Camera, ChevronRight } from "lucide-react"

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
const InfoCard = ({ title, icon: Icon, children, className = "" }: { title: string; icon: React.ElementType; children: React.ReactNode; className?: string }) => (
  <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}>
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="pt-4">
      {children}
    </CardContent>
  </Card>
)

// 信息项组件
const InfoItem = ({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) => (
  <div className="space-y-1.5 group transition-all duration-200 p-2 rounded-lg hover:bg-muted/50">
    <div className="flex items-center text-sm text-muted-foreground">
      <Icon className="mr-2 h-4 w-4 text-primary/70" />
      <span>{label}</span>
    </div>
    <p className="font-medium">{value}</p>
  </div>
)

// 状态徽章组件
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "在职":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "离职":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case "休假":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    }
  };

  return (
    <Badge variant="outline" className={`${getStatusColor()} transition-colors duration-300`}>
      {status}
    </Badge>
  );
};

export default function ProfileInfoPage() {
  const [activeTab, setActiveTab] = useState("info");

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* 顶部英雄区域 */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-muted p-6 md:p-10">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-black/10" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between relative z-10">
          <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-primary/50 opacity-70 blur-sm group-hover:opacity-100 transition duration-300" />
              <Avatar className="h-28 w-28 md:h-32 md:w-32 border-4 border-background relative">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-4xl">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="icon"
                className="absolute -bottom-2 -right-2 rounded-full h-10 w-10 shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                onClick={() => {/* 编辑头像逻辑 */}}
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">编辑头像</span>
              </Button>
            </div>
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                <StatusBadge status={user.status} />
              </div>
              <p className="text-muted-foreground">{user.position} · {user.role}</p>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{user.campus}</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                <Calendar className="h-3.5 w-3.5" />
                <span>入职 {new Date(user.hireDate).toLocaleDateString("zh-CN", { year: "numeric", month: "numeric" })}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
            <Button variant="default" className="shadow-sm">
              <Edit className="mr-2 h-4 w-4" />
              编辑资料
            </Button>
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <Tabs defaultValue="info" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b sticky top-0 bg-background/95 backdrop-blur z-10 pb-2">
          <TabsList className="w-full max-w-md h-11">
            <TabsTrigger value="info" className="flex-1">个人信息</TabsTrigger>
            <TabsTrigger value="work" className="flex-1">工作信息</TabsTrigger>
            <TabsTrigger value="gallery" className="flex-1">照片墙</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="pt-6">
          <TabsContent value="info" className="space-y-6 mt-0 animate-in fade-in-50 duration-300">
            {/* 个人资料 - 合并基本信息和联系信息 */}
            <InfoCard title="个人资料" icon={User}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 基本信息部分 */}
                <InfoItem label="姓名" value={user.name} icon={User} />
                <InfoItem label="性别" value={user.gender} icon={User} />
                <InfoItem label="昵称" value={user.nickname} icon={User} />
                <InfoItem label="出生日期" value={user.birthdate} icon={Calendar} />
                <InfoItem label="身份证号" value={user.idNumber} icon={User} />
                <InfoItem label="状态" value={user.status} icon={User} />
                
                {/* 联系信息部分 */}
                <InfoItem label="手机号" value={user.phone} icon={Smartphone} />
                <InfoItem label="邮箱" value={user.email} icon={Mail} />
                <InfoItem label="联系地址" value={user.address} icon={Home} />
                <InfoItem label="校区" value={user.campus} icon={MapPin} />
              </div>
            </InfoCard>
          </TabsContent>
          
          <TabsContent value="work" className="space-y-6 mt-0 animate-in fade-in-50 duration-300">
            {/* 工作信息 */}
            <InfoCard title="工作信息" icon={Briefcase}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem label="入职时间" value={formatDate(user.hireDate)} icon={Calendar} />
                <InfoItem label="职位" value={user.position} icon={Briefcase} />
                <InfoItem label="角色" value={user.role} icon={User} />
                <InfoItem label="教学资质" value={user.teachingQualification} icon={Award} />
              </div>
            </InfoCard>
          </TabsContent>
          
          <TabsContent value="gallery" className="space-y-6 mt-0 animate-in fade-in-50 duration-300">
            {/* 工作照墙 */}
            <InfoCard title="工作照墙" icon={ImageIcon}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {user.workPhotos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="aspect-square overflow-hidden rounded-lg border group relative cursor-pointer hover:shadow-md transition-all duration-300"
                  >
                    <img
                      src={photo}
                      alt={`工作照 ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button variant="secondary" size="icon" className="h-9 w-9">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="aspect-square overflow-hidden rounded-lg border border-dashed flex items-center justify-center bg-muted/50 hover:bg-muted transition-colors duration-300 cursor-pointer">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                    <Camera className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </InfoCard>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
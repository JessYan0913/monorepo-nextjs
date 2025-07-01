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
      {/* 顶部区域 - 用户信息和工作信息 */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-muted p-6 md:p-10">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-black/10" />
        <div className="flex flex-col lg:flex-row gap-8 relative z-10">
          {/* 左侧头像区域 */}
          <div className="flex-shrink-0 flex justify-center">
            <div className="relative group">
              <Avatar className="h-64 w-64 md:h-96 md:w-96 border-4 border-background/80 relative shadow-xl">
                <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                <AvatarFallback className="text-7xl bg-muted/30">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          {/* 右侧信息区域 */}
          <div className="flex-1 flex flex-col space-y-6">
            {/* 基本信息 */}
            <div className="text-center lg:text-left space-y-3">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>
                <StatusBadge status={user.status} />
              </div>
              <p className="text-lg text-muted-foreground">{user.position} · {user.role}</p>
            </div>
            
            {/* 工作信息卡片 */}
            <Card className="bg-background/70 backdrop-blur-sm border-muted">
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* 左侧工作信息 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">工作信息</h3>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">入职时间</p>
                          <p className="font-medium">{formatDate(user.hireDate)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">教学资质</p>
                          <p className="font-medium">{user.teachingQualification}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* 右侧联系信息 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium">联系方式</h3>
                    </div>
                    
                    <div className="grid gap-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">校区</p>
                          <p className="font-medium">{user.campus}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">联系电话</p>
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 标签页导航 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pt-2 pb-2">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="info" className="flex-1">个人信息</TabsTrigger>
            <TabsTrigger value="gallery" className="flex-1">照片墙</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="pt-6">
          <TabsContent value="info" className="space-y-6 mt-0 animate-in fade-in-50 duration-300">
            {/* 个人资料 - 详细信息 */}
            <InfoCard title="个人详细资料" icon={User}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 基本信息部分 */}
                <InfoItem label="姓名" value={user.name} icon={User} />
                <InfoItem label="性别" value={user.gender} icon={User} />
                <InfoItem label="昵称" value={user.nickname} icon={User} />
                <InfoItem label="出生日期" value={user.birthdate} icon={Calendar} />
                <InfoItem label="身份证号" value={user.idNumber} icon={User} />
                <InfoItem label="邮箱" value={user.email} icon={Mail} />
                <InfoItem label="联系地址" value={user.address} icon={Home} />
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
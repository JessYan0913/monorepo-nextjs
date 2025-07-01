"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Badge } from "@repo/ui/components/ui/badge"
import { Button } from "@repo/ui/components/ui/button"
import {
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  User,
  Briefcase,
  GraduationCap,
  Clock,
  Edit,
  X,
  Camera,
} from "lucide-react"
import { useState, useCallback } from "react"
import { BaseForm } from "@/components/profile/base-form"
import { ContactForm } from "@/components/profile/contact-form"
import { WorkForm } from "@/components/profile/work-form"

const user = {
  id: "user-001",
  name: "张三",
  nickname: "小张",
  gender: "男",
  birthdate: "1990-05-15",
  idNumber: "11010119900515****",
  avatar: "/placeholder.svg?height=120&width=120",
  campus: "北京校区",
  email: "zhangsan@example.com",
  phone: "138****1234",
  address: "北京市朝阳区建国路88号",
  status: "在职",
  hireDate: "2020-03-10T08:30:00Z",
  position: "高级教师",
  role: "teacher",
  qualification: "高级教师资格证",
  workPhotos: [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ],
  registrationDate: "2023-01-15T08:30:00Z",
  lastLogin: "2023-05-17T14:22:10Z",
}

export default function Component() {
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const InfoField = ({ label, value, icon: Icon }: { label: string; value: string; icon?: any }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 text-gray-500" />}
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <span className="text-gray-900 text-right">{value}</span>
    </div>
  )

  const SectionHeader = ({
    title,
    sectionKey,
    icon: Icon,
  }: {
    title: string
    sectionKey: string
    icon: any
  }) => {
    const isEditing = editingSection === sectionKey

    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>
        <div className="flex gap-2">
          {!isEditing && (
            <Button size="sm" variant="outline" onClick={() => setEditingSection(sectionKey)}>
              <Edit className="h-4 w-4 mr-1" />
              编辑
            </Button>
          )}
        </div>
      </div>
    )
  }

  const closeEditSection = useCallback(() => {
    setEditingSection(null)
  }, [setEditingSection])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">个人中心</h1>
          <p className="text-gray-600">管理您的个人信息和账户设置</p>
        </div>

        {/* 用户概览区域 */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* 头像区域 */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative mb-3">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-1 -right-1 rounded-full h-7 w-7 p-0 bg-white"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              <Badge variant={user.status === "在职" ? "default" : "secondary"}>{user.status}</Badge>
            </div>

            {/* 基本信息 */}
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-3">
                  {user.position} · {user.role} · {user.campus}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>用户ID：{user.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>入职时间：{formatDate(user.hireDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>注册时间：{formatDate(user.registrationDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>最后登录：{formatDateTime(user.lastLogin)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 个人基本信息区域 */}
        <div className="mb-12">
          <SectionHeader title="个人基本信息" sectionKey="basic" icon={User} />

          {editingSection === "basic" ? <BaseForm user={user} closeEditSection={closeEditSection} /> : (
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-6">
                <InfoField label="姓名" value={user.name} />
                <InfoField label="昵称" value={user.nickname} />
                <InfoField label="性别" value={user.gender} />
                <InfoField label="出生日期" value={user.birthdate} />
                <InfoField label="身份证号" value={user.idNumber} />
              </div>
            </div>
          )}
        </div>

        {/* 联系方式区域 */}
        <div className="mb-12">
          <SectionHeader title="联系方式" sectionKey="contact" icon={Mail} />

          {editingSection === "contact" ? <ContactForm user={user} closeEditSection={closeEditSection} /> : (
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-6">
                <InfoField label="邮箱地址" value={user.email} icon={Mail} />
                <InfoField label="手机号码" value={user.phone} icon={Phone} />
                <InfoField label="联系地址" value={user.address} icon={MapPin} />
              </div>
            </div>
          )}
        </div>

        {/* 工作信息区域 */}
        <div className="mb-12">
          <SectionHeader title="工作信息" sectionKey="work" icon={Briefcase} />

          {editingSection === "work" ? <WorkForm user={user} closeEditSection={closeEditSection} /> : (
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-6">
                <InfoField label="所属校区" value={user.campus} />
                <InfoField label="职位" value={user.position} />
                <InfoField label="角色" value={user.role} />
                <InfoField label="教师资格" value={user.qualification} icon={GraduationCap} />
              </div>
            </div>
          )}
        </div>

        {/* 工作照片区域 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Camera className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">工作照片</h2>
            </div>
            <Button size="sm" variant="outline">
              <Camera className="h-4 w-4 mr-1" />
              上传照片
            </Button>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.workPhotos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`工作照片 ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

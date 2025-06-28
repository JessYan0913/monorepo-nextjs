"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Clock, FileText, GraduationCap, Image as ImageIcon, Info, Layers, Plus, Upload, User, Video, X } from "lucide-react"

// 课程分类选项
const courseCategories = ["编程开发", "前端开发", "计算机科学", "人工智能", "数据科学", "云计算", "移动开发", "网络安全"]

export default function CreateCoursePage() {
  const router = useRouter()
  const { toast } = useToast()
  
  // 表单状态
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    type: "",
    category: "",
    description: "",
    lessons: "",
    duration: "",
    video: null as File | null
  })
  
  // 视频预览状态
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  
  // 视频验证状态
  const [videoError, setVideoError] = useState<string | null>(null)
  
  // 表单验证状态
  const [errors, setErrors] = useState({
    title: false,
    instructor: false,
    type: false,
    category: false
  })
  
  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // 当前活动的标签页
  const [activeTab, setActiveTab] = useState("basic")
  
  // 处理输入变化
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // 清除对应字段的错误
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: false
      }))
    }
  }

  // 处理视频文件选择
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.startsWith('video/')) {
      setVideoError('请选择有效的视频文件');
      setVideoPreview(null);
      setFormData(prev => ({ ...prev, video: null }));
      return;
    }

    // 验证文件大小（限制为500MB）
    if (file.size > 500 * 1024 * 1024) {
      setVideoError('视频文件大小不能超过500MB');
      setVideoPreview(null);
      setFormData(prev => ({ ...prev, video: null }));
      return;
    }

    // 创建预览
    const reader = new FileReader();
    reader.onload = () => {
      setVideoPreview(reader.result as string);
      setVideoError(null);
    };
    reader.readAsDataURL(file);

    setFormData(prev => ({ ...prev, video: file }));
  }

  // 移除视频
  const removeVideo = () => {
    setVideoPreview(null);
    setVideoError(null);
    setFormData(prev => ({ ...prev, video: null }));
  }
  
  // 验证表单
  const validateForm = () => {
    const newErrors = {
      title: !formData.title,
      instructor: !formData.instructor,
      type: !formData.type,
      category: !formData.category
    }
    
    setErrors(newErrors)
    
    // 验证视频（如果是录播课程）
    if (formData.type === "录播课程" && !formData.video) {
      setVideoError("录播课程必须上传视频文件");
      return false;
    }
    
    return !Object.values(newErrors).some(Boolean)
  }
  
  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "表单验证失败",
        description: "请填写所有必填字段",
        variant: "destructive"
      })
      return
    }
    
    setIsSubmitting(true)
    
    // 模拟API请求
    setTimeout(() => {
      setIsSubmitting(false)
      
      toast({
        title: "课程创建成功",
        description: `课程 "${formData.title}" 已成功创建`,
      })
      
      // 重定向到课程列表页面
      router.push("/online-system/courses")
    }, 1000)
  }
  
  // 返回课程列表页面
  const goBack = () => {
    router.push("/online-system/courses")
  }
  
  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">创建新课程</h1>
        </div>
      </div>
      
      <Card className="max-w-5xl mx-auto w-full shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            创建在线课程
          </CardTitle>
          <CardDescription>
            填写以下信息创建一个新的在线课程。带 <span className="text-destructive">*</span> 的字段为必填项。
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  基本信息
                </TabsTrigger>
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  课程详情
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  媒体资源
                </TabsTrigger>
              </TabsList>
              
              {/* 基本信息标签页 */}
              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      课程名称 <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="title" 
                      placeholder="请输入课程名称" 
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                      <p className="text-xs text-destructive">请输入课程名称</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructor" className="flex items-center gap-1">
                      <User className="h-4 w-4 text-muted-foreground" />
                      授课教师 <span className="text-destructive">*</span>
                    </Label>
                    <Input 
                      id="instructor" 
                      placeholder="请输入授课教师" 
                      value={formData.instructor}
                      onChange={(e) => handleInputChange("instructor", e.target.value)}
                      className={errors.instructor ? "border-destructive" : ""}
                    />
                    {errors.instructor && (
                      <p className="text-xs text-destructive">请输入授课教师</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      课程类型 <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => handleInputChange("type", value)}
                    >
                      <SelectTrigger id="type" className={errors.type ? "border-destructive" : ""}>
                        <SelectValue placeholder="请选择课程类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="录播课程">录播课程</SelectItem>
                        <SelectItem value="直播课程">直播课程</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-xs text-destructive">请选择课程类型</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      课程分类 <span className="text-destructive">*</span>
                    </Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
                        <SelectValue placeholder="请选择课程分类" />
                      </SelectTrigger>
                      <SelectContent>
                        {courseCategories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-xs text-destructive">请选择课程分类</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("details")}
                  >
                    下一步
                  </Button>
                </div>
              </TabsContent>
              
              {/* 课程详情标签页 */}
              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description" className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      课程描述
                    </Label>
                    <Textarea 
                      id="description" 
                      placeholder="请输入课程描述" 
                      className="min-h-[150px]" 
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">详细描述课程内容、适合人群和学习目标</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lessons" className="flex items-center gap-1">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      课时数量
                    </Label>
                    <Input 
                      id="lessons" 
                      type="number" 
                      placeholder="请输入课时数量" 
                      value={formData.lessons}
                      onChange={(e) => handleInputChange("lessons", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">课程包含的课时总数</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      课程时长
                    </Label>
                    <Input 
                      id="duration" 
                      type="number" 
                      placeholder="请输入课程时长（分钟）" 
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">课程总时长（分钟）</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("basic")}
                  >
                    上一步
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("media")}
                  >
                    下一步
                  </Button>
                </div>
              </TabsContent>
              
              {/* 媒体资源标签页 */}
              <TabsContent value="media" className="space-y-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* 视频上传区域 */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-1">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      课程视频
                      {formData.type === "录播课程" && <span className="text-destructive">*</span>}
                    </Label>
                    <div className="space-y-4">
                      {videoPreview ? (
                        <div className="relative h-[220px] rounded-md border border-input bg-background overflow-hidden">
                          <video 
                            src={videoPreview} 
                            controls
                            className="w-full h-full object-cover rounded-md"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-2 top-2 bg-background/80 hover:bg-background/90"
                            onClick={removeVideo}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div 
                          className="flex items-center justify-center h-[220px] rounded-md border border-dashed border-input bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors"
                          onClick={() => document.getElementById("video-upload")?.click()}
                        >
                          <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Video className="h-8 w-8" />
                            <span>点击上传课程视频文件</span>
                            <span className="text-xs">支持格式：MP4, MOV, AVI</span>
                            <span className="text-xs">最大文件大小：500MB</span>
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="hidden"
                        id="video-upload"
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById("video-upload")?.click()}
                        className="w-full"
                      >
                        <Video className="mr-2 h-4 w-4" />
                        {videoPreview ? "更换视频" : "上传视频"}
                      </Button>
                    </div>
                    {videoError && (
                      <p className="text-xs text-destructive">{videoError}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formData.type === "录播课程" ? "录播课程必须上传视频文件" : "直播课程可选择上传介绍视频"}
                    </p>
                  </div>

                  {/* 封面上传区域 */}
                  <div className="space-y-3">
                    <Label className="flex items-center gap-1">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      课程封面
                    </Label>
                    <div 
                      className="flex items-center justify-center h-[220px] rounded-md border border-dashed border-input bg-muted/50 cursor-pointer hover:bg-muted/70 transition-colors"
                      onClick={() => document.getElementById("cover-upload")?.click()}
                    >
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Plus className="h-8 w-8" />
                        <span>点击上传课程封面图片</span>
                        <span className="text-xs">建议尺寸：1280 x 720 像素</span>
                        <span className="text-xs">支持格式：JPG, PNG</span>
                      </div>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="cover-upload"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById("cover-upload")?.click()}
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      上传封面图片
                    </Button>
                    <p className="text-xs text-muted-foreground">高质量的封面图片可以提高课程的吸引力</p>
                  </div>
                </div>
                
                <div className="flex justify-between pt-6">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setActiveTab("details")}
                  >
                    上一步
                  </Button>
                  <Button 
                    type="submit" 
                    className="min-w-[120px]" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "正在创建..." : "创建课程"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}

"use client"

import * as React from "react"
import { useRouter, notFound } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from "lucide-react"
import useSWR from "swr"
import Image from "next/image"
import { ImageGallery } from "@repo/ui/components/image-gallery"

import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { TransferList, BaseTransferListItem } from "@repo/ui/components/transfer-list"
import { ImageUploader } from "@repo/ui/components/image-uploader"
import { VideoGallery } from "@repo/ui/components/video-gallery"
import { FileUploader } from "@repo/ui/components/file-uploader"

// 定义包含role属性的自定义项目类型
type StaffItem = BaseTransferListItem & {
  role: string[]
}

const StaffTransferList = TransferList<StaffItem>

const userOptions: StaffItem[] = [
  { key: "1", label: "张三", role: ["管理员"], selected: true },
  { key: "2", label: "李四", role: ["教师"] },
  { key: "3", label: "王五", role: ["教师"] },
  { key: "4", label: "赵六", role: ["教师"] },
  { key: "5", label: "钱七", role: ["教师"] },
  { key: "6", label: "孙八", role: ["教师"] },
  { key: "7", label: "吴十", role: ["教师"] },
  { key: "8", label: "郑十一", role: ["教师"] },
  { key: "9", label: "王十二", role: ["教师"] },
]

const campusEditSchema = z.object({
  schoolId: z.string({
    required_error: "请输入校区ID",
  }),
  schoolName: z.string({
    required_error: "请输入校区名称",
  }),
  schoolIntro: z.string({
    required_error: "请输入校区介绍",
  }),
  schoolMvs: z.array(z.string()),
  schoolPictures: z.array(z.string()),
  schoolStatus: z.enum(["normal", "closed"], {
    required_error: "请选择运营状态",
  }),
  schoolAddr: z.string({
    required_error: "请输入详细地址",
  }),
  director: z.array(z.object({
    staffId: z.string(),
    staffName: z.string(),
  }), {
    required_error: "请选择校区负责人",
  }),
})

const mockCampusData = {
  schoolId: "SCHOOL_001",
  schoolName: "未来科技学院",
  schoolIntro: "未来科技学院是一所专注于前沿科技教育的现代化学校，致力于培养未来的科技领袖和创新人才。",
  schoolMvs: [
    "http://vjs.zencdn.net/v/oceans.mp4",
    "https://www.w3school.com.cn/example/html5/mov_bbb.mp4"
  ],
  schoolPictures: [
    "https://gips2.baidu.com/it/u=1840289963,2728468038&fm=3042&app=3042&f=JPEG&wm=1,baiduai,0,0,13,9&wmo=0,0&w=480&h=640",
    "https://gips1.baidu.com/it/u=21402277,1408661998&fm=3042&app=3042&f=JPEG&wm=1,baiduai,0,0,13,9&wmo=0,0&w=480&h=640",
    "https://gips1.baidu.com/it/u=374234436,1730523546&fm=3042&app=3042&f=JPEG&wm=1,baiduai,0,0,13,9&wmo=0,0&w=480&h=640"
  ],
  schoolStatus: "normal" as const,
  schoolAddr: "北京市海淀区科技园路88号",
  director: [
    { staffId: "1", staffName: "张三" },
    { staffId: "3", staffName: "王五" }
  ]
}

type CampusFormValues = z.infer<typeof campusEditSchema>

export default function CampusEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const router = useRouter()

  const { data: school = mockCampusData, isLoading } = useSWR(`${process.env.BASE_URL}/school/manage/get`, async (url: string) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "req-device": "pc"
      },
      body: new URLSearchParams({
        schoolId: id,
      })
    })
    const { data } = await res.json()
    return data
  })
  
  // 如果找不到对应校区，返回404
  if (!school && id !== "add") {
    notFound()
  }



  const form = useForm<CampusFormValues>({
      resolver: zodResolver(campusEditSchema),
    defaultValues: {
      schoolId: school?.schoolId,
      schoolName: school?.schoolName,
      schoolIntro: school?.schoolIntro,
      schoolMvs: school?.schoolMvs,
      schoolStatus: school?.schoolStatus,
      schoolPictures: school?.schoolPictures,
      schoolAddr: school?.schoolAddr,
      director: school?.director,
    },
  })
  
  const submit = form.handleSubmit(async (data) => {
    router.back()
  })

  return (
    <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-6 transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <Link 
          href="/campus-management" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </Link>
      </div>

      <Card className="overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md">
        <CardHeader className="bg-muted/10 border-b">
          <div className="space-y-1">
            <CardTitle className="text-xl">校区信息</CardTitle>
            <CardDescription className="text-sm">更新校区的详细信息和运营数据</CardDescription>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={submit}>
            <input type="hidden" {...form.register("schoolId")} value={id} />
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="schoolName" className="text-sm font-medium">
                        校区名称
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input 
                          id="name" 
                          type="text" 
                          {...field} 
                          className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="schoolStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="schoolStatus" className="text-sm font-medium">
                        运营状态
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger 
                            id="status" 
                            className="w-full focus:ring-2 focus:ring-primary/50"
                          >
                            <SelectValue placeholder="选择状态" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">正常运营</SelectItem>
                            <SelectItem value="closed">暂停运营</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="schoolAddr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="schoolAddr" className="text-sm font-medium">
                      详细地址
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        id="address" 
                        {...field} 
                        className="mt-1 min-h-[100px] focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="schoolIntro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="schoolIntro" className="text-sm font-medium">
                      校区介绍
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        id="schoolIntro" 
                        {...field} 
                        className="mt-1 min-h-[100px] focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              
              <FormField
                control={form.control}
                name="director"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="director" className="text-sm font-medium">
                      校区负责人
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <StaffTransferList
                        items={userOptions}
                        onChange={(leftItems, rightItems) => {
                          console.log('======>', rightItems);
                          
                          field.onChange(rightItems)
                        }}
                        renderItem={(item) => (
                          <div>
                            <div className="flex items-center"> 
                              {item.label}
                            </div>
                            <div className="flex items-center">
                              {item.role.map((role) => (
                                <Badge key={role} className="mr-2">{role}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schoolPictures"
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel htmlFor="schoolPictures" className="text-sm font-medium">
                      校区图片
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <ImageGallery 
                          images={field.value.map((url, index) => ({ src: url, alt: "校区图片", id: `${index}` }))}
                          gap={4}
                          columns={4}
                          showDeleteButton={true}
                          onImagesChange={(images) => {
                            field.onChange(images.map(image => image.src))
                          }}
                        />
                        <ImageUploader
                          className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                          onImageChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schoolMvs"
                render={({ field }) => ( 
                  <FormItem>
                    <FormLabel htmlFor="schoolMvs" className="text-sm font-medium">
                      校区视频
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <VideoGallery
                          videos={field.value.map((url) => ({ src: url, id: url, title: "视频" }))}
                          gap={4}
                          columns={4}
                          showDeleteButton={true}
                          onVideosChange={(videos) => {
                            field.onChange(videos.map(video => video.src))
                          }}
                        />
                        <FileUploader
                          className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                          acceptedFileTypes=".mp4,.webm,.mov,.avi,.mkv"
                          onFileChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t bg-muted/10">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={form.formState.isSubmitting}
                className="border-border/50 hover:border-foreground/50"
              >
                取消
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
                disabled={form.formState.isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" />
                保存更改
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

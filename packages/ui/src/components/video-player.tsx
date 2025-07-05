"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"

export function VideoPlayer({
  src,
  track,
  type = "video/mp4",
  width = "100%",
  height = "auto",
  poster,
}: {
  src: string
  track?: string
  type?: string
  width?: string
  height?: string
  poster?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(poster || null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // 如果没有提供海报图片，尝试从视频中获取第一帧
  useEffect(() => {
    if (!poster && !thumbnailUrl) {
      const video = document.createElement("video")
      video.crossOrigin = "anonymous"
      video.src = src
      video.muted = true
      video.preload = "metadata"

      video.onloadeddata = () => {
        try {
          video.currentTime = 0.1 // 设置到视频开始后的一小段时间，确保能捕获到帧
          setTimeout(() => {
            const canvas = document.createElement("canvas")
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext("2d")
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
              const dataUrl = canvas.toDataURL("image/jpeg")
              setThumbnailUrl(dataUrl)
            }
            video.remove() // 清理
          }, 100)
        } catch (error) {
          console.error("获取视频第一帧失败:", error)
        }
      }

      video.onerror = () => {
        console.error("视频加载失败")
        video.remove() // 清理
      }

      return () => {
        video.remove() // 组件卸载时清理
      }
    }
  }, [src, poster, thumbnailUrl])

  // 当弹窗关闭时暂停视频
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="relative cursor-pointer"
          style={{ width, height: height !== "auto" ? height : "auto" }}
        >
          {thumbnailUrl ? (
            <div className="relative w-full h-full">
              <img
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black bg-opacity-50 rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full min-h-[200px] bg-gray-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        <div className="relative">
          <video
            ref={videoRef}
            width="100%"
            height="auto"
            controls
            autoPlay
            className="w-full"
          >
            <source src={src} type={type} />
            {track && (
              <track
                src={track}
                kind="subtitles"
                srcLang="en"
                label="English"
              />
            )}
          </video>
        </div>
      </DialogContent>
    </Dialog>
  )
}
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Trash2, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { cn } from "@repo/ui/lib/utils"

interface VideoItem {
  id: string
  src: string
  title: string
  poster?: string
  duration?: string
  thumbnail?: string
}

interface VideoGalleryProps {
  videos: VideoItem[]
  columns?: number
  gap?: number
  className?: string
  onVideosChange?: (videos: VideoItem[]) => void
  disabled?: boolean
  showDeleteButton?: boolean
}

export function VideoGallery({
  videos,
  columns = 3,
  gap = 4,
  className,
  onVideosChange,
  disabled = false,
  showDeleteButton = true,
}: VideoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // 防止背景滚动
  useEffect(() => {
    if (isPlayerOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isPlayerOpen])

  const openPlayer = (index: number) => {
    if (disabled) return
    setSelectedIndex(index)
    setIsPlayerOpen(true)
    setIsPlaying(false)
  }

  const closePlayer = useCallback(() => {
    setIsPlayerOpen(false)
    setSelectedIndex(null)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  const navigatePrevious = useCallback(() => {
    if (selectedIndex === null) return
    const newIndex = selectedIndex === 0 ? videos.length - 1 : selectedIndex - 1
    setSelectedIndex(newIndex)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [selectedIndex, videos])

  const navigateNext = useCallback(() => {
    if (selectedIndex === null) return
    const newIndex = selectedIndex === videos.length - 1 ? 0 : selectedIndex + 1
    setSelectedIndex(newIndex)
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }, [selectedIndex, videos])

  const handleDeleteVideo = useCallback((videoId: string) => {
    if (disabled) return

    const newVideos = videos.filter((video) => video.id !== videoId)

    // 如果当前在播放器模式且删除的是当前显示的视频
    if (isPlayerOpen && selectedIndex !== null) {
      const currentVideo = videos[selectedIndex]
      if (currentVideo.id === videoId) {
        if (newVideos.length === 0) {
          // 如果没有视频了，关闭播放器
          closePlayer()
        } else {
          // 调整选中的索引
          const newIndex = selectedIndex >= newVideos.length ? newVideos.length - 1 : selectedIndex
          setSelectedIndex(newIndex)
          setIsPlaying(false)
        }
      } else {
        // 重新计算当前视频在新数组中的索引
        const currentVideoIndex = newVideos.findIndex((video) => video.id === currentVideo.id)
        setSelectedIndex(currentVideoIndex)
      }
    }

    onVideosChange?.(newVideos)
  }, [disabled, isPlayerOpen, selectedIndex, videos, closePlayer, setSelectedIndex, setIsPlaying, onVideosChange])

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }, [isPlaying, videoRef])

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

   // 处理键盘事件
   useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlayerOpen) return

      switch (e.key) {
        case "Escape":
          closePlayer()
          break
        case "ArrowLeft":
          navigatePrevious()
          break
        case "ArrowRight":
          navigateNext()
          break
        case " ":
          e.preventDefault()
          togglePlay()
          break
        case "Delete":
        case "Backspace":
          if (selectedIndex !== null && !disabled) {
            handleDeleteVideo(videos[selectedIndex].id)
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isPlayerOpen, navigateNext, navigatePrevious, selectedIndex, videos, disabled, isPlaying, handleDeleteVideo, togglePlay, closePlayer])

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
  }

  const gapClass = `gap-${gap}`

  if (videos.length === 0) {
    return (
      <div
        className={cn(
          "flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg",
          className,
        )}
      >
        <p className="text-gray-500">暂无视频</p>
      </div>
    )
  }

  return (
    <>
      {/* 网格布局 */}
      <div className={cn("grid", gridCols[Math.min(columns, 6) as keyof typeof gridCols], gapClass, className)}>
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className={cn(
              "relative aspect-video cursor-pointer overflow-hidden rounded-lg bg-gray-100",
              disabled && "cursor-not-allowed opacity-60",
            )}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            onClick={(e) => { 
              e.preventDefault()
              e.stopPropagation()
              openPlayer(index)
            }}
            onMouseEnter={(e) => { 
              e.preventDefault()
              e.stopPropagation()
              setHoveredVideoId(video.id)
            }}
            onMouseLeave={(e) => { 
              e.preventDefault()
              e.stopPropagation()
              setHoveredVideoId(null)
            }}
          >
            {/* 视频缩略图 */}
            <Image
              src={video.thumbnail || video.poster || "/placeholder.svg?height=180&width=320"}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* 播放按钮覆盖层 */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 hover:bg-black/30">
              <div className="bg-white/90 rounded-full p-3 shadow-lg">
                <Play size={24} className="text-gray-800 ml-1" />
              </div>
            </div>

            {/* 视频信息 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <h3 className="text-white text-sm font-medium truncate">{video.title}</h3>
              {video.duration && <p className="text-white/80 text-xs">{video.duration}</p>}
            </div>

            {/* 删除按钮 */}
            {showDeleteButton && !disabled && (
              <AnimatePresence>
                {hoveredVideoId === video.id && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-2 right-2 z-10 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition-colors hover:bg-red-600"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleDeleteVideo(video.id)
                    }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        ))}
      </div>

      {/* 视频播放器弹窗 */}
      <AnimatePresence>
        {isPlayerOpen && selectedIndex !== null && selectedIndex < videos.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed h-full inset-0 z-50 bg-gray-900"
          >
            <div className="h-full flex">
              {/* 左侧视频列表 */}
              <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
                {/* 头部 */}
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                  <h2 className="text-white font-semibold">视频列表</h2>
                </div>

                {/* 视频列表 */}
                <div className="flex-1 overflow-y-auto">
                  {videos.map((video, index) => (
                    <div
                      key={video.id}
                      className={cn(
                        "p-3 border-b border-gray-700 cursor-pointer transition-colors hover:bg-gray-800",
                        index === selectedIndex && "bg-gray-800 border-l-4 border-l-blue-500",
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSelectedIndex(index)
                        setIsPlaying(false)
                        if (videoRef.current) {
                          videoRef.current.pause()
                        }
                      }}
                    >
                      <div className="flex space-x-3">
                        <div className="relative w-16 h-9 flex-shrink-0 rounded overflow-hidden bg-gray-700">
                          <Image
                            src={video.thumbnail || video.poster || "/placeholder.svg?height=90&width=160"}
                            alt={video.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play size={12} className="text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white text-sm font-medium truncate">{video.title}</h3>
                          {video.duration && <p className="text-gray-400 text-xs mt-1">{video.duration}</p>}
                        </div>
                        {showDeleteButton && !disabled && (
                          <button
                            className="text-gray-400 hover:text-red-400 transition-colors p-1"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleDeleteVideo(video.id)
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 右侧视频播放区域 */}
              <div className="flex-1 flex flex-col">
                {/* 播放器头部 */}
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                  <div>
                    <h1 className="text-white text-lg font-semibold">{videos[selectedIndex].title}</h1>
                    <p className="text-gray-400 text-sm">
                      {selectedIndex + 1} / {videos.length}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* 删除按钮 */}
                    {showDeleteButton && !disabled && (
                      <button
                        className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-gray-800"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDeleteVideo(videos[selectedIndex].id)
                        }}
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                    {/* 关闭按钮 */}
                    <button
                      className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        closePlayer()
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* 视频播放器 */}
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="relative w-full max-w-4xl">
                    <video
                      ref={videoRef}
                      src={videos[selectedIndex].src}
                      poster={videos[selectedIndex].poster}
                      className="w-full h-auto rounded-lg shadow-2xl"
                      controls
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onVolumeChange={(e) => setIsMuted((e.target as HTMLVideoElement).muted)}
                    />

                    {/* 导航按钮 */}
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors disabled:opacity-50"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        navigatePrevious()
                      }}
                      disabled={videos.length <= 1}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors disabled:opacity-50"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        navigateNext()
                      }}
                      disabled={videos.length <= 1}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

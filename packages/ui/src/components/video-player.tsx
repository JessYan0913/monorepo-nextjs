"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Play, X } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { cn } from "@repo/ui/lib/utils"

// 定义视频项接口
interface VideoItem {
  src: string
  title?: string
  poster?: string
  track?: string
  type?: string
}

// 获取视频缩略图的钩子函数
function useVideoThumbnail(src: string, poster?: string) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(poster || null)
  
  useEffect(() => {
    // 如果已经有缩略图或海报，则不需要处理
    if (poster || thumbnailUrl) {
      return;
    }

    let isMounted = true;

    const tryGetThumbnail = () => {
      try {
        const video = document.createElement("video");
        video.muted = true;
        video.preload = "metadata";
        
        // 设置超时，防止长时间等待
        const timeoutId = setTimeout(() => {
          if (isMounted && !thumbnailUrl) {
            video.remove();
          }
        }, 5000);

        // 加载元数据后尝试获取第一帧
        video.onloadedmetadata = () => {
          try {
            video.currentTime = 0.1;
          } catch {
            // 忽略设置 currentTime 可能的错误
          }
        };

        video.onloadeddata = () => {
          clearTimeout(timeoutId);
          if (!isMounted) {
            video.remove();
            return;
          }

          try {
            if (video.videoWidth === 0 || video.videoHeight === 0) {
              throw new Error("视频尺寸无效");
            }

            const canvas = document.createElement("canvas");
            const maxDimension = 640;
            const aspectRatio = video.videoWidth / video.videoHeight;
            
            if (video.videoWidth > video.videoHeight) {
              canvas.width = Math.min(video.videoWidth, maxDimension);
              canvas.height = canvas.width / aspectRatio;
            } else {
              canvas.height = Math.min(video.videoHeight, maxDimension);
              canvas.width = canvas.height * aspectRatio;
            }

            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              try {
                const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
                if (isMounted) {
                  setThumbnailUrl(dataUrl);
                }
              } catch (err) {
                console.warn("无法生成缩略图，可能是跨域限制", err);
              }
            }
          } catch (error) {
            console.warn("获取视频第一帧失败:", error);
          } finally {
            video.remove();
          }
        };

        video.onerror = () => {
          clearTimeout(timeoutId);
          video.remove();
        };

        video.src = src;

      } catch (error) {
        console.warn("创建视频元素失败:", error);
      }
    };

    tryGetThumbnail();

    return () => {
      isMounted = false;
    };
  }, [src, poster, thumbnailUrl]);

  return thumbnailUrl;
}

// 预先生成所有视频的缩略图
function useVideoThumbnails(videos: VideoItem[]) {
  // 使用 useMemo 缓存缩略图结果
  const thumbnailMap = useMemo(() => {
    // 创建一个对象来存储缩略图
    const map: Record<string, string | null> = {};
    return map;
  }, []);
  
  // 为每个视频单独调用 hook，最多处理 5 个视频
  // 这些都是在组件顶层调用的
  const video0 = videos[0] || { src: "", poster: undefined };
  const thumb0 = useVideoThumbnail(video0.src, video0.poster);
  
  const video1 = videos[1] || { src: "", poster: undefined };
  const thumb1 = useVideoThumbnail(video1.src, video1.poster);
  
  const video2 = videos[2] || { src: "", poster: undefined };
  const thumb2 = useVideoThumbnail(video2.src, video2.poster);
  
  const video3 = videos[3] || { src: "", poster: undefined };
  const thumb3 = useVideoThumbnail(video3.src, video3.poster);
  
  const video4 = videos[4] || { src: "", poster: undefined };
  const thumb4 = useVideoThumbnail(video4.src, video4.poster);
  
  // 将结果存入 map
  useMemo(() => {
    if (video0.src) thumbnailMap[video0.src] = thumb0;
    if (video1.src) thumbnailMap[video1.src] = thumb1;
    if (video2.src) thumbnailMap[video2.src] = thumb2;
    if (video3.src) thumbnailMap[video3.src] = thumb3;
    if (video4.src) thumbnailMap[video4.src] = thumb4;
  }, [thumbnailMap, thumb0, thumb1, thumb2, thumb3, thumb4, video0.src, video1.src, video2.src, video3.src, video4.src]);
  
  // 返回获取缩略图的函数
  return (video: VideoItem) => {
    // 先检查是否有缓存
    if (video.src in thumbnailMap) {
      return thumbnailMap[video.src];
    }
    
    // 如果没有缓存，则使用 poster 或返回 null
    return video.poster || null;
  };
}

// 列表中的视频缩略图组件
function VideoListThumbnail({ video, getThumbnail }: { video: VideoItem, getThumbnail: (video: VideoItem) => string | null }) {
  const thumbnailUrl = getThumbnail(video);
  
  return thumbnailUrl ? (
    <img 
      src={thumbnailUrl}
      alt=""
      className="w-full h-full object-cover rounded"
    />
  ) : (
    <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center">
      <Play className="h-3 w-3" />
    </div>
  );
}

// 单个视频缩略图组件
function VideoThumbnail({
  video,
  isActive = false,
  onClick,
}: {
  video: VideoItem
  isActive?: boolean
  onClick: () => void
}) {
  const thumbnailUrl = useVideoThumbnail(video.src, video.poster);
  
  return (
    <div 
      className={cn(
        "relative cursor-pointer transition-all duration-200",
        isActive ? "ring-2 ring-primary" : "hover:opacity-90"
      )}
      onClick={onClick}
    >
      {thumbnailUrl ? (
        <div className="relative w-full aspect-video">
          <img
            src={thumbnailUrl}
            alt={video.title || "Video thumbnail"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              <Play className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
          <Play className="h-5 w-5 text-gray-400" />
        </div>
      )}
      {video.title && (
        <div className="mt-1 text-sm truncate">{video.title}</div>
      )}
    </div>
  );
}

export function VideoGallery({
  videos,
  width = "100%",
  height = "auto",
  columns = 3,
}: {
  videos: VideoItem[]
  width?: string
  height?: string
  columns?: number
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // 在组件顶层调用 hook，避免条件调用
  // 始终调用 hook，即使不需要使用其结果
  const firstVideoSrc = videos.length > 0 ? videos[0].src : "";
  const firstVideoPoster = videos.length > 0 ? videos[0].poster : undefined;
  const firstVideoThumbnail = useVideoThumbnail(firstVideoSrc, firstVideoPoster);
  
  // 为所有视频生成缩略图
  const getThumbnail = useVideoThumbnails(videos);
  
  // 当弹窗关闭时暂停视频
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);
  
  // 当活动视频改变时重置视频
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isOpen) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [activeVideoIndex, isOpen]);
  
  // 如果没有视频，不渲染任何内容
  if (!videos.length) return null;
  
  // 如果只有一个视频，使用简单的视频播放器
  if (videos.length === 1) {
    const video = videos[0];
    const thumbnailUrl = firstVideoThumbnail;
    
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
                  alt={video.title || "Video thumbnail"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-3">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full min-h-[200px] bg-gray-200 flex items-center justify-center">
                <Play className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-5xl w-full p-0 overflow-hidden">
          <div className="relative">
            <video
              ref={videoRef}
              width="100%"
              height="auto"
              controls
              autoPlay
              className="w-full"
            >
              <source src={video.src} type={video.type || "video/mp4"} />
              {video.track && (
                <track
                  src={video.track}
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
              )}
            </video>
            {video.title && (
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {video.title}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  // 多视频画廊
  const activeVideo = videos[activeVideoIndex];
  
  return (
    <div style={{ width }}>
      <div 
        className={`grid gap-4`}
        style={{ 
          gridTemplateColumns: `repeat(${Math.min(columns, videos.length)}, 1fr)`,
          height: height !== "auto" ? height : "auto"
        }}
      >
        {videos.map((video, index) => (
          <VideoThumbnail
            key={index}
            video={video}
            onClick={() => {
              setActiveVideoIndex(index);
              setIsOpen(true);
            }}
          />
        ))}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl w-full p-0 overflow-hidden">
          <div className="flex flex-col md:flex-row h-[80vh]">
            {/* 左侧视频列表 */}
            <div className="md:w-1/4 bg-gray-100 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">视频列表</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-3">
                {videos.map((video, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "cursor-pointer p-2 rounded transition-colors",
                      activeVideoIndex === index 
                        ? "bg-primary/10 border-l-2 border-primary" 
                        : "hover:bg-gray-200"
                    )}
                    onClick={() => setActiveVideoIndex(index)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative w-16 aspect-video flex-shrink-0">
                        <VideoListThumbnail video={video} getThumbnail={getThumbnail} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{video.title || `视频 ${index + 1}`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 右侧视频播放器 */}
            <div className="md:w-3/4 bg-black relative flex items-center justify-center">
              <video
                ref={videoRef}
                width="100%"
                height="100%"
                controls
                autoPlay
                className="max-h-full"
              >
                <source src={activeVideo.src} type={activeVideo.type || "video/mp4"} />
                {activeVideo.track && (
                  <track
                    src={activeVideo.track}
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                  />
                )}
              </video>
              {activeVideo.title && (
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                  {activeVideo.title}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
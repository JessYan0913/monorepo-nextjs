"use client"

import { useMemo, useState, useEffect } from "react"
import CourseCard from "./course-card"
import type { TimeSlot } from "@/lib/actions/course"
import { getTimeSlots } from "@/lib/actions/course"

interface DailyScheduleProps {
  onTimeSlotClick: (timeSlot: TimeSlot) => void
}

export default function DailySchedule({ onTimeSlotClick }: DailyScheduleProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate] = useState(new Date());

  // 获取时间段数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 获取当天日期的格式化字符串（YYYY-MM-DD）
        const dateStr = currentDate.toISOString().split('T')[0];
        
        // 使用日期过滤获取当天的时间段
        const timeSlotsData = await getTimeSlots({
          startDate: dateStr,
          endDate: dateStr
        });
        
        setTimeSlots(timeSlotsData);
      } catch (error) {
        console.error('Failed to fetch time slots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentDate]);

  const timeSlotsByHour = useMemo(() => {
    const slots: { [hour: string]: TimeSlot[] } = {}

    timeSlots.forEach((slot) => {
      const hour = slot.startTime.split(":")[0]
      if (!slots[hour]) slots[hour] = []
      slots[hour].push(slot)
    })

    return slots
  }, [timeSlots])

  const hours = Array.from({ length: 16 }, (_, i) => i + 7) // 7:00 - 22:00

  if (loading) {
    return <div className="p-4 text-center">加载中...</div>;
  }

  return (
    <div className="bg-white">
      <div className="flex border-b bg-gray-50">
        <div className="w-20 p-4 font-medium text-gray-700 border-r">时间</div>
        <div className="flex-1 p-4 text-center font-medium text-gray-700">
          {currentDate.toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </div>
      </div>

      {hours.map((hour) => (
        <div key={hour} className="flex border-b min-h-20">
          <div className="w-20 p-2 border-r text-sm text-gray-600 flex items-center justify-center bg-gray-50">
            {hour}:00
          </div>
          <div className="flex-1 p-2">
            <div className="space-y-1">
              {timeSlotsByHour[hour.toString()]?.map((timeSlot) => (
                <CourseCard key={timeSlot.id} timeSlot={timeSlot} onClick={() => onTimeSlotClick(timeSlot)} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

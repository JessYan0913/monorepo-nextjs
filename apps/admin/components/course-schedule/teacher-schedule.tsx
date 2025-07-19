"use client"

import { useMemo, useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import CourseCard from "./course-card"
import type { TimeSlot, Teacher } from "@/lib/actions/course"
import { getTimeSlots, getTeachers } from "@/lib/actions/course"

interface TeacherScheduleProps {
  onTimeSlotClick: (timeSlot: TimeSlot) => void
}

export default function TeacherSchedule({ onTimeSlotClick }: TeacherScheduleProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取教师和时间段数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [timeSlotsData, teachersData] = await Promise.all([
          getTimeSlots(),
          getTeachers()
        ]);
        setTimeSlots(timeSlotsData);
        setTeachers(teachersData);
      } catch (error) {
        console.error('Failed to fetch schedule data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scheduleByTeacher = useMemo(() => {
    const schedule: { [teacherId: string]: { [day: string]: TimeSlot[] } } = {}

    timeSlots.forEach((slot) => {
      if (!slot.teacherId) return

      if (!schedule[slot.teacherId]) {
        schedule[slot.teacherId] = {}
      }

      // 使用时间段中的 day 属性，如果没有则默认为 monday
      const day = slot.day || "monday";
      if (!schedule[slot.teacherId][day]) {
        schedule[slot.teacherId][day] = []
      }

      schedule[slot.teacherId][day].push(slot)
    })

    return schedule
  }, [timeSlots])

  // 生成包含日期的星期几标签
  const weekDays = useMemo(() => {
    const today = new Date();
    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day; // 调整到本周一
    
    const weekDays = [];
    const dayNames = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    const dayKeys = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + diff + i);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedDate = `${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
      
      weekDays.push({
        key: dayKeys[i],
        label: `${dayNames[i]}(${formattedDate})`
      });
    }
    
    return weekDays;
  }, []);

  if (loading) {
    return <div className="p-4 text-center">加载中...</div>;
  }

  return (
    <div className="bg-white">
      <div className="grid grid-cols-8 border-b">
        <div className="p-4 font-medium text-gray-700 border-r">老师</div>
        {weekDays.map((day) => (
          <div key={day.key} className="p-4 text-center font-medium text-gray-700 border-r last:border-r-0">
            {day.label}
          </div>
        ))}
      </div>

      {teachers.map((teacher) => (
        <div key={teacher.id} className="grid grid-cols-8 border-b">
          <div className="p-4 border-r bg-gray-50">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={teacher.avatar || "/placeholder.svg"} />
                <AvatarFallback>{teacher.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{teacher.name}</div>
                <div className="text-xs text-gray-500">{teacher.specialties.join(", ")}</div>
              </div>
            </div>
          </div>
          {weekDays.map((day) => (
            <div key={day.key} className="p-2 border-r last:border-r-0 min-h-32">
              <div className="space-y-1">
                {scheduleByTeacher[teacher.id]?.[day.key]?.map((timeSlot) => (
                  <CourseCard key={timeSlot.id} timeSlot={timeSlot} onClick={() => onTimeSlotClick(timeSlot)} compact />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

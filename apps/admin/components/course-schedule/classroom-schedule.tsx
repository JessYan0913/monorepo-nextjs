"use client"

import { useMemo, useState, useEffect } from "react"
import CourseCard from "./course-card"
import type { TimeSlot, Classroom } from "@/lib/actions/course"
import { getTimeSlots, getClassrooms } from "@/lib/actions/course"

interface ClassroomScheduleProps {
  onTimeSlotClick: (timeSlot: TimeSlot) => void
}

export default function ClassroomSchedule({
  onTimeSlotClick,
}: ClassroomScheduleProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取教室和时间段数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [timeSlotsData, classroomsData] = await Promise.all([
          getTimeSlots(),
          getClassrooms()
        ]);
        setTimeSlots(timeSlotsData);
        setClassrooms(classroomsData);
      } catch (error) {
        console.error('Failed to fetch schedule data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scheduleByClassroom = useMemo(() => {
    const schedule: { [classroomId: string]: { [day: string]: TimeSlot[] } } = {}

    timeSlots.forEach((slot) => {
      if (!slot.classroomId) return

      if (!schedule[slot.classroomId]) {
        schedule[slot.classroomId] = {}
      }

      // 使用时间段中的 day 属性，如果没有则默认为 monday
      const day = slot.day || "monday";
      if (!schedule[slot.classroomId][day]) {
        schedule[slot.classroomId][day] = []
      }

      schedule[slot.classroomId][day].push(slot)
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
        <div className="p-4 font-medium text-gray-700 border-r">教室</div>
        {weekDays.map((day) => (
          <div key={day.key} className="p-4 text-center font-medium text-gray-700 border-r last:border-r-0">
            {day.label}
          </div>
        ))}
      </div>

      {classrooms.map((classroom) => (
        <div key={classroom.id} className="grid grid-cols-8 border-b">
          <div className="p-4 border-r bg-gray-50">
            <div className="font-medium text-sm">{classroom.name}</div>
            <div className="text-xs text-gray-500 mt-1">容量: {classroom.capacity}人</div>
          </div>
          {weekDays.map((day) => (
            <div key={day.key} className="p-2 border-r last:border-r-0 min-h-32">
              <div className="space-y-1">
                {scheduleByClassroom[classroom.id]?.[day.key]?.map((timeSlot) => (
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

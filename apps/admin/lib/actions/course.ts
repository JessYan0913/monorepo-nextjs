export interface Course {
  id: string
  name: string
  type: string
  ageGroup: string
  duration: number
  color: string
  status: "scheduled" | "conflict" | "cancelled"
}

export interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  courseId?: string
  course?: Course
  teacherId?: string
  classroomId?: string
  classGroupId?: string
  studentCount?: number
  maxStudents?: number
}

export interface Teacher {
  id: string
  name: string
  avatar?: string
  specialties: string[]
}

export interface Classroom {
  id: string
  name: string
  capacity: number
  equipment: string[]
}

export interface ClassGroup {
  id: string
  name: string
  level: string
  studentCount: number
}

export interface ScheduleFilter {
  courseType?: string
  examStatus?: string
  courseCategory?: string
  teacher?: string
  grade?: string
  classroom?: string
  studentCard?: string
}

export type ViewMode = "monthly" | "daily" | "classroom" | "teacher" | "classGroup"
export type TimeViewMode = "day" | "week" | "month"

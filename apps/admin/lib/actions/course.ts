"use server"

// 接口定义
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
  date?: string // 日期，格式如 "2025-07-17"
  day?: string // 星期几，如 "monday"
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
  startDate?: string
  endDate?: string
  viewMode?: ViewMode
  timeViewMode?: TimeViewMode
}

export type ViewMode = "monthly" | "daily" | "classroom" | "teacher" | "classGroup"
export type TimeViewMode = "day" | "week" | "month"

// 模拟数据
const mockCourses: Course[] = [
  {
    id: "1",
    name: "儿童心理沙盘",
    type: "单人",
    ageGroup: "3-6岁",
    duration: 60,
    color: "orange",
    status: "scheduled",
  },
  {
    id: "2",
    name: "木工坊",
    type: "小组",
    ageGroup: "7-12岁",
    duration: 60,
    color: "red",
    status: "scheduled",
  },
  {
    id: "3",
    name: "创意美术",
    type: "小组",
    ageGroup: "5-8岁",
    duration: 90,
    color: "blue",
    status: "scheduled",
  },
  {
    id: "4",
    name: "音乐启蒙",
    type: "小组",
    ageGroup: "3-5岁",
    duration: 45,
    color: "purple",
    status: "scheduled",
  },
  {
    id: "5",
    name: "科学实验室",
    type: "小组",
    ageGroup: "8-12岁",
    duration: 90,
    color: "green",
    status: "scheduled",
  },
]

const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "小江老师",
    avatar: "/placeholder.svg?height=32&width=32",
    specialties: ["心理沙盘", "儿童心理"],
  },
  {
    id: "2",
    name: "李老师",
    specialties: ["手工制作", "创意思维"],
  },
  {
    id: "3",
    name: "王老师",
    avatar: "/placeholder.svg?height=32&width=32",
    specialties: ["美术", "创意绘画"],
  },
  {
    id: "4",
    name: "张老师",
    specialties: ["音乐", "钢琴"],
  },
  {
    id: "5",
    name: "刘老师",
    avatar: "/placeholder.svg?height=32&width=32",
    specialties: ["科学", "实验教学"],
  },
]

const mockClassrooms: Classroom[] = [
  {
    id: "1",
    name: "感统专注力训练区-C",
    capacity: 15,
    equipment: ["感统器材", "专注力训练设备"],
  },
  {
    id: "2",
    name: "创意工坊",
    capacity: 12,
    equipment: ["工具台", "安全设备"],
  },
  {
    id: "3",
    name: "美术教室",
    capacity: 20,
    equipment: ["画架", "颜料", "画笔"],
  },
  {
    id: "4",
    name: "音乐教室",
    capacity: 15,
    equipment: ["钢琴", "打击乐器", "音响设备"],
  },
  {
    id: "5",
    name: "科学实验室",
    capacity: 18,
    equipment: ["显微镜", "实验台", "安全设备"],
  },
]

const mockClassGroups: ClassGroup[] = [
  {
    id: "1",
    name: "小班A",
    level: "初级",
    studentCount: 8,
  },
  {
    id: "2",
    name: "中班B",
    level: "中级",
    studentCount: 12,
  },
  {
    id: "3",
    name: "大班C",
    level: "高级",
    studentCount: 15,
  },
]

// 生成一周的日期
function generateWeekDates(startDate: Date = new Date()): string[] {
  const dates: string[] = [];
  const currentDate = new Date(startDate);
  
  // 调整到本周的周一
  const day = currentDate.getDay();
  const diff = day === 0 ? -6 : 1 - day; // 如果是周日，则往前推6天；否则，往前推(1-当前星期几)天
  
  currentDate.setDate(currentDate.getDate() + diff);
  
  // 生成一周的日期
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    dates.push(date.toISOString().split('T')[0]); // 格式：YYYY-MM-DD
  }
  
  return dates;
}

// 生成模拟的时间段数据
function generateMockTimeSlots(): TimeSlot[] {
  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const weekDates = generateWeekDates();
  const timeSlots: TimeSlot[] = [];
  let id = 1;
  
  // 为每个课程生成多个时间段
  mockCourses.forEach((course) => {
    // 每个课程在不同日期、不同教室、不同老师的安排
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      // 每天安排2-3个时间段
      const slotsPerDay = Math.floor(Math.random() * 2) + 2;
      
      for (let slot = 0; slot < slotsPerDay; slot++) {
        // 随机选择开始时间（8:00 - 16:00之间）
        const hour = Math.floor(Math.random() * 8) + 8;
        const minute = Math.random() > 0.5 ? 30 : 0;
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // 根据课程时长计算结束时间
        const endHour = hour + Math.floor((minute + course.duration) / 60);
        const endMinute = (minute + course.duration) % 60;
        const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
        
        // 随机选择教师、教室和班级
        const teacherId = mockTeachers[Math.floor(Math.random() * mockTeachers.length)].id;
        const classroomId = mockClassrooms[Math.floor(Math.random() * mockClassrooms.length)].id;
        const classGroupId = mockClassGroups[Math.floor(Math.random() * mockClassGroups.length)].id;
        
        // 随机学生人数（不超过最大容量）
        const maxStudents = Math.floor(Math.random() * 10) + 5;
        const studentCount = Math.floor(Math.random() * maxStudents);
        
        // 随机状态（大部分是scheduled，少部分是conflict或cancelled）
        const statusRandom = Math.random();
        const status = statusRandom > 0.9 ? "conflict" : (statusRandom > 0.8 ? "cancelled" : "scheduled");
        
        timeSlots.push({
          id: String(id++),
          startTime,
          endTime,
          courseId: course.id,
          course: {
            ...course,
            status: status as "scheduled" | "conflict" | "cancelled"
          },
          teacherId,
          classroomId,
          classGroupId,
          studentCount,
          maxStudents,
          date: weekDates[dayIndex],
          day: weekDays[dayIndex]
        });
      }
    }
  });
  
  return timeSlots;
}

const mockTimeSlots = generateMockTimeSlots();

/**
 * 获取所有课程
 */
export async function getCourses(): Promise<Course[]> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockCourses;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw new Error('Failed to fetch courses');
  }
}

/**
 * 获取所有教师
 */
export async function getTeachers(): Promise<Teacher[]> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockTeachers;
  } catch (error) {
    console.error('Failed to fetch teachers:', error);
    throw new Error('Failed to fetch teachers');
  }
}

/**
 * 获取所有教室
 */
export async function getClassrooms(): Promise<Classroom[]> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockClassrooms;
  } catch (error) {
    console.error('Failed to fetch classrooms:', error);
    throw new Error('Failed to fetch classrooms');
  }
}

/**
 * 获取所有班级
 */
export async function getClassGroups(): Promise<ClassGroup[]> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockClassGroups;
  } catch (error) {
    console.error('Failed to fetch class groups:', error);
    throw new Error('Failed to fetch class groups');
  }
}

/**
 * 获取课程表时间段
 */
export async function getTimeSlots(filter?: ScheduleFilter): Promise<TimeSlot[]> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let filteredSlots = [...mockTimeSlots];
    
    // 根据过滤条件筛选
    if (filter) {
      if (filter.courseType) {
        filteredSlots = filteredSlots.filter(slot => 
          slot.course?.type === filter.courseType
        );
      }
      
      if (filter.teacher) {
        filteredSlots = filteredSlots.filter(slot => 
          slot.teacherId === filter.teacher
        );
      }
      
      if (filter.classroom) {
        filteredSlots = filteredSlots.filter(slot => 
          slot.classroomId === filter.classroom
        );
      }
      
      if (filter.startDate && filter.endDate) {
        filteredSlots = filteredSlots.filter(slot => 
          slot.date && slot.date >= filter.startDate! && slot.date <= filter.endDate!
        );
      }
    }
    
    return filteredSlots;
  } catch (error) {
    console.error('Failed to fetch time slots:', error);
    throw new Error('Failed to fetch time slots');
  }
}

/**
 * 获取教师课表
 */
export async function getTeacherSchedule(teacherId: string): Promise<TimeSlot[]> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 150));
    return mockTimeSlots.filter(slot => slot.teacherId === teacherId);
  } catch (error) {
    console.error(`Failed to fetch schedule for teacher ${teacherId}:`, error);
    throw new Error('Failed to fetch teacher schedule');
  }
}

/**
 * 获取教室课表
 */
export async function getClassroomSchedule(classroomId: string): Promise<TimeSlot[]> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 150));
    return mockTimeSlots.filter(slot => slot.classroomId === classroomId);
  } catch (error) {
    console.error(`Failed to fetch schedule for classroom ${classroomId}:`, error);
    throw new Error('Failed to fetch classroom schedule');
  }
}

/**
 * 获取班级课表
 */
export async function getClassGroupSchedule(classGroupId: string): Promise<TimeSlot[]> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 150));
    return mockTimeSlots.filter(slot => slot.classGroupId === classGroupId);
  } catch (error) {
    console.error(`Failed to fetch schedule for class group ${classGroupId}:`, error);
    throw new Error('Failed to fetch class group schedule');
  }
}

/**
 * 创建新的时间段（排课）
 */
export async function createTimeSlot(timeSlotData: Omit<TimeSlot, 'id'>): Promise<TimeSlot> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 生成新ID
    const newId = String(Math.max(...mockTimeSlots.map(slot => parseInt(slot.id))) + 1);
    
    const newTimeSlot: TimeSlot = {
      id: newId,
      ...timeSlotData
    };
    
    // 在实际应用中，这里会将数据保存到数据库
    // 这里仅模拟返回新创建的时间段
    console.log('模拟创建时间段成功:', newTimeSlot);
    return newTimeSlot;
  } catch (error) {
    console.error('Failed to create time slot:', error);
    throw new Error('Failed to create time slot');
  }
}

/**
 * 更新时间段
 */
export async function updateTimeSlot(timeSlotData: TimeSlot): Promise<TimeSlot> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 在实际应用中，这里会更新数据库中的数据
    // 这里仅模拟返回更新后的时间段
    console.log('模拟更新时间段成功:', timeSlotData);
    return timeSlotData;
  } catch (error) {
    console.error(`Failed to update time slot ${timeSlotData.id}:`, error);
    throw new Error('Failed to update time slot');
  }
}

/**
 * 删除时间段
 */
export async function deleteTimeSlot(id: string): Promise<{ success: boolean; message: string }> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // 在实际应用中，这里会从数据库中删除数据
    console.log(`模拟删除时间段 ID: ${id}`);
    
    return {
      success: true,
      message: `时间段(ID: ${id})删除成功`
    };
  } catch (error) {
    console.error(`Failed to delete time slot ${id}:`, error);
    throw new Error('Failed to delete time slot');
  }
}

// 学生状态枚举
export enum StudentAttendanceStatus {
  PRESENT = "present",     // 已签到
  ABSENT = "absent",       // 旷课
  LEAVE = "leave",         // 请假
  LATE = "late"            // 迟到
}

// 学生信息接口
export interface Student {
  id: string
  name: string
  availableHours: number
  attendanceStatus: StudentAttendanceStatus
  leaveReason?: string
}

export interface CourseDetail {
  id: string
  subject: string
  date: string
  timeSlot: string
  courseType: string
  location: string
  teacher: string
  students: Student[]
}

// 基础动作步骤接口
export interface ActionStep {
  content: string;
  duration: string;
}

// 评分动作步骤接口，扩展基础步骤
export interface ScoringActionStep extends ActionStep {
  score?: number;
  comment?: string;
}

// 基础教案动作接口
export interface LessonAction {
  action: string;
  requirement: string;
  purpose: string;
  beginnerStep: ActionStep;
  intermediateStep: ActionStep;
  advancedStep: ActionStep;
}

// 评分教案动作接口，扩展基础动作
export interface ScoringLessonAction {
  action: string;
  requirement: string;
  purpose: string;
  beginnerStep: ScoringActionStep;
  intermediateStep: ScoringActionStep;
  advancedStep: ScoringActionStep;
}

// 基础教案接口
export interface LessonPlan {
  courseId?: string;
  classTime?: Date;
  gatheringDuration?: string;
  gatheringContent?: string;
  warmupContent?: string;
  warmupDuration?: string;
  topic: string;
  purpose?: string;
  actions: LessonAction[];
}

// 评分教案接口，扩展基础教案
export interface ScoringLessonPlan {
  topic: string;
  actions: ScoringLessonAction[];
}

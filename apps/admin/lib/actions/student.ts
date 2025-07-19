"use server"

// Mock data for students
let mockStudents: Student[] = [
  {
    studentId: 1,
    studentName: "张三",
    studentAccount: "zhangsan",
    studentPhone: "13800138001",
    studentIdcard: "110101200001011234",
    studentAddr: "北京市海淀区",
    studentBirthday: "2000-01-01",
    studentEnrollDate: "2022-09-01",
    studentSex: 0,
    studentStatus: "active",
    studentSerial: 20220001,
    studentClass: "计算机科学1班",
    studentGrade: "2022级",
    studentProfilePicture: "",
    createId: 1,
    createName: "系统",
    createTime: "2022-08-15T10:00:00Z",
    updateId: 1,
    updateName: "系统",
    updateTime: "2022-08-15T10:00:00Z"
  },
  {
    studentId: 2,
    studentName: "李四",
    studentAccount: "lisi",
    studentPhone: "13800138002",
    studentIdcard: "110101200002022345",
    studentAddr: "北京市朝阳区",
    studentBirthday: "2000-02-02",
    studentEnrollDate: "2022-09-01",
    studentSex: 0,
    studentStatus: "active",
    studentSerial: 20220002,
    studentClass: "计算机科学1班",
    studentGrade: "2022级",
    studentProfilePicture: "",
    createId: 1,
    createName: "系统",
    createTime: "2022-08-15T11:00:00Z",
    updateId: 1,
    updateName: "系统",
    updateTime: "2022-08-15T11:00:00Z"
  },
  {
    studentId: 3,
    studentName: "王五",
    studentAccount: "wangwu",
    studentPhone: "13800138003",
    studentIdcard: "110101200003033456",
    studentAddr: "北京市西城区",
    studentBirthday: "2000-03-03",
    studentEnrollDate: "2022-09-01",
    studentSex: 0,
    studentStatus: "inactive",
    studentSerial: 20220003,
    studentClass: "计算机科学2班",
    studentGrade: "2022级",
    studentProfilePicture: "",
    createId: 1,
    createName: "系统",
    createTime: "2022-08-16T10:00:00Z",
    updateId: 1,
    updateName: "系统",
    updateTime: "2022-08-16T10:00:00Z"
  },
  {
    studentId: 4,
    studentName: "赵六",
    studentAccount: "zhaoliu",
    studentPhone: "13800138004",
    studentIdcard: "110101200004044567",
    studentAddr: "北京市东城区",
    studentBirthday: "2000-04-04",
    studentEnrollDate: "2022-09-01",
    studentSex: 1,
    studentStatus: "active",
    studentSerial: 20220004,
    studentClass: "计算机科学2班",
    studentGrade: "2022级",
    studentProfilePicture: "",
    createId: 1,
    createName: "系统",
    createTime: "2022-08-16T11:00:00Z",
    updateId: 1,
    updateName: "系统",
    updateTime: "2022-08-16T11:00:00Z"
  },
  {
    studentId: 5,
    studentName: "钱七",
    studentAccount: "qianqi",
    studentPhone: "13800138005",
    studentIdcard: "110101200005055678",
    studentAddr: "北京市丰台区",
    studentBirthday: "2000-05-05",
    studentEnrollDate: "2022-09-01",
    studentSex: 1,
    studentStatus: "active",
    studentSerial: 20220005,
    studentClass: "计算机科学3班",
    studentGrade: "2022级",
    studentProfilePicture: "",
    createId: 1,
    createName: "系统",
    createTime: "2022-08-17T10:00:00Z",
    updateId: 1,
    updateName: "系统",
    updateTime: "2022-08-17T10:00:00Z"
  }
];

export interface StudentListParams {
  studentName?: string
  studentPhone?: string
  studentIdcard?: string
  studentStatus?: string
  page?: number
  size?: number
}

export interface Student {
  studentId: number
  studentName: string
  studentAccount: string
  studentPhone: string
  studentIdcard: string
  studentAddr: string
  studentBirthday: string
  studentEnrollDate: string
  studentSex: number
  studentStatus: string
  studentSerial: number
  studentClass: string
  studentGrade: string
  studentProfilePicture: string
  createId: number
  createName: string
  createTime: string
  updateId: number
  updateName: string
  updateTime: string
}

export interface StudentListResponse {
  data: Student[]
  page: number
  size: number
  total: number
}

export async function studentList(params: StudentListParams = {}): Promise<StudentListResponse> {
  try {
    // Filter students based on query parameters
    let filteredStudents = [...mockStudents];
    
    if (params.studentName) {
      filteredStudents = filteredStudents.filter(student => 
        student.studentName.includes(params.studentName!)
      );
    }
    
    if (params.studentPhone) {
      filteredStudents = filteredStudents.filter(student => 
        student.studentPhone.includes(params.studentPhone!)
      );
    }
    
    if (params.studentIdcard) {
      filteredStudents = filteredStudents.filter(student => 
        student.studentIdcard.includes(params.studentIdcard!)
      );
    }
    
    if (params.studentStatus) {
      filteredStudents = filteredStudents.filter(student => 
        student.studentStatus === params.studentStatus
      );
    }
    
    // Pagination
    const page = params.page || 1;
    const size = params.size || 10;
    const start = (page - 1) * size;
    const paginatedItems = filteredStudents.slice(start, start + size);
    
    return {
      data: paginatedItems,
      page,
      size,
      total: filteredStudents.length,
    };
  } catch (error) {
    console.error("获取学生列表失败:", error);
    return {
      data: [],
      page: params.page || 1,
      size: params.size || 10,
      total: 0,
    };
  }
}

export async function deleteStudent(id: number): Promise<boolean> {
  try {
    const initialLength = mockStudents.length;
    mockStudents = mockStudents.filter(student => student.studentId !== id);
    
    if (mockStudents.length === initialLength) {
      console.error(`删除失败: 未找到ID为 ${id} 的学生`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("删除学生失败:", error);
    return false;
  }
}

export async function getStudent(id: string): Promise<Student | null> {
  try {
    const student = mockStudents.find(student => student.studentId === Number(id));
    
    if (!student) {
      console.error(`未找到ID为 ${id} 的学生`);
      return null;
    }
    
    return { ...student };
  } catch (error) {
    console.error("获取学生详情失败:", error);
    return null;
  }
}

export async function updateStudent(data: Student): Promise<boolean> {
  try {
    const index = mockStudents.findIndex(student => student.studentId === data.studentId);
    
    if (index === -1) {
      console.error(`更新失败: 未找到ID为 ${data.studentId} 的学生`);
      return false;
    }
    
    const updatedStudent = {
      ...mockStudents[index],
      ...data,
      updateTime: new Date().toISOString(),
      updateId: 1, // In a real app, this would be the current user's ID
      updateName: '当前用户'
    };
    
    mockStudents[index] = updatedStudent;
    return true;
  } catch (error) {
    console.error("更新学生信息失败:", error);
    return false;
  }
}

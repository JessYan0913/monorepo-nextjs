"use server"

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

export async function studentList(params: StudentListParams): Promise<StudentListResponse> {
  try {
    const queryParams = new URLSearchParams()
    
    if (params.studentName) queryParams.append("studentName", params.studentName)
    if (params.studentPhone) queryParams.append("studentPhone", params.studentPhone)
    if (params.studentIdcard) queryParams.append("studentIdcard", params.studentIdcard)
    if (params.studentStatus) queryParams.append("studentStatus", params.studentStatus)
    if (params.page) queryParams.append("page", params.page.toString())
    if (params.size) queryParams.append("size", params.size.toString())
    
    const response = await fetch(`${process.env.BASE_URL}/api/students?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch student list: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching student list:", error)
    // Return mock data for development
    return {
      data: [
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
          createName: "admin",
          createTime: "2022-08-15T10:00:00",
          updateId: 1,
          updateName: "admin",
          updateTime: "2022-08-15T10:00:00"
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
          createName: "admin",
          createTime: "2022-08-15T11:00:00",
          updateId: 1,
          updateName: "admin",
          updateTime: "2022-08-15T11:00:00"
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
          createName: "admin",
          createTime: "2022-08-16T10:00:00",
          updateId: 1,
          updateName: "admin",
          updateTime: "2022-08-16T10:00:00"
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
          createName: "admin",
          createTime: "2022-08-16T11:00:00",
          updateId: 1,
          updateName: "admin",
          updateTime: "2022-08-16T11:00:00"
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
          createName: "admin",
          createTime: "2022-08-17T10:00:00",
          updateId: 1,
          updateName: "admin",
          updateTime: "2022-08-17T10:00:00"
        }
      ],
      page: params.page || 1,
      size: params.size || 10,
      total: 5,
    }
  }
}

export async function deleteStudent(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/students/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to delete student: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Error deleting student:", error)
    return false
  }
}

export async function getStudent(id: string): Promise<Student | null> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/students/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch student details: ${response.status}`)
    }

    const { data } = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching student details:", error)
    return null
  }
}

export async function updateStudent(data: Student): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/students/${data.studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Failed to update student: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Error updating student:", error)
    return false
  }
}

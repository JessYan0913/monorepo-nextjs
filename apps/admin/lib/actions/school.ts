"use server"

export interface Campus {
  id: string
  name: string
  address: string
  region: string
  status: "active" | "inactive"
  studentCount: number
  classroomCount: number
}

export interface Director {
  staffId: string // 负责人ID
  staffName: string // 负责人
}

export interface School { 
  schoolId: string // 校区ID
  schoolIntro: string // 校区介绍
  schoolName: string // 校区名称
  schoolMvs: string[] // 校区MV
  schoolStatus: string // 校区状态
  schoolPictures: string [] // 校区图片
  schoolAddr: string // 校区地址
  director: Director[] // 校区负责人
  createId: string // 创建人ID
  createName: string // 创建人
  createTime: string // 创建时间
  updateId?: string // 修改人ID
  updateName?: string // 修改人
  updateTime?: string // 修改时间
}

export async function schoolList({ addEndTime, addStartTime, schoolDirectorIds, schoolName, page, size }: {
  addEndTime?: string;
  addStartTime?: string;
  schoolDirectorIds?: string[];
  schoolName?: string;
  page: number;
  size: number;
}): Promise<{ data: School[]; page: number; size: number; total: number}> {
  const res = await fetch(`${process.env.BASE_URL}/school/manage/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "req-device": "pc"
    },
    body: JSON.stringify({
      addEndTime: addEndTime,
      addStartTime: addStartTime,
      schoolDirectorIds: schoolDirectorIds,
      schoolName: schoolName,
      page: page,
      size: size,
    }),
  })
  const { data } = await res.json()
  return data
}

export async function schoolDetail(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/school/manage/get?school=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "req-device": "pc"
    },
  })
  const { data } = await res.json()
  return data
}

export async function deleteCampus(formData: FormData) {
  const id = formData.get('id') as string
  console.log("删除校区:", id)
}

export async function saveCampus(data: Campus) {
  if (data.id === "add") {
    console.log("添加校区:", data)
  } else {
    console.log("更新校区:", data)
  }
}

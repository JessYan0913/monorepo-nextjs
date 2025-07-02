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

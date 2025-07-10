"use server"

export interface StaffListParams {
  staffName?: string
  staffPhone?: string
  staffIdcard?: string
  staffStatus?: string
  page?: number
  size?: number
}

export interface Staff {
  staffId: number
  staffName: string
  staffNick: string
  staffAccount: string
  staffPhone: string
  staffIdcard: string
  staffAddr: string
  staffBirthday: string
  staffHiredate: string
  staffSex: number
  staffStatus: string
  staffSerial: number
  staffIntro: string
  staffProfilePicture: string
  staffIntroPicture: string
  createId: number
  createName: string
  createTime: string
  updateId: number
  updateName: string
  updateTime: string
}

export interface StaffListResponse {
  data: Staff[]
  page: number
  size: number
  total: number
}

export async function staffList(params: StaffListParams): Promise<StaffListResponse> {
  try {
    const queryParams = new URLSearchParams()
    
    if (params.staffName) queryParams.append("staffName", params.staffName)
    if (params.staffPhone) queryParams.append("staffPhone", params.staffPhone)
    if (params.staffIdcard) queryParams.append("staffIdcard", params.staffIdcard)
    if (params.staffStatus) queryParams.append("staffStatus", params.staffStatus)
    if (params.page) queryParams.append("page", params.page.toString())
    if (params.size) queryParams.append("size", params.size.toString())
    
    const response = await fetch(`${process.env.BASE_URL}/api/staffs?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch staff list: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching staff list:", error)
    return {
      data: [],
      page: params.page || 1,
      size: params.size || 10,
      total: 0,
    }
  }
}

export async function deleteStaff(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/staffs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to delete staff: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Error deleting staff:", error)
    return false
  }
}

export async function getStaff(id: string): Promise<Staff | undefined> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/staffs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch staff details: ${response.status}`)
    }

    const { data } = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching staff details:", error)
    return undefined
  }
}

export async function updateStaff(data: Staff): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/staffs/${data.staffId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Failed to update staff: ${response.status}`)
    }

    return true
  } catch (error) {
    console.error("Error updating staff:", error)
    return false
  }
}

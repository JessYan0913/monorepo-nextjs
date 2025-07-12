import { type School } from "./school"

export interface Cashier {
  id: number
  name: string
  phone: string
  email: string
  avatar?: string
  school: Pick<School, "schoolId" | "schoolName">
  status: "active" | "inactive"
  createTime: string
  updateTime: string
}
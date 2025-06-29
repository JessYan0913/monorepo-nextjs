import { redirect } from "next/navigation"

export default function ProfilePage() {
  // 将用户重定向到个人信息页面
  redirect("/profile/info")
}
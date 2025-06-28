import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    user: {
      name: "张三",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "张",
    },
    action: "创建了新用户",
    target: "李四",
    time: "刚刚",
  },
  {
    id: 2,
    user: {
      name: "王五",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "王",
    },
    action: "更新了权限",
    target: "编辑角色",
    time: "10分钟前",
  },
  {
    id: 3,
    user: {
      name: "赵六",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "赵",
    },
    action: "删除了用户",
    target: "测试账号",
    time: "1小时前",
  },
  {
    id: 4,
    user: {
      name: "管理员",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "管",
    },
    action: "创建了角色",
    target: "财务主管",
    time: "2小时前",
  },
  {
    id: 5,
    user: {
      name: "系统",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "系",
    },
    action: "系统备份",
    target: "自动备份",
    time: "3小时前",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div className="flex items-center" key={activity.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action} <span className="font-medium">{activity.target}</span>
            </p>
          </div>
          <div className="ml-auto font-medium text-xs text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}

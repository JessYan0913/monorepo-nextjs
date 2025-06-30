"use client"

import * as React from "react"
import {
  BookOpen,
  PieChart,
  Settings2,
  Users,
  School,
} from "lucide-react"

import { NavMain } from "@/components/layout/nav-main"
import { NavUser } from "@/components/layout/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@repo/ui/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "yanheng",
    email: "yanheng@163.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "顺义校区",
      plan: "北京市-顺义区",
    },
    {
      name: "昌平校区",
      plan: "北京市-昌平区",
    },
    {
      name: "海淀校区",
      plan: "北京市-海淀区",
    },
  ],
  navMain: [
    {
      title: '数据统计',
      url: '#',
      icon: PieChart,
      isActive: true,
      items: [
        {
          title: '营收统计',
          url: '#'
        },
        {
          title: '课程统计',
          url: '#'
        },
      ]
    },
    {
      title: "校区管理",
      url: "#",
      icon: School,
      items: [
        {
          title: "校区管理",
          url: "#",
        },
        {
          title: "教室管理",
          url: "#",
        },
      ],
    },
    {
      title: "人员管理",
      url: "#",
      icon: Users,
      items: [
        {
          title: "员工管理",
          url: "#",
        },
        {
          title: "学生管理",
          url: "#",
        },
      ],
    },
    {
      title: "教学管理",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "教案管理",
          url: "#",
        },
        {
          title: "上课历史",
          url: "#",
        },
      ],
    },
    {
      title: "系统设置",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "教师端设置",
          url: "#",
        },
        {
          title: "学生端设置",
          url: "#",
        },
        {
          title: "权限管理",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

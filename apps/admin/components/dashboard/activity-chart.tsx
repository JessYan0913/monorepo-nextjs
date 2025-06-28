"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "周一",
    value: 420,
  },
  {
    name: "周二",
    value: 380,
  },
  {
    name: "周三",
    value: 450,
  },
  {
    name: "周四",
    value: 520,
  },
  {
    name: "周五",
    value: 580,
  },
  {
    name: "周六",
    value: 310,
  },
  {
    name: "周日",
    value: 220,
  },
]

export function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip formatter={(value) => [`${value}`, "活跃用户"]} labelFormatter={(label) => `${label}`} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

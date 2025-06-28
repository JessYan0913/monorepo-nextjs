"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "北京", value: 25 },
  { name: "上海", value: 18 },
  { name: "广州", value: 15 },
  { name: "深圳", value: 12 },
  { name: "杭州", value: 8 },
  { name: "成都", value: 7 },
  { name: "武汉", value: 5 },
  { name: "南京", value: 4 },
  { name: "其他", value: 6 },
]

export function GeographyMap() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={80} />
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend />
        <Bar dataKey="value" name="访问占比" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "1月",
    total: 1200,
  },
  {
    name: "2月",
    total: 1800,
  },
  {
    name: "3月",
    total: 2200,
  },
  {
    name: "4月",
    total: 2800,
  },
  {
    name: "5月",
    total: 3300,
  },
  {
    name: "6月",
    total: 3800,
  },
  {
    name: "7月",
    total: 4200,
  },
  {
    name: "8月",
    total: 4500,
  },
  {
    name: "9月",
    total: 4700,
  },
  {
    name: "10月",
    total: 4900,
  },
  {
    name: "11月",
    total: 5100,
  },
  {
    name: "12月",
    total: 5400,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip formatter={(value) => [`${value}`, "总数"]} labelFormatter={(label) => `${label}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

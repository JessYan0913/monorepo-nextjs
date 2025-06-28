"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { date: "2023-01", visitors: 4000, uniqueVisitors: 2400 },
  { date: "2023-02", visitors: 3000, uniqueVisitors: 1398 },
  { date: "2023-03", visitors: 2000, uniqueVisitors: 9800 },
  { date: "2023-04", visitors: 2780, uniqueVisitors: 3908 },
  { date: "2023-05", visitors: 1890, uniqueVisitors: 4800 },
  { date: "2023-06", visitors: 2390, uniqueVisitors: 3800 },
  { date: "2023-07", visitors: 3490, uniqueVisitors: 4300 },
  { date: "2023-08", visitors: 4000, uniqueVisitors: 2400 },
  { date: "2023-09", visitors: 3000, uniqueVisitors: 1398 },
  { date: "2023-10", visitors: 2000, uniqueVisitors: 9800 },
  { date: "2023-11", visitors: 2780, uniqueVisitors: 3908 },
  { date: "2023-12", visitors: 1890, uniqueVisitors: 4800 },
]

export function VisitorChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="visitors" stroke="#8884d8" name="总访问量" />
        <Line type="monotone" dataKey="uniqueVisitors" stroke="#82ca9d" name="独立访客" />
      </LineChart>
    </ResponsiveContainer>
  )
}

"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

type MonthlyData = {
  name: string
  total: number
}

const generateMonthlyData = (): MonthlyData[] => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return months.map(name => ({
    name,
    total: Math.floor(Math.random() * 5000) + 1000
   
  }))
}

export function MonthlyRevenue() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={generateMonthlyData()}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
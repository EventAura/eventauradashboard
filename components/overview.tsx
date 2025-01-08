"use client"

import { MonthlyRevenue } from "@/components/charts/monthly-revenue"

export function Overview() {
  return <MonthlyRevenue />
}

// "use client"

// import { Bar, BarChart, XAxis, YAxis } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ChartContainer } from "@/components/ui/chart"

// const data = [
//   { month: "Jan", value: 1800 },
//   { month: "Feb", value: 3800 },
//   { month: "Mar", value: 4200 },
//   { month: "Apr", value: 5000 },
//   { month: "May", value: 2000 },
//   { month: "Jun", value: 3500 },
//   { month: "Jul", value: 5500 },
//   { month: "Aug", value: 1500 },
//   { month: "Sep", value: 3000 },
//   { month: "Oct", value: 5200 },
//   { month: "Nov", value: 4000 },
//   { month: "Dec", value: 3200 },
// ]

// export default function Overview() {
//   return (
//     <Card className="w-full max-w-3xl">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">Overview</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer
//           config={{
//             value: {
//               color: "hsl(0, 0%, 0%)",
//             },
//           }}
//           className="h-[400px]"
//         >
//           <BarChart
//             data={data}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 40,
//               bottom: 5,
//             }}
//           >
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tick={{ fill: '#666666' }}
//             />
//             <YAxis
//               tickFormatter={(value) => `$${value}`}
//               tickLine={false}
//               axisLine={false}
//               tick={{ fill: '#666666' }}
//               domain={[0, 6000]}
//               ticks={[0, 1500, 3000, 4500, 6000]}
//             />
//             <Bar
//               dataKey="value"
//               fill="black"
//               radius={[0, 0, 0, 0]}
//             />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   )
// }


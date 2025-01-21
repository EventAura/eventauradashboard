"use client"

import  {MonthlyRevenue}  from "@/components/charts/monthly-revenue"

export function Overview({participants}) {
  return <MonthlyRevenue participants={participants}/>
}

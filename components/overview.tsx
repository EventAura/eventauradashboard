"use client"

import  {MonthlyRevenue}  from "@/components/charts/monthly-revenue"

interface OverviewProps {
  participants: any;
}

export function Overview({participants}: OverviewProps) {
  return <MonthlyRevenue participants={participants}/>
}

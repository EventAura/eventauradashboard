// "use client"

// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// type MonthlyData = {
//   name: string
//   total: number
// }

// const generateMonthlyData = (): MonthlyData[] => {
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//   return months.map(name => ({  
//     name,
//     total: Math.floor(Math.random() * 5000) + 1000
   
//   }))
// }

// export function MonthlyRevenue() {
//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <BarChart data={generateMonthlyData()}>
//         <XAxis
//           dataKey="name"
//           stroke="#888888"
//           fontSize={12}
//           tickLine={false}
//           axisLine={false}
//         />
//         <YAxis
//           stroke="#888888"
//           fontSize={12}
//           tickLine={false}
//           axisLine={false}
//           tickFormatter={(value) => `$${value}`}
//         />
//         <Bar
//           dataKey="total"
//           fill="currentColor"
//           radius={[4, 4, 0, 0]}
//           className="fill-primary"
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   )
// }







// "use client";

// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

// type ParticipantData = {
//   date: string;
//   total: number;
// };

// const getParticipantsByDate = (participants) => {
//   const paidParticipants = participants.filter(
//     (p) => p.paymentData?.data?.state === "COMPLETED"
//   );

//   const dateCount = paidParticipants.reduce((acc, p) => {
//     const registrationDate = new Date(p.userRegistrationDate).toDateString();
//     acc[registrationDate] = (acc[registrationDate] || 0) + 1;
//     return acc;
//   }, {});

//   const labels = Object.keys(dateCount);
//   const data = Object.values(dateCount);

//   return { labels, data };
// };

// const getParticipantsDataForRecharts = (participants: any) => {
//   const { labels, data } = getParticipantsByDate(participants); // Assuming this function is already defined
//   return labels.map((label: string, index: number) => ({
//     date: label,
//     total: data[index],
//   }));
// };

// type Props = {
//   participants: any;
// };

// export function MonthlyRevenue({ participants }: Props) {
//   const data = getParticipantsDataForRecharts(participants);
//   // const data = participants

//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <BarChart data={data}>
//         <XAxis
//           dataKey="date"
//           stroke="#888888"
//           fontSize={12}
//           tickLine={false}
//           axisLine={false}
//           label={{ value: "Dates", position: "insideBottom", offset: -5 }}
//         />
//         <YAxis
//           stroke="#888888"
//           fontSize={12}
//           tickLine={false}
//           axisLine={false}
//           label={{ value: "Participants", angle: -90, position: "insideLeft" }}
//         />
//         <Bar
//           dataKey="total"
//           fill="rgba(75, 192, 192, 0.6)"
//           radius={[4, 4, 0, 0]}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }




"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ParticipantData = {
  date: string;
  total: number;
};

const getParticipantsByDate = (participants: any) => {
  const paidParticipants = participants.filter(
    (p: any) => p.paymentData?.data?.state === "COMPLETED"
  );

  const dateCount = paidParticipants.reduce((acc: any, p: any) => {
    const registrationDate = new Date(p.userRegistrationDate).toDateString();
    acc[registrationDate] = (acc[registrationDate] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(dateCount);
  const data = Object.values(dateCount);

  return { labels, data };
};

const getParticipantsDataForRecharts = (participants: any): ParticipantData[] => {
  const { labels, data } = getParticipantsByDate(participants);
  return labels.map((label: string, index: number) => ({
    date: label,
    total: data[index] as number,
  }));
};

type Props = {
  participants: any;
};

export function MonthlyRevenue({ participants }: Props) {
  const data = getParticipantsDataForRecharts(participants);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{ value: "Dates", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{ value: "Participants", angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
          formatter={(value: number) => [`${value}`, "Participants"]}
        />
        <Bar
          dataKey="total"
          // fill="rgba(75, 192, 192, 0.6)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

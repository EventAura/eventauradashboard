



// 'use client';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Overview } from "@/components/overview";
// import { RecentSales } from "@/components/recent-sales";
// import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import TotalSales from "@/components/TotalSales";

// export default function DashboardPage({ params }) {
//   const [eventData, setEventData] = useState([]);
//   const [clerkId, setClerkId] = useState(null);
//   const [eventId, setEventId] = useState(null);
//   const [participants, setParticipants] = useState(null);
//   console.log(participants)
//   // console.log(eventData)
  

//   useEffect(() => {
    
//     const { slug, id } = params;
//     setClerkId(id);
//     setEventId(slug);
//     // console.log(id);
//   }, [params]);

  

//   useEffect(() => {
//     if (clerkId && eventId) {
//       const fetchEvent = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:8080/event/clerk/${clerkId}/${eventId}`
//           );
//           // console.log(response.data.data);
//           setEventData(response.data.data);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       fetchEvent();



//       const fetchParticipants = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:8080/participant/event/clerk/${eventId}`
//           ); // Adjusted to include both clerkId and eventId
//           // console.log(response.data); // Log the response
//           setParticipants(response.data);
//         } catch (error) {
//           console.log("Error fetching participants:", error);
//         }
//       };
  
//       fetchParticipants();
//     }
//   }, [ eventId]);

  
//   // useEffect(() => {
//   //   if (clerkId && eventId) {
//   //     const fetchEvent = async () => {
//   //       try {
//   //         const response = await axios.get(
//   //           `http://localhost:8080/participant/event/clerk/${params.slug}`
//   //         );
//   //         console.log(response.data.data);
//   //         setParticipants(response.data.data);
//   //       } catch (error) {
//   //         console.log(error);
//   //       }
//   //     };
//   //     fetchEvent();
//   //   }
//   // }, [clerkId, eventId]);

  
  

//   return (
//     <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//       <div className="flex items-center justify-between space-y-2">
//         <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {/* <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$45,231.89</div>
//             <p className="text-xs text-muted-foreground">
//               +20.1% from last month
//             </p>
//           </CardContent>
//         </Card> */}
//         <TotalSales participants = {participants} />
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+2350</div>
//             <p className="text-xs text-muted-foreground">
//               +180.1% from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Sales</CardTitle>
//             <CreditCard className="h-4 w-4 text-muted-foreground text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+12,234</div>
//             <p className="text-xs text-muted-foreground">
//               +19% from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Now</CardTitle>
//             <Activity className="h-4 w-4 text-muted-foreground text-gray-500" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+573</div>
//             <p className="text-xs text-muted-foreground">
//               +201 since last hour
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>Overview</CardTitle>
//           </CardHeader>
//           <CardContent className="pl-2">
//             <Overview />
//           </CardContent>
//         </Card>
//         <Card className="col-span-3">
//           <CardHeader>
//             <CardTitle>Recent Sales</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <RecentSales />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/overview";
// import  {RecentParticipants}  from "@/components/recent-sales";
// import {RecentSales} from "@/components/recent-sales";
import { ParticipantsTable } from "@/components/recent-sales";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

import TotalSales from "@/components/TotalSales";
import TotalParticipants from "@/components/TotalParticipants";
import RegisteredToday from "@/components/RegisteredToday";

export default function DashboardPage({ params }) {
  const [eventData, setEventData] = useState([]);
  const [clerkId, setClerkId] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [participants, setParticipants] = useState([]); // Start with an empty array
  
  // Extract and set clerkId and eventId from params
  useEffect(() => {
    const { slug, id } = params;
    setClerkId(id);
    setEventId(slug);
  }, [params]);

  // Fetch event and participants data
  useEffect(() => {
    if (clerkId && eventId) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/event/clerk/${clerkId}/${eventId}`
          );
          setEventData(response.data.data);
        } catch (error) {
          console.log("Error fetching event data:", error);
        }
      };

      const fetchParticipants = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/participant/event/clerk/${eventId}`
          );
          setParticipants(response.data ); // Ensure data is an array
        } catch (error) {
          console.log("Error fetching participants:", error);
        }
      };

      fetchEvent();
      fetchParticipants();
    }
  }, [clerkId, eventId]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Card>
        
        <CardContent className="flex flex-row items-center justify-between space-y-0 p-5">
          <div>
            <h2 className="text-2xl font-bold">{eventData.eventName}</h2>
            <p className="text-xs text-muted-foreground">
              {new Date(eventData.eventDate).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground text-gray-500" />
          </CardHeader>
          <CardContent>
        <TotalSales participants={participants} eventData = {eventData}/>
        </CardContent>
      </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground text-gray-500" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p> */}
            <TotalParticipants participants={participants} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground text-gray-500" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
            <RegisteredToday eventData={eventData} participants={participants} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col">
        <Card className="my-5">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview participants={participants} />
          </CardContent>
        </Card>
        <Card className="my-5">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <RecentSales /> */}
            {/* <RecentParticipants eventParticipants={participants} /> */}
            <ParticipantsTable participants={participants} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

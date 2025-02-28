






// "use client"

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import axios from "axios";
// import { useAuth } from "@clerk/nextjs";
// import { motion } from "framer-motion";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar, MapPin, User } from 'lucide-react';
// import { ThemeProvider } from "@/components/theme-provider";
// import { SiteHeader } from "@/components/site-header";
// import { HovermeButton } from "@/components/eldoraui/hovermebutton";
// import { Skeleton } from "@/components/ui/skeleton";
// import { format } from 'date-fns';

// export default function Event() {
//   const { userId } = useAuth();
//   const [eventData, setEventData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       if (!userId) return;
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`http://localhost:8080/event/clerk/${userId}`);
//         setEventData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchEvents();
//   }, [userId]);

//   const container = {
//     hidden: { opacity: 1, scale: 0 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const item = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1
//     }
//   };

//   return (
//     <ThemeProvider attribute="class">
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
//         <SiteHeader />
//         <div className="container mx-auto p-6">
//           <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Events</h1>
//           <div className="mb-8">
//             <Link href={`/${userId}/hostevent`}>
//               <HovermeButton />
//             </Link>
//           </div>
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             variants={container}
//             initial="hidden"
//             animate="visible"
//           >
//             {isLoading ? (
//               Array(6).fill(0).map((_, index) => (
//                 <Card key={index} className="shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
//                   <CardHeader className="p-6">
//                     <Skeleton className="h-6 w-2/3 mb-2" />
//                     <Skeleton className="h-4 w-1/2" />
//                   </CardHeader>
//                   <CardContent className="p-6">
//                     <Skeleton className="h-4 w-full mb-2" />
//                     <Skeleton className="h-4 w-3/4" />
//                   </CardContent>
//                   <CardFooter className="p-6">
//                     <Skeleton className="h-10 w-full" />
//                   </CardFooter>
//                 </Card>
//               ))
//             ) : eventData.length > 0 ? (
//               eventData.map((event) => (
//                 <motion.div key={event._id} variants={item}>
//                   <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
//                     <CardHeader className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
//                       <CardTitle className="text-xl font-semibold text-white">{event.eventName}</CardTitle>
//                       <CardDescription className="text-sm text-blue-100 flex items-center mt-2">
//                         <Calendar className="mr-2 h-4 w-4" />
//                         {format(new Date(event.eventDate), 'yyyy-MM-dd')}
//                       </CardDescription>
//                     </CardHeader>
//                     <CardContent className="p-6">
//                       <p className="text-gray-700 dark:text-gray-300 flex items-center mb-2">
//                         <User className="mr-2 h-4 w-4" />
//                         Hosted by: {event.eventHostedBy}
//                       </p>
//                       <p className="text-gray-600 dark:text-gray-400 flex items-center">
//                         <MapPin className="mr-2 h-4 w-4" />
//                         {event.eventVenue || "Location TBA"}
//                       </p>
//                     </CardContent>
//                     <CardFooter className="p-6 bg-gray-50 dark:bg-gray-800">
//                       <Link href={`/${event.clerkId}/event/${event._id}/dashboard`} className="w-full">
//                         <Button variant="outline" className="w-full">
//                           Go to Dashboard
//                         </Button>
//                       </Link>
//                     </CardFooter>
//                   </Card>
//                 </motion.div>
//               ))
//             ) : (
//               <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">No events found.</p>
//             )}
//           </motion.div>
//         </div>
//       </div>
//     </ThemeProvider>
//   );
// }


"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User } from 'lucide-react';
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { HovermeButton } from "@/components/eldoraui/hovermebutton";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';

export default function Event() {
  const { userId } = useAuth();
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!userId) return;
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8080/event/clerk/${userId}`);
        setEventData(response.data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [userId]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <SiteHeader />
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Events</h1>
          <div className="mb-8">
            <Link href={`/${userId}/hostevent`}>
              <HovermeButton />
            </Link>
          </div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {isLoading ? (
              Array(6).fill(0).map((_, index) => (
                <Card key={index} className="shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <CardHeader className="p-6">
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                  <CardFooter className="p-6">
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))
            ) : eventData.length > 0 ? (
              eventData.map((event) => (
                <motion.div key={event._id} variants={item}>
                  <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="p-6 bg-gradient-to-r from-blue-500 to-purple-600">
                      <CardTitle className="text-xl font-semibold text-white">{event.eventName}</CardTitle>
                      <CardDescription className="text-sm text-blue-100 flex items-center mt-2">
                        <Calendar className="mr-2 h-4 w-4" />
                        {format(new Date(event.eventDate), 'yyyy-MM-dd')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-gray-700 dark:text-gray-300 flex items-center mb-2">
                        <User className="mr-2 h-4 w-4" />
                        Hosted by: {event.eventHostedBy}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 flex items-center">
                        <MapPin className="mr-2 h-4 w-4" />
                        {event.eventVenue || "Location TBA"}
                      </p>
                    </CardContent>
                    <CardFooter className="p-6 bg-gray-50 dark:bg-gray-800">
                      <Link href={`/${event.clerkId}/event/${event._id}/dashboard`} className="w-full">
                        <Button variant="outline" className="w-full">
                          Go to Dashboard
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">No events found.</p>
            )}
          </motion.div>
        </div>
      </div>
    </ThemeProvider>
  );
}
"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { useEffect,useState } from "react"
import axios from "axios"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
const events = [
  { name: "Event 1", date: "2023-10-01", host: "Host 1" },
  { name: "Event 2", date: "2023-10-15", host: "Host 2" },
  { name: "Event 3", date: "2023-11-01", host: "Host 3" },
]

export default function Event() {
    const {userId} = useAuth();
    console.log(userId);
    const [eventData, setEventData] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await axios.get(
              "https://eventaura-server-api.onrender.com/event"
            );
    
            setEventData(response.data.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchEvents();
      }, []);
  return (
    <ThemeProvider attribute="class">
        <div>
            <div>
                <SiteHeader/>
            </div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Events</h1>
        <div className="mb-8">
            <Link href="/hostevent">

          <button className="bg-black text-white px-4 py-2 rounded">Host Event</button>
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{event.name}</CardTitle>
                <CardDescription>{event.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hosted by: {event.host}</p>
              </CardContent>
              <CardFooter>
                <Badge variant="outline">Join Event</Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
        
      </div>
      </div>
    </ThemeProvider>
  )
}

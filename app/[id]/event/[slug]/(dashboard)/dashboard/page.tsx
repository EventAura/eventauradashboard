


'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/overview";
import { ParticipantsTable } from "@/components/recent-sales";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";

import TotalSales from "@/components/TotalSales";
import TotalParticipants from "@/components/TotalParticipants";
import RegisteredToday from "@/components/RegisteredToday";
import { intersects } from "react-resizable-panels";

export default function DashboardPage() {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [clerkId, setClerkId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [participants, setParticipants] = useState([]);

  const params = useParams();


  interface EventData {
    eventName: string;
    eventDate: string;
    eventCreatedDate: string;
    eventLastDate: string;
  }

  // Extract and set clerkId and eventId from unwrapped params
  useEffect(() => {
    const { slug, id } = params;
    setClerkId(typeof id === 'string' ? id : null);
    setEventId(typeof slug === 'string' ? slug : null);
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
          setParticipants(response.data); // Ensure data is an array
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
            <h2 className="text-2xl font-bold">{eventData?.eventName}</h2>
            <p className="text-xs text-muted-foreground">
              {eventData && new Date(eventData.eventDate).toLocaleDateString()}
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
            <TotalSales participants={participants} eventData={eventData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground text-gray-500" />
          </CardHeader>
          <CardContent>
            <TotalParticipants participants={participants} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground text-gray-500" />
          </CardHeader>
          <CardContent>
            {eventData && <RegisteredToday eventData={eventData} participants={participants} />}
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
            <ParticipantsTable participants={participants} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


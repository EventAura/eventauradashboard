'use client'

import React, { useState, useEffect, Component } from "react"
import { useRouter, useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"




// const DatePicker = dynamic(() => import('react-datepicker'), {
//   ssr: false,
// }) 

const DatePicker = dynamic(() => import('@/components/WrappedDatePicker'), {
  ssr: false,
});



const EventEdit = () => {
  const params = useParams()
  
  const { id, slug } = params
  const eventId = slug
  const userId = id

  const [eventName, setEventName] = useState("")
  const [eventHostedBy, setEventHostedBy] = useState("")
  const [eventSpeaker, setEventSpeaker] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventVenue, setEventVenue] = useState("")
  const [price, setPrice] = useState("")
  const [eventVenueUrl, setEventVenueUrl] = useState("")
  const [eventManagerMail, setEventManagerMail] = useState("")
  const [eventManagerPhone, setEventManagerPhone] = useState("")
  const [eventManagerUPI, setEventManagerUPI] = useState("")
  const [eventDate, setEventDate] = useState<Date | null>(null)
  const [eventLastDate, setEventLastDate] = useState<Date | null>(null)
  const [messageDate, setMessageDate] = useState("")
  const [messageLastDate, setMessageLastDate] = useState("")
  const [spinner, setSpinner] = useState(false)
  const [eventMailDescription, setEventMailDescription] = useState("")
  const [freeEventCheckbox, setFreeEventCheckbox] = useState(false)
  const [isVirtual, setIsVirtual] = useState(false)
  const [eventRegistrationLimit, setEventRegistrationLimit] = useState("")
  const [validationError, setValidationError] = useState("")
  const [isUpdated, setIsUpdated] = useState(false) // New state for success message

  useEffect(() => {
    if (eventId) {
      // Fetch event data
      const fetchEventData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/event/${eventId}`);
          console.log("Event data:", response.data);
          const eventData = response.data.data; // Access the `data` property of the response

          // Pre-populate form fields with existing event data
          setEventName(eventData.eventName || "");
          setEventDescription(eventData.eventDescription || "");
          setEventVenue(eventData.eventVenue || "");
          setEventVenueUrl(eventData.eventVenueUrl || "");
          setEventManagerMail(eventData.eventManagerMail || "");
          setEventManagerPhone(eventData.eventManagerPhone || "");
          setEventManagerUPI(eventData.eventPaymentUpi || "");
          setEventHostedBy(eventData.eventHostedBy || "");
          setEventSpeaker(eventData.eventSpeaker || "");
          setPrice(eventData.eventPrice || "");
          setEventMailDescription(eventData.eventMailDescription || "");
          setEventRegistrationLimit(eventData.eventRegistrationLimit || "");

          // Parse and set eventDate and eventLastDate
          if (eventData.eventDate) {
            setEventDate(new Date(eventData.eventDate)); // Convert to Date object
          }
          if (eventData.eventLastDate) {
            setEventLastDate(new Date(eventData.eventLastDate)); // Convert to Date object
          }

          setIsVirtual(eventData.eventVenue === "Online Event");
          setFreeEventCheckbox(eventData.eventPrice === "0");
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };
      fetchEventData();
    }
  }, [eventId]);

  const handleEventDate = (date: Date | null) => {
    if (date && date < new Date()) {
      setMessageDate("Please select a future date")
      setEventDate(null)
      return
    }
    setEventDate(date)
    setMessageDate("")
  }

  const handleEventLastDate = (date: Date | null) => {
    const currentDate = Date.now()

    if (date && date.getTime() < currentDate) {
      setMessageLastDate("Please select a date after the current date")
      setEventLastDate(null)
    } else if (eventDate && date && date > eventDate) {
      setMessageLastDate("Please select a date before or on the event date")
      setEventLastDate(null)
    } else {
      setEventLastDate(date)
      setMessageLastDate("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (eventMailDescription.trim() === "") {
      setValidationError("Event Mail Description is required.")
      return
    }
    setSpinner(true)

    // Prepare the data to be sent in the PATCH request
    const data = {
      eventName,
      eventDescription,
      eventVenue,
      eventVenueUrl,
      eventManagerMail,
      eventManagerPhone,
      eventPaymentUpi: eventManagerUPI,
      eventHostedBy,
      eventSpeaker,
      eventPrice: price,
      eventMailDescription,
      eventRegistrationLimit,
      eventDate: eventDate ? eventDate.toISOString() : null,
      eventLastDate: eventLastDate ? eventLastDate.toISOString() : null,
    }

    try {
      const response = await axios.patch(`http://localhost:8080/event/${eventId}`, data)
      console.log("Form submitted with:", data)
      if (response.data.message) {
        setSpinner(false)
        setIsUpdated(true) // Set isUpdated to true to show success message
        // setTimeout(() => {
        //   router.push(`/${userId}/event/${response.data.data._id}/dashboard`)
        // }, 2000) // Redirect after 2 seconds
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSpinner(false)
    }
  }

  return (
    <div>
      <div className="flex flex-row justify-center">
        <main className="w-full min-h-screen bg-white text-black flex flex-col items-center justify-center p-5">
          <div className="max-w-2xl w-full">
            <div className="text-center pb-8">
              <h3 className="text-3xl font-bold sm:text-4xl">Edit Event</h3>
              <p className="mt-2 text-lg">Update your event details below.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Existing form fields */}
              <div>
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventDescription">Event Description</Label>
                <Textarea
                  id="eventDescription"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventMailDescription">Event Mail Description</Label>
                <Textarea
                  id="eventMailDescription"
                  value={eventMailDescription}
                  onChange={(e) => {
                    setEventMailDescription(e.target.value)
                    setValidationError("")
                  }}
                  required
                  className="min-h-[100px]"
                />
                {validationError && (
                  <div className="text-red-500 text-sm mt-2">{validationError}</div>
                )}
              </div>
              <div>
                <Label htmlFor="eventHostedBy">Event Hosted By</Label>
                <Input
                  id="eventHostedBy"
                  value={eventHostedBy}
                  onChange={(e) => setEventHostedBy(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventSpeaker">Event Speaker</Label>
                <Input
                  id="eventSpeaker"
                  value={eventSpeaker}
                  onChange={(e) => setEventSpeaker(e.target.value)}
                  placeholder="Name of the speaker (if any)"
                />
              </div>
              <div>
                <Label htmlFor="eventVenue">Event Venue</Label>
                <Input
                  id="eventVenue"
                  value={eventVenue}
                  onChange={(e) => setEventVenue(e.target.value)}
                  required
                  disabled={isVirtual}
                />
                <div className="mt-2">
                  <Checkbox
                    id="isVirtual"
                    checked={isVirtual}
                    onCheckedChange={(checked) => {
                      setIsVirtual(checked as boolean)
                      setEventVenue(checked ? "Online Event" : "")
                    }}
                  />
                  <Label htmlFor="isVirtual" className="ml-2">Online Event</Label>
                </div>
              </div>
              <div>
                <Label htmlFor="eventVenueUrl">Event Venue URL</Label>
                <Input
                  id="eventVenueUrl"
                  type="url"
                  value={eventVenueUrl}
                  onChange={(e) => setEventVenueUrl(e.target.value)}
                  placeholder="https://example.com (Google Maps URL)"
                  disabled={isVirtual}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={freeEventCheckbox}
                />
                <div className="mt-2">
                  <Checkbox
                    id="freeEvent"
                    checked={freeEventCheckbox}
                    onCheckedChange={(checked) => {
                      setFreeEventCheckbox(checked as boolean)
                      setPrice(checked ? "0" : "")
                    }}
                  />
                  <Label htmlFor="freeEvent" className="ml-2">Free Event</Label>
                </div>
              </div>
              <div>
                <Label>Event Date</Label>
                <DatePicker
                  selected={eventDate}
                  onChange={handleEventDate}
                  dateFormat="yyyy-MM-dd"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {messageDate && <span className="text-red-500 text-sm">{messageDate}</span>}
              </div>
              <div>
                <Label>Event Last Date for Registrations</Label>
                <DatePicker
                  selected={eventLastDate}
                  onChange={handleEventLastDate}
                  dateFormat="yyyy-MM-dd"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  disabled={!eventDate}
                />
                {messageLastDate && <span className="text-red-500 text-sm">{messageLastDate}</span>}
              </div>
              <div>
                <Label htmlFor="eventRegistrationLimit">Event Registration Limit</Label>
                <Input
                  id="eventRegistrationLimit"
                  type="number"
                  value={eventRegistrationLimit}
                  onChange={(e) => setEventRegistrationLimit(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="eventManagerMail">Email</Label>
                <Input
                  id="eventManagerMail"
                  type="email"
                  value={eventManagerMail}
                  onChange={(e) => setEventManagerMail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="eventManagerPhone">Contact Number</Label>
                <Input
                  id="eventManagerPhone"
                  type="tel"
                  value={eventManagerPhone}
                  onChange={(e) => setEventManagerPhone(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                />
              </div>
              <div>
                <Label htmlFor="eventManagerUPI">UPI ID</Label>
                <Input
                  id="eventManagerUPI"
                  value={eventManagerUPI}
                  onChange={(e) => setEventManagerUPI(e.target.value)}
                  required
                  disabled={freeEventCheckbox}
                />
              </div>
              {isUpdated && ( // Show success message if isUpdated is true
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Event updated successfully!
              </div>
            )}

              <Button type="submit" className="w-full border-2 hover:bg-slate-200" disabled={spinner}>
                {spinner ? (
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : "Update Event"}
              </Button>
            </form>
            
          </div>
        </main>
      </div>
    </div>
  )
}

export default EventEdit
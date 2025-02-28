

// 'use client'

// import React, { useState } from "react"
// import { useRouter } from 'next/navigation'
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import axios from "axios"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Textarea } from "@/components/ui/textarea"
// import { PlusIcon, TrashIcon } from 'lucide-react'
// import { useAuth } from "@clerk/nextjs"
// import { SiteHeader } from "@/components/site-header"
// import { ArrowLeftCircle } from 'lucide-react';

// const EventOnboardingForm = () => {
//   const router = useRouter()
//   const {userId} = useAuth();
//   const [eventName, setEventName] = useState("")
//   const [eventHostedBy, setEventHostedBy] = useState("")
//   const [eventSpeaker, setEventSpeaker] = useState("")
//   const [eventDescription, setEventDescription] = useState("")
//   const [eventVenue, setEventVenue] = useState("")
//   const [price, setPrice] = useState("")
//   const [eventVenueUrl, setEventVenueUrl] = useState("")
//   const [eventManagerMail, setEventManagerMail] = useState("")
//   const [eventManagerPhone, setEventManagerPhone] = useState("")
//   const [eventManagerUPI, setEventManagerUPI] = useState("")
//   const [eventDate, setEventDate] = useState<Date | null>(null)
//   const [eventLastDate, setEventLastDate] = useState<Date | null>(null)
//   const [messageDate, setMessageDate] = useState("")
//   const [messageLastDate, setMessageLastDate] = useState("")
//   const [spinner, setSpinner] = useState(false)
//   const [eventMailDescription, setEventMailDescription] = useState("")
//   const [freeEventCheckbox, setFreeEventCheckbox] = useState(false)
//   const [isVirtual, setIsVirtual] = useState(false)
//   const [eventRegistrationLimit, setEventRegistrationLimit] = useState("")
//   const [validationError, setValidationError] = useState("")
//   const [eventQuestions, setEventQuestions] = useState<string[]>([])

//   const handleAddQuestion = () => {
//     setEventQuestions([...eventQuestions, ""])
//   }

//   const handleRemoveQuestion = (index: number) => {
//     const newQuestions = eventQuestions.filter((_, i) => i !== index)
//     setEventQuestions(newQuestions)
//   }

//   const handleQuestionChange = (index: number, value: string) => {
//     const newQuestions = [...eventQuestions]
//     newQuestions[index] = value
//     setEventQuestions(newQuestions)
//   }

//   const handleEventLastDate = (date: Date | null) => {
//     const currentDate = Date.now()

//     if (date && date.getTime() < currentDate) {
//       setMessageLastDate("Please select a date after the current date")
//       setEventLastDate(null)
//     } else if (eventDate && date && date > eventDate) {
//       setMessageLastDate("Please select a date before or on the event date")
//       setEventLastDate(null)
//     } else {
//       setEventLastDate(date)
//       setMessageLastDate("")
//     }
//   }

//   const handleEventDate = (date: Date | null) => {
//     if (date && date < new Date()) {
//       setMessageDate("Please select a future date")
//       setEventDate(null)
//       return
//     }
//     setEventDate(date)
//     setMessageDate("")
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (eventMailDescription.trim() === "") {
//       setValidationError("Event Mail Description is required.")
//       return
//     }
//     setSpinner(true)

//     const data = {
//       eventName,
//       eventDescription,
//       eventVenue,
//       eventVenueUrl,
//       eventManagerMail,
//       eventManagerPhone,
//       eventDate,
//       eventLastDate,
//       eventPaymentUpi: eventManagerUPI,
//       eventHostedBy,
//       eventSpeaker,
//       eventPrice: price,
//       eventMailDescription,
//       eventRegistrationLimit,
//       eventQuestions,
//       clerkId: userId,
//     }

//     try {
//       const response = await axios.post(
//         // "https://eventaura-server-api.onrender.com/event",
//         "http://localhost:8080/event",
//         data
//       )
//       console.log("Form submitted with:", data)
//       if (response.data.message) {
//         setSpinner(false)
//         router.push(`/${userId}/event/${response.data.data._id}/dashboard`)
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error)
//       setSpinner(false)
//     }
//   }

//   return (
//     <div>
//       <div>
//         <SiteHeader/>
//       </div>
//       <div className="flex flex-row justify-center">
//         <div>
//           <Button onClick={() => router.back()} variant="ghost">
//           <ArrowLeftCircle size={20} />
//             Go Back
//           </Button>

//         </div>
//     <main className="w-full min-h-screen bg-white text-black flex flex-col items-center justify-center p-5">
      
//       <div className="max-w-2xl w-full">
//         <div className="text-center pb-8">
//           <h3 className="text-3xl font-bold sm:text-4xl">Host Your Event Here!</h3>
//           <p className="mt-2 text-lg">Make the event marvelous with us. Fill the form below.</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <Label htmlFor="eventName">Event Name</Label>
//             <Input
//               id="eventName"
//               value={eventName}
//               onChange={(e) => setEventName(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="eventDescription">Event Description</Label>
//             <Textarea
//               id="eventDescription"
//               value={eventDescription}
//               onChange={(e) => setEventDescription(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="eventMailDescription">Event Mail Description</Label>
//             <Textarea
//               id="eventMailDescription"
//               value={eventMailDescription}
//               onChange={(e) => {
//                 setEventMailDescription(e.target.value)
//                 setValidationError("")
//               }}
//               required
//               className="min-h-[100px]"
//             />
//             {validationError && (
//               <div className="text-red-500 text-sm mt-2">{validationError}</div>
//             )}
//           </div>
//           <div>
//             <Label htmlFor="eventHostedBy">Event Hosted By</Label>
//             <Input
//               id="eventHostedBy"
//               value={eventHostedBy}
//               onChange={(e) => setEventHostedBy(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="eventSpeaker">Event Speaker</Label>
//             <Input
//               id="eventSpeaker"
//               value={eventSpeaker}
//               onChange={(e) => setEventSpeaker(e.target.value)}
//               placeholder="Name of the speaker (if any)"
//             />
//           </div>
//           <div>
//             <Label htmlFor="eventVenue">Event Venue</Label>
//             <Input
//               id="eventVenue"
//               value={eventVenue}
//               onChange={(e) => setEventVenue(e.target.value)}
//               required
//               disabled={isVirtual}
//             />
//             <div className="mt-2">
//               <Checkbox
//                 id="isVirtual"
//                 checked={isVirtual}
//                 onCheckedChange={(checked) => {
//                   setIsVirtual(checked as boolean)
//                   setEventVenue(checked ? "Online Event" : "")
//                 }}
//               />
//               <Label htmlFor="isVirtual" className="ml-2">Online Event</Label>
//             </div>
//           </div>
//           <div>
//             <Label htmlFor="eventVenueUrl">Event Venue URL</Label>
//             <Input
//               id="eventVenueUrl"
//               type="url"
//               value={eventVenueUrl}
//               onChange={(e) => setEventVenueUrl(e.target.value)}
//               placeholder="https://example.com (Google Maps URL)"
//               disabled={isVirtual}
//             />
//           </div>
//           <div>
//             <Label htmlFor="price">Price</Label>
//             <Input
//               id="price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               disabled={freeEventCheckbox}
//             />
//             <div className="mt-2">
//               <Checkbox
//                 id="freeEvent"
//                 checked={freeEventCheckbox}
//                 onCheckedChange={(checked) => {
//                   setFreeEventCheckbox(checked as boolean)
//                   setPrice(checked ? "0" : "")
//                 }}
//               />
//               <Label htmlFor="freeEvent" className="ml-2">Free Event</Label>
//             </div>
//           </div>
//           <div>
//             <Label>Event Date</Label>
//             <DatePicker
//               selected={eventDate}
//               onChange={handleEventDate}
//               dateFormat="yyyy-MM-dd"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//             {messageDate && <span className="text-red-500 text-sm">{messageDate}</span>}
//           </div>
//           <div>
//             <Label>Event Last Date for Registrations</Label>
//             <DatePicker
//               selected={eventLastDate}
//               onChange={handleEventLastDate}
//               dateFormat="yyyy-MM-dd"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//               disabled={!eventDate}
//             />
//             {messageLastDate && <span className="text-red-500 text-sm">{messageLastDate}</span>}
//           </div>
//           <div>
//             <Label htmlFor="eventRegistrationLimit">Event Registration Limit</Label>
//             <Input
//               id="eventRegistrationLimit"
//               type="number"
//               value={eventRegistrationLimit}
//               onChange={(e) => setEventRegistrationLimit(e.target.value)}
//             />
//           </div>
//           <div>
//             <Label htmlFor="eventManagerMail">Email</Label>
//             <Input
//               id="eventManagerMail"
//               type="email"
//               value={eventManagerMail}
//               onChange={(e) => setEventManagerMail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="eventManagerPhone">Contact Number</Label>
//             <Input
//               id="eventManagerPhone"
//               type="tel"
//               value={eventManagerPhone}
//               onChange={(e) => setEventManagerPhone(e.target.value)}
//               required
//               pattern="[0-9]{10}"
//               title="Please enter a valid 10-digit phone number"
//             />
//           </div>
//           <div>
//             <Label htmlFor="eventManagerUPI">UPI ID</Label>
//             <Input
//               id="eventManagerUPI"
//               value={eventManagerUPI}
//               onChange={(e) => setEventManagerUPI(e.target.value)}
//               required
//               disabled={freeEventCheckbox}
//             />
//           </div>
//           <div className="space-y-4">
//             <Label>Event Questions</Label>
//             {eventQuestions.map((question, index) => (
//               <div key={index} className="flex items-center space-x-2">
//                 <Input
//                   value={question}
//                   onChange={(e) => handleQuestionChange(index, e.target.value)}
//                   placeholder={`Question ${index + 1}`}
//                 />
//                 <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveQuestion(index)}>
//                   <TrashIcon className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//             <Button type="button" variant="outline" onClick={handleAddQuestion}>
//               <PlusIcon className="h-4 w-4 mr-2" />
//               Add Question
//             </Button>
//           </div>
//           <Button type="submit" className="w-full" disabled={spinner}>
//             {spinner ? (
//               <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//               </svg>
//             ) : "Submit"}
//           </Button>
//         </form>
//       </div>
//     </main>
//     </div>
//     </div>
//   )
// }

// export default EventOnboardingForm






// 'use client'

// import React, { useState } from "react"
// import { useRouter } from 'next/navigation'
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import axios from "axios"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Textarea } from "@/components/ui/textarea"
// import { PlusIcon, TrashIcon } from 'lucide-react'
// import { useAuth } from "@clerk/nextjs"
// import { SiteHeader } from "@/components/site-header"
// import { ArrowLeftCircle } from 'lucide-react'

// // Define the structure for a form field
// type FormField = {
//   type: 'text' | 'checkbox' | 'select' | 'textarea'
//   label: string
//   options?: string[] // For select dropdown
//   required?: boolean
// }

// const EventOnboardingForm = () => {
//   const router = useRouter()
//   const { userId } = useAuth()
//   const [eventName, setEventName] = useState("")
//   const [eventHostedBy, setEventHostedBy] = useState("")
//   const [eventSpeaker, setEventSpeaker] = useState("")
//   const [eventDescription, setEventDescription] = useState("")
//   const [eventVenue, setEventVenue] = useState("")
//   const [price, setPrice] = useState("")
//   const [eventVenueUrl, setEventVenueUrl] = useState("")
//   const [eventManagerMail, setEventManagerMail] = useState("")
//   const [eventManagerPhone, setEventManagerPhone] = useState("")
//   const [eventManagerUPI, setEventManagerUPI] = useState("")
//   const [eventDate, setEventDate] = useState<Date | null>(null)
//   const [eventLastDate, setEventLastDate] = useState<Date | null>(null)
//   const [messageDate, setMessageDate] = useState("")
//   const [messageLastDate, setMessageLastDate] = useState("")
//   const [spinner, setSpinner] = useState(false)
//   const [eventMailDescription, setEventMailDescription] = useState("")
//   const [freeEventCheckbox, setFreeEventCheckbox] = useState(false)
//   const [isVirtual, setIsVirtual] = useState(false)
//   const [eventRegistrationLimit, setEventRegistrationLimit] = useState("")
//   const [validationError, setValidationError] = useState("")
//   const [eventQuestions, setEventQuestions] = useState<FormField[]>([])

//   const handleAddQuestion = (type: FormField['type']) => {
//     const newQuestion: FormField = {
//       type,
//       label: `New ${type} Question`,
//       required: false,
//     }
//     if (type === 'select') {
//       newQuestion.options = ['Option 1', 'Option 2']
//     }
//     setEventQuestions([...eventQuestions, newQuestion])
//   }

//   const handleRemoveQuestion = (index: number) => {
//     const newQuestions = eventQuestions.filter((_, i) => i !== index)
//     setEventQuestions(newQuestions)
//   }

//   const handleQuestionChange = (index: number, key: keyof FormField, value: any) => {
//     const newQuestions = [...eventQuestions]
//     newQuestions[index] = { ...newQuestions[index], [key]: value }
//     setEventQuestions(newQuestions)
//   }

//   const handleAddOption = (index: number) => {
//     const newQuestions = [...eventQuestions]
//     if (newQuestions[index].options) {
//       newQuestions[index].options?.push(`Option ${newQuestions[index].options.length + 1}`)
//     }
//     setEventQuestions(newQuestions)
//   }

//   const handleRemoveOption = (index: number, optionIndex: number) => {
//     const newQuestions = [...eventQuestions]
//     if (newQuestions[index].options) {
//       newQuestions[index].options = newQuestions[index].options?.filter((_, i) => i !== optionIndex)
//     }
//     setEventQuestions(newQuestions)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (eventMailDescription.trim() === "") {
//       setValidationError("Event Mail Description is required.")
//       return
//     }
//     setSpinner(true)

//     const data = {
//       eventName,
//       eventDescription,
//       eventVenue,
//       eventVenueUrl,
//       eventManagerMail,
//       eventManagerPhone,
//       eventDate,
//       eventLastDate,
//       eventPaymentUpi: eventManagerUPI,
//       eventHostedBy,
//       eventSpeaker,
//       eventPrice: price,
//       eventMailDescription,
//       eventRegistrationLimit,
//       eventQuestions,
//       clerkId: userId,
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/event",
//         data
//       )
//       console.log("Form submitted with:", data)
//       if (response.data.message) {
//         setSpinner(false)
//         router.push(`/${userId}/event/${response.data.data._id}/dashboard`)
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error)
//       setSpinner(false)
//     }
//   }

//   return (
//     <div>
//       <div>
//         <SiteHeader />
//       </div>
//       <div className="flex flex-row justify-center">
//         <div>
//           <Button onClick={() => router.back()} variant="ghost">
//             <ArrowLeftCircle size={20} />
//             Go Back
//           </Button>
//         </div>
//         <main className="w-full min-h-screen bg-white text-black flex flex-col items-center justify-center p-5">
//           <div className="max-w-2xl w-full">
//             <div className="text-center pb-8">
//               <h3 className="text-3xl font-bold sm:text-4xl">Host Your Event Here!</h3>
//               <p className="mt-2 text-lg">Make the event marvelous with us. Fill the form below.</p>
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Existing form fields */}
//               {/* ... */}

//               {/* Form Builder for Event Questions */}
//               <div className="space-y-4">
//                 <Label>Event Questions</Label>
//                 {eventQuestions.map((question, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex items-center space-x-2">
//                       <Input
//                         value={question.label}
//                         onChange={(e) => handleQuestionChange(index, 'label', e.target.value)}
//                         placeholder={`Question ${index + 1}`}
//                       />
//                       <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveQuestion(index)}>
//                         <TrashIcon className="h-4 w-4" />
//                       </Button>
//                     </div>
//                     {question.type === 'select' && (
//                       <div className="space-y-2">
//                         {question.options?.map((option, optionIndex) => (
//                           <div key={optionIndex} className="flex items-center space-x-2">
//                             <Input
//                               value={option}
//                               onChange={(e) => {
//                                 const newOptions = [...question.options!]
//                                 newOptions[optionIndex] = e.target.value
//                                 handleQuestionChange(index, 'options', newOptions)
//                               }}
//                               placeholder={`Option ${optionIndex + 1}`}
//                             />
//                             <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveOption(index, optionIndex)}>
//                               <TrashIcon className="h-4 w-4" />
//                             </Button>
//                           </div>
//                         ))}
//                         <Button type="button" variant="outline" onClick={() => handleAddOption(index)}>
//                           <PlusIcon className="h-4 w-4 mr-2" />
//                           Add Option
//                         </Button>
//                       </div>
//                     )}
//                     <div className="flex items-center space-x-2">
//                       <Checkbox
//                         checked={question.required}
//                         onCheckedChange={(checked) => handleQuestionChange(index, 'required', checked)}
//                       />
//                       <Label>Required</Label>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="flex space-x-2">
//                   <Button type="button" variant="outline" onClick={() => handleAddQuestion('text')}>
//                     <PlusIcon className="h-4 w-4 mr-2" />
//                     Add Text Field
//                   </Button>
//                   <Button type="button" variant="outline" onClick={() => handleAddQuestion('checkbox')}>
//                     <PlusIcon className="h-4 w-4 mr-2" />
//                     Add Checkbox
//                   </Button>
//                   <Button type="button" variant="outline" onClick={() => handleAddQuestion('select')}>
//                     <PlusIcon className="h-4 w-4 mr-2" />
//                     Add Dropdown
//                   </Button>
//                   <Button type="button" variant="outline" onClick={() => handleAddQuestion('textarea')}>
//                     <PlusIcon className="h-4 w-4 mr-2" />
//                     Add Textarea
//                   </Button>
//                 </div>
//               </div>

//               <Button type="submit" className="w-full" disabled={spinner}>
//                 {spinner ? (
//                   <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                   </svg>
//                 ) : "Submit"}
//               </Button>
//             </form>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default EventOnboardingForm




'use client'

import React, { useState } from "react"
import { useRouter } from 'next/navigation'
// import DatePicker from "react-datepicker"
import dynamic from 'next/dynamic' // Import dynamic from next/dynamic

import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, TrashIcon } from 'lucide-react'
import { useAuth } from "@clerk/nextjs"
import { SiteHeader } from "@/components/site-header"
import { ArrowLeftCircle } from 'lucide-react'

// Dynamically import DatePicker with SSR disabled
const DatePicker = dynamic(() => import('react-datepicker'), {
  ssr: false,
})


// Define the structure for a form field
type FormField = {
  type: 'text' | 'checkbox' | 'select' | 'textarea'
  label: string
  options?: string[] // For select dropdown
  required?: boolean
}
const EventOnboardingForm = () => {
  const router = useRouter()
  const { userId } = useAuth()
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
  const [eventQuestions, setEventQuestions] = useState<FormField[]>([])

  // Handle event date change
  const handleEventDate = (date: Date | null) => {
    if (date && date < new Date()) {
      setMessageDate("Please select a future date")
      setEventDate(null)
      return
    }
    setEventDate(date)
    setMessageDate("")
  }

  // Handle event last date for registrations
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

  // Add a new question field
  const handleAddQuestion = (type: FormField['type']) => {
    const newQuestion: FormField = {
      type,
      label: `New ${type} Question`,
      required: false,
    }
    if (type === 'select') {
      newQuestion.options = ['Option 1', 'Option 2']
    }
    setEventQuestions([...eventQuestions, newQuestion])
  }

  // Remove a question field
  const handleRemoveQuestion = (index: number) => {
    const newQuestions = eventQuestions.filter((_, i) => i !== index)
    setEventQuestions(newQuestions)
  }

  // Update a question field's property (e.g., label, options, required)
  const handleQuestionChange = (index: number, key: keyof FormField, value: any) => {
    const newQuestions = [...eventQuestions]
    newQuestions[index] = { ...newQuestions[index], [key]: value }
    setEventQuestions(newQuestions)
  }

  // Add an option to a select dropdown
  const handleAddOption = (index: number) => {
    const newQuestions = [...eventQuestions]
    if (newQuestions[index].options) {
      newQuestions[index].options?.push(`Option ${newQuestions[index].options.length + 1}`)
    }
    setEventQuestions(newQuestions)
  }

  // Remove an option from a select dropdown
  const handleRemoveOption = (index: number, optionIndex: number) => {
    const newQuestions = [...eventQuestions]
    if (newQuestions[index].options) {
      newQuestions[index].options = newQuestions[index].options?.filter((_, i) => i !== optionIndex)
    }
    setEventQuestions(newQuestions)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (eventMailDescription.trim() === "") {
      setValidationError("Event Mail Description is required.")
      return
    }
    setSpinner(true)

    const data = {
      eventName,
      eventDescription,
      eventVenue,
      eventVenueUrl,
      eventManagerMail,
      eventManagerPhone,
      eventDate,
      eventLastDate,
      eventPaymentUpi: eventManagerUPI,
      eventHostedBy,
      eventSpeaker,
      eventPrice: price,
      eventMailDescription,
      eventRegistrationLimit,
      eventQuestions,
      clerkId: userId,
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/event",
        data
      )
      console.log("Form submitted with:", data)
      if (response.data.message) {
        setSpinner(false)
        router.push(`/${userId}/event/${response.data.data._id}/dashboard`)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSpinner(false)
    }
  }

  return (
    <div>
      <div>
        <SiteHeader />
      </div>
      <div className="flex flex-row justify-center">
        <div>
          <Button onClick={() => router.back()} variant="ghost">
            <ArrowLeftCircle size={20} />
            Go Back
          </Button>
        </div>
        <main className="w-full min-h-screen bg-white text-black flex flex-col items-center justify-center p-5">
          <div className="max-w-2xl w-full">
            <div className="text-center pb-8">
              <h3 className="text-3xl font-bold sm:text-4xl">Host Your Event Here!</h3>
              <p className="mt-2 text-lg">Make the event marvelous with us. Fill the form below.</p>
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

              {/* Updated Event Questions Section */}
              <div className="space-y-4">
                <Label>Event Questions</Label>
                {eventQuestions.map((question, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={question.label}
                        onChange={(e) => handleQuestionChange(index, 'label', e.target.value)}
                        placeholder={`Question ${index + 1}`}
                      />
                      <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveQuestion(index)}>
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    {question.type === 'select' && (
                      <div className="space-y-2">
                        {question.options?.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...question.options!]
                                newOptions[optionIndex] = e.target.value
                                handleQuestionChange(index, 'options', newOptions)
                              }}
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveOption(index, optionIndex)}>
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => handleAddOption(index)}>
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add Option
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={question.required}
                        onCheckedChange={(checked) => handleQuestionChange(index, 'required', checked)}
                      />
                      <Label>Required</Label>
                    </div>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <Button type="button" variant="outline" onClick={() => handleAddQuestion('text')}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Text Field
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleAddQuestion('checkbox')}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Checkbox
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleAddQuestion('select')}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Dropdown
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleAddQuestion('textarea')}>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Textarea
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={spinner}>
                {spinner ? (
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : "Submit"}
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EventOnboardingForm

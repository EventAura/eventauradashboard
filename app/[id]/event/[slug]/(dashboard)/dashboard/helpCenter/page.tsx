"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Mail, Linkedin, Instagram } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const tabs = [
  {
    title: "What is EventAura, and how does it work?",
    description:
      "EventAura is an all-in-one event ticketing and management platform that simplifies event creation, participant registration, and payment processing. Organizers can set up events, manage registrations, and access insights through our intuitive platform.",
    imageUrl: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format",
  },
  {
    title: "Is my payment secure on EventAura?",
    description:
      "Yes, absolutely! We have partnered with trusted payment gateways like PhonePay to ensure all transactions are secure and encrypted, providing peace of mind for both organizers and participants.",
    imageUrl: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format",
  },
  {
    title: "How does the dynamic QR ticketing system work?",
    description:
      "Upon successful registration and payment, participants receive a unique QR code via email. This QR code can be scanned at the event for quick and hassle-free check-in, streamlining the authentication process.",
    imageUrl: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  },
  {
    title: "Can I create both paid and free events using EventAura?",
    description:
      "Yes, you can create paid events, free events, or even hybrid ones. Our platform supports seamless payment processing for paid events and secure registration for all event types.",
    imageUrl: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  },
  {
    title: "Is EventAura suitable for student-driven events and college clubs?",
    description:
      "Definitely! EventAura is perfect for student communities and college clubs. Our platform simplifies registration, ensures secure payments, and makes managing events effortless, even for beginners.",
    imageUrl: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  },
  {
    title: "How does the automated mailing system help?",
    description:
      "Once participants complete their registration and payment, the system automatically sends them an email with event details, a unique QR ticket, and other relevant information, saving time and effort for organizers.",
    imageUrl: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  },
  {
    title: "What measures do you take to protect user data?",
    description:
      "We prioritize data security and privacy. Our platform uses advanced security protocols to protect sensitive information and complies with data privacy regulations to build trust with our users.",
    imageUrl: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  },
  {
    title: "How do I create and publish an event on EventAura?",
    description:
      'Creating an event is easy! Simply sign up or log in to your EventAura account, navigate to the "Create Event" section, and fill in details like event name, date, time, venue, ticket type, and pricing. Once you are satisfied, publish the event, and it will be live for attendees to view and register.',
    imageUrl: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
  },
]

const Socials = () => (
  <div className="flex space-x-4">
    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
      <Mail className="w-5 h-5" />
    </a>
    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
      <Linkedin className="w-5 h-5" />
    </a>
    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
      <Instagram className="w-5 h-5" />
    </a>
  </div>
)

export default function HelpCenter() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTabs = tabs.filter((tab) => tab.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Help Center</h1>
          <p className="text-center text-gray-600 mb-8">Find answers to your questions about EventAura</p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button>Search</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredTabs.map((tab, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-4 text-left font-medium hover:bg-gray-50 transition-colors"
                  onClick={() => handleClick(index)}
                >
                  {tab.title}
                  <Plus
                    className={`${
                      activeIndex === index ? "rotate-45" : "rotate-0"
                    } transition-transform ease-in-out w-5 h-5 text-gray-600`}
                  />
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-4 bg-gray-50">
                        <p className="text-gray-700">{tab.description}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="mb-4">Can't find what you're looking for? Get in touch with our support team.</p>
            <div className="flex items-center space-x-4 mb-4">
              {/* <Mail className="w-5 h-5 text-gray-600" /> */}
              <span>support@eventaura.tech</span>
            </div>
            <Socials />
          </div>
        </section>
      </main>

      
    </div>
  )
}


'use client'
import React from 'react'


import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation"
import { TypewriterEffect } from '@/components/ui/typewriter-effect'
import { cn } from '@/lib/utils'
import { InteractiveHoverButton } from '@/components/eldoraui/interactivebutton'
import { MainMenusGradientCard } from '@/components/eldoraui/animatedcard'
import { useAuth } from '@clerk/nextjs'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

const  landing =  () => {
    const { userId} = useAuth()
    if (userId) {
      redirect(`/${userId}/event`)
    } else {
      
      const words = [
        {
          text: "Experience ",
        },
        {
          text: "the ",
        },
        {
          text: "power ",
        },
        {
          text: "of "
        },
        {
          text: "simplicity ",
        },
        {
          text: "with",
        },
        {
          text: "EventAura.",
          className: "text-blue-500 dark:text-blue-500",
        },
      ];
  return (
    <div className={cn(
      " bg-transparent  bg-[radial-gradient(#2f7df4_1px,transparent_1px)] [background-size:16px_16px]",
      { "bg-white": "#E6E7EB" }
    )}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center gap-x-4">
          <Link href="/landing" className="flex items-center space-x-2 ml-5">
            
            <span className="font-bold">Event Aura Admin Panel</span>
          </Link>
          
        </div>
        
        <div className="flex items-center gap-x-2 mr-5">
          <HoverBorderGradient 
           containerClassName="rounded-full"
           as="button"
           className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
           duration={0.05}
          >
            <Link href="/sign-up">
              <span>Sign-in</span>
            </Link>
          </HoverBorderGradient>
        </div>
      </div>
    </header>
        <div>
            <section className="flex text-white py-20">
                <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-6 text-black">Welcome to EventAura Admin Dashboard</h1>
                <p className="text-xl mb-8">Experience the power of simplicity with our black and white design.</p>
                <TypewriterEffect className="text-2xl" words={words} />
                <div className=" mt-5 p-4 rounded-5xl inline-block flex flex-col justify-center items-center">
                <Link href="/sign-up" className='m-3' >
                      <InteractiveHoverButton text="Sign-up" />
                    </Link>
                    <Link href="/sign-in" >
                      <InteractiveHoverButton text="Sign-in" />
                    </Link>
                </div>
                </div>
            </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MainMenusGradientCard
              title="Event Management"
              description="Create, edit, and delete events with ease."
              icon="calendar"
            />
            <MainMenusGradientCard
              title="User Management"
              description="Manage users and their roles."
              icon="users"
            />
            <MainMenusGradientCard
              title="Analytics"
              description="Get insights into your events and users."
              icon="chart-pie"
            />
            
          </div>
        </div>
      </section>
      

      {/* Testimonial Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">What Our Clients Say</h2>
          <blockquote className="text-2xl italic mb-6">
            "This platform transformed our workflow. The black and white design is not just beautiful, it's highly functional."
          </blockquote>
          <p className="font-semibold">- Jane Doe, CEO of TechCorp</p>
        </div>
      </section>

      

      {/* Footer */}
        <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2022 EventAura. All rights reserved.</p>
          </div>
        </footer>

        </div>
        
    </div>
    
  )
    }

}


export default landing
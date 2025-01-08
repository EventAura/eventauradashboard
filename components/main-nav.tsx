"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  AppWindow
} from "lucide-react"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Users",
    href: "/users",
    icon: Users
  },
  {
    title: "Apps",
    href: "/apps",
    icon: AppWindow
  },
  {
    title: "Chats",
    href: "/chats",
    icon: MessageSquare,
    badge: 3
  }
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          General
        </h2>
        <div className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent" : "transparent"
              )}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              <span>{item.title}</span>
              {item.badge && (
                <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Other
        </h2>
        <div className="space-y-1">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/settings" ? "bg-accent" : "transparent"
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <Link
            href="/help"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === "/help" ? "bg-accent" : "transparent"
            )}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help Center</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
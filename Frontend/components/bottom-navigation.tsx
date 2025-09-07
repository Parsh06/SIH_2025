"use client"

import { Home, MessageCircle, User, BookOpen, Activity } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/activity", icon: Activity, label: "Activity" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/knowledge", icon: BookOpen, label: "Knowledge" },
  { href: "/profile", icon: User, label: "Profile" },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 z-40 shadow-lg">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 min-w-0 flex-1",
                isActive
                  ? "text-emerald-600 bg-emerald-50 scale-105"
                  : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50",
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "drop-shadow-sm")} />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

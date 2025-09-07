"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, PlusCircle, BookOpen, Camera, Calculator, MapPin } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    href: "/activity",
    icon: PlusCircle,
    label: "Log Activity",
    description: "Record farming activities",
    color: "text-green-600",
  },
  {
    href: "/chat",
    icon: MessageCircle,
    label: "Ask Krishi Sakhi",
    description: "Get AI farming advice",
    color: "text-blue-600",
  },
  {
    href: "/knowledge",
    icon: BookOpen,
    label: "Knowledge Hub",
    description: "Browse farming guides",
    color: "text-purple-600",
  },
  {
    href: "/crop-scanner",
    icon: Camera,
    label: "Crop Scanner",
    description: "Identify pests & diseases",
    color: "text-orange-600",
  },
  {
    href: "/calculator",
    icon: Calculator,
    label: "Farm Calculator",
    description: "Calculate costs & yields",
    color: "text-indigo-600",
  },
  {
    href: "/weather",
    icon: MapPin,
    label: "Field Map",
    description: "View your farm layout",
    color: "text-teal-600",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent hover:bg-primary/5 border-border"
              >
                <action.icon className={`w-6 h-6 ${action.color}`} />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.label}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

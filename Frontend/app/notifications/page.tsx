"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { ArrowLeft, Bell, Cloud, Bug, Calendar, TrendingUp, X, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

interface Notification {
  id: string
  type: "weather" | "pest" | "scheme" | "market" | "advisory"
  title: string
  message: string
  details?: string
  timestamp: Date
  isRead: boolean
  priority: "high" | "medium" | "low"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "weather",
    title: "Heavy Rain Alert",
    message: "Heavy rainfall expected in your area tomorrow. Take necessary precautions.",
    details:
      "Weather forecast shows 80mm+ rainfall expected between 6 AM to 6 PM tomorrow. Recommended actions: 1) Ensure proper drainage in rice fields, 2) Delay any planned irrigation, 3) Cover harvested crops, 4) Check for waterlogging in low-lying areas.",
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    isRead: false,
    priority: "high",
  },
  {
    id: "2",
    type: "pest",
    title: "Brown Planthopper Alert",
    message: "Brown planthopper activity detected in nearby farms. Monitor your rice crops.",
    details:
      "Farmers in Kottayam district have reported brown planthopper infestation. Signs to watch: yellowing of rice plants, stunted growth, honeydew secretion. Immediate action: Apply neem oil spray, use light traps, maintain proper water levels.",
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    isRead: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "scheme",
    title: "PM-KISAN Deadline Reminder",
    message: "Only 5 days left to apply for PM-KISAN scheme benefits.",
    details:
      "The PM-KISAN scheme provides ₹6,000 annual income support to eligible farmers. Deadline: March 31, 2024. Required documents: Aadhaar card, bank account details, land ownership documents. Apply online at pmkisan.gov.in or visit your nearest Common Service Center.",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    isRead: true,
    priority: "medium",
  },
  {
    id: "4",
    type: "market",
    title: "Rice Price Increase",
    message: "Rice prices have increased by 8% in local markets this week.",
    details:
      "Current rice prices in Kottayam market: ₹2,850 per quintal (up from ₹2,650). This 7.5% increase is due to reduced supply from neighboring states. Good time to sell if you have stock. Quality premium varieties are fetching even higher prices.",
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    isRead: true,
    priority: "low",
  },
  {
    id: "5",
    type: "advisory",
    title: "Fertilizer Application Reminder",
    message: "Time to apply potash fertilizer to your rice crops for better yield.",
    details:
      "Based on your crop calendar and current growth stage, your rice plants are in the panicle initiation stage. Apply potash fertilizer (60kg/hectare) to improve grain filling and plant strength. Best time: early morning or evening. Ensure adequate soil moisture before application.",
    timestamp: new Date(Date.now() - 21600000), // 6 hours ago
    isRead: true,
    priority: "medium",
  },
  {
    id: "6",
    type: "weather",
    title: "Sunny Weather Forecast",
    message: "Clear sunny weather expected for the next 3 days. Good for field activities.",
    details:
      "Weather forecast shows clear skies with temperatures between 28-32°C for the next 3 days. Perfect conditions for: harvesting mature crops, drying grains, field preparation, pesticide application. Humidity will be low (45-55%), ideal for most farming activities.",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    isRead: true,
    priority: "low",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [expandedNotification, setExpandedNotification] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const toggleExpanded = (id: string) => {
    setExpandedNotification((prev) => (prev === id ? null : id))
    markAsRead(id)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "weather":
        return <Cloud className="w-5 h-5 text-blue-500" />
      case "pest":
        return <Bug className="w-5 h-5 text-red-500" />
      case "scheme":
        return <Calendar className="w-5 h-5 text-green-500" />
      case "market":
        return <TrendingUp className="w-5 h-5 text-purple-500" />
      case "advisory":
        return <Bell className="w-5 h-5 text-orange-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`
    }
  }

  const filteredNotifications = notifications.filter((notification) => (filter === "all" ? true : !notification.isRead))

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Notifications</h1>
              {unreadCount > 0 && <p className="text-sm text-muted-foreground">{unreadCount} unread</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm" className="bg-transparent">
                Mark All Read
              </Button>
            )}
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {/* Filter Tabs */}
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter !== "all" ? "bg-transparent" : ""}
          >
            All ({notifications.length})
          </Button>
          <Button
            variant={filter === "unread" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unread")}
            className={filter !== "unread" ? "bg-transparent" : ""}
          >
            Unread ({unreadCount})
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-all ${!notification.isRead ? "border-primary/50 bg-primary/5" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{notification.title}</h3>
                        {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</span>
                      {notification.details && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 p-1"
                          onClick={() => toggleExpanded(notification.id)}
                        >
                          {expandedNotification === notification.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                    {expandedNotification === notification.id && notification.details && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm">{notification.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {filter === "unread"
                ? "All caught up! Check back later for new updates."
                : "You'll receive notifications about weather, pests, and farming advice here."}
            </p>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}

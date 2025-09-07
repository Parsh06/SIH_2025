"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Droplets, Bug, Calendar, TrendingUp } from "lucide-react"

interface Alert {
  id: string
  type: "weather" | "pest" | "irrigation" | "scheme" | "market"
  title: string
  message: string
  priority: "high" | "medium" | "low"
  dueDate?: string
  actionRequired?: boolean
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "weather",
    title: "Heavy Rain Expected",
    message: "Rain expected tomorrow. Delay irrigation for rice fields.",
    priority: "high",
    dueDate: "Tomorrow",
    actionRequired: true,
  },
  {
    id: "2",
    type: "pest",
    title: "Pest Alert",
    message: "Brown planthopper spotted in nearby farms. Check your rice crops.",
    priority: "medium",
    actionRequired: true,
  },
  {
    id: "3",
    type: "scheme",
    title: "Subsidy Deadline",
    message: "PM-KISAN scheme application deadline in 5 days.",
    priority: "medium",
    dueDate: "5 days",
    actionRequired: true,
  },
  {
    id: "4",
    type: "market",
    title: "Price Update",
    message: "Rice prices increased by 8% in local market.",
    priority: "low",
  },
]

const getAlertIcon = (type: string) => {
  switch (type) {
    case "weather":
      return <Droplets className="w-4 h-4 text-blue-500" />
    case "pest":
      return <Bug className="w-4 h-4 text-red-500" />
    case "irrigation":
      return <Droplets className="w-4 h-4 text-blue-500" />
    case "scheme":
      return <Calendar className="w-4 h-4 text-green-500" />
    case "market":
      return <TrendingUp className="w-4 h-4 text-purple-500" />
    default:
      return <Bell className="w-4 h-4 text-gray-500" />
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

export function AlertsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="w-5 h-5 text-primary" />
          Alerts & Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className="p-3 border rounded-lg space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {getAlertIcon(alert.type)}
                <span className="font-medium text-sm">{alert.title}</span>
                <Badge variant="outline" className={getPriorityColor(alert.priority)}>
                  {alert.priority}
                </Badge>
              </div>
              {alert.dueDate && (
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{alert.dueDate}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{alert.message}</p>
            {alert.actionRequired && (
              <Button size="sm" variant="outline" className="bg-transparent">
                Take Action
              </Button>
            )}
          </div>
        ))}
        <Button variant="ghost" className="w-full text-primary">
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  )
}

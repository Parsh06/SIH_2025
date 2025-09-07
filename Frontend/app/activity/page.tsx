"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { ArrowLeft, Plus, Mic, Sprout, Droplets, Bug, Scissors, Calendar } from "lucide-react"
import Link from "next/link"

interface Activity {
  id: string
  date: string
  type: string
  description: string
  crop?: string
  area?: string
}

const activityTypes = [
  { value: "sowing", label: "Sowing", icon: Sprout, color: "text-green-600" },
  { value: "irrigation", label: "Irrigation", icon: Droplets, color: "text-blue-600" },
  { value: "fertilization", label: "Fertilization", icon: Plus, color: "text-purple-600" },
  { value: "pest_observation", label: "Pest Observation", icon: Bug, color: "text-red-600" },
  { value: "harvest", label: "Harvest", icon: Scissors, color: "text-orange-600" },
]

const mockActivities: Activity[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "irrigation",
    description: "Irrigated rice fields in the morning. Water level maintained at 2 inches.",
    crop: "Rice",
    area: "2.5 acres",
  },
  {
    id: "2",
    date: "2024-01-14",
    type: "fertilization",
    description: "Applied urea fertilizer (50kg) to rice crop. Weather was clear.",
    crop: "Rice",
    area: "2.5 acres",
  },
  {
    id: "3",
    date: "2024-01-12",
    type: "pest_observation",
    description: "Spotted brown planthopper in section A. Applied neem oil spray as preventive measure.",
    crop: "Rice",
    area: "0.5 acres",
  },
  {
    id: "4",
    date: "2024-01-10",
    type: "sowing",
    description: "Planted new batch of vegetable seeds in the kitchen garden area.",
    crop: "Vegetables",
    area: "0.2 acres",
  },
]

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "",
    description: "",
    crop: "",
    area: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newActivity: Activity = {
      id: Date.now().toString(),
      ...formData,
    }
    setActivities((prev) => [newActivity, ...prev])
    setFormData({
      date: new Date().toISOString().split("T")[0],
      type: "",
      description: "",
      crop: "",
      area: "",
    })
    setShowForm(false)
  }

  const getActivityIcon = (type: string) => {
    const activity = activityTypes.find((a) => a.value === type)
    if (!activity) return <Calendar className="w-5 h-5 text-gray-500" />
    const Icon = activity.icon
    return <Icon className={`w-5 h-5 ${activity.color}`} />
  }

  const getActivityLabel = (type: string) => {
    const activity = activityTypes.find((a) => a.value === type)
    return activity?.label || type
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

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
            <h1 className="text-xl font-bold">Activity Log</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowForm(!showForm)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Log Activity
            </Button>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Activity Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Log New Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>

                {/* Activity Type */}
                <div className="space-y-2">
                  <Label>Activity Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map((activity) => (
                        <SelectItem key={activity.value} value={activity.value}>
                          <div className="flex items-center gap-2">
                            <activity.icon className={`w-4 h-4 ${activity.color}`} />
                            {activity.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Crop */}
                <div className="space-y-2">
                  <Label htmlFor="crop">Crop (Optional)</Label>
                  <Input
                    id="crop"
                    value={formData.crop}
                    onChange={(e) => setFormData((prev) => ({ ...prev, crop: e.target.value }))}
                    placeholder="e.g., Rice, Coconut, Vegetables"
                  />
                </div>

                {/* Area */}
                <div className="space-y-2">
                  <Label htmlFor="area">Area (Optional)</Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                    placeholder="e.g., 2.5 acres, Section A"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <div className="relative">
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the activity in detail..."
                      rows={3}
                      required
                    />
                    <Button type="button" variant="ghost" size="sm" className="absolute top-2 right-2 h-6 w-6 p-0">
                      <Mic className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Save Activity
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="bg-transparent">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex gap-4">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>
                    {index < activities.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-transparent">
                        {getActivityLabel(activity.type)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{formatDate(activity.date)}</span>
                    </div>
                    <p className="text-sm mb-2">{activity.description}</p>
                    {(activity.crop || activity.area) && (
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        {activity.crop && <span>Crop: {activity.crop}</span>}
                        {activity.area && <span>Area: {activity.area}</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

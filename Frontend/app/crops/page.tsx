"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ArrowLeft, Droplets, Sun, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function CropsPage() {
  const crops = [
    {
      name: "Rice",
      stage: "Flowering",
      health: "Good",
      nextAction: "Monitor for pests",
      daysToHarvest: 45,
      area: "2.5 acres",
    },
    {
      name: "Coconut",
      stage: "Mature",
      health: "Excellent",
      nextAction: "Regular watering",
      daysToHarvest: 30,
      area: "1 acre",
    },
    {
      name: "Pepper",
      stage: "Growing",
      health: "Fair",
      nextAction: "Apply fertilizer",
      daysToHarvest: 90,
      area: "0.5 acres",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-emerald-100 p-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-emerald-800">My Crops</h1>
        </div>
      </header>

      {/* Crops Overview */}
      <div className="p-4 space-y-4">
        <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-emerald-800">Total Farm Area</h3>
                <p className="text-2xl font-bold text-emerald-600">4 acres</p>
              </div>
              <div className="text-right">
                <h3 className="font-semibold text-emerald-800">Active Crops</h3>
                <p className="text-2xl font-bold text-emerald-600">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Crops */}
        <div className="space-y-4">
          {crops.map((crop, index) => (
            <Card key={index} className="bg-white border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-slate-800">{crop.name}</CardTitle>
                  <Badge
                    variant={crop.health === "Excellent" ? "success" : crop.health === "Good" ? "info" : "warning"}
                  >
                    {crop.health}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span className="text-slate-600">Stage: {crop.stage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-600">{crop.daysToHarvest} days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-slate-600">Area: {crop.area}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-500" />
                    <span className="text-slate-600">{crop.nextAction}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}

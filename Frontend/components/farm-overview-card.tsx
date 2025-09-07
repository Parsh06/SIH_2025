"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sprout, Ruler, Calendar } from "lucide-react"

interface CropData {
  name: string
  stage: string
  area: number
  daysToHarvest?: number
  status: "healthy" | "attention" | "critical"
}

const mockFarmData = {
  totalLand: 5.2,
  crops: [
    { name: "Rice", stage: "Flowering", area: 2.5, daysToHarvest: 45, status: "healthy" as const },
    { name: "Coconut", stage: "Mature", area: 1.5, status: "healthy" as const },
    { name: "Pepper", stage: "Growing", area: 0.8, daysToHarvest: 120, status: "attention" as const },
    { name: "Vegetables", stage: "Seedling", area: 0.4, daysToHarvest: 30, status: "healthy" as const },
  ],
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-green-100 text-green-800 border-green-200"
    case "attention":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "critical":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function FarmOverviewCard() {
  const { totalLand, crops } = mockFarmData

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sprout className="w-5 h-5 text-primary" />
          Farm Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total Land */}
        <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
          <Ruler className="w-5 h-5 text-primary" />
          <div>
            <div className="font-semibold">{totalLand} acres</div>
            <div className="text-sm text-muted-foreground">Total farmland</div>
          </div>
        </div>

        {/* Crops */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Current Crops</h4>
          {crops.map((crop, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{crop.name}</span>
                  <Badge variant="outline" className={getStatusColor(crop.status)}>
                    {crop.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {crop.stage} • {crop.area} acres
                </div>
              </div>
              {crop.daysToHarvest && (
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    {crop.daysToHarvest}d
                  </div>
                  <div className="text-xs text-muted-foreground">to harvest</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

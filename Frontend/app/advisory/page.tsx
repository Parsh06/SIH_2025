"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { ArrowLeft, AlertTriangle, CheckCircle, Bug, Calendar, TrendingUp, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Advisory {
  id: string
  type: "weather" | "pest" | "irrigation" | "fertilizer"
  title: string
  message: string
  priority: "high" | "medium" | "low"
  action?: string
}

interface PestAlert {
  id: string
  name: string
  crop: string
  severity: "high" | "medium" | "low"
  description: string
  solution: string
  image: string
}

interface Scheme {
  id: string
  name: string
  deadline: string
  amount: string
  description: string
  status: "active" | "ending_soon" | "closed"
}

interface MarketPrice {
  crop: string
  currentPrice: number
  previousPrice: number
  change: number
  unit: string
}

const mockAdvisories: Advisory[] = [
  {
    id: "1",
    type: "weather",
    title: "Heavy Rain Alert",
    message: "Heavy rain expected in the next 24 hours. Delay irrigation for rice fields and ensure proper drainage.",
    priority: "high",
    action: "Delay irrigation",
  },
  {
    id: "2",
    type: "fertilizer",
    title: "Fertilizer Recommendation",
    message: "Apply potash fertilizer to strengthen rice plants before the rainy season.",
    priority: "medium",
    action: "Apply fertilizer",
  },
  {
    id: "3",
    type: "pest",
    title: "Pest Prevention",
    message: "Monitor for brown planthopper activity. Humid conditions favor pest growth.",
    priority: "medium",
    action: "Monitor crops",
  },
]

const mockPestAlerts: PestAlert[] = [
  {
    id: "1",
    name: "Brown Planthopper",
    crop: "Rice",
    severity: "high",
    description: "Small brown insects causing yellowing and stunted growth in rice plants.",
    solution: "Apply neem oil spray or use light traps. Maintain proper water levels.",
    image: "/brown-planthopper-pest-on-rice.jpg",
  },
  {
    id: "2",
    name: "Leaf Folder",
    crop: "Rice",
    severity: "medium",
    description: "Caterpillars folding rice leaves and feeding inside, reducing photosynthesis.",
    solution: "Use pheromone traps and apply biological pesticides like Bt.",
    image: "/rice-leaf-folder-caterpillar-damage.jpg",
  },
  {
    id: "3",
    name: "Coconut Mite",
    crop: "Coconut",
    severity: "medium",
    description: "Tiny mites causing yellowing and bronzing of coconut leaves.",
    solution: "Spray with sulfur-based miticides during early morning or evening.",
    image: "/coconut-mite-damage-on-leaves.jpg",
  },
]

const mockSchemes: Scheme[] = [
  {
    id: "1",
    name: "PM-KISAN Scheme",
    deadline: "March 31, 2024",
    amount: "₹6,000/year",
    description: "Direct income support to farmers with cultivable land.",
    status: "active",
  },
  {
    id: "2",
    name: "Crop Insurance Scheme",
    deadline: "February 15, 2024",
    amount: "Up to ₹2 lakh",
    description: "Insurance coverage for crop losses due to natural calamities.",
    status: "ending_soon",
  },
  {
    id: "3",
    name: "Soil Health Card",
    deadline: "January 30, 2024",
    amount: "Free",
    description: "Get your soil tested and receive nutrient recommendations.",
    status: "ending_soon",
  },
]

const mockMarketPrices: MarketPrice[] = [
  { crop: "Rice", currentPrice: 2850, previousPrice: 2650, change: 7.5, unit: "per quintal" },
  { crop: "Coconut", currentPrice: 12, previousPrice: 11, change: 9.1, unit: "per piece" },
  { crop: "Pepper", currentPrice: 45000, previousPrice: 42000, change: 7.1, unit: "per quintal" },
  { crop: "Cardamom", currentPrice: 125000, previousPrice: 120000, change: 4.2, unit: "per quintal" },
]

export default function AdvisoryPage() {
  const [selectedPest, setSelectedPest] = useState<PestAlert | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      case "low":
        return "border-green-200 bg-green-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case "low":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getSchemeStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "ending_soon":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "closed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
            <h1 className="text-xl font-bold">Advisory & Alerts</h1>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* AI Advisory Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAdvisories.map((advisory) => (
              <div key={advisory.id} className={`p-4 rounded-lg border ${getPriorityColor(advisory.priority)}`}>
                <div className="flex items-start gap-3">
                  {getPriorityIcon(advisory.priority)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{advisory.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{advisory.message}</p>
                    {advisory.action && (
                      <Button size="sm" variant="outline" className="bg-transparent">
                        {advisory.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pest Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bug className="w-5 h-5 text-red-500" />
              Nearby Pest Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {mockPestAlerts.map((pest) => (
                <div key={pest.id} className="flex gap-4 p-3 border rounded-lg">
                  <img
                    src={pest.image || "/placeholder.svg"}
                    alt={pest.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{pest.name}</h4>
                      <Badge
                        variant="outline"
                        className={
                          pest.severity === "high"
                            ? "bg-red-100 text-red-800 border-red-200"
                            : pest.severity === "medium"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-green-100 text-green-800 border-green-200"
                        }
                      >
                        {pest.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Affects: {pest.crop}</p>
                    <p className="text-sm mb-2">{pest.description}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => setSelectedPest(pest)}
                    >
                      View Solution
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Government Schemes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="w-5 h-5 text-green-500" />
              Government Schemes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSchemes.map((scheme) => (
              <div key={scheme.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{scheme.name}</h4>
                  <Badge variant="outline" className={getSchemeStatusColor(scheme.status)}>
                    {scheme.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{scheme.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="font-medium text-primary">{scheme.amount}</span>
                    <span className="text-muted-foreground ml-2">Deadline: {scheme.deadline}</span>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Prices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Market Price Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockMarketPrices.map((price, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold text-sm">{price.crop}</h4>
                    <p className="text-xs text-muted-foreground">{price.unit}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{price.currentPrice.toLocaleString()}</div>
                    <div
                      className={`text-sm flex items-center gap-1 ${
                        price.change > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {price.change > 0 ? "+" : ""}
                      {price.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Pest Solution Modal */}
      {selectedPest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="w-5 h-5 text-red-500" />
                {selectedPest.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={selectedPest.image || "/placeholder.svg"}
                alt={selectedPest.name}
                className="w-full h-32 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold mb-2">Solution:</h4>
                <p className="text-sm text-muted-foreground">{selectedPest.solution}</p>
              </div>
              <Button onClick={() => setSelectedPest(null)} className="w-full">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}

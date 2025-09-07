"use client"

import { WeatherCard } from "@/components/weather-card"
import { FarmOverviewCard } from "@/components/farm-overview-card"
import { AlertsCard } from "@/components/alerts-card"
import { QuickActions } from "@/components/quick-actions"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Bell, TrendingUp, Calendar, Droplets, DollarSign, BarChart3, Users, Target } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pb-20 safe-area-inset">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container-responsive">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-primary">Krishi Sakhi</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Good morning, Ravi!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
                </Button>
              </Link>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-responsive content-spacing py-4 sm:py-6">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 sm:p-6 border border-emerald-100 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-emerald-800">Welcome back, Ravi!</h2>
              <p className="text-sm sm:text-base text-emerald-600">Your farm is looking healthy today</p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 self-start sm:self-center">
              Day 45 of Season
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <div className="text-center p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-emerald-700">2.5</div>
              <div className="text-xs sm:text-sm text-emerald-600">Acres Active</div>
            </div>
            <div className="text-center p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-emerald-700">85%</div>
              <div className="text-xs sm:text-sm text-emerald-600">Crop Health</div>
            </div>
            <div className="text-center p-2 sm:p-3">
              <div className="text-xl sm:text-2xl font-bold text-emerald-700">₹45K</div>
              <div className="text-xs sm:text-sm text-emerald-600">Est. Revenue</div>
            </div>
          </div>
        </div>

        {/* Weather Card */}
        <div className="animate-slide-up">
          <WeatherCard />
        </div>

        <Card className="card-enhanced animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              Today's Priority Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-center gap-3">
                <Droplets className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm sm:text-base">Irrigation - Field A</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Due by 6:00 AM</div>
                </div>
              </div>
              <Badge variant="outline" className="text-orange-600 border-orange-200 self-start sm:self-center">
                High
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm sm:text-base">Fertilizer Application</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Rice Field - Section B</div>
                </div>
              </div>
              <Badge variant="outline" className="text-yellow-600 border-yellow-200 self-start sm:self-center">
                Medium
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                <div>
                  <div className="font-medium text-sm sm:text-base">Labor Coordination</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Harvest preparation meeting</div>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-200 self-start sm:self-center">
                Low
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Farm Overview */}
        <div className="animate-slide-up">
          <FarmOverviewCard />
        </div>

        <Card className="card-enhanced animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid-responsive-2 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-base font-medium">Rice (Basmati)</span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-green-600">₹2,850/quintal</div>
                <div className="text-xs sm:text-sm text-green-600">+5.2% from last week</div>
              </div>
              <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-base font-medium">Coconut</span>
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-lg sm:text-xl font-bold text-blue-600">₹28/piece</div>
                <div className="text-xs sm:text-sm text-blue-600">+2.1% from last week</div>
              </div>
            </div>
            <div className="p-3 sm:p-4 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-amber-600" />
                <span className="text-sm sm:text-base font-medium">Best Selling Opportunity</span>
              </div>
              <p className="text-sm sm:text-base text-amber-700 leading-relaxed">
                Rice prices expected to rise 8-10% next week due to festival demand. Consider selling 60% of harvest.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-enhanced animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              Farm Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="grid-responsive-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Water Usage</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                  <div
                    className="bg-blue-500 h-2 sm:h-3 rounded-full transition-all duration-300"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">2,250L used this week</div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Crop Growth</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                  <div
                    className="bg-green-500 h-2 sm:h-3 rounded-full transition-all duration-300"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">Flowering stage - on track</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-slate-700">12</div>
                <div className="text-xs sm:text-sm text-slate-600">Days to Harvest</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-slate-700">95%</div>
                <div className="text-xs sm:text-sm text-slate-600">Pest Free</div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
                <div className="text-lg sm:text-xl font-bold text-slate-700">4.2T</div>
                <div className="text-xs sm:text-sm text-slate-600">Est. Yield</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Reminders */}
        <div className="animate-slide-up">
          <AlertsCard />
        </div>

        {/* Quick Actions */}
        <div className="animate-slide-up">
          <QuickActions />
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="nav-mobile">
        <BottomNavigation />
      </div>
    </div>
  )
}

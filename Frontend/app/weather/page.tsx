"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from "lucide-react"
import Link from "next/link"

const detailedWeatherData = {
  current: {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    pressure: 1013,
    uvIndex: 6,
    feelsLike: 32,
  },
  hourly: [
    { time: "Now", temp: 28, condition: "Partly Cloudy", rain: 10 },
    { time: "1 PM", temp: 30, condition: "Sunny", rain: 5 },
    { time: "2 PM", temp: 32, condition: "Sunny", rain: 0 },
    { time: "3 PM", temp: 31, condition: "Cloudy", rain: 20 },
    { time: "4 PM", temp: 29, condition: "Rain", rain: 80 },
    { time: "5 PM", temp: 27, condition: "Rain", rain: 90 },
  ],
  forecast: [
    { day: "Today", high: 32, low: 22, condition: "Partly Cloudy", rain: 30, humidity: 65 },
    { day: "Tomorrow", high: 29, low: 21, condition: "Rain", rain: 85, humidity: 80 },
    { day: "Wednesday", high: 31, low: 23, condition: "Sunny", rain: 10, humidity: 55 },
    { day: "Thursday", high: 33, low: 24, condition: "Sunny", rain: 5, humidity: 50 },
    { day: "Friday", high: 28, low: 20, condition: "Rain", rain: 90, humidity: 85 },
    { day: "Saturday", high: 30, low: 22, condition: "Cloudy", rain: 40, humidity: 70 },
    { day: "Sunday", high: 32, low: 23, condition: "Sunny", rain: 15, humidity: 60 },
  ],
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return <Sun className="w-6 h-6 text-yellow-500" />
    case "rain":
      return <CloudRain className="w-6 h-6 text-blue-500" />
    case "cloudy":
    case "partly cloudy":
      return <Cloud className="w-6 h-6 text-gray-500" />
    default:
      return <Sun className="w-6 h-6 text-yellow-500" />
  }
}

export default function WeatherPage() {
  const { current, hourly, forecast } = detailedWeatherData

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
            <h1 className="text-xl font-bold">Weather Forecast</h1>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Current Weather */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              {getWeatherIcon(current.condition)}
              <div>
                <div className="text-4xl font-bold">{current.temperature}°C</div>
                <div className="text-muted-foreground">{current.condition}</div>
                <div className="text-sm text-muted-foreground">Feels like {current.feelsLike}°C</div>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="text-sm font-medium">{current.humidity}%</div>
                  <div className="text-xs text-muted-foreground">Humidity</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-sm font-medium">{current.windSpeed} km/h</div>
                  <div className="text-xs text-muted-foreground">Wind Speed</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-500" />
                <div>
                  <div className="text-sm font-medium">{current.visibility} km</div>
                  <div className="text-xs text-muted-foreground">Visibility</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-purple-500" />
                <div>
                  <div className="text-sm font-medium">{current.pressure} mb</div>
                  <div className="text-xs text-muted-foreground">Pressure</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hourly Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {hourly.map((hour, index) => (
                <div key={index} className="flex-shrink-0 text-center space-y-2 p-3 rounded-lg bg-muted/50">
                  <div className="text-sm font-medium">{hour.time}</div>
                  {getWeatherIcon(hour.condition)}
                  <div className="text-sm font-medium">{hour.temp}°</div>
                  {hour.rain > 0 && (
                    <div className="flex items-center gap-1 text-xs text-blue-500">
                      <Droplets className="w-3 h-3" />
                      {hour.rain}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 7-Day Forecast */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">7-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(day.condition)}
                    <div>
                      <div className="font-medium">{day.day}</div>
                      <div className="text-sm text-muted-foreground">{day.condition}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{day.low}°</span>
                      <span className="font-medium">{day.high}°</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span>{day.rain}%</span>
                      <span className="text-muted-foreground">• {day.humidity}%</span>
                    </div>
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

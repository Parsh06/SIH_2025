"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, Eye, Gauge } from "lucide-react"

interface WeatherData {
  current: {
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    visibility: number
    pressure: number
    uvIndex: number
    feelsLike: number
  }
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
    rainChance: number
    windSpeed: number
  }>
  farmingAdvice: string
}

const mockWeatherData: WeatherData = {
  current: {
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    pressure: 1013,
    uvIndex: 6,
    feelsLike: 31,
  },
  forecast: [
    { day: "Today", high: 30, low: 22, condition: "Sunny", rainChance: 10, windSpeed: 8 },
    { day: "Tomorrow", high: 32, low: 24, condition: "Rain", rainChance: 80, windSpeed: 15 },
    { day: "Wed", high: 29, low: 21, condition: "Cloudy", rainChance: 40, windSpeed: 10 },
    { day: "Thu", high: 31, low: 23, condition: "Sunny", rainChance: 5, windSpeed: 6 },
    { day: "Fri", high: 28, low: 20, condition: "Rain", rainChance: 90, windSpeed: 18 },
    { day: "Sat", high: 27, low: 19, condition: "Cloudy", rainChance: 30, windSpeed: 12 },
    { day: "Sun", high: 30, low: 22, condition: "Sunny", rainChance: 15, windSpeed: 9 },
  ],
  farmingAdvice:
    "Perfect conditions for rice flowering stage. Heavy rain expected tomorrow - delay irrigation and prepare drainage.",
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

export function WeatherCard() {
  const { current, forecast, farmingAdvice } = mockWeatherData

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {getWeatherIcon(current.condition)}
          Weather Today
          <Badge variant="outline" className="ml-auto text-xs">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">{current.temperature}°C</div>
            <div className="text-sm text-muted-foreground">{current.condition}</div>
            <div className="text-xs text-muted-foreground">Feels like {current.feelsLike}°C</div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-1 text-sm">
              <Droplets className="w-4 h-4 text-blue-500" />
              {current.humidity}%
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Wind className="w-4 h-4 text-gray-500" />
              {current.windSpeed} km/h
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-lg">
          <div className="text-center">
            <Eye className="w-4 h-4 text-slate-500 mx-auto mb-1" />
            <div className="text-sm font-medium">{current.visibility}km</div>
            <div className="text-xs text-slate-500">Visibility</div>
          </div>
          <div className="text-center">
            <Gauge className="w-4 h-4 text-slate-500 mx-auto mb-1" />
            <div className="text-sm font-medium">{current.pressure}mb</div>
            <div className="text-xs text-slate-500">Pressure</div>
          </div>
          <div className="text-center">
            <Sun className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <div className="text-sm font-medium">{current.uvIndex}/10</div>
            <div className="text-xs text-slate-500">UV Index</div>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-800">Farming Advice</span>
          </div>
          <p className="text-sm text-emerald-700">{farmingAdvice}</p>
        </div>

        {/* 7-Day Forecast */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">7-Day Forecast</h4>
          <div className="space-y-2">
            {forecast.slice(0, 5).map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm p-2 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2 flex-1">
                  {getWeatherIcon(day.condition)}
                  <span className="font-medium w-16">{day.day}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Wind className="w-3 h-3" />
                    {day.windSpeed}km/h
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">{day.low}°</span>
                    <span className="font-medium">{day.high}°</span>
                  </div>
                  {day.rainChance > 30 && (
                    <div className="flex items-center gap-1 text-blue-500">
                      <Droplets className="w-3 h-3" />
                      <span className="text-xs">{day.rainChance}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

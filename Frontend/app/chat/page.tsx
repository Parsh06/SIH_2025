"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LanguageToggle } from "@/components/language-toggle"
import {
  ArrowLeft,
  Send,
  Mic,
  Cloud,
  Sprout,
  User,
  Bot,
  Camera,
  Paperclip,
  MoreHorizontal,
  Bug,
  Droplets,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Volume2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  hasAudio?: boolean
  isTyping?: boolean
  suggestions?: string[]
  attachments?: { type: "image" | "file"; url: string; name: string }[]
  quickActions?: { label: string; action: string }[]
}

const mockMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content:
      "Namaste! I'm Krishi Sakhi, your AI farming assistant. I can help you with crop management, pest control, weather advice, and market information. How can I assist you today?",
    timestamp: new Date(Date.now() - 300000),
    hasAudio: true,
    suggestions: ["Check my crops", "Weather forecast", "Pest problems", "Market prices"],
  },
  {
    id: "2",
    type: "user",
    content: "My rice plants are turning yellow. What should I do?",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: "3",
    type: "bot",
    content:
      "I can see you're dealing with yellowing rice plants. This is a common issue that can have several causes. Based on your location in Kerala and current weather conditions, let me analyze the most likely reasons:\n\n🌾 **Possible Causes:**\n• Nitrogen deficiency\n• Waterlogging due to recent rains\n• Iron deficiency in alkaline soils\n• Pest damage (check for brown planthopper)\n\nCan you tell me more about your recent farming activities?",
    timestamp: new Date(Date.now() - 180000),
    hasAudio: true,
    quickActions: [
      { label: "Recent irrigation", action: "irrigation_schedule" },
      { label: "Fertilizer applied", action: "fertilizer_history" },
      { label: "Take photo", action: "upload_photo" },
      { label: "Pest check", action: "pest_identification" },
    ],
  },
  {
    id: "4",
    type: "user",
    content: "I irrigated 3 days ago and applied urea fertilizer last week.",
    timestamp: new Date(Date.now() - 120000),
  },
  {
    id: "5",
    type: "bot",
    content:
      "Thank you for the details! Based on your irrigation and fertilization schedule, plus the heavy rain forecast for tomorrow, this appears to be **waterlogging stress** combined with possible **nutrient lockup**.\n\n🚨 **Immediate Actions:**\n1. Create drainage channels immediately\n2. Avoid irrigation for next 5-7 days\n3. Apply potash fertilizer (MOP) @ 25kg/acre\n4. Spray iron chelate if yellowing persists\n\n📱 **I'll monitor your field conditions and send updates**",
    timestamp: new Date(Date.now() - 60000),
    hasAudio: true,
    suggestions: ["Set reminder", "Weather alerts", "Similar cases", "Expert consultation"],
    quickActions: [
      { label: "Create task", action: "create_task" },
      { label: "Set reminder", action: "set_reminder" },
      { label: "Find supplies", action: "find_suppliers" },
    ],
  },
]

const quickActionTemplates = [
  { icon: Bug, label: "Pest ID", query: "Help me identify this pest in my crops" },
  { icon: Droplets, label: "Irrigation", query: "When should I irrigate my crops?" },
  { icon: Cloud, label: "Weather", query: "What's the weather forecast for farming?" },
  { icon: TrendingUp, label: "Market", query: "What are current market prices?" },
  { icon: Calendar, label: "Schedule", query: "What farming activities should I do this week?" },
  { icon: Sprout, label: "Crop Care", query: "How to care for my current crops?" },
]

const conversationStarters = [
  "My crops are showing unusual symptoms",
  "When is the best time to plant rice?",
  "How to prepare for monsoon season?",
  "What fertilizer should I use now?",
  "Help me identify this pest",
  "Current market prices for my crops",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (customMessage?: string) => {
    const messageText = customMessage || inputValue
    if (!messageText.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    // Add to conversation history
    setConversationHistory((prev) => [...prev, messageText])

    // Simulate bot typing and response
    setTimeout(() => {
      setIsTyping(false)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateSmartResponse(messageText),
        timestamp: new Date(),
        hasAudio: true,
        suggestions: generateSuggestions(messageText),
        quickActions: generateQuickActions(messageText),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 2000)
  }

  const generateSmartResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("pest") || message.includes("insect") || message.includes("bug")) {
      return "I can help you identify and manage pests! 🐛\n\nFor accurate pest identification, please:\n1. Take a clear photo of the affected plant\n2. Note the damage pattern\n3. Check the time of day when pests are most active\n\nCommon pests in Kerala include brown planthopper, leaf folder, and stem borer. Would you like specific treatment recommendations?"
    }

    if (message.includes("weather") || message.includes("rain") || message.includes("monsoon")) {
      return "🌦️ **Weather Advisory for Your Area:**\n\n• Heavy rain expected in next 24-48 hours\n• Temperature: 26-32°C\n• Humidity: 85-90%\n• Wind: 15-20 kmph\n\n**Farming Recommendations:**\n• Avoid spraying pesticides\n• Ensure proper drainage\n• Cover harvested crops\n• Postpone irrigation activities"
    }

    if (message.includes("market") || message.includes("price") || message.includes("sell")) {
      return "📈 **Current Market Prices (Kerala):**\n\n🌾 Rice: ₹2,800-3,200/quintal\n🥥 Coconut: ₹25-30/piece\n🌶️ Pepper: ₹450-500/kg\n🫚 Ginger: ₹180-220/kg\n\n**Market Trends:**\n• Rice prices stable due to good harvest\n• Spice prices increasing (export demand)\n• Best selling time: Next 2-3 weeks\n\nWould you like specific advice for your crops?"
    }

    return "Thank you for your question! I'm analyzing your farming situation based on:\n\n✅ Your location and climate\n✅ Current weather conditions\n✅ Seasonal farming calendar\n✅ Local market trends\n\nLet me provide you with the most relevant advice. Could you share more details about your specific concern?"
  }

  const generateSuggestions = (userMessage: string): string[] => {
    const message = userMessage.toLowerCase()

    if (message.includes("pest")) {
      return ["Upload pest photo", "Organic treatments", "Prevention tips", "Expert consultation"]
    }
    if (message.includes("weather")) {
      return ["7-day forecast", "Farming calendar", "Monsoon prep", "Crop protection"]
    }
    if (message.includes("market")) {
      return ["Price alerts", "Best selling time", "Quality tips", "Transport help"]
    }

    return ["More details", "Related topics", "Expert advice", "Set reminder"]
  }

  const generateQuickActions = (userMessage: string): { label: string; action: string }[] => {
    const message = userMessage.toLowerCase()

    if (message.includes("pest")) {
      return [
        { label: "Take photo", action: "camera" },
        { label: "Pest library", action: "pest_guide" },
        { label: "Find pesticide", action: "find_treatment" },
      ]
    }

    return [
      { label: "Set reminder", action: "reminder" },
      { label: "Save advice", action: "save" },
      { label: "Share", action: "share" },
    ]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false)
        setInputValue("My coconut trees have brown spots on leaves")
      }, 3000)
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
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="w-6 h-6 text-primary" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div>
                <h1 className="text-lg font-bold">Krishi Sakhi</h1>
                <p className="text-xs text-green-600">Online • Ready to help</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Enhanced Context Card */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-blue-500" />
                <div>
                  <span className="font-medium text-emerald-800">Weather:</span>
                  <div className="text-xs text-emerald-600">Heavy rain tomorrow</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-green-500" />
                <div>
                  <span className="font-medium text-emerald-800">Crop:</span>
                  <div className="text-xs text-emerald-600">Rice - Flowering</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <div>
                  <span className="font-medium text-emerald-800">Location:</span>
                  <div className="text-xs text-emerald-600">Kottayam, Kerala</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-500" />
                <div>
                  <span className="font-medium text-emerald-800">Season:</span>
                  <div className="text-xs text-emerald-600">Kharif 2024</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions Bar */}
      {messages.length <= 1 && (
        <div className="px-4 pb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActionTemplates.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 whitespace-nowrap bg-transparent"
                onClick={() => handleSendMessage(template.query)}
              >
                <template.icon className="w-4 h-4" />
                {template.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 px-4 pb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-2 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-emerald-100"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-emerald-600" />
                  )}
                </div>

                {/* Message Content */}
                <div className="space-y-2">
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-white border border-emerald-100 text-gray-800 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>

                  {/* Message Actions */}
                  <div
                    className={`flex items-center gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(message.timestamp)}
                    </span>
                    {message.hasAudio && message.type === "bot" && (
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Volume2 className="w-3 h-3 text-emerald-600" />
                      </Button>
                    )}
                    {message.type === "bot" && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  {message.quickActions && (
                    <div className="flex flex-wrap gap-2">
                      {message.quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2 bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="text-xs h-6 px-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
                          onClick={() => handleSendMessage(suggestion)}
                        >
                          <Lightbulb className="w-3 h-3 mr-1" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[85%]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-emerald-100">
                  <Bot className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="bg-white border border-emerald-100 p-3 rounded-lg rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Conversation Starters for New Users */}
      {messages.length <= 1 && (
        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Try asking:</h3>
          <div className="space-y-2">
            {conversationStarters.slice(0, 3).map((starter, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left h-auto p-2 bg-gray-50 hover:bg-gray-100"
                onClick={() => handleSendMessage(starter)}
              >
                <span className="text-sm text-gray-700">"{starter}"</span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Input Area */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-background border-t border-border">
        <div className="flex items-end gap-2">
          {/* Attachment Button */}
          <Button variant="ghost" size="sm" className="h-10 w-10 p-0 flex-shrink-0">
            <Paperclip className="w-4 h-4" />
          </Button>

          {/* Input Field */}
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about farming, weather, crops..."
              className="pr-20 min-h-[40px]"
              disabled={isTyping}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => {
                  /* Camera functionality */
                }}
              >
                <Camera className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 w-6 p-0 ${isRecording ? "text-red-500 animate-pulse" : "text-muted-foreground"}`}
                onClick={handleVoiceRecording}
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Send Button */}
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            size="sm"
            className="h-10 w-10 p-0 flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Recording Indicator */}
        {isRecording && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-500">Recording... Speak in Malayalam or English</span>
            <Button variant="ghost" size="sm" onClick={() => setIsRecording(false)}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Smart Suggestions */}
        {inputValue.length > 0 && (
          <div className="mt-2 flex gap-2 overflow-x-auto">
            <Badge variant="secondary" className="text-xs whitespace-nowrap">
              Press Enter to send
            </Badge>
            {inputValue.toLowerCase().includes("pest") && (
              <Badge variant="outline" className="text-xs whitespace-nowrap bg-blue-50 text-blue-700">
                💡 Consider uploading a photo
              </Badge>
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}

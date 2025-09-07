"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LanguageToggle } from "@/components/language-toggle"
import {
  ArrowLeft,
  Search,
  Calendar,
  Bug,
  BookOpen,
  Play,
  Star,
  Users,
  Download,
  Bookmark,
  TrendingUp,
  Leaf,
  Droplets,
  Sun,
  Filter,
  Heart,
  Share2,
  Clock,
  Award,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface KnowledgeItem {
  id: string
  title: string
  category:
    | "crop_calendar"
    | "pest_library"
    | "best_practices"
    | "weather_guide"
    | "market_trends"
    | "government_schemes"
  description: string
  image: string
  duration?: string
  type: "article" | "video" | "pdf" | "interactive"
  language: "english" | "malayalam" | "both"
  rating: number
  views: number
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  author: string
  publishedDate: string
}

const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: "1",
    title: "Rice Crop Calendar - Kharif Season",
    category: "crop_calendar",
    description: "Complete month-wise guide for rice cultivation from June to November with detailed activities",
    image: "/rice-farming-calendar-with-months.jpg",
    type: "article",
    language: "both",
    rating: 4.8,
    views: 2340,
    difficulty: "beginner",
    tags: ["rice", "kharif", "calendar", "cultivation"],
    author: "Dr. Ravi Menon",
    publishedDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Brown Planthopper Identification & Control",
    category: "pest_library",
    description: "Comprehensive guide to identify, prevent and control brown planthopper in rice crops",
    image: "/brown-planthopper-pest-identification-guide.jpg",
    type: "video",
    language: "both",
    duration: "15 min",
    rating: 4.9,
    views: 1890,
    difficulty: "intermediate",
    tags: ["pest", "rice", "planthopper", "control"],
    author: "Prof. Suma Nair",
    publishedDate: "2024-02-10",
  },
  {
    id: "3",
    title: "Organic Farming Techniques",
    category: "best_practices",
    description: "Sustainable farming methods for better soil health and increased crop yield",
    image: "/organic-farming-techniques-with-compost.jpg",
    duration: "12 min",
    type: "video",
    language: "malayalam",
    rating: 4.7,
    views: 3200,
    difficulty: "intermediate",
    tags: ["organic", "sustainable", "soil health", "compost"],
    author: "Krishnan Pillai",
    publishedDate: "2024-01-20",
  },
  {
    id: "4",
    title: "Coconut Cultivation Complete Guide",
    category: "crop_calendar",
    description: "Year-round care, maintenance schedule and harvesting guide for coconut palms",
    image: "/coconut-palm-cultivation-guide.jpg",
    type: "pdf",
    language: "both",
    rating: 4.6,
    views: 1560,
    difficulty: "beginner",
    tags: ["coconut", "cultivation", "maintenance", "harvesting"],
    author: "Dr. Priya Kumar",
    publishedDate: "2024-02-05",
  },
  {
    id: "5",
    title: "Leaf Folder Management in Rice",
    category: "pest_library",
    description: "Early detection, prevention and integrated treatment of leaf folder in rice crops",
    image: "/rice-leaf-folder-caterpillar-damage.jpg",
    type: "article",
    language: "both",
    rating: 4.5,
    views: 980,
    difficulty: "intermediate",
    tags: ["pest", "rice", "leaf folder", "IPM"],
    author: "Dr. Anand Raj",
    publishedDate: "2024-01-30",
  },
  {
    id: "6",
    title: "Smart Water Management in Rice",
    category: "best_practices",
    description: "Efficient irrigation techniques and water conservation methods for rice cultivation",
    image: "/rice-field-water-management-irrigation.jpg",
    duration: "18 min",
    type: "video",
    language: "malayalam",
    rating: 4.8,
    views: 2100,
    difficulty: "advanced",
    tags: ["irrigation", "water management", "rice", "conservation"],
    author: "Engineer Suresh",
    publishedDate: "2024-02-12",
  },
  {
    id: "7",
    title: "Pepper Cultivation Calendar",
    category: "crop_calendar",
    description: "Monthly activities for black pepper cultivation, pruning and harvesting schedule",
    image: "/black-pepper-cultivation-calendar.jpg",
    type: "interactive",
    language: "both",
    rating: 4.4,
    views: 1200,
    difficulty: "intermediate",
    tags: ["pepper", "spices", "cultivation", "pruning"],
    author: "Spice Board Kerala",
    publishedDate: "2024-01-25",
  },
  {
    id: "8",
    title: "Integrated Pest Management",
    category: "best_practices",
    description: "Holistic approach to pest control using biological, cultural and chemical methods",
    image: "/integrated-pest-management-farming.jpg",
    duration: "25 min",
    type: "video",
    language: "both",
    rating: 4.9,
    views: 2800,
    difficulty: "advanced",
    tags: ["IPM", "pest control", "biological", "sustainable"],
    author: "Dr. Maya Krishnan",
    publishedDate: "2024-02-08",
  },
  {
    id: "9",
    title: "Monsoon Weather Patterns & Farming",
    category: "weather_guide",
    description: "Understanding monsoon patterns and adapting farming practices for Kerala climate",
    image: "/monsoon-weather-farming-kerala.jpg",
    duration: "20 min",
    type: "video",
    language: "both",
    rating: 4.7,
    views: 1750,
    difficulty: "intermediate",
    tags: ["monsoon", "weather", "climate", "adaptation"],
    author: "Kerala Meteorological Dept",
    publishedDate: "2024-02-15",
  },
  {
    id: "10",
    title: "Market Price Analysis & Trends",
    category: "market_trends",
    description: "Understanding market dynamics and price forecasting for major crops in Kerala",
    image: "/market-price-analysis-crops.jpg",
    type: "article",
    language: "both",
    rating: 4.6,
    views: 1400,
    difficulty: "intermediate",
    tags: ["market", "prices", "trends", "forecasting"],
    author: "Agricultural Marketing Board",
    publishedDate: "2024-02-18",
  },
  {
    id: "11",
    title: "PM-KISAN & Farmer Schemes 2024",
    category: "government_schemes",
    description: "Complete guide to government schemes, subsidies and benefits available for farmers",
    image: "/government-farmer-schemes-2024.jpg",
    type: "pdf",
    language: "both",
    rating: 4.8,
    views: 3500,
    difficulty: "beginner",
    tags: ["schemes", "subsidy", "government", "benefits"],
    author: "Department of Agriculture",
    publishedDate: "2024-02-20",
  },
  {
    id: "12",
    title: "Soil Testing & Nutrient Management",
    category: "best_practices",
    description: "Comprehensive guide to soil testing, nutrient analysis and fertilizer recommendations",
    image: "/soil-testing-nutrient-management.jpg",
    duration: "22 min",
    type: "video",
    language: "malayalam",
    rating: 4.7,
    views: 1900,
    difficulty: "intermediate",
    tags: ["soil", "testing", "nutrients", "fertilizer"],
    author: "Soil Health Mission",
    publishedDate: "2024-02-22",
  },
  {
    id: "13",
    title: "Cardamom Cultivation in Western Ghats",
    category: "crop_calendar",
    description: "Complete guide for cardamom cultivation in hill stations with climate-specific techniques",
    image: "/cardamom-cultivation-western-ghats.jpg",
    type: "article",
    language: "both",
    rating: 4.9,
    views: 1650,
    difficulty: "advanced",
    tags: ["cardamom", "spices", "hills", "western ghats"],
    author: "Spice Research Institute",
    publishedDate: "2024-02-25",
  },
  {
    id: "14",
    title: "Banana Tissue Culture Techniques",
    category: "best_practices",
    description: "Modern propagation methods for disease-free banana cultivation using tissue culture",
    image: "/banana-tissue-culture-lab.jpg",
    duration: "30 min",
    type: "video",
    language: "malayalam",
    rating: 4.8,
    views: 2200,
    difficulty: "advanced",
    tags: ["banana", "tissue culture", "propagation", "disease-free"],
    author: "Kerala Agricultural University",
    publishedDate: "2024-02-28",
  },
  {
    id: "15",
    title: "Rubber Tapping Best Practices",
    category: "best_practices",
    description: "Optimal tapping techniques, yield maximization and tree health maintenance for rubber",
    image: "/rubber-tapping-techniques.jpg",
    type: "interactive",
    language: "both",
    rating: 4.7,
    views: 1800,
    difficulty: "intermediate",
    tags: ["rubber", "tapping", "yield", "maintenance"],
    author: "Rubber Board India",
    publishedDate: "2024-03-01",
  },
  {
    id: "16",
    title: "Cashew Processing & Value Addition",
    category: "market_trends",
    description: "Complete guide to cashew processing, quality grading and market opportunities",
    image: "/cashew-processing-value-addition.jpg",
    duration: "25 min",
    type: "video",
    language: "both",
    rating: 4.6,
    views: 1400,
    difficulty: "intermediate",
    tags: ["cashew", "processing", "value addition", "market"],
    author: "Cashew Export Promotion Council",
    publishedDate: "2024-03-03",
  },
  {
    id: "17",
    title: "Precision Agriculture with Drones",
    category: "best_practices",
    description: "Using drone technology for crop monitoring, spraying and precision farming techniques",
    image: "/drone-precision-agriculture.jpg",
    duration: "35 min",
    type: "video",
    language: "english",
    rating: 4.9,
    views: 3100,
    difficulty: "advanced",
    tags: ["drones", "precision", "technology", "monitoring"],
    author: "AgTech Solutions",
    publishedDate: "2024-03-05",
  },
  {
    id: "18",
    title: "Ginger & Turmeric Intercropping",
    category: "crop_calendar",
    description: "Maximizing land use efficiency through strategic intercropping of ginger and turmeric",
    image: "/ginger-turmeric-intercropping.jpg",
    type: "article",
    language: "both",
    rating: 4.5,
    views: 1200,
    difficulty: "intermediate",
    tags: ["ginger", "turmeric", "intercropping", "efficiency"],
    author: "Dr. Lakshmi Menon",
    publishedDate: "2024-03-07",
  },
  {
    id: "19",
    title: "Climate Change Adaptation Strategies",
    category: "weather_guide",
    description: "Adapting farming practices to changing climate patterns and extreme weather events",
    image: "/climate-change-farming-adaptation.jpg",
    duration: "28 min",
    type: "video",
    language: "both",
    rating: 4.8,
    views: 2500,
    difficulty: "intermediate",
    tags: ["climate change", "adaptation", "resilience", "weather"],
    author: "Climate Resilient Agriculture",
    publishedDate: "2024-03-10",
  },
  {
    id: "20",
    title: "Organic Certification Process",
    category: "government_schemes",
    description: "Step-by-step guide to obtain organic certification and access premium markets",
    image: "/organic-certification-process.jpg",
    type: "pdf",
    language: "both",
    rating: 4.7,
    views: 1900,
    difficulty: "beginner",
    tags: ["organic", "certification", "premium", "process"],
    author: "Organic Certification Agency",
    publishedDate: "2024-03-12",
  },
]

const categories = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "crop_calendar", label: "Crop Calendar", icon: Calendar },
  { id: "pest_library", label: "Pest Library", icon: Bug },
  { id: "best_practices", label: "Best Practices", icon: Leaf },
  { id: "weather_guide", label: "Weather Guide", icon: Sun },
  { id: "market_trends", label: "Market Trends", icon: TrendingUp },
  { id: "government_schemes", label: "Schemes", icon: Users },
]

const featuredTopics = [
  { title: "Monsoon Preparation", icon: Droplets, count: 12, color: "text-blue-600" },
  { title: "Pest Control", icon: Bug, count: 18, color: "text-red-600" },
  { title: "Organic Farming", icon: Leaf, count: 15, color: "text-green-600" },
  { title: "Market Analysis", icon: TrendingUp, count: 8, color: "text-purple-600" },
  { title: "Technology", icon: Zap, count: 6, color: "text-yellow-600" },
  { title: "Spice Cultivation", icon: Award, count: 10, color: "text-orange-600" },
]

const trendingSearches = [
  "Rice pest control",
  "Organic fertilizer",
  "Monsoon crops",
  "Market prices",
  "Government schemes",
  "Soil testing",
  "Irrigation methods",
  "Crop insurance",
]

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null)
  const [sortBy, setSortBy] = useState<"popular" | "recent" | "rating">("popular")
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  const filteredItems = mockKnowledgeItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      const matchesLanguage =
        selectedLanguage === "all" || item.language === selectedLanguage || item.language === "both"
      const matchesDifficulty = selectedDifficulty === "all" || item.difficulty === selectedDifficulty
      return matchesSearch && matchesCategory && matchesLanguage && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.views - a.views
        case "recent":
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const toggleBookmark = (itemId: string) => {
    setBookmarkedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "crop_calendar":
        return <Calendar className="w-4 h-4 text-green-500" />
      case "pest_library":
        return <Bug className="w-4 h-4 text-red-500" />
      case "best_practices":
        return <Leaf className="w-4 h-4 text-emerald-500" />
      case "weather_guide":
        return <Sun className="w-4 h-4 text-yellow-500" />
      case "market_trends":
        return <TrendingUp className="w-4 h-4 text-blue-500" />
      case "government_schemes":
        return <Users className="w-4 h-4 text-purple-500" />
      default:
        return <BookOpen className="w-4 h-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="w-4 h-4" />
      case "pdf":
        return <Download className="w-4 h-4" />
      case "interactive":
        return <Bookmark className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getLanguageBadge = (language: string) => {
    switch (language) {
      case "malayalam":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
            മലയാളം
          </Badge>
        )
      case "english":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            English
          </Badge>
        )
      case "both":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Both
          </Badge>
        )
      default:
        return null
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
            <div>
              <h1 className="text-xl font-bold">Knowledge Hub</h1>
              <p className="text-xs text-muted-foreground">{mockKnowledgeItems.length} resources available</p>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Enhanced Featured Topics */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-100">
          <h2 className="font-semibold text-emerald-800 mb-3">Featured Topics</h2>
          <div className="grid grid-cols-2 gap-3">
            {featuredTopics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-white rounded-lg border border-emerald-100 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <topic.icon className={`w-4 h-4 ${topic.color}`} />
                <div>
                  <div className="text-sm font-medium text-emerald-800">{topic.title}</div>
                  <div className="text-xs text-emerald-600">{topic.count} guides</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Search Bar with Trending */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, crop, pest, or keyword..."
              className="pl-10 pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {!searchQuery && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Trending:</span>
              {trendingSearches.slice(0, 4).map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6 px-2 bg-transparent"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </Button>
              ))}
            </div>
          )}
        </div>

        {showFilters && (
          <Card className="p-4 space-y-4">
            <h3 className="font-semibold">Filters</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full text-sm border rounded px-2 py-1 bg-background mt-1"
                >
                  <option value="all">All Languages</option>
                  <option value="english">English</option>
                  <option value="malayalam">Malayalam</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full text-sm border rounded px-2 py-1 bg-background mt-1"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedLanguage("all")
                setSelectedDifficulty("all")
                setShowFilters(false)
              }}
              className="bg-transparent"
            >
              Clear Filters
            </Button>
          </Card>
        )}

        {/* Sort Options */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory !== category.id ? "bg-transparent" : ""}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "popular" | "recent" | "rating")}
            className="text-sm border rounded px-2 py-1 bg-background"
          >
            <option value="popular">Most Popular</option>
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Knowledge Items Grid */}
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex gap-4">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-28 h-24 rounded-l-lg object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <div className="bg-black/70 rounded-full p-1 text-white">{getTypeIcon(item.type)}</div>
                    </div>
                    {item.type === "video" && item.duration && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {item.duration}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm line-clamp-2 flex-1 mr-2">{item.title}</h3>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(item.category)}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleBookmark(item.id)
                          }}
                          className="p-1 h-auto"
                        >
                          <Heart
                            className={`w-4 h-4 ${bookmarkedItems.includes(item.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                          />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

                    {/* Rating, Views, and Difficulty Indicators */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">{item.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">•</div>
                      <div className="text-xs text-muted-foreground">{item.views.toLocaleString()} views</div>
                      <Badge variant="outline" className={`text-xs ${getDifficultyColor(item.difficulty)}`}>
                        {item.difficulty}
                      </Badge>
                      {getLanguageBadge(item.language)}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground">by {item.author}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(item.publishedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent text-xs px-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Share functionality
                          }}
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent"
                          onClick={() => setSelectedItem(item)}
                        >
                          {item.type === "video" ? "Watch" : item.type === "pdf" ? "Download" : "Read"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No results found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or category filter</p>
          </div>
        )}
      </main>

      {/* Enhanced Knowledge Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {getCategoryIcon(selectedItem.category)}
                {selectedItem.title}
              </CardTitle>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{selectedItem.rating}</span>
                </div>
                <div className="text-sm text-muted-foreground">•</div>
                <div className="text-sm text-muted-foreground">{selectedItem.views.toLocaleString()} views</div>
                <Badge variant="outline" className={`text-xs ${getDifficultyColor(selectedItem.difficulty)}`}>
                  {selectedItem.difficulty}
                </Badge>
                {getLanguageBadge(selectedItem.language)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.title}
                  className="w-full h-40 rounded-lg object-cover"
                />
                {selectedItem.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {selectedItem.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">{selectedItem.description}</p>

              <div className="space-y-2">
                <h4 className="font-semibold">About this guide:</h4>
                <p className="text-sm text-muted-foreground">
                  This comprehensive resource covers all essential aspects with practical examples and step-by-step
                  instructions specifically designed for farmers in Kerala. Created by {selectedItem.author}.
                </p>
              </div>

              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Published: {new Date(selectedItem.publishedDate).toLocaleDateString()}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  {selectedItem.type === "video"
                    ? "Watch Now"
                    : selectedItem.type === "pdf"
                      ? "Download PDF"
                      : "Read Article"}
                </Button>
                <Button variant="outline" onClick={() => toggleBookmark(selectedItem.id)} className="bg-transparent">
                  <Heart
                    className={`w-4 h-4 ${bookmarkedItems.includes(selectedItem.id) ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
                <Button variant="outline" onClick={() => setSelectedItem(null)} className="bg-transparent">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <BottomNavigation />
    </div>
  )
}

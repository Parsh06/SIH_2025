"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { BottomNavigation } from "@/components/bottom-navigation"
import { LanguageToggle } from "@/components/language-toggle"
import { ArrowLeft, User, Phone, MapPin, Ruler, Mountain, Sprout, Droplets, Camera, LogOut, Save } from "lucide-react"
import Link from "next/link"

const soilTypes = ["Sandy Soil", "Clay Soil", "Loamy Soil", "Laterite Soil", "Black Soil", "Red Soil"]

const cropOptions = [
  "Rice",
  "Wheat",
  "Coconut",
  "Rubber",
  "Pepper",
  "Cardamom",
  "Tea",
  "Coffee",
  "Banana",
  "Vegetables",
]

const irrigationMethods = ["Canal Irrigation", "Borewell", "Rain-fed", "Drip Irrigation", "Sprinkler System"]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCrops, setSelectedCrops] = useState<string[]>(["Rice", "Coconut", "Pepper"])
  const [profileData, setProfileData] = useState({
    fullName: "Ravi Kumar",
    phone: "+91 9876543210",
    location: "Kottayam, Kerala",
    landSize: "5.2",
    soilType: "Laterite Soil",
    irrigationMethod: "Canal Irrigation",
  })

  const handleCropToggle = (crop: string) => {
    setSelectedCrops((prev) => (prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]))
  }

  const handleSave = () => {
    // Save profile data
    console.log("Saving profile:", { ...profileData, crops: selectedCrops })
    setIsEditing(false)
  }

  const handleLogout = () => {
    // Handle logout
    console.log("Logging out...")
    window.location.href = "/"
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
            <h1 className="text-xl font-bold">Profile & Settings</h1>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Button onClick={handleSave} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm" className="bg-transparent">
                Edit Profile
              </Button>
            )}
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Profile Picture & Basic Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    onClick={() => console.log("Change profile picture")}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold">{profileData.fullName}</h2>
                <p className="text-muted-foreground">Farmer • {profileData.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="fullName"
                value={profileData.fullName}
                onChange={(e) => setProfileData((prev) => ({ ...prev, fullName: e.target.value }))}
                disabled={!isEditing}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Location
              </Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        {/* Farm Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Farm Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Land Size */}
            <div className="space-y-2">
              <Label htmlFor="landSize" className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-primary" />
                Land Size (acres)
              </Label>
              <Input
                id="landSize"
                type="number"
                value={profileData.landSize}
                onChange={(e) => setProfileData((prev) => ({ ...prev, landSize: e.target.value }))}
                disabled={!isEditing}
                step="0.1"
                min="0"
              />
            </div>

            {/* Soil Type */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-primary" />
                Soil Type
              </Label>
              <Select
                value={profileData.soilType}
                onValueChange={(value) => setProfileData((prev) => ({ ...prev, soilType: value }))}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((soil) => (
                    <SelectItem key={soil} value={soil}>
                      {soil}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Irrigation Method */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-primary" />
                Irrigation Method
              </Label>
              <Select
                value={profileData.irrigationMethod}
                onValueChange={(value) => setProfileData((prev) => ({ ...prev, irrigationMethod: value }))}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {irrigationMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Crops Grown */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-primary" />
                Crops Grown
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {cropOptions.map((crop) => (
                  <div key={crop} className="flex items-center space-x-2">
                    <Checkbox
                      id={crop}
                      checked={selectedCrops.includes(crop)}
                      onCheckedChange={() => isEditing && handleCropToggle(crop)}
                      disabled={!isEditing}
                    />
                    <Label htmlFor={crop} className="text-sm font-normal">
                      {crop}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">App Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Language</Label>
                <p className="text-sm text-muted-foreground">Choose your preferred language</p>
              </div>
              <LanguageToggle />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive weather and farming alerts</p>
              </div>
              <Checkbox defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Voice Input</Label>
                <p className="text-sm text-muted-foreground">Enable voice commands in Malayalam</p>
              </div>
              <Checkbox defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Export Farm Data
              </Button>
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

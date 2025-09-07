"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/language-context"
import { Leaf, User, Phone, Lock, MapPin, Ruler, Mountain, Sprout, Droplets, Mic, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    landSize: "",
    soilType: "",
    irrigationMethod: "",
  })
  const { t } = useLanguage()

  const soilTypes = [
    { key: "alluvial", label: t("auth.signup.soilTypes.alluvial") },
    { key: "red", label: t("auth.signup.soilTypes.red") },
    { key: "black", label: t("auth.signup.soilTypes.black") },
    { key: "laterite", label: t("auth.signup.soilTypes.laterite") },
    { key: "coastal", label: t("auth.signup.soilTypes.coastal") },
  ]

  const cropOptions = [
    { key: "rice", label: t("auth.signup.crops.rice") },
    { key: "coconut", label: t("auth.signup.crops.coconut") },
    { key: "rubber", label: t("auth.signup.crops.rubber") },
    { key: "spices", label: t("auth.signup.crops.spices") },
    { key: "vegetables", label: t("auth.signup.crops.vegetables") },
  ]

  const irrigationMethods = [
    { key: "drip", label: t("auth.signup.irrigation.drip") },
    { key: "sprinkler", label: t("auth.signup.irrigation.sprinkler") },
    { key: "flood", label: t("auth.signup.irrigation.flood") },
    { key: "rainfed", label: t("auth.signup.irrigation.rainfed") },
  ]

  const handleCropToggle = (crop: string) => {
    setSelectedCrops((prev) => (prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", { ...formData, crops: selectedCrops })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-primary">{t("landing.title")}</h1>
        </Link>
        <LanguageToggle />
      </header>

      <div className="px-4 py-6">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">{t("auth.signup.title")}</CardTitle>
              <p className="text-muted-foreground">{t("auth.signup.subtitle")}</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    {t("auth.signup.fullName")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder={t("auth.signup.fullName")}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                    >
                      <Mic className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    {t("auth.signup.phone")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 9876543210"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    {t("auth.signup.password")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder={t("auth.signup.password")}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    {t("auth.signup.confirmPassword")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder={t("auth.signup.confirmPassword")}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {t("auth.signup.location")}
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder={t("auth.signup.location")}
                      className="flex-1"
                      required
                    />
                    <Button type="button" variant="outline" size="sm">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Land Size */}
                <div className="space-y-2">
                  <Label htmlFor="landSize" className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-primary" />
                    {t("auth.signup.landSize")}
                  </Label>
                  <Input
                    id="landSize"
                    type="number"
                    value={formData.landSize}
                    onChange={(e) => setFormData((prev) => ({ ...prev, landSize: e.target.value }))}
                    placeholder="e.g., 2.5"
                    step="0.1"
                    min="0"
                    required
                  />
                </div>

                {/* Soil Type */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-primary" />
                    {t("auth.signup.soilType")}
                  </Label>
                  <Select
                    value={formData.soilType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, soilType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("auth.signup.soilType")} />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((soil) => (
                        <SelectItem key={soil.key} value={soil.key}>
                          {soil.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Crops Grown */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-primary" />
                    {t("auth.signup.cropsGrown")}
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {cropOptions.map((crop) => (
                      <div key={crop.key} className="flex items-center space-x-2">
                        <Checkbox
                          id={crop.key}
                          checked={selectedCrops.includes(crop.key)}
                          onCheckedChange={() => handleCropToggle(crop.key)}
                        />
                        <Label htmlFor={crop.key} className="text-sm font-normal">
                          {crop.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Irrigation Method */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-primary" />
                    {t("auth.signup.irrigationMethod")}
                  </Label>
                  <Select
                    value={formData.irrigationMethod}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, irrigationMethod: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("auth.signup.irrigationMethod")} />
                    </SelectTrigger>
                    <SelectContent>
                      {irrigationMethods.map((method) => (
                        <SelectItem key={method.key} value={method.key}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  {t("common.signup")}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">{t("auth.signup.haveAccount")} </span>
                  <Link href="/signin" className="text-primary hover:underline font-medium">
                    {t("auth.signup.signinLink")}
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

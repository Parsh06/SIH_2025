"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/language-context"
import { Leaf, Phone, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    phoneOrEmail: "",
    password: "",
  })
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - redirect to dashboard
    console.log("Sign in:", formData)
    window.location.href = "/dashboard"
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

      <div className="px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">{t("common.welcome")}</h2>
            <p className="text-muted-foreground">{t("auth.signin.subtitle")}</p>
          </div>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{t("auth.signin.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Phone/Email */}
                <div className="space-y-2">
                  <Label htmlFor="phoneOrEmail" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    {t("auth.signin.email")}
                  </Label>
                  <Input
                    id="phoneOrEmail"
                    value={formData.phoneOrEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phoneOrEmail: e.target.value }))}
                    placeholder={t("auth.signin.email")}
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    {t("auth.signin.password")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder={t("auth.signin.password")}
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

                {/* Forgot Password */}
                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    {t("auth.signin.forgotPassword")}
                  </Link>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  {t("common.signin")}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">{t("auth.signin.noAccount")} </span>
                  <Link href="/signup" className="text-primary hover:underline font-medium">
                    {t("auth.signin.signupLink")}
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Help */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Need help getting started?</p>
            <Button variant="outline" size="sm" className="bg-transparent">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

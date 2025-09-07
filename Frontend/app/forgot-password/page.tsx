"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LanguageToggle } from "@/components/language-toggle"
import { Leaf, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle password reset
    console.log("Password reset for:", phoneNumber)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-primary">Krishi Sakhi</h1>
        </Link>
        <LanguageToggle />
      </header>

      <div className="px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Reset Password</CardTitle>
              <p className="text-muted-foreground">
                {isSubmitted ? "Check your phone for OTP" : "Enter your phone number to reset password"}
              </p>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send OTP
                  </Button>
                </form>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We've sent an OTP to {phoneNumber}. Please check your messages and follow the instructions to reset
                    your password.
                  </p>
                  <Button variant="outline" className="bg-transparent" onClick={() => setIsSubmitted(false)}>
                    Try Different Number
                  </Button>
                </div>
              )}

              <div className="mt-6 text-center">
                <Link href="/signin" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

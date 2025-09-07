"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ml" : "en")
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="gap-2 bg-transparent">
      <Globe className="w-4 h-4" />
      {language === "en" ? "English" : "മലയാളം"}
    </Button>
  )
}

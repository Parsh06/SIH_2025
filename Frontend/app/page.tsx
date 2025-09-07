"use client"

import { useState } from "react"
import { Preloader } from "@/components/preloader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/language-context"
import { Leaf, Sprout, Bell, BarChart3, Users, TrendingUp, Shield, Smartphone, Star, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [showPreloader, setShowPreloader] = useState(true)
  const { t } = useLanguage()

  if (showPreloader) {
    return <Preloader onComplete={() => setShowPreloader(false)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-primary">{t("landing.title")}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="hidden sm:flex">
            <Users className="w-3 h-3 mr-1" />
            {t("landing.stats.farmers")}
          </Badge>
          <LanguageToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
              <Sprout className="w-3 h-3 mr-1" />
              {t("landing.subtitle")}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-balance text-slate-800">{t("landing.description")}</h2>
            <p className="text-lg text-slate-600 text-pretty leading-relaxed max-w-2xl mx-auto">
              Get AI-powered farming advice, weather alerts, and crop management tools designed for modern farmers in
              Kerala. Join thousands of farmers already growing smarter.
            </p>
          </div>

          {/* Hero Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2">
              <img
                src="/farmer-working-in-green-fields-with-crops-and-sun.jpg"
                alt="Farmer working in green fields with crops under sunny sky"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <img
                src="/rice-farming-calendar-with-months.jpg"
                alt="Rice farming calendar showing seasonal activities"
                className="w-full h-30 md:h-38 object-cover rounded-xl shadow-md"
              />
              <img
                src="/coconut-palm-cultivation-guide.jpg"
                alt="Coconut palm cultivation techniques"
                className="w-full h-30 md:h-38 object-cover rounded-xl shadow-md"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-slate-600">{t("landing.stats.farmers").split(" ")[1]}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-slate-600">Acres Monitored</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-slate-600">{t("landing.stats.accuracy").split(" ")[1]} Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Powerful Features for Modern Farmers</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage your farm efficiently and increase your crop yield with AI-powered insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sprout className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{t("landing.features.ai.title")}</h4>
                <p className="text-sm text-muted-foreground mb-4">{t("landing.features.ai.description")}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  {t("landing.learnMore")} <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{t("landing.features.alerts.title")}</h4>
                <p className="text-sm text-muted-foreground mb-4">{t("landing.features.alerts.description")}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  {t("landing.learnMore")} <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{t("landing.features.activity.title")}</h4>
                <p className="text-sm text-muted-foreground mb-4">{t("landing.features.activity.description")}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  {t("landing.learnMore")} <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{t("landing.features.market.title")}</h4>
                <p className="text-sm text-muted-foreground mb-4">{t("landing.features.market.description")}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  {t("landing.learnMore")} <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{t("landing.features.pest.title")}</h4>
                <p className="text-sm text-muted-foreground mb-4">{t("landing.features.pest.description")}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  {t("landing.learnMore")} <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{t("landing.features.voice.title")}</h4>
                <p className="text-sm text-muted-foreground mb-4">{t("landing.features.voice.description")}</p>
                <div className="flex items-center text-primary text-sm font-medium">
                  {t("landing.learnMore")} <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{t("landing.howItWorks.title")}</h3>
            <p className="text-slate-600">{t("landing.howItWorks.description")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold text-lg mb-2">{t("landing.howItWorks.steps.signup.title")}</h4>
              <p className="text-slate-600">{t("landing.howItWorks.steps.signup.description")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold text-lg mb-2">{t("landing.howItWorks.steps.insights.title")}</h4>
              <p className="text-slate-600">{t("landing.howItWorks.steps.insights.description")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold text-lg mb-2">{t("landing.howItWorks.steps.track.title")}</h4>
              <p className="text-slate-600">{t("landing.howItWorks.steps.track.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{t("landing.testimonials.title")}</h3>
            <p className="text-slate-600">
              Real stories from farmers who transformed their agriculture with Krishi Sakhi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 mb-4">"{t("landing.testimonials.ravi.text")}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{t("landing.testimonials.ravi.name")}</div>
                    <div className="text-sm text-slate-500">{t("landing.testimonials.ravi.location")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 mb-4">"{t("landing.testimonials.priya.text")}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{t("landing.testimonials.priya.name")}</div>
                    <div className="text-sm text-slate-500">{t("landing.testimonials.priya.location")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-primary text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">{t("landing.cta.title")}</h3>
          <p className="text-primary-foreground/80 mb-8 text-lg">{t("landing.cta.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                {t("landing.getStarted")}
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                {t("common.signin")}
              </Button>
            </Link>
          </div>
          <p className="text-sm text-primary-foreground/60 mt-4">No credit card required • Free for first 30 days</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-6 h-6 text-primary" />
                <h4 className="font-bold">{t("landing.title")}</h4>
              </div>
              <p className="text-slate-400 text-sm">{t("landing.footer.description")}</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">{t("landing.footer.features.title")}</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>{t("landing.features.ai.title")}</li>
                <li>{t("landing.features.alerts.title")}</li>
                <li>{t("landing.features.pest.title")}</li>
                <li>{t("landing.features.market.title")}</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">{t("landing.footer.support.title")}</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>{t("landing.footer.support.helpCenter")}</li>
                <li>{t("landing.footer.support.contactUs")}</li>
                <li>{t("landing.footer.support.malayalamSupport")}</li>
                <li>{t("landing.footer.support.trainingVideos")}</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">{t("landing.footer.company.title")}</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>{t("landing.footer.company.aboutUs")}</li>
                <li>{t("landing.footer.company.privacyPolicy")}</li>
                <li>{t("landing.footer.company.termsOfService")}</li>
                <li>{t("landing.footer.company.careers")}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>{t("landing.footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

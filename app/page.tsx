"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthModal } from "@/components/auth-modal"
import {
  Activity,
  BarChart3,
  Bell,
  CheckCircle,
  Cloud,
  Database,
  Globe,
  Lock,
  Monitor,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null)

  const features = [
    {
      icon: Monitor,
      title: "Real-time Monitoring",
      description: "Monitor your sensors in real-time with live data updates and instant notifications.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get detailed insights with powerful charts and data visualization tools.",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Receive intelligent alerts when sensor values exceed your defined thresholds.",
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Secure cloud storage with automatic backups and data synchronization.",
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Access your dashboard from anywhere with our responsive mobile interface.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with encrypted data transmission and secure authentication.",
    },
  ]

  const stats = [
    { number: "10K+", label: "Active Sensors" },
    { number: "500+", label: "Happy Customers" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "IoT Engineer",
      company: "TechCorp",
      content:
        "SensorHub has revolutionized how we monitor our industrial sensors. The real-time alerts have prevented multiple system failures.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      company: "SmartFactory",
      content:
        "The analytics dashboard provides incredible insights. We've improved our efficiency by 40% since implementing SensorHub.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      company: "GreenTech",
      content:
        "The API integration was seamless, and the data export features make our analysis workflow much more efficient.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Activity className="h-4 w-4" />
              </div>
              SensorHub
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" onClick={() => setAuthModal("login")}>
                Log In
              </Button>
              <Button onClick={() => setAuthModal("signup")}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Zap className="h-3 w-3 mr-1" />
                  Real-time Sensor Monitoring
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Monitor Your Sensors <span className="text-primary">Like Never Before</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Advanced sensor monitoring platform with real-time analytics, intelligent alerts, and powerful data
                  visualization tools.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" onClick={() => setAuthModal("signup")}>
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  14-day free trial
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-card border rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Live Dashboard</h3>
                  <Badge variant="secondary" className="gap-1">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Live
                  </Badge>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Temperature</p>
                            <p className="font-semibold">23.5°C</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <Database className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Pressure</p>
                            <p className="font-semibold">1013 hPa</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Live Chart Visualization</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-blue-500/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

    
      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Activity className="h-4 w-4" />
                </div>
                SensorHub
              </div>
              <p className="text-muted-foreground">Advanced sensor monitoring platform for the modern world.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">© 2024 SensorHub. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Lock className="h-4 w-4 text-muted-foreground" />
              <Shield className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal !== null}
        onClose={() => setAuthModal(null)}
        mode={authModal || "login"}
        onModeChange={setAuthModal}
      />
    </div>
  )
}

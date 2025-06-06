"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer, Gauge, Activity, AlertTriangle } from "lucide-react"

export function MetricsCards() {
  const metrics = [
    {
      title: "Average Temperature",
      value: "23.5°C",
      change: "+2.1%",
      trend: "up",
      icon: Thermometer,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Average Pressure",
      value: "1013.2 hPa",
      change: "-0.5%",
      trend: "down",
      icon: Gauge,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Active Sensors",
      value: "12",
      change: "100%",
      trend: "stable",
      icon: Activity,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Alerts",
      value: "3",
      change: "+1",
      trend: "up",
      icon: AlertTriangle,
      color: "text-orange-600 dark:text-orange-400",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge
                variant={metric.trend === "up" ? "default" : metric.trend === "down" ? "destructive" : "secondary"}
                className="text-xs"
              >
                {metric.change}
              </Badge>
              from last period
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

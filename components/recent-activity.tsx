"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Thermometer, Gauge, AlertTriangle, CheckCircle } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "alert",
      message: "High temperature detected",
      sensor: "Sensor #3",
      time: "2 min ago",
      status: "critical",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      id: 2,
      type: "normal",
      message: "Pressure reading normalized",
      sensor: "Sensor #7",
      time: "5 min ago",
      status: "resolved",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 3,
      type: "update",
      message: "Temperature calibration completed",
      sensor: "Sensor #1",
      time: "12 min ago",
      status: "info",
      icon: Thermometer,
      color: "text-blue-500",
    },
    {
      id: 4,
      type: "maintenance",
      message: "Pressure sensor maintenance",
      sensor: "Sensor #5",
      time: "1 hour ago",
      status: "warning",
      icon: Gauge,
      color: "text-yellow-500",
    },
    {
      id: 5,
      type: "normal",
      message: "All systems operational",
      sensor: "System",
      time: "2 hours ago",
      status: "success",
      icon: CheckCircle,
      color: "text-green-500",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      critical: "destructive",
      warning: "secondary",
      info: "default",
      success: "default",
      resolved: "default",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest sensor events and system updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.message}</p>
                  {getStatusBadge(activity.status)}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activity.sensor}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

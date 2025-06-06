"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, Thermometer, Gauge, AlertTriangle, CheckCircle } from "lucide-react"

export function NotificationDropdown() {
  const [notifications] = useState([
    {
      id: 1,
      type: "alert",
      message: "High temperature detected",
      sensor: "Sensor #3",
      time: "2 min ago",
      status: "critical",
      icon: AlertTriangle,
      color: "text-red-500",
      unread: true,
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
      unread: true,
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
      unread: false,
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
      unread: false,
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
      unread: false,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <Badge variant="secondary">{unreadCount} new</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3">
              <div className={`mt-0.5 ${notification.color}`}>
                <notification.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{notification.message}</p>
                  {notification.unread && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{notification.sensor}</span>
                  <span>•</span>
                  <span>{notification.time}</span>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-sm text-muted-foreground">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

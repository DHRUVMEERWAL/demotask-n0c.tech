"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { Line } from "react-chartjs-2"

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface SensorChartProps {
  title: string
  type: "temperature" | "pressure"
  timeRange: string
}

export function SensorChart({ title, type, timeRange }: SensorChartProps) {
  const { theme } = useTheme()
  const chartRef = useRef<ChartJS<"line">>(null)

  const [labels, setLabels] = useState<string[]>([])
  const [data, setData] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  useEffect(() => {
    async function fetchSensorData() {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/api/sensors?type=${type}&range=${timeRange}`)
        if (!res.ok) throw new Error("Failed to fetch sensor data")
        const json = await res.json()
        setLabels(json.labels)
        setData(json.values)
      } catch (err) {
        console.error("Error loading sensor data:", err)
        setLabels([])
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchSensorData()
  }, [type, timeRange])

  const chartData = {
    labels,
    datasets: [
      {
        label: type === "temperature" ? "Temperature (°C)" : "Pressure (hPa)",
        data,
        borderColor: type === "temperature" ? "rgb(59, 130, 246)" : "rgb(16, 185, 129)",
        backgroundColor: type === "temperature"
          ? "rgba(59, 130, 246, 0.1)"
          : "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: type === "temperature" ? "rgb(59, 130, 246)" : "rgb(16, 185, 129)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255, 0.9)",
        titleColor: theme === "dark" ? "#fff" : "#000",
        bodyColor: theme === "dark" ? "#fff" : "#000",
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context: any) => `Time: ${context[0].label}`,
          label: (context: any) => {
            const unit = type === "temperature" ? "°C" : "hPa"
            return `${context.dataset.label}: ${context.parsed.y}${unit}`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
          ticks: {
            color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
            callback: function (value: any, index: number, values: any) {
              const raw = labels[index];
              const date = new Date(raw);

              if (timeRange === "1h" || timeRange === "24h") {
                return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // HH:MM
              }

              if (timeRange === "7d" || timeRange === "30d") {
                return date.toLocaleDateString([], { day: "numeric", month: "short" }); // e.g., 6 May
              }

              return raw;
            },
          },

      },
      y: {
        grid: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
          callback: (value: any) => {
            const unit = type === "temperature" ? "°C" : "hPa"
            return `${value}${unit}`
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Real-time sensor data for the last {timeRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Line ref={chartRef} data={chartData} options={options} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

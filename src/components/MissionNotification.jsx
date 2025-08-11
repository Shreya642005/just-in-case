"use client"

import { useEffect, useState } from "react"
import { X, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/Button";

export default function MissionNotification({ mission, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (mission) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [mission, onClose])

  if (!mission) return null

  return (
    <div
      className={`
        mission-notification fixed top-4 right-4 z-50 max-w-sm transition-all duration-300 transform
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <div className="bg-gray-900 border border-red-500/50 rounded-lg shadow-xl shadow-red-500/20 p-4">
        {/* Web animation overlay */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute -top-2 -right-2 w-16 h-16 opacity-20">
            <svg
              className="w-full h-full text-red-500 animate-spin"
              style={{ animationDuration: "3s" }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h4 className="text-red-400 font-bold text-sm">NEW MISSION DEPLOYED!</h4>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false)
                setTimeout(onClose, 300)
              }}
              className="text-gray-400 hover:text-white p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <h5 className="text-white font-medium mb-1">{mission.title}</h5>
          <p className="text-gray-300 text-sm mb-2 line-clamp-2">{mission.description}</p>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>📍 {mission.location}</span>
            <span
              className={`px-2 py-1 rounded font-medium ${
                mission.urgency === "critical"
                  ? "bg-red-500/20 text-red-400"
                  : mission.urgency === "high"
                    ? "bg-orange-500/20 text-orange-400"
                    : mission.urgency === "medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
              }`}
            >
              {mission.urgency.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

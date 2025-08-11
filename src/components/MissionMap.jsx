"use client"

import { useEffect, useRef, useState } from "react"

export default function MissionMap({ missions, selectedMissionId, onMissionSelect }) {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [leaflet, setLeaflet] = useState(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const loadLeaflet = async () => {
      try {
        const L = await import("leaflet")
        setLeaflet(L.default)

        // Fix for default markers
        delete L.default.Icon.Default.prototype._getIconUrl
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        })
      } catch (error) {
        console.error("Failed to load Leaflet:", error)
      }
    }

    loadLeaflet()
  }, [])

  useEffect(() => {
    if (!leaflet || !mapRef.current || map) return

    const newMap = leaflet.map(mapRef.current).setView([40.7589, -73.9851], 11)

    leaflet
      .tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: "abcd",
        maxZoom: 20,
      })
      .addTo(newMap)

    setMap(newMap)

    return () => {
      if (newMap) {
        newMap.remove()
      }
    }
  }, [leaflet])

  useEffect(() => {
    if (!map || !leaflet || !missions.length) return

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof leaflet.Marker) {
        map.removeLayer(layer)
      }
    })

    // Add new markers
    missions.forEach((mission) => {
      const urgencyValue = (mission.urgency || "low").toLowerCase()
      const statusValue = (mission.status || "completed").toUpperCase().replace("-", " ")

      const urgencyColors = {
        low: "#10b981",
        medium: "#f59e0b",
        high: "#f97316",
        critical: "#ef4444",
      }

      const coords = Array.isArray(mission.coordinates)
        ? mission.coordinates
        : mission.latitude && mission.longitude
          ? [parseFloat(mission.latitude), parseFloat(mission.longitude)]
          : null

      if (!coords || Number.isNaN(coords[0]) || Number.isNaN(coords[1])) {
        return
      }

      const customIcon = leaflet.divIcon({
        html: `
          <div class="relative">
            <div class="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center animate-pulse" 
                 style="background-color: ${urgencyColors[urgencyValue]}">
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            ${urgencyValue === "critical" ? '<div class="absolute inset-0 w-8 h-8 rounded-full border-2 border-red-400 animate-ping"></div>' : ""}
          </div>
        `,
        className: "custom-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      const marker = leaflet
        .marker(coords, { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div class="bg-gray-900 text-white p-3 rounded-lg min-w-64">
            <h3 class="font-bold text-lg mb-2 text-red-400">${mission.title || mission.missionTitle || "Untitled Mission"}</h3>
            <p class="text-sm text-gray-300 mb-2">${mission.description || mission.shortDescription || mission.fullDescription || "No description available."}</p>
            <div class="flex justify-between items-center text-xs text-gray-400">
              <span>📍 ${mission.location || mission.place || "Unknown location"}</span>
              <span>🕒 ${(mission.date || "Unknown date")} ${(mission.time || "00:00")}</span>
            </div>
            <div class="mt-2 flex gap-2">
              <span class="px-2 py-1 rounded text-xs font-medium" style="background-color: ${urgencyColors[urgencyValue]}20; color: ${urgencyColors[urgencyValue]}">
                ${urgencyValue.toUpperCase()}
              </span>
              <span class="px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300">
                ${statusValue}
              </span>
            </div>
          </div>
        `)
        .on("click", () => onMissionSelect && onMissionSelect(mission))

      // Highlight selected mission
      if (mission.id === selectedMissionId) {
        marker.openPopup()
      }
    })
  }, [missions, selectedMissionId, map, leaflet])

  return (
    <div className="mission-map relative">
      <div
        ref={mapRef}
        className="w-full h-96 lg:h-[600px] rounded-lg border border-gray-700/50 shadow-xl"
        style={{ background: "#1f2937" }}
      />
      <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-gray-700/50">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span>Live Mission Tracking</span>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { LucideSearch, X } from "lucide-react"

interface Location {
  lat: number
  lng: number
  address: string
}

interface InteractiveMapProps {
  onLocationSelect?: (location: Location) => void
  initialLocationName?: string
  className?: string
}

export function InteractiveMap({
  onLocationSelect,
  initialLocationName = "Mumbai",
  className = "",
}: InteractiveMapProps) {
  const [searchQuery, setSearchQuery] = useState(initialLocationName)
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    lat: 19.076,
    lng: 72.8777,
    address: "Mumbai, Maharashtra, India",
  })

  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Load Leaflet CSS only once
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(link)
    }

    const initMap = async () => {
      // Load Leaflet JS dynamically
      if (!window.L) {
        await new Promise((resolve) => {
          const script = document.createElement("script")
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          script.onload = resolve
          document.body.appendChild(script)
        })
      }

      if (!mapRef.current || leafletMapRef.current) return

      // Initialize map
      leafletMapRef.current = window.L.map(mapRef.current, { zoomControl: true }).setView(
        [selectedLocation.lat, selectedLocation.lng],
        13
      )

      // Add tiles
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(leafletMapRef.current)

      // Add marker
      markerRef.current = window.L.marker([selectedLocation.lat, selectedLocation.lng])
        .addTo(leafletMapRef.current)
        .bindPopup(selectedLocation.address)

      // ✅ Safely invalidate size after map is initialized
      const timer = setTimeout(() => {
        if (leafletMapRef.current) leafletMapRef.current.invalidateSize()
      }, 500)

      // Map click handler
      leafletMapRef.current.on("click", async (e: any) => {
        const { lat, lng } = e.latlng
        markerRef.current.setLatLng([lat, lng])

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          )
          const data = await response.json()
          const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`
          const newLocation = { lat, lng, address }

          setSelectedLocation(newLocation)
          setSearchQuery(address)
          onLocationSelect?.(newLocation)
          markerRef.current.bindPopup(address).openPopup()
        } catch (err) {
          console.error("Geocoding error:", err)
        }
      })

      return () => clearTimeout(timer)
    }

    initMap()

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1`
      )
      const data = await response.json()
      if (data && data.length > 0) {
        const result = data[0]
        const location = {
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          address: result.display_name,
        }

        setSelectedLocation(location)
        onLocationSelect?.(location)

        if (leafletMapRef.current && markerRef.current) {
          leafletMapRef.current.setView([location.lat, location.lng], 13)
          markerRef.current.setLatLng([location.lat, location.lng])
          markerRef.current.bindPopup(location.address).openPopup()
          // ✅ Ensure map tiles render correctly after moving
          leafletMapRef.current.invalidateSize()
        }
      }
    } catch (err) {
      console.error("Search error:", err)
    }
  }

  const handleClear = () => setSearchQuery("")

  return (
    <div className={`relative ${className}`}>
      {/* Search box inside map */}
      <div className="absolute top-3 left-12 z-[1000] w-72">
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search location..."
            className="bg-black border border-gray-400 text-white pl-3 pr-10 py-2 rounded-md shadow-md w-full"
          />
          <LucideSearch
            className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
            size={18}
            onClick={handleSearch}
          />
          {searchQuery && (
            <X
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
              size={18}
              onClick={handleClear}
            />
          )}
        </div>
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-300"
      />
    </div>
  )
}

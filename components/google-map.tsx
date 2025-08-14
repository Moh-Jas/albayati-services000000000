"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Navigation } from "lucide-react"

interface Restaurant {
  id: number
  name: string
  cuisine: string
  rating: number
  deliveryTime: string
  lat: number
  lng: number
  image?: string
  isOpen: boolean
}

interface GoogleMapProps {
  restaurants: Restaurant[]
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
  showControls?: boolean
  selectedRestaurant?: number | null
  onRestaurantSelect?: (restaurant: Restaurant) => void
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function GoogleMap({
  restaurants,
  center = { lat: 33.3152, lng: 44.3661 }, // Baghdad coordinates
  zoom = 12,
  height = "400px",
  showControls = true,
  selectedRestaurant,
  onRestaurantSelect,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<Restaurant | null>(null)

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&libraries=places`
      script.async = true
      script.defer = true

      window.initMap = () => {
        setIsLoaded(true)
        initializeMap()
      }

      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: "all",
            elementType: "geometry.fill",
            stylers: [{ color: "#1a1a1a" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#ffffff" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#1a1a1a" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#2b2b2b" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#059669" }],
          },
        ],
        disableDefaultUI: !showControls,
        zoomControl: showControls,
        streetViewControl: showControls,
        fullscreenControl: showControls,
      })

      setMap(mapInstance)
      createMarkers(mapInstance)
    }

    loadGoogleMaps()
  }, [])

  useEffect(() => {
    if (map && restaurants.length > 0) {
      createMarkers(map)
    }
  }, [map, restaurants])

  const createMarkers = (mapInstance: any) => {
    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))

    const newMarkers = restaurants.map((restaurant) => {
      const marker = new window.google.maps.Marker({
        position: { lat: restaurant.lat, lng: restaurant.lng },
        map: mapInstance,
        title: restaurant.name,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="${restaurant.isOpen ? "#059669" : "#6b7280"}" stroke="#ffffff" strokeWidth="2"/>
              <path d="M20 12L22.5 17H28L23.5 20.5L25.5 26L20 22.5L14.5 26L16.5 20.5L12 17H17.5L20 12Z" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(40, 40),
        },
      })

      marker.addListener("click", () => {
        setSelectedMarker(restaurant)
        if (onRestaurantSelect) {
          onRestaurantSelect(restaurant)
        }
      })

      return marker
    })

    setMarkers(newMarkers)
  }

  const centerOnRestaurant = (restaurant: Restaurant) => {
    if (map) {
      map.setCenter({ lat: restaurant.lat, lng: restaurant.lng })
      map.setZoom(15)
      setSelectedMarker(restaurant)
    }
  }

  if (!isLoaded) {
    return (
      <div className="bg-muted rounded-lg flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">جاري تحميل الخريطة...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full rounded-lg overflow-hidden" style={{ height }} />

      {selectedMarker && (
        <Card className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={selectedMarker.image || "/placeholder.svg"}
                  alt={selectedMarker.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">{selectedMarker.name}</h3>
                  <Badge variant={selectedMarker.isOpen ? "default" : "secondary"}>
                    {selectedMarker.isOpen ? "مفتوح" : "مغلق"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{selectedMarker.cuisine}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{selectedMarker.rating}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{selectedMarker.deliveryTime}</span>
                  </div>
                  <Button size="sm" disabled={!selectedMarker.isOpen}>
                    اطلب الآن
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Location Button */}
      <Button
        variant="secondary"
        size="sm"
        className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
        onClick={() => {
          if (navigator.geolocation && map) {
            navigator.geolocation.getCurrentPosition((position) => {
              const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }
              map.setCenter(userLocation)
              map.setZoom(15)
            })
          }
        }}
      >
        <Navigation className="w-4 h-4" />
      </Button>
    </div>
  )
}

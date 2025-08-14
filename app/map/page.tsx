"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, Clock, Filter } from "lucide-react"
import Link from "next/link"
import GoogleMap from "@/components/google-map"

const restaurants = [
  {
    id: 1,
    name: "مطعم البيت العراقي",
    cuisine: "مأكولات عراقية",
    rating: 4.8,
    deliveryTime: "25-35 دقيقة",
    lat: 33.3152,
    lng: 44.3661,
    image: "/placeholder-o5pja.png",
    isOpen: true,
    address: "شارع الرشيد، بغداد",
    phone: "+964 770 123 4567",
  },
  {
    id: 2,
    name: "بيت الشاورما",
    cuisine: "مشاوي وشاورما",
    rating: 4.6,
    deliveryTime: "20-30 دقيقة",
    lat: 33.32,
    lng: 44.37,
    image: "/shawarma-grilled-meat.png",
    isOpen: true,
    address: "شارع الكرادة، بغداد",
    phone: "+964 770 234 5678",
  },
  {
    id: 3,
    name: "مطعم الأصالة",
    cuisine: "مأكولات شرقية",
    rating: 4.9,
    deliveryTime: "30-40 دقيقة",
    lat: 33.31,
    lng: 44.36,
    image: "/placeholder-6o7cn.png",
    isOpen: true,
    address: "شارع المنصور، بغداد",
    phone: "+964 770 345 6789",
  },
  {
    id: 4,
    name: "مطعم البحر الأزرق",
    cuisine: "مأكولات بحرية",
    rating: 4.4,
    deliveryTime: "35-45 دقيقة",
    lat: 33.325,
    lng: 44.375,
    image: "/seafood-fish-dishes.png",
    isOpen: false,
    address: "شارع الجادرية، بغداد",
    phone: "+964 770 456 7890",
  },
  {
    id: 5,
    name: "مقهى ومطعم الجنة",
    cuisine: "مقهى ومشروبات",
    rating: 4.3,
    deliveryTime: "15-25 دقيقة",
    lat: 33.318,
    lng: 44.365,
    image: "/arabic-cafe-coffee-desserts.png",
    isOpen: true,
    address: "شارع الأعظمية، بغداد",
    phone: "+964 770 567 8901",
  },
  {
    id: 6,
    name: "مطعم الكبة والدولمة",
    cuisine: "مأكولات عراقية تقليدية",
    rating: 4.7,
    deliveryTime: "40-50 دقيقة",
    lat: 33.308,
    lng: 44.358,
    image: "/traditional-iraqi-kubba-dolma.png",
    isOpen: true,
    address: "شارع الكاظمية، بغداد",
    phone: "+964 770 678 9012",
  },
]

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null)
  const [showSidebar, setShowSidebar] = useState(true)

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleRestaurantSelect = (restaurant: any) => {
    setSelectedRestaurant(restaurant.id)
  }

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="/" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
                Al-Bayati0000
              </Link>
              <span className="text-sm text-muted-foreground">الخريطة</span>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="outline" size="sm" onClick={() => setShowSidebar(!showSidebar)} className="lg:hidden">
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="outline">تسجيل الدخول</Button>
              <Button>إنشاء حساب</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div
          className={`${showSidebar ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden bg-background border-r border-border`}
        >
          <div className="p-4 h-full overflow-y-auto">
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="ابحث عن مطعم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 rtl:pr-10 rtl:pl-4"
                />
              </div>
              <p className="text-sm text-muted-foreground">تم العثور على {filteredRestaurants.length} مطعم</p>
            </div>

            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
                <Card
                  key={restaurant.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedRestaurant === restaurant.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedRestaurant(restaurant.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base truncate">{restaurant.name}</CardTitle>
                        <CardDescription className="text-sm">{restaurant.cuisine}</CardDescription>
                      </div>
                      <Badge variant={restaurant.isOpen ? "default" : "secondary"} className="ml-2 rtl:mr-2 rtl:ml-0">
                        {restaurant.isOpen ? "مفتوح" : "مغلق"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
                        {restaurant.deliveryTime}
                      </div>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 ml-1 rtl:mr-1 rtl:ml-0" />
                      {restaurant.address}
                    </div>
                    <Link href={`/restaurant/${restaurant.id}`}>
                      <Button size="sm" className="w-full mt-3" disabled={!restaurant.isOpen}>
                        {restaurant.isOpen ? "عرض القائمة" : "مغلق"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-1">
          <GoogleMap
            restaurants={filteredRestaurants}
            height="100%"
            selectedRestaurant={selectedRestaurant}
            onRestaurantSelect={handleRestaurantSelect}
          />
        </div>
      </div>
    </div>
  )
}

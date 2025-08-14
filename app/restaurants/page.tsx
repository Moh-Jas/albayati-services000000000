"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Star, Clock, Truck, Filter, Heart } from "lucide-react"
import Link from "next/link"

const restaurants = [
  {
    id: 1,
    name: "مطعم البيت العراقي",
    cuisine: "مأكولات عراقية",
    rating: 4.8,
    reviewCount: 245,
    deliveryTime: "25-35 دقيقة",
    deliveryFee: "5000 دينار",
    image: "/placeholder-o5pja.png",
    tags: ["حلال", "عائلي", "تقليدي"],
    distance: "1.2 كم",
    isOpen: true,
    featured: true,
  },
  {
    id: 2,
    name: "بيت الشاورما",
    cuisine: "مشاوي وشاورما",
    rating: 4.6,
    reviewCount: 189,
    deliveryTime: "20-30 دقيقة",
    deliveryFee: "3000 دينار",
    image: "/shawarma-grilled-meat.png",
    tags: ["سريع", "مشاوي", "شاورما"],
    distance: "0.8 كم",
    isOpen: true,
    featured: false,
  },
  {
    id: 3,
    name: "مطعم الأصالة",
    cuisine: "مأكولات شرقية",
    rating: 4.9,
    reviewCount: 312,
    deliveryTime: "30-40 دقيقة",
    deliveryFee: "4000 دينار",
    image: "/placeholder-6o7cn.png",
    tags: ["فاخر", "تقليدي", "عائلي"],
    distance: "2.1 كم",
    isOpen: true,
    featured: true,
  },
  {
    id: 4,
    name: "مطعم البحر الأزرق",
    cuisine: "مأكولات بحرية",
    rating: 4.4,
    reviewCount: 156,
    deliveryTime: "35-45 دقيقة",
    deliveryFee: "6000 دينار",
    image: "/seafood-fish-dishes.png",
    tags: ["مأكولات بحرية", "طازج", "صحي"],
    distance: "3.5 كم",
    isOpen: false,
    featured: false,
  },
  {
    id: 5,
    name: "مقهى ومطعم الجنة",
    cuisine: "مقهى ومشروبات",
    rating: 4.3,
    reviewCount: 98,
    deliveryTime: "15-25 دقيقة",
    deliveryFee: "2000 دينار",
    image: "/arabic-cafe-coffee-desserts.png",
    tags: ["مقهى", "حلويات", "مشروبات"],
    distance: "1.8 كم",
    isOpen: true,
    featured: false,
  },
  {
    id: 6,
    name: "مطعم الكبة والدولمة",
    cuisine: "مأكولات عراقية تقليدية",
    rating: 4.7,
    reviewCount: 203,
    deliveryTime: "40-50 دقيقة",
    deliveryFee: "4500 دينار",
    image: "/traditional-iraqi-kubba-dolma.png",
    tags: ["تقليدي", "كبة", "دولمة"],
    distance: "2.8 كم",
    isOpen: true,
    featured: true,
  },
]

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (restaurantId: number) => {
    setFavorites((prev) =>
      prev.includes(restaurantId) ? prev.filter((id) => id !== restaurantId) : [...prev, restaurantId],
    )
  }

  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCuisine = selectedCuisine === "all" || restaurant.cuisine.includes(selectedCuisine)
      return matchesSearch && matchesCuisine
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "deliveryTime":
          return Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime)
        case "distance":
          return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        default:
          return 0
      }
    })

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
              <span className="text-sm text-muted-foreground">المطاعم</span>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button variant="outline">تسجيل الدخول</Button>
              <Button>إنشاء حساب</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="ابحث عن مطعم أو نوع طعام..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 rtl:pr-12 rtl:pl-4 h-12 text-lg"
              />
            </div>

            <div className="flex gap-4">
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="نوع المطبخ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المطابخ</SelectItem>
                  <SelectItem value="عراقية">مأكولات عراقية</SelectItem>
                  <SelectItem value="شرقية">مأكولات شرقية</SelectItem>
                  <SelectItem value="مشاوي">مشاوي وشاورما</SelectItem>
                  <SelectItem value="بحرية">مأكولات بحرية</SelectItem>
                  <SelectItem value="مقهى">مقاهي ومشروبات</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">التقييم</SelectItem>
                  <SelectItem value="deliveryTime">وقت التوصيل</SelectItem>
                  <SelectItem value="distance">المسافة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">تم العثور على {filteredRestaurants.length} مطعم</p>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
              المزيد من الفلاتر
            </Button>
          </div>
        </div>

        {/* Featured Restaurants */}
        {filteredRestaurants.some((r) => r.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">المطاعم المميزة</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants
                .filter((restaurant) => restaurant.featured)
                .map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    isFavorite={favorites.includes(restaurant.id)}
                    onToggleFavorite={() => toggleFavorite(restaurant.id)}
                  />
                ))}
            </div>
          </div>
        )}

        {/* All Restaurants */}
        <div>
          <h2 className="text-2xl font-bold mb-6">جميع المطاعم</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isFavorite={favorites.includes(restaurant.id)}
                onToggleFavorite={() => toggleFavorite(restaurant.id)}
              />
            ))}
          </div>
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">لم يتم العثور على مطاعم تطابق بحثك</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("")
                setSelectedCuisine("all")
              }}
            >
              إعادة تعيين البحث
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function RestaurantCard({
  restaurant,
  isFavorite,
  onToggleFavorite,
}: {
  restaurant: (typeof restaurants)[0]
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm group">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto">
          <Button
            variant="secondary"
            size="sm"
            className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm"
            onClick={onToggleFavorite}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </Button>
        </div>
        {restaurant.featured && (
          <Badge className="absolute top-4 left-4 rtl:right-4 rtl:left-auto bg-primary">مميز</Badge>
        )}
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">مغلق</Badge>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{restaurant.name}</span>
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
            <span className="text-xs text-muted-foreground">({restaurant.reviewCount})</span>
          </div>
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>{restaurant.cuisine}</span>
          <span className="text-xs flex items-center">
            <MapPin className="w-3 h-3 ml-1 rtl:mr-1 rtl:ml-0" />
            {restaurant.distance}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-1 mb-4">
          {restaurant.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
            {restaurant.deliveryTime}
          </div>
          <div className="flex items-center">
            <Truck className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
            {restaurant.deliveryFee}
          </div>
        </div>

        <Link href={`/restaurant/${restaurant.id}`}>
          <Button className="w-full" disabled={!restaurant.isOpen}>
            {restaurant.isOpen ? "عرض القائمة" : "مغلق"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

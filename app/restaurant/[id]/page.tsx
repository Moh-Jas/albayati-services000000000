"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, Clock, Truck, Heart, Plus, Minus, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import GoogleMap from "@/components/google-map"

const restaurantData = {
  1: {
    name: "مطعم البيت العراقي",
    cuisine: "مأكولات عراقية",
    rating: 4.8,
    reviewCount: 245,
    deliveryTime: "25-35 دقيقة",
    deliveryFee: "5000 دينار",
    image: "/placeholder-s4fab.png",
    description: "مطعم عراقي أصيل يقدم أشهى الأطباق التقليدية بنكهات أصيلة وجودة عالية",
    address: "شارع الرشيد، بغداد",
    phone: "+964 770 123 4567",
    tags: ["حلال", "عائلي", "تقليدي"],
    distance: "1.2 كم",
    lat: 33.3152,
    lng: 44.3661,
    isOpen: true,
    menu: {
      "الأطباق الرئيسية": [
        {
          id: 1,
          name: "كبة حلب",
          description: "كبة مقلية محشوة باللحم والبصل مع التوابل العراقية الأصيلة",
          price: "8000 دينار",
          image: "/kubba-halab.png",
        },
        {
          id: 2,
          name: "دولمة عراقية",
          description: "أوراق عنب محشوة بالأرز واللحم مع الخضار والتوابل",
          price: "12000 دينار",
          image: "/iraqi-dolma.png",
        },
        {
          id: 3,
          name: "مسگوف عراقي",
          description: "سمك مشوي على الطريقة العراقية الأصيلة مع الأرز الأبيض",
          price: "25000 دينار",
          image: "/masgouf-grilled-fish.png",
        },
      ],
      المقبلات: [
        {
          id: 4,
          name: "حمص بالطحينة",
          description: "حمص كريمي مع الطحينة وزيت الزيتون والبقدونس",
          price: "4000 دينار",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: 5,
          name: "فتوش عراقي",
          description: "سلطة خضار مشكلة مع الخبز المحمص والسماق",
          price: "5000 دينار",
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
      المشروبات: [
        {
          id: 6,
          name: "شاي عراقي",
          description: "شاي أحمر عراقي أصيل مع السكر",
          price: "1500 دينار",
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: 7,
          name: "عصير تمر هندي",
          description: "عصير تمر هندي طبيعي منعش",
          price: "3000 دينار",
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
  },
}

export default function RestaurantPage() {
  const params = useParams()
  const restaurantId = Number.parseInt(params.id as string)
  const restaurant = restaurantData[restaurantId as keyof typeof restaurantData]
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [isFavorite, setIsFavorite] = useState(false)

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">المطعم غير موجود</h1>
          <Link href="/restaurants">
            <Button>العودة للمطاعم</Button>
          </Link>
        </div>
      </div>
    )
  }

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }))
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const restaurantForMap = {
    id: restaurant.id || 1,
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    rating: restaurant.rating,
    deliveryTime: restaurant.deliveryTime,
    lat: restaurant.lat,
    lng: restaurant.lng,
    image: restaurant.image,
    isOpen: restaurant.isOpen,
  }

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Link href="/restaurants" className="text-2xl font-bold text-primary hover:text-accent transition-colors">
                Al-Bayati0000
              </Link>
              <ArrowRight className="w-4 h-4 text-muted-foreground rotate-180 rtl:rotate-0" />
              <span className="text-sm text-muted-foreground truncate">{restaurant.name}</span>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {getTotalItems() > 0 && <Button className="relative">السلة ({getTotalItems()})</Button>}
              <Button variant="outline">تسجيل الدخول</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Restaurant Hero */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
                <p className="text-lg opacity-90 mb-2">{restaurant.cuisine}</p>
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 ml-1 rtl:mr-1 rtl:ml-0" />
                    {restaurant.rating} ({restaurant.reviewCount} تقييم)
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
                    {restaurant.deliveryTime}
                  </div>
                  <div className="flex items-center">
                    <Truck className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
                    {restaurant.deliveryFee}
                  </div>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="bg-background/80 backdrop-blur-sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Restaurant Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <p className="text-muted-foreground mb-4">{restaurant.description}</p>
            <div className="flex flex-wrap gap-2">
              {restaurant.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 text-muted-foreground" />
              {restaurant.address}
            </div>
            <div className="flex items-center">
              <span className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 text-muted-foreground">📞</span>
              {restaurant.phone}
            </div>
          </div>
        </div>

        {/* Restaurant Location Map */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">موقع المطعم</h3>
          <GoogleMap
            restaurants={[restaurantForMap]}
            center={{ lat: restaurant.lat, lng: restaurant.lng }}
            zoom={15}
            height="300px"
            showControls={true}
          />
        </div>

        {/* Menu */}
        <Tabs defaultValue="الأطباق الرئيسية" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {Object.keys(restaurant.menu).map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(restaurant.menu).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden bg-card/50 backdrop-blur-sm">
                    <div className="flex">
                      <div className="w-32 h-32 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <CardHeader className="p-0 mb-2">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription className="text-sm">{item.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-primary">{item.price}</span>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              {cart[item.id] > 0 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-8 h-8 p-0 bg-transparent"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                              )}
                              {cart[item.id] > 0 && <span className="w-8 text-center">{cart[item.id]}</span>}
                              <Button size="sm" className="w-8 h-8 p-0" onClick={() => addToCart(item.id)}>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Floating Cart Button */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Button size="lg" className="shadow-lg">
            عرض السلة ({getTotalItems()} عنصر)
          </Button>
        </div>
      )}
    </div>
  )
}

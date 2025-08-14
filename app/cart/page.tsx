"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Trash2, ArrowRight, ShoppingCart, MapPin, Clock } from "lucide-react"
import Link from "next/link"

// Mock cart data - in real app this would come from state management
const initialCartItems = [
  {
    id: 1,
    restaurantId: 1,
    restaurantName: "مطعم البيت العراقي",
    name: "كبة حلب",
    price: 8000,
    quantity: 2,
    image: "/kubba-halab.png",
    notes: "",
  },
  {
    id: 2,
    restaurantId: 1,
    restaurantName: "مطعم البيت العراقي",
    name: "دولمة عراقية",
    price: 12000,
    quantity: 1,
    image: "/iraqi-dolma.png",
    notes: "بدون ملح إضافي",
  },
  {
    id: 6,
    restaurantId: 1,
    restaurantName: "مطعم البيت العراقي",
    name: "شاي عراقي",
    price: 1500,
    quantity: 3,
    image: "/placeholder.svg?height=150&width=200",
    notes: "",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateNotes = (itemId: number, notes: string) => {
    setCartItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, notes } : item)))
  }

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoDiscount(0.1) // 10% discount
    } else if (promoCode.toLowerCase() === "first20") {
      setPromoDiscount(0.2) // 20% discount
    } else {
      setPromoDiscount(0)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 5000
  const discount = subtotal * promoDiscount
  const total = subtotal + deliveryFee - discount

  if (cartItems.length === 0) {
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
                <ArrowRight className="w-4 h-4 text-muted-foreground rotate-180 rtl:rotate-0" />
                <span className="text-sm text-muted-foreground">السلة</span>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">سلتك فارغة</h1>
            <p className="text-muted-foreground mb-8">ابدأ بإضافة بعض الأطباق اللذيذة من مطاعمنا المميزة</p>
            <Link href="/restaurants">
              <Button size="lg">تصفح المطاعم</Button>
            </Link>
          </div>
        </div>
      </div>
    )
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
              <ArrowRight className="w-4 h-4 text-muted-foreground rotate-180 rtl:rotate-0" />
              <span className="text-sm text-muted-foreground">السلة ({cartItems.length} عنصر)</span>
            </div>
            <Button variant="outline">تسجيل الدخول</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">سلة التسوق</h1>

            {/* Restaurant Group */}
            <Card className="mb-6 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{cartItems[0].restaurantName}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
                      شارع الرشيد، بغداد
                      <Clock className="w-4 h-4 ml-3 rtl:mr-3 rtl:ml-1" />
                      25-35 دقيقة
                    </CardDescription>
                  </div>
                  <Link href={`/restaurant/${cartItems[0].restaurantId}`}>
                    <Button variant="outline" size="sm">
                      إضافة المزيد
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start space-x-4 rtl:space-x-reverse p-4 rounded-lg border border-border/50"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{item.name}</h3>
                        <p className="text-primary font-medium">{item.price.toLocaleString()} دينار</p>

                        <div className="mt-2">
                          <Input
                            placeholder="ملاحظات خاصة..."
                            value={item.notes}
                            onChange={(e) => updateNotes(item.id, e.target.value)}
                            className="text-sm h-8"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive p-1"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">كود الخصم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="أدخل كود الخصم"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={applyPromoCode} variant="outline">
                    تطبيق
                  </Button>
                </div>
                {promoDiscount > 0 && (
                  <div className="mt-2">
                    <Badge variant="default">تم تطبيق خصم {(promoDiscount * 100).toFixed(0)}%</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal.toLocaleString()} دينار</span>
                </div>

                <div className="flex justify-between">
                  <span>رسوم التوصيل</span>
                  <span>{deliveryFee.toLocaleString()} دينار</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-accent">
                    <span>الخصم</span>
                    <span>-{discount.toLocaleString()} دينار</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع الكلي</span>
                  <span className="text-primary">{total.toLocaleString()} دينار</span>
                </div>

                <Link href="/checkout">
                  <Button size="lg" className="w-full">
                    متابعة للدفع
                    <ArrowRight className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 rotate-180 rtl:rotate-0" />
                  </Button>
                </Link>

                <div className="text-center text-sm text-muted-foreground">
                  <p>وقت التوصيل المتوقع: 25-35 دقيقة</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

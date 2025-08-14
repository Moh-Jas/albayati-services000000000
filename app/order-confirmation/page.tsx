"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, MapPin, Phone, Truck, User, ArrowRight } from "lucide-react"
import Link from "next/link"

const orderStatuses = [
  { id: 1, status: "تم تأكيد الطلب", completed: true, time: "14:30" },
  { id: 2, status: "جاري التحضير", completed: true, time: "14:35" },
  { id: 3, status: "جاهز للتوصيل", completed: false, time: "" },
  { id: 4, status: "في الطريق إليك", completed: false, time: "" },
  { id: 5, status: "تم التوصيل", completed: false, time: "" },
]

export default function OrderConfirmationPage() {
  const [currentStatus, setCurrentStatus] = useState(2)
  const [estimatedTime, setEstimatedTime] = useState(23) // minutes

  useEffect(() => {
    // Simulate order progress
    const timer = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1))
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const orderDetails = {
    id: "ORD-2024-001234",
    restaurant: "مطعم البيت العراقي",
    restaurantPhone: "+964 770 123 4567",
    items: [
      { name: "كبة حلب", quantity: 2, price: 16000 },
      { name: "دولمة عراقية", quantity: 1, price: 12000 },
      { name: "شاي عراقي", quantity: 3, price: 4500 },
    ],
    subtotal: 32500,
    deliveryFee: 5000,
    total: 37500,
    deliveryAddress: "شارع الرشيد، بناية 15، الطابق الثالث، بغداد",
    customerName: "أحمد محمد",
    customerPhone: "+964 770 987 6543",
    paymentMethod: "نقداً عند التوصيل",
    orderTime: "14:30",
    estimatedDelivery: "15:00",
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
              <span className="text-sm text-muted-foreground">تأكيد الطلب</span>
            </div>
            <Button variant="outline">تسجيل الدخول</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">تم تأكيد طلبك بنجاح!</h1>
          <p className="text-muted-foreground mb-4">
            رقم الطلب: <span className="font-mono font-medium">{orderDetails.id}</span>
          </p>
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0 text-primary" />
              <span>الوقت المتبقي: {estimatedTime} دقيقة</span>
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0 text-accent" />
              <span>التوصيل المتوقع: {orderDetails.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2">
            <Card className="mb-6 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>حالة الطلب</CardTitle>
                <CardDescription>تتبع مراحل تحضير وتوصيل طلبك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderStatuses.map((status, index) => (
                    <div key={status.id} className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          status.completed
                            ? "bg-primary text-primary-foreground"
                            : index === currentStatus
                              ? "bg-accent text-accent-foreground animate-pulse"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {status.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-bold">{status.id}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            status.completed || index === currentStatus ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {status.status}
                        </p>
                        {status.time && <p className="text-sm text-muted-foreground">{status.time}</p>}
                      </div>
                      {index === currentStatus && (
                        <Badge variant="default" className="animate-pulse">
                          جاري التنفيذ
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                  معلومات التوصيل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">العنوان</Label>
                  <p className="mt-1">{orderDetails.deliveryAddress}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">اسم المستلم</Label>
                    <div className="flex items-center mt-1">
                      <User className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 text-muted-foreground" />
                      {orderDetails.customerName}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">رقم الهاتف</Label>
                    <div className="flex items-center mt-1">
                      <Phone className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 text-muted-foreground" />
                      {orderDetails.customerPhone}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>تفاصيل الطلب</CardTitle>
                <CardDescription>{orderDetails.restaurant}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>{item.price.toLocaleString()} دينار</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span>{orderDetails.subtotal.toLocaleString()} دينار</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم التوصيل</span>
                    <span>{orderDetails.deliveryFee.toLocaleString()} دينار</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع الكلي</span>
                  <span className="text-primary">{orderDetails.total.toLocaleString()} دينار</span>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    <strong>طريقة الدفع:</strong> {orderDetails.paymentMethod}
                  </p>
                  <p>
                    <strong>وقت الطلب:</strong> {orderDetails.orderTime}
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                    اتصل بالمطعم
                  </Button>
                  <Link href="/restaurants">
                    <Button variant="outline" className="w-full bg-transparent">
                      طلب جديد
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className, ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`}
      {...props}
    >
      {children}
    </label>
  )
}

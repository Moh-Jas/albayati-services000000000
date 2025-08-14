"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { MapPin, CreditCard, Wallet, ArrowRight, Clock, User, Phone } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cash")

  // Mock order data
  const orderSummary = {
    items: [
      { name: "كبة حلب", quantity: 2, price: 16000 },
      { name: "دولمة عراقية", quantity: 1, price: 12000 },
      { name: "شاي عراقي", quantity: 3, price: 4500 },
    ],
    subtotal: 32500,
    deliveryFee: 5000,
    discount: 0,
    total: 37500,
    restaurant: "مطعم البيت العراقي",
    estimatedTime: "25-35 دقيقة",
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle order submission
    window.location.href = "/order-confirmation"
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
              <Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground">
                السلة
              </Link>
              <ArrowRight className="w-4 h-4 text-muted-foreground rotate-180 rtl:rotate-0" />
              <span className="text-sm text-muted-foreground">الدفع</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">إتمام الطلب</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Information */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                    معلومات التوصيل
                  </CardTitle>
                  <CardDescription>أدخل عنوانك ومعلومات الاتصال للتوصيل</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <div className="relative">
                        <User className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="name"
                          placeholder="أدخل اسمك الكامل"
                          value={deliveryInfo.name}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                          className="pl-4 rtl:pr-10 rtl:pl-4"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف</Label>
                      <div className="relative">
                        <Phone className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="phone"
                          placeholder="07XX XXX XXXX"
                          value={deliveryInfo.phone}
                          onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                          className="pl-4 rtl:pr-10 rtl:pl-4"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">العنوان التفصيلي</Label>
                    <Textarea
                      id="address"
                      placeholder="أدخل عنوانك التفصيلي مع اسم المنطقة والشارع ورقم البيت"
                      value={deliveryInfo.address}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                    <Textarea
                      id="notes"
                      placeholder="أي ملاحظات خاصة للتوصيل..."
                      value={deliveryInfo.notes}
                      onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
                    طريقة الدفع
                  </CardTitle>
                  <CardDescription>اختر طريقة الدفع المناسبة لك</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse p-4 rounded-lg border border-border/50 hover:bg-accent/5 transition-colors">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">الدفع نقداً عند التوصيل</p>
                            <p className="text-sm text-muted-foreground">ادفع للمندوب عند استلام الطلب</p>
                          </div>
                          <Wallet className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse p-4 rounded-lg border border-border/50 hover:bg-accent/5 transition-colors opacity-50">
                      <RadioGroupItem value="card" id="card" disabled />
                      <Label htmlFor="card" className="flex-1 cursor-not-allowed">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">الدفع بالبطاقة الائتمانية</p>
                            <p className="text-sm text-muted-foreground">قريباً - غير متاح حالياً</p>
                          </div>
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full">
                تأكيد الطلب
                <ArrowRight className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 rotate-180 rtl:rotate-0" />
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
                <CardDescription className="flex items-center">
                  <Clock className="w-4 h-4 ml-1 rtl:mr-1 rtl:ml-0" />
                  {orderSummary.estimatedTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{orderSummary.restaurant}</h4>
                  <div className="space-y-2">
                    {orderSummary.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>{item.price.toLocaleString()} دينار</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span>{orderSummary.subtotal.toLocaleString()} دينار</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم التوصيل</span>
                    <span>{orderSummary.deliveryFee.toLocaleString()} دينار</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع الكلي</span>
                  <span className="text-primary">{orderSummary.total.toLocaleString()} دينار</span>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  <p>بالضغط على "تأكيد الطلب" فإنك توافق على شروط الخدمة</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Map } from "lucide-react"
import Link from "next/link"

const sampleRestaurants = [
  {
    id: 1,
    name: "مطعم البيت العراقي",
    cuisine: "مأكولات عراقية",
    rating: 4.8,
    deliveryTime: "25-35 دقيقة",
    lat: 33.3152,
    lng: 44.3661,
    image: "/placeholder-5yav9.png",
    isOpen: true,
  },
  {
    id: 2,
    name: "بيت الشاورما",
    cuisine: "مشاوي وشاورما",
    rating: 4.6,
    deliveryTime: "20-30 دقيقة",
    lat: 33.32,
    lng: 44.37,
    image: "/shawarma-restaurant.png",
    isOpen: true,
  },
  {
    id: 3,
    name: "مطعم الأصالة",
    cuisine: "مأكولات شرقية",
    rating: 4.9,
    deliveryTime: "30-40 دقيقة",
    lat: 33.31,
    lng: 44.36,
    image: "/middle-eastern-restaurant.png",
    isOpen: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <h1 className="text-2xl font-bold text-primary">Al-Bayati0000</h1>
              <span className="text-sm text-muted-foreground">توصيل الطعام</span>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative hidden md:block">
                <Search className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="ابحث عن مطعم أو طبق..." className="pl-10 rtl:pr-10 rtl:pl-4 w-64" />
              </div>
              <Link href="/map">
                <Button variant="outline">
                  <Map className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                  الخريطة
                </Button>
              </Link>
              <Button variant="outline">تسجيل الدخول</Button>
              <Button>إنشاء حساب</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            أشهى الأطباق إلى باب منزلك
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            اكتشف أفضل المطاعم في مدينتك واطلب طعامك المفضل مع خدمة توصيل سريعة وموثوقة
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto mb-12">
            <div className="relative flex-1">
              <MapPin className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input placeholder="أدخل عنوانك..." className="pl-4 rtl:pr-12 rtl:pl-4 h-12 text-lg" />
            </div>
            <Link href="/restaurants">
              <Button size="lg" className="h-12 px-8">
                ابحث عن المطاعم
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

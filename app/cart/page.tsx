"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Calendar, Clock, MapPin, Tag, ShoppingBag } from "lucide-react"

const CONVENIENCE_FEE_PERCENT = 0.03

export default function CartPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, removeItem, getTotal, clearCart } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)

  const subtotal = getTotal()
  const convenienceFee = Math.round(subtotal * CONVENIENCE_FEE_PERCENT)
  const total = subtotal + convenienceFee - promoDiscount

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "luxe10") {
      const discount = Math.round(subtotal * 0.1)
      setPromoDiscount(discount)
      setPromoApplied(true)
      toast({
        title: "Promo Applied!",
        description: `You saved ₹${discount} with code LUXE10`,
      })
    } else if (promoCode.toLowerCase() === "first50") {
      const discount = 50
      setPromoDiscount(discount)
      setPromoApplied(true)
      toast({
        title: "Promo Applied!",
        description: "You saved ₹50 with code FIRST50",
      })
    } else {
      toast({
        title: "Invalid Code",
        description: "This promo code is not valid. Try LUXE10 or FIRST50.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to complete your booking.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Browse events and add tickets to your cart</p>
          <Button asChild className="mt-6">
            <Link href="/">Explore Events</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 font-serif text-3xl font-bold">Your Cart</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.eventImage || "/placeholder.svg"}
                          alt={item.eventTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{item.eventTitle}</h3>
                            <p className="text-sm capitalize text-muted-foreground">
                              {item.seatTier} Tier
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.eventDate).toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.eventTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {item.venue}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-sm">
                            Seats: <span className="font-medium">{item.seats.join(", ")}</span>
                          </p>
                          <p className="font-semibold text-primary">₹{item.totalPrice}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">Promo Code</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <Button
                        variant="outline"
                        onClick={applyPromoCode}
                        disabled={!promoCode || promoApplied}
                      >
                        <Tag className="mr-2 h-4 w-4" />
                        Apply
                      </Button>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Try: LUXE10 (10% off) or FIRST50 (₹50 off)
                    </p>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Convenience Fee ({(CONVENIENCE_FEE_PERCENT * 100).toFixed(0)}%)
                      </span>
                      <span>₹{convenienceFee}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-500">
                        <span>Promo Discount</span>
                        <span>-₹{promoDiscount}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

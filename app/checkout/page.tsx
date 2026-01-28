"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import { useCart, type Booking } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Smartphone, Wallet, Loader2, CheckCircle, ShoppingBag } from "lucide-react"

const CONVENIENCE_FEE_PERCENT = 0.03

const paymentMethods = [
  { id: "upi", name: "UPI", icon: Smartphone, description: "Pay using any UPI app" },
  { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
  { id: "wallet", name: "Wallet", icon: Wallet, description: "Paytm, PhonePe, Amazon Pay" },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, getTotal, clearCart, addBooking } = useCart()
  const { toast } = useToast()

  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [booking, setBooking] = useState<Booking | null>(null)

  // UPI fields
  const [upiId, setUpiId] = useState("")

  // Card fields
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [cardName, setCardName] = useState("")

  const subtotal = getTotal()
  const convenienceFee = Math.round(subtotal * CONVENIENCE_FEE_PERCENT)
  const total = subtotal + convenienceFee

  if (!user) {
    router.push("/login")
    return null
  }

  if (items.length === 0 && !isComplete) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold">No items to checkout</h1>
          <p className="mt-2 text-muted-foreground">Add tickets to your cart first</p>
          <Button asChild className="mt-6">
            <Link href="/">Explore Events</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const handlePayment = async () => {
    // Validate payment details
    if (paymentMethod === "upi" && !upiId) {
      toast({
        title: "UPI ID Required",
        description: "Please enter your UPI ID",
        variant: "destructive",
      })
      return
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
        toast({
          title: "Card Details Required",
          description: "Please fill in all card details",
          variant: "destructive",
        })
        return
      }
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create booking
    const newBooking = addBooking({
      userId: user.id,
      items: [...items],
      totalAmount: subtotal,
      convenienceFee,
      promoDiscount: 0,
      finalAmount: total,
      paymentMethod: paymentMethod === "upi" ? "UPI" : paymentMethod === "card" ? "Card" : "Wallet",
      status: "confirmed",
      bookingDate: new Date().toISOString(),
    })

    setBooking(newBooking)
    clearCart()
    setIsComplete(true)
    setIsProcessing(false)

    toast({
      title: "Booking Confirmed!",
      description: `Your booking ID is ${newBooking.id}`,
    })
  }

  if (isComplete && booking) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">Booking Confirmed!</h1>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase. Your tickets have been booked successfully.
            </p>

            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="space-y-4 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span className="font-mono font-semibold">{booking.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">QR Code</span>
                    <span className="font-mono font-semibold">{booking.qrCode}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Paid</span>
                    <span className="text-lg font-bold text-primary">₹{booking.finalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="mt-6 text-sm text-muted-foreground">
              A confirmation email has been sent to {user.email}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Button asChild>
                <Link href="/dashboard/bookings">View My Bookings</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Continue Browsing</Link>
              </Button>
            </div>
          </div>
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
          <h1 className="mb-8 font-serif text-3xl font-bold">Checkout</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Payment Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Select how you want to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="grid gap-4">
                      {paymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all ${
                            paymentMethod === method.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-muted-foreground"
                          }`}
                        >
                          <RadioGroupItem value={method.id} />
                          <method.icon className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {paymentMethod === "upi" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="upi">UPI ID</Label>
                        <Input
                          id="upi"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Expiry Date</Label>
                          <Input
                            id="cardExpiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input
                            id="cardCvv"
                            type="password"
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        You will be redirected to your wallet app to complete the payment.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">{item.eventTitle}</p>
                          <p className="text-muted-foreground">
                            {item.quantity} x ₹{item.pricePerSeat}
                          </p>
                        </div>
                        <span>₹{item.totalPrice}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Convenience Fee</span>
                      <span>₹{convenienceFee}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{total}</span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${total}`
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

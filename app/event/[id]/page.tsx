"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { getEventById } from "@/lib/events-data"
import { Star, Clock, MapPin, Calendar, Users, ChevronLeft } from "lucide-react"

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"]
const SEATS_PER_ROW = 12

// Generate some random booked seats
const generateBookedSeats = () => {
  const booked: string[] = []
  for (let i = 0; i < 20; i++) {
    const row = ROWS[Math.floor(Math.random() * ROWS.length)]
    const seat = Math.floor(Math.random() * SEATS_PER_ROW) + 1
    booked.push(`${row}${seat}`)
  }
  return booked
}

const bookedSeats = generateBookedSeats()

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const event = getEventById(id)
  const router = useRouter()
  const { user } = useAuth()
  const { addItem } = useCart()
  const { toast } = useToast()

  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedTier, setSelectedTier] = useState<"silver" | "gold" | "platinum">("gold")
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  if (!event) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Event not found</h1>
          <Button asChild className="mt-4">
            <Link href="/">Go Home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const getSeatStatus = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return "booked"
    if (selectedSeats.includes(seatId)) return "selected"
    return "available"
  }

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    )
  }

  const pricePerSeat = event.prices[selectedTier]
  const totalPrice = selectedSeats.length * pricePerSeat

  const handleProceedToBooking = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to book tickets.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Select Date & Time",
        description: "Please select a date and time for your booking.",
        variant: "destructive",
      })
      return
    }

    if (selectedSeats.length === 0) {
      toast({
        title: "Select Seats",
        description: "Please select at least one seat.",
        variant: "destructive",
      })
      return
    }

    addItem({
      eventId: event.id,
      eventTitle: event.title,
      eventImage: event.image,
      eventDate: selectedDate,
      eventTime: selectedTime,
      venue: event.venue,
      seats: selectedSeats,
      seatTier: selectedTier,
      pricePerSeat,
      quantity: selectedSeats.length,
      totalPrice,
    })

    toast({
      title: "Added to Cart",
      description: `${selectedSeats.length} ticket(s) added to your cart.`,
    })

    router.push("/cart")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Hero Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl lg:col-span-1">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Details */}
              <div className="lg:col-span-2">
                <div className="flex flex-wrap items-start gap-2">
                  {event.genre.map((g) => (
                    <Badge key={g} variant="secondary">
                      {g}
                    </Badge>
                  ))}
                  {event.isUpcoming && (
                    <Badge className="bg-primary/20 text-primary">Coming Soon</Badge>
                  )}
                </div>

                <h1 className="mt-4 font-serif text-3xl font-bold md:text-4xl">{event.title}</h1>

                {/* Meta */}
                <div className="mt-4 flex flex-wrap gap-4 text-muted-foreground">
                  {event.rating > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      {event.rating.toFixed(1)}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {event.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.venue}, {event.city}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-6 text-muted-foreground">{event.description}</p>

                {/* Cast */}
                {event.cast && event.cast.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold">Cast & Performers</h3>
                    <p className="mt-1 text-muted-foreground">{event.cast.join(", ")}</p>
                  </div>
                )}

                {/* Pricing */}
                <div className="mt-6">
                  <h3 className="font-semibold">Ticket Prices</h3>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <div className="rounded-lg border border-border bg-card p-3 text-center">
                      <p className="text-xs text-muted-foreground">Silver</p>
                      <p className="font-semibold">₹{event.prices.silver}</p>
                    </div>
                    <div className="rounded-lg border border-primary bg-primary/10 p-3 text-center">
                      <p className="text-xs text-primary">Gold</p>
                      <p className="font-semibold text-primary">₹{event.prices.gold}</p>
                    </div>
                    <div className="rounded-lg border border-amber-500 bg-amber-500/10 p-3 text-center">
                      <p className="text-xs text-amber-500">Platinum</p>
                      <p className="font-semibold text-amber-500">₹{event.prices.platinum}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        {!event.isUpcoming && event.dates.length > 0 && (
          <section className="border-t border-border bg-card/50 py-8">
            <div className="container mx-auto px-4">
              <h2 className="mb-6 font-serif text-2xl font-semibold">Book Your Tickets</h2>

              <div className="grid gap-8 lg:grid-cols-3">
                {/* Selection Options */}
                <div className="space-y-6 lg:col-span-1">
                  {/* Date Selection */}
                  <div>
                    <Label className="mb-2 block">Select Date</Label>
                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a date" />
                      </SelectTrigger>
                      <SelectContent>
                        {event.dates.map((date) => (
                          <SelectItem key={date} value={date}>
                            {new Date(date).toLocaleDateString("en-IN", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Selection */}
                  {event.times.length > 0 && (
                    <div>
                      <Label className="mb-2 block">Select Time</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {event.times.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Tier Selection */}
                  <div>
                    <Label className="mb-2 block">Select Tier</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["silver", "gold", "platinum"] as const).map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setSelectedTier(tier)}
                          className={`rounded-lg border p-3 text-center transition-all ${
                            selectedTier === tier
                              ? tier === "gold"
                                ? "border-primary bg-primary/10"
                                : tier === "platinum"
                                ? "border-amber-500 bg-amber-500/10"
                                : "border-foreground bg-foreground/10"
                              : "border-border hover:border-muted-foreground"
                          }`}
                        >
                          <p className="text-xs capitalize">{tier}</p>
                          <p className="font-semibold">₹{event.prices[tier]}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Seat Selection */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Select Seats</span>
                        <div className="flex items-center gap-4 text-sm font-normal">
                          <span className="flex items-center gap-1">
                            <span className="h-4 w-4 rounded bg-muted" />
                            Available
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-4 w-4 rounded bg-primary" />
                            Selected
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="h-4 w-4 rounded bg-muted-foreground/30" />
                            Booked
                          </span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Screen */}
                      <div className="mb-8">
                        <div className="mx-auto h-2 w-3/4 rounded-t-full bg-gradient-to-b from-primary/50 to-transparent" />
                        <p className="mt-2 text-center text-xs text-muted-foreground">SCREEN</p>
                      </div>

                      {/* Seats Grid */}
                      <div className="space-y-2">
                        {ROWS.map((row) => (
                          <div key={row} className="flex items-center justify-center gap-1">
                            <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                              {row}
                            </span>
                            <div className="flex gap-1">
                              {Array.from({ length: SEATS_PER_ROW }, (_, i) => {
                                const seatId = `${row}${i + 1}`
                                const status = getSeatStatus(seatId)
                                return (
                                  <button
                                    key={seatId}
                                    type="button"
                                    onClick={() => toggleSeat(seatId)}
                                    disabled={status === "booked"}
                                    className={`flex h-7 w-7 items-center justify-center rounded text-xs font-medium transition-all ${
                                      status === "booked"
                                        ? "cursor-not-allowed bg-muted-foreground/30 text-muted-foreground"
                                        : status === "selected"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted hover:bg-muted/80"
                                    }`}
                                    title={seatId}
                                  >
                                    {i + 1}
                                  </button>
                                )
                              })}
                            </div>
                            <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                              {row}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Booking Summary */}
              <Card className="mt-6">
                <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>{selectedDate || "No date selected"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span>{selectedTime || "No time selected"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span>
                        {selectedSeats.length > 0
                          ? `${selectedSeats.length} seat(s): ${selectedSeats.join(", ")}`
                          : "No seats selected"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-2xl font-bold text-primary">₹{totalPrice}</p>
                    </div>
                    <Button size="lg" onClick={handleProceedToBooking} disabled={selectedSeats.length === 0}>
                      Proceed to Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

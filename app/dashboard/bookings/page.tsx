"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { useCart, type Booking } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, MapPin, QrCode, X, Ticket } from "lucide-react"

export default function BookingsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { getUserBookings, cancelBooking } = useCart()
  const { toast } = useToast()

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const bookings = getUserBookings(user.id)
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed")
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled")

  const handleCancelBooking = () => {
    if (bookingToCancel) {
      cancelBooking(bookingToCancel)
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled. Refund will be processed within 5-7 business days.",
      })
      setShowCancelDialog(false)
      setBookingToCancel(null)
    }
  }

  const BookingCard = ({ booking }: { booking: Booking }) => {
    const item = booking.items[0]
    if (!item) return null

    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="relative h-32 w-full sm:h-auto sm:w-32">
              <Image
                src={item.eventImage || "/placeholder.svg"}
                alt={item.eventTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{item.eventTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    Booking ID: <span className="font-mono">{booking.id}</span>
                  </p>
                </div>
                <Badge
                  variant={booking.status === "confirmed" ? "default" : "destructive"}
                  className={booking.status === "confirmed" ? "bg-green-500/20 text-green-500" : ""}
                >
                  {booking.status}
                </Badge>
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(item.eventDate).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {item.eventTime}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {item.venue}
                </span>
              </div>

              <div className="mt-2 text-sm">
                Seats: <span className="font-medium">{item.seats.join(", ")}</span>
              </div>

              <div className="mt-auto flex items-center justify-between pt-4">
                <p className="font-semibold text-primary">₹{booking.finalAmount}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                    <QrCode className="mr-2 h-4 w-4" />
                    View Ticket
                  </Button>
                  {booking.status === "confirmed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10 bg-transparent"
                      onClick={() => {
                        setBookingToCancel(booking.id)
                        setShowCancelDialog(true)
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold">My Bookings</h1>
            <p className="mt-1 text-muted-foreground">
              View and manage all your ticket bookings
            </p>
          </div>

          {bookings.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Ticket className="h-16 w-16 text-muted-foreground" />
                <h2 className="mt-4 text-xl font-semibold">No bookings yet</h2>
                <p className="mt-2 text-muted-foreground">
                  Start exploring events and book your first ticket!
                </p>
                <Button asChild className="mt-6">
                  <Link href="/">Explore Events</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="confirmed">
              <TabsList>
                <TabsTrigger value="confirmed">
                  Confirmed ({confirmedBookings.length})
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Cancelled ({cancelledBookings.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="confirmed" className="mt-6 space-y-4">
                {confirmedBookings.length === 0 ? (
                  <p className="py-8 text-center text-muted-foreground">
                    No confirmed bookings
                  </p>
                ) : (
                  confirmedBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="cancelled" className="mt-6 space-y-4">
                {cancelledBookings.length === 0 ? (
                  <p className="py-8 text-center text-muted-foreground">
                    No cancelled bookings
                  </p>
                ) : (
                  cancelledBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      {/* Ticket Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ticket Details</DialogTitle>
            <DialogDescription>
              Show this at the venue for entry
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="rounded-lg border border-dashed border-primary bg-primary/5 p-6 text-center">
                <QrCode className="mx-auto h-24 w-24 text-primary" />
                <p className="mt-2 font-mono text-lg font-bold">{selectedBooking.qrCode}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking ID</span>
                  <span className="font-mono">{selectedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event</span>
                  <span>{selectedBooking.items[0]?.eventTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>{selectedBooking.items[0]?.eventDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span>{selectedBooking.items[0]?.eventTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Seats</span>
                  <span>{selectedBooking.items[0]?.seats.join(", ")}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking}>
              Yes, Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}

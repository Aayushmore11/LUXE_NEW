"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { Ticket, Calendar, User, Star, ChevronRight } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { getUserBookings } = useCart()

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
  const upcomingBookings = bookings.filter(
    (b) => b.status === "confirmed" && new Date(b.bookingDate) >= new Date()
  )
  const pastBookings = bookings.filter(
    (b) => b.status === "confirmed" && new Date(b.bookingDate) < new Date()
  )

  const quickLinks = [
    {
      title: "My Bookings",
      description: "View all your tickets and booking history",
      icon: Ticket,
      href: "/dashboard/bookings",
      count: bookings.length,
    },
    {
      title: "Profile Settings",
      description: "Update your personal information",
      icon: User,
      href: "/dashboard/profile",
    },
    {
      title: "Give Feedback",
      description: "Share your experience with us",
      icon: Star,
      href: "/feedback",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your bookings and account settings
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Ticket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <Star className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pastBookings.length}</p>
                  <p className="text-sm text-muted-foreground">Past Events</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Links */}
          <div className="grid gap-4 md:grid-cols-3">
            {quickLinks.map((link) => (
              <Card key={link.href} className="group transition-all hover:border-primary/50">
                <Link href={link.href}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                        <link.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                      </div>
                      {link.count !== undefined && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-sm font-medium text-primary">
                          {link.count}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm font-medium text-primary">
                      Go to {link.title}
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {/* Recent Bookings */}
          {bookings.length > 0 && (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Bookings</h2>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard/bookings">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-3">
                {bookings.slice(0, 3).map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">{booking.items[0]?.eventTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          Booking ID: {booking.id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">₹{booking.finalAmount}</p>
                        <p className="text-sm capitalize text-muted-foreground">
                          {booking.status}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

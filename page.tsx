"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { events, getFeaturedEvents } from "@/lib/events-data"
import { Film, Music, Trophy, Theater, ChevronRight, Sparkles } from "lucide-react"

const categories = [
  {
    id: "movies",
    title: "Movies",
    description: "Latest blockbusters & classics",
    icon: Film,
    href: "/movies",
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: "concerts",
    title: "Live Events",
    description: "Concerts, comedy & festivals",
    icon: Music,
    href: "/concerts",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "sports",
    title: "Sports",
    description: "Cricket, football & esports",
    icon: Trophy,
    href: "/sports",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "theatre",
    title: "Theatre",
    description: "Plays, musicals & performances",
    icon: Theater,
    href: "/theatre",
    color: "from-amber-500/20 to-yellow-500/20",
  },
]

export default function HomePage() {
  const featuredEvents = getFeaturedEvents()
  const trendingMovies = events.filter((e) => e.category === "movies").slice(0, 4)
  const upcomingConcerts = events.filter((e) => e.category === "concerts").slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="container relative mx-auto px-4 py-20 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                Premium Entertainment Booking
              </div>
              <h1 className="text-balance font-serif text-4xl font-bold tracking-tight md:text-6xl">
                Your Gateway to{" "}
                <span className="bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">
                  Unforgettable
                </span>{" "}
                Experiences
              </h1>
              <p className="mt-6 text-pretty text-lg text-muted-foreground">
                Book tickets for the hottest movies, electrifying concerts, thrilling sports events, and captivating theatre performances — all in one place.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/movies">
                    Explore Movies
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/concerts">Browse Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold md:text-3xl">
              Explore Categories
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-100`} />
                  <div className="relative">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/20">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary">
                      View All
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="border-y border-border bg-card/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold md:text-3xl">Featured Events</h2>
                <p className="mt-1 text-muted-foreground">Handpicked top-rated experiences</p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="featured" />
              ))}
            </div>
          </div>
        </section>

        {/* Movies Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold md:text-3xl">Now Showing</h2>
                <p className="mt-1 text-muted-foreground">Latest movies in theaters</p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/movies">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trendingMovies.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Concerts Section */}
        <section className="border-t border-border bg-card/50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold md:text-3xl">Live Events</h2>
                <p className="mt-1 text-muted-foreground">Concerts, comedy & more</p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/concerts">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {upcomingConcerts.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-background to-accent/20 p-8 md:p-12">
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h2 className="font-serif text-2xl font-bold md:text-4xl">
                  Never Miss an Event
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Create an account to save your favorite events, get personalized recommendations, and enjoy faster checkout.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild>
                    <Link href="/register">Create Free Account</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

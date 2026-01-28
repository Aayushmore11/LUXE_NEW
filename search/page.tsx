"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EventCard } from "@/components/event-card"
import { Input } from "@/components/ui/input"
import { searchEvents } from "@/lib/events-data"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")

  const results = useMemo(() => {
    if (!query.trim()) return []
    return searchEvents(query)
  }, [query])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-card/50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-6 text-center font-serif text-3xl font-bold md:text-4xl">
              Search Events
            </h1>
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for movies, concerts, sports, theatre..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-14 pl-12 text-lg"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            {query.trim() ? (
              <>
                <p className="mb-6 text-muted-foreground">
                  {results.length} {results.length === 1 ? "result" : "results"} for &quot;{query}&quot;
                </p>
                {results.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {results.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <p className="text-lg text-muted-foreground">
                      No events found. Try a different search term.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg text-muted-foreground">
                  Start typing to search for events
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

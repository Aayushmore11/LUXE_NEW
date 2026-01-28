"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { cities, languages, type Event, type EventCategory } from "@/lib/events-data"
import { Search, Filter, X } from "lucide-react"

interface CategoryPageProps {
  title: string
  description: string
  category: EventCategory
  events: Event[]
  subcategories: string[]
  availableGenres: string[]
}

export function CategoryPage({
  title,
  description,
  category,
  events,
  subcategories,
  availableGenres,
}: CategoryPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("rating")

  const filteredEvents = useMemo(() => {
    let filtered = [...events]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.venue.toLowerCase().includes(query) ||
          e.genre.some((g) => g.toLowerCase().includes(query))
      )
    }

    // City filter
    if (selectedCity !== "all") {
      filtered = filtered.filter((e) => e.city === selectedCity || e.city === "All Cities")
    }

    // Language filter
    if (selectedLanguage !== "all") {
      filtered = filtered.filter((e) => e.language.includes(selectedLanguage))
    }

    // Genre filter
    if (selectedGenres.length > 0) {
      filtered = filtered.filter((e) => e.genre.some((g) => selectedGenres.includes(g)))
    }

    // Subcategory filter
    if (selectedSubcategory !== "all") {
      filtered = filtered.filter((e) => e.subcategory === selectedSubcategory)
    }

    // Sort
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered.sort((a, b) => a.prices.silver - b.prices.silver)
        break
      case "price-high":
        filtered.sort((a, b) => b.prices.silver - a.prices.silver)
        break
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [events, searchQuery, selectedCity, selectedLanguage, selectedGenres, selectedSubcategory, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCity("all")
    setSelectedLanguage("all")
    setSelectedGenres([])
    setSelectedSubcategory("all")
  }

  const hasActiveFilters =
    selectedCity !== "all" ||
    selectedLanguage !== "all" ||
    selectedGenres.length > 0 ||
    selectedSubcategory !== "all"

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-card/50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="mt-2 text-muted-foreground">{description}</p>

            {/* Subcategory Tabs */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                variant={selectedSubcategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubcategory("all")}
              >
                All
              </Button>
              {subcategories.map((sub) => (
                <Button
                  key={sub}
                  variant={selectedSubcategory === sub ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubcategory(sub)}
                >
                  {sub}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Filters & Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Search & Filter Bar */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={`Search ${title.toLowerCase()}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden items-center gap-3 lg:flex">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="mr-1 h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {[selectedCity !== "all", selectedLanguage !== "all", selectedGenres.length > 0, selectedSubcategory !== "all"].filter(Boolean).length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* City */}
                    <div>
                      <Label className="mb-2 block">City</Label>
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Cities</SelectItem>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Language */}
                    <div>
                      <Label className="mb-2 block">Language</Label>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Languages</SelectItem>
                          {languages.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Genres */}
                    <div>
                      <Label className="mb-2 block">Genres</Label>
                      <div className="space-y-2">
                        {availableGenres.map((genre) => (
                          <div key={genre} className="flex items-center gap-2">
                            <Checkbox
                              id={`genre-${genre}`}
                              checked={selectedGenres.includes(genre)}
                              onCheckedChange={() => toggleGenre(genre)}
                            />
                            <label htmlFor={`genre-${genre}`} className="text-sm">
                              {genre}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sort */}
                    <div>
                      <Label className="mb-2 block">Sort By</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rating">Top Rated</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="name">Name</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {hasActiveFilters && (
                      <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Results */}
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredEvents.length} {filteredEvents.length === 1 ? "result" : "results"} found
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg text-muted-foreground">No events found matching your criteria</p>
                <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

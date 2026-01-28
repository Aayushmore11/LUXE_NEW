"use client"

import Link from "next/link"
import Image from "next/image"
import type { Event } from "@/lib/events-data"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, MapPin } from "lucide-react"

interface EventCardProps {
  event: Event
  variant?: "default" | "featured"
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const isFeatured = variant === "featured"

  return (
    <Link
      href={`/event/${event.id}`}
      className={`group relative block overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${
        isFeatured ? "aspect-[2/3]" : "aspect-[3/4]"
      }`}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        {/* Badges */}
        <div className="mb-2 flex flex-wrap gap-2">
          {event.isUpcoming && (
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              Coming Soon
            </Badge>
          )}
          {event.rating > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1 bg-accent/80">
              <Star className="h-3 w-3 fill-primary text-primary" />
              {event.rating.toFixed(1)}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-semibold text-foreground ${isFeatured ? "text-xl" : "text-base"}`}>
          {event.title}
        </h3>

        {/* Meta */}
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {event.duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {event.city}
          </span>
        </div>

        {/* Genre */}
        <div className="mt-2 flex flex-wrap gap-1">
          {event.genre.slice(0, 2).map((g) => (
            <span key={g} className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {g}
            </span>
          ))}
        </div>

        {/* Price */}
        <p className="mt-3 text-sm">
          <span className="text-muted-foreground">From </span>
          <span className="font-semibold text-primary">₹{event.prices.silver}</span>
        </p>
      </div>
    </Link>
  )
}

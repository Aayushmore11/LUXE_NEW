import { CategoryPage } from "@/components/category-page"
import { getEventsByCategory, genres } from "@/lib/events-data"

export default function ConcertsPage() {
  const concerts = getEventsByCategory("concerts")
  const subcategories = [...new Set(concerts.map((c) => c.subcategory))]

  return (
    <CategoryPage
      title="Live Events"
      description="Concerts, music festivals, stand-up comedy, and more live entertainment"
      category="concerts"
      events={concerts}
      subcategories={subcategories}
      availableGenres={genres.concerts}
    />
  )
}

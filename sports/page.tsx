import { CategoryPage } from "@/components/category-page"
import { getEventsByCategory, genres } from "@/lib/events-data"

export default function SportsPage() {
  const sports = getEventsByCategory("sports")
  const subcategories = [...new Set(sports.map((s) => s.subcategory))]

  return (
    <CategoryPage
      title="Sports"
      description="Cricket matches, football games, esports tournaments, and more sporting events"
      category="sports"
      events={sports}
      subcategories={subcategories}
      availableGenres={genres.sports}
    />
  )
}

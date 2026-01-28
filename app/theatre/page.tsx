import { CategoryPage } from "@/components/category-page"
import { getEventsByCategory, genres } from "@/lib/events-data"

export default function TheatrePage() {
  const theatre = getEventsByCategory("theatre")
  const subcategories = [...new Set(theatre.map((t) => t.subcategory))]

  return (
    <CategoryPage
      title="Theatre & Shows"
      description="Plays, musicals, stage performances, and theatrical productions"
      category="theatre"
      events={theatre}
      subcategories={subcategories}
      availableGenres={genres.theatre}
    />
  )
}

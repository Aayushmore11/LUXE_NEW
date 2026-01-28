import { CategoryPage } from "@/components/category-page"
import { getEventsByCategory, genres } from "@/lib/events-data"

export default function MoviesPage() {
  const movies = getEventsByCategory("movies")
  const subcategories = [...new Set(movies.map((m) => m.subcategory))]

  return (
    <CategoryPage
      title="Movies"
      description="Discover the latest blockbusters and upcoming releases in cinemas near you"
      category="movies"
      events={movies}
      subcategories={subcategories}
      availableGenres={genres.movies}
    />
  )
}

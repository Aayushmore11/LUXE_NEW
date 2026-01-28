export type EventCategory = "movies" | "concerts" | "sports" | "theatre"

export interface Event {
  id: string
  title: string
  category: EventCategory
  subcategory: string
  image: string
  rating: number
  duration: string
  genre: string[]
  language: string
  venue: string
  city: string
  description: string
  cast?: string[]
  dates: string[]
  times: string[]
  prices: {
    silver: number
    gold: number
    platinum: number
  }
  isUpcoming?: boolean
}

export const events: Event[] = [
  // Movies - Now Showing
  {
    id: "mov-1",
    title: "Dune: Part Three",
    category: "movies",
    subcategory: "Now Showing",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
    rating: 8.9,
    duration: "2h 45m",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    language: "English",
    venue: "IMAX Cineplex",
    city: "Mumbai",
    description: "The epic conclusion to the Dune saga. Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin"],
    dates: ["2026-01-28", "2026-01-29", "2026-01-30", "2026-01-31"],
    times: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"],
    prices: { silver: 250, gold: 450, platinum: 750 },
  },
  {
    id: "mov-2",
    title: "The Dark Knight Returns",
    category: "movies",
    subcategory: "Now Showing",
    image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    rating: 9.1,
    duration: "2h 52m",
    genre: ["Action", "Crime", "Drama"],
    language: "English",
    venue: "PVR Premium",
    city: "Delhi",
    description: "Batman returns to Gotham City to face his greatest challenge yet as a new threat emerges from the shadows.",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Colin Farrell"],
    dates: ["2026-01-28", "2026-01-29", "2026-01-30"],
    times: ["11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"],
    prices: { silver: 300, gold: 500, platinum: 800 },
  },
  {
    id: "mov-3",
    title: "Pathaan 2",
    category: "movies",
    subcategory: "Now Showing",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    rating: 8.5,
    duration: "2h 30m",
    genre: ["Action", "Thriller"],
    language: "Hindi",
    venue: "Cinepolis",
    city: "Mumbai",
    description: "Pathaan returns in an action-packed sequel with more thrills and international espionage.",
    cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
    dates: ["2026-01-28", "2026-01-29", "2026-01-30", "2026-01-31"],
    times: ["9:00 AM", "12:30 PM", "4:00 PM", "7:30 PM", "11:00 PM"],
    prices: { silver: 200, gold: 350, platinum: 600 },
  },
  // Movies - Coming Soon
  {
    id: "mov-4",
    title: "Avatar 4: The Tulkun Rider",
    category: "movies",
    subcategory: "Coming Soon",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop",
    rating: 0,
    duration: "3h 10m",
    genre: ["Sci-Fi", "Adventure"],
    language: "English",
    venue: "IMAX",
    city: "All Cities",
    description: "James Cameron continues the epic saga of Pandora with breathtaking underwater sequences.",
    cast: ["Sam Worthington", "Zoe Saldana"],
    dates: ["2026-03-15"],
    times: [],
    prices: { silver: 350, gold: 550, platinum: 900 },
    isUpcoming: true,
  },
  // Concerts
  {
    id: "con-1",
    title: "Coldplay: Music of the Spheres",
    category: "concerts",
    subcategory: "Music Festivals",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=600&fit=crop",
    rating: 9.5,
    duration: "3h",
    genre: ["Rock", "Pop"],
    language: "English",
    venue: "DY Patil Stadium",
    city: "Mumbai",
    description: "Experience the magic of Coldplay live with their spectacular Music of the Spheres World Tour featuring stunning visuals and hit songs.",
    cast: ["Chris Martin", "Jonny Buckland", "Guy Berryman", "Will Champion"],
    dates: ["2026-02-15", "2026-02-16"],
    times: ["7:00 PM"],
    prices: { silver: 4500, gold: 8500, platinum: 15000 },
  },
  {
    id: "con-2",
    title: "Arijit Singh Live",
    category: "concerts",
    subcategory: "Concerts",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    rating: 9.3,
    duration: "2h 30m",
    genre: ["Bollywood", "Romantic"],
    language: "Hindi",
    venue: "NSCI Dome",
    city: "Mumbai",
    description: "The voice of a generation performs his greatest hits in an intimate concert setting.",
    dates: ["2026-02-10"],
    times: ["7:30 PM"],
    prices: { silver: 2500, gold: 5000, platinum: 10000 },
  },
  {
    id: "con-3",
    title: "Zakir Khan: Comedy Night",
    category: "concerts",
    subcategory: "Stand-up Comedy",
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=600&fit=crop",
    rating: 8.8,
    duration: "2h",
    genre: ["Comedy", "Stand-up"],
    language: "Hindi",
    venue: "Canvas Laugh Club",
    city: "Delhi",
    description: "Sakht launda Zakir Khan brings his hilarious observations about life, love, and everything in between.",
    dates: ["2026-02-05", "2026-02-06"],
    times: ["8:00 PM"],
    prices: { silver: 999, gold: 1999, platinum: 3499 },
  },
  // Sports
  {
    id: "spt-1",
    title: "IPL 2026: MI vs CSK",
    category: "sports",
    subcategory: "Cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=600&fit=crop",
    rating: 9.8,
    duration: "4h",
    genre: ["Cricket", "T20"],
    language: "Multi",
    venue: "Wankhede Stadium",
    city: "Mumbai",
    description: "The biggest rivalry in IPL history! Watch Mumbai Indians take on Chennai Super Kings in this electrifying encounter.",
    dates: ["2026-04-10"],
    times: ["7:30 PM"],
    prices: { silver: 1500, gold: 3500, platinum: 7500 },
  },
  {
    id: "spt-2",
    title: "FIFA Club World Cup: Final",
    category: "sports",
    subcategory: "Football",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=600&fit=crop",
    rating: 9.6,
    duration: "2h",
    genre: ["Football", "International"],
    language: "Multi",
    venue: "Salt Lake Stadium",
    city: "Kolkata",
    description: "Witness history as the world's best clubs compete for the ultimate prize.",
    dates: ["2026-06-15"],
    times: ["9:00 PM"],
    prices: { silver: 5000, gold: 12000, platinum: 25000 },
  },
  {
    id: "spt-3",
    title: "BGMI Pro League Finals",
    category: "sports",
    subcategory: "Esports",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
    rating: 8.5,
    duration: "6h",
    genre: ["Esports", "Gaming"],
    language: "Hindi/English",
    venue: "Nehru Indoor Stadium",
    city: "Chennai",
    description: "The biggest esports event in India! Watch top teams battle for the championship title.",
    dates: ["2026-03-20", "2026-03-21"],
    times: ["2:00 PM"],
    prices: { silver: 500, gold: 1200, platinum: 2500 },
  },
  // Theatre
  {
    id: "thr-1",
    title: "The Phantom of the Opera",
    category: "theatre",
    subcategory: "Musicals",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop",
    rating: 9.4,
    duration: "2h 30m",
    genre: ["Musical", "Romance", "Drama"],
    language: "English",
    venue: "Royal Opera House",
    city: "Mumbai",
    description: "Andrew Lloyd Webber's legendary musical returns to India for a limited run. Experience the magic of the Phantom.",
    dates: ["2026-02-20", "2026-02-21", "2026-02-22"],
    times: ["6:00 PM", "9:00 PM"],
    prices: { silver: 2000, gold: 4500, platinum: 8000 },
  },
  {
    id: "thr-2",
    title: "Hamlet: A Modern Retelling",
    category: "theatre",
    subcategory: "Plays",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=400&h=600&fit=crop",
    rating: 8.7,
    duration: "2h 45m",
    genre: ["Drama", "Classic"],
    language: "English",
    venue: "Prithvi Theatre",
    city: "Mumbai",
    description: "Shakespeare's timeless tragedy reimagined in a contemporary Indian setting.",
    cast: ["Naseeruddin Shah", "Ratna Pathak Shah"],
    dates: ["2026-02-08", "2026-02-09"],
    times: ["7:00 PM"],
    prices: { silver: 800, gold: 1500, platinum: 3000 },
  },
  {
    id: "thr-3",
    title: "Mughal-E-Azam: The Musical",
    category: "theatre",
    subcategory: "Stage Performances",
    image: "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=400&h=600&fit=crop",
    rating: 9.2,
    duration: "3h",
    genre: ["Musical", "Historical", "Romance"],
    language: "Hindi",
    venue: "NCPA",
    city: "Mumbai",
    description: "The grand spectacle of Mughal-E-Azam brought to life on stage with breathtaking sets and costumes.",
    dates: ["2026-03-01", "2026-03-02", "2026-03-03"],
    times: ["6:30 PM"],
    prices: { silver: 3000, gold: 6000, platinum: 12000 },
  },
]

export const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"]

export const genres = {
  movies: ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Adventure"],
  concerts: ["Rock", "Pop", "Bollywood", "Classical", "EDM", "Hip-Hop", "Comedy", "Stand-up"],
  sports: ["Cricket", "Football", "Tennis", "Esports", "Kabaddi", "Hockey"],
  theatre: ["Drama", "Musical", "Comedy", "Classic", "Contemporary"],
}

export const languages = ["English", "Hindi", "Tamil", "Telugu", "Malayalam", "Kannada", "Bengali", "Marathi"]

export function getEventsByCategory(category: EventCategory): Event[] {
  return events.filter((event) => event.category === category)
}

export function getEventById(id: string): Event | undefined {
  return events.find((event) => event.id === id)
}

export function getFeaturedEvents(): Event[] {
  return events.filter((event) => event.rating >= 9).slice(0, 5)
}

export function getUpcomingEvents(): Event[] {
  return events.filter((event) => event.isUpcoming)
}

export function searchEvents(query: string): Event[] {
  const lowerQuery = query.toLowerCase()
  return events.filter(
    (event) =>
      event.title.toLowerCase().includes(lowerQuery) ||
      event.genre.some((g) => g.toLowerCase().includes(lowerQuery)) ||
      event.venue.toLowerCase().includes(lowerQuery) ||
      event.city.toLowerCase().includes(lowerQuery)
  )
}

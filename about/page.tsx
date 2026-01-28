import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Heart, Users, Award, Globe } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your transactions and data are protected with industry-leading security measures.",
  },
  {
    icon: Zap,
    title: "Seamless Experience",
    description: "Book tickets in seconds with our intuitive platform designed for speed and simplicity.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "24/7 support and hassle-free refunds because your satisfaction is our priority.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connecting millions of entertainment lovers with unforgettable experiences.",
  },
]

const stats = [
  { value: "10M+", label: "Tickets Sold" },
  { value: "5000+", label: "Venues" },
  { value: "100+", label: "Cities" },
  { value: "99.9%", label: "Uptime" },
]

const partners = [
  "PVR Cinemas",
  "INOX",
  "Cinepolis",
  "BookMyShow Venues",
  "Live Nation",
  "Zee Live",
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl font-bold md:text-5xl">
              About <span className="text-primary">LuxeTickets</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We&apos;re on a mission to make entertainment accessible to everyone. From blockbuster movies to
              electrifying concerts, from thrilling sports to captivating theatre — we bring you closer to
              the experiences that matter.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl font-bold">Our Mission</h2>
              <p className="mt-6 text-lg text-muted-foreground">
                To revolutionize the entertainment booking experience by combining cutting-edge technology
                with a premium, user-centric design. We believe everyone deserves access to world-class
                entertainment, and we&apos;re building the platform to make that happen.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-y border-border bg-card/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-serif text-3xl font-bold">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-2 text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="border-t border-border bg-card/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-serif text-3xl font-bold">Our Partners</h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
              We work with the best venues and organizers to bring you premium entertainment experiences.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="rounded-lg border border-border bg-background px-6 py-3 text-muted-foreground"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-br from-primary/20 via-background to-accent/20">
              <CardContent className="p-8 text-center md:p-12">
                <Globe className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-4 font-serif text-3xl font-bold">Join Our Journey</h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  We&apos;re always looking for passionate individuals to join our team and help us shape
                  the future of entertainment. Whether you&apos;re a developer, designer, marketer, or
                  operations expert — there&apos;s a place for you at LuxeTickets.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Award className="h-5 w-5" />
                    View Careers
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

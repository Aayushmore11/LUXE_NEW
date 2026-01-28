"use client"

import React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { saveFeedback } from "@/lib/feedback-store"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Star, CheckCircle } from "lucide-react"

const categories = [
  { value: "general", label: "General Feedback" },
  { value: "booking", label: "Booking Experience" },
  { value: "venue", label: "Venue/Event" },
  { value: "payment", label: "Payment Issues" },
  { value: "other", label: "Other" },
]

export default function FeedbackPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bookingId: "",
    category: "general",
    comment: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.comment || rating === 0) {
      toast({
        title: "Missing Fields",
        description: "Please provide your email, rating, and feedback comment.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    saveFeedback({
      userId: user?.id,
      userName: formData.name || user?.name,
      userEmail: formData.email,
      bookingId: formData.bookingId || undefined,
      rating,
      comment: formData.comment,
      category: formData.category as "general" | "booking" | "venue" | "payment" | "other",
    })

    setIsSubmitting(false)
    setIsSubmitted(true)

    toast({
      title: "Thank You!",
      description: "Your feedback has been submitted successfully.",
    })
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">Thank You for Your Feedback!</h1>
            <p className="mt-2 text-muted-foreground">
              Your feedback helps us improve our services and create better experiences.
            </p>
            <Button
              className="mt-6"
              onClick={() => {
                setIsSubmitted(false)
                setRating(0)
                setFormData({
                  name: user?.name || "",
                  email: user?.email || "",
                  bookingId: "",
                  category: "general",
                  comment: "",
                })
              }}
            >
              Submit Another Feedback
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b border-border bg-card/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl font-bold">Share Your Feedback</h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Your opinion matters to us! Help us improve by sharing your experience with LuxeTickets.
            </p>
          </div>
        </section>

        {/* Feedback Form */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Rate Your Experience</CardTitle>
                  <CardDescription>
                    Let us know how we&apos;re doing and how we can serve you better.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Star Rating */}
                    <div className="space-y-2">
                      <Label>Overall Rating *</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="p-1 transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-8 w-8 ${
                                star <= (hoveredRating || rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      {rating > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {rating === 1 && "Poor"}
                          {rating === 2 && "Fair"}
                          {rating === 3 && "Good"}
                          {rating === 4 && "Very Good"}
                          {rating === 5 && "Excellent"}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="category">Feedback Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bookingId">Booking ID (Optional)</Label>
                        <Input
                          id="bookingId"
                          value={formData.bookingId}
                          onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
                          placeholder="BK123456"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comment">Your Feedback *</Label>
                      <Textarea
                        id="comment"
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        placeholder="Tell us about your experience, suggestions, or any issues you faced..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Feedback"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

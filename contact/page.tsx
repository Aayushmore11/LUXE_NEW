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
import { saveContact } from "@/lib/feedback-store"
import { useToast } from "@/hooks/use-toast"
import { cities } from "@/lib/events-data"
import { Mail, Phone, MapPin, Clock, Loader2, Send, CheckCircle } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "support@luxetickets.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 1800-123-4567",
    description: "Mon-Sat 9AM-9PM IST",
  },
  {
    icon: MapPin,
    title: "Head Office",
    value: "Mumbai, Maharashtra",
    description: "India",
  },
  {
    icon: Clock,
    title: "Support Hours",
    value: "24/7 Online",
    description: "Phone support Mon-Sat",
  },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    saveContact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      city: formData.city,
    })

    setIsSubmitting(false)
    setIsSubmitted(true)

    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
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
            <h1 className="mt-6 text-2xl font-bold">Message Sent Successfully!</h1>
            <p className="mt-2 text-muted-foreground">
              Thank you for reaching out. Our team will get back to you within 24 hours.
            </p>
            <Button
              className="mt-6"
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  city: "",
                  subject: "",
                  message: "",
                })
              }}
            >
              Send Another Message
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
            <h1 className="font-serif text-4xl font-bold">Contact Us</h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Have questions or need assistance? We&apos;re here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <Card key={info.title}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.title}</p>
                      <p className="font-semibold">{info.value}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="border-t border-border bg-card/50 py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          required
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
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) => setFormData({ ...formData, city: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your query in detail..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
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

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  eventId: string
  eventTitle: string
  eventImage: string
  eventDate: string
  eventTime: string
  venue: string
  seats: string[]
  seatTier: "silver" | "gold" | "platinum"
  pricePerSeat: number
  quantity: number
  totalPrice: number
}

export interface Booking {
  id: string
  userId: string
  items: CartItem[]
  totalAmount: number
  convenienceFee: number
  promoDiscount: number
  finalAmount: number
  paymentMethod: string
  status: "confirmed" | "cancelled" | "pending"
  bookingDate: string
  qrCode: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getTotal: () => number
  itemCount: number
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, "id" | "qrCode">) => Booking
  cancelBooking: (id: string) => void
  getUserBookings: (userId: string) => Booking[]
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_KEY = "luxetickets_cart"
const BOOKINGS_KEY = "luxetickets_bookings"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY)
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }

    const storedBookings = localStorage.getItem(BOOKINGS_KEY)
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    }
  }, [])

  const saveCart = (newItems: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(newItems))
  }

  const saveBookings = (newBookings: Booking[]) => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(newBookings))
  }

  const addItem = (item: Omit<CartItem, "id">) => {
    const newItem: CartItem = {
      ...item,
      id: crypto.randomUUID(),
    }
    const newItems = [...items, newItem]
    setItems(newItems)
    saveCart(newItems)
  }

  const removeItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
    saveCart(newItems)
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem(CART_KEY)
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + item.totalPrice, 0)
  }

  const addBooking = (bookingData: Omit<Booking, "id" | "qrCode">): Booking => {
    const booking: Booking = {
      ...bookingData,
      id: `BK${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      qrCode: `QR-${crypto.randomUUID().substring(0, 8).toUpperCase()}`,
    }
    const newBookings = [...bookings, booking]
    setBookings(newBookings)
    saveBookings(newBookings)
    return booking
  }

  const cancelBooking = (id: string) => {
    const newBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: "cancelled" as const } : booking
    )
    setBookings(newBookings)
    saveBookings(newBookings)
  }

  const getUserBookings = (userId: string) => {
    return bookings.filter((booking) => booking.userId === userId)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        getTotal,
        itemCount: items.length,
        bookings,
        addBooking,
        cancelBooking,
        getUserBookings,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

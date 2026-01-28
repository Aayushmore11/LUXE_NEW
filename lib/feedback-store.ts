export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  city?: string
  submittedAt: string
  status: "pending" | "resolved"
}

export interface FeedbackSubmission {
  id: string
  userId?: string
  userName?: string
  userEmail: string
  bookingId?: string
  rating: number
  comment: string
  category: "general" | "booking" | "venue" | "payment" | "other"
  submittedAt: string
}

const CONTACTS_KEY = "luxetickets_contacts"
const FEEDBACK_KEY = "luxetickets_feedback"

export function getContacts(): ContactSubmission[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(CONTACTS_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveContact(contact: Omit<ContactSubmission, "id" | "submittedAt" | "status">): ContactSubmission {
  const contacts = getContacts()
  const newContact: ContactSubmission = {
    ...contact,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    status: "pending",
  }
  contacts.push(newContact)
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts))
  return newContact
}

export function getFeedback(): FeedbackSubmission[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(FEEDBACK_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveFeedback(feedback: Omit<FeedbackSubmission, "id" | "submittedAt">): FeedbackSubmission {
  const feedbackList = getFeedback()
  const newFeedback: FeedbackSubmission = {
    ...feedback,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  }
  feedbackList.push(newFeedback)
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackList))
  return newFeedback
}

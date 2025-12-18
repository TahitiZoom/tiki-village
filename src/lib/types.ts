/**
 * Type definitions for the Tiki Village application
 */

export interface Product {
  id: string
  name: string
  slug: string
  price: number
  description: string
  shortDescription?: string
  images: Array<{
    image: {
      url: string
      alt: string
    }
  }>
  category: {
    id: string
    name: string
    slug: string
  }
  bookable: boolean
  bookingSettings?: {
    availableDays: string[]
    maxParticipants?: number
    childrenAllowed: boolean
    childrenPrice?: number
  }
  extras?: Array<{
    name: string
    description?: string
    priceAdult: number
    priceChild?: number
    type: 'transfer' | 'package' | 'option'
  }>
  weddingOptions?: {
    includedServices: string
    additionalOptions: Array<{
      name: string
      price: number
      description?: string
    }>
    additionalGuests: {
      adultPrice: number
      childPrice: number
    }
    cancellationPolicy: string
  }
  status: 'draft' | 'published' | 'archived'
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: {
    url: string
    alt: string
  }
}

export interface Booking {
  id: string
  bookingNumber: string
  user?: string
  product: string | Product
  date: string
  participants: {
    adults: number
    children: number
  }
  selectedExtras?: Array<{
    extraName: string
    quantity: number
    price: number
  }>
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  notes?: string
  order?: string
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  orderNumber: string
  user?: string
  items: Array<{
    product: string | Product
    booking?: string | Booking
    quantity: number
    price: number
    subtotal: number
  }>
  subtotal: number
  discount: number
  promoCode?: string
  total: number
  status: 'pending' | 'processing' | 'paid' | 'completed' | 'cancelled' | 'refunded'
  paymentStatus: 'unpaid' | 'paid' | 'failed' | 'refunded'
  paymentMethod?: 'payzen_card' | 'bank_transfer' | 'cash'
  paymentDetails?: {
    transactionId?: string
    paymentDate?: string
    cardType?: string
    cardNumber?: string
  }
  billingAddress: {
    firstName: string
    lastName: string
    company?: string
    email: string
    phone: string
    street: string
    city: string
    region?: string
    postalCode: string
    country: string
  }
  customerNotes?: string
  adminNotes?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'customer'
  firstName?: string
  lastName?: string
  phone?: string
  company?: string
  address?: {
    street?: string
    city?: string
    region?: string
    postalCode?: string
    country?: string
  }
  acceptedGDPR: boolean
  newsletter: boolean
  createdAt: string
  updatedAt: string
}

export interface Testimonial {
  id: string
  name: string
  email: string
  rating: number
  comment: string
  avatar?: {
    url: string
    alt: string
  }
  location?: string
  date: string
  status: 'pending' | 'published' | 'rejected'
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Promotion {
  id: string
  code: string
  description?: string
  type: 'percentage' | 'fixed'
  value: number
  minPurchase?: number
  maxDiscount?: number
  usageLimit?: number
  usageCount: number
  validFrom: string
  validTo: string
  applicableProducts?: string[]
  applicableCategories?: string[]
  active: boolean
  createdAt: string
  updatedAt: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  acceptedPrivacy: boolean
  status: 'new' | 'in-progress' | 'resolved'
  adminNotes?: string
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  product: Product
  booking?: Partial<Booking>
  quantity: number
  price: number
  subtotal: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discount: number
  promoCode?: string
  total: number
}

export type Locale = 'fr' | 'en' | 'ja'

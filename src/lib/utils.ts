/**
 * Utility functions for the Tiki Village application
 */

/**
 * Format price in XPF (Franc Pacifique)
 */
export function formatXPF(amount: number): string {
  return new Intl.NumberFormat('fr-PF', {
    style: 'currency',
    currency: 'XPF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format date in French format
 */
export function formatDate(date: Date | string, locale: string = 'fr-FR'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format date and time in French format
 */
export function formatDateTime(date: Date | string, locale: string = 'fr-FR'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Convert date to Pacific/Tahiti timezone
 */
export function toTahitiTime(date: Date): Date {
  return new Date(date.toLocaleString('en-US', { timeZone: 'Pacific/Tahiti' }))
}

/**
 * Generate a unique booking number
 */
export function generateBookingNumber(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `BK-${timestamp}-${random}`
}

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `TKV-${timestamp}-${random}`
}

/**
 * Calculate total price for booking
 */
export function calculateBookingTotal(
  basePrice: number,
  adults: number,
  children: number,
  childPrice: number,
  extras: Array<{ price: number; quantity: number }> = []
): number {
  const participantsTotal = basePrice * adults + childPrice * children
  const extrasTotal = extras.reduce((sum, extra) => sum + extra.price * extra.quantity, 0)
  return participantsTotal + extrasTotal
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number (French Polynesia format)
 */
export function isValidPhone(phone: string): boolean {
  // Accepts formats like: +689 XX XX XX XX, 689XXXXXX, XXXXXXXX
  const phoneRegex = /^(\+?689)?[\s\-]?[\d\s\-]{6,}$/
  return phoneRegex.test(phone)
}

/**
 * Truncate text to specified length
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + '...'
}

/**
 * Slugify text for URLs
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

/**
 * Get day name in French
 */
export function getDayName(dayIndex: number, locale: string = 'fr-FR'): string {
  const date = new Date(2024, 0, dayIndex + 1) // January 2024 starts on Monday
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

/**
 * Check if date is available based on day of week
 */
export function isDateAvailable(date: Date, availableDays: string[]): boolean {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const dayName = dayNames[date.getDay()]
  return availableDays.includes(dayName)
}

/**
 * Calculate discount amount
 */
export function calculateDiscount(
  subtotal: number,
  discountType: 'percentage' | 'fixed',
  discountValue: number,
  maxDiscount?: number
): number {
  let discount = 0

  if (discountType === 'percentage') {
    discount = (subtotal * discountValue) / 100
    if (maxDiscount) {
      discount = Math.min(discount, maxDiscount)
    }
  } else {
    discount = discountValue
  }

  return Math.min(discount, subtotal)
}

/**
 * Merge class names (useful for Tailwind)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

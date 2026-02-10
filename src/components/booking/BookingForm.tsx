'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import BookingCalendar from '@/components/booking/BookingCalendar'
import ParticipantSelector from '@/components/booking/ParticipantSelector'

const products = [
  {
    slug: 'atelier-culturel-1',
    name: '1 Atelier Culturel',
    price: 3500,
    childrenPrice: 2000,
    availableDays: ['tuesday', 'friday'],
    maxParticipants: 20,
    childrenAllowed: true,
  },
  {
    slug: 'ateliers-culturels-3',
    name: '3 Ateliers Culturels',
    price: 7000,
    childrenPrice: 4000,
    availableDays: ['tuesday', 'friday'],
    maxParticipants: 20,
    childrenAllowed: true,
  },
  {
    slug: 'diner-spectacle',
    name: 'Diner-Spectacle',
    price: 10500,
    childrenPrice: 4950,
    availableDays: ['tuesday', 'friday'],
    maxParticipants: 150,
    childrenAllowed: true,
  },
  {
    slug: 'spectacle-seul',
    name: 'Spectacle Seul',
    price: 4950,
    childrenPrice: 2500,
    availableDays: ['tuesday', 'friday'],
    maxParticipants: 200,
    childrenAllowed: true,
  },
]

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('fr-PF', {
    style: 'currency',
    currency: 'XPF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function BookingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialService = searchParams.get('service')

  const [selectedSlug, setSelectedSlug] = useState(initialService || '')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const selectedProduct = useMemo(
    () => products.find((product) => product.slug === selectedSlug),
    [selectedSlug]
  )

  const totalPrice = useMemo(() => {
    if (!selectedProduct) return 0
    const adultTotal = adults * selectedProduct.price
    const childTotal = children * (selectedProduct.childrenPrice || 0)
    return adultTotal + childTotal
  }, [adults, children, selectedProduct])

  const handleAddToCart = async () => {
    if (!selectedProduct || !selectedDate || !selectedTime) return

    setIsProcessing(true)
    try {
      const booking = {
        product: selectedProduct.slug,
        productName: selectedProduct.name,
        date: selectedDate.toISOString(),
        time: selectedTime,
        adults,
        children,
        totalPrice,
        timestamp: new Date().toISOString(),
      }

      // Save to localStorage
      const existingCart = localStorage.getItem('cart')
      const cart = existingCart ? JSON.parse(existingCart) : []
      cart.push(booking)
      localStorage.setItem('cart', JSON.stringify(cart))

      // Redirect to checkout
      router.push('/checkout')
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error)
      alert('Erreur lors de l\'ajout au panier. Veuillez réessayer.')
    } finally {
      setIsProcessing(false)
    }
  }

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '-'

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Calendar Section */}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-serif text-primary mb-6">Selectionner une activite</h2>

          <label className="block text-sm font-semibold text-primary mb-2">Activite</label>
          <select
            value={selectedSlug}
            onChange={(event) => setSelectedSlug(event.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">-- Selectionnez une activite --</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name} - {formatPrice(product.price)}
              </option>
            ))}
          </select>
        </div>

        <BookingCalendar
          availableDays={selectedProduct?.availableDays}
          onDateSelect={setSelectedDate}
          selectedDate={selectedDate}
        />

        <div className="bg-white rounded-lg shadow-lg p-8">
          <label className="block text-sm font-semibold text-primary mb-2">Heure</label>
          <select
            value={selectedTime}
            onChange={(event) => setSelectedTime(event.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">-- Selectionnez une heure --</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="14:00">14:00</option>
            <option value="16:00">16:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
          </select>
        </div>

        <ParticipantSelector
          adults={adults}
          childrenCount={children}
          onAdultsChange={setAdults}
          onChildrenChange={setChildren}
          childrenAllowed={selectedProduct?.childrenAllowed}
          maxParticipants={selectedProduct?.maxParticipants}
          adultPrice={selectedProduct?.price}
          childPrice={selectedProduct?.childrenPrice}
        />
      </div>

      {/* Booking Summary */}
      <div>
        <div className="bg-sand rounded-lg shadow-lg p-8 sticky top-24">
          <h2 className="text-2xl font-serif text-primary mb-6">Resume de la reservation</h2>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-700">Activite</span>
              <span className="font-semibold">
                {selectedProduct ? selectedProduct.name : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Date</span>
              <span className="font-semibold">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Heure</span>
              <span className="font-semibold">{selectedTime || '-'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Participants</span>
              <span className="font-semibold">{adults + children}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span className="font-semibold text-primary">Total</span>
                <span className="text-2xl font-bold text-accent">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!selectedProduct || !selectedDate || !selectedTime || isProcessing}
            className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Ajout en cours...' : 'Ajouter au panier'}
          </button>

          <p className="text-xs text-gray-600">
            Conseil : pour les groupes de plus de 10 personnes, contactez-nous pour les tarifs speciaux.
          </p>
        </div>
      </div>
    </div>
  )
}

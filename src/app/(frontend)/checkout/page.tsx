'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

interface BookingItem {
  product: string
  productName: string
  date: string
  time: string
  adults: number
  children: number
  totalPrice: number
  timestamp: string
}

const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('fr-PF', {
    style: 'currency',
    currency: 'XPF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<BookingItem[]>([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const cart = localStorage.getItem('cart')
    if (cart) {
      try {
        setCartItems(JSON.parse(cart))
      } catch (error) {
        console.error('Erreur lors de la lecture du panier:', error)
      }
    }
  }, [])

  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0)

  const handleRemoveItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const handleClearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  const handleCheckout = async () => {
    if (!firstName || !lastName || !email || !phone || cartItems.length === 0) {
      alert('Veuillez remplir tous les champs et avoir au moins une réservation.')
      return
    }

    setIsProcessing(true)
    try {
      // Create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { firstName, lastName, email, phone },
          items: cartItems,
          totalAmount,
        }),
      })

      if (!response.ok) throw new Error('Erreur lors de la création de la commande')

      const { orderId, message } = await response.json()

      // Clear cart
      localStorage.removeItem('cart')
      setCartItems([])

      // Show success message
      alert(`${message}\n\nNuméro de commande: ${orderId}`)

      // Redirect to services after delay
      setTimeout(() => {
        window.location.href = '/services'
      }, 1000)
    } catch (error) {
      console.error('Erreur lors du paiement:', error)
      alert('Erreur lors du traitement du paiement: ' + (error instanceof Error ? error.message : 'inconnue'))
    } finally {
      setIsProcessing(false)
    }
  }

  if (!mounted) {
    return <div className="h-screen flex items-center justify-center">Chargement...</div>
  }

  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen py-20 px-4 bg-gradient-to-b from-white to-sand">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-12 text-center">
            Finaliser votre réservation
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Cart Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif text-primary">Panier</h2>
                  {cartItems.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="text-sm text-red-600 hover:text-red-700 underline"
                    >
                      Vider le panier
                    </button>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="bg-sand rounded-lg p-6 text-center">
                    <p className="text-gray-600 mb-2">Panier vide</p>
                    <p className="text-3xl font-bold text-accent">0 XPF</p>
                    <p className="text-gray-600 text-sm mt-6">
                      Aucune réservation dans votre panier.{' '}
                      <Link href="/services" className="text-accent hover:underline">
                        Parcourez nos services
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-primary">{item.productName}</h3>
                          <button
                            onClick={() => handleRemoveItem(index)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            📅 {new Date(item.date).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                          <p>🕐 {item.time}</p>
                          <p>
                            👥 {item.adults} adulte{item.adults > 1 ? 's' : ''}
                            {item.children > 0 && ` + ${item.children} enfant${item.children > 1 ? 's' : ''}`}
                          </p>
                        </div>
                        <div className="pt-2 mt-2 border-t text-right">
                          <p className="font-bold text-accent">{formatPrice(item.totalPrice)}</p>
                        </div>
                      </div>
                    ))}

                    <div className="bg-sand rounded-lg p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-3xl font-bold text-accent">{formatPrice(totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-serif text-primary mb-6">Informations de paiement</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Prenom</label>
                    <input
                      type="text"
                      placeholder="Jean"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled={cartItems.length === 0}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Nom</label>
                    <input
                      type="text"
                      placeholder="Dupont"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled={cartItems.length === 0}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="jean@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled={cartItems.length === 0}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Telephone</label>
                    <input
                      type="tel"
                      placeholder="+689 00 00 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled={cartItems.length === 0}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    {cartItems.length === 0 ? (
                      <p className="text-sm text-gray-600">
                        Veuillez ajouter des réservations avant de procéder au paiement.
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Le paiement sera traité de manière sécurisée.
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0 || isProcessing}
                    className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Traitement en cours...' : 'Procéder au paiement'}
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  ℹ️ <strong>Paiement sécurisé</strong> : Nos paiements sont traités de manière sécurisée
                  par PayZen/OSB avec chiffrement SSL.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/services" className="text-accent hover:underline">
              ← Retour aux services
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

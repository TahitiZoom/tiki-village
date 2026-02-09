import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Paiement - Tiki Village',
  description: 'Finalisez votre réservation',
}

export default function CheckoutPage() {
  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-12">Finaliser votre réservation</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-serif text-primary mb-6">Résumé de la commande</h2>
                
                <div className="bg-sand rounded-lg p-6 text-center">
                  <p className="text-gray-600 mb-2">Panier vide</p>
                  <p className="text-3xl font-bold text-accent">0 XPF</p>
                </div>

                <p className="text-gray-600 text-sm mt-6">
                  Aucune réservation dans votre panier. 
                  <Link href="/services" className="text-accent hover:underline ml-1">
                    Parcourez nos services
                  </Link>
                </p>
              </div>
            </div>

            {/* Payment Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-serif text-primary mb-6">Informations de paiement</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Nom complet</label>
                    <input 
                      type="text" 
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="jean@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      Le formulaire de paiement s'affichera une fois votre réservation ajoutée au panier.
                    </p>
                  </div>

                  <button 
                    disabled
                    className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Procéder au paiement
                  </button>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  ℹ️ <strong>Paiement sécurisé</strong> : Nos paiements sont traités de manière sécurisée par PayZen/OSB avec chiffrement SSL.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="text-accent hover:underline"
            >
              ← Retour aux services
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

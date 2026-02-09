import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Réserver une activité - Tiki Village',
  description: 'Sélectionnez une date et réservez votre activité',
}

export default function BookingPage() {
  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6">Réservation d'activité</h1>
          
          <div className="mb-12">
            <Link href="/services" className="text-accent hover:text-accent/80">
              ← Retour aux services
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-serif text-primary mb-6">Sélectionner une date</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Activité</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">-- Sélectionnez une activité --</option>
                      <option value="atelier-culturel-1">1 Atelier Culturel - 3 500 XPF</option>
                      <option value="ateliers-culturels-3">3 Ateliers Culturels - 7 000 XPF</option>
                      <option value="diner-spectacle">Dîner-Spectacle - 10 500 XPF</option>
                      <option value="spectacle-seul">Spectacle Seul - 4 950 XPF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Date</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Heure</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent">
                      <option value="">-- Sélectionnez une heure --</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="14:00">14:00</option>
                      <option value="16:00">16:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Nombre de participants</label>
                    <input 
                      type="number" 
                      min="1" 
                      defaultValue="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div>
              <div className="bg-sand rounded-lg shadow-lg p-8 sticky top-24">
                <h2 className="text-2xl font-serif text-primary mb-6">Résumé de la réservation</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Activité</span>
                    <span className="font-semibold">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Date</span>
                    <span className="font-semibold">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Heure</span>
                    <span className="font-semibold">-</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Participants</span>
                    <span className="font-semibold">1</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-primary">Total</span>
                      <span className="text-2xl font-bold text-accent">0 XPF</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors mb-3">
                  Ajouter au panier
                </button>

                <Link
                  href="/contact"
                  className="block w-full text-center border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                >
                  Nous contacter pour plus d'info
                </Link>

                <p className="text-xs text-gray-600 mt-6">
                  💡 Conseil : Pour les groupes de plus de 10 personnes, veuillez nous contacter directement pour les tarifs spéciaux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

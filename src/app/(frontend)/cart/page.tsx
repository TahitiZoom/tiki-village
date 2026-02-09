import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Panier - Tiki Village',
  description: 'Votre panier de réservations',
}

export default function CartPage() {
  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-12">Votre Panier</h1>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-serif text-gray-700 mb-4">Panier vide</h2>
              <p className="text-gray-600 mb-8">
                Vous n'avez pas encore ajouté d'éléments à votre panier. 
                Explorez nos services et réservations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/services"
                  className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  Découvrir nos services
                </Link>
                <Link
                  href="/"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-sand rounded-lg p-8">
            <h3 className="text-2xl font-serif text-primary mb-4">Comment réserver ?</h3>
            <ol className="space-y-4 text-gray-700">
              <li className="flex">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-accent text-white font-bold mr-4">
                  1
                </span>
                <span>Parcourez notre catalogue de services et ateliers</span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-accent text-white font-bold mr-4">
                  2
                </span>
                <span>Cliquez sur "Réserver" et sélectionnez votre date et heure</span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-accent text-white font-bold mr-4">
                  3
                </span>
                <span>Complétez votre réservation et procédez au paiement</span>
              </li>
              <li className="flex">
                <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-accent text-white font-bold mr-4">
                  4
                </span>
                <span>Recevez votre confirmation et code de réservation par email</span>
              </li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

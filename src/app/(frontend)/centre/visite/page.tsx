import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'La Visite - Tiki Village',
  description: 'Visitez Tiki Village et découvrez la culture polynésienne en immersion',
}

export default function VisitePage() {
  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 container mx-auto max-w-7xl">
            <Link
              href="/"
              className="text-accent hover:text-accent/80 transition-colors mb-6 inline-block"
            >
              ← Retour à l'accueil
            </Link>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">La Visite</h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              Explorez Tiki Village et découvrez sa richesse culturelle
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-4xl font-serif text-primary mb-6">
                <span className="polynesian-pattern">Parcours de visite</span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Visitez Tiki Village et immergez-vous dans la culture polynésienne authentique. Notre site accueille les visiteurs 
                pour une expérience sur mesure, du matin au coucher de soleil.
              </p>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Les zones à explorer</h3>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🎭 La zone des spectacles</h4>
                <p className="text-gray-700">
                  Assistez à nos spectacles envoûtants de danse polynésienne. Chaque représentation raconte une histoire 
                  ancestrale, accompagnée de musique traditionnelle et de costumes richement ornés.
                </p>
              </div>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🎨 Les ateliers culturels</h4>
                <p className="text-gray-700">
                  Participez à nos ateliers interactifs : tressage, tatouage polynésien, danse et musique. 
                  Apprenez directement des artisans locaux.
                </p>
              </div>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🏠 Les fare traditionnels</h4>
                <p className="text-gray-700">
                  Explorez nos habitations traditionnelles polynésiennes, l'architecture ancienne, et les techniques 
                  de construction ancestrales.
                </p>
              </div>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🍽️ Le restaurant</h4>
                <p className="text-gray-700">
                  Savourez des plats polynésiens authentiques préparés selon les traditions culinaires du Pacifique. 
                  Vue imprenable sur les jardins tropicaux.
                </p>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Informations pratiques</h3>
              <ul className="text-gray-700 space-y-3 mb-6">
                <li>✓ Visite courte : 2 heures - Parfait pour un aperçu</li>
                <li>✓ Visite complète : 4 à 6 heures - Immersion totale</li>
                <li>✓ Accès gratuit aux jardins avec accès payant aux spectacles et ateliers</li>
                <li>✓ Parking disponible et gratuit</li>
                <li>✓ Articles de restaurant et boutique souvenirs</li>
              </ul>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-primary text-white p-8 rounded-lg">
                  <h4 className="font-serif text-2xl mb-4">Horaires d'ouverture</h4>
                  <ul className="space-y-2 text-sm">
                    <li>🕙 Lun-Sam : 09:00 - 18:00</li>
                    <li>🕙 Dimanche : 10:00 - 17:00</li>
                    <li>💤 Fermeture : Jour de Noël</li>
                  </ul>
                </div>
                <div className="bg-accent text-white p-8 rounded-lg">
                  <h4 className="font-serif text-2xl mb-4">Tarifs</h4>
                  <ul className="space-y-2 text-sm">
                    <li>👥 Adulte : 2 500 XPF</li>
                    <li>👧 Enfant (4-11 ans) : 1 500 XPF</li>
                    <li>👶 Gratuit : moins de 4 ans</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-lg p-8 text-center mt-12">
              <h3 className="text-2xl font-serif mb-4">Planifiez votre visite</h3>
              <p className="mb-6 text-lg">Découvrez nos services et réservez votre expérience</p>
              <Link
                href="/contact"
                className="inline-block bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-sand transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

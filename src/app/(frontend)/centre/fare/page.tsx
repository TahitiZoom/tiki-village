import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Les Fare - Tiki Village',
  description: 'Découvrez les habitations traditionnelles polynésiennes de Tiki Village',
}

export default function FarePage() {
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
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Les Fare</h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              Les habitations traditionnelles polynésiennes
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-4xl font-serif text-primary mb-6">
                <span className="polynesian-pattern">Architecture traditionnelle</span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Les Fare sont des habitations traditionnelles polynésiennes construites selon des méthodes ancestrales. 
                Tiki Village conserve et valorise ces structures emblématiques qui représentent l'harmonie entre l'homme 
                et la nature.
              </p>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Caractéristiques du Fare</h3>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🏗️ Structure</h4>
                <p className="text-gray-700">
                  Les Fare sont construits avec des matériaux naturels locaux : bois de cocotier, feuilles de cocotier, 
                  feuilles de bananier et cordes tressées. Aucun clou n'est utilisé - les pièces sont assemblées par 
                  nouage selon les techniques ancestrales.
                </p>
              </div>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🌬️ Ventilation</h4>
                <p className="text-gray-700">
                  Le design ouvert des Fare favorise la circulation naturelle de l'air océan, maintenant une température 
                  confortable. Le toit surélevé permet à la chaleur de s'échapper, tandis que les ouvertures permettent 
                  aux brises tropicales de circuler librement.
                </p>
              </div>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🌴 Durabilité</h4>
                <p className="text-gray-700">
                  Contrairement aux apparences, les Fare sont extrêmement durables. Construits pour durer plusieurs décennies, 
                  ils peuvent supporter les tempêtes tropicales. L'entretien régulier des matériaux naturels maintient 
                  leur intégrité structurelle.
                </p>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Nos Fare à Tiki Village</h3>

              <div className="space-y-6 mb-12">
                <div className="border-l-4 border-accent pl-6">
                  <h4 className="font-serif text-lg text-primary mb-2">Le Fare Vai (Maison de l'eau)</h4>
                  <p className="text-gray-700">
                    Située près du lagon, cette fare traditionnelle est utilisée pour les cérémonies de bienvenue 
                    et les rituels d'initiation. Elle incarne la connexion spirituelle avec l'eau.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h4 className="font-serif text-lg text-primary mb-2">Le Fare Honu (Maison de la tortue)</h4>
                  <p className="text-gray-700">
                    Cette habitation représente la sagesse ancestrale. Elle est utilisée pour les ateliers d'artisanat 
                    et les enseignements traditionnels.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h4 className="font-serif text-lg text-primary mb-2">Le Fare Noa (Maison libre)</h4>
                  <p className="text-gray-700">
                    Un espace polyvalent utilisé pour les spectacles intimes, les repas traditionnels et les réunions culturelles.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Visite guidée des Fare</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nos guides experts vous expliqueront les techniques de construction, les matériaux utilisés, 
                et l'importance culturelle de chaque structure. Vous découvrirez comment nos ancêtres ont créé 
                des habitations parfaitement adaptées à leur environnement tropical.
              </p>

              <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-8 rounded-lg my-12">
                <h4 className="font-serif text-2xl mb-4">Durée de la visite</h4>
                <p className="mb-4">Visite guidée incluse avec accès à Tiki Village</p>
                <p className="text-sm">
                  Sessions régulières à : 10:00, 13:00, 15:00
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-lg p-8 text-center mt-12">
              <h3 className="text-2xl font-serif mb-4">Visitez nos Fare</h3>
              <p className="mb-6 text-lg">Réservez votre visite guidée dès maintenant</p>
              <Link
                href="/contact"
                className="inline-block bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-sand transition-colors"
              >
                Réserver
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

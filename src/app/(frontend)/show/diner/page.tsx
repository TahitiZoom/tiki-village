import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Le Dîner - Tiki Village',
  description: 'Découvrez notre expérience gastronomique polynésienne complète',
}

export default function DinerPage() {
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
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Le Dîner</h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              Une expérience gastronomique inoubliable sous les étoiles polynésiennes
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-4xl font-serif text-primary mb-6">
                <span className="polynesian-pattern">Dîner traditionnel polynésien</span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Immergez-vous dans une soirée magique combinant la gastronomie authentique polynésienne et l'ambiance 
                enchantée de Tiki Village. Chaque détail est pensé pour créer une expérience sensorielle inoubliable.
              </p>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Le Menu</h3>
              <p className="text-gray-700 mb-6 italic">Un voyage gastronomique à travers les îles polynésiennes</p>

              <div className="bg-sand p-8 rounded-lg mb-8">
                <div className="space-y-4">
                  <div className="border-b border-primary pb-3">
                    <h4 className="font-serif text-lg text-primary">Entrée</h4>
                    <p className="text-gray-700 text-sm mt-1">
                      Brochettes de fruits tropicaux & Accas de morue - Parfait pour débuter votre soirée
                    </p>
                  </div>

                  <div className="border-b border-primary pb-3">
                    <h4 className="font-serif text-lg text-primary">Plat Principal</h4>
                    <p className="text-gray-700 text-sm mt-1">
                      Poisson cru à la sauce coco & Cochon rôti aux feuilles de bananier - 
                      Accompagnés de taro et bananes plantains
                    </p>
                  </div>

                  <div className="pb-3">
                    <h4 className="font-serif text-lg text-primary">Dessert</h4>
                    <p className="text-gray-700 text-sm mt-1">
                      Gâteau de coco traditionnel & Fruits exotiques de saison
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Déroulement de la soirée</h3>

              <div className="space-y-6 mb-12">
                <div className="border-l-4 border-accent pl-6">
                  <h4 className="font-serif text-lg text-primary mb-2">🕖 VH 18h00 - Accueil</h4>
                  <p className="text-gray-700">
                    Bienvenue à Tiki Village ! Cérémonie traditionnelle d'accueil avec lei de fleurs polynésiennes.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h4 className="font-serif text-lg text-primary mb-2">🕖 18h30 - Apéritif</h4>
                  <p className="text-gray-700">
                    Cocktails tropicaux et jus de fruits frais dans l'ambiance enchantée de la soirée.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h4 className="font-serif text-lg text-primary mb-2">🕖 19h00 - Dîner</h4>
                  <p className="text-gray-700">
                    Dégustation du menu traditionnel polynésien sous les étoiles.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h4 className="font-serif text-lg text-primary mb-2">🕖 20h30 - Spectacle</h4>
                  <p className="text-gray-700">
                    Spectacle de danse polynésienne captivant mettant en avant les traditions ancestrales.
                  </p>
                </div>

                <div className="border-l-4 border-accent pl-6">
                  <h4 className="font-serif text-lg text-primary mb-2">🕖 22h00 - Fin de soirée</h4>
                  <p className="text-gray-700">
                    Fin de la soirée avec souvenirs inoubliables.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Tarifs & Réservation</h3>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-primary text-white p-8 rounded-lg">
                  <h4 className="font-serif text-2xl mb-4">Par personne</h4>
                  <p className="text-accent text-3xl font-bold mb-2">10 500 XPF</p>
                  <p className="text-sm">
                    Incluant accueil traditionnel, dîner complet, cocktails et spectacle
                  </p>
                </div>
                <div className="bg-accent text-white p-8 rounded-lg">
                  <h4 className="font-serif text-2xl mb-4">Informations</h4>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Réservation obligatoire</li>
                    <li>✓ Groupes de 2 à 50 personnes</li>
                    <li>✓ Régimes spéciaux possibles</li>
                    <li>✓ Transport disponible</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                * Petit groupe minimum requis. Contactez-nous pour les tarifs spéciaux groupes.
              </p>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-lg p-8 text-center mt-12">
              <h3 className="text-2xl font-serif mb-4">Réservez votre soirée</h3>
              <p className="mb-6 text-lg">Une expérience gastronomique polynésienne unique vous attend</p>
              <Link
                href="/contact"
                className="inline-block bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-sand transition-colors"
              >
                Réserver maintenant
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

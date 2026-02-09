import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Le Spectacle - Tiki Village',
  description: 'Assistez à notre spectacle de danse polynésienne traditionnel captivant',
}

export default function SpectaclePage() {
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
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Le Spectacle</h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              Laissez-vous enchanter par la magie de la danse polynésienne
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-4xl font-serif text-primary mb-6">
                <span className="polynesian-pattern">Danse polynésienne traditionnelle</span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Notre spectacle vous transporte au cœur de la culture polynésienne à travers des danses ancestrales, 
                des musiques envoûtantes et des costumes richement ornés. Une expérience sensorielle captivante.
              </p>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Programme du spectacle</h3>

              <div className="space-y-6 mb-12">
                <div className="bg-sand p-6 rounded-lg">
                  <h4 className="font-serif text-xl text-primary mb-2">💃 Tamouré</h4>
                  <p className="text-gray-700">
                    La danse traditionnelle tahitienne par excellence. Mouvements gracieux des hanches et des bras, 
                    accompagnés par les percussions traditionnelles en un rythme envoûtant.
                  </p>
                </div>

                <div className="bg-sand p-6 rounded-lg">
                  <h4 className="font-serif text-xl text-primary mb-2">🪅 Aparima</h4>
                  <p className="text-gray-700">
                    Danse narrative racontant des histoires anciennes. Les mains et les mouvements du corps créent 
                    une conversation silencieuse avec le public, exprimant amour, passion et légendes.
                  </p>
                </div>

                <div className="bg-sand p-6 rounded-lg">
                  <h4 className="font-serif text-xl text-primary mb-2">🔱 Danse Marquisienne</h4>
                  <p className="text-gray-700">
                    Les danses des Marquises, plus guerrières et dynamiques. Mouvements forts et expressifs qui racontent 
                    les histoires de bravoure et d'honneur de l'archipel.
                  </p>
                </div>

                <div className="bg-sand p-6 rounded-lg">
                  <h4 className="font-serif text-xl text-primary mb-2">🎵 Chants traditionnels</h4>
                  <p className="text-gray-700">
                    Voix mélodieuses chantant en polynésien traditionnel, accompagnées d'ukulélés et instruments 
                    traditionnels. L'âme de la Polynésie à travers le chant.
                  </p>
                </div>

                <div className="bg-sand p-6 rounded-lg">
                  <h4 className="font-serif text-xl text-primary mb-2">🏹 Démonstration d'adresse</h4>
                  <p className="text-gray-700">
                    Acrobaties traditionnelles et jeux d'adresse polynésiens. Les guerriers d'aujourd'hui démontrent 
                    la force et la flexibilité des anciens guerriers polynésiens.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Les artistes</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Notre troupe est composée de danseurs et musiciens polynésiens authentiques, passionnés par la transmission 
                de leur culture. Chaque performance reflète des années de formation et d'engagement envers la préservation 
                des traditions ancestrales.
              </p>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg my-12">
                <h4 className="font-serif text-2xl text-primary mb-4">Informations pratiques</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>🕰️ Durée : 1h30 de spectacle captivant</li>
                  <li>📍 Lieu : Scène principale de Tiki Village</li>
                  <li>🎫 Accès : Billet de spectacle ou inclus au dîner-spectacle</li>
                  <li>👥 Capacité : Séances régulières pour tous les groupes</li>
                  <li>📸 Photographies et vidéos autorisées</li>
                </ul>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Horaires</h3>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-primary text-white p-8 rounded-lg">
                  <h4 className="font-serif text-xl mb-4">Jours disponibles</h4>
                  <ul className="space-y-2 text-sm">
                    <li>✓ Lundi à Samedi</li>
                    <li>✓ Sessions : 16h00 et 20h00</li>
                    <li>✓ Dimanche sur demande</li>
                  </ul>
                </div>
                <div className="bg-accent text-white p-8 rounded-lg">
                  <h4 className="font-serif text-xl mb-4">Tarifs</h4>
                  <ul className="space-y-2 text-sm">
                    <li>👤 Spectacle seul : 4 950 XPF</li>
                    <li>👫 Tarif groupe : à partir de 4 500 XPF</li>
                    <li>👨‍👩‍👧‍👦 Groupe 10+ : Tarifs spéciaux</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-lg p-8 text-center mt-12">
              <h3 className="text-2xl font-serif mb-4">Assistez à notre spectacle</h3>
              <p className="mb-6 text-lg">Une expérience culturelle polynésienne inoubliable</p>
              <Link
                href="/contact"
                className="inline-block bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-sand transition-colors"
              >
                Réserver vos places
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

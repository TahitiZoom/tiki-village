import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Mariages Polynésiens - Tiki Village',
  description: 'Célébrez votre union dans un cadre authentique polynésien',
}

export default function MariagesPage() {
  const packages = [
    {
      name: 'Mariage Maeva',
      price: 70000,
      description: 'Formule essentielle pour une cérémonie intime',
      features: [
        'Cérémonie traditionnelle polynésienne',
        'Tenues traditionnelles pour les mariés',
        'Couronne de fleurs (hei)',
        'Photographe pendant la cérémonie',
        'Certificat de mariage symbolique',
      ],
    },
    {
      name: 'Mariage Natihere',
      price: 120000,
      description: 'Formule complète avec réception',
      features: [
        'Tout ce qui est inclus dans Maeva',
        'Réception avec buffet polynésien',
        'Spectacle de danse privé',
        'Décoration florale complète',
        'Musiciens traditionnels',
      ],
      featured: true,
    },
    {
      name: 'Mariage Vaiarii',
      price: 160000,
      description: 'Formule prestige pour un jour exceptionnel',
      features: [
        'Tout ce qui est inclus dans Natihere',
        'Arrivée en pirogue traditionnelle',
        'Hébergement dans fare traditionnel',
        'Spa couple polynésien',
        'Vidéo professionnelle',
      ],
    },
    {
      name: 'Mariage Herenui',
      price: 195000,
      description: 'Formule luxe, le summum de l\'authenticité',
      features: [
        'Tout ce qui est inclus dans Vaiarii',
        'Cérémonie au coucher du soleil',
        'Dîner gastronomique privé',
        'Photoshoot pre-wedding',
        'Service de conciergerie personnalisé',
      ],
    },
  ]

  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-32 px-4 bg-gradient-to-br from-primary via-primary/90 to-accent/80 text-white">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 container mx-auto max-w-7xl text-center">
            <h1 className="text-5xl md:text-7xl font-serif mb-6">
              Mariages Polynésiens
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              Vivez une cérémonie traditionnelle authentique dans le cadre magique
              de Tiki Village
            </p>
            <Link href="/contact" className="inline-block bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-sand transition-colors">
              Demander un devis
            </Link>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 px-4 bg-sand">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-serif text-primary mb-6">
              <span className="polynesian-pattern">Une Cérémonie Inoubliable</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Célébrez votre amour avec une cérémonie de mariage traditionnelle polynésienne.
              Entourés de nos artistes et artisans, vous vivrez un moment unique et authentique,
              respectant les coutumes ancestrales de nos îles.
            </p>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-serif text-primary text-center mb-12">
              <span className="polynesian-pattern">Nos Formules</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col ${
                    pkg.featured ? 'ring-4 ring-accent transform scale-105' : ''
                  }`}
                >
                  {pkg.featured && (
                    <div className="bg-accent text-white text-center py-2 text-sm font-semibold">
                      ★ POPULAIRE ★
                    </div>
                  )}
                  
                  <div className="p-6 flex-grow">
                    <h3 className="text-2xl font-serif text-primary mb-2">
                      {pkg.name}
                    </h3>
                    <div className="text-3xl font-bold text-accent mb-4">
                      {pkg.price.toLocaleString()} XPF
                    </div>
                    <p className="text-gray-600 text-sm mb-6">
                      {pkg.description}
                    </p>
                    
                    <div className="space-y-3">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-start text-sm">
                          <span className="text-accent mr-2 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                    >
                      Réserver
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Options */}
        <section className="py-20 px-4 bg-sand">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-serif text-primary text-center mb-12">
              <span className="polynesian-pattern">Options Supplémentaires</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">📀</div>
                <h3 className="text-xl font-semibold text-primary mb-2">DVD Souvenir</h3>
                <p className="text-gray-600 mb-4">
                  Vidéo professionnelle de votre cérémonie
                </p>
                <div className="text-2xl font-bold text-accent">30 000 XPF</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">📷</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Album Photos</h3>
                <p className="text-gray-600 mb-4">
                  Album premium avec tirages professionnels
                </p>
                <div className="text-2xl font-bold text-accent">25 000 XPF</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Package Photo+Vidéo</h3>
                <p className="text-gray-600 mb-4">
                  Combo avantageux photos et vidéo
                </p>
                <div className="text-2xl font-bold text-accent">50 000 XPF</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">💆</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Massage Couple</h3>
                <p className="text-gray-600 mb-4">
                  Moment de détente avant la cérémonie
                </p>
                <div className="text-2xl font-bold text-accent">15 000 XPF</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">💐</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Bouquet Premium</h3>
                <p className="text-gray-600 mb-4">
                  Bouquet de fleurs tropicales exceptionnel
                </p>
                <div className="text-2xl font-bold text-accent">12 000 XPF</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-primary mb-2">Invités Supplémentaires</h3>
                <p className="text-gray-600 mb-4">
                  Adulte : 10 500 XPF<br />
                  Enfant : 4 950 XPF
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-serif text-primary mb-6">
                Politique d'Annulation
              </h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  <p>
                    <strong>Moins de 24 heures :</strong> Remboursement intégral (100%)
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  <p>
                    <strong>Jusqu'à 7 jours avant :</strong> Remboursement de 30%
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-accent mr-3">•</span>
                  <p>
                    <strong>Plus de 7 jours avant :</strong> Aucun remboursement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-accent to-accent/80 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-serif mb-6">
              Prêts à Dire "Oui" à la Polynésienne ?
            </h2>
            <p className="text-xl mb-8">
              Contactez-nous pour discuter de votre cérémonie sur-mesure
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-sand transition-colors"
            >
              Nous Contacter
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

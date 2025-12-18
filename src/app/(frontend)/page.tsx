import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-serif mb-6">
            Tiki Village
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Centre Culturel Polynésien
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Découvrez la culture polynésienne authentique à travers nos spectacles,
            ateliers et cérémonies traditionnelles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="btn-primary">
              Nos Services
            </Link>
            <Link href="/contact" className="btn-secondary">
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-4">
            <span className="polynesian-pattern">Nos Services</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Vivez une expérience culturelle unique à Tiki Village
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Ateliers Culturels */}
            <div className="card hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/40"></div>
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-3">Ateliers Culturels</h3>
                <p className="text-gray-600 mb-4">
                  Participez à nos ateliers traditionnels : tressage, danse, musique polynésienne
                </p>
                <p className="text-2xl font-bold text-accent mb-4">
                  À partir de 3 500 XPF
                </p>
                <Link href="/services/ateliers" className="text-accent hover:underline">
                  En savoir plus →
                </Link>
              </div>
            </div>

            {/* Dîner-Spectacle */}
            <div className="card hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-secondary/20 to-secondary/40"></div>
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-3">Dîner-Spectacle</h3>
                <p className="text-gray-600 mb-4">
                  Savourez un festin polynésien suivi d'un spectacle de danse époustouflant
                </p>
                <p className="text-2xl font-bold text-accent mb-4">
                  10 500 XPF
                </p>
                <Link href="/services/diner-spectacle" className="text-accent hover:underline">
                  En savoir plus →
                </Link>
              </div>
            </div>

            {/* Mariages */}
            <div className="card hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/40"></div>
              <div className="p-6">
                <h3 className="text-2xl font-serif mb-3">Mariages Polynésiens</h3>
                <p className="text-gray-600 mb-4">
                  Célébrez votre union dans un cadre authentique et magique
                </p>
                <p className="text-2xl font-bold text-accent mb-4">
                  À partir de 70 000 XPF
                </p>
                <Link href="/mariages" className="text-accent hover:underline">
                  En savoir plus →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-12">
            <span className="polynesian-pattern">Témoignages</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20"></div>
                  <div className="ml-4">
                    <div className="font-semibold">Client {i}</div>
                    <div className="text-yellow-500">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Une expérience inoubliable ! Le spectacle était magnifique et le personnel très accueillant."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent to-accent/80 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Prêt à vivre l'expérience Tiki Village ?
          </h2>
          <p className="text-xl mb-8">
            Réservez dès maintenant votre activité ou spectacle
          </p>
          <Link href="/services" className="inline-block bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-sand transition-colors">
            Réserver maintenant
          </Link>
        </div>
      </section>
    </div>
  )
}

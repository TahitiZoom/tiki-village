import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Historique - Tiki Village',
  description: 'Découvrez l\'histoire de Tiki Village et de la culture polynésienne',
}

export default function HistoriquePage() {
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
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Historique</h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              Une histoire riche et authentique enracinée dans la culture polynésienne
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-4xl font-serif text-primary mb-6">
                <span className="polynesian-pattern">L'histoire de Tiki Village</span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Tiki Village est née d'une passion pour la préservation de la culture polynésienne authentique. 
                Établi en cœur de Tahiti, notre centre culturel représente des décennies de dédication à la transmission 
                des traditions, des arts et des coutumes polynésiens.
              </p>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Les origines</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Fondé par des artisans et des passionnés de la culture polynésienne, Tiki Village a commencé pour répondre 
                à un besoin : créer un espace où les traditions polynésiennes pourraient être célébrées, enseignées et 
                expérimentées de manière authentique. Notre vision était de créer un pont entre le passé et le présent.
              </p>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">L'évolution</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Au fil des années, Tiki Village s'est développé en devenant un centre culturel reconnu, accueillant des 
                visiteurs du monde entier désireux de plonger dans l'univers fascinant de la Polynésie. Nous avons élargi 
                nos offres pour inclure des ateliers, des spectacles, des cérémonies traditionnelles et des expériences 
                culinaires authentiques.
              </p>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Notre engagement</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Aujourd'hui, Tiki Village reste fidèle à sa mission originelle : préserver et célébrer la richesse de la 
                culture polynésienne. Chaque activité, chaque spectacle, chaque atelier est conçu pour offrir une expérience 
                véritablement immersive et respectueuse de nos traditions millénaires.
              </p>

              <div className="grid md:grid-cols-3 gap-8 my-12">
                <div className="bg-sand p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">🌺</div>
                  <h4 className="font-serif text-xl text-primary mb-2">Authenticité</h4>
                  <p className="text-gray-700 text-sm">
                    Tous nos spectacles et ateliers sont conduits par des artisans et artistes polynésiens authentiques.
                  </p>
                </div>
                <div className="bg-sand p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <h4 className="font-serif text-xl text-primary mb-2">Communauté</h4>
                  <p className="text-gray-700 text-sm">
                    Nous travaillons en étroite collaboration avec les communautés polynésiennes locales.
                  </p>
                </div>
                <div className="bg-sand p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">🌴</div>
                  <h4 className="font-serif text-xl text-primary mb-2">Respect</h4>
                  <p className="text-gray-700 text-sm">
                    Chaque tradition est respectée et présentée avec le respect qu'elle mérite.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-lg p-8 text-center mt-12">
              <h3 className="text-2xl font-serif mb-4">Vivez l'histoire polynésienne</h3>
              <p className="mb-6 text-lg">Découvrez nos spectacles, ateliers et expériences immersives</p>
              <Link
                href="/services"
                className="inline-block bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-sand transition-colors"
              >
                Nos Services
              </Link>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-12 px-4 bg-sand">
          <div className="container mx-auto max-w-7xl">
            <h3 className="text-2xl font-serif text-center mb-8 text-primary">
              Explorez le Centre
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <Link
                href="/centre/historique"
                className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">📖</div>
                <h4 className="font-serif text-primary">Historique</h4>
              </Link>
              <Link
                href="/centre/visite"
                className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">🚶</div>
                <h4 className="font-serif text-primary">La Visite</h4>
              </Link>
              <Link
                href="/centre/fare"
                className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">🏠</div>
                <h4 className="font-serif text-primary">Les Fare</h4>
              </Link>
              <Link
                href="/centre/restaurant"
                className="bg-white p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">🍽️</div>
                <h4 className="font-serif text-primary">Le Restaurant</h4>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

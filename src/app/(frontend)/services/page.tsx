import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/ui/ProductCard'

export const metadata = {
  title: 'Nos Services - Tiki Village',
  description: 'Découvrez nos ateliers culturels, spectacles et expériences polynésiennes',
}

export default function ServicesPage() {
  // Sample products - In production, fetch from Payload API
  const products = [
    {
      id: '1',
      name: '1 Atelier Culturel',
      slug: 'atelier-culturel-1',
      price: 3500,
      shortDescription: 'Participez à un atelier de votre choix : tressage, tatouage, danse ou musique',
      bookable: true,
      category: 'Ateliers',
    },
    {
      id: '2',
      name: '3 Ateliers Culturels',
      slug: 'ateliers-culturels-3',
      price: 7000,
      shortDescription: 'Profitez de 3 ateliers différents pour une immersion culturelle complète',
      bookable: true,
      category: 'Ateliers',
    },
    {
      id: '3',
      name: 'Dîner-Spectacle',
      slug: 'diner-spectacle',
      price: 10500,
      shortDescription: 'Savourez un festin tahitien traditionnel suivi d\'un spectacle de danse envoûtant',
      bookable: true,
      category: 'Soirées',
    },
    {
      id: '4',
      name: 'Spectacle Seul',
      slug: 'spectacle-seul',
      price: 4950,
      shortDescription: 'Assistez à notre spectacle de danse polynésienne traditionnelle',
      bookable: true,
      category: 'Soirées',
    },
  ]

  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 container mx-auto max-w-7xl text-center">
            <h1 className="text-5xl md:text-6xl font-serif mb-6">
              Nos Services
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Découvrez la richesse de la culture polynésienne à travers nos ateliers,
              spectacles et expériences authentiques
            </p>
          </div>
        </section>

        {/* Ateliers Section */}
        <section className="py-20 px-4 bg-sand">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-serif text-primary text-center mb-4">
              <span className="polynesian-pattern">Ateliers Culturels</span>
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Apprenez les arts traditionnels polynésiens avec nos artisans locaux
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {products.filter(p => p.category === 'Ateliers').map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>

            {/* Workshop Details */}
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-serif text-primary mb-6">
                Ateliers Disponibles
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                    🌺
                  </div>
                  <h4 className="font-semibold mb-2">Tressage</h4>
                  <p className="text-sm text-gray-600">
                    Apprenez l'art du tressage de feuilles de pandanus
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                    🎨
                  </div>
                  <h4 className="font-semibold mb-2">Tatouage</h4>
                  <p className="text-sm text-gray-600">
                    Découvrez les symboles du tatouage polynésien
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                    💃
                  </div>
                  <h4 className="font-semibold mb-2">Danse</h4>
                  <p className="text-sm text-gray-600">
                    Initiez-vous aux danses traditionnelles tahitiennes
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                    🎵
                  </div>
                  <h4 className="font-semibold mb-2">Musique</h4>
                  <p className="text-sm text-gray-600">
                    Jouez des instruments polynésiens traditionnels
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shows Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-serif text-primary text-center mb-4">
              <span className="polynesian-pattern">Spectacles & Soirées</span>
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Vivez une soirée inoubliable au rythme de la Polynésie
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {products.filter(p => p.category === 'Soirées').map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-accent to-accent/80 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-serif mb-6">
              Intéressé par un Mariage Polynésien ?
            </h2>
            <p className="text-xl mb-8">
              Célébrez votre union dans un cadre authentique et magique
            </p>
            <a
              href="/mariages"
              className="inline-block bg-white text-accent px-8 py-4 rounded-lg font-semibold hover:bg-sand transition-colors"
            >
              Découvrir nos formules mariage
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Sample products data - should be fetched from Payload API in production
const products = [
  {
    id: '1',
    name: '1 Atelier Culturel',
    slug: 'atelier-culturel-1',
    price: 3500,
    shortDescription: 'Participez à un atelier de votre choix : tressage, tatouage, danse ou musique',
    fullDescription: `Explorez l'un des quatre ateliers culturels proposés par Tiki Village : 

**Tressage** : Apprenez l'art traditionnel du tressage de feuilles de pandanus avec nos artisans locaux. Créez vos propres paniers et objets décorés.

**Tatouage** : Découvrez la signification profonde des symboles du tatouage polynésien et laissez nos artistes créer un motif temporaire authentique sur votre peau.

**Danse** : Initiez-vous aux danses traditionnelles tahitiennes avec nos danseurs professionnels. Apprenez les mouvements gracieux du tamouré.

**Musique** : Jouez des instruments polynésiens traditionnels comme l'ukulélé et les percussions traditionnelles.

Chaque atelier dure 2 heures et est adapté à tous les niveaux.`,
    bookable: true,
    category: 'Ateliers',
    duration: '2 heures',
    groupSize: 'Individuel ou petit groupe',
    accessibility: 'Accessible à tous',
  },
  {
    id: '2',
    name: '3 Ateliers Culturels',
    slug: 'ateliers-culturels-3',
    price: 7000,
    shortDescription: 'Profitez de 3 ateliers différents pour une immersion culturelle complète',
    fullDescription: `Vivez une immersion complète dans la culture polynésienne avec notre formule 3 ateliers.

Vous aurez l'opportunité de choisir 3 des 4 ateliers disponibles et de passer 6 heures en total avec nos artisans locaux.

**Contenu** :
- 3 ateliers de 2 heures chacun
- Supervision personnalisée d'artisans traditionnels
- Certificats de participation
- Accès à l'espace culturel du resort

Cette formule est idéale pour une immersion plus profonde dans les arts et traditions polynésiens.`,
    bookable: true,
    category: 'Ateliers',
    duration: '6 heures (3 × 2h)',
    groupSize: 'Individuel ou petit groupe',
    accessibility: 'Accessible à tous',
  },
  {
    id: '3',
    name: 'Dîner-Spectacle',
    slug: 'diner-spectacle',
    price: 10500,
    shortDescription: 'Savourez un festin tahitien traditionnel suivi d\'un spectacle de danse envoûtant',
    fullDescription: `Vivez une soirée magique combinant la gastronomie polynésienne et un spectacle traditionnel de danse.

**Menu Traditionnel** :
- Poisson cru à la sauce coco (Poisson Cru)
- Cochon rôti aux feuilles de bananier
- Taro et bananes plantains
- Fruits tropicaux frais
- Desserts polynésiens

**Spectacle** :
- Dances traditionnelles Tahitiennes
- Dances Marquisiennas
- Chants traditionnels
- Démonstration de jeux d'adresse

La soirée combine authenticité, authenticité culinaire et performances impressionnantes pour une expérience inoubliable sous les étoiles polynésiennes.`,
    bookable: true,
    category: 'Soirées',
    duration: '3 heures',
    groupSize: 'Pour tous les groupes',
    accessibility: 'Accessible à tous',
  },
  {
    id: '4',
    name: 'Spectacle Seul',
    slug: 'spectacle-seul',
    price: 4950,
    shortDescription: 'Assistez à notre spectacle de danse polynésienne traditionnelle',
    fullDescription: `Profitez de notre spectacle de danse polynésienne traditionnel sans le dîner.

**Spectacle Inclus** :
- Dances traditionnelles Tahitiennes
- Dances Marquisiennas  
- Chants traditionnels
- Démonstration de jeux d'adresse polynésiens

D'une durée de 1,5 heure, ce spectacle captivant met en avant les meilleurs danseurs de Tiki Village et célèbre les traditions ancestrales.

Parfait pour ceux qui souhaitent découvrir les arts de la danse polynésienne sans le repas complet.`,
    bookable: true,
    category: 'Soirées',
    duration: '1,5 heures',
    groupSize: 'Pour tous les groupes',
    accessibility: 'Accessible à tous',
  },
]

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return {
      title: 'Service non trouvé - Tiki Village',
    }
  }

  return {
    title: `${product.name} - Tiki Village`,
    description: product.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 container mx-auto max-w-7xl">
            <Link
              href="/services"
              className="text-accent hover:text-accent/80 transition-colors mb-6 inline-block"
            >
              ← Retour aux services
            </Link>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">{product.name}</h1>
            <p className="text-xl md:text-2xl max-w-3xl">{product.shortDescription}</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              {/* Details */}
              <div className="md:col-span-2">
                <div className="prose prose-lg max-w-none mb-12">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {product.fullDescription}
                  </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                  <div className="bg-sand p-6 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Durée</h3>
                    <p className="text-gray-700">{product.duration}</p>
                  </div>
                  <div className="bg-sand p-6 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Groupe</h3>
                    <p className="text-gray-700">{product.groupSize}</p>
                  </div>
                  <div className="bg-sand p-6 rounded-lg">
                    <h3 className="font-semibold text-primary mb-2">Accessibilité</h3>
                    <p className="text-gray-700">{product.accessibility}</p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="sticky top-20 bg-sand rounded-lg p-8 shadow-lg">
                  <div className="mb-8">
                    <p className="text-sm text-gray-600 mb-2">Prix par personne</p>
                    <p className="text-4xl font-bold text-accent mb-1">
                      {product.price.toLocaleString('fr-FR')}
                    </p>
                    <p className="text-sm text-gray-600">XPF</p>
                  </div>

                  {product.bookable && (
                    <Link
                      href={`/contact?service=${product.slug}`}
                      className="block w-full bg-accent text-white py-4 rounded-lg font-semibold text-center hover:bg-accent/90 transition-colors mb-4"
                    >
                      Réserver
                    </Link>
                  )}

                  <Link
                    href="/contact"
                    className="block w-full border-2 border-primary text-primary py-4 rounded-lg font-semibold text-center hover:bg-primary/5 transition-colors"
                  >
                    Poser une question
                  </Link>

                  <p className="text-xs text-gray-500 mt-6 text-center">
                    Besoin d'aide ? Contactez-nous pour des arrangements spéciaux
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-20 px-4 bg-sand">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-serif text-center mb-12">
              <span className="polynesian-pattern">Autres Services</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {products
                .filter(
                  (p) =>
                    p.slug !== product.slug &&
                    p.category === product.category
                )
                .slice(0, 3)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/services/${relatedProduct.slug}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-serif text-primary mb-2 group-hover:text-accent transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-gray-600 mb-4 flex-grow">
                          {relatedProduct.shortDescription}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xl font-bold text-accent">
                            {relatedProduct.price.toLocaleString('fr-FR')} XPF
                          </span>
                          <span className="text-accent group-hover:translate-x-2 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            {products.filter(
              (p) =>
                p.slug !== product.slug &&
                p.category === product.category
            ).length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-6">
                  Explorez tous nos services
                </p>
                <Link
                  href="/services"
                  className="inline-block bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  Voir tous les services
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

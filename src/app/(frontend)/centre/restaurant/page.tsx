import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Le Restaurant - Tiki Village',
  description: 'Découvrez la gastronomie polynésienne authentique au restaurant de Tiki Village',
}

export default function RestaurantPage() {
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
            <h1 className="text-5xl md:text-6xl font-serif mb-6">Le Restaurant</h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              Savourez les saveurs authentiques de la Polynésie
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-4xl font-serif text-primary mb-6">
                <span className="polynesian-pattern">Gastronomie polynésienne</span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Le restaurant de Tiki Village offre une expérience culinaire unique, mettant en avant les saveurs authentiques 
                de la Polynésie. Chaque plat est préparé selon les traditions ancestrales avec des ingrédients locaux frais.
              </p>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Nos spécialités</h3>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🐟 Poisson cru à la sauce coco</h4>
                <p className="text-gray-700">
                  Le plat emblématique de la Polynésie. Poisson frais mariné dans du jus de citron et de la crème de coco, 
                  garni de légumes croquants. Un chef-d'œuvre de saveurs marines.
                </p>
              </div>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🐷 Cochon Rôti aux feuilles de Bananier</h4>
                <p className="text-gray-700">
                  Cochon entier rôti lentement dans un four traditionnel, enveloppé de feuilles de bananier. 
                  Viande tendre et succulente, imprégnée des arômes de la nature.
                </p>
              </div>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🥔 Taro et Bananes Plantains</h4>
                <p className="text-gray-700">
                  Accompagnements traditionnels cuits à la perfection. Riche en saveurs terreuses et nutritives, 
                  complément parfait aux plats principaux.
                </p>
              </div>

              <div className="bg-sand p-6 rounded-lg mb-6">
                <h4 className="font-serif text-xl text-primary mb-2">🍍 Fruits Tropicaux Frais</h4>
                <p className="text-gray-700">
                  Papaye, mangue, noix de coco, ananas et fruits exotiques de saison, servis frais ou en jus. 
                  Rafraîchissants et pleins de vitalité tropicale.
                </p>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Expérience culinaire</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Dinez sous les étoiles polynésiennes, bercé par les sons de la nature et les mélodies traditionnelles. 
                Notre restaurant offre une atmosphère chaleureuse et authentique, où chaque repas devient une célébration 
                de la culture polynésienne.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-primary text-white p-8 rounded-lg">
                  <h4 className="font-serif text-2xl mb-4">Informations</h4>
                  <ul className="space-y-3 text-sm">
                    <li>🕙 Déjeuner : 12:00 - 14:30</li>
                    <li>🕘 Dîner : 18:30 - 21:30</li>
                    <li>👥 Réservation conseillée</li>
                    <li>📞 Contactez-nous</li>
                  </ul>
                </div>
                <div className="bg-accent text-white p-8 rounded-lg">
                  <h4 className="font-serif text-2xl mb-4">Menus fixes</h4>
                  <ul className="space-y-3 text-sm">
                    <li>💰 Déjeuner : À partir de 3 500 XPF</li>
                    <li>💰 Dîner : À partir de 6 500 XPF</li>
                    <li>🍷 Boissons locales disponibles</li>
                    <li>🥗 Régimes spéciaux possibles</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Dîner-Spectacle</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Combinez votre repas avec notre spectacle de danse polynésienne pour une expérience inoubliable. 
                Profitez de la beauté des arts traditionnels tout en savourant nos délicieuses spécialités culinaires.
              </p>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-lg p-8 text-center mt-12">
              <h3 className="text-2xl font-serif mb-4">Réservez votre table</h3>
              <p className="mb-6 text-lg">Vivez une expérience gastronomique polynésienne unique</p>
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

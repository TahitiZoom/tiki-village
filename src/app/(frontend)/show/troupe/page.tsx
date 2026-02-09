import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'La Troupe - Tiki Village',
  description: 'Rencontrez les danseurs et musiciens de Tiki Village',
}

export default function TroupePage() {
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
            <h1 className="text-5xl md:text-6xl font-serif mb-6">La Troupe</h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              Les gardiens de la culture polynésienne
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="prose prose-lg max-w-none mb-12">
              <h2 className="text-4xl font-serif text-primary mb-6">
                <span className="polynesian-pattern">Notre troupe artistique</span>
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                La troupe de Tiki Village est composée de danseurs, musiciens et artisans passionnés, tous polynésiens 
                authentiques. Chaque membre apporte son talent unique et sa passion pour la préservation des traditions.
              </p>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Nos artistes</h3>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-sand p-6 rounded-lg">
                  <div className="text-5xl mb-4 text-center">💃</div>
                  <h4 className="font-serif text-xl text-primary mb-2 text-center">Danseurs</h4>
                  <p className="text-gray-700 text-sm">
                    Maîtres du tamouré et de l'aparima, nos danseurs incarnent la grâce et la passion de la Polynésie. 
                    Formés dès l'enfance, ils exécutent chaque mouvement avec perfection et émotion.
                  </p>
                </div>

                <div className="bg-sand p-6 rounded-lg">
                  <div className="text-5xl mb-4 text-center">🎵</div>
                  <h4 className="font-serif text-xl text-primary mb-2 text-center">Musiciens</h4>
                  <p className="text-gray-700 text-sm">
                    Experts des instruments traditionnels polynésiens - ukulélé, pu'u (percussions), tare (tambours) 
                    - nos musiciens créent l'ambiance magique de chaque performance.
                  </p>
                </div>

                <div className="bg-sand p-6 rounded-lg">
                  <div className="text-5xl mb-4 text-center">🎨</div>
                  <h4 className="font-serif text-xl text-primary mb-2 text-center">Artisans</h4>
                  <p className="text-gray-700 text-sm">
                    Créateurs de costumes traditionnels, de tapis tressés et d'objets artisanaux. 
                    Ils maintiennent vivantes les techniques ancestrales de création polynésienne.
                  </p>
                </div>

                <div className="bg-sand p-6 rounded-lg">
                  <div className="text-5xl mb-4 text-center">🏛️</div>
                  <h4 className="font-serif text-xl text-primary mb-2 text-center">Guides</h4>
                  <p className="text-gray-700 text-sm">
                    Conteurs d'histoires et passeurs de traditions, nos guides partagent la richesse 
                    et la profondeur de la culture polynésienne avec expertise.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Notre engagement</h3>
              <div className="bg-primary text-white p-8 rounded-lg mb-12">
                <p className="mb-4">
                  Chaque membre de la troupe s'engage à :
                </p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Préserver et transmettre les traditions polynésiennes authentiques</li>
                  <li>✓ Excellence artistique dans chaque performance</li>
                  <li>✓ Respect et dignité envers la culture polynésienne</li>
                  <li>✓ Engagement communautaire et éducatif</li>
                  <li>✓ Passion dans la célébration de notre héritage</li>
                </ul>
              </div>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Formation et apprentissage</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nos artistes sont formés selon les méthodes traditionnelles polynésiennes, transmises de génération en génération. 
                La danse tahitienne, la musique traditionnelle et l'artisanat ne s'apprennent pas seulement, ils se vivent 
                et se respirent. Chaque performance reflète des années d'étude, de pratique et d'engagement envers l'excellence.
              </p>

              <h3 className="text-2xl font-serif text-primary mt-12 mb-4">Ateliers avec la troupe</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Souhaitez-vous apprendre directement auprès de nos artistes ? Nous proposons des ateliers exclusifs où vous 
                pouvez maîtriser les bases de la danse,  apprendre à jouer des instruments traditionnels ou découvrir des 
                techniques artisanales authentiques. Une opportunité unique d'apprentissage auprès des véritables maîtres 
                polynésiens.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-12">
                <Link
                  href="/services"
                  className="bg-accent text-white p-6 rounded-lg text-center hover:bg-accent/90 transition-colors"
                >
                  <div className="text-3xl mb-2">🎓</div>
                  <h4 className="font-serif font-bold mb-2">Ateliers</h4>
                  <p className="text-sm">Apprenez des artisans</p>
                </Link>
                <Link
                  href="/show/spectacle"
                  className="bg-primary text-white p-6 rounded-lg text-center hover:bg-primary/90 transition-colors"
                >
                  <div className="text-3xl mb-2">🎭</div>
                  <h4 className="font-serif font-bold mb-2">Spectacles</h4>
                  <p className="text-sm">Assistez aux performances</p>
                </Link>
                <Link
                  href="/show/diner"
                  className="bg-secondary text-white p-6 rounded-lg text-center hover:bg-secondary/90 transition-colors"
                >
                  <div className="text-3xl mb-2">🍽️</div>
                  <h4 className="font-serif font-bold mb-2">Dîner-Spectacle</h4>
                  <p className="text-sm">Expérience complète</p>
                </Link>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-accent to-accent/80 text-white rounded-lg p-8 text-center mt-12">
              <h3 className="text-2xl font-serif mb-4">Rejoignez notre communauté</h3>
              <p className="mb-6 text-lg">Vivez une expérience culturelle authentique polynésienne</p>
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

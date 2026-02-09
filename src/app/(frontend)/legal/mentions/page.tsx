import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Mentions Légales - Tiki Village',
  description: 'Mentions légales et informations légales de Tiki Village',
}

export default function MentionsPage() {
  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="text-accent hover:text-accent/80 mb-6 inline-block">
            ← Retour à l'accueil
          </Link>

          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-12">
            Mentions Légales
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">Éditeur du Site</h2>
              <div className="bg-sand p-6 rounded-lg">
                <p className="font-semibold">TIKI VILLAGE</p>
                <p>Centre Culturel Polynésien</p>
                <p>Adresse : Punaauia, 98718 Tahiti, Polynésie Française</p>
                <p>Téléphone : +689 XX XX XX XX</p>
                <p>Email : contact@tikivillage.pf</p>
                <p>SIRET : [À compléter]</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">Directeur de la Publication</h2>
              <p>
                [Nom du directeur] - Directeur de Tiki Village
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">Hébergeur</h2>
              <p>
                <strong>Vercel Inc.</strong><br />
                440 N Barranca Ave<br />
                Coyote, CA 95014<br />
                USA<br />
                www.vercel.com
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">Conception &amp; Développement</h2>
              <p>
                Site web conçu et développé par TahitiZoom
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">1. Propriété Intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé par les lois de propriété 
                intellectuelle. Toute reproduction, modification ou distribution sans autorisation écrite est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">2. Utilisation du Site</h2>
              <p>
                L'utilisateur s'engage à utiliser ce site de manière licite, légale et ne violant pas les droits de tiers.
              </p>
              <p className="mt-3">
                Sont interdits : les activités illégales, le spam, les attaques informatiques, la fraude, et toute autre 
                activité contraire à l'ordre public.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">3. Responsabilité</h2>
              <p>
                Tiki Village s'efforce de maintenir les informations à jour, mais n'offre aucune garantie quant à 
                l'exactitude ou la complétude du contenu.
              </p>
              <p className="mt-3">
                Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'accès au site.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">4. Liens Externes</h2>
              <p>
                Ce site peut contenir des liens vers d'autres sites externes. 
                Nous ne sommes pas responsables du contenu de ces sites externes.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">5. Données Personnelles</h2>
              <p>
                Pour plus d'informations sur la gestion de vos données personnelles, 
                consultez notre <Link href="/legal/privacy" className="text-accent hover:underline">Politique de Confidentialité</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">6. Conformité Légale</h2>
              <p>
                Ce site est soumis aux lois de la Polynésie française et de la France.
                Tous les litiges seront tranchés par les tribunaux compétents.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">7. Contact</h2>
              <p>
                Pour toute question concernant les mentions légales, 
                <Link href="/contact" className="text-accent hover:underline"> veuillez nous contacter</Link>.
              </p>
            </section>

            <section className="bg-sand p-6 rounded-lg">
              <p className="text-sm">
                <strong>Dernière mise à jour :</strong> 9 février 2026
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

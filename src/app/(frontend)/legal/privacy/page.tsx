import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Politique de Confidentialité - Tiki Village',
  description: 'Politique de confidentialité et protection des données de Tiki Village',
}

export default function PrivacyPage() {
  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="text-accent hover:text-accent/80 mb-6 inline-block">
            ← Retour à l'accueil
          </Link>

          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-12">
            Politique de Confidentialité
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">1. Introduction</h2>
              <p>
                Chez Tiki Village, nous respectons votre vie privée et nous engageons à protéger vos données personnelles. 
                Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">2. Données Collectées</h2>
              <p>
                Nous collectons les données personnelles suivantes :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Nom, prénom, email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale</li>
                <li>Informations de paiement (traitées de manière sécurisée)</li>
                <li>Historique de réservations</li>
                <li>Données de navigation (cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">3. Utilisation des Données</h2>
              <p>
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Traiter vos réservations et paiements</li>
                <li>Vous envoyer des confirmations et mises à jour</li>
                <li>Améliorer nos services</li>
                <li>Communication marketing (avec consentement)</li>
                <li>Conformité légale et obligations fiscales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">4. Protection des Données</h2>
              <p>
                Nous utilisons des mesures de sécurité avancées pour protéger vos données :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Chiffrement SSL/TLS pour tous les échanges</li>
                <li>Paiements traités par PayZen/OSB certifié PCI-DSS</li>
                <li>Accès restreint aux données</li>
                <li>Sauvegarde régulière des données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">5. Partage des Données</h2>
              <p>
                Nous ne partageons vos données qu'avec :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Les prestataires de paiement (PayZen/OSB)</li>
                <li>D'autres entités uniquement avec votre consentement explicite</li>
                <li>Les autorités légales si légalement requises</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">6. Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience. 
                Vous pouvez contrôler les cookies via les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">7. Vos Droits</h2>
              <p>
                Vous avez le droit de :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Accéder à vos données personnelles</li>
                <li>Corriger vos données</li>
                <li>Supprimer vos données</li>
                <li>Vous opposer au traitement</li>
                <li>Retirer votre consentement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">8. Contact</h2>
              <p>
                Pour exercer vos droits ou pour toute question, 
                <Link href="/contact" className="text-accent hover:underline"> contactez-nous</Link>.
              </p>
            </section>

            <section className="bg-sand p-6 rounded-lg">
              <p className="text-sm">
                <strong>Dernière mise à jour :</strong> 9 février 2026
              </p>
              <p className="text-sm mt-2">
                Cette politique peut être modifiée à tout moment. Les modifications seront affichées sur cette page.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

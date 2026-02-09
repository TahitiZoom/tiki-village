import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'CGV - Conditions Générales de Vente - Tiki Village',
  description: 'Conditions générales de vente et d\'utilisation de Tiki Village',
}

export default function CGVPage() {
  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/" className="text-accent hover:text-accent/80 mb-6 inline-block">
            ← Retour à l'accueil
          </Link>

          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-12">
            Conditions Générales de Vente
          </h1>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">1. Objet</h2>
              <p>
                Les présentes conditions générales de vente définissent les conditions d'accès et d'utilisation du site 
                tiki-village.com ainsi que les conditions de vente des services et produits proposés.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">2. Produits et Services</h2>
              <p>
                Tiki Village propose des services culturels polynésiens incluant spectacles, ateliers, dîners et cérémonies. 
                Les tarifs sont affichés en Francs Pacifiques (XPF) et incluent les taxes applicables.
              </p>
              <p className="mt-3">
                Les prix peuvent être modifiés sans préavis. Les tarifs valides sont ceux affichés au moment de la confirmation de la réservation.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">3. Réservations et Annulation</h2>
              <p>
                <strong>Confirmation :</strong> Toute réservation doit être confirmée par email. Une attestation de réservation 
                est envoyée au client lors de la confirmation.
              </p>
              <p className="mt-3">
                <strong>Délai d'annulation :</strong> Les annulations doivent être effectuées au moins 48 heures avant la date de l'activité.
              </p>
              <p className="mt-3">
                <strong>Remboursement :</strong> Les annulations respectant le délai seront remboursées à 100%. Au-delà de ce délai, 
                aucun remboursement ne sera accordé.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">4. Paiement</h2>
              <p>
                Les paiements sont acceptés par cartes bancaires (Visa, Mastercard) via le système de paiement sécurisé PayZen/OSB.
              </p>
              <p className="mt-3">
                Le paiement doit être effectué avant la date de l'activité. En cas de non-paiement, 
                la réservation sera annulée automatiquement.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">5. Responsabilité</h2>
              <p>
                Tiki Village ne peut être tenu responsable des annulations dues :
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>À des conditions météorologiques extrêmes</li>
                <li>À des circonstances indépendantes de notre volonté</li>
                <li>À des cas de force majeure</li>
              </ul>
              <p className="mt-3">
                En cas d'annulation suite à ces événements, un remboursement complet ou un report sera proposé.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">6. Hygiene et Santé</h2>
              <p>
                Les participants doivent être en bonne santé pour participer aux activités. 
                Toute condition médicale doit être signalée lors de la réservation.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">7. Droit à l'image</h2>
              <p>
                En participant aux activités de Tiki Village, les participants consentent à l'utilisation de photographies 
                et vidéos à des fins promotionnelles et éducatives.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-serif text-primary mb-4">8. Litiges</h2>
              <p>
                En cas de litige, les parties s'engagent à chercher une résolution amiable. 
                L'ensemble des litiges relève de la juridiction compétente en Polynésie française.
              </p>
            </section>

            <section className="bg-sand p-6 rounded-lg">
              <p className="text-sm">
                <strong>Dernière mise à jour :</strong> 9 février 2026
              </p>
              <p className="text-sm mt-2">
                Pour toute question concernant nos CGV, veuillez 
                <Link href="/contact" className="text-accent hover:underline"> nous contacter</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

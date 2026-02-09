import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import BookingForm from '@/components/booking/BookingForm'

export const metadata = {
  title: 'Réserver une activité - Tiki Village',
  description: 'Sélectionnez une date et réservez votre activité',
}

export default function BookingPage() {
  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-serif text-primary mb-6">Réservation d'activité</h1>
          
          <div className="mb-12">
            <Link href="/services" className="text-accent hover:text-accent/80">
              ← Retour aux services
            </Link>
          </div>

          <BookingForm />
        </div>
      </main>
      <Footer />
    </>
  )
}

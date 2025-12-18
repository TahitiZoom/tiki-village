import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/forms/ContactForm'

export const metadata = {
  title: 'Contact - Tiki Village',
  description: 'Contactez-nous pour toute question ou demande de réservation',
}

export default function ContactPage() {
  return (
    <>
      <Header currentLocale="fr" />
      <main className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif text-primary mb-4">
              <span className="polynesian-pattern">Contactez-nous</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une question ? Une demande spéciale ? Notre équipe est à votre écoute
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="bg-white rounded-lg p-8 shadow-md mb-8">
                <h2 className="text-2xl font-serif text-primary mb-6">
                  Nos Coordonnées
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <div className="font-semibold text-primary mb-1">Adresse</div>
                      <div className="text-gray-600">
                        Punaauia<br />
                        98718 Tahiti<br />
                        Polynésie Française
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      📧
                    </div>
                    <div>
                      <div className="font-semibold text-primary mb-1">Email</div>
                      <a href="mailto:contact@tikivillage.pf" className="text-accent hover:underline">
                        contact@tikivillage.pf
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      📞
                    </div>
                    <div>
                      <div className="font-semibold text-primary mb-1">Téléphone</div>
                      <a href="tel:+689XXXXXXXX" className="text-accent hover:underline">
                        +689 XX XX XX XX
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      🕐
                    </div>
                    <div>
                      <div className="font-semibold text-primary mb-1">Horaires</div>
                      <div className="text-gray-600">
                        Mardi & Vendredi : 11h00 - 21h00<br />
                        Autres jours : Sur rendez-vous
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-xl font-serif text-primary mb-4">
                  Nous Trouver
                </h3>
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/40 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">🗺️</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

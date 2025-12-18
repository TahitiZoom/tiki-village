import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <span className="text-xl">🗿</span>
              </div>
              <div className="font-serif text-xl font-bold">Tiki Village</div>
            </div>
            <p className="text-gray-300 text-sm">
              Centre Culturel Polynésien authentique proposant spectacles, ateliers 
              et cérémonies traditionnelles au cœur de Tahiti.
            </p>
          </div>

          {/* Le Centre */}
          <div>
            <h3 className="font-serif text-lg mb-4">Le Centre</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/centre/historique" className="text-gray-300 hover:text-accent transition-colors">
                  Historique
                </Link>
              </li>
              <li>
                <Link href="/centre/visite" className="text-gray-300 hover:text-accent transition-colors">
                  La Visite
                </Link>
              </li>
              <li>
                <Link href="/centre/fare" className="text-gray-300 hover:text-accent transition-colors">
                  Les Fare
                </Link>
              </li>
              <li>
                <Link href="/centre/restaurant" className="text-gray-300 hover:text-accent transition-colors">
                  Le Restaurant
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/ateliers" className="text-gray-300 hover:text-accent transition-colors">
                  Ateliers Culturels
                </Link>
              </li>
              <li>
                <Link href="/services/diner-spectacle" className="text-gray-300 hover:text-accent transition-colors">
                  Dîner-Spectacle
                </Link>
              </li>
              <li>
                <Link href="/services/spectacle" className="text-gray-300 hover:text-accent transition-colors">
                  Spectacle Seul
                </Link>
              </li>
              <li>
                <Link href="/mariages" className="text-gray-300 hover:text-accent transition-colors">
                  Mariages Polynésiens
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📍 Punaauia, Tahiti</li>
              <li>📧 contact@tikivillage.pf</li>
              <li>📞 +689 XX XX XX XX</li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  F
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  I
                </a>
                <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                  Y
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-wrap items-center justify-between">
            <div className="text-sm text-gray-300">
              Paiement sécurisé par PayZen/OSB
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">💳 Visa</span>
              <span className="text-sm text-gray-300">💳 Mastercard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-300">
            <div>
              © {currentYear} Tiki Village. Tous droits réservés.
            </div>
            <div className="flex space-x-6">
              <Link href="/legal/cgv" className="hover:text-accent transition-colors">
                CGV
              </Link>
              <Link href="/legal/privacy" className="hover:text-accent transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/legal/mentions" className="hover:text-accent transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

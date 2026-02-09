'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

interface HeaderProps {
  currentLocale?: string
}

export default function Header({ currentLocale = 'fr' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [activeLocale, setActiveLocale] = useState(currentLocale)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ]

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )tv_locale=([^;]+)/)
    if (match?.[1]) {
      setActiveLocale(match[1])
    }
  }, [])

  const localeLinks = useMemo(() => {
    const localeCodes = languages.map((lang) => lang.code)
    const parts = pathname.split('/').filter(Boolean)
    const hasLocale = parts.length > 0 && localeCodes.includes(parts[0])
    const baseParts = hasLocale ? parts.slice(1) : parts
    const basePath = `/${baseParts.join('/')}` || '/'
    const queryString = searchParams.toString()

    return languages.reduce<Record<string, string>>((acc, lang) => {
      const localizedPath = `/${lang.code}${basePath === '/' ? '' : basePath}`
      acc[lang.code] = queryString ? `${localizedPath}?${queryString}` : localizedPath
      return acc
    }, {})
  }, [pathname, searchParams])

  const navigation = [
    { name: 'Accueil', href: '/' },
    { 
      name: 'Le Centre',
      submenu: [
        { name: 'Historique', href: '/centre/historique' },
        { name: 'La Visite', href: '/centre/visite' },
        { name: 'Les Fare', href: '/centre/fare' },
        { name: 'Le Restaurant', href: '/centre/restaurant' },
      ]
    },
    {
      name: 'Le Show',
      submenu: [
        { name: 'Le Dîner', href: '/show/diner' },
        { name: 'Le Spectacle', href: '/show/spectacle' },
        { name: 'La Troupe', href: '/show/troupe' },
      ]
    },
    { name: 'Nos Services', href: '/services' },
    { name: 'Mariages', href: '/mariages' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 text-sm">
        <div className="container mx-auto max-w-7xl flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>📍 Punaauia, Tahiti</span>
            <span>📧 contact@tikivillage.pf</span>
            <span>📞 +689 XX XX XX XX</span>
          </div>
          <div className="flex items-center space-x-3">
            <a href="#" className="hover:text-accent transition-colors">Facebook</a>
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent transition-colors">YouTube</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <span className="text-2xl">🗿</span>
              </div>
              <div>
                <div className="font-serif text-2xl text-primary font-bold">
                  Tiki Village
                </div>
                <div className="text-xs text-gray-600">Centre Culturel Polynésien</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.submenu ? (
                    <>
                      <button className="text-primary hover:text-accent transition-colors font-medium">
                        {item.name}
                      </button>
                      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-2 text-primary hover:bg-sand hover:text-accent transition-colors"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-primary hover:text-accent transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center space-x-2 text-primary hover:text-accent transition-colors"
                >
                  <span>{languages.find(l => l.code === activeLocale)?.flag}</span>
                  <span className="hidden sm:inline">{languages.find(l => l.code === activeLocale)?.code.toUpperCase()}</span>
                </button>
                {langMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={localeLinks[lang.code]}
                        onClick={() => setLangMenuOpen(false)}
                        className="block w-full text-left px-4 py-2 text-primary hover:bg-sand hover:text-accent transition-colors flex items-center space-x-2 cursor-pointer"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* User Account */}
              <Link href="/admin" className="text-primary hover:text-accent transition-colors" title="Connexion Admin">
                👤
              </Link>

              {/* Cart */}
              <Link href="/checkout" className="relative text-primary hover:text-accent transition-colors">
                🛒
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-primary"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4">
              {navigation.map((item) => (
                <div key={item.name} className="py-2">
                  {item.submenu ? (
                    <>
                      <div className="font-medium text-primary mb-2">{item.name}</div>
                      <div className="pl-4 space-y-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.name}
                            href={subitem.href}
                            className="block text-gray-600 hover:text-accent"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block font-medium text-primary hover:text-accent"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}

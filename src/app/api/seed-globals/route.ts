import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: Request) {
  const token = request.headers.get('x-seed-token') || new URL(request.url).searchParams.get('token')

  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config })

    // Seed SiteSettings
    console.log('Seeding SiteSettings...')
    const siteSettings = await payload.updateGlobal({
      slug: 'site-settings',
      locale: 'fr',
      overrideAccess: true,
      data: {
        siteName: 'Tiki Village',
        siteDescription: 'Le centre culturel polynesien - Un voyage authentique au coeur de la Polynesie francaise',
        defaultSEO: {
          title: 'Tiki Village - Centre Culturel Polynesien',
          description: 'Decouvrez les traditions et spectacles polynesiens authentiques a Tiki Village',
          keywords: 'polynesie, spectacle, culture, reservation',
        },
        contact: {
          email: 'contact@tikivillage.pf',
          phone: '+689 50 84 22 77',
          address: 'Punaauia, 98701 Tahiti\nPolynesie francaise',
          googleMapsUrl: 'https://maps.google.com/?q=Punaauia+Tahiti',
        },
        businessHours: [
          { day: 'monday', open: '09:00', close: '22:00', closed: false },
          { day: 'tuesday', open: '09:00', close: '23:00', closed: false },
          { day: 'wednesday', open: '09:00', close: '22:00', closed: false },
          { day: 'thursday', open: '09:00', close: '22:00', closed: false },
          { day: 'friday', open: '09:00', close: '23:00', closed: false },
          { day: 'saturday', open: '10:00', close: '23:00', closed: false },
          { day: 'sunday', open: '10:00', close: '22:00', closed: false },
        ],
      },
    })
    console.log('✓ SiteSettings seeded')

    // Seed Header
    console.log('Seeding Header...')
    const header = await payload.updateGlobal({
      slug: 'header',
      locale: 'fr',
      overrideAccess: true,
      data: {
        navigation: [
          { label: 'Accueil', type: 'link', link: '/' },
          {
            label: 'Le Centre',
            type: 'dropdown',
            submenu: [
              { label: 'Historique', link: '/centre/historique' },
              { label: 'La Visite', link: '/centre/visite' },
              { label: 'Les Fare', link: '/centre/fare' },
              { label: 'Le Restaurant', link: '/centre/restaurant' },
            ],
          },
          {
            label: 'Le Show',
            type: 'dropdown',
            submenu: [
              { label: 'Diner-Spectacle', link: '/show/diner' },
              { label: 'Spectacle seul', link: '/show/spectacle' },
              { label: 'La Troupe', link: '/show/troupe' },
            ],
          },
          { label: 'Services', type: 'link', link: '/services' },
          { label: 'Mariages', type: 'link', link: '/mariages' },
          { label: 'Contact', type: 'link', link: '/contact' },
        ],
        topBar: {
          showTopBar: true,
          address: 'Punaauia, Tahiti 98701',
          email: 'contact@tikivillage.pf',
          phone: '+689 50 84 22 77',
          socialLinks: [
            { platform: 'facebook', url: 'https://www.facebook.com/tikivillage' },
            { platform: 'instagram', url: 'https://www.instagram.com/tikivillage' },
            { platform: 'youtube', url: 'https://www.youtube.com/tikivillage' },
            { platform: 'tripadvisor', url: 'https://www.tripadvisor.com/tikivillage' },
          ],
        },
      },
    })
    console.log('✓ Header seeded')

    // Seed Footer
    console.log('Seeding Footer...')
    const footer = await payload.updateGlobal({
      slug: 'footer',
      locale: 'fr',
      overrideAccess: true,
      data: {
        description: 'Depuis 1987, Tiki Village est le point central de la culture polynesienne. Vivez une experience authentique au coeur de Tahiti.',
        columns: [
          {
            title: 'Decouvrir',
            links: [
              { label: 'Services', url: '/services' },
              { label: 'Spectacles', url: '/show' },
              { label: 'Mariages', url: '/mariages' },
              { label: 'Contact', url: '/contact' },
            ],
          },
          {
            title: 'Infos',
            links: [
              { label: 'A propos', url: '/about' },
              { label: 'Conditions Generales', url: '/legal/cgv' },
              { label: 'Politique de Confidentialite', url: '/legal/privacy' },
              { label: 'Mentions Legales', url: '/legal/mentions' },
            ],
          },
          {
            title: 'Contact',
            links: [
              { label: 'contact@tikivillage.pf', url: 'mailto:contact@tikivillage.pf' },
              { label: '+689 50 84 22 77', url: 'tel:+68950842277' },
              { label: 'Formulaire de Contact', url: '/contact' },
            ],
          },
        ],
        socialLinks: [
          { platform: 'facebook', url: 'https://facebook.com/tikivillage' },
          { platform: 'instagram', url: 'https://instagram.com/tikivillage' },
          { platform: 'youtube', url: 'https://youtube.com/@tikivillage' },
          { platform: 'tripadvisor', url: 'https://tripadvisor.com/tikivillage' },
        ],
        copyright: '(c) 2024 Tiki Village. Tous droits reserves.',
        legalLinks: [
          { label: 'Conditions Generales de Vente', url: '/legal/cgv' },
          { label: 'Politique de Confidentialite', url: '/legal/privacy' },
          { label: 'Mentions Legales', url: '/legal/mentions' },
        ],
      },
    })
    console.log('✓ Footer seeded')

    return NextResponse.json({
      ok: true,
      message: 'Globals seeded successfully',
      results: {
        siteSettings: { id: siteSettings.id },
        header: { id: header.id },
        footer: { id: footer.id },
      },
    })
  } catch (error) {
    console.error('Globals seed error:', error)
    const message = error instanceof Error ? error.message : String(error)
    const details = (error as { data?: unknown }).data
    return NextResponse.json({ error: 'Seed failed', message, details }, { status: 500 })
  }
}

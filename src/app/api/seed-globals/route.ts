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
      data: {
        siteName: {
          fr: 'Tiki Village',
          en: 'Tiki Village',
          ja: 'ティキ・ビレッジ',
        },
        siteDescription: {
          fr: 'Le centre culturel polynesien - Un voyage authentique au coeur de la Polynesie francaise',
          en: 'The Polynesian cultural center - An authentic journey to the heart of French Polynesia',
          ja: 'ポリネシア文化センター - フランス領ポリネシアの中心への本格的な旅',
        },
        defaultSEO: {
          title: {
            fr: 'Tiki Village - Centre Culturel Polynesien',
            en: 'Tiki Village - Polynesian Cultural Center',
            ja: 'ティキ・ビレッジ - ポリネシア文化センター',
          },
          description: {
            fr: 'Decouvrez les traditions et spectacles polynesiens authentiques a Tiki Village',
            en: 'Discover authentic Polynesian traditions and shows at Tiki Village',
            ja: 'ティキ・ビレッジでポリネシアの伝統とショーをご覧ください',
          },
          keywords: {
            fr: 'polynesie, spectacle, culture, reservation',
            en: 'polynesia, show, culture, booking',
            ja: 'ポリネシア、ショー、文化、予約',
          },
        },
        contact: {
          email: 'contact@tikivillage.pf',
          phone: '+689 50 84 22 77',
          address: {
            fr: 'Punaauia, 98701 Tahiti\nPolynesie francaise',
            en: 'Punaauia, 98701 Tahiti\nFrench Polynesia',
            ja: 'Punaauia, 98701 Tahiti\nフランス領ポリネシア',
          },
          googleMapsUrl: 'https://maps.google.com/?q=Punaauia+Tahiti',
        },
        businessHours: [
          {
            day: 'monday',
            open: '09:00',
            close: '22:00',
            closed: false,
          },
          {
            day: 'tuesday',
            open: '09:00',
            close: '23:00',
            closed: false,
          },
          {
            day: 'wednesday',
            open: '09:00',
            close: '22:00',
            closed: false,
          },
          {
            day: 'thursday',
            open: '09:00',
            close: '22:00',
            closed: false,
          },
          {
            day: 'friday',
            open: '09:00',
            close: '23:00',
            closed: false,
          },
          {
            day: 'saturday',
            open: '10:00',
            close: '23:00',
            closed: false,
          },
          {
            day: 'sunday',
            open: '10:00',
            close: '22:00',
            closed: false,
          },
        ],
      },
      overrideAccess: true,
    })

    // Seed Header
    console.log('Seeding Header...')
    const header = await payload.updateGlobal({
      slug: 'header',
      data: {
        navigation: [
          {
            label: {
              fr: 'Accueil',
              en: 'Home',
              ja: 'ホーム',
            },
            type: 'link',
            link: '/',
          },
          {
            label: {
              fr: 'Le Centre',
              en: 'The Center',
              ja: 'センター',
            },
            type: 'dropdown',
            submenu: [
              {
                label: {
                  fr: 'Historique',
                  en: 'History',
                  ja: '歴史',
                },
                link: '/centre/historique',
              },
              {
                label: {
                  fr: 'La Visite',
                  en: 'Tour',
                  ja: 'ツアー',
                },
                link: '/centre/visite',
              },
              {
                label: {
                  fr: 'Les Fare',
                  en: 'Traditional Houses',
                  ja: '伝統的な家',
                },
                link: '/centre/fare',
              },
              {
                label: {
                  fr: 'Le Restaurant',
                  en: 'Restaurant',
                  ja: 'レストラン',
                },
                link: '/centre/restaurant',
              },
            ],
          },
          {
            label: {
              fr: 'Le Show',
              en: 'The Show',
              ja: 'ショー',
            },
            type: 'dropdown',
            submenu: [
              {
                label: {
                  fr: 'Diner-Spectacle',
                  en: 'Dinner Show',
                  ja: 'ディナーショー',
                },
                link: '/show/diner',
              },
              {
                label: {
                  fr: 'Spectacle seul',
                  en: 'Show only',
                  ja: 'ショーのみ',
                },
                link: '/show/spectacle',
              },
              {
                label: {
                  fr: 'La Troupe',
                  en: 'Our Troupe',
                  ja: '私たちの劇団',
                },
                link: '/show/troupe',
              },
            ],
          },
          {
            label: {
              fr: 'Services',
              en: 'Services',
              ja: 'サービス',
            },
            type: 'link',
            link: '/services',
          },
          {
            label: {
              fr: 'Mariages',
              en: 'Weddings',
              ja: 'ウェディング',
            },
            type: 'link',
            link: '/mariages',
          },
          {
            label: {
              fr: 'Contact',
              en: 'Contact',
              ja: 'お問い合わせ',
            },
            type: 'link',
            link: '/contact',
          },
        ],
        topBar: {
          showTopBar: true,
          address: {
            fr: 'Punaauia, Tahiti',
            en: 'Punaauia, Tahiti',
            ja: 'Punaauia、タヒチ',
          },
          email: 'contact@tikivillage.pf',
          phone: '+689 50 84 22 77',
          socialLinks: [
            {
              platform: 'facebook',
              url: 'https://facebook.com/tikivillage',
            },
            {
              platform: 'instagram',
              url: 'https://instagram.com/tikivillage',
            },
            {
              platform: 'youtube',
              url: 'https://youtube.com/@tikivillage',
            },
            {
              platform: 'tripadvisor',
              url: 'https://tripadvisor.com/tikivillage',
            },
          ],
        },
      },
      overrideAccess: true,
    })

    // Seed Footer
    console.log('Seeding Footer...')
    const footer = await payload.updateGlobal({
      slug: 'footer',
      data: {
        description: {
          fr: 'Depuis 1987, Tiki Village preserve les traditions polynesiennes authentiques a travers des spectacles, ateliers culturels et experiences inoubliables.',
          en: 'Since 1987, Tiki Village preserves authentic Polynesian traditions through shows, cultural workshops and unforgettable experiences.',
          ja: '1987年以来、ティキ・ビレッジはショー、文化的ワークショップ、忘れられない体験を通じてポリネシアの本物の伝統を保っています。',
        },
        columns: [
          {
            title: {
              fr: 'Decouvrir',
              en: 'Discover',
              ja: '発見する',
            },
            links: [
              {
                label: {
                  fr: 'Nos Services',
                  en: 'Our Services',
                  ja: 'サービス',
                },
                url: '/services',
              },
              {
                label: {
                  fr: 'Spectacles',
                  en: 'Shows',
                  ja: 'ショー',
                },
                url: '/show/spectacle',
              },
              {
                label: {
                  fr: 'Ateliers',
                  en: 'Workshops',
                  ja: 'ワークショップ',
                },
                url: '/services',
              },
              {
                label: {
                  fr: 'Mariages',
                  en: 'Weddings',
                  ja: 'ウェディング',
                },
                url: '/mariages',
              },
            ],
          },
          {
            title: {
              fr: 'Infos',
              en: 'Information',
              ja: '情報',
            },
            links: [
              {
                label: {
                  fr: 'A Propos',
                  en: 'About Us',
                  ja: '私たちについて',
                },
                url: '/centre/historique',
              },
              {
                label: {
                  fr: 'Conditions Generales',
                  en: 'Terms',
                  ja: '利用規約',
                },
                url: '/legal/cgv',
              },
              {
                label: {
                  fr: 'Politique de confidentialite',
                  en: 'Privacy Policy',
                  ja: 'プライバシーポリシー',
                },
                url: '/legal/privacy',
              },
              {
                label: {
                  fr: 'Mentions legales',
                  en: 'Legal',
                  ja: '法的情報',
                },
                url: '/legal/mentions',
              },
            ],
          },
          {
            title: {
              fr: 'Contact',
              en: 'Contact',
              ja: 'お問い合わせ',
            },
            links: [
              {
                label: {
                  fr: 'Email',
                  en: 'Email',
                  ja: 'メール',
                },
                url: 'mailto:contact@tikivillage.pf',
              },
              {
                label: {
                  fr: 'Telephone',
                  en: 'Phone',
                  ja: '電話',
                },
                url: 'tel:+68950842277',
              },
              {
                label: {
                  fr: 'Formulaire',
                  en: 'Form',
                  ja: 'フォーム',
                },
                url: '/contact',
              },
            ],
          },
        ],
        socialLinks: [
          {
            platform: 'facebook',
            url: 'https://facebook.com/tikivillage',
          },
          {
            platform: 'instagram',
            url: 'https://instagram.com/tikivillage',
          },
          {
            platform: 'youtube',
            url: 'https://youtube.com/@tikivillage',
          },
          {
            platform: 'tripadvisor',
            url: 'https://tripadvisor.com/tikivillage',
          },
        ],
        copyright: {
          fr: '© 2024 Tiki Village. Tous droits réservés.',
          en: '© 2024 Tiki Village. All rights reserved.',
          ja: '© 2024 ティキ・ビレッジ。著作権所有。',
        },
        legalLinks: [
          {
            label: {
              fr: 'Conditions Generales de Vente',
              en: 'Terms of Service',
              ja: '利用規約',
            },
            url: '/legal/cgv',
          },
          {
            label: {
              fr: 'Politique de Confidentialite',
              en: 'Privacy Policy',
              ja: 'プライバシーポリシー',
            },
            url: '/legal/privacy',
          },
          {
            label: {
              fr: 'Mentions Legales',
              en: 'Legal Information',
              ja: '法的情報',
            },
            url: '/legal/mentions',
          },
        ],
      },
      overrideAccess: true,
    })

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
    const details = (error as { data?: unknown; errors?: unknown }).data ??
      (error as { errors?: unknown }).errors
    return NextResponse.json({ error: 'Seed failed', message, details }, { status: 500 })
  }
}

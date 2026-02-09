import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import sharp from 'sharp'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

const toLocalizedText = (values: { fr: string; en: string; ja: string }) => values

const makeRichText = (value: { fr: string; en: string; ja: string }) => {
  const makeNode = (text: string) => ({
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          version: 1,
          format: '',
          indent: 0,
          direction: 'ltr',
          children: [
            {
              type: 'text',
              version: 1,
              text,
              format: 0,
              detail: 0,
              mode: 'normal',
              style: '',
            },
          ],
        },
      ],
    },
  })

  return {
    fr: makeNode(value.fr),
    en: makeNode(value.en),
    ja: makeNode(value.ja),
  }
}

const createPlaceholderImage = async () => {
  const width = 1200
  const height = 800
  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: '#f5e9d6',
    },
  })
    .jpeg({ quality: 85 })
    .toBuffer()
}

const upsertByField = async <T extends { id: string }>(
  collection: string,
  field: string,
  value: string,
  data: Record<string, unknown>
) => {
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection,
    where: {
      [field]: {
        equals: value,
      },
    },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs.length > 0) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    }) as Promise<T>
  }

  return payload.create({
    collection,
    data,
    overrideAccess: true,
  }) as Promise<T>
}

const ensureMedia = async (slug: string, alt: { fr: string; en: string; ja: string }) => {
  try {
    const filename = `${slug}.jpg`
    const payload = await getPayload({ config })
    const existing = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: filename,
        },
      },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      return existing.docs[0]
    }

    const buffer = await createPlaceholderImage()

    return payload.create({
      collection: 'media',
      data: {
        alt,
      },
      file: {
        data: buffer,
        mimetype: 'image/jpeg',
        name: filename,
        size: buffer.length,
      },
      overrideAccess: true,
    })
  } catch (error) {
    console.error('Seed media error:', error)
    throw error
  }
}

export async function POST(request: Request) {
  const token = request.headers.get('x-seed-token') || new URL(request.url).searchParams.get('token')

  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Debug: Check Blob token
    console.log('BLOB_READ_WRITE_TOKEN exists:', !!process.env.BLOB_READ_WRITE_TOKEN)
    console.log('BLOB_READ_WRITE_TOKEN length:', process.env.BLOB_READ_WRITE_TOKEN?.length)
    console.log('BLOB_READ_WRITE_TOKEN prefix:', process.env.BLOB_READ_WRITE_TOKEN?.substring(0, 20))
  }

  try {

  const results: Record<string, number> = {
    categories: 0,
    products: 0,
    testimonials: 0,
    pages: 0,
    media: 0,
    promotions: 0,
  }

  const categories = [
    {
      slug: 'ateliers',
      name: toLocalizedText({
        fr: 'Ateliers Culturels',
        en: 'Cultural Workshops',
        ja: '文化ワークショップ',
      }),
      description: toLocalizedText({
        fr: 'Decouvrez les arts traditionnels polynesiens',
        en: 'Discover traditional Polynesian arts',
        ja: 'ポリネシアの伝統芸術を体験',
      }),
      order: 1,
    },
    {
      slug: 'soirees',
      name: toLocalizedText({
        fr: 'Soirees et Spectacles',
        en: 'Shows and Events',
        ja: 'ショーとイベント',
      }),
      description: toLocalizedText({
        fr: 'Vivez une soiree inoubliable',
        en: 'Enjoy an unforgettable evening',
        ja: '忘れられない夜を体験',
      }),
      order: 2,
    },
    {
      slug: 'mariages',
      name: toLocalizedText({
        fr: 'Mariages Polynesiens',
        en: 'Polynesian Weddings',
        ja: 'ポリネシアンウェディング',
      }),
      description: toLocalizedText({
        fr: 'Celebrez votre union dans la tradition',
        en: 'Celebrate your union in tradition',
        ja: '伝統に包まれた結婚式',
      }),
      order: 3,
    },
  ]

  const categoryDocs = new Map<string, { id: string }>()

  for (const category of categories) {
    const media = await ensureMedia(category.slug, {
      fr: category.name.fr,
      en: category.name.en,
      ja: category.name.ja,
    })

    const doc = await upsertByField<{ id: string }>('categories', 'slug', category.slug, {
      ...category,
      image: media.id,
    })

    results.categories += 1
    results.media += 1
    categoryDocs.set(category.slug, doc)
  }

  const defaultExtras = [
    {
      name: toLocalizedText({
        fr: 'Transfert Aller-Retour Adulte',
        en: 'Round-trip Transfer Adult',
        ja: '往復送迎 大人',
      }),
      description: toLocalizedText({
        fr: 'Transport depuis votre hotel',
        en: 'Transport from your hotel',
        ja: 'ホテルからの送迎',
      }),
      priceAdult: 2600,
      priceChild: 0,
      type: 'transfer',
    },
    {
      name: toLocalizedText({
        fr: 'Transfert Aller-Retour Enfant',
        en: 'Round-trip Transfer Child',
        ja: '往復送迎 子供',
      }),
      description: toLocalizedText({
        fr: 'Transport enfants depuis votre hotel',
        en: 'Child transport from your hotel',
        ja: '子供向け送迎',
      }),
      priceAdult: 1600,
      priceChild: 0,
      type: 'transfer',
    },
  ]

  const productSeeds = [
    {
      slug: 'atelier-culturel-1',
      category: 'ateliers',
      price: 3500,
      status: 'published',
      bookable: true,
      name: toLocalizedText({
        fr: '1 Atelier Culturel',
        en: '1 Cultural Workshop',
        ja: '1つの文化ワークショップ',
      }),
      shortDescription: toLocalizedText({
        fr: 'Participez a un atelier traditionnel de votre choix',
        en: 'Join a traditional workshop of your choice',
        ja: '伝統的なワークショップに参加',
      }),
      description: makeRichText({
        fr: 'Participez a un atelier traditionnel polynesien au choix.',
        en: 'Join a traditional Polynesian workshop of your choice.',
        ja: '伝統的なポリネシアンワークショップに参加しましょう。',
      }),
      bookingSettings: {
        availableDays: ['tuesday', 'friday'],
        maxParticipants: 20,
        childrenAllowed: true,
        childrenPrice: 2000,
      },
      extras: defaultExtras,
    },
    {
      slug: 'ateliers-culturels-3',
      category: 'ateliers',
      price: 7000,
      status: 'published',
      bookable: true,
      name: toLocalizedText({
        fr: '3 Ateliers Culturels',
        en: '3 Cultural Workshops',
        ja: '3つの文化ワークショップ',
      }),
      shortDescription: toLocalizedText({
        fr: 'Profitez de 3 ateliers differents',
        en: 'Enjoy 3 different workshops',
        ja: '3つの異なるワークショップを体験',
      }),
      description: makeRichText({
        fr: 'Une immersion culturelle complete avec 3 ateliers differents.',
        en: 'A complete cultural immersion with 3 different workshops.',
        ja: '3つのワークショップで文化体験を満喫。',
      }),
      bookingSettings: {
        availableDays: ['tuesday', 'friday'],
        maxParticipants: 20,
        childrenAllowed: true,
        childrenPrice: 4000,
      },
      extras: defaultExtras,
    },
    {
      slug: 'diner-spectacle',
      category: 'soirees',
      price: 10500,
      status: 'published',
      bookable: true,
      name: toLocalizedText({
        fr: 'Diner-Spectacle',
        en: 'Dinner Show',
        ja: 'ディナーショー',
      }),
      shortDescription: toLocalizedText({
        fr: 'Savourez un festin polynesien suivi d\'un spectacle',
        en: 'Enjoy a Polynesian feast followed by a show',
        ja: 'ポリネシアン料理とショーを楽しめます',
      }),
      description: makeRichText({
        fr: 'Soiree polynesienne avec buffet traditionnel et spectacle.',
        en: 'Polynesian evening with a traditional buffet and show.',
        ja: '伝統的なビュッフェとショーの夜。',
      }),
      bookingSettings: {
        availableDays: ['tuesday', 'friday'],
        maxParticipants: 150,
        childrenAllowed: true,
        childrenPrice: 4950,
      },
      extras: defaultExtras,
    },
    {
      slug: 'spectacle-seul',
      category: 'soirees',
      price: 4950,
      status: 'published',
      bookable: true,
      name: toLocalizedText({
        fr: 'Spectacle Seul',
        en: 'Show Only',
        ja: 'ショーのみ',
      }),
      shortDescription: toLocalizedText({
        fr: 'Assistez a notre spectacle de danse polynesienne',
        en: 'Attend our Polynesian dance show',
        ja: 'ポリネシアンダンスショーを鑑賞',
      }),
      description: makeRichText({
        fr: 'Un voyage a travers les danses traditionnelles polynesiennes.',
        en: 'A journey through Polynesian traditional dances.',
        ja: 'ポリネシアの伝統舞踊の旅。',
      }),
      bookingSettings: {
        availableDays: ['tuesday', 'friday'],
        maxParticipants: 200,
        childrenAllowed: true,
        childrenPrice: 2500,
      },
      extras: defaultExtras,
    },
    {
      slug: 'mariage-maeva',
      category: 'mariages',
      price: 70000,
      status: 'published',
      bookable: false,
      name: toLocalizedText({
        fr: 'Mariage Maeva',
        en: 'Maeva Wedding',
        ja: 'マエヴァウェディング',
      }),
      shortDescription: toLocalizedText({
        fr: 'Formule essentielle pour une ceremonie intime',
        en: 'Essential package for an intimate ceremony',
        ja: '親密なセレモニーの基本プラン',
      }),
      description: makeRichText({
        fr: 'Formule essentielle pour une ceremonie authentique.',
        en: 'Essential package for an authentic ceremony.',
        ja: '本格的なセレモニーのための基本プラン。',
      }),
      weddingOptions: {
        includedServices: makeRichText({
          fr: 'Ceremonie traditionnelle, tenues, couronne de fleurs, photographe.',
          en: 'Traditional ceremony, outfits, flower crown, photographer.',
          ja: '伝統的な式典、衣装、花冠、カメラマン。',
        }),
        additionalOptions: [
          {
            name: toLocalizedText({
              fr: 'DVD Souvenir',
              en: 'Souvenir DVD',
              ja: '記念DVD',
            }),
            price: 30000,
            description: toLocalizedText({
              fr: 'Video complete de la ceremonie',
              en: 'Full ceremony video',
              ja: '式典の全映像',
            }),
          },
          {
            name: toLocalizedText({
              fr: 'Album Photos Premium',
              en: 'Premium Photo Album',
              ja: 'プレミアム写真アルバム',
            }),
            price: 25000,
            description: toLocalizedText({
              fr: 'Album photo imprime',
              en: 'Printed photo album',
              ja: '印刷された写真アルバム',
            }),
          },
        ],
        additionalGuests: {
          adultPrice: 10500,
          childPrice: 4950,
        },
      },
    },
  ]

  for (const product of productSeeds) {
    const category = categoryDocs.get(product.category)
    if (!category) continue

    const media = await ensureMedia(product.slug, {
      fr: product.name.fr,
      en: product.name.en,
      ja: product.name.ja,
    })

    await upsertByField('products', 'slug', product.slug, {
      name: product.name,
      slug: product.slug,
      category: category.id,
      description: product.description,
      shortDescription: product.shortDescription,
      images: [
        {
          image: media.id,
          alt: product.name,
        },
      ],
      price: product.price,
      status: product.status,
      bookable: product.bookable,
      bookingSettings: product.bookable ? product.bookingSettings : undefined,
      extras: product.extras,
      weddingOptions: product.weddingOptions,
    })

    results.products += 1
    results.media += 1
  }

  const testimonialSeeds = [
    {
      name: 'Hina T.',
      email: 'hina@example.com',
      rating: 5,
      comment: toLocalizedText({
        fr: 'Une soiree magique, nous reviendrons avec plaisir.',
        en: 'A magical evening, we will come back with pleasure.',
        ja: '素晴らしい夜でした。また来たいです。',
      }),
      location: toLocalizedText({
        fr: 'Papeete',
        en: 'Papeete',
        ja: 'パペーテ',
      }),
      status: 'published',
      featured: true,
    },
    {
      name: 'Paul M.',
      email: 'paul@example.com',
      rating: 5,
      comment: toLocalizedText({
        fr: 'Accueil chaleureux et spectacle exceptionnel.',
        en: 'Warm welcome and exceptional show.',
        ja: '温かい歓迎と素晴らしいショー。',
      }),
      location: toLocalizedText({
        fr: 'Paris',
        en: 'Paris',
        ja: 'パリ',
      }),
      status: 'published',
      featured: true,
    },
    {
      name: 'Emily R.',
      email: 'emily@example.com',
      rating: 4,
      comment: toLocalizedText({
        fr: 'Experience authentique, ateliers tres enrichissants.',
        en: 'Authentic experience, very enriching workshops.',
        ja: '本格的で充実したワークショップでした。',
      }),
      location: toLocalizedText({
        fr: 'Sydney',
        en: 'Sydney',
        ja: 'シドニー',
      }),
      status: 'published',
      featured: false,
    },
  ]

  for (const testimonial of testimonialSeeds) {
    await upsertByField('testimonials', 'email', testimonial.email, testimonial)
    results.testimonials += 1
  }

  const pages = [
    {
      slug: 'centre-historique',
      title: toLocalizedText({
        fr: 'Historique',
        en: 'History',
        ja: '歴史',
      }),
      status: 'published',
      hero: {
        type: 'none',
        heading: toLocalizedText({
          fr: 'Historique',
          en: 'History',
          ja: '歴史',
        }),
        subheading: toLocalizedText({
          fr: 'Une histoire riche et authentique',
          en: 'A rich and authentic history',
          ja: '豊かで本物の歴史',
        }),
      },
      layout: [
        {
          blockType: 'content',
          content: makeRichText({
            fr: 'Tiki Village preserve les traditions polynesiennes.',
            en: 'Tiki Village preserves Polynesian traditions.',
            ja: 'ティキヴィレッジはポリネシアの伝統を守ります。',
          }),
        },
      ],
    },
    {
      slug: 'show-spectacle',
      title: toLocalizedText({
        fr: 'Le Spectacle',
        en: 'The Show',
        ja: 'ショー',
      }),
      status: 'published',
      hero: {
        type: 'none',
        heading: toLocalizedText({
          fr: 'Le Spectacle',
          en: 'The Show',
          ja: 'ショー',
        }),
        subheading: toLocalizedText({
          fr: 'Danses traditionnelles polynesiennes',
          en: 'Traditional Polynesian dances',
          ja: '伝統的なポリネシアのダンス',
        }),
      },
      layout: [
        {
          blockType: 'content',
          content: makeRichText({
            fr: 'Un voyage au coeur des iles du Pacifique.',
            en: 'A journey to the heart of the Pacific islands.',
            ja: '太平洋の島々の中心への旅。',
          }),
        },
      ],
    },
  ]

  for (const page of pages) {
    await upsertByField('pages', 'slug', page.slug, page)
    results.pages += 1
  }

  const promotions = [
    {
      code: 'WELCOME10',
      description: toLocalizedText({
        fr: '10% de reduction pour votre premiere reservation',
        en: '10% off your first booking',
        ja: '初回予約10%オフ',
      }),
      type: 'percentage',
      value: 10,
      minPurchase: 3000,
      maxDiscount: 5000,
      usageLimit: 100,
      validFrom: new Date().toISOString(),
      validTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      active: true,
    },
  ]

  for (const promo of promotions) {
    await upsertByField('promotions', 'code', promo.code, promo)
    results.promotions += 1
  }

    return NextResponse.json({
      ok: true,
      results,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Seed failed', message }, { status: 500 })
  }
}

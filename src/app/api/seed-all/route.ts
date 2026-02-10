import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const token = request.headers.get('x-seed-token') || new URL(request.url).searchParams.get('token')

  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const headers = { 'x-seed-token': token, 'Content-Type': 'application/json' }

    console.log('Starting complete seed process...')

    // 1. Seed globals first (Header, Footer, SiteSettings)
    console.log('1. Seeding globals...')
    const globalsResponse = await fetch(`${baseUrl}/api/seed-globals`, {
      method: 'POST',
      headers,
    })

    if (!globalsResponse.ok) {
      const error = await globalsResponse.json()
      throw new Error(`Globals seed failed: ${error.message}`)
    }

    const globalsResult = await globalsResponse.json()
    console.log('✓ Globals seeded')

    // 2. Seed content (categories, products, testimonials, pages, promotions)
    console.log('2. Seeding content...')
    const contentResponse = await fetch(`${baseUrl}/api/seed`, {
      method: 'POST',
      headers,
    })

    if (!contentResponse.ok) {
      const error = await contentResponse.json()
      throw new Error(`Content seed failed: ${error.message}`)
    }

    const contentResult = await contentResponse.json()
    console.log('✓ Content seeded')

    return NextResponse.json({
      ok: true,
      message: 'Complete seed (globals + content) successful',
      results: {
        globals: globalsResult.results,
        content: contentResult.results,
      },
    })
  } catch (error) {
    console.error('Complete seed error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: 'Seed failed', message }, { status: 500 })
  }
}

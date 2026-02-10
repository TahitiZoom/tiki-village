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

    const productMatch = await payload.find({
      collection: 'products',
      where: {
        slug: {
          equals: 'diner-spectacle',
        },
      },
      limit: 1,
      overrideAccess: true,
    })

    if (!productMatch.docs.length) {
      return NextResponse.json({ error: 'Product diner-spectacle not found' }, { status: 404 })
    }

    const productId = productMatch.docs[0].id // Keep as number
    const totalPrice = 10500 * 2 + 4950 * 1
    const bookingNumber = `BKG-${Date.now()}-${Math.floor(Math.random() * 10000)}`

    const booking = await payload.create({
      collection: 'bookings',
      data: {
        bookingNumber,
        product: productId,
        date: '2026-06-16T00:00:00.000Z',
        participants: {
          adults: 2,
          children: 1,
        },
        totalPrice,
        status: 'pending',
        customerInfo: {
          firstName: 'Example',
          lastName: 'Reservation',
          email: 'contact@tahitizoom.pf',
          phone: '+689 00 00 00 00',
        },
        notes: 'Heure: 19:00',
      },
      locale: 'fr',
      overrideAccess: true,
    })

    const orderNumber = `TKV-${Date.now()}-${Math.floor(Math.random() * 10000)}`

    const order = await payload.create({
      collection: 'orders',
      data: {
        orderNumber,
        items: [
          {
            product: productId,
            booking: booking.id,
            quantity: 1,
            price: totalPrice,
            subtotal: totalPrice,
          },
        ],
        subtotal: totalPrice,
        total: totalPrice,
        status: 'pending',
        paymentStatus: 'unpaid',
        billingAddress: {
          firstName: 'Example',
          lastName: 'Reservation',
          email: 'contact@tahitizoom.pf',
          phone: '+689 00 00 00 00',
        },
      },
      locale: 'fr',
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      bookingId: booking.id,
      orderId: order.id,
      orderNumber: order.orderNumber,
    })
  } catch (error) {
    console.error('Seed example order error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: 'Seed failed', message }, { status: 500 })
  }
}

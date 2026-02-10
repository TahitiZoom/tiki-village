import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

type BookingItem = {
  product: string
  productName: string
  date: string
  time: string
  adults: number
  children: number
  totalPrice: number
}

type CustomerInput = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export async function POST(request: Request) {
  try {
    const { customer, items, totalAmount } = (await request.json()) as {
      customer: CustomerInput
      items: BookingItem[]
      totalAmount: number
    }

    if (!customer?.firstName || !customer?.lastName || !customer?.email || !customer?.phone || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const orderNumber = `TKV-${Date.now()}-${Math.floor(Math.random() * 10000)}`

    const orderItems = [] as Array<{
      product: string
      booking?: string
      quantity: number
      price: number
      subtotal: number
    }>

    for (const item of items) {
      const productMatch = await payload.find({
        collection: 'products',
        where: {
          slug: {
            equals: item.product,
          },
        },
        limit: 1,
        overrideAccess: true,
      })

      if (!productMatch.docs.length) {
        return NextResponse.json(
          { error: `Product not found for slug: ${item.product}` },
          { status: 400 }
        )
      }

      const productId = productMatch.docs[0].id

      const booking = await payload.create({
        collection: 'bookings',
        data: {
          product: productId,
          date: item.date,
          participants: {
            adults: item.adults,
            children: item.children,
          },
          totalPrice: item.totalPrice,
          status: 'pending',
          customerInfo: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
          },
          notes: `Heure: ${item.time}`,
        },
        overrideAccess: true,
      })

      orderItems.push({
        product: productId,
        booking: booking.id,
        quantity: 1,
        price: item.totalPrice,
        subtotal: item.totalPrice,
      })
    }

    const order = await payload.create({
      collection: 'orders',
      data: {
        orderNumber,
        items: orderItems,
        subtotal: totalAmount,
        total: totalAmount,
        status: 'pending',
        paymentStatus: 'unpaid',
        billingAddress: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
        },
      },
      overrideAccess: true,
    })

    return NextResponse.json({
      ok: true,
      orderId: order.orderNumber,
      message: 'Commande créée avec succès. Nous vous contacterons pour confirmer les détails de paiement.',
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create order' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
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
      product: number | string
      booking?: number | string
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

      const productId = productMatch.docs[0].id // Keep as number
      const bookingNumber = `BKG-${Date.now()}-${Math.floor(Math.random() * 10000)}`

      const booking = await payload.create({
        collection: 'bookings',
        data: {
          bookingNumber,
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
        locale: 'fr',
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

    console.log('Creating order with items:', JSON.stringify(orderItems, null, 2))
    
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
      locale: 'fr',
      overrideAccess: true,
    }).catch((err) => {
      console.error('Order creation error details:', err)
      throw err
    })

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: {
          ciphers: 'SSLv3',
          rejectUnauthorized: true,
        },
      })

      const fromAddress = process.env.SMTP_FROM || 'accueil@tikivillage.pf'
      const adminAddress = process.env.SMTP_ADMIN_EMAIL || 'accueil@tikivillage.pf'
      
      const orderLines = items
        .map((line) => `- ${line.productName} | ${line.date} ${line.time} | ${line.adults}A ${line.children}E | ${line.totalPrice} XPF`)
        .join('\n')

      const adminBody = [
        'Nouvelle commande sur Tiki Village',
        `Commande: ${order.orderNumber}`,
        `Client: ${customer.firstName} ${customer.lastName}`,
        `Email: ${customer.email}`,
        `Telephone: ${customer.phone}`,
        `Total: ${totalAmount} XPF`,
        '',
        'Articles:',
        orderLines,
      ].join('\n')

      const customerBody = [
        'Merci pour votre reservation.',
        `Commande: ${order.orderNumber}`,
        `Total: ${totalAmount} XPF`,
        '',
        'Nous vous contacterons pour confirmer le paiement.',
      ].join('\n')

      try {
        await transporter.sendMail({
          from: fromAddress,
          to: adminAddress,
          subject: 'Nouvelle commande Tiki Village',
          text: adminBody,
        })

        await transporter.sendMail({
          from: fromAddress,
          to: customer.email,
          subject: 'Confirmation de votre reservation',
          text: customerBody,
        })
      } catch (emailError) {
        console.error('SMTP email error:', emailError)
      }
    }

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

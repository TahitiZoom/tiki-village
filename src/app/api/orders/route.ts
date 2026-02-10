import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: Request) {
  try {
    const { customer, items, totalAmount } = await request.json()

    if (!customer.name || !customer.email || !items.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // For now, just return success with order number
    // TODO: Create actual order in Payload when schema is finalized
    const orderNumber = `TKV-${Date.now()}-${Math.floor(Math.random() * 10000)}`

    console.log('Order created:', {
      orderNumber,
      customer,
      items,
      totalAmount,
    })

    return NextResponse.json({
      ok: true,
      orderId: orderNumber,
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

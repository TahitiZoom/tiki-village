import { NextRequest, NextResponse } from 'next/server'
import { verifyPayZenSignature } from '@/lib/payzen'
import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * PayZen Standard Webhook Handler
 * Receives payment notifications from PayZen/OSB
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const data: Record<string, any> = {}
    
    formData.forEach((value, key) => {
      data[key] = value.toString()
    })
    
    // Verify signature
    const signature = data.signature || data.vads_signature
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }
    
    // Remove signature from data before verification
    delete data.signature
    delete data.vads_signature
    
    if (!verifyPayZenSignature(signature, data)) {
      console.error('Invalid PayZen signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }
    
    // Extract payment information
    const orderId = data.vads_order_id
    const transactionStatus = data.vads_trans_status
    const transactionId = data.vads_trans_id
    const amount = parseInt(data.vads_amount || '0')
    
    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing order ID' },
        { status: 400 }
      )
    }
    
    const payload = await getPayload({ config })
    
    // Find the order
    const orders = await payload.find({
      collection: 'orders',
      where: {
        orderNumber: {
          equals: orderId,
        },
      },
    })
    
    if (orders.docs.length === 0) {
      console.error(`Order not found: ${orderId}`)
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    
    const order = orders.docs[0]
    
    // Update order based on transaction status
    let paymentStatus = 'unpaid'
    let orderStatus = 'pending'
    
    if (transactionStatus === 'AUTHORISED' || transactionStatus === 'CAPTURED') {
      paymentStatus = 'paid'
      orderStatus = 'paid'
    } else if (transactionStatus === 'REFUSED' || transactionStatus === 'ABANDONED') {
      paymentStatus = 'failed'
      orderStatus = 'cancelled'
    }
    
    // Update the order
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: {
        paymentStatus,
        status: orderStatus,
        paymentDetails: {
          transactionId,
          paymentDate: new Date().toISOString(),
          cardType: data.vads_card_brand,
          cardNumber: data.vads_card_number,
        },
      },
    })
    
    console.log(`Order ${orderId} updated: ${orderStatus}`)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PayZen webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

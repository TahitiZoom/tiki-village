import { NextRequest, NextResponse } from 'next/server'
import { verifyPayZenSignature } from '@/lib/payzen'
import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * PayZen REST API Webhook Handler
 * Receives payment notifications from PayZen/OSB REST API
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Verify signature
    const signature = data.kr_answer?.signature || data.signature
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }
    
    // Extract answer data
    const answer = data.kr_answer || data
    
    // Verify signature (remove signature field before verification)
    const answerWithoutSignature = { ...answer }
    delete answerWithoutSignature.signature
    
    if (!verifyPayZenSignature(signature, answerWithoutSignature)) {
      console.error('Invalid PayZen REST signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }
    
    // Extract payment information
    const orderId = answer.orderDetails?.orderId || answer.orderId
    const transactionStatus = answer.orderStatus
    const transactionId = answer.transactions?.[0]?.uuid
    const amount = answer.orderDetails?.orderTotalAmount || 0
    
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
    
    if (transactionStatus === 'PAID') {
      paymentStatus = 'paid'
      orderStatus = 'paid'
    } else if (transactionStatus === 'UNPAID' || transactionStatus === 'ABANDONED') {
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
          cardType: answer.transactions?.[0]?.cardDetails?.effectiveBrand,
          cardNumber: answer.transactions?.[0]?.cardDetails?.pan,
        },
      },
    })
    
    console.log(`Order ${orderId} updated: ${orderStatus}`)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PayZen REST webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import crypto from 'crypto'

/**
 * PayZen/OSB Configuration and Utilities
 * Documentation: https://docs.lyra.com/en/
 */

export interface PayZenConfig {
  shopId: string
  mode: 'TEST' | 'PRODUCTION'
  apiKey: string
  hmacKey: string
  publicKey: string
  apiUrl: string
  jsUrl: string
}

export function getPayZenConfig(): PayZenConfig {
  const mode = (process.env.PAYZEN_MODE || 'TEST') as 'TEST' | 'PRODUCTION'
  
  return {
    shopId: process.env.PAYZEN_SHOP_ID || '',
    mode,
    apiKey: mode === 'TEST' 
      ? process.env.PAYZEN_TEST_KEY || '' 
      : process.env.PAYZEN_PROD_KEY || '',
    hmacKey: mode === 'TEST'
      ? process.env.PAYZEN_HMAC_TEST_KEY || ''
      : process.env.PAYZEN_HMAC_PROD_KEY || '',
    publicKey: mode === 'TEST'
      ? process.env.PAYZEN_PUBLIC_TEST_KEY || ''
      : process.env.PAYZEN_PUBLIC_PROD_KEY || '',
    apiUrl: 'https://api.secure.osb.pf/api-payment/',
    jsUrl: 'https://static.osb.pf/static/',
  }
}

/**
 * Generate HMAC-SHA-256 signature for PayZen API REST
 */
export function generatePayZenSignature(data: Record<string, any>): string {
  const config = getPayZenConfig()
  
  // Sort keys alphabetically and build signature string
  const sortedKeys = Object.keys(data).sort()
  const signatureString = sortedKeys
    .map(key => `${key}=${data[key]}`)
    .join('+')
  
  // Add HMAC key
  const stringToSign = signatureString + '+' + config.hmacKey
  
  // Generate HMAC-SHA-256
  return crypto
    .createHmac('sha256', config.hmacKey)
    .update(stringToSign)
    .digest('base64')
}

/**
 * Verify PayZen webhook signature
 */
export function verifyPayZenSignature(
  receivedSignature: string,
  data: Record<string, any>
): boolean {
  const expectedSignature = generatePayZenSignature(data)
  return receivedSignature === expectedSignature
}

/**
 * Create a payment request
 */
export interface PaymentRequest {
  amount: number // Amount in cents (XPF)
  currency: string // 'XPF'
  orderId: string
  customer: {
    email: string
    billingDetails: {
      firstName: string
      lastName: string
      address: string
      city: string
      zipCode: string
      country: string
    }
  }
  locale?: string // 'fr', 'en', 'ja'
}

export async function createPayZenPayment(request: PaymentRequest) {
  const config = getPayZenConfig()
  
  const payload = {
    amount: request.amount,
    currency: request.currency,
    orderId: request.orderId,
    customer: {
      email: request.customer.email,
      billingDetails: request.customer.billingDetails,
    },
    locale: request.locale || 'fr',
  }
  
  const signature = generatePayZenSignature(payload)
  
  try {
    const response = await fetch(`${config.apiUrl}V4/Charge/CreatePayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${config.shopId}:${config.apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify({
        ...payload,
        signature,
      }),
    })
    
    if (!response.ok) {
      throw new Error(`PayZen API error: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('PayZen payment creation error:', error)
    throw error
  }
}

/**
 * Get payment status
 */
export async function getPayZenPaymentStatus(transactionId: string) {
  const config = getPayZenConfig()
  
  try {
    const response = await fetch(
      `${config.apiUrl}V4/Transaction/Get`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${config.shopId}:${config.apiKey}`).toString('base64')}`,
        },
        body: JSON.stringify({
          uuid: transactionId,
        }),
      }
    )
    
    if (!response.ok) {
      throw new Error(`PayZen API error: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('PayZen get payment status error:', error)
    throw error
  }
}



import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

// Initialize Stripe only if secret key is available
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-10-29.clover',
  })
}

export async function GET(req: NextRequest) {
  try {
    const stripe = getStripe()
    
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'payment_intent']
    })

    // Extract customer information
    const email = session.customer_details?.email || session.customer_email || null
    const name = session.customer_details?.name || null
    const paymentReference = session.payment_intent 
      ? (typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent.id)
      : session.id

    return NextResponse.json({
      email,
      name,
      paymentReference,
      success: true
    })

  } catch (error: any) {
    console.error('Error fetching Stripe session:', error)
    return NextResponse.json(
      { error: 'Failed to fetch session details', details: error.message },
      { status: 500 }
    )
  }
}


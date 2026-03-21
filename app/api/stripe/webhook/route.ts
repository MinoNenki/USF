import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getPlanByStripePriceId, PLANS } from '@/lib/plans';
import { supabaseAdmin } from '@/lib/supabase-admin';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook nie skonfigurowany.' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  const saveBillingEvent = async (userId: string | null, stripeEventId: string, eventType: string, payload: unknown) => {
    await supabaseAdmin.from('billing_events').upsert({
      user_id: userId,
      stripe_event_id: stripeEventId,
      event_type: eventType,
      payload,
    }, { onConflict: 'stripe_event_id' });
  };

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id ?? null;
    const stripeCustomerId = typeof session.customer === 'string' ? session.customer : null;
    const stripeSubscriptionId = typeof session.subscription === 'string' ? session.subscription : null;

    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
    const priceId = lineItems.data[0]?.price?.id;
    const planKey = getPlanByStripePriceId(priceId);

    if (userId && planKey) {
      const plan = PLANS[planKey];

      await supabaseAdmin.from('profiles').update({
        plan_key: planKey,
        stripe_customer_id: stripeCustomerId,
        stripe_subscription_id: stripeSubscriptionId,
        credits_balance: plan.monthlyCredits,
        monthly_analysis_limit: plan.monthlyAnalyses,
        analyses_used_this_month: 0,
      }).eq('id', userId);
    }

    await saveBillingEvent(userId, event.id, event.type, event);
  }

  

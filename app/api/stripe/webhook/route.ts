import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getPlanByStripePriceId, PLANS } from '@/lib/plans';
import { supabaseAdmin } from '@/lib/supabase-admin';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const saveBillingEvent = async (
    userId: string | null,
    stripeEventId: string,
    eventType: string,
    payload: unknown
  ) => {
    await supabaseAdmin.from('billing_events').upsert(
      {
        user_id: userId,
        stripe_event_id: stripeEventId,
        event_type: eventType,
        payload,
      },
      { onConflict: 'stripe_event_id' }
    );
  };

  // ✅ CHECKOUT SUCCESS
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.user_id ?? null;
    const stripeCustomerId =
      typeof session.customer === 'string' ? session.customer : null;
    const stripeSubscriptionId =
      typeof session.subscription === 'string'
        ? session.subscription
        : null;

    const lineItems = await stripe.checkout.sessions.listLineItems(
      session.id,
      { limit: 1 }
    );

    const priceId = lineItems.data[0]?.price?.id;
    const planKey = getPlanByStripePriceId(priceId);

    if (userId && planKey) {
      const plan = PLANS[planKey];

      await supabaseAdmin
        .from('profiles')
        .update({
          plan_key: planKey,
          stripe_customer_id: stripeCustomerId,
          stripe_subscription_id: stripeSubscriptionId,
          credits_balance: plan.monthlyCredits,
          monthly_analysis_limit: plan.monthlyAnalyses,
          analyses_used_this_month: 0,
        })
        .eq('id', userId);
    }

    await saveBillingEvent(userId, event.id, event.type, event);
  }
  
if (event.type === 'invoice.payment_succeeded') {
  const invoice: any = event.data.object;

  const subscriptionId =
    invoice.parent?.subscription_details?.subscription ??
    invoice.subscription ??
    null;

  const firstLine = invoice.lines?.data?.[0];

  const priceId =
  firstLine?.pricing?.price_details?.price ??
  firstLine?.price?.id ??
  null;

  if (!subscriptionId || !priceId) return;

  const planKey = getPlanByStripePriceId(priceId);
  if (!planKey) return;

  const plan = PLANS[planKey];

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('stripe_subscription_id', subscriptionId)
    .maybeSingle();

  if (!profile?.id) return;

  await supabaseAdmin
    .from('profiles')
    .update({
      plan_key: planKey,
      monthly_analysis_limit: plan.monthlyAnalyses,
    })
    .eq('id', profile.id);

  await saveBillingEvent(profile.id, event.id, event.type, event);
}

  // ✅ SUBSCRIPTION DELETE
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('stripe_subscription_id', subscription.id)
      .maybeSingle();

    if (profile?.id) {
      await supabaseAdmin
        .from('profiles')
        .update({
          plan_key: 'free',
          monthly_analysis_limit: 1,
          credits_balance: 1,
          analyses_used_this_month: 0,
          stripe_subscription_id: null,
        })
        .eq('id', profile.id);

      await saveBillingEvent(profile.id, event.id, event.type, event);
    }
  }

  return NextResponse.json({ received: true });
}

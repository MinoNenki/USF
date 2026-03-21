'use client';

import { useState } from 'react';
import { PLAN_ORDER } from '@/lib/plans';

type Props = {
  isAuthenticated?: boolean;
};

export default function PricingCards({ isAuthenticated = false }: Props) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function handleCheckout(planKey: string) {
    setLoadingPlan(planKey);
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planKey }),
    });

    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url;
      return;
    }

    alert(data?.error || 'Błąd checkout');
    setLoadingPlan(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {PLAN_ORDER.map((plan) => (
        <div
          key={plan.key}
          className={`relative overflow-hidden rounded-[28px] border p-6 text-white ${plan.featured ? 'border-cyan-300/60 bg-white/[0.06] shadow-[0_0_60px_rgba(34,211,238,0.18)]' : 'border-white/10 bg-white/[0.03]'}`}
        >
          {plan.featured && (
            <div className="absolute right-4 top-4 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Najczęściej wybierany
            </div>
          )}

          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">{plan.name}</div>
          <div className="mb-1 text-4xl font-bold">{plan.priceLabel}</div>
          <div className="mb-2 text-sm text-slate-300">miesięcznie</div>
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
            {plan.audience}
          </div>
          <p className="mb-6 min-h-[72px] text-sm leading-6 text-slate-300">{plan.description}</p>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Kredyty</div>
              <div className="mt-2 text-2xl font-bold">{plan.monthlyCredits}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Analizy</div>
              <div className="mt-2 text-2xl font-bold">{plan.monthlyAnalyses}</div>
            </div>
          </div>

          <ul className="mb-6 space-y-3 text-sm text-slate-200">
            {plan.bullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {plan.key === 'free' ? (
            <a href={isAuthenticated ? '/dashboard' : '/auth/register'} className="block rounded-2xl bg-white px-4 py-3 text-center font-semibold text-slate-950 transition hover:opacity-90">
              Start za darmo
            </a>
          ) : (
            <button
              onClick={() => handleCheckout(plan.key)}
              disabled={!isAuthenticated || loadingPlan === plan.key}
              className="w-full rounded-2xl bg-cyan-300 px-4 py-3 font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingPlan === plan.key ? 'Przekierowanie...' : isAuthenticated ? 'Kup teraz' : 'Zaloguj aby kupić'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

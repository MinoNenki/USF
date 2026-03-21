import Link from 'next/link';
import PricingCards from '@/components/PricingCards';
import { createSupabaseServerClient } from '@/lib/supabase-server';

const useCases = [
  'Analiza oferty i opisu produktu',
  'Analiza reklamy i copy sprzedażowego',
  'Analiza landing page i strony usługowej',
  'Analiza pomysłu biznesowego',
  'Analiza CV, bio eksperta i profilu usługowego',
  'Analiza treści dla osób prywatnych i firm',
];

const steps = [
  'Użytkownik zakłada konto i wybiera plan.',
  'Wkleja treść do analizy i wybiera typ raportu.',
  'System generuje wynik przez GPT-4o mini.',
  '1 analiza schodzi z limitu i zapisuje się w historii.',
];

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="overflow-hidden">
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.18),transparent_18%),linear-gradient(180deg,#020617_0%,#020617_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
              Dla klientów prywatnych, freelancerów i przedsiębiorców
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-white md:text-7xl">
              Sprzedawaj szybkie analizy AI online w profesjonalnej formie.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Gotowy SaaS z dobrą szatą graficzną, logowaniem, płatnościami Stripe, bazą danych, historią analiz i modelem <strong>gpt-4o-mini</strong>. Produkt jest prosty, czytelny i gotowy do monetyzacji globalnie.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={user ? '/dashboard' : '/auth/register'} className="rounded-2xl bg-cyan-300 px-6 py-4 font-semibold text-slate-950 transition hover:opacity-90">
                {user ? 'Przejdź do panelu' : 'Załóż konto'}
              </Link>
              <Link href="/pricing" className="rounded-2xl border border-white/10 px-6 py-4 font-semibold text-white transition hover:bg-white/5">
                Zobacz plany
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm text-slate-400">Model</div>
                <div className="mt-2 text-2xl font-bold text-white">GPT-4o mini</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm text-slate-400">Produkt</div>
                <div className="mt-2 text-2xl font-bold text-white">1 prompt = 1 analiza</div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-sm text-slate-400">Monetyzacja</div>
                <div className="mt-2 text-2xl font-bold text-white">Abonament + kredyty</div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-xl">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Co dostaje użytkownik</div>
            <div className="space-y-4">
              {useCases.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
            <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Dlaczego to się sprzeda</div>
            <h2 className="mt-3 text-3xl font-bold text-white">Prosty produkt, jasna wartość, szybki wynik.</h2>
            <p className="mt-4 text-slate-300">Klient nie musi uczyć się skomplikowanego systemu. Wkleja tekst, klika i dostaje raport. To obniża tarcie zakupowe i ułatwia pierwszą płatność.</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
            <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Dla osób prywatnych</div>
            <h2 className="mt-3 text-3xl font-bold text-white">Oferty, CV, reklamy, landing page, bio eksperta.</h2>
            <p className="mt-4 text-slate-300">Plan Starter daje prosty punkt wejścia. To ważne, żeby produkt nie był zamknięty tylko dla firm.</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
            <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Dla przedsiębiorców</div>
            <h2 className="mt-3 text-3xl font-bold text-white">Regularne analizy dla ofert, kampanii i sprzedaży.</h2>
            <p className="mt-4 text-slate-300">Plan Growth i Business są ustawione tak, żeby wyglądały korzystnie i zwiększały średni przychód na klienta.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Cennik</div>
            <h2 className="mt-3 text-4xl font-bold text-white">Plany ustawione pod prywatnych klientów i firmy.</h2>
          </div>
        </div>
        <PricingCards isAuthenticated={Boolean(user)} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Jak działa</div>
          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300 font-bold text-slate-950">{index + 1}</div>
                <div className="text-slate-200">{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <div className="text-sm uppercase tracking-[0.24em] text-cyan-200">Gotowe elementy SaaS</div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              'Logowanie i rejestracja',
              'Stripe Checkout i webhook',
              'Baza danych i historia analiz',
              'Polityka prywatności',
              'Regulamin',
              'Landing page i pricing',
              'Dashboard użytkownika',
              'Własna domena przez Vercel',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-slate-200">{item}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

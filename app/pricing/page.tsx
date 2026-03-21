import PricingCards from '@/components/PricingCards';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export default async function PricingPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 max-w-3xl">
        <div className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
          Cennik bez zbędnych słów
        </div>
        <h1 className="text-5xl font-black tracking-tight text-white">Wybierz plan dopasowany do skali pracy.</h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Free pozwala sprawdzić jakość raportu. Starter jest dobry dla klientów prywatnych i freelancerów. Growth i Business są ustawione pod przedsiębiorców i regularne użycie.
        </p>
      </div>
      <PricingCards isAuthenticated={Boolean(user)} />
    </main>
  );
}

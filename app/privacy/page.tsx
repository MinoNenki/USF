export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-slate-200">
      <h1 className="mb-8 text-4xl font-black text-white">Polityka prywatności</h1>
      <div className="space-y-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 leading-8">
        <p>Ta polityka prywatności opisuje zasady przetwarzania danych użytkowników aplikacji UltraSaaS AI.</p>
        <p>Administrator danych: uzupełnij nazwę firmy, adres e-mail i adres rejestrowy przed publikacją produkcyjną.</p>
        <p>Zakres danych: adres e-mail, dane konta, historia analiz, dane rozliczeniowe powiązane z Stripe oraz dane techniczne niezbędne do działania serwisu.</p>
        <p>Cel przetwarzania: świadczenie usługi SaaS, obsługa konta użytkownika, rozliczenia, bezpieczeństwo i kontakt z klientem.</p>
        <p>Dostawcy technologiczni: Supabase, Stripe, OpenAI, Vercel. Dane są przetwarzane wyłącznie w zakresie niezbędnym do realizacji usługi.</p>
        <p>Użytkownik może zażądać dostępu do danych, ich poprawienia lub usunięcia zgodnie z obowiązującym prawem.</p>
        <p>Przed wdrożeniem produkcyjnym uzupełnij dane firmy, kontakt oraz sekcję dotyczącą cookies i lokalnych obowiązków prawnych.</p>
      </div>
    </main>
  );
}

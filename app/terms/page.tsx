export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20 text-slate-200">
      <h1 className="mb-8 text-4xl font-black text-white">Regulamin</h1>
      <div className="space-y-6 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 leading-8">
        <p>UltraSaaS AI jest usługą SaaS umożliwiającą generowanie analiz tekstowych przy użyciu modeli AI.</p>
        <p>Warunkiem korzystania z usługi jest posiadanie konta oraz akceptacja niniejszego regulaminu.</p>
        <p>Plany płatne są rozliczane cyklicznie przez Stripe. Użytkownik otrzymuje miesięczny limit kredytów i analiz zgodny z aktywnym planem.</p>
        <p>Raporty generowane przez AI mają charakter pomocniczy i nie stanowią porady prawnej, podatkowej ani inwestycyjnej.</p>
        <p>Użytkownik odpowiada za treści wprowadzane do systemu oraz sposób wykorzystania otrzymanych analiz.</p>
        <p>Administrator może zawiesić konto w przypadku naruszenia prawa, nadużyć lub prób zakłócania działania usługi.</p>
        <p>Przed wdrożeniem produkcyjnym uzupełnij pełne dane firmy, zasady reklamacji, zwrotów oraz lokalne wymagania prawne.</p>
      </div>
    </main>
  );
}

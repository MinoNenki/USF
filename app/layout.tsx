import './globals.css';
import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'UltraSaaS AI',
  description: 'Globalny SaaS do analiz AI z GPT-4o mini, logowaniem, bazą danych i Stripe.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <Navbar />
        {children}
        <footer className="border-t border-white/10 px-6 py-10 text-sm text-slate-400">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="font-semibold text-white">UltraSaaS AI</div>
              <div>Gotowy starter SaaS do sprzedaży analiz AI online.</div>
            </div>
            <div className="flex gap-5">
              <Link href="/pricing">Cennik</Link>
              <Link href="/privacy">Polityka prywatności</Link>
              <Link href="/terms">Regulamin</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

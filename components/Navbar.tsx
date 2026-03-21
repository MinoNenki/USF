import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300 font-black text-slate-950">AI</span>
          <span>
            <span className="block text-base font-bold leading-none">UltraSaaS AI</span>
            <span className="text-xs text-slate-400">GPT-4o mini analysis platform</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/pricing">Cennik</Link>
          <Link href="/privacy">Polityka prywatności</Link>
          <Link href="/terms">Regulamin</Link>
          <Link href="/auth/login" className="rounded-xl border border-white/10 px-4 py-2 font-medium text-white transition hover:bg-white/5">Zaloguj</Link>
          <Link href="/auth/register" className="rounded-xl bg-cyan-300 px-4 py-2 font-semibold text-slate-950 transition hover:opacity-90">Załóż konto</Link>
        </nav>
      </div>
    </header>
  );
}

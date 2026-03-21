# UltraSaaS AI — finalna wersja startera SaaS

To jest **finalny starter SaaS** przygotowany do wrzucenia na GitHub i dalszego uruchomienia online.

Produkt jest ustawiony tak, żeby był atrakcyjny dla:
- klientów prywatnych,
- freelancerów,
- małych firm,
- sklepów internetowych,
- agencji i przedsiębiorców.

Silnik analizy działa na modelu **gpt-4o-mini**.

## Co zawiera gotowy projekt
- Next.js 14
- nowoczesny landing page
- pricing page
- rejestracja i logowanie przez Supabase
- dashboard użytkownika
- historia analiz w bazie danych
- Stripe Checkout
- webhook Stripe do trwałego billingu
- polityka prywatności
- regulamin
- przygotowanie pod własną domenę
- gotowy plik `.env.example`

## Finalne plany
### Free — $0
- 1 analiza / miesiąc
- 1 kredyt
- test produktu

### Starter — $25
- dla klientów prywatnych i freelancerów
- 10 kredytów / miesiąc
- 10 analiz / miesiąc

### Growth — $50
- dla małych firm i sklepów
- 30 kredytów / miesiąc
- 40 analiz / miesiąc
- najlepsza wartość

### Business — $99
- dla firm i agencji
- 120 kredytów / miesiąc
- 130 analiz / miesiąc

## Jak działa produkt
1. użytkownik zakłada konto,
2. wybiera plan,
3. wkleja treść,
4. wybiera typ analizy,
5. system generuje raport przez GPT-4o mini,
6. analiza zapisuje się w historii,
7. saldo kredytów zmniejsza się o 1.

---

# Dokładna instrukcja krok po kroku

## 1. Utwórz repo na GitHub
1. Wejdź na GitHub.
2. Kliknij `New repository`.
3. Nazwij repo, np. `ultra-saas-ai`.
4. Dodaj ten projekt do repo.

### lokalnie:
```bash
git init
git add .
git commit -m "Initial final SaaS version"
git branch -M main
git remote add origin TWOJ_LINK_DO_REPO
git push -u origin main
```

---

## 2. Uruchom projekt lokalnie
W folderze projektu uruchom:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Aplikacja będzie działać pod adresem:
```bash
http://localhost:3000
```

---

## 3. Uzupełnij klucze w `.env.local`
Otwórz plik `.env.local` i wpisz własne dane:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
OPENAI_API_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_PRICE_25=...
STRIPE_PRICE_50=...
STRIPE_PRICE_99=...
```

---

## 4. Supabase — konfiguracja dokładnie
### Krok 1
Załóż konto w Supabase i utwórz nowy projekt.

### Krok 2
Przejdź do `SQL Editor`.

### Krok 3
Otwórz plik:
- `supabase/schema.sql`

Wklej cały kod do `SQL Editor` i uruchom.

To utworzy:
- tabelę profili,
- tabelę historii analiz,
- tabelę billing events,
- trigger do tworzenia profilu po rejestracji,
- funkcję zużywania kredytu i zapisu analizy,
- polityki bezpieczeństwa RLS.

### Krok 4
W `Authentication > Providers` włącz logowanie e-mail + hasło.

### Krok 5
W `Authentication > URL Configuration` dodaj:
- `http://localhost:3000`
- później produkcyjną domenę, np. `https://twojadomena.com`

### Krok 6
Skopiuj z Supabase do `.env.local`:
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service role key` → `SUPABASE_SERVICE_ROLE_KEY`

---

## 5. OpenAI — konfiguracja dokładnie
### Krok 1
Załóż konto w OpenAI i wygeneruj API key.

### Krok 2
Wklej go do:
```env
OPENAI_API_KEY=...
```

### Krok 3
Nic więcej nie musisz zmieniać. Projekt jest już ustawiony na:
- `gpt-4o-mini`

---

## 6. Stripe — konfiguracja dokładnie
### Krok 1
Załóż konto Stripe.

### Krok 2
Utwórz 3 produkty abonamentowe:
- Starter — $25 miesięcznie
- Growth — $50 miesięcznie
- Business — $99 miesięcznie

### Krok 3
Skopiuj `Price ID` dla każdego produktu i wpisz:
```env
STRIPE_PRICE_25=price_xxx
STRIPE_PRICE_50=price_xxx
STRIPE_PRICE_99=price_xxx
```

### Krok 4
Skopiuj `Secret key` do:
```env
STRIPE_SECRET_KEY=...
```

### Krok 5
Dodaj webhook.
W Stripe ustaw endpoint:
```bash
http://localhost:3000/api/stripe/webhook
```
na lokalnych testach lub po deployu:
```bash
https://twojadomena.com/api/stripe/webhook
```

### Krok 6
Dodaj eventy:
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `customer.subscription.updated`
- `customer.subscription.deleted`

### Krok 7
Skopiuj `Webhook signing secret` do:
```env
STRIPE_WEBHOOK_SECRET=...
```

---

## 7. Test lokalny
Po uzupełnieniu `.env.local`:

```bash
npm run dev
```

Następnie:
1. wejdź na stronę,
2. załóż konto,
3. zaloguj się,
4. wejdź do dashboardu,
5. wklej tekst do analizy,
6. sprawdź czy zapisuje wynik w historii,
7. przetestuj checkout Stripe.

---

## 8. Deploy na Vercel
### Krok 1
Załóż konto w Vercel.

### Krok 2
Połącz repo z GitHub.

### Krok 3
Importuj projekt.

### Krok 4
W `Environment Variables` dodaj wszystkie zmienne z `.env.local`.

### Krok 5
Kliknij `Deploy`.

### Krok 6
Po wdrożeniu dodaj własną domenę w Vercel.

### Krok 7
Dodaj tę domenę także w Supabase `URL Configuration`.

### Krok 8
Zmień:
```env
NEXT_PUBLIC_SITE_URL=https://twojadomena.com
```

---

## 9. Co obowiązkowo uzupełnić przed sprzedażą
Musisz ręcznie uzupełnić:
- dane firmy w polityce prywatności,
- dane firmy w regulaminie,
- adres supportu,
- ewentualne zasady reklamacji i zwrotów,
- branding: logo, nazwa końcowa, favicon.

---

## 10. Najważniejsze pliki
- `app/page.tsx` — landing page
- `app/pricing/page.tsx` — cennik
- `app/dashboard/page.tsx` — panel użytkownika
- `app/api/analyze/route.ts` — analiza GPT-4o mini
- `app/api/stripe/checkout/route.ts` — Stripe checkout
- `app/api/stripe/webhook/route.ts` — webhook Stripe
- `supabase/schema.sql` — baza i logika
- `app/privacy/page.tsx` — polityka prywatności
- `app/terms/page.tsx` — regulamin
- `.env.example` — lista kluczy

---

## 11. Ważna uczciwa uwaga
To jest gotowy, profesjonalny starter produkcyjny do szybkiego odpalenia.
Nie wpisałem Twoich kluczy, bo musisz dodać własne.
Nie dodałem też danych Twojej firmy do dokumentów prawnych, bo to musi być uzupełnione przez Ciebie przed publikacją.

Po uzupełnieniu kluczy i danych firmy możesz ten projekt normalnie uruchomić lokalnie, wrzucić na GitHub i wdrożyć online.

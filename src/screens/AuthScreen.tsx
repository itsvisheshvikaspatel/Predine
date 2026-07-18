import { useState } from 'react';
import { ArrowRight, ChefHat, Clock, Lock, MapPin, Phone, ShieldCheck, Table2, User as UserIcon } from 'lucide-react';
import { useAuth } from '../auth';
import { Spinner } from '../ui';

export default function AuthScreen() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(async () => {
      const res = mode === 'signin'
  ?await signIn(email.trim(), password)
  : await signUp(email.trim(), password, name.trim() || 'Guest')
      if (!res.ok) setError(res.error ?? 'Something went wrong.');
      setLoading(false);
    }, 450);
  }

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-charcoal-950 text-white">
      {/* ambient gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-terracotta-500/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-emerald2-600/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-terracotta-700/30 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col px-6 pb-10 pt-10 lg:flex-row lg:items-center lg:gap-16 lg:pt-0">
        {/* left: brand + hero (desktop only) */}
        <div className="hidden flex-1 lg:block">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-terracotta-400 to-terracotta-600 shadow-lg">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">PreDine</h1>
              <p className="text-xs text-charcoal-300">Order on the way. Skip the line.</p>
            </div>
          </div>

          <h2 className="mt-10 text-4xl font-extrabold leading-tight text-balance">
            Pre-order your meal while commuting. Walk straight to your table.
          </h2>
          <p className="mt-4 max-w-md text-sm text-charcoal-300">
            PreDine syncs kitchen cook times with your live travel ETA and auto-allocates a table — so you bypass the host podium entirely.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            <Feature icon={<Clock className="h-5 w-5" />} title="Time-Sync" desc="Kitchen starts when you need it" />
            <Feature icon={<Table2 className="h-5 w-5" />} title="Table Locked" desc="Auto-allocated on payment" />
            <Feature icon={<MapPin className="h-5 w-5" />} title="Live ETA" desc="Food lands hot, every time" />
          </div>
        </div>

        {/* right: form card */}
        <div className="w-full max-w-md self-center lg:max-w-sm">
          {/* mobile brand */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-terracotta-400 to-terracotta-600 shadow-lg">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">PreDine</h1>
              <p className="text-xs text-charcoal-300">Order on the way. Skip the line.</p>
            </div>
          </div>

          <h2 className="mb-1 text-2xl font-extrabold leading-tight text-balance lg:hidden">
            {mode === 'signin' ? 'Welcome back.' : 'Create your account.'}
          </h2>
          <p className="mb-6 text-sm text-charcoal-300 lg:hidden">
            {mode === 'signin' ? 'Sign in to pre-order and lock your table.' : 'Join PreDine to bypass the wait.'}
          </p>

          <form onSubmit={submit} className="rounded-3xl bg-white/95 p-6 text-charcoal-900 shadow-2xl backdrop-blur">
            <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-charcoal-100 p-1">
              <button type="button" onClick={() => { setMode('signin'); setError(null); }} className={`rounded-lg py-2 text-sm font-semibold transition ${mode === 'signin' ? 'bg-white text-charcoal-900 shadow' : 'text-charcoal-500'}`}>Sign In</button>
              <button type="button" onClick={() => { setMode('signup'); setError(null); }} className={`rounded-lg py-2 text-sm font-semibold transition ${mode === 'signup' ? 'bg-white text-charcoal-900 shadow' : 'text-charcoal-500'}`}>Register</button>
            </div>

            {mode === 'signup' && (
              <Field icon={<UserIcon className="h-4 w-4" />} label="Profile Name">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Aarav Mehta" className="w-full bg-transparent text-sm outline-none placeholder:text-charcoal-400" />
              </Field>
            )}

           <Field icon={<UserIcon className="h-4 w-4" />} label="Email Address">
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter your email"
    className="w-full bg-transparent text-sm outline-none placeholder:text-charcoal-400"
  />
</Field>

            <div className="mt-3" />
            <Field icon={<Lock className="h-4 w-4" />} label="Password">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 4 characters" className="w-full bg-transparent text-sm outline-none placeholder:text-charcoal-400" />
            </Field>

            {error && (
              <div className="mt-4 rounded-xl bg-terracotta-50 px-3 py-2 text-xs font-medium text-terracotta-700">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-terracotta-500/30 transition active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? <Spinner className="h-4 w-4" /> : <>{mode === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight className="h-4 w-4" /></>}
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-charcoal-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald2-600" />
              Credentials stored securely on this device.
            </div>
          </form>

          <p className="mt-6 text-center text-[11px] text-charcoal-400">
            By continuing you agree to PreDine's Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-terracotta-500/20 text-terracotta-300">{icon}</div>
      <p className="mt-3 text-sm font-bold">{title}</p>
      <p className="mt-0.5 text-[11px] text-charcoal-400">{desc}</p>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-charcoal-500">{label}</span>
      <div className="flex items-center gap-2.5 rounded-xl border border-charcoal-200 bg-charcoal-50 px-3.5 py-3 focus-within:border-terracotta-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-terracotta-100">
        <span className="text-charcoal-400">{icon}</span>
        {children}
      </div>
    </label>
  );
}

import { useEffect, useState } from 'react';
import { Building2, CheckCircle2, CreditCard, Landmark, Lock, ShieldCheck, Wallet, X } from 'lucide-react';
import { cn, formatINR, Spinner } from '../ui';

interface Props {
  open: boolean;
  amount: number;
  restaurantName: string;
  onClose: () => void;
  onSuccess: () => void;
}

type Method = 'UPI' | 'Cards' | 'NetBanking' | 'Wallets';

const METHODS: { key: Method; icon: React.ReactNode; sub: string }[] = [
  { key: 'UPI', icon: <Wallet className="h-5 w-5" />, sub: 'GPay, PhonePe, Paytm' },
  { key: 'Cards', icon: <CreditCard className="h-5 w-5" />, sub: 'Visa, Mastercard, RuPay' },
  { key: 'NetBanking', icon: <Landmark className="h-5 w-5" />, sub: 'All major banks' },
  { key: 'Wallets', icon: <Building2 className="h-5 w-5" />, sub: 'Amazon Pay, Mobikwik' },
];

export default function PaymentModal({ open, amount, restaurantName, onClose, onSuccess }: Props) {
  const [selected, setSelected] = useState<Method | null>(null);
  const [phase, setPhase] = useState<'idle' | 'processing' | 'success'>('idle');

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => { setSelected(null); setPhase('idle'); }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!open) return null;

  function pay() {
    setPhase('processing');
    setTimeout(() => setPhase('success'), 2000);
    setTimeout(() => { onSuccess(); }, 3200);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-charcoal-950/50 backdrop-blur-sm animate-fadeIn" onClick={phase === 'idle' ? onClose : undefined} />

      {/* processing overlay */}
      {phase === 'processing' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-charcoal-950/80 backdrop-blur animate-fadeIn">
          <Spinner className="h-12 w-12 text-terracotta-400" />
          <div className="text-center text-white">
            <p className="text-base font-bold">Syncing with Kitchen...</p>
            <p className="mt-1 text-sm text-charcoal-300">Allocating Optimal Table...</p>
          </div>
        </div>
      )}

      {/* success flash */}
      {phase === 'success' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-emerald2-600 to-emerald2-800 animate-fadeIn">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white/15 animate-scaleIn">
            <CheckCircle2 className="h-12 w-12 text-white" />
          </div>
          <div className="text-center text-white animate-fadeIn">
            <p className="text-xl font-extrabold">Payment Successful!</p>
            <p className="mt-1 text-sm text-emerald2-100">Table #14 Reserved & Locked.</p>
          </div>
        </div>
      )}

      {/* sheet */}
      <div className="relative z-0 w-full max-w-md rounded-t-3xl bg-white p-5 shadow-2xl animate-slideUp sm:rounded-3xl">
        {/* drag handle */}
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-charcoal-200" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-charcoal-400">Paying {restaurantName}</p>
            <p className="text-2xl font-extrabold text-charcoal-900">{formatINR(amount)}</p>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-charcoal-100 active:scale-95">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-charcoal-400">
          <Lock className="h-3.5 w-3.5 text-emerald2-600" /> Secured by PrePay · 256-bit encryption
        </div>

        <div className="mt-4 space-y-2.5">
          {METHODS.map((m) => (
            <button
              key={m.key}
              onClick={() => setSelected(m.key)}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition active:scale-[0.99]',
                selected === m.key ? 'border-terracotta-500 bg-terracotta-50' : 'border-charcoal-100 bg-white',
              )}
            >
              <div className={cn('grid h-10 w-10 place-items-center rounded-xl', selected === m.key ? 'bg-terracotta-500 text-white' : 'bg-charcoal-100 text-charcoal-600')}>
                {m.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-charcoal-900">{m.key}</p>
                <p className="text-[11px] text-charcoal-400">{m.sub}</p>
              </div>
              <span className={cn('grid h-5 w-5 place-items-center rounded-full border-2', selected === m.key ? 'border-terracotta-500 bg-terracotta-500' : 'border-charcoal-200')}>
                {selected === m.key && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
            </button>
          ))}
        </div>

        <button
          disabled={!selected || phase !== 'idle'}
          onClick={pay}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-charcoal-900 py-4 text-sm font-bold text-white transition active:scale-[0.99] disabled:opacity-50"
        >
          <ShieldCheck className="h-4 w-4" /> {selected ? `Pay ${formatINR(amount)} via ${selected}` : 'Select a payment method'}
        </button>
      </div>
    </div>
  );
}

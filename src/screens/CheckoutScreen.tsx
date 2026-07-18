import { useState } from 'react';
import { ArrowLeft, Car, CheckCircle2, Footprints, MapPin, Train, Wallet } from 'lucide-react';
import type { BasketItem, Restaurant, TransitMethod } from '../types';
import { CONVENIENCE_FEE, TAX_RATE } from '../data';
import { cn } from '../ui';
import OrderSummaryCard from "../components/OrderSummaryCard";
import PriceBreakdownCard from "../components/PriceBreakdownCard";

interface Props {
  restaurant: Restaurant;
  basket: BasketItem[];
  onBack: () => void;
  onPay: (opts: { transit: TransitMethod; eta: number; liveSync: boolean }) => void;
}

const TRANSIT: { key: TransitMethod; icon: React.ReactNode; etas: number[] }[] = [
  { key: 'Walking', icon: <Footprints className="h-5 w-5" />, etas: [10, 15, 20, 25] },
  { key: 'Driving', icon: <Car className="h-5 w-5" />, etas: [4, 6, 8, 12] },
  { key: 'Transit', icon: <Train className="h-5 w-5" />, etas: [8, 12, 18, 24] },
];

export default function CheckoutScreen({ restaurant, basket, onBack, onPay }: Props) {
  const [transit, setTransit] = useState<TransitMethod>('Driving');
  const [eta, setEta] = useState<number>(6);
  const [liveSync, setLiveSync] = useState(true);

  const subtotal = basket.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const fee = CONVENIENCE_FEE;
  const total = subtotal + tax + fee;
  const cookTime = Math.max(...basket.map((i) => i.cookTime));

  const transitCfg = TRANSIT.find((t) => t.key === transit)!;

  return (
    <div className="min-h-[100dvh] bg-charcoal-50 pb-32 lg:pb-10">
      {/* header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-charcoal-100 bg-white/95 px-4 py-3.5 backdrop-blur sm:px-8 lg:px-12">
        <button onClick={onBack} className="grid h-9 w-9 place-items-center rounded-full bg-charcoal-100 active:scale-95">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
  <div className="flex items-center gap-2">
    <span className="text-xl">🍽</span>

    <h1 className="text-lg font-extrabold text-charcoal-900 lg:text-xl">
      Checkout
    </h1>
  </div>

  <p className="mt-1 text-sm font-medium text-emerald2-700">
    Almost there! Your table is getting ready.
  </p>

  <p className="mt-1 text-xs text-charcoal-400">
    {restaurant.name} • Table #14 auto-allocated
  </p>
</div>
      </div>

      <div className="px-5 pt-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* left: logistics */}
          <div className="flex-1 lg:max-w-2xl">
            <div className="mb-5 rounded-3xl bg-gradient-to-r from-emerald2-500 to-emerald2-600 p-5 text-white shadow-xl">
  <div className="flex items-center justify-between">
    <div>
      <div className="mt-5">
  <div className="mb-2 flex items-center justify-between text-xs">
    <span>Kitchen Sync Progress</span>
    <span className="font-bold">87%</span>
  </div>

  <div className="h-2 overflow-hidden rounded-full bg-white/20">
    <div className="h-full w-[87%] rounded-full bg-white transition-all duration-700"></div>
  </div>

  <div className="mt-3 flex items-center gap-2 text-sm">
    <span className="h-2 w-2 animate-pulse rounded-full bg-lime-300"></span>

    <span>
      Kitchen will start cooking at the perfect time.
    </span>
  </div>
</div>
      <p className="text-xs font-semibold uppercase tracking-widest text-emerald2-100">
        Your Table
      </p>

      <h2 className="mt-1 text-2xl font-extrabold">
        Reserved Successfully 🍽
      </h2>

      <p className="mt-2 text-sm text-emerald2-50">
        {restaurant.name}
      </p>

      <p className="mt-1 text-xs text-emerald2-100">
        Table #14 is waiting for you
      </p>
    </div>

    <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
      <p className="text-xs text-emerald2-100">
        Arrival
      </p>

      <p className="text-3xl font-extrabold">
        {eta}
      </p>

      <p className="text-xs">
        mins
      </p>
    </div>
  </div>
</div>
            {/* order summary */}
            <OrderSummaryCard
  basket={basket}
  cookTime={cookTime}
/>

            {/* transit method */}
            <div className="mt-5">
              <h2 className="mb-2.5 text-sm font-bold text-charcoal-900">How are you getting here?</h2>
              <div className="grid grid-cols-3 gap-2.5">
                {TRANSIT.map((t) => (
                  <button
                    key={t.key}
           
                    onClick={() => { setTransit(t.key); setEta(t.etas[1]); }}
                    className={cn(
                      'flex flex-col items-center gap-1.5 rounded-2xl border-2 py-3.5 transition active:scale-95',
                      transit === t.key ? 'border-terracotta-500 bg-terracotta-50 text-terracotta-700' : 'border-charcoal-100 bg-white text-charcoal-500',
                    )}
                  >
                    {t.icon}
                    <span className="text-xs font-bold">{t.key}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ETA selector */}
            <div className="mt-5">
              <div className="mb-2.5 flex items-center justify-between">
                <h2 className="text-sm font-bold text-charcoal-900">Your travel ETA</h2>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald2-700"><MapPin className="h-3.5 w-3.5" />{restaurant.distanceKm} km away</span>
              </div>
              <div className="no-scrollbar flex gap-2 overflow-x-auto">
                {transitCfg.etas.map((m) => (
                  <button
                    key={m}
                    onClick={() => setEta(m)}
                    className={cn(
                      'flex shrink-0 flex-col items-center rounded-xl border-2 px-5 py-3 transition active:scale-95',
                      eta === m ? 'border-charcoal-900 bg-charcoal-900 text-white' : 'border-charcoal-100 bg-white text-charcoal-600',
                    )}
                  >
                    <span className="text-lg font-extrabold leading-none">{m}</span>
                    <span className="mt-0.5 text-[10px] opacity-80">mins</span>
                  </button>
                ))}
              </div>
            </div>

            {/* live sync toggle */}
            <button
              onClick={() => setLiveSync((v) => !v)}
              className={cn(
                'mt-5 flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition active:scale-[0.99]',
                liveSync ? 'border-emerald2-500 bg-emerald2-50' : 'border-charcoal-100 bg-white',
              )}
            >
              <div className={cn('mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full transition', liveSync ? 'bg-emerald2-500 text-white' : 'bg-charcoal-200 text-transparent')}>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-charcoal-900">Cook based on my live location</p>
                <p className="mt-0.5 text-[11px] leading-snug text-charcoal-500">
                  <span className="font-semibold text-emerald2-700">Highly Recommended:</span> syncs kitchen start time with your travel distance so food lands hot.
                </p>
              </div>
            </button>
          </div>

          {/* right: price breakdown (sticky on desktop) */}
          <div className="w-full lg:w-80 lg:shrink-0 lg:sticky lg:top-20">
           <PriceBreakdownCard
  subtotal={subtotal}
  tax={tax}
  fee={fee}
  total={total}
/> {/* pay CTA */}
      <div className="mt-4">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <button
            onClick={() => onPay({ transit, eta, liveSync })}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-terracotta-500 to-terracotta-600 py-4 text-sm font-bold text-white shadow-lg shadow-terracotta-500/30 active:scale-[0.99]"
          >
            <Wallet className="h-4 w-4" /> Proceed to Secure Pay & Confirm Table
          </button>
        </div>
      </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}


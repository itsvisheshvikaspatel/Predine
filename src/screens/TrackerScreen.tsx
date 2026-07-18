import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChefHat, CheckCircle2, Clock, CookingPot, DoorOpen, MapPin, Navigation, Table2, Timer, Utensils } from 'lucide-react';
import type { Order, OrderStatus } from '../types';
import { advanceOrder, pushBackCooking } from '../store';
import { Badge, Spinner, cn, formatINR } from '../ui';

interface Props {
  order: Order;
  onBack: () => void;
  onUpdate: (o: Order) => void;
}

const STEPS: { key: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { key: 'Order Placed', label: 'Order Dispatched', icon: <Navigation className="h-4 w-4" /> },
  { key: 'Preparing', label: 'Cooking In Progress', icon: <CookingPot className="h-4 w-4" /> },
  { key: 'Table Confirmed', label: 'Table Allocated', icon: <Table2 className="h-4 w-4" /> },
  { key: 'Ready to Serve', label: 'Served', icon: <Utensils className="h-4 w-4" /> },
];

export default function TrackerScreen({ order, onBack, onUpdate }: Props) {
  const [delaying, setDelaying] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const elapsed = (now - order.createdAt) / 1000;
    let target: OrderStatus = order.status;
    if (elapsed > 6 && order.status === 'Order Placed') target = 'Preparing';
    if (elapsed > 14 && order.status === 'Preparing') target = 'Table Confirmed';
    if (elapsed > 22 && order.status === 'Table Confirmed') target = 'Ready to Serve';
    if (target !== order.status) onUpdate(advanceOrder(order, target));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now]);

  const currentIdx = STEPS.findIndex((s) => s.key === order.status);
  const cookTime = Math.max(...order.items.map((i) => i.cookTime));

  const readyAt = order.readyAt ?? order.createdAt + cookTime * 60 * 1000;
  const secsLeft = Math.max(0, Math.round((readyAt - now) / 1000));
  const minsLeft = Math.floor(secsLeft / 60);
  const remSecs = secsLeft % 60;

  function handleDelay() {
    setDelaying(true);
    setTimeout(() => {
      const updated = pushBackCooking(order, 5);
      onUpdate(updated);
      setDelaying(false);
    }, 1400);
  }

  return (
    <div className="min-h-[100dvh] bg-charcoal-50 pb-10">
      {/* header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-charcoal-100 bg-white/95 px-4 py-3.5 backdrop-blur sm:px-8 lg:px-12">
        <button onClick={onBack} className="grid h-9 w-9 place-items-center rounded-full bg-charcoal-100 active:scale-95">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-base font-bold text-charcoal-900 lg:text-lg">Live Order Tracker</h1>
          <p className="text-[11px] text-charcoal-400">Order {order.id} · {order.restaurantName}</p>
        </div>
        <Badge tone="green">{order.status}</Badge>
      </div>

      <div className="px-5 pt-5 sm:px-8 lg:px-12">
        {/* ETA hero card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal-900 to-charcoal-800 p-5 text-white shadow-card lg:p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-terracotta-500/30 blur-2xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs text-charcoal-300">Food ready in</p>
              <p className="mt-1 font-extrabold tabular-nums" style={{ fontSize: 44, lineHeight: 1 }}>
                {minsLeft}<span className="text-xl text-charcoal-300">m</span> {String(remSecs).padStart(2, '0')}<span className="text-xl text-charcoal-300">s</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 font-medium"><Clock className="h-3.5 w-3.5" />ETA {order.arrivalEta}m</span>
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 font-medium">{order.transit}</span>
              <span className="flex items-center gap-1 rounded-full bg-emerald2-500/20 px-3 py-1.5 font-medium text-emerald2-200"><Table2 className="h-3.5 w-3.5" />Table #{order.tableNumber}</span>
            </div>
          </div>
        </div>

        {/* timeline + blueprint side by side on desktop */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* timeline */}
          <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-charcoal-100">
            <h2 className="mb-4 text-sm font-bold text-charcoal-900">Order Progress</h2>
            <div className="relative">
              <div className="absolute left-[18px] top-5 bottom-5 w-0.5 bg-charcoal-100" />
              <div
                className="absolute left-[18px] top-5 w-0.5 bg-emerald2-500 transition-all duration-700"
                style={{ height: `calc((100% - 2.5rem) * ${currentIdx / (STEPS.length - 1)})` }}
              />
              <div className="space-y-5">
                {STEPS.map((s, i) => {
                  const done = i < currentIdx;
                  const active = i === currentIdx;
                  return (
                    <div key={s.key} className="relative flex items-center gap-4">
                      <div
                        className={cn(
                          'relative z-10 grid h-9 w-9 place-items-center rounded-full transition',
                          done && 'bg-emerald2-500 text-white',
                          active && 'bg-terracotta-500 text-white',
                          !done && !active && 'bg-charcoal-100 text-charcoal-400',
                        )}
                      >
                        {done ? <CheckCircle2 className="h-5 w-5" /> : s.icon}
                        {active && <span className="absolute inset-0 animate-ping rounded-full bg-terracotta-400 opacity-40" />}
                      </div>
                      <div>
                        <p className={cn('text-sm font-bold', done || active ? 'text-charcoal-900' : 'text-charcoal-400')}>{s.label}</p>
                        <p className="text-[11px] text-charcoal-400">
                          {done ? 'Completed' : active ? 'In progress now' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* table blueprint */}
          <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-charcoal-100">
            <div className="mb-1 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-terracotta-600" />
              <h2 className="text-sm font-bold text-charcoal-900">Restaurant Floor Plan</h2>
            </div>
            <p className="mb-4 text-[11px] font-medium text-emerald2-700">Bypass the host podium and walk directly to your designated table.</p>

            <Blueprint activeTable={order.tableNumber} />

            <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald2-50 px-3.5 py-2.5">
              <span className="flex items-center gap-2 text-xs font-semibold text-emerald2-800">
                <DoorOpen className="h-4 w-4" /> Entry
              </span>
              <span className="text-[11px] text-charcoal-400">Walk past host → straight to Table #14</span>
            </div>
          </div>
        </div>

        {/* order items recap */}
        <div className="mt-5 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-charcoal-100 lg:p-5">
          <h2 className="mb-3 text-sm font-bold text-charcoal-900">Your Order</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {order.items.map((i) => (
              <div key={i.id} className="flex items-center justify-between text-sm">
                <span className="text-charcoal-700">{i.qty}× {i.name}</span>
                <span className="font-semibold text-charcoal-900">{formatINR(i.qty * i.price)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 border-t border-dashed border-charcoal-200 pt-2.5 flex items-center justify-between">
            <span className="text-sm font-bold">Total Paid</span>
            <span className="text-sm font-extrabold text-emerald2-700">{formatINR(order.total)}</span>
          </div>
        </div>

        {/* delay panic button */}
        <div className="mx-auto mt-5 max-w-md">
          <button
            onClick={handleDelay}
            disabled={delaying || order.status === 'Ready to Serve'}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-terracotta-300 bg-terracotta-50 py-4 text-sm font-bold text-terracotta-700 transition active:scale-[0.99] disabled:opacity-50"
          >
            {delaying ? <><Spinner className="h-4 w-4" /> Pushing back cook time...</> : <><Timer className="h-4 w-4" /> Delayed? Push back cooking +5 mins</>}
          </button>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-charcoal-400">
          <ChefHat className="h-3.5 w-3.5" /> Kitchen synced to your live location {order.liveSync ? '· active' : '· manual'}
        </p>
      </div>
    </div>
  );
}

function Blueprint({ activeTable }: { activeTable: number }) {
  const tables = useMemo(() => Array.from({ length: 16 }, (_, i) => i + 1), []);
  return (
    <div className="relative overflow-hidden rounded-xl border border-charcoal-200 map-grid-bg p-4">
      <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-md bg-charcoal-900 px-2 py-0.5 text-[9px] font-bold text-white">
        <DoorOpen className="h-2.5 w-2.5" /> ENTRY
      </div>
      <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-charcoal-700 px-2 py-0.5 text-[9px] font-bold text-white">
        <CookingPot className="h-2.5 w-2.5" /> KITCHEN
      </div>

      <div className="grid grid-cols-4 gap-2.5 pb-6 pt-6 sm:grid-cols-4">
        {tables.map((n) => {
          const active = n === activeTable;
          return (
            <div
              key={n}
              className={cn(
                'relative grid h-12 place-items-center rounded-lg text-[11px] font-bold transition',
                active
                  ? 'bg-emerald2-500 text-white shadow-lg ring-2 ring-emerald2-300'
                  : 'bg-white/80 text-charcoal-500 ring-1 ring-charcoal-200',
              )}
            >
              {active && <span className="absolute inset-0 animate-pulseRing rounded-lg ring-2 ring-emerald2-400" />}
              <span className="flex flex-col items-center leading-none">
                <Table2 className={cn('h-3.5 w-3.5', active ? 'text-white' : 'text-charcoal-400')} />
                <span className="mt-0.5">#{n}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

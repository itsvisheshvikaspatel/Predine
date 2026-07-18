import { useState } from 'react';
import { ArrowLeft, Clock, Minus, Plus, ShoppingBag, Star, Timer, Utensils } from 'lucide-react';
import type { BasketItem, MenuItem, Restaurant } from '../types';
import { Badge, VegMark, cn, formatINR } from '../ui';

const TABS = ['Appetizers', 'Mains', 'Drinks'] as const;
type Tab = (typeof TABS)[number];

interface Props {
  restaurant: Restaurant;
  basket: BasketItem[];
  onBack: () => void;
  onAdd: (item: MenuItem) => void;
  onRemove: (itemId: string) => void;
  onCheckout: () => void;
}

export default function MenuScreen({ restaurant, basket, onBack, onAdd, onRemove, onCheckout }: Props) {
  const [tab, setTab] = useState<Tab>('Mains');

  const items = restaurant.menu.filter((m) => m.category === tab);
  const count = basket.reduce((s, i) => s + i.qty, 0);
  const total = basket.reduce((s, i) => s + i.qty * i.price, 0);
  const cookTime = basket.length ? Math.max(...basket.map((i) => i.cookTime)) : 0;

  return (
    <div className="pb-36 lg:pb-10">
      {/* restaurant header */}
      <div className={cn('relative bg-gradient-to-br px-5 pb-6 pt-5 text-white sm:px-8 lg:px-12 lg:pb-8', restaurant.accent)}>
        <button onClick={onBack} className="mb-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur active:scale-95">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-extrabold leading-tight lg:text-3xl">{restaurant.name}</h1>
            <p className="mt-0.5 text-sm text-white/80">{restaurant.cuisine}</p>
          </div>
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <Utensils className="h-7 w-7" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 font-semibold"><Star className="h-3 w-3 fill-white" />{restaurant.rating}</span>
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 font-semibold"><Clock className="h-3 w-3" />{restaurant.prepMinutes} min prep</span>
          <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 font-semibold">{restaurant.tablesLeft} tables</span>
        </div>
      </div>

      <div className="px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* menu column */}
          <div className="flex-1 lg:max-w-2xl">
            {/* tabs */}
            <div className="sticky top-0 z-20 -mx-5 border-b border-charcoal-100 bg-white/95 px-5 py-2.5 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-0 lg:rounded-2xl lg:px-4">
              <div className="no-scrollbar flex gap-1 overflow-x-auto">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      'whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition',
                      tab === t ? 'bg-charcoal-900 text-white' : 'text-charcoal-500 hover:bg-charcoal-50',
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* items */}
            <div className="pt-4">
              <p className="mb-3 text-xs font-semibold text-charcoal-400">{items.length} ITEMS · COOK TIME PER DISH</p>
              <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                {items.map((item) => {
                  const inBasket = basket.find((b) => b.id === item.id);
                  return (
                    <div key={item.id} className="flex gap-3 rounded-2xl bg-white p-3.5 shadow-soft ring-1 ring-charcoal-100">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <VegMark veg={item.veg} />
                          {item.popular && <Badge tone="orange">Popular</Badge>}
                        </div>
                        <h3 className="mt-1.5 text-sm font-bold text-charcoal-900">{item.name}</h3>
                        <p className="mt-0.5 line-clamp-2 text-xs text-charcoal-400">{item.desc}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-sm font-bold text-charcoal-900">{formatINR(item.price)}</span>
                          <span className="flex items-center gap-1 text-[11px] font-medium text-terracotta-600"><Timer className="h-3 w-3" />Cook time: {item.cookTime} mins</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-between">
                        <div className="h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-charcoal-100 to-charcoal-200" />
                        <div className="mt-2">
                          {inBasket ? (
                            <div className="flex items-center gap-2.5 rounded-xl bg-charcoal-900 px-1.5 py-1 text-white">
                              <button onClick={() => onRemove(item.id)} className="grid h-6 w-6 place-items-center rounded-lg active:scale-90"><Minus className="h-3.5 w-3.5" /></button>
                              <span className="w-4 text-center text-sm font-bold">{inBasket.qty}</span>
                              <button onClick={() => onAdd(item)} className="grid h-6 w-6 place-items-center rounded-lg bg-terracotta-500 active:scale-90"><Plus className="h-3.5 w-3.5" /></button>
                            </div>
                          ) : (
                            <button onClick={() => onAdd(item)} className="flex items-center gap-1 rounded-xl border border-terracotta-200 bg-terracotta-50 px-3 py-1.5 text-xs font-bold text-terracotta-700 active:scale-95">
                              <Plus className="h-3.5 w-3.5" /> Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* desktop basket sidebar */}
          {count > 0 && (
            <div className="hidden w-80 shrink-0 lg:block lg:sticky lg:top-6">
              <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-charcoal-100">
                <div className="flex items-center gap-2 text-sm font-bold text-charcoal-900">
                  <ShoppingBag className="h-4 w-4 text-terracotta-600" /> Your Basket
                </div>
                <div className="mt-4 space-y-3">
                  {basket.map((i) => (
                    <div key={i.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 rounded-lg bg-charcoal-100 px-1.5 py-0.5">
                          <button onClick={() => onRemove(i.id)} className="text-charcoal-600"><Minus className="h-3 w-3" /></button>
                          <span className="w-4 text-center text-xs font-bold">{i.qty}</span>
                          <button onClick={() => onAdd(restaurant.menu.find((m) => m.id === i.id)!)} className="text-terracotta-600"><Plus className="h-3 w-3" /></button>
                        </div>
                        <span className="text-charcoal-700">{i.name}</span>
                      </div>
                      <span className="font-semibold text-charcoal-900">{formatINR(i.qty * i.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-dashed border-charcoal-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-charcoal-500">Max cook time</span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-terracotta-600"><Timer className="h-3.5 w-3.5" />{cookTime} mins</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-bold text-charcoal-900">Total</span>
                    <span className="text-lg font-extrabold text-charcoal-900">{formatINR(total)}</span>
                  </div>
                </div>
                <button onClick={onCheckout} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-charcoal-900 py-3.5 text-sm font-bold text-white transition active:scale-[0.99]">
                  Set Arrival Time & Checkout <ArrowLeft className="h-4 w-4 rotate-180" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* mobile floating basket bar */}
      {count > 0 && (
        <div className="fixed bottom-0 left-0 z-30 px-4 pb-4 safe-bottom lg:hidden">
          <button onClick={onCheckout} className="flex w-full items-center justify-between rounded-2xl bg-charcoal-900 px-4 py-3.5 text-white shadow-float active:scale-[0.99]">
            <div className="flex items-center gap-3">
              <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-terracotta-500">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-white text-[10px] font-bold text-charcoal-900">{count}</span>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold leading-none">{formatINR(total)}</p>
                <p className="mt-0.5 text-[11px] text-charcoal-300">Max cook {cookTime}m · {count} items</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-sm font-bold">Set Arrival Time & Checkout <ArrowLeft className="h-4 w-4 rotate-180" /></span>
          </button>
        </div>
      )}
    </div>
  );
}

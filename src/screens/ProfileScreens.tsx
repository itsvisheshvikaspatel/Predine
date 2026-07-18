import { ArrowLeft, Calendar, Clock, MapPin, Phone, Receipt, Table2, User as UserIcon } from 'lucide-react';
import type { Order } from '../types';
import { useAuth } from '../auth';
import { Badge, formatINR } from '../ui';

export function ProfileScreen({ onBack, orders }: { onBack: () => void; orders: Order[] }) {
  const { user } = useAuth();
  const spent = orders.reduce((s, o) => s + o.total, 0);
  return (
    <div className="min-h-[100dvh] bg-charcoal-50 pb-10">
      <Header title="My Profile" onBack={onBack} />
      <div className="mx-auto max-w-4xl px-5 pt-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center rounded-3xl bg-gradient-to-br from-charcoal-900 to-charcoal-800 p-6 text-white shadow-card sm:flex-row sm:items-center sm:gap-5">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-terracotta-500 text-3xl font-extrabold">
            {user?.name?.[0]?.toUpperCase() ?? 'G'}
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:text-left">
            <h2 className="text-xl font-extrabold">{user?.name ?? 'Guest'}</h2>
            <p className="mt-0.5 flex items-center justify-center gap-1.5 text-sm text-charcoal-300 sm:justify-start">
  <Phone className="h-3.5 w-3.5" />
  {user?.email}
</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <StatCard icon={<Receipt className="h-4 w-4" />} value={String(orders.length)} label="Orders" />
          <StatCard icon={<Table2 className="h-4 w-4" />} value="#14" label="Table" />
          <StatCard icon={<Calendar className="h-4 w-4" />} value={formatINR(spent)} label="Spent" />
        </div>

        <div className="mt-5 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-charcoal-100 lg:p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-charcoal-900"><UserIcon className="h-4 w-4 text-terracotta-600" /> Account Details</h3>
          <Detail label="Name" value={user?.name ?? 'Guest'} />
          <Detail label="Email" value={user?.email ?? '-'} />
          <Detail 
 label="Member since" 
 value="2026"
/>
        </div>
      </div>
    </div>
  );
}

export function OrdersScreen({ onBack, orders, onOpenOrder }: { onBack: () => void; orders: Order[]; onOpenOrder: (o: Order) => void }) {
  return (
    <div className="min-h-[100dvh] bg-charcoal-50 pb-10">
      <Header title="Past Orders Log" onBack={onBack} />
      <div className="mx-auto max-w-5xl px-5 pt-5 sm:px-8 lg:px-12">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-16 text-center shadow-soft ring-1 ring-charcoal-100">
            <Receipt className="h-10 w-10 text-charcoal-300" />
            <p className="mt-3 text-sm font-semibold text-charcoal-700">No orders yet</p>
            <p className="mt-1 text-xs text-charcoal-400">Your past orders will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {orders.map((o) => {
              const active = o.status !== 'Ready to Serve';
              return (
                <button key={o.id} onClick={() => onOpenOrder(o)} className="w-full rounded-2xl bg-white p-4 text-left shadow-soft ring-1 ring-charcoal-100 transition active:scale-[0.99] hover:shadow-card">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-charcoal-900">{o.restaurantName}</p>
                      <p className="text-[11px] text-charcoal-400">{o.id} · {new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                    <Badge tone={active ? 'green' : 'neutral'}>{o.status}</Badge>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] text-charcoal-500">
                    <span className="flex items-center gap-1"><Table2 className="h-3 w-3" />Table #{o.tableNumber}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{o.arrivalEta}m ETA</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{o.transit}</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between border-t border-dashed border-charcoal-200 pt-2.5">
                    <span className="text-xs text-charcoal-500">{o.items.length} items</span>
                    <span className="text-sm font-extrabold text-charcoal-900">{formatINR(o.total ?? 0)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-charcoal-100 bg-white/95 px-4 py-3.5 backdrop-blur sm:px-8 lg:px-12">
      <button onClick={onBack} className="grid h-9 w-9 place-items-center rounded-full bg-charcoal-100 active:scale-95">
        <ArrowLeft className="h-4 w-4" />
      </button>
      <h1 className="text-base font-bold text-charcoal-900 lg:text-lg">{title}</h1>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white p-3.5 shadow-soft ring-1 ring-charcoal-100">
      <span className="text-terracotta-600">{icon}</span>
      <span className="mt-1.5 text-base font-extrabold text-charcoal-900">{value}</span>
      <span className="text-[11px] text-charcoal-400">{label}</span>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-charcoal-100 py-2.5 last:border-0">
      <span className="text-sm text-charcoal-500">{label}</span>
      <span className="text-sm font-semibold text-charcoal-900">{value}</span>
    </div>
  );
}

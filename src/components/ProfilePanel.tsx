import { Clock, LogOut, MapPin, Receipt, User as UserIcon, X } from 'lucide-react';
import type { Order } from '../types';
import { useAuth } from '../auth';
import { formatINR } from '../ui';

interface Props {
  open: boolean;
  onClose: () => void;
  onShowProfile: () => void;
  onShowOrders: () => void;
  orders: Order[];
}

export default function ProfilePanel({ open, onClose, onShowProfile, onShowOrders, orders }: Props) {
  const { user, signOut } = useAuth();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-charcoal-950/40 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl animate-slideInRight">
        {/* header */}
        <div className="flex items-center justify-between bg-gradient-to-br from-charcoal-900 to-charcoal-800 px-5 pb-6 pt-5 text-white">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-terracotta-500 text-base font-bold">
              {user?.name?.[0]?.toUpperCase() ?? 'G'}
            </div>
            <div>
              <p className="font-bold leading-tight">{user?.name ?? 'Guest'}</p>
              <p className="text-xs text-charcoal-300"> {user?.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 active:scale-95">
            <X className="h-4 w-4" />
          </button>
        </div>mobile

        {/* quick stat */}
        <div className="mx-5 -mt-3 grid grid-cols-2 gap-3 rounded-2xl bg-white p-3 shadow-card">
          <Stat icon={<Receipt className="h-4 w-4 text-terracotta-600" />} label="Total Orders" value={String(orders.length)} />
          <Stat icon={<MapPin className="h-4 w-4 text-emerald2-600" />} label="Table Locked" value="#14" />
        </div>

        {/* menu */}
        <div className="mt-4 flex-1 space-y-1 px-3">
          <MenuItem icon={<UserIcon className="h-5 w-5" />} label="My Profile" onClick={() => { onShowProfile(); onClose(); }} />
          <MenuItem icon={<Clock className="h-5 w-5" />} label="Past Orders Log" onClick={() => { onShowOrders(); onClose(); }} />
        </div>

        {/* recent orders preview */}
        {orders.length > 0 && (
          <div className="px-5 pb-2">
            <p className="mb-2 text-xs font-semibold text-charcoal-400">RECENT</p>
            <div className="space-y-2">
              {orders.slice(0, 2).map((o) => (
                <div key={o.id} className="flex items-center justify-between rounded-xl bg-charcoal-50 px-3 py-2.5">
                  <div>
                    <p className="text-sm font-semibold text-charcoal-800">{o.restaurantName}</p>
                    <p className="text-[11px] text-charcoal-400">{o.items.length} items · {formatINR(o.total ?? 0)}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald2-700">{o.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* logout */}
        <div className="p-4 safe-bottom">
          <button onClick={signOut} className="flex w-full items-center justify-center gap-2 rounded-xl border border-terracotta-200 bg-terracotta-50 py-3 text-sm font-bold text-terracotta-700 active:scale-[0.98]">
            <LogOut className="h-4 w-4" /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-charcoal-50">{icon}</div>
      <div>
        <p className="text-base font-bold leading-none text-charcoal-900">{value}</p>
        <p className="text-[11px] text-charcoal-400">{label}</p>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3.5 rounded-xl px-3 py-3.5 text-left text-sm font-semibold text-charcoal-800 transition hover:bg-charcoal-50 active:bg-charcoal-100">
      <span className="text-charcoal-500">{icon}</span>
      {label}
    </button>
  );
}

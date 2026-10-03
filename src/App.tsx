import { useEffect, useMemo, useState } from 'react';
import { ChefHat, Home, Receipt, User as UserIcon } from 'lucide-react';
import { AuthProvider, useAuth } from './auth';
import type { BasketItem, MenuItem, Order, Restaurant, TransitMethod } from './types';
import { CONVENIENCE_FEE, TAX_RATE } from './data';
import { createOrder, getActiveOrder, getOrdersForUser, saveOrder, setCookTiming, fetchMyOrders } from './store';
import { cn } from './ui';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import TrackerScreen from './screens/TrackerScreen';
import { OrdersScreen, ProfileScreen } from './screens/ProfileScreens';
import ProfilePanel from './components/ProfilePanel';
import PaymentModal from './components/PaymentModal';

type Screen = 'home' | 'menu' | 'checkout' | 'tracker' | 'profile' | 'orders';

function Shell() {
  const { user } = useAuth();
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [checkoutOpts, setCheckoutOpts] = useState<{ transit: TransitMethod; eta: number; liveSync: boolean } | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!user) return;
    const all = getOrdersForUser(user.email);
    setOrders(all);
    const active = getActiveOrder(user.email);
    if (active) {
      setActiveOrder(active);
      setScreen('tracker');
    }
  }, [user]);

  const payAmount = useMemo(() => {
    const subtotal = basket.reduce((s, i) => s + i.qty * i.price, 0);
    return subtotal + Math.round(subtotal * TAX_RATE) + CONVENIENCE_FEE;
  }, [basket]);

  if (!user) return <AuthScreen />;

 async function refreshOrders() {
  if (!user) return;

  const orders = await fetchMyOrders();

  setOrders(orders);
}
  function openRestaurant(r: Restaurant) {
    setSelectedRestaurant(r);
    setBasket([]);
    setScreen('menu');
  }

  function addItem(item: MenuItem) {
    setBasket((prev) => {
      const found = prev.find((b) => b.id === item.id);
      if (found) return prev.map((b) => (b.id === item.id ? { ...b, qty: b.qty + 1 } : b));
      return [...prev, { id: item.id, name: item.name, price: item.price, cookTime: item.cookTime, category: item.category, qty: 1 }];
    });
  }

  function removeItem(itemId: string) {
    setBasket((prev) => prev.flatMap((b) => (b.id === itemId ? (b.qty > 1 ? [{ ...b, qty: b.qty - 1 }] : []) : [b])));
  }

  function goCheckout() {
    setScreen('checkout');
  }

  function startPayment(opts: { transit: TransitMethod; eta: number; liveSync: boolean }) {
    setCheckoutOpts(opts);
    setPayOpen(true);
  }

  async function onPaymentSuccess() {
    if (!user || !selectedRestaurant || !checkoutOpts) return;
    const subtotal = basket.reduce((s, i) => s + i.qty * i.price, 0);
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + tax + CONVENIENCE_FEE;
    const cookTime = Math.max(...basket.map((i) => i.cookTime));

    const now = Date.now();
    const startDelay = Math.max(0, (checkoutOpts.eta - cookTime) * 60 * 1000);
    const cookStartsAt = checkoutOpts.liveSync ? now + startDelay : now;
    const readyAt = cookStartsAt + cookTime * 60 * 1000;
console.log("Payment successful! Sending order to backend...");

const token = localStorage.getItem("token");


const res = await fetch("/api/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
  table: 8,
  restaurant: selectedRestaurant.name,
  items: basket,
  subtotal,
  tax,
  fee: CONVENIENCE_FEE,
  total,
  transit: checkoutOpts.transit,
  arrivalEta: checkoutOpts.eta,
}),
});

const data = await res.json();

console.log("Order Response:", data);

    const order = createOrder({
      userMobile: user.email,
      restaurantId: selectedRestaurant.id,
      restaurantName: selectedRestaurant.name,
      items: basket,
      subtotal,
      tax,
      fee: CONVENIENCE_FEE,
      total,
      arrivalEta: checkoutOpts.eta,
      transit: checkoutOpts.transit,
      liveSync: checkoutOpts.liveSync,
    });
    const withTiming = setCookTiming(order, cookStartsAt, readyAt);
    saveOrder(withTiming);

    setActiveOrder(withTiming);
    refreshOrders();
    setPayOpen(false);
    setBasket([]);
    setCheckoutOpts(null);
    setScreen('tracker');
  }

  function updateActiveOrder(updated: Order) {
    setActiveOrder(updated);
    saveOrder(updated);
    refreshOrders();
  }

  function openPastOrder(o: Order) {
    setActiveOrder(o);
    setScreen('tracker');
  }

  const showNav = screen === 'home' || screen === 'orders' || screen === 'profile';

  return (
    <div className="flex min-h-[100dvh] bg-charcoal-50">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-[100dvh] w-64 shrink-0 flex-col border-r border-charcoal-100 bg-white lg:flex">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-terracotta-400 to-terracotta-600 shadow-lg">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-charcoal-900">PreDine</h1>
            <p className="text-[11px] text-charcoal-400">Order on the way</p>
          </div>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          <SideNavItem icon={<Home className="h-5 w-5" />} label="Home" active={screen === 'home'} onClick={() => setScreen('home')} />
          <SideNavItem icon={<Receipt className="h-5 w-5" />} label="Past Orders" active={screen === 'orders'} onClick={() => setScreen('orders')} />
          <SideNavItem icon={<UserIcon className="h-5 w-5" />} label="My Profile" active={screen === 'profile'} onClick={() => setScreen('profile')} />
        </nav>

        <div className="border-t border-charcoal-100 p-4">
          <button onClick={() => setProfileOpen(true)} className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-charcoal-50">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-terracotta-500 text-sm font-bold text-white">
              {user.name?.[0]?.toUpperCase() ?? 'G'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-charcoal-900">{user.name}</p>
              <p className="truncate text-[11px] text-charcoal-400">+91 {user.email}</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="relative flex min-h-[100dvh] flex-1 flex-col">
        {/* Mobile top header with profile icon */}
        {screen === 'home' && (
          <header className="sticky top-0 z-30 flex items-center justify-end bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 px-5 pb-2 pt-3 lg:hidden">
            <button onClick={() => setProfileOpen(true)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur transition active:scale-95">
              <UserIcon className="h-5 w-5" />
            </button>
          </header>
        )}

        <main className="flex-1">
          {screen === 'home' && <HomeScreen onOpenRestaurant={openRestaurant} />}
          {screen === 'menu' && selectedRestaurant && (
            <MenuScreen restaurant={selectedRestaurant} basket={basket} onBack={() => setScreen('home')} onAdd={addItem} onRemove={removeItem} onCheckout={goCheckout} />
          )}
          {screen === 'checkout' && selectedRestaurant && (
            <CheckoutScreen restaurant={selectedRestaurant} basket={basket} onBack={() => setScreen('menu')} onPay={startPayment} />
          )}
          {screen === 'tracker' && activeOrder && (
            <TrackerScreen order={activeOrder} onBack={() => setScreen('home')} onUpdate={updateActiveOrder} />
          )}
          {screen === 'profile' && <ProfileScreen onBack={() => setScreen('home')} orders={orders} />}
          {screen === 'orders' && <OrdersScreen onBack={() => setScreen('home')} orders={orders} onOpenOrder={openPastOrder} />}
        </main>
      </div>

      {/* Mobile bottom nav */}
      {showNav && (
        <nav className="fixed bottom-0 left-0 z-30 flex w-full items-center justify-around border-t border-charcoal-100 bg-white/95 px-6 py-2.5 backdrop-blur safe-bottom lg:hidden">
          <NavButton icon={<Home className="h-5 w-5" />} label="Home" active={screen === 'home'} onClick={() => setScreen('home')} />
          <NavButton icon={<Receipt className="h-5 w-5" />} label="Orders" active={screen === 'orders'} onClick={() => setScreen('orders')} />
          <NavButton icon={<UserIcon className="h-5 w-5" />} label="Profile" active={screen === 'profile'} onClick={() => setScreen('profile')} />
        </nav>
      )}

      <ProfilePanel open={profileOpen} onClose={() => setProfileOpen(false)} onShowProfile={() => setScreen('profile')} onShowOrders={() => setScreen('orders')} orders={orders} />
      <PaymentModal open={payOpen} amount={payAmount} restaurantName={selectedRestaurant?.name ?? ''} onClose={() => setPayOpen(false)} onSuccess={onPaymentSuccess} />
    </div>
  );
}

function SideNavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition', active ? 'bg-terracotta-50 text-terracotta-700' : 'text-charcoal-500 hover:bg-charcoal-50 hover:text-charcoal-900')}>
      {icon}
      {label}
    </button>
  );
}

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={cn('flex flex-col items-center gap-0.5 px-4 py-1 transition active:scale-95', active ? 'text-terracotta-600' : 'text-charcoal-400')}>
      {icon}
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
    </AuthProvider>
  );
}

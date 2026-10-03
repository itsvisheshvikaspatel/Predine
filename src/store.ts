import type { Order, User } from './types';
import { FIXED_TABLE } from './data';
const API = "/api";
const API_URL = "/api";

const USERS_KEY = 'predine:users';
const SESSION_KEY = 'predine:session';
const ORDERS_KEY = 'predine:orders';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ---------- Users ---------- */

export function getUsers(): User[] {
  return read<User[]>(USERS_KEY, []);
}

export function findUser(email: string): User | undefined {
  return getUsers().find((u) => u.email === email);
}

export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<{ ok: boolean; error?: string; user?: User }> {
  try {
    const res = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        error: data.message,
      };
    }

    localStorage.setItem("token", data.token);

    return {
      ok: true,
      user: data.user,
    };
  } catch {
    return {
      ok: false,
      error: "Server not responding",
    };
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ ok: boolean; error?: string; user?: User }> {

  try {
   const res = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        error: data.message,
      };
    }

    localStorage.setItem("token", data.token);

    return {
      ok: true,
      user: data.user,
    };
  } catch {
    return {
      ok: false,
      error: "Server not responding",
    };
  }
}

/* ---------- Session ---------- */

export function getSessionMobile(): string | null {
  return read<string | null>(SESSION_KEY, null);
}

export function setSession(mobile: string) {
  write(SESSION_KEY, mobile);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  const m = getSessionMobile();
  if (!m) return null;
  return findUser(m) ?? null;
}

/* ---------- Orders ---------- */

export function getOrders(): Order[] {
  return read<Order[]>(ORDERS_KEY, []);
}

export function getOrdersForUser(mobile: string): Order[] {
  return getOrders()
    .filter((o) => o.userMobile === mobile)
    .sort((a, b) => b.createdAt - a.createdAt);
}

export function getActiveOrder(mobile: string): Order | null {
  return getOrdersForUser(mobile).find((o) => o.status !== 'Ready to Serve') ?? null;
}

export function saveOrder(order: Order) {
  const all = getOrders();
  const idx = all.findIndex((o) => o.id === order.id);
  if (idx >= 0) all[idx] = order;
  else all.unshift(order);
  write(ORDERS_KEY, all);
}

export function createOrder(input: Omit<Order, 'id' | 'tableNumber' | 'status' | 'createdAt' | 'statusUpdatedAt' | 'cookStartsAt' | 'readyAt'>): Order {
  const now = Date.now();
  const order: Order = {
    ...input,
    id: 'PD' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    tableNumber: FIXED_TABLE,
    status: 'Order Placed',
    createdAt: now,
    statusUpdatedAt: now,
    cookStartsAt: null,
    readyAt: null,
  };
  saveOrder(order);
  return order;
}

export function advanceOrder(order: Order, status: Order['status']): Order {
  const updated = { ...order, status, statusUpdatedAt: Date.now() };
  saveOrder(updated);
  return updated;
}

export function setCookTiming(order: Order, cookStartsAt: number, readyAt: number): Order {
  const updated = { ...order, cookStartsAt, readyAt };
  saveOrder(updated);
  return updated;
}

export function pushBackCooking(order: Order, extraMinutes: number): Order {
  const base = order.cookStartsAt ?? Date.now();
  const newStart = base + extraMinutes * 60 * 1000;
  const cookTime = Math.max(...order.items.map((i) => i.cookTime));
  const newReady = newStart + cookTime * 60 * 1000;
  return setCookTiming(order, newStart, newReady);
}
export async function fetchMyOrders() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/orders/my-orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data.data.map((o: any) => ({
  id: o._id,
  userMobile: "",
  restaurantId: "",
  restaurantName: o.restaurant,
  items: o.items,

  subtotal: o.items.reduce(
    (s: number, i: any) => s + i.price * i.qty,
    0
  ),

  tax: 0,
  fee: 0,

  total: o.items.reduce(
    (s: number, i: any) => s + i.price * i.qty,
    0
  ),

  tableNumber: o.table,

  arrivalEta: 0,

  transit: "Walking",

  liveSync: false,

  status: "Order Placed",

  createdAt: new Date(o.createdAt).getTime(),

  statusUpdatedAt: new Date(o.createdAt).getTime(),

  cookStartsAt: null,

  readyAt: null,
}));
  } catch (err) {
    console.log(err);
    return [];
  }
}

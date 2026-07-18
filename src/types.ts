export type OrderStatus =
  | 'Order Placed'
  | 'Preparing'
  | 'Table Confirmed'
  | 'Ready to Serve';

export type TransitMethod = 'Walking' | 'Driving' | 'Transit';

export interface User {
  id?: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
}
export interface BasketItem {
  id: string;
  name: string;
  price: number;
  cookTime: number;
  category: 'Appetizers' | 'Mains' | 'Drinks';
  qty: number;
}

export interface Order {
  id: string;
  userMobile: string;
  restaurantId: string;
  restaurantName: string;
  items: BasketItem[];
  subtotal: number;
  tax: number;
  fee: number;
  total: number;
  tableNumber: number;
  arrivalEta: number; // minutes
  transit: TransitMethod;
  liveSync: boolean;
  status: OrderStatus;
  createdAt: number;
  statusUpdatedAt: number;
  cookStartsAt: number | null; // timestamp ms when kitchen starts
  readyAt: number | null; // timestamp ms when food ready
}

export interface Restaurant {
  id: string;
  name: string;
  
  cuisine: string;
  rating: number;
  distanceKm: number;
  tablesLeft: number;
  prepMinutes: number;
  location: {
  lat: number;
  lng: number;
};
address: string;

  tag: 'Fastest Prep' | 'Closest' | 'Corporate Favorites' | 'Top Rated';
  accent: string; // tailwind gradient classes
  menu: MenuItem[];
  liveDistance?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  cookTime: number;
  category: 'Appetizers' | 'Mains' | 'Drinks';
  veg: boolean;
  popular?: boolean;
}

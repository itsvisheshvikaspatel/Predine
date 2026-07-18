import type { Restaurant } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'verdant',
    name: 'Verdant Kitchen',
    cuisine: 'North Indian · Corporate Thalis',
    rating: 4.8,
    distanceKm: 0.6,
    tablesLeft: 4,
    prepMinutes: 12,
    location: {
  lat: 28.6139,
  lng: 77.2090,
  
},
address: "Connaught Place, New Delhi",
    tag: 'Fastest Prep',
    accent: 'from-emerald2-500 to-emerald2-700',
    menu: [
      { id: 'v1', name: 'Paneer Tikka Combo', desc: 'Char-grilled paneer, mint chutney, butter naan', price: 320, cookTime: 10, category: 'Mains', veg: true, popular: true },
      { id: 'v2', name: 'Dal Tadka Thali', desc: 'Slow-cooked dal, jeera rice, salad, papad', price: 260, cookTime: 8, category: 'Mains', veg: true },
      { id: 'v3', name: 'Hara Bhara Kebab', desc: 'Spinach & green pea patties, yogurt dip', price: 180, cookTime: 7, category: 'Appetizers', veg: true },
      { id: 'v4', name: 'Masala Chaas', desc: 'Spiced buttermilk with curry leaf', price: 60, cookTime: 2, category: 'Drinks', veg: true },
      { id: 'v5', name: 'Shahi Paneer Bowl', desc: 'Creamy tomato gravy, basmati rice', price: 340, cookTime: 12, category: 'Mains', veg: true, popular: true },
      { id: 'v6', name: 'Fresh Lime Soda', desc: 'Sweet & salt, crushed ice', price: 70, cookTime: 2, category: 'Drinks', veg: true },
    ],
  },
  {
    id: 'saffron',
    name: 'Saffron Street',
    cuisine: 'Mughlai · Biryani House',
    rating: 4.7,
    distanceKm: 1.2,
    tablesLeft: 6,
    prepMinutes: 18,
    location: {
  lat: 28.6154,
  lng: 77.2128,
},
 address: "Janpath, New Delhi",
    tag: 'Top Rated',
    accent: 'from-terracotta-500 to-terracotta-700',
    menu: [
      { id: 's1', name: 'Butter Chicken Meal', desc: 'Tandoori chicken in makhani gravy, naan', price: 380, cookTime: 14, category: 'Mains', veg: false, popular: true },
      { id: 's2', name: 'Hyderabadi Dum Biryani', desc: 'Long grain rice, saffron, raita', price: 360, cookTime: 18, category: 'Mains', veg: false, popular: true },
      { id: 's3', name: 'Chicken Tikka', desc: 'Six pieces, smoky tandoor finish', price: 280, cookTime: 11, category: 'Appetizers', veg: false },
      { id: 's4', name: 'Seekh Kebab Roll', desc: 'Minced mutton, flaky paratha wrap', price: 220, cookTime: 9, category: 'Appetizers', veg: false },
      { id: 's5', name: 'Sweet Lassi', desc: 'Thick yogurt, rose petal', price: 80, cookTime: 2, category: 'Drinks', veg: true },
      { id: 's6', name: 'Diet Cola', desc: 'Chilled 330ml can', price: 60, cookTime: 1, category: 'Drinks', veg: true },
    ],
  },
  {
    id: 'corporate',
    name: 'The Corporate Canteen',
    cuisine: 'Quick Bowls · Health First',
    rating: 4.6,
    distanceKm: 0.3,
    tablesLeft: 8,
    prepMinutes: 9,
    location: {
  lat: 28.6117,
  lng: 77.2065,
 },
  address: "Barakhamba Road, New Delhi",
    tag: 'Closest',
    accent: 'from-charcoal-700 to-charcoal-900',
    menu: [
      { id: 'c1', name: 'Quinoa Rajma Power Bowl', desc: 'Quinoa, kidney beans, avocado, lime', price: 290, cookTime: 6, category: 'Mains', veg: true, popular: true },
      { id: 'c2', name: 'Grilled Chicken Salad Bowl', desc: 'Mesclun, charred chicken, tahini', price: 330, cookTime: 8, category: 'Mains', veg: false },
      { id: 'c3', name: 'Sprout Chaat', desc: 'Moong sprouts, pomegranate, tamarind', price: 140, cookTime: 4, category: 'Appetizers', veg: true },
      { id: 'c4', name: 'Cold Brew Coffee', desc: 'Single origin, 12hr steep', price: 120, cookTime: 1, category: 'Drinks', veg: true, popular: true },
      { id: 'c5', name: 'Diet Soda', desc: 'Zero sugar, 330ml', price: 55, cookTime: 1, category: 'Drinks', veg: true },
      { id: 'c6', name: 'Paneer & Pepper Wrap', desc: 'Whole wheat, hummus, veggies', price: 210, cookTime: 7, category: 'Mains', veg: true },
    ],
  },
  {
    id: 'dosa',
    name: 'Dosa Junction Express',
    cuisine: 'South Indian · Filter Coffee',
    rating: 4.5,
    distanceKm: 0.9,
    tablesLeft: 5,
    prepMinutes: 10,
    location: {
  lat: 28.6182,
  lng: 77.2144,
  
},
address: "Mandi House, New Delhi",
    tag: 'Corporate Favorites',
    accent: 'from-terracotta-400 to-terracotta-600',
    menu: [
      { id: 'd1', name: 'Masala Dosa Combo', desc: 'Crisp dosa, potato masala, sambar, chutney', price: 190, cookTime: 9, category: 'Mains', veg: true, popular: true },
      { id: 'd2', name: 'Idli Sambar Plate', desc: 'Steamed rice cakes, lentil sambar', price: 120, cookTime: 5, category: 'Appetizers', veg: true },
      { id: 'd3', name: 'Medu Vada', desc: 'Crisp lentil donuts, coconut chutney', price: 110, cookTime: 6, category: 'Appetizers', veg: true },
      { id: 'd4', name: 'Filter Coffee', desc: 'South Indian decoction, frothy', price: 50, cookTime: 3, category: 'Drinks', veg: true, popular: true },
      { id: 'd5', name: 'Rava Kesari', desc: 'Semolina sweet with saffron', price: 90, cookTime: 7, category: 'Appetizers', veg: true },
      { id: 'd6', name: 'Buttermilk', desc: 'Spiced neer mor', price: 45, cookTime: 2, category: 'Drinks', veg: true },
    ],
  },
];

export const FILTERS = ['Fastest Prep', 'Closest', 'Corporate Favorites', 'Top Rated'] as const;
export type FilterTag = (typeof FILTERS)[number];

export const TAX_RATE = 0.05; // 5% GST
export const CONVENIENCE_FEE = 19; // table automation fee
export const FIXED_TABLE = 14;

import RealMap from "../components/RealMap";
import { useState } from 'react';
import {
  Navigation,
} from "lucide-react";
import { FILTERS, RESTAURANTS, type FilterTag } from '../data';
import type { Restaurant } from '../types';
import { cn } from '../ui';
import { useNearbyRestaurants } from "../hooks/useNearbyRestaurants";
import { useUserLocation } from "../hooks/useUserLocation";
import RestaurantCard from "../components/RestaurantCard";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";

export default function HomeScreen({ onOpenRestaurant }: { onOpenRestaurant: (r: Restaurant) => void }) {
  const [filter, setFilter] = useState<FilterTag | 'All'>('All');
  const [search, setSearch] = useState('');;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { location } = useUserLocation();

const nearbyRestaurants = useNearbyRestaurants(
  RESTAURANTS,
  location
);

  const suggestions = RESTAURANTS.flatMap((restaurant) =>
  restaurant.menu
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .map((item) => ({
      dish: item.name,
      restaurant: restaurant.name,
    }))
);

 const list = nearbyRestaurants.filter((r) => {
  // Filter by category
  const matchesFilter = filter === 'All' || r.tag === filter;

  // Search by restaurant name OR cuisine
 const matchesSearch =
  r.name.toLowerCase().includes(search.toLowerCase()) ||
  r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
  r.menu.some((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return matchesFilter && matchesSearch;
});
  return (
    <div className="bg-charcoal-50 pb-28 text-charcoal-900 transition-colors duration-300 dark:bg-charcoal-950 dark:text-white lg:pb-10">
      {/* hero header */}
      <div className="bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900  dark:from-black dark:via-charcoal-950 dark:to-black px-5 pb-8 pt-6 text-white sm:px-8 lg:px-12 lg:pb-10 lg:pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium text-charcoal-300">Good afternoon,</p>
           
            <h1 className="mt-0.5 text-xl font-extrabold leading-tight sm:text-2xl lg:text-3xl">
  Hungry Now? Order on the Way.
</h1>
<SearchBar
  search={search}
  setSearch={setSearch}
  suggestions={suggestions}
  selectedIndex={selectedIndex}
  setSelectedIndex={setSelectedIndex}
  highlightMatch={highlightMatch}
/>

          </div>
         <div className="flex items-center gap-3 self-start">
  <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
    <Navigation className="h-3.5 w-3.5 text-emerald2-400" />
    delhi
  </div>

  <ThemeToggle />
</div> 
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-2xl bg-emerald2-500/15 px-4 py-3 ring-1 ring-emerald2-500/30">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald2-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald2-400" />
          </span>
          <p className="text-xs font-medium text-emerald2-100">4 partner kitchens live · Avg. table ready in 11 mins</p>
        </div>
      </div>

      {/* filter pills */}
      <div className="no-scrollbar -mt-4 flex gap-2 overflow-x-auto px-5 pb-1 sm:px-8 lg:px-12">
        <Pill active={filter === 'All'} onClick={() => setFilter('All')}>All</Pill>
        {FILTERS.map((f) => (
          <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Pill>
        ))}
      </div>

      {/* map grid */}
    
      <div className="px-5 pt-5 sm:px-8 lg:px-12">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-charcoal-900 lg:text-base">
  {search
    ? `Showing ${list.length} result${list.length !== 1 ? "s" : ""} for "${search}"`
    : "Nearby on the map"}
</h2>
          <span className="text-xs text-charcoal-400">{list.length} spots</span>
        </div>

        <div
  className={cn(
    "overflow-hidden rounded-3xl border border-charcoal-200 shadow-soft",
    search
      ? "h-[220px]"
      : "h-[380px]"
  )}
>
  <RealMap restaurants={list} />


         
          <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-charcoal-900 px-2.5 py-1 text-[10px] font-semibold text-white shadow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald2-400" /> You
          </div>

        </div>
      </div>
      

      {/* restaurant list */}
<div className="px-5 pt-6 sm:px-8 lg:px-12">
  <h2 className="mb-3 text-sm font-bold text-charcoal-900 lg:text-base">
    Recommended for you
  </h2>

  {list.length > 0 ? (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {list.map((r) => (
        <RestaurantCard
          key={r.id}
          r={r}
          search={search}
           distance={r.liveDistance ?? r.distanceKm}
          onClick={() => onOpenRestaurant(r)}
        />
      ))}
    </div>
  ) : (
    <div className="rounded-2xl border border-dashed border-charcoal-300 bg-white p-10 text-center">
      <div className="text-5xl">🔍</div>

      <h3 className="mt-4 text-lg font-bold text-charcoal-900">
        No restaurant or dish found
      </h3>

      <p className="mt-2 text-sm text-charcoal-500">
        Try searching for another restaurant, dish or cuisine.
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {["Paneer", "Dosa", "Coffee", "Chicken"].map((item) => (
          <button
            key={item}
            onClick={() => setSearch(item)}
            className="rounded-full bg-charcoal-100 px-3 py-1 text-sm hover:bg-charcoal-200"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )}
</div>
    </div>
  );
}
function highlightMatch(text: string, search: string) {
  if (!search) return text;

  const index = text.toLowerCase().indexOf(search.toLowerCase());

  if (index === -1) return text;

  return (
    <>
      {text.substring(0, index)}

      <span className="bg-yellow-200 text-black font-bold rounded px-0.5">
        {text.substring(index, index + search.length)}
      </span>

      {text.substring(index + search.length)}
    </>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition active:scale-95',
        active ? 'bg-charcoal-900 text-white shadow' : 'bg-white text-charcoal-600 ring-1 ring-charcoal-200',
      )}
    >
      {children}
    </button>
  );
}



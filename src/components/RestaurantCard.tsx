import {
  ChevronRight,
  Clock,
  Flame,
  MapPin,
  Utensils,
} from "lucide-react";

import type { Restaurant } from "./../types";
import { Badge, Stars, cn } from "./../ui";

interface RestaurantCardProps {
  r: Restaurant;
  search: string;
  distance: number;
  onClick: () => void;
}

export default function RestaurantCard({
  r,
  search,
  distance,
  onClick,
}: RestaurantCardProps) {
  const low = r.tablesLeft <= 3;

  const matchedDish = r.menu.find((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <button
      onClick={onClick}
      className="flex w-full items-stretch gap-3 rounded-2xl bg-white p-3 text-left shadow-soft ring-1 ring-charcoal-100 transition active:scale-[0.99] hover:shadow-card lg:p-4"
    >
      <div
        className={cn(
          "relative grid w-20 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white lg:w-24",
          r.accent
        )}
      >
        <Utensils className="h-6 w-6 opacity-90" />

        <span className="absolute left-1 top-1 rounded-md bg-black/25 px-1.5 py-0.5 text-[9px] font-bold backdrop-blur">
          {r.tag.split(" ")[0].toUpperCase()}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-bold text-charcoal-900">
            {r.name}
          </h3>

          <ChevronRight className="h-4 w-4 shrink-0 text-charcoal-300" />
        </div>

        <p className="truncate text-xs text-charcoal-400">
          {r.cuisine}
        </p>

        {search && matchedDish && (
          <p className="mt-1 text-xs font-semibold text-emerald2-600">
            ⭐ Matched Dish: {matchedDish.name}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2.5 text-[11px] text-charcoal-500">
          <Stars rating={r.rating} />

          <span className="flex items-center gap-0.5">
            <MapPin className="h-3 w-3" />
            {distance.toFixed(2)} km
          </span>

          <span className="flex items-center gap-0.5">
            <Clock className="h-3 w-3" />
            {r.prepMinutes}m
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <Badge tone={low ? "orange" : "green"}>
            {r.tablesLeft} tables left
          </Badge>

          <Badge tone="neutral">
            <Flame className="mr-0.5 h-2.5 w-2.5" />
            Food in {r.prepMinutes} mins
          </Badge>
        </div>
      </div>
    </button>
  );
}
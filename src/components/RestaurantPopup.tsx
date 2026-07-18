import { Popup } from "react-leaflet";
import type { Restaurant } from "../types";

export default function RestaurantPopup({
  restaurant,
  distance,
}: {
  restaurant: Restaurant;
  distance: number;
}) {
  return (
    <Popup>
      <div className="w-56">
        <h3 className="text-lg font-bold">
          🍽 {restaurant.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {restaurant.cuisine}
        </p>

        <div className="mt-3 space-y-1 text-sm">
          <div>⭐ {restaurant.rating}</div>
          <div>🪑 {restaurant.tablesLeft} Tables Left</div>
          <div>⏱ {restaurant.prepMinutes} mins</div>
          <div>📍 {distance.toFixed(2)} km away</div>
        </div>

        <button
          className="
            mt-4
            w-full
            rounded-xl
            bg-emerald-500
            py-2
            font-semibold
            text-white
            transition
            hover:bg-emerald-600
          "
        >
          View Restaurant →
        </button>
      </div>
    </Popup>
  );
}
import { useMemo } from "react";
import type { Restaurant } from "../types";
import { calculateDistance } from "../utils/distance";

interface UserLocation {
  lat: number;
  lng: number;
}

export function useNearbyRestaurants(
  restaurants: Restaurant[],
  location: UserLocation | null
) {
  return useMemo(() => {
    return restaurants.map((restaurant) => {
      const distance = location
        ? calculateDistance(
            location.lat,
            location.lng,
            restaurant.location.lat,
            restaurant.location.lng
          )
        : restaurant.distanceKm;

      return {
        ...restaurant,
        liveDistance: distance,
      };
    });
  }, [restaurants, location]);
}
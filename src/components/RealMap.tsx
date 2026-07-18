import { useUserLocation } from "../hooks/useUserLocation";
import { CircleMarker } from "react-leaflet";
import RestaurantPopup from "./RestaurantPopup";
import { restaurantIcon } from "./RestaurantMarker";
import type { Restaurant } from "../types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { calculateDistance } from "../utils/distance";
import { useMap } from "react-leaflet";
import { useEffect } from "react";


function FlyToUser({
  location,
}: {
  location: { lat: number; lng: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 15, {
        duration: 1.5,
      });
    }
  }, [location, map]);

  return null;
}
export default function RealMap({
  restaurants,
}: {
  restaurants: Restaurant[];
})  {
  const { location, loading, error } = useUserLocation();
  return (
    <MapContainer
  center={
    location
      ? [location.lat, location.lng]
      : [28.6139, 77.2090]
  }
      zoom={15}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToUser location={location} />



{location && (
  <CircleMarker
    center={[location.lat, location.lng]}
    radius={10}
    pathOptions={{
      color: "#2563eb",
      fillColor: "#3b82f6",
      fillOpacity: 1,
    }}
  >
    <Popup>
      📍 <b>You are here</b>
    </Popup>
  </CircleMarker>
)}
     {restaurants.map((r) => {
  const distance = location
    ? calculateDistance(
        location.lat,
        location.lng,
        r.location.lat,
        r.location.lng
      )
    : 0;

  return ( 
        
        <Marker
          key={r.name}
         position={[r.location.lat, r.location.lng]}
         icon={restaurantIcon}
        >
         <RestaurantPopup 
         restaurant={r}
         distance={distance} 
         /> 
        </Marker>  );
})}
    
    </MapContainer>
  );
}
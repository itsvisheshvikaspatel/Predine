import L from "leaflet";

export const restaurantIcon = new L.DivIcon({
  className: "",
  html: `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:48px;
      height:48px;
      background:#10b981;
      border:4px solid white;
      border-radius:50%;
      box-shadow:0 8px 24px rgba(0,0,0,0.25);
      font-size:22px;
      transform:translateY(-8px);
      transition:all .2s ease;
    ">
      🍽️
    </div>
  `,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});
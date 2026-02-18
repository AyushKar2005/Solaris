"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

/* ✅ Fix marker icon paths */
const DefaultIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function LeafletMapClient() {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={4}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[28.6139, 77.209]}>
        <Popup>New Delhi Installation</Popup>
      </Marker>

      <Marker position={[19.076, 72.8777]}>
        <Popup>Mumbai Installation</Popup>
      </Marker>

      <Marker position={[12.9716, 77.5946]}>
        <Popup>Bangalore Installation</Popup>
      </Marker>
    </MapContainer>
  );
}

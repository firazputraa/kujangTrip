import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap = ({ lat, lng, placeName }) => {
  console.log("📍 Koordinat Leaflet:", lat, lng);

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  if (isNaN(latitude) || isNaN(longitude)) {
    return (
      <div className="w-full h-100 flex items-center justify-center bg-gray-200 rounded-xl text-gray-500 font-semibold">
        Menyiapkan koordinat peta...
      </div>
    );
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      scrollWheelZoom={false}
      style={{
        height: "400px",
        width: "100%",
        zIndex: 0,
        borderRadius: "0.75rem",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          <b className="text-base">{placeName}</b>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;

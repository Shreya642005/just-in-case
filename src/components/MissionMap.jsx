"use client"

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue in Leaflet (React version doesn't load them automatically)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function MissionMap() {
  const [missions, setMissions] = useState([]);

  // Fetch all missions from backend
  useEffect(() => {
    fetch("/api/missions") // Adjust URL if needed
      .then((res) => res.json())
      .then((data) => setMissions(data))
      .catch((err) => console.error("Error fetching missions:", err));
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={[20, 78]} zoom={5} style={{ height: "100%", width: "100%" }}>
        {/* Base map tiles */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Add a marker for each mission */}
        {missions.map((m) =>
          m.latitude && m.longitude ? (
            <Marker key={m._id} position={[m.latitude, m.longitude]}>
              <Popup>
                <b>{m.missionTitle}</b> <br />
                {m.shortDescription} <br />
                📍 {m.place || "Unknown location"}
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ensure Leaflet default marker icons load correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

function FitBounds({ missions }) {
  const map = useMap();
  useEffect(() => {
    if (missions && missions.length) {
      const bounds = L.latLngBounds(
        missions
          .filter((m) => m.latitude != null && m.longitude != null)
          .map((m) => [Number(m.latitude), Number(m.longitude)])
      );
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [missions, map]);
  return null;
}

export default function MissionMap({ missions = [], onMissionSelect }) {
  const cleanedMissions = (missions || []).map((m) => ({
    ...m,
    latitude: Number(m.latitude),
    longitude: Number(m.longitude),
  }));

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.3)] border border-red-700">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
        />

        <FitBounds missions={cleanedMissions} />

        {cleanedMissions.map((mission) => (
          <Marker key={mission._id} position={[mission.latitude, mission.longitude]}>
            <Popup>
              <div className="text-sm text-white bg-[#1e1e1e] p-3 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-red-400">{mission.missionTitle}</h3>
                <p className="mb-2">{mission.fullDescription}</p>
                <p><strong>Date:</strong> {mission.date}</p>
                <p><strong>Time:</strong> {mission.time || "N/A"}</p>
                <p><strong>Place:</strong> {mission.place}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

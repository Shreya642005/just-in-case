import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "@/components/Navbar";

// ✅ Fix Leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// 📌 Component to auto-fit map bounds based on markers
function FitBounds({ missions }) {
  const map = useMap();
  useEffect(() => {
    if (missions.length) {
      const bounds = L.latLngBounds(missions.map(m => [m.latitude, m.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [missions, map]);
  return null;
}

export default function MapViewPage() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/missions") // 🔹 Change if backend is on a different URL
      .then((res) => res.json())
      .then((data) => {
        const cleaned = data.map(m => ({
          ...m,
          latitude: Number(m.latitude),
          longitude: Number(m.longitude)
        }));
        setMissions(cleaned);
      })
      .catch((err) => console.error("Error fetching missions:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#151414] text-white relative">
      {/* Background visuals */}
      <img
        src="/images/BackgroundLogo.png"
        alt="Background Logo"
        className="fixed left-1/2 top-1/2 w-[500px] opacity-70 -translate-x-1/2 -translate-y-1/2 z-0"
      />
      <img
        src="/images/web2.png"
        className="fixed top-0 left-0 w-[250px] opacity-15 z-0"
        alt="web-top-left"
      />
      <img
        src="/images/web1.png"
        className="fixed top-0 right-0 w-[180px] opacity-10 z-0 pointer-events-none"
        alt="web-top-right"
      />

      <header className="relative z-10 text-center pt-20 pb-8">
        <h1 className="text-4xl font-bold mb-4 text-red-400">Mission Map</h1>
        <p className="text-gray-300 mt-2">Track all Web-Crawler missions in real-time</p>
      </header>

      <main className="relative z-10 flex justify-center items-center pt-8 pb-20">
        <div className="w-full md:w-3/4 h-[500px] rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.3)] border border-red-700">
          <MapContainer
            center={[20, 0]} // Initial placeholder center
            zoom={2}
            scrollWheelZoom
            className="h-full w-full z-0"
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            />

            {/* Auto fit bounds when markers load */}
            <FitBounds missions={missions} />

            {/* Render mission markers */}
            {missions.map((mission) => (
              <Marker
                key={mission._id}
                position={[mission.latitude, mission.longitude]}
              >
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
      </main>
    </div>
  );
}

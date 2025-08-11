import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "@/components/Navbar";

// Fix Leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const missions = [
  {
    id: 1,
    name: "Bank Robbery",
    lat: 40.7128,
    lng: -74.006,
    date: "2025-06-03",
    time: "14:30",
    place: "Wall Street",
    venue: "Midtown Federal Bank",
    description: "A high-profile robbery intercepted by the unit. Hostages were evacuated safely.",
  },
  {
    id: 2,
    name: "Train Hijack",
    lat: 34.0522,
    lng: -118.2437,
    date: "2025-06-10",
    time: "09:00",
    place: "Union Station",
    venue: "LA Central Terminal",
    description: "Suspects attempted to hijack a cargo train. Bomb squad neutralized the explosives.",
  },
  {
    id: 3,
    name: "Cyber Attack",
    lat: 37.7749,
    lng: -122.4194,
    date: "2025-06-15",
    time: "22:45",
    place: "Silicon Valley",
    venue: "TechCorp Data Center",
    description: "A major cyber breach was detected and mitigated. No data was compromised.",
  },
];

export default function MapViewPage() {
  return (
    <div className="min-h-screen bg-[#151414] text-white relative">
      {/* Spider-Man Background Elements */}
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
            center={[39.5, -98.35]}
            zoom={4}
            scrollWheelZoom
            className="h-full w-full z-0"
          >
            <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            />

            {missions.map((mission) => (
              <Marker key={mission.id} position={[mission.lat, mission.lng]}>
                <Popup>
                  <div className="text-sm text-white bg-[#1e1e1e] p-3 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-red-400">{mission.name}</h3>
                    <p className="mb-2">{mission.description}</p>
                    <p><strong>Date:</strong> {mission.date}</p>
                    <p><strong>Time:</strong> {mission.time}</p>
                    <p><strong>Place:</strong> {mission.place}</p>
                    <p><strong>Venue:</strong> {mission.venue}</p>
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

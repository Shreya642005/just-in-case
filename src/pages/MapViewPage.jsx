import React, { useEffect, useState } from "react";
import MissionMap from "@/components/MissionMap";

export default function MapViewPage() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/missions")
      .then((res) => res.json())
      .then((data) => {
        const cleaned = data.map((m) => ({
          ...m,
          latitude: Number(m.latitude),
          longitude: Number(m.longitude),
        }));
        setMissions(cleaned);
      })
      .catch((err) => console.error("Error fetching missions:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#151414] text-white relative">
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
        <div className="w-full md:w-3/4">
          <MissionMap missions={missions} />
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import MissionCard from "@/components/MissionCard";
import MissionFilters from "@/components/MissionFilters";
import MissionMap from "@/components/MissionMap";
import MissionNotification from "@/components/MissionNotification";
import { Button } from "@/components/ui/Button";
import { Plus, Zap, Trash2 } from "lucide-react";

export default function AllMissionsPage() {
  const [missions, setMissions] = useState([]);
  const [filters, setFilters] = useState({
    urgency: "all",
    status: "completed",
    area: "all",
    sortBy: "date",
    sortOrder: "desc",
  });
  const [viewMode, setViewMode] = useState("cards");
  const [selectedMissionId, setSelectedMissionId] = useState(null);
  const [newMissionNotification, setNewMissionNotification] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Fetch missions from MongoDB Atlas via backend API
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/missions");
        if (!res.ok) {
          throw new Error(`Failed to fetch missions: ${res.statusText}`);
        }
        const data = await res.json();
        setMissions(
          data.map((m) => ({
            ...m,
            // Normalize description so cards show shortDescription
            description: m.shortDescription || m.description || m.fullDescription || "",
          }))
        );
      } catch (err) {
        console.error("Error fetching missions:", err);
        setError(err.message);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchMissions();
  }, []);

  const filteredMissions = useMemo(() => {
    if (!missions.length) return [];

    const filtered = missions
      // only completed missions should be shown
      .filter((mission) => (mission.status || "completed").toLowerCase() === "completed")
      // apply UI filters on top
      .filter((mission) => {
        if (filters.urgency !== "all" && mission.urgency !== filters.urgency) return false;
        if (filters.status !== "all" && mission.status !== filters.status) return false;
        if (filters.area !== "all" && mission.area !== filters.area) return false;
        return true;
      });

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case "date":
          comparison = new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime();
          break;
        case "urgency":
          const urgencyOrder = { low: 1, medium: 2, high: 3, critical: 4 };
          comparison = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
          break;
        case "area":
          comparison = a.area?.localeCompare?.(b.area || "") || 0;
          break;
        default:
          comparison = 0;
      }
      return filters.sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [missions, filters]);

  const activeMissionsCount = missions.filter((m) => (m.status || "completed").toLowerCase() === "active").length;

  const handleMissionSelect = (mission) => {
    setSelectedMissionId(mission._id);
    if (viewMode === "map") {
      setViewMode("cards");
    }
    setTimeout(() => {
      const element = document.getElementById(`mission-${mission._id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  // Delete single mission from MongoDB
  const deleteMission = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/missions/${id}`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to delete mission");
      }
      setMissions((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Clear all missions from MongoDB
  const clearAllMissions = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/missions`, { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to clear missions");
      }
      setMissions([]);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#151414] flex items-center justify-center">
        <img
          src="/images/BackgroundLogo.png"
          alt="Background Logo"
          className="fixed left-1/2 top-1/2 w-[400px] opacity-30 -translate-x-1/2 -translate-y-1/2 z-0"
        />
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading mission data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  }

  return (
    <div className="all-missions-page min-h-screen bg-[#151414] relative">
      {/* Background */}
      <img
        src="/images/BackgroundLogo.png"
        alt="Background Logo"
        className="fixed left-1/2 top-1/2 w-[500px] opacity-70 -translate-x-1/2 -translate-y-1/2 z-0"
      />
      <img
        src="/images/web2.png"
        className="fixed top-0 left-0 w-[250px] opacity-20 z-0"
        alt="web-top-left"
      />
      <img
        src="/images/web1.png"
        className="fixed top-0 right-0 w-[180px] opacity-15 z-0 pointer-events-none"
        alt="web-top-right"
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white">All Missions</h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your friendly neighborhood mission control center. Track, monitor, and manage all Spider-Man operations
            across New York City.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <div className="bg-red-600/20 border border-red-500/30 rounded-lg px-4 py-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">🕸️ {activeMissionsCount} active missions...</span>
            </div>
            <Button onClick={clearAllMissions} className="bg-gray-700 hover:bg-gray-800 text-white">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Missions
            </Button>
          </div>
        </div>

        <MissionFilters
          filters={filters}
          onFiltersChange={setFilters}
          totalMissions={filteredMissions.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {viewMode === "cards" ? (
          <div className="missions-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMissions.map((mission, index) => (
              <div
                key={mission._id}
                id={`mission-${mission._id}`}
                className="mission-card-wrapper"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MissionCard
                  mission={mission}
                  isHighlighted={mission._id === selectedMissionId}
                  onClick={() => setSelectedMissionId(mission._id)}
                />
                <Button
                  onClick={() => {
                    if (window.confirm("Delete this mission? This cannot be undone.")) {
                      deleteMission(mission._id);
                    }
                  }}
                  className="mt-2 w-full bg-red-700 hover:bg-red-800 text-white"
                >
                  Delete Mission
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <MissionMap
            missions={filteredMissions}
            selectedMissionId={selectedMissionId}
            onMissionSelect={handleMissionSelect}
          />
        )}

        {filteredMissions.length === 0 && (
          <div className="empty-state text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No missions found</h3>
            <p className="text-gray-400">Try adjusting your filters or add a new mission.</p>
          </div>
        )}
      </div>

      <MissionNotification mission={newMissionNotification} onClose={() => setNewMissionNotification(null)} />
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import MissionCard from "@/components/MissionCard";
import MissionMap from "@/components/MissionMap";
import MissionNotification from "@/components/MissionNotification";
import { Button } from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Zap, Trash2 } from "lucide-react";

export default function AllMissionsPage() {
  const [missions, setMissions] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // Only keep newest/oldest
  const [viewMode, setViewMode] = useState("cards");
  const [selectedMissionId, setSelectedMissionId] = useState(null);
  const [newMissionNotification, setNewMissionNotification] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [confirmState, setConfirmState] = useState({ open: false, action: null, payload: null });

  // Fetch missions
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
            description:
              m.shortDescription || m.description || m.fullDescription || "",
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

  // Filter only completed & sort
  const filteredMissions = useMemo(() => {
    if (!missions.length) return [];

    const filtered = missions.filter(
      (mission) => (mission.status || "completed").toLowerCase() === "completed"
    );

    filtered.sort((a, b) => {
      let comparison =
        new Date(a.date + " " + a.time).getTime() -
        new Date(b.date + " " + b.time).getTime();
      return sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  }, [missions, sortOrder]);

  // ✅ Corrected to count completed missions shown on page
  const completedMissionsCount = filteredMissions.length;

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

  const deleteMission = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/missions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete mission");
      }
      setMissions((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const clearAllMissions = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/missions`, {
        method: "DELETE",
      });
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
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              All Missions
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your friendly neighborhood mission control center. Track, monitor,
            and manage all Spider-Man operations across New York City.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
            <div className="bg-green-600/20 border border-green-500/30 rounded-lg px-4 py-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">
                 {completedMissionsCount} completed missions
              </span>
            </div>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-800 text-white px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 z-50 relative"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>

            <Button
              onClick={() =>
                setConfirmState({
                  open: true,
                  action: "clearAll",
                  payload: null,
                })
              }
              className="bg-gray-700 hover:bg-gray-800 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Missions
            </Button>
          </div>
        </div>

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
                  onClick={() =>
                    setConfirmState({
                      open: true,
                      action: "deleteOne",
                      payload: mission._id,
                    })
                  }
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
              <svg
                className="w-12 h-12 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No missions found
            </h3>
            <p className="text-gray-400">
              Try adding a new mission to see it here.
            </p>
          </div>
        )}
      </div>

      <MissionNotification
        mission={newMissionNotification}
        onClose={() => setNewMissionNotification(null)}
      />

      <ConfirmDialog
        open={confirmState.open}
        title={
          confirmState.action === "clearAll"
            ? "Clear all missions?"
            : "Delete this mission?"
        }
        description="This action cannot be undone."
        confirmText={confirmState.action === "clearAll" ? "Clear All" : "Delete"}
        cancelText="Cancel"
        onCancel={() => setConfirmState({ open: false, action: null, payload: null })}
        onConfirm={async () => {
          const { action, payload } = confirmState;
          setConfirmState({ open: false, action: null, payload: null });
          if (action === "clearAll") {
            await clearAllMissions();
          } else if (action === "deleteOne" && payload) {
            await deleteMission(payload);
          }
        }}
      />
    </div>
  );
}

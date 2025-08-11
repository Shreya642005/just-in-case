export const mockMissions = [
  {
    id: "1",
    title: "Bank Robbery in Progress",
    description: "Multiple armed suspects at First National Bank. Hostages reported inside.",
    date: "2024-01-15",
    time: "14:30",
    location: "Manhattan Financial District",
    coordinates: [40.7074, -74.0113],
    urgency: "critical",
    status: "active",
    area: "Manhattan",
  },
  {
    id: "2",
    title: "Cat Stuck in Tree",
    description: "Elderly woman's cat has been stuck in a tall oak tree for 6 hours.",
    date: "2024-01-15",
    time: "12:15",
    location: "Central Park West",
    coordinates: [40.7829, -73.9654],
    urgency: "low",
    status: "completed",
    area: "Manhattan",
  },
  // Add other missions as needed
];

const STORAGE_KEY = "spiderman-missions";

export const getMissions = () => {
  if (typeof window === "undefined") return mockMissions;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockMissions));
    return mockMissions;
  }
  return JSON.parse(stored);
};

export const saveMissions = (missions) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
};

export const addMission = (mission) => {
  const missions = getMissions();
  missions.unshift(mission);
  saveMissions(missions);
  return missions;
};

export const updateMission = (id, updates) => {
  const missions = getMissions();
  const index = missions.findIndex((m) => m.id === id);
  if (index !== -1) {
    missions[index] = { ...missions[index], ...updates };
    saveMissions(missions);
  }
  return missions;
};
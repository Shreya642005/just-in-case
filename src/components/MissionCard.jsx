// src/components/MissionCard.jsx
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, AlertTriangle, CheckCircle, Loader } from "lucide-react";

const statusStyles = {
  active: "bg-red-500/20 text-red-400 border-red-500/30",
  "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
};

function StatusIcon({ status }) {
  if (status === "active") return <AlertTriangle className="w-4 h-4" />;
  if (status === "in-progress") return <Loader className="w-4 h-4 animate-spin" />;
  if (status === "completed") return <CheckCircle className="w-4 h-4" />;
  return null;
}

export default function MissionCard({ mission, isHighlighted = false, onClick }) {
  const title = mission.title || mission.missionTitle || "Untitled Mission";
  const description =
    mission.description ||
    mission.shortDescription ||
    mission.fullDescription ||
    "No description available.";
  const date = mission.date || "Unknown date";
  const time = mission.time || "00:00";
  const location = mission.location || mission.place || "Unknown location";
  const status = (mission.status || "completed").toLowerCase();

  return (
    <Card
      className={`
        mission-card relative cursor-pointer transition-all duration-300 transform
        bg-gray-900/50 border-gray-700/50 backdrop-blur-sm
        hover:scale-105 hover:shadow-xl hover:shadow-red-500/20
        ${isHighlighted ? "ring-2 ring-red-500 shadow-lg shadow-red-500/30" : ""}
      `}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <div className="flex gap-2">
            <Badge className={statusStyles[status]}>
              <StatusIcon status={status} />
              <span className="ml-1 capitalize">{status.replace("-", " ")}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {date} at {time}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

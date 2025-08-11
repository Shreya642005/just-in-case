"use client"

import { Button } from "@/components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Badge } from "@/components/ui/badge"
import { Filter, RotateCcw, Map, Grid3X3 } from "lucide-react"

export default function MissionFilters({ filters, onFiltersChange, totalMissions, viewMode, onViewModeChange }) {
  const resetFilters = () => {
    onFiltersChange({
      urgency: "all",
      status: "all",
      area: "all",
      sortBy: "date",
      sortOrder: "desc",
    })
  }

  const hasActiveFilters = filters.urgency !== "all" || filters.status !== "all" || filters.area !== "all"

  return (
    <div className="mission-filters bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-red-400" />
          <span className="text-white font-medium">Mission Control</span>
          <Badge variant="outline" className="text-red-400 border-red-400/30">
            🕸️ {totalMissions} missions
          </Badge>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("cards")}
              className={viewMode === "cards" ? "bg-red-600 hover:bg-red-700" : "text-gray-400 hover:text-white"}
            >
              <Grid3X3 className="w-4 h-4 mr-1" />
              Cards
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("map")}
              className={viewMode === "map" ? "bg-red-600 hover:bg-red-700" : "text-gray-400 hover:text-white"}
            >
              <Map className="w-4 h-4 mr-1" />
              Map
            </Button>
          </div>

          {/* Urgency Filter */}
          <Select value={filters.urgency} onValueChange={(value) => onFiltersChange({ ...filters, urgency: value })}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgency</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={filters.status} onValueChange={(value) => onFiltersChange({ ...filters, status: value })}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Area Filter */}
          <Select value={filters.area} onValueChange={(value) => onFiltersChange({ ...filters, area: value })}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="Manhattan">Manhattan</SelectItem>
              <SelectItem value="Queens">Queens</SelectItem>
              <SelectItem value="Brooklyn">Brooklyn</SelectItem>
              <SelectItem value="Bronx">Bronx</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Filter */}
          <Select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onValueChange={(value) => {
              const [sortBy, sortOrder] = value.split("-")
              onFiltersChange({ ...filters, sortBy, sortOrder })
            }}
          >
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="urgency-desc">Most Urgent</SelectItem>
              <SelectItem value="urgency-asc">Least Urgent</SelectItem>
              <SelectItem value="area-asc">Area A-Z</SelectItem>
              <SelectItem value="area-desc">Area Z-A</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-gray-400 border-gray-600 hover:text-white hover:border-red-400 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

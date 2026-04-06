"use client";

import { useState, useCallback, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { AlumniProfile } from "@/lib/types";
import { AlumniCard } from "./AlumniCard";
import { FilterSidebar } from "./FilterSidebar";
import { TimelineSlider } from "./TimelineSlider";
import { Users, Globe, GraduationCap } from "lucide-react";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface AlumniMapProps {
  alumni: AlumniProfile[];
}

export interface Filters {
  hlSubjects: string[];
  universitySearch: string;
  careerSearch: string;
  yearRange: [number, number];
}

const defaultFilters: Filters = {
  hlSubjects: [],
  universitySearch: "",
  careerSearch: "",
  yearRange: [2010, 2026],
};

export function AlumniMap({ alumni }: AlumniMapProps) {
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredAlumni = useMemo(() => {
    return alumni.filter((a) => {
      if (
        filters.hlSubjects.length > 0 &&
        !filters.hlSubjects.some((s) => a.hl_subjects.includes(s))
      ) {
        return false;
      }
      if (
        filters.universitySearch &&
        !a.university.toLowerCase().includes(filters.universitySearch.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.careerSearch &&
        !a.current_profession.toLowerCase().includes(filters.careerSearch.toLowerCase())
      ) {
        return false;
      }
      if (a.graduation_year !== null) {
        if (a.graduation_year < filters.yearRange[0] || a.graduation_year > filters.yearRange[1]) {
          return false;
        }
      }
      return true;
    });
  }, [alumni, filters]);

  const stats = useMemo(() => {
    const countries = new Set(filteredAlumni.map((a) => a.location_country));
    const universities = new Set(filteredAlumni.map((a) => a.university));
    return {
      total: filteredAlumni.length,
      countries: countries.size,
      universities: universities.size,
    };
  }, [filteredAlumni]);

  const handleMarkerClick = useCallback((alumnus: AlumniProfile) => {
    setSelectedAlumni(alumnus);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a1628]">
      {/* Map */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 130,
          center: [10, 20],
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "rgba(255,255,255,0.08)", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {filteredAlumni.map(
            (alumnus) =>
              alumnus.latitude !== null &&
              alumnus.longitude !== null && (
                <Marker
                  key={alumnus.id}
                  coordinates={[alumnus.longitude, alumnus.latitude]}
                >
                  <circle
                    r={hoveredId === alumnus.id ? 6 : 4}
                    fill="#d4a843"
                    stroke="#d4a843"
                    strokeWidth={0.5}
                    opacity={0.9}
                    style={{
                      cursor: "pointer",
                      filter: "drop-shadow(0 0 6px rgba(212, 168, 67, 0.6))",
                      transition: "r 200ms ease",
                    }}
                    onClick={() => handleMarkerClick(alumnus)}
                    onMouseEnter={() => setHoveredId(alumnus.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  />
                </Marker>
              )
          )}
        </ZoomableGroup>
      </ComposableMap>

      {/* Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        onClear={() => setFilters(defaultFilters)}
      />

      {/* Stats Overlay */}
      <div className="absolute bottom-8 left-8 z-10 hidden md:flex gap-4">
        <StatItem icon={<Users className="w-4 h-4" />} value={stats.total} label="Alumni" />
        <StatItem icon={<Globe className="w-4 h-4" />} value={stats.countries} label="Countries" />
        <StatItem
          icon={<GraduationCap className="w-4 h-4" />}
          value={stats.universities}
          label="Universities"
        />
      </div>

      {/* Timeline Slider */}
      <TimelineSlider
        range={filters.yearRange}
        onChange={(range) => setFilters((f) => ({ ...f, yearRange: range }))}
      />

      {/* Empty State */}
      {filteredAlumni.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-[#0a1628]/90 backdrop-blur-md rounded-xl px-8 py-6 border border-white/[0.08] text-center pointer-events-auto">
            <p className="text-white/70 text-sm mb-3">
              No alumni match these filters. Try broadening your search.
            </p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="text-sm font-medium px-4 py-2 rounded-lg bg-[#d4a843] text-[#0a1628] hover:bg-[#d4a843]/90"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Alumni Card Slide-in */}
      {selectedAlumni && (
        <AlumniCard alumni={selectedAlumni} onClose={() => setSelectedAlumni(null)} />
      )}
    </div>
  );
}

function StatItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 bg-[#0a1628]/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/[0.08]">
      <div className="flex items-center gap-1.5 text-[#d4a843]">{icon}</div>
      <span className="font-mono text-2xl font-bold leading-none text-white">
        {value}
      </span>
      <span className="text-xs text-white/50 uppercase tracking-wider">{label}</span>
    </div>
  );
}

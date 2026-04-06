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

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface AlumniMapProps {
  alumni: AlumniProfile[];
}

export interface Filters {
  hlSubjects: string[];
  universitySearch: string;
  careerSearch: string;
  countrySearch: string;
  yearRange: [number, number];
  gapYearOnly: boolean;
  openToContact: boolean;
  openToMentoring: boolean;
}

const defaultFilters: Filters = {
  hlSubjects: [],
  universitySearch: "",
  careerSearch: "",
  countrySearch: "",
  yearRange: [2010, 2026],
  gapYearOnly: false,
  openToContact: false,
  openToMentoring: false,
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
      )
        return false;
      if (
        filters.universitySearch &&
        !a.university.toLowerCase().includes(filters.universitySearch.toLowerCase())
      )
        return false;
      if (
        filters.careerSearch &&
        !a.current_profession.toLowerCase().includes(filters.careerSearch.toLowerCase())
      )
        return false;
      if (
        filters.countrySearch &&
        !a.location_country.toLowerCase().includes(filters.countrySearch.toLowerCase())
      )
        return false;
      if (a.graduation_year !== null) {
        if (a.graduation_year < filters.yearRange[0] || a.graduation_year > filters.yearRange[1])
          return false;
      }
      if (filters.gapYearOnly && !a.took_gap_year) return false;
      if (filters.openToContact && !a.open_to_contact) return false;
      if (filters.openToMentoring && !a.open_to_mentoring) return false;
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
    <div className="relative w-full h-screen overflow-hidden bg-[#070e1a]">
      {/* Warm gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,168,67,0.03) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(74,144,217,0.02) 0%, transparent 60%)",
        }}
      />

      {/* Map */}
      <div className="absolute inset-0">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [10, 20] }}
          style={{ width: "100%", height: "100%" }}
        >
          <ZoomableGroup>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgba(255,255,255,0.03)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "rgba(255,255,255,0.06)", outline: "none" },
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
                  <Marker key={alumnus.id} coordinates={[alumnus.longitude, alumnus.latitude]}>
                    {/* Glow ring */}
                    <circle
                      r={hoveredId === alumnus.id ? 14 : 10}
                      fill="rgba(212, 168, 67, 0.08)"
                      style={{ transition: "r 300ms ease" }}
                    />
                    {/* Pin */}
                    <circle
                      r={hoveredId === alumnus.id ? 5 : 3.5}
                      fill="#d4a843"
                      style={{
                        cursor: "pointer",
                        filter: "drop-shadow(0 0 4px rgba(212, 168, 67, 0.5))",
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
      </div>

      {/* Filter button (floating) */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        onClear={() => setFilters(defaultFilters)}
        alumni={alumni}
      />

      {/* Stats - bottom left */}
      <div className="absolute bottom-10 left-6 z-10 hidden md:flex items-end gap-8">
        <div>
          <p className="font-mono text-4xl font-bold text-white tracking-tight">{stats.total}</p>
          <p className="text-[11px] text-white/35 uppercase tracking-[0.2em] mt-1">Alumni</p>
        </div>
        <div>
          <p className="font-mono text-4xl font-bold text-white tracking-tight">{stats.countries}</p>
          <p className="text-[11px] text-white/35 uppercase tracking-[0.2em] mt-1">Countries</p>
        </div>
        <div>
          <p className="font-mono text-4xl font-bold text-white tracking-tight">{stats.universities}</p>
          <p className="text-[11px] text-white/35 uppercase tracking-[0.2em] mt-1">Universities</p>
        </div>
      </div>

      {/* Mobile stats */}
      <div className="md:hidden absolute bottom-24 left-0 right-0 z-10 flex justify-center gap-6">
        <div className="text-center">
          <p className="font-mono text-2xl font-bold text-white">{stats.total}</p>
          <p className="text-[10px] text-white/35 uppercase tracking-widest">Alumni</p>
        </div>
        <div className="text-center">
          <p className="font-mono text-2xl font-bold text-white">{stats.countries}</p>
          <p className="text-[10px] text-white/35 uppercase tracking-widest">Countries</p>
        </div>
        <div className="text-center">
          <p className="font-mono text-2xl font-bold text-white">{stats.universities}</p>
          <p className="text-[10px] text-white/35 uppercase tracking-widest">Universities</p>
        </div>
      </div>

      {/* Timeline Slider */}
      <TimelineSlider
        range={filters.yearRange}
        onChange={(range) => setFilters((f) => ({ ...f, yearRange: range }))}
      />

      {/* Empty State */}
      {filteredAlumni.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-[#0f1d32]/95 backdrop-blur-md rounded-2xl px-10 py-8 border border-white/[0.06] text-center pointer-events-auto max-w-sm">
            <p className="text-white/60 text-sm mb-4 leading-relaxed">
              No alumni match these filters. Try broadening your search.
            </p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="text-sm font-medium px-5 py-2.5 rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors"
            >
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Alumni Card */}
      {selectedAlumni && (
        <AlumniCard alumni={selectedAlumni} onClose={() => setSelectedAlumni(null)} />
      )}
    </div>
  );
}

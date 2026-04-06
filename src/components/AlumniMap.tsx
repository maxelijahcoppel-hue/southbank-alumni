"use client";

import { useState, useCallback, useMemo } from "react";
import Map, { Marker, NavigationControl, type MapEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { AlumniProfile } from "@/lib/types";
import { AlumniCard } from "./AlumniCard";
import { FilterSidebar } from "./FilterSidebar";
import { TimelineSlider } from "./TimelineSlider";
import { MapPin, Users, Globe, GraduationCap } from "lucide-react";

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
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(
    null
  );
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [viewState, setViewState] = useState({
    longitude: 10,
    latitude: 20,
    zoom: 1.8,
  });

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
        !a.university
          .toLowerCase()
          .includes(filters.universitySearch.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.careerSearch &&
        !a.current_profession
          .toLowerCase()
          .includes(filters.careerSearch.toLowerCase())
      ) {
        return false;
      }
      if (a.graduation_year !== null) {
        if (
          a.graduation_year < filters.yearRange[0] ||
          a.graduation_year > filters.yearRange[1]
        ) {
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
    <div className="relative w-full h-screen overflow-hidden bg-bg-dark">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <NavigationControl position="top-right" />

        {filteredAlumni.map(
          (alumnus) =>
            alumnus.latitude !== null &&
            alumnus.longitude !== null && (
              <Marker
                key={alumnus.id}
                latitude={alumnus.latitude}
                longitude={alumnus.longitude}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  handleMarkerClick(alumnus);
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full bg-accent-gold cursor-pointer transition-transform duration-200 hover:scale-150"
                  style={{
                    boxShadow: "0 0 12px rgba(212, 168, 67, 0.5)",
                  }}
                />
              </Marker>
            )
        )}
      </Map>

      {/* Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        onClear={() => setFilters(defaultFilters)}
      />

      {/* Stats Overlay */}
      <div className="absolute bottom-8 left-8 z-10 hidden md:flex gap-6">
        <StatItem
          icon={<Users className="w-4 h-4" />}
          value={stats.total}
          label="Alumni"
        />
        <StatItem
          icon={<Globe className="w-4 h-4" />}
          value={stats.countries}
          label="Countries"
        />
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

      {/* Alumni Card Slide-in */}
      {selectedAlumni && (
        <AlumniCard
          alumni={selectedAlumni}
          onClose={() => setSelectedAlumni(null)}
        />
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
    <div className="flex flex-col items-center gap-1 bg-bg-dark/80 backdrop-blur-md rounded-xl px-4 py-3 border border-border-dark">
      <div className="flex items-center gap-1.5 text-accent-gold">{icon}</div>
      <span className="font-mono text-2xl font-bold leading-none text-text-primary-dark">
        {value}
      </span>
      <span className="text-xs text-text-muted-dark">{label}</span>
    </div>
  );
}

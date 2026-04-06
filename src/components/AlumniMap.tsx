"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { AlumniProfile } from "@/lib/types";
import { AlumniCard } from "./AlumniCard";
import { FilterSidebar } from "./FilterSidebar";

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

// London coordinates for initial view
const LONDON = { lat: 51.5074, lng: -0.1278 };

interface AlumniMapProps {
  alumni: AlumniProfile[];
}

export function AlumniMap({ alumni }: AlumniMapProps) {
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const globeRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeInstanceRef = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);

  const filteredAlumni = useMemo(() => {
    return alumni.filter((a) => {
      if (filters.hlSubjects.length > 0 && !filters.hlSubjects.some((s) => a.hl_subjects.includes(s))) return false;
      if (filters.universitySearch && !a.university.toLowerCase().includes(filters.universitySearch.toLowerCase())) return false;
      if (filters.careerSearch && !a.current_profession.toLowerCase().includes(filters.careerSearch.toLowerCase())) return false;
      if (filters.countrySearch && !a.location_country.toLowerCase().includes(filters.countrySearch.toLowerCase())) return false;
      if (a.graduation_year !== null) {
        if (a.graduation_year < filters.yearRange[0] || a.graduation_year > filters.yearRange[1]) return false;
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
    return { total: filteredAlumni.length, countries: countries.size, universities: universities.size };
  }, [filteredAlumni]);

  // Initialize globe
  useEffect(() => {
    if (!globeRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let globe: any = null;

    import("globe.gl").then((GlobeModule) => {
      const Globe = GlobeModule.default;
      if (!globeRef.current) return;

      globe = new Globe(globeRef.current)
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
        .atmosphereColor("rgba(212, 168, 67, 0.15)")
        .atmosphereAltitude(0.2)
        .pointOfView({ lat: LONDON.lat, lng: LONDON.lng, altitude: 2.2 }, 0)
        .width(globeRef.current.clientWidth)
        .height(globeRef.current.clientHeight)
        // Points (alumni pins)
        .pointsData([])
        .pointLat((d: unknown) => (d as AlumniProfile).latitude ?? 0)
        .pointLng((d: unknown) => (d as AlumniProfile).longitude ?? 0)
        .pointColor(() => "#d4a843")
        .pointAltitude(0.01)
        .pointRadius(0.4)
        .pointsMerge(false)
        .onPointClick((point: unknown) => {
          setSelectedAlumni(point as AlumniProfile);
        })
        // Arcs from London to each alumni
        .arcsData([])
        .arcStartLat(() => LONDON.lat)
        .arcStartLng(() => LONDON.lng)
        .arcEndLat((d: unknown) => (d as AlumniProfile).latitude ?? 0)
        .arcEndLng((d: unknown) => (d as AlumniProfile).longitude ?? 0)
        .arcColor(() => ["rgba(212, 168, 67, 0.3)", "rgba(212, 168, 67, 0.05)"])
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(2000)
        .arcStroke(0.3);

      // Customize the renderer
      const renderer = globe.renderer();
      renderer.setClearColor(0x070e1a, 1);

      // Customize controls
      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.3;
      controls.enableZoom = true;
      controls.minDistance = 150;
      controls.maxDistance = 500;

      globeInstanceRef.current = globe;
      setGlobeReady(true);
    });

    const handleResize = () => {
      if (globeInstanceRef.current && globeRef.current) {
        globeInstanceRef.current
          .width(globeRef.current.clientWidth)
          .height(globeRef.current.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (globe) {
        globe.controls().autoRotate = false;
        globe._destructor?.();
      }
    };
  }, []);

  // Update points and arcs when filtered alumni change
  useEffect(() => {
    if (!globeInstanceRef.current || !globeReady) return;

    const validAlumni = filteredAlumni.filter((a) => a.latitude !== null && a.longitude !== null);

    globeInstanceRef.current
      .pointsData(validAlumni)
      .arcsData(validAlumni);
  }, [filteredAlumni, globeReady]);

  const handleMarkerClick = useCallback((alumnus: AlumniProfile) => {
    setSelectedAlumni(alumnus);
    // Fly to the clicked alumni
    if (globeInstanceRef.current && alumnus.latitude && alumnus.longitude) {
      globeInstanceRef.current.pointOfView(
        { lat: alumnus.latitude, lng: alumnus.longitude, altitude: 1.5 },
        1000
      );
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#070e1a]">
      {/* Globe container */}
      <div ref={globeRef} className="absolute inset-0" />

      {/* Gradient overlay at top for nav readability */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to bottom, rgba(7,14,26,0.6), transparent)" }}
      />

      {/* Filter button */}
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
      <div className="md:hidden absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-6">
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

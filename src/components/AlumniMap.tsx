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
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
        .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
        .atmosphereColor("rgba(100, 160, 255, 0.15)")
        .atmosphereAltitude(0.18)
        .pointOfView({ lat: LONDON.lat, lng: LONDON.lng, altitude: 2.5 }, 0)
        .width(globeRef.current.clientWidth)
        .height(globeRef.current.clientHeight)
        // Points (alumni pins) — larger and with labels
        .pointsData([])
        .pointLat((d: unknown) => (d as AlumniProfile).latitude ?? 0)
        .pointLng((d: unknown) => (d as AlumniProfile).longitude ?? 0)
        .pointColor(() => "#d4a843")
        .pointAltitude(0.02)
        .pointRadius(0.6)
        .pointsMerge(false)
        .onPointClick((point: unknown) => {
          const p = point as AlumniProfile;
          setSelectedAlumni(p);
          if (globeInstanceRef.current && p.latitude && p.longitude) {
            globeInstanceRef.current.pointOfView(
              { lat: p.latitude, lng: p.longitude, altitude: 1.5 },
              1000
            );
          }
        })
        // HTML labels on hover
        .pointLabel((d: unknown) => {
          const p = d as AlumniProfile;
          return `
            <div style="
              background: rgba(15,29,50,0.95);
              backdrop-filter: blur(12px);
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 12px;
              padding: 12px 16px;
              color: white;
              font-family: system-ui, sans-serif;
              min-width: 180px;
              pointer-events: none;
            ">
              <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${p.full_name}</div>
              <div style="font-size: 12px; color: rgba(255,255,255,0.5); margin-bottom: 2px;">${p.university}</div>
              <div style="font-size: 12px; color: rgba(255,255,255,0.5); margin-bottom: 6px;">${p.current_profession}</div>
              <div style="font-size: 11px; color: #d4a843;">Click to view profile</div>
            </div>
          `;
        })
        // Arcs from London
        .arcsData([])
        .arcStartLat(() => LONDON.lat)
        .arcStartLng(() => LONDON.lng)
        .arcEndLat((d: unknown) => (d as AlumniProfile).latitude ?? 0)
        .arcEndLng((d: unknown) => (d as AlumniProfile).longitude ?? 0)
        .arcColor(() => ["rgba(212, 168, 67, 0.25)", "rgba(212, 168, 67, 0.02)"])
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(2500)
        .arcStroke(0.3);

      // Set the WebGL background to a warm deep blue that blends with the gradient overlay
      const renderer = globe.renderer();
      renderer.setClearColor(0x0f1e33, 1);

      // Controls
      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.25;
      controls.enableZoom = true;
      controls.minDistance = 120;
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

  // Update data when filters change
  useEffect(() => {
    if (!globeInstanceRef.current || !globeReady) return;
    const validAlumni = filteredAlumni.filter((a) => a.latitude !== null && a.longitude !== null);
    globeInstanceRef.current.pointsData(validAlumni).arcsData(validAlumni);
  }, [filteredAlumni, globeReady]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0f1e33]">
      {/* Globe */}
      <div ref={globeRef} className="absolute inset-0" />

      {/* Sunset gradient overlays around edges */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 50%, transparent 30%, rgba(15,30,51,0.4) 60%, rgba(15,30,51,0.9) 100%),
            linear-gradient(to bottom, transparent 40%, rgba(139,69,19,0.08) 70%, rgba(210,130,50,0.12) 85%, rgba(210,140,60,0.18) 100%),
            linear-gradient(to right, rgba(80,40,80,0.06) 0%, transparent 30%, transparent 70%, rgba(180,100,40,0.08) 100%),
            linear-gradient(to top, rgba(200,120,50,0.1) 0%, transparent 25%)
          `,
        }}
      />

      {/* Loading state before globe is ready */}
      {!globeReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="w-16 h-16 rounded-full border-2 border-[#d4a843]/20 border-t-[#d4a843] animate-spin mb-6" />
          <p className="text-white/30 text-sm">Loading globe...</p>
        </div>
      )}

      {/* Hero heading — top, minimal */}
      {globeReady && (
        <div className="absolute top-24 left-0 right-0 z-20 pointer-events-none flex justify-center px-4">
          <h1
            className="text-white text-2xl md:text-4xl font-bold tracking-tight text-center drop-shadow-lg"
            style={{ animation: "fade-in 0.8s ease forwards" }}
          >
            Our alumni, around the world
          </h1>
        </div>
      )}

      {/* Top gradient for nav readability */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-[1]"
        style={{ background: "linear-gradient(to bottom, rgba(15,27,46,0.6), transparent)" }}
      />

      {/* Filters */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        onClear={() => setFilters(defaultFilters)}
        alumni={alumni}
      />

      {/* Stats */}
      <div className="absolute bottom-10 left-8 z-10 hidden md:flex items-end gap-10">
        <div>
          <p className="font-mono text-5xl font-bold text-white tracking-tight">{stats.total}</p>
          <p className="text-xs text-white/40 uppercase tracking-[0.2em] mt-1.5">Alumni</p>
        </div>
        <div>
          <p className="font-mono text-5xl font-bold text-white tracking-tight">{stats.countries}</p>
          <p className="text-xs text-white/40 uppercase tracking-[0.2em] mt-1.5">Countries</p>
        </div>
        <div>
          <p className="font-mono text-5xl font-bold text-white tracking-tight">{stats.universities}</p>
          <p className="text-xs text-white/40 uppercase tracking-[0.2em] mt-1.5">Universities</p>
        </div>
      </div>

      {/* Mobile stats */}
      <div className="md:hidden absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-8">
        <div className="text-center">
          <p className="font-mono text-3xl font-bold text-white">{stats.total}</p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Alumni</p>
        </div>
        <div className="text-center">
          <p className="font-mono text-3xl font-bold text-white">{stats.countries}</p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Countries</p>
        </div>
        <div className="text-center">
          <p className="font-mono text-3xl font-bold text-white">{stats.universities}</p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Universities</p>
        </div>
      </div>

      {/* CTA + hint — bottom right */}
      {globeReady && !selectedAlumni && (
        <div className="absolute bottom-10 right-8 z-10 hidden md:flex flex-col items-end gap-3">
          <a
            href="/directory"
            className="text-sm font-medium px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 hover:bg-white/20 hover:text-white transition-all"
          >
            Browse the full directory →
          </a>
          <p className="text-white/25 text-xs tracking-wide">
            Drag to rotate · Scroll to zoom · Click a pin to explore
          </p>
        </div>
      )}

      {/* Empty state */}
      {filteredAlumni.length === 0 && globeReady && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-[#0f1d32]/95 backdrop-blur-md rounded-2xl px-10 py-8 border border-white/[0.06] text-center pointer-events-auto max-w-sm">
            <p className="text-white/60 text-sm mb-4">No alumni match these filters.</p>
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

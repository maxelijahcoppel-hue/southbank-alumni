"use client";

import { useState, useMemo } from "react";
import { AlumniProfile } from "@/lib/types";
import { AlumniGridCard } from "@/components/AlumniGridCard";
import { AlumniCard } from "@/components/AlumniCard";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { allHLSubjects } from "@/lib/sample-data";

interface DirectoryClientProps {
  alumni: AlumniProfile[];
}

export function DirectoryClient({ alumni }: DirectoryClientProps) {
  const [search, setSearch] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(
    null
  );

  const filteredAlumni = useMemo(() => {
    return alumni.filter((a) => {
      if (search) {
        const q = search.toLowerCase();
        const matchesSearch =
          a.full_name.toLowerCase().includes(q) ||
          a.university.toLowerCase().includes(q) ||
          a.location_city.toLowerCase().includes(q) ||
          a.current_profession.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }
      if (
        selectedSubjects.length > 0 &&
        !selectedSubjects.some((s) => a.hl_subjects.includes(s))
      ) {
        return false;
      }
      return true;
    });
  }, [alumni, search, selectedSubjects]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 pb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">
          Alumni Directory
        </h1>
        <p className="text-text-muted text-base">
          {filteredAlumni.length} alumni from the Southbank community
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, university, city, or profession..."
              className="w-full bg-white border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              showFilters || selectedSubjects.length > 0
                ? "border-accent-gold/50 bg-accent-gold/5 text-accent-gold"
                : "border-border bg-white text-text-primary hover:bg-black/5"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {selectedSubjects.length > 0 && (
              <span className="bg-accent-gold text-bg-dark text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {selectedSubjects.length}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-3 p-4 bg-white border border-border rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-text-primary">
                HL Subjects
              </p>
              {selectedSubjects.length > 0 && (
                <button
                  onClick={() => setSelectedSubjects([])}
                  className="text-xs text-accent-gold hover:text-accent-gold/80"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {allHLSubjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => toggleSubject(subject)}
                  className={`rounded-md text-sm px-2.5 py-1 border transition-colors ${
                    selectedSubjects.includes(subject)
                      ? "bg-accent-gold/12 border-accent-gold/20 text-accent-gold"
                      : "bg-white border-border text-text-muted hover:border-accent-gold/20 hover:text-text-primary"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
        {filteredAlumni.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-muted text-base">
              No alumni match your search.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedSubjects([]);
              }}
              className="mt-3 text-sm text-accent-gold hover:text-accent-gold/80"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlumni.map((alumnus) => (
              <AlumniGridCard
                key={alumnus.id}
                alumni={alumnus}
                onClick={() => setSelectedAlumni(alumnus)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail card overlay */}
      {selectedAlumni && (
        <AlumniCard
          alumni={selectedAlumni}
          onClose={() => setSelectedAlumni(null)}
        />
      )}
    </div>
  );
}

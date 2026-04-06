"use client";

import { useState } from "react";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { allHLSubjects } from "@/lib/sample-data";
import type { Filters } from "./AlumniMap";

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClear: () => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  onClear,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters =
    filters.hlSubjects.length > 0 ||
    filters.universitySearch !== "" ||
    filters.careerSearch !== "";

  const activeCount =
    filters.hlSubjects.length +
    (filters.universitySearch ? 1 : 0) +
    (filters.careerSearch ? 1 : 0);

  const toggleSubject = (subject: string) => {
    const next = filters.hlSubjects.includes(subject)
      ? filters.hlSubjects.filter((s) => s !== subject)
      : [...filters.hlSubjects, subject];
    onFiltersChange({ ...filters, hlSubjects: next });
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 md:left-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/[0.12] text-white/80 hover:bg-white/15 hover:text-white transition-all text-sm font-medium shadow-lg"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Filters</span>
        {activeCount > 0 && (
          <span className="ml-0.5 w-5 h-5 rounded-full bg-[#d4a843] text-[#0a1628] text-xs font-bold flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 z-40 w-[320px] h-screen bg-[#0f1d32]/98 backdrop-blur-xl border-r border-white/[0.06] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-base font-semibold text-white">Filters</h2>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={onClear}
                className="text-xs text-[#d4a843] hover:text-[#d4a843]/80"
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white/70"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          {/* HL Subjects */}
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
              HL Subjects
            </p>
            <div className="flex flex-wrap gap-2">
              {allHLSubjects.map((subject) => {
                const active = filters.hlSubjects.includes(subject);
                return (
                  <button
                    key={subject}
                    onClick={() => toggleSubject(subject)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      active
                        ? "bg-[#d4a843]/20 text-[#d4a843] border border-[#d4a843]/30"
                        : "bg-white/5 text-white/50 border border-white/[0.08] hover:text-white/70 hover:bg-white/8"
                    }`}
                  >
                    {subject}
                  </button>
                );
              })}
            </div>
          </div>

          {/* University Search */}
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
              University
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={filters.universitySearch}
                onChange={(e) =>
                  onFiltersChange({ ...filters, universitySearch: e.target.value })
                }
                placeholder="Search universities..."
                className="w-full bg-white/5 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4a843]/40 transition-colors"
              />
            </div>
          </div>

          {/* Career Search */}
          <div>
            <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
              Career Field
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={filters.careerSearch}
                onChange={(e) =>
                  onFiltersChange({ ...filters, careerSearch: e.target.value })
                }
                placeholder="Search careers..."
                className="w-full bg-white/5 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4a843]/40 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

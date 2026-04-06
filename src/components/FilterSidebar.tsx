"use client";

import { useState } from "react";
import { Filter, X, Search, ChevronDown, ChevronUp } from "lucide-react";
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
  const [subjectsExpanded, setSubjectsExpanded] = useState(true);

  const hasActiveFilters =
    filters.hlSubjects.length > 0 ||
    filters.universitySearch !== "" ||
    filters.careerSearch !== "";

  const toggleSubject = (subject: string) => {
    const next = filters.hlSubjects.includes(subject)
      ? filters.hlSubjects.filter((s) => s !== subject)
      : [...filters.hlSubjects, subject];
    onFiltersChange({ ...filters, hlSubjects: next });
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-dark">
        <h2 className="text-sm font-semibold text-text-primary-dark tracking-wide uppercase">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-xs text-accent-gold hover:text-accent-gold/80 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* HL Subjects */}
        <div>
          <button
            onClick={() => setSubjectsExpanded(!subjectsExpanded)}
            className="flex items-center justify-between w-full text-sm font-medium text-text-primary-dark mb-3"
          >
            HL Subjects
            {subjectsExpanded ? (
              <ChevronUp className="w-4 h-4 text-text-muted-dark" />
            ) : (
              <ChevronDown className="w-4 h-4 text-text-muted-dark" />
            )}
          </button>
          {subjectsExpanded && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {allHLSubjects.map((subject) => (
                <label
                  key={subject}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.hlSubjects.includes(subject)}
                    onChange={() => toggleSubject(subject)}
                    className="w-3.5 h-3.5 rounded border-border-dark bg-transparent accent-accent-gold"
                  />
                  <span className="text-sm text-text-muted-dark group-hover:text-text-primary-dark transition-colors">
                    {subject}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* University Search */}
        <div>
          <label className="block text-sm font-medium text-text-primary-dark mb-2">
            University
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted-dark" />
            <input
              type="text"
              value={filters.universitySearch}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  universitySearch: e.target.value,
                })
              }
              placeholder="Search universities..."
              className="w-full bg-white/5 border border-border-dark rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary-dark placeholder:text-text-muted-dark focus:outline-none focus:border-accent-gold/50 transition-colors"
            />
          </div>
        </div>

        {/* Career Search */}
        <div>
          <label className="block text-sm font-medium text-text-primary-dark mb-2">
            Career field
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted-dark" />
            <input
              type="text"
              value={filters.careerSearch}
              onChange={(e) =>
                onFiltersChange({ ...filters, careerSearch: e.target.value })
              }
              placeholder="Search careers..."
              className="w-full bg-white/5 border border-border-dark rounded-lg pl-9 pr-3 py-2 text-sm text-text-primary-dark placeholder:text-text-muted-dark focus:outline-none focus:border-accent-gold/50 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 left-4 z-30 w-12 h-12 rounded-full bg-bg-dark/90 backdrop-blur-md border border-border-dark flex items-center justify-center text-text-primary-dark shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
        {hasActiveFilters && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-accent-gold" />
        )}
      </button>

      {/* Desktop sidebar */}
      <div className="hidden md:block fixed top-0 left-0 z-20 w-[280px] h-screen bg-bg-dark/90 backdrop-blur-md border-r border-border-dark">
        {sidebarContent}
      </div>

      {/* Mobile bottom sheet */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-20 bg-bg-dark/95 backdrop-blur-md border-t border-border-dark rounded-t-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "70vh" }}
      >
        {sidebarContent}
      </div>
    </>
  );
}

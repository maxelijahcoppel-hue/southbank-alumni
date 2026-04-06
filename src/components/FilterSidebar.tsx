"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, X, Search, ChevronDown } from "lucide-react";
import { allHLSubjects } from "@/lib/sample-data";
import { AlumniProfile } from "@/lib/types";
import type { Filters } from "./AlumniMap";

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClear: () => void;
  alumni: AlumniProfile[];
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  onClear,
  alumni,
}: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    subjects: true,
    university: false,
    career: false,
    country: false,
    year: false,
    options: false,
  });

  const hasActiveFilters =
    filters.hlSubjects.length > 0 ||
    filters.universitySearch !== "" ||
    filters.careerSearch !== "" ||
    filters.countrySearch !== "" ||
    filters.gapYearOnly ||
    filters.openToContact ||
    filters.openToMentoring;

  const activeCount =
    filters.hlSubjects.length +
    (filters.universitySearch ? 1 : 0) +
    (filters.careerSearch ? 1 : 0) +
    (filters.countrySearch ? 1 : 0) +
    (filters.gapYearOnly ? 1 : 0) +
    (filters.openToContact ? 1 : 0) +
    (filters.openToMentoring ? 1 : 0);

  // Extract unique values from alumni data for dropdowns
  const universities = useMemo(
    () => [...new Set(alumni.map((a) => a.university))].sort(),
    [alumni]
  );
  const countries = useMemo(
    () => [...new Set(alumni.map((a) => a.location_country))].sort(),
    [alumni]
  );
  const careers = useMemo(
    () => [...new Set(alumni.map((a) => a.current_profession))].sort(),
    [alumni]
  );

  const toggleSubject = (subject: string) => {
    const next = filters.hlSubjects.includes(subject)
      ? filters.hlSubjects.filter((s) => s !== subject)
      : [...filters.hlSubjects, subject];
    onFiltersChange({ ...filters, hlSubjects: next });
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
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
        <div className="fixed inset-0 z-30 bg-black/40" onClick={() => setIsOpen(false)} />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 left-0 z-40 w-[340px] h-screen bg-[#0f1d32]/98 backdrop-blur-xl border-r border-white/[0.06] transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
          <h2 className="text-base font-semibold text-white">Filters</h2>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button onClick={onClear} className="text-xs text-[#d4a843] hover:text-[#d4a843]/80">
                Clear all
              </button>
            )}
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white/70">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
          {/* HL Subjects */}
          <FilterSection
            title="HL Subjects"
            count={filters.hlSubjects.length}
            expanded={expandedSections.subjects}
            onToggle={() => toggleSection("subjects")}
          >
            <div className="flex flex-wrap gap-1.5">
              {allHLSubjects.map((subject) => {
                const active = filters.hlSubjects.includes(subject);
                return (
                  <button
                    key={subject}
                    onClick={() => toggleSubject(subject)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      active
                        ? "bg-[#d4a843]/20 text-[#d4a843] border border-[#d4a843]/30"
                        : "bg-white/5 text-white/45 border border-white/[0.06] hover:text-white/70 hover:bg-white/8"
                    }`}
                  >
                    {subject}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          {/* University */}
          <FilterSection
            title="University"
            count={filters.universitySearch ? 1 : 0}
            expanded={expandedSections.university}
            onToggle={() => toggleSection("university")}
          >
            <SearchableDropdown
              value={filters.universitySearch}
              onChange={(v) => onFiltersChange({ ...filters, universitySearch: v })}
              options={universities}
              placeholder="Search or select university..."
            />
          </FilterSection>

          {/* Country */}
          <FilterSection
            title="Country"
            count={filters.countrySearch ? 1 : 0}
            expanded={expandedSections.country}
            onToggle={() => toggleSection("country")}
          >
            <SearchableDropdown
              value={filters.countrySearch}
              onChange={(v) => onFiltersChange({ ...filters, countrySearch: v })}
              options={countries}
              placeholder="Search or select country..."
            />
          </FilterSection>

          {/* Career Field */}
          <FilterSection
            title="Career"
            count={filters.careerSearch ? 1 : 0}
            expanded={expandedSections.career}
            onToggle={() => toggleSection("career")}
          >
            <SearchableDropdown
              value={filters.careerSearch}
              onChange={(v) => onFiltersChange({ ...filters, careerSearch: v })}
              options={careers}
              placeholder="Search or select career..."
            />
          </FilterSection>

          {/* Graduation Year */}
          <FilterSection
            title="Graduation Year"
            count={0}
            expanded={expandedSections.year}
            onToggle={() => toggleSection("year")}
          >
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={filters.yearRange[0]}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    yearRange: [parseInt(e.target.value) || 2010, filters.yearRange[1]],
                  })
                }
                className="w-20 bg-white/5 border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-[#d4a843]/40"
                min={2000}
                max={2030}
              />
              <span className="text-white/30 text-sm">to</span>
              <input
                type="number"
                value={filters.yearRange[1]}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    yearRange: [filters.yearRange[0], parseInt(e.target.value) || 2026],
                  })
                }
                className="w-20 bg-white/5 border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-[#d4a843]/40"
                min={2000}
                max={2030}
              />
            </div>
          </FilterSection>

          {/* Quick Filters */}
          <FilterSection
            title="Quick Filters"
            count={
              (filters.gapYearOnly ? 1 : 0) +
              (filters.openToContact ? 1 : 0) +
              (filters.openToMentoring ? 1 : 0)
            }
            expanded={expandedSections.options}
            onToggle={() => toggleSection("options")}
          >
            <div className="space-y-3">
              <ToggleOption
                label="Took a gap year"
                checked={filters.gapYearOnly}
                onChange={(v) => onFiltersChange({ ...filters, gapYearOnly: v })}
              />
              <ToggleOption
                label="Open to contact"
                checked={filters.openToContact}
                onChange={(v) => onFiltersChange({ ...filters, openToContact: v })}
              />
              <ToggleOption
                label="Open to mentoring"
                checked={filters.openToMentoring}
                onChange={(v) => onFiltersChange({ ...filters, openToMentoring: v })}
              />
            </div>
          </FilterSection>
        </div>

        {/* Footer with result count */}
        <div className="shrink-0 px-6 py-4 border-t border-white/[0.06]">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-colors"
          >
            Show results
          </button>
        </div>
      </div>
    </>
  );
}

function FilterSection({
  title,
  count,
  expanded,
  onToggle,
  children,
}: {
  title: string;
  count: number;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/[0.04] last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3.5 text-left group"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
            {title}
          </span>
          {count > 0 && (
            <span className="w-4.5 h-4.5 rounded-full bg-[#d4a843]/20 text-[#d4a843] text-[10px] font-bold flex items-center justify-center px-1.5">
              {count}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/30 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && <div className="pb-4">{children}</div>}
    </div>
  );
}

function SearchableDropdown({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          value={value || query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#d4a843]/40 transition-colors"
        />
        {value && (
          <button
            onClick={() => {
              onChange("");
              setQuery("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {showDropdown && filtered.length > 0 && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-[#0f1d32] border border-white/[0.08] rounded-xl shadow-xl max-h-48 overflow-y-auto z-50">
          {filtered.map((option) => (
            <button
              key={option}
              onMouseDown={() => {
                onChange(option);
                setQuery("");
                setShowDropdown(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ToggleOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3 w-full group"
    >
      <div
        className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 ${
          checked ? "bg-[#d4a843]" : "bg-white/10"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
      <span
        className={`text-sm transition-colors ${
          checked ? "text-white" : "text-white/50 group-hover:text-white/70"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

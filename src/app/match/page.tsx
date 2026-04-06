"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { sampleAlumni } from "@/lib/sample-data";
import {
  ExternalLink,
  Users,
  BookOpen,
  Briefcase,
  GraduationCap,
  MapPin,
  MessageCircle,
  Heart,
  ChevronDown,
  X,
  Sparkles,
  Search,
} from "lucide-react";
import type { AlumniProfile } from "@/lib/types";

const HL_SUBJECTS = [
  "Biology", "Chemistry", "Computer Science", "Design Technology",
  "Economics", "English A: Language & Literature", "English A: Literature",
  "Environmental Systems & Societies", "Film",
  "French A: Language & Literature", "French B",
  "Geography", "German A: Language & Literature", "German B",
  "Global Politics", "History",
  "Mathematics: Analysis & Approaches", "Mathematics: Applications & Interpretation",
  "Music", "Philosophy", "Physics", "Psychology",
  "Spanish A: Language & Literature", "Spanish B",
  "Theatre", "Visual Arts",
];

interface MatchFilters {
  hlSubjects: string[];
  universityInterest: string;
  careerInterest: string;
  countryInterest: string;
  openToMentoring: boolean;
  openToContact: boolean;
  tookGapYear: boolean | null;
}

const defaultFilters: MatchFilters = {
  hlSubjects: [],
  universityInterest: "",
  careerInterest: "",
  countryInterest: "",
  openToMentoring: false,
  openToContact: false,
  tookGapYear: null,
};

interface MatchResult {
  profile: AlumniProfile;
  score: number;
  maxScore: number;
  matchPercent: number;
  reasons: string[];
}

function computeMatch(profile: AlumniProfile, filters: MatchFilters): MatchResult {
  let score = 0;
  let maxScore = 0;
  const reasons: string[] = [];

  // Subject matching (weighted highest — 3 points per match)
  if (filters.hlSubjects.length > 0) {
    maxScore += filters.hlSubjects.length * 3;
    const shared = profile.hl_subjects.filter((s) => filters.hlSubjects.includes(s));
    score += shared.length * 3;
    if (shared.length > 0) {
      reasons.push(`${shared.length} shared HL subject${shared.length > 1 ? "s" : ""}`);
    }
  }

  // University match (2 points)
  if (filters.universityInterest) {
    maxScore += 2;
    if (profile.university.toLowerCase().includes(filters.universityInterest.toLowerCase())) {
      score += 2;
      reasons.push(`Studies at ${profile.university}`);
    }
  }

  // Career match (2 points)
  if (filters.careerInterest) {
    maxScore += 2;
    if (profile.current_profession.toLowerCase().includes(filters.careerInterest.toLowerCase())) {
      score += 2;
      reasons.push(`Works in ${filters.careerInterest}`);
    }
  }

  // Country match (1 point)
  if (filters.countryInterest) {
    maxScore += 1;
    if (profile.location_country.toLowerCase().includes(filters.countryInterest.toLowerCase())) {
      score += 1;
      reasons.push(`Based in ${profile.location_country}`);
    }
  }

  // Mentoring bonus (1 point)
  if (filters.openToMentoring) {
    maxScore += 1;
    if (profile.open_to_mentoring) {
      score += 1;
      reasons.push("Open to mentoring");
    }
  }

  // Contact bonus (1 point)
  if (filters.openToContact) {
    maxScore += 1;
    if (profile.open_to_contact) {
      score += 1;
      reasons.push("Open to contact");
    }
  }

  // Gap year filter (pass/fail, not scored)
  if (filters.tookGapYear !== null) {
    if (profile.took_gap_year !== filters.tookGapYear) {
      return { profile, score: 0, maxScore, matchPercent: 0, reasons: [] };
    }
    reasons.push(filters.tookGapYear ? "Took a gap year" : "Went straight to university");
  }

  const matchPercent = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  return { profile, score, maxScore, matchPercent, reasons };
}

export default function MatchPage() {
  const [filters, setFilters] = useState<MatchFilters>(defaultFilters);
  const [expandedProfile, setExpandedProfile] = useState<string | null>(null);
  const [alumni, setAlumni] = useState<AlumniProfile[]>(sampleAlumni as AlumniProfile[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAlumni() {
      const { data } = await supabase
        .from("alumni_profiles")
        .select("*")
        .eq("status", "approved");
      if (data && data.length > 0) setAlumni(data);
      setIsLoading(false);
    }
    fetchAlumni();
  }, []);

  const hasAnyFilter =
    filters.hlSubjects.length > 0 ||
    filters.universityInterest !== "" ||
    filters.careerInterest !== "" ||
    filters.countryInterest !== "" ||
    filters.openToMentoring ||
    filters.openToContact ||
    filters.tookGapYear !== null;

  // Extract options from alumni data
  const universities = useMemo(() => [...new Set(alumni.map((a) => a.university))].sort(), [alumni]);
  const countries = useMemo(() => [...new Set(alumni.map((a) => a.location_country))].sort(), [alumni]);
  const careers = useMemo(() => {
    const fields = new Set<string>();
    alumni.forEach((a) => {
      // Extract the career field (before "at")
      const parts = a.current_profession.split(" at ");
      if (parts[0]) fields.add(parts[0].trim());
    });
    return [...fields].sort();
  }, [alumni]);

  const matches = useMemo(() => {
    if (!hasAnyFilter) return [];
    return alumni
      .map((profile) => computeMatch(profile, filters))
      .filter((m) => m.score > 0)
      .sort((a, b) => b.score - a.score || b.matchPercent - a.matchPercent);
  }, [alumni, filters, hasAnyFilter]);

  const toggleSubject = (subject: string) => {
    setFilters((prev) => ({
      ...prev,
      hlSubjects: prev.hlSubjects.includes(subject)
        ? prev.hlSubjects.filter((s) => s !== subject)
        : [...prev.hlSubjects, subject],
    }));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a843]/10 text-[#d4a843] text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            What can Southbank students become?
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Match
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Tell us about your interests and we'll find alumni who share your path.
            The more you tell us, the better your matches.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
          {/* Filters panel */}
          <div className="space-y-5">
            {isLoading && (
              <>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" />
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <div key={j} className="h-7 bg-gray-200 rounded-full w-16" />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
            {/* HL Subjects */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Your HL Subjects</h3>
              <p className="text-xs text-gray-400 mb-3">Select the subjects you're taking or interested in</p>
              <div className="flex flex-wrap gap-1.5">
                {HL_SUBJECTS.map((subject) => {
                  const selected = filters.hlSubjects.includes(subject);
                  return (
                    <button
                      key={subject}
                      onClick={() => toggleSubject(subject)}
                      className={`text-xs px-2.5 py-1.5 rounded-full border transition-all ${
                        selected
                          ? "bg-[#d4a843]/10 border-[#d4a843]/25 text-[#b8922e] font-medium"
                          : "bg-white border-gray-150 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                      }`}
                    >
                      {subject}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* University interest */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">University Interest</h3>
              <p className="text-xs text-gray-400 mb-3">Where are you thinking of studying?</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="text"
                  value={filters.universityInterest}
                  onChange={(e) => setFilters((f) => ({ ...f, universityInterest: e.target.value }))}
                  placeholder="Type a university name..."
                  className="w-full bg-gray-50 border border-gray-150 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#d4a843]/40 focus:bg-white transition-colors"
                  list="universities"
                />
                <datalist id="universities">
                  {universities.map((u) => (
                    <option key={u} value={u} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Career interest */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Career Interest</h3>
              <p className="text-xs text-gray-400 mb-3">What kind of work interests you?</p>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="text"
                  value={filters.careerInterest}
                  onChange={(e) => setFilters((f) => ({ ...f, careerInterest: e.target.value }))}
                  placeholder="e.g. Engineer, Analyst, Designer..."
                  className="w-full bg-gray-50 border border-gray-150 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#d4a843]/40 focus:bg-white transition-colors"
                  list="careers"
                />
                <datalist id="careers">
                  {careers.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Country */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Location</h3>
              <p className="text-xs text-gray-400 mb-3">Interested in a specific country?</p>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type="text"
                  value={filters.countryInterest}
                  onChange={(e) => setFilters((f) => ({ ...f, countryInterest: e.target.value }))}
                  placeholder="Type a country..."
                  className="w-full bg-gray-50 border border-gray-150 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#d4a843]/40 focus:bg-white transition-colors"
                  list="countries"
                />
                <datalist id="countries">
                  {countries.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Quick toggles */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Preferences</h3>
              <ToggleRow
                label="Open to mentoring"
                sublabel="Alumni willing to mentor current students"
                icon={<Heart className="w-4 h-4" />}
                checked={filters.openToMentoring}
                onChange={(v) => setFilters((f) => ({ ...f, openToMentoring: v }))}
              />
              <ToggleRow
                label="Open to contact"
                sublabel="Alumni happy to be reached out to"
                icon={<MessageCircle className="w-4 h-4" />}
                checked={filters.openToContact}
                onChange={(v) => setFilters((f) => ({ ...f, openToContact: v }))}
              />
              <div className="pt-2 border-t border-gray-50">
                <p className="text-xs font-medium text-gray-500 mb-2">Gap year</p>
                <div className="flex gap-2">
                  {[
                    { label: "Any", value: null },
                    { label: "Took gap year", value: true },
                    { label: "Straight to uni", value: false },
                  ].map((opt) => (
                    <button
                      key={String(opt.value)}
                      onClick={() => setFilters((f) => ({ ...f, tookGapYear: opt.value }))}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        filters.tookGapYear === opt.value
                          ? "bg-[#d4a843]/10 border-[#d4a843]/25 text-[#b8922e] font-medium"
                          : "bg-white border-gray-150 text-gray-400 hover:border-gray-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear all */}
            {hasAnyFilter && (
              <button
                onClick={() => setFilters(defaultFilters)}
                className="w-full text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Results */}
          <div>
            {!hasAnyFilter && (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm">
                  Start selecting your interests on the left to find matching alumni.
                </p>
              </div>
            )}

            {hasAnyFilter && matches.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm mb-1">No alumni match your current filters.</p>
                <p className="text-gray-400 text-xs">Try removing some filters or broadening your search.</p>
              </div>
            )}

            {matches.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-900">{matches.length}</span> alumni match your profile
                  </p>
                  <p className="text-xs text-gray-400">Sorted by best match</p>
                </div>

                <div className="space-y-3">
                  {matches.map(({ profile, matchPercent, reasons }) => {
                    const isExpanded = expandedProfile === profile.id;
                    return (
                      <div
                        key={profile.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all"
                      >
                        {/* Main row */}
                        <button
                          onClick={() => setExpandedProfile(isExpanded ? null : profile.id)}
                          className="w-full text-left p-5 flex items-start gap-4"
                        >
                          {/* Match score circle */}
                          <div className="shrink-0 w-12 h-12 rounded-full bg-[#d4a843]/10 flex items-center justify-center">
                            <span className="text-sm font-bold text-[#b8922e]">{matchPercent}%</span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{profile.full_name}</h3>
                              {profile.open_to_mentoring && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                                  Mentor
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <GraduationCap className="w-3 h-3" />
                                {profile.university}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3 h-3" />
                                {profile.current_profession}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {profile.location_city}, {profile.location_country}
                              </span>
                            </div>

                            {/* Match reasons */}
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {reasons.map((reason) => (
                                <span
                                  key={reason}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4a843]/8 text-[#b8922e]"
                                >
                                  {reason}
                                </span>
                              ))}
                            </div>
                          </div>

                          <ChevronDown
                            className={`shrink-0 w-4 h-4 text-gray-300 mt-1 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Expanded content */}
                        {isExpanded && (
                          <div className="px-5 pb-5 border-t border-gray-50">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                              {/* HL Subjects */}
                              <div>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                                  HL Subjects
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  {profile.hl_subjects.map((s) => (
                                    <span
                                      key={s}
                                      className={`text-xs px-2 py-1 rounded-lg ${
                                        filters.hlSubjects.includes(s)
                                          ? "bg-[#d4a843]/10 text-[#b8922e] font-medium"
                                          : "bg-gray-50 text-gray-400"
                                      }`}
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Details */}
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                                    Degree
                                  </p>
                                  <p className="text-sm text-gray-700">{profile.undergraduate_degree}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                                    Class of
                                  </p>
                                  <p className="text-sm text-gray-700">{profile.graduation_year}</p>
                                </div>
                                {profile.took_gap_year && (
                                  <p className="text-xs text-gray-400 italic">Took a gap year</p>
                                )}
                              </div>

                              {/* Advice */}
                              <div className="sm:col-span-2">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                                  Advice to Students
                                </p>
                                <blockquote className="text-sm text-gray-600 italic border-l-2 border-[#d4a843]/30 pl-3">
                                  "{profile.advice_to_students}"
                                </blockquote>
                              </div>

                              {/* Actions */}
                              <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                                {profile.linkedin_url && (
                                  <a
                                    href={profile.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077b5] text-white text-sm font-medium hover:bg-[#006299] transition-colors"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Connect on LinkedIn
                                  </a>
                                )}
                                <Link
                                  href="/"
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
                                >
                                  <MapPin className="w-3.5 h-3.5" />
                                  View on map
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  sublabel,
  icon,
  checked,
  onChange,
}: {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button onClick={() => onChange(!checked)} className="flex items-center gap-3 w-full group">
      <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
        checked ? "bg-[#d4a843]/10 text-[#d4a843]" : "bg-gray-50 text-gray-300"
      }`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className={`text-sm ${checked ? "text-gray-900 font-medium" : "text-gray-500"}`}>{label}</p>
        <p className="text-[11px] text-gray-300">{sublabel}</p>
      </div>
      <div
        className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 ${
          checked ? "bg-[#d4a843]" : "bg-gray-200"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    </button>
  );
}

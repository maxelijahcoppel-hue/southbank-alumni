"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Search,
  ExternalLink,
  Users,
  BookOpen,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import type { AlumniProfile } from "@/lib/types";

const HL_SUBJECTS = [
  "Biology",
  "Chemistry",
  "Computer Science",
  "Design Technology",
  "Economics",
  "English A: Language & Literature",
  "English A: Literature",
  "Environmental Systems & Societies",
  "Film",
  "French A: Language & Literature",
  "French B",
  "Geography",
  "German A: Language & Literature",
  "German B",
  "Global Politics",
  "History",
  "Mathematics: Analysis & Approaches",
  "Mathematics: Applications & Interpretation",
  "Music",
  "Philosophy",
  "Physics",
  "Psychology",
  "Spanish A: Language & Literature",
  "Spanish B",
  "Theatre",
  "Visual Arts",
];

interface MatchResult {
  profile: AlumniProfile;
  matchCount: number;
  matchPercent: number;
}

export default function MatchPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [alumni, setAlumni] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    async function fetchAlumni() {
      setLoading(true);
      const { data } = await supabase
        .from("alumni_profiles")
        .select("*")
        .eq("status", "approved");

      setAlumni(data || []);
      setLoading(false);
      setFetched(true);
    }
    fetchAlumni();
  }, []);

  function toggleSubject(subject: string) {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  }

  const matches: MatchResult[] =
    selectedSubjects.length > 0
      ? alumni
          .map((profile) => {
            const matchCount = profile.hl_subjects.filter((s) =>
              selectedSubjects.includes(s)
            ).length;
            const matchPercent = Math.round(
              (matchCount / selectedSubjects.length) * 100
            );
            return { profile, matchCount, matchPercent };
          })
          .filter((m) => m.matchCount > 0)
          .sort((a, b) => b.matchCount - a.matchCount || b.matchPercent - a.matchPercent)
      : [];

  return (
    <div className="min-h-screen bg-bg-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-text-muted hover:text-accent-gold transition-colors"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mt-4 flex items-center gap-3">
            <Search className="w-6 h-6 text-accent-gold" />
            Find Your Match
          </h1>
          <p className="text-text-muted mt-2">
            Select your HL subjects to find alumni who studied the same ones.
          </p>
        </div>

        {/* Subject Selection */}
        <div className="rounded-xl bg-white shadow-sm p-6 border border-border mb-8">
          <h2 className="text-sm font-medium text-text-primary mb-3">
            Select your HL subjects
          </h2>
          <div className="flex flex-wrap gap-2">
            {HL_SUBJECTS.map((subject) => {
              const selected = selectedSubjects.includes(subject);
              return (
                <button
                  key={subject}
                  onClick={() => toggleSubject(subject)}
                  className={`text-sm px-2.5 py-1 rounded-md border transition-colors ${
                    selected
                      ? "bg-accent-gold/12 border-accent-gold/20 text-accent-gold"
                      : "bg-white border-border text-text-muted hover:border-accent-gold/40 hover:text-text-primary"
                  }`}
                >
                  {subject}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        {loading && (
          <div className="text-center py-12 text-text-muted">
            Loading alumni data...
          </div>
        )}

        {!loading && selectedSubjects.length === 0 && fetched && (
          <div className="text-center py-12">
            <Users className="w-10 h-10 text-text-muted/40 mx-auto mb-3" />
            <p className="text-text-muted">
              Select subjects above to see matching alumni.
            </p>
          </div>
        )}

        {!loading && selectedSubjects.length > 0 && matches.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-10 h-10 text-text-muted/40 mx-auto mb-3" />
            <p className="text-text-muted">
              No alumni with those exact subjects yet.
            </p>
          </div>
        )}

        {matches.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-text-muted mb-2">
              {matches.length} alumni match{matches.length !== 1 ? "es" : ""}
            </p>
            {matches.map(({ profile, matchCount, matchPercent }) => (
              <div
                key={profile.id}
                className="rounded-xl bg-white shadow-sm p-6 border border-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-text-primary">
                        {profile.full_name}
                      </h3>
                      <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-accent-gold/12 text-accent-gold font-medium">
                        {matchPercent}% match
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {profile.university}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        {profile.current_profession}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {matchCount} shared subject{matchCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.hl_subjects.map((s) => (
                        <span
                          key={s}
                          className={`text-xs px-2 py-0.5 rounded-md border ${
                            selectedSubjects.includes(s)
                              ? "bg-accent-gold/12 border-accent-gold/20 text-accent-gold"
                              : "bg-white border-border text-text-muted"
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-accent-blue hover:bg-black/5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

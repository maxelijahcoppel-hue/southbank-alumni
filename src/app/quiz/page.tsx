"use client";

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { sampleAlumni } from "@/lib/sample-data";
import {
  Briefcase,
  Globe,
  GraduationCap,
  Quote,
  Share2,
  Check,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Copy,
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

interface QuizResults {
  careers: { name: string; count: number }[];
  countries: { name: string; count: number }[];
  universities: { name: string; count: number }[];
  featuredQuote: { name: string; profession: string; advice: string } | null;
  totalMatches: number;
  exactMatches: number;
  totalAlumni: number;
}

function computeResults(
  alumni: AlumniProfile[],
  selectedSubjects: string[]
): QuizResults {
  // Find alumni who share at least one HL subject
  const matching = alumni.filter((a) =>
    a.hl_subjects.some((s) => selectedSubjects.includes(s))
  );

  // Exact matches: alumni who share ALL 3 selected subjects
  const exact = alumni.filter((a) =>
    selectedSubjects.every((s) => a.hl_subjects.includes(s))
  );

  // Count careers
  const careerMap = new Map<string, number>();
  matching.forEach((a) => {
    const career = a.current_profession.split(" at ")[0].trim();
    careerMap.set(career, (careerMap.get(career) || 0) + 1);
  });
  const careers = [...careerMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Count countries
  const countryMap = new Map<string, number>();
  matching.forEach((a) => {
    countryMap.set(
      a.location_country,
      (countryMap.get(a.location_country) || 0) + 1
    );
  });
  const countries = [...countryMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Count universities
  const uniMap = new Map<string, number>();
  matching.forEach((a) => {
    uniMap.set(a.university, (uniMap.get(a.university) || 0) + 1);
  });
  const universities = [...uniMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Pick a featured quote — prefer exact match, then any match
  const quotePool = exact.length > 0 ? exact : matching;
  const quotable = quotePool.filter((a) => a.advice_to_students.length > 20);
  const featured =
    quotable.length > 0
      ? quotable[Math.floor(Math.random() * quotable.length)]
      : null;

  return {
    careers,
    countries,
    universities,
    featuredQuote: featured
      ? {
          name: featured.full_name,
          profession: featured.current_profession,
          advice: featured.advice_to_students,
        }
      : null,
    totalMatches: matching.length,
    exactMatches: exact.length,
    totalAlumni: alumni.length,
  };
}

export default function QuizPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [alumni, setAlumni] = useState<AlumniProfile[]>(
    sampleAlumni as AlumniProfile[]
  );
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

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) return prev.filter((s) => s !== subject);
      if (prev.length >= 3) return prev;
      return [...prev, subject];
    });
  };

  const results = useMemo(() => {
    if (!showResults || selectedSubjects.length !== 3) return null;
    return computeResults(alumni, selectedSubjects);
  }, [alumni, selectedSubjects, showResults]);

  const shareText = useMemo(() => {
    if (!results || results.careers.length === 0) return "";
    const topCareers = results.careers
      .slice(0, 3)
      .map((c) => c.name)
      .join(", ");
    return `I could become a ${topCareers} based on my IB subjects! Check out the Southbank Alumni Network`;
  }, [results]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSelectedSubjects([]);
    setShowResults(false);
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a843]/10 text-[#d4a843] text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Subject Quiz
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Where could your subjects take you?
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Pick your 3 Higher Level subjects and discover what careers,
            countries, and universities Southbank alumni pursued with the same
            combination.
          </p>
        </div>

        {!showResults ? (
          /* ── Step 1: Subject Selection ── */
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i < selectedSubjects.length
                        ? "bg-[#d4a843] scale-110"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-500">
                {selectedSubjects.length}/3 selected
              </span>
            </div>

            {/* Subject pills */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Your HL Subjects
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Select exactly 3 Higher Level subjects
              </p>
              {isLoading ? (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-100 rounded-full w-24 animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {HL_SUBJECTS.map((subject) => {
                    const selected = selectedSubjects.includes(subject);
                    const disabled =
                      !selected && selectedSubjects.length >= 3;
                    return (
                      <button
                        key={subject}
                        onClick={() => toggleSubject(subject)}
                        disabled={disabled}
                        className={`text-sm px-3.5 py-2 rounded-full border transition-all ${
                          selected
                            ? "bg-[#d4a843]/10 border-[#d4a843]/30 text-[#b8922e] font-medium shadow-sm"
                            : disabled
                              ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                              : "bg-white border-gray-200 text-gray-500 hover:border-[#d4a843]/30 hover:text-gray-700"
                        }`}
                      >
                        {selected && (
                          <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                        )}
                        {subject}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CTA button */}
            <div className="text-center">
              <button
                onClick={() => setShowResults(true)}
                disabled={selectedSubjects.length !== 3}
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold transition-all ${
                  selectedSubjects.length === 3
                    ? "bg-[#d4a843] text-[#0a1628] hover:bg-[#c49a3a] shadow-lg shadow-[#d4a843]/20"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                See my results
                <ArrowRight className="w-5 h-5" />
              </button>
              {selectedSubjects.length > 0 && selectedSubjects.length < 3 && (
                <p className="text-xs text-gray-400 mt-3">
                  Pick {3 - selectedSubjects.length} more subject
                  {3 - selectedSubjects.length > 1 ? "s" : ""} to continue
                </p>
              )}
            </div>
          </div>
        ) : (
          /* ── Step 2: Results ── */
          <div>
            {/* Selected subjects badge row */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {selectedSubjects.map((s) => (
                <span
                  key={s}
                  className="text-sm px-3 py-1.5 rounded-full bg-[#d4a843]/10 border border-[#d4a843]/25 text-[#b8922e] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Match stat */}
            {results && (
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4a843]/8 text-[#b8922e]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {results.exactMatches > 0
                      ? `${results.exactMatches} alumni share your exact subject combination`
                      : `${results.totalMatches} alumni share at least one of your subjects`}
                  </span>
                </div>
              </div>
            )}

            {results && results.totalMatches === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-2">
                  No alumni with those subjects yet — you could be the first!
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-sm text-[#d4a843] hover:text-[#b8922e] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try different subjects
                </button>
              </div>
            ) : (
              results && (
                <div className="space-y-6">
                  {/* Career map */}
                  <ResultCard
                    icon={<Briefcase className="w-5 h-5" />}
                    title="Career Map"
                    subtitle="What careers alumni with your subjects went into"
                  >
                    <div className="space-y-2">
                      {results.careers.map((c) => (
                        <div
                          key={c.name}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700">
                            {c.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#d4a843] rounded-full"
                                style={{
                                  width: `${Math.max(
                                    12,
                                    (c.count / results.totalMatches) * 100
                                  )}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-400 w-6 text-right">
                              {c.count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ResultCard>

                  {/* Countries */}
                  <ResultCard
                    icon={<Globe className="w-5 h-5" />}
                    title="Countries"
                    subtitle="Where those alumni ended up"
                  >
                    <div className="flex flex-wrap gap-2">
                      {results.countries.map((c) => (
                        <span
                          key={c.name}
                          className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-gray-50 text-gray-600"
                        >
                          {c.name}
                          <span className="text-xs font-semibold text-[#d4a843]">
                            {c.count}
                          </span>
                        </span>
                      ))}
                    </div>
                  </ResultCard>

                  {/* Universities */}
                  <ResultCard
                    icon={<GraduationCap className="w-5 h-5" />}
                    title="Universities"
                    subtitle="Where they studied"
                  >
                    <div className="space-y-2">
                      {results.universities.map((u) => (
                        <div
                          key={u.name}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-gray-700">
                            {u.name}
                          </span>
                          <span className="text-xs font-semibold text-[#d4a843]">
                            {u.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </ResultCard>

                  {/* Featured quote */}
                  {results.featuredQuote && (
                    <ResultCard
                      icon={<Quote className="w-5 h-5" />}
                      title="Alumni Advice"
                      subtitle={`From ${results.featuredQuote.name}, ${results.featuredQuote.profession}`}
                    >
                      <blockquote className="text-gray-600 italic border-l-2 border-[#d4a843]/30 pl-4 text-sm leading-relaxed">
                        &ldquo;{results.featuredQuote.advice}&rdquo;
                      </blockquote>
                    </ResultCard>
                  )}

                  {/* Share section */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#d4a843]/10 flex items-center justify-center text-[#d4a843]">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-gray-900">
                        Share your results
                      </h3>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {shareText}
                      </p>
                    </div>
                    <button
                      onClick={handleCopy}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        copied
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-[#d4a843] text-[#0a1628] hover:bg-[#c49a3a]"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy to clipboard
                        </>
                      )}
                    </button>
                  </div>

                  {/* Reset */}
                  <div className="text-center pt-4">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Try different subjects
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-lg bg-[#d4a843]/10 flex items-center justify-center text-[#d4a843]">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-xs text-gray-400 mb-4 ml-10">{subtitle}</p>
      {children}
    </div>
  );
}

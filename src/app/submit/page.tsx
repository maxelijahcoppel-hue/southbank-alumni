"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  ChevronDown,
  Search,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

const ADVICE_MAX_LENGTH = 500;
const MEMORY_MAX_LENGTH = 500;

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

const UNIVERSITIES = [
  "Brown University",
  "Columbia University",
  "Cornell University",
  "Dartmouth College",
  "Duke University",
  "Georgetown University",
  "Harvard University",
  "Imperial College London",
  "Johns Hopkins University",
  "King's College London",
  "London School of Economics",
  "Massachusetts Institute of Technology",
  "New York University",
  "Northwestern University",
  "Oxford University",
  "Princeton University",
  "Stanford University",
  "UC Berkeley",
  "UCLA",
  "UCL (University College London)",
  "University of Bath",
  "University of Bristol",
  "University of Cambridge",
  "University of Chicago",
  "University of Edinburgh",
  "University of Exeter",
  "University of Manchester",
  "University of Michigan",
  "University of Pennsylvania",
  "University of St Andrews",
  "University of Toronto",
  "University of Warwick",
  "Yale University",
  "Other",
];

const COUNTRIES = [
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "China",
  "Czech Republic",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hong Kong",
  "India",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Singapore",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Other",
];

const CITIES = [
  "Abu Dhabi",
  "Amsterdam",
  "Austin",
  "Barcelona",
  "Berlin",
  "Boston",
  "Bristol",
  "Cambridge",
  "Chicago",
  "Copenhagen",
  "Dubai",
  "Dublin",
  "Edinburgh",
  "Geneva",
  "Hong Kong",
  "London",
  "Los Angeles",
  "Madrid",
  "Melbourne",
  "Miami",
  "Milan",
  "Munich",
  "New York",
  "Oxford",
  "Paris",
  "San Francisco",
  "Seattle",
  "Shanghai",
  "Singapore",
  "Stockholm",
  "Sydney",
  "Tel Aviv",
  "Tokyo",
  "Toronto",
  "Vienna",
  "Washington D.C.",
  "Zurich",
  "Other",
];

interface FormErrors {
  [key: string]: string;
}

export default function SubmitPage() {
  const [fullName, setFullName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [undergraduateDegree, setUndergraduateDegree] = useState("");
  const [university, setUniversity] = useState("");
  const [universitySearch, setUniversitySearch] = useState("");
  const [universityOpen, setUniversityOpen] = useState(false);
  const [alumniUniversities, setAlumniUniversities] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [hlSubjects, setHlSubjects] = useState<string[]>([]);
  const [hlTeachers, setHlTeachers] = useState<string[]>([]);
  const [teacherInput, setTeacherInput] = useState("");
  const [currentProfession, setCurrentProfession] = useState("");
  const [adviceToStudents, setAdviceToStudents] = useState("");
  const [favouriteMemory, setFavouriteMemory] = useState("");
  const [tookGapYear, setTookGapYear] = useState(false);
  const [interestingFirstYearClass, setInterestingFirstYearClass] =
    useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [openToContact, setOpenToContact] = useState(false);
  const [openToMentoring, setOpenToMentoring] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    async function fetchAlumniUniversities() {
      const { data } = await supabase
        .from("alumni_profiles")
        .select("university")
        .eq("status", "approved");
      if (data) {
        const unique = [...new Set(data.map((d: { university: string }) => d.university))].filter(Boolean);
        setAlumniUniversities(unique as string[]);
      }
    }
    fetchAlumniUniversities();
  }, []);

  // Merge static list with alumni universities (alumni ones shown first as suggestions)
  const allUniversities = [...new Set([...alumniUniversities, ...UNIVERSITIES])];

  const filteredUniversities = allUniversities.filter((u) =>
    u.toLowerCase().includes(universitySearch.toLowerCase())
  );

  const filteredCities = CITIES.filter((c) =>
    c.toLowerCase().includes(citySearch.toLowerCase())
  );

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!fullName.trim()) errs.fullName = "Full name is required.";
    if (!graduationYear) {
      errs.graduationYear = "Graduation year is required.";
    } else {
      const year = parseInt(graduationYear, 10);
      if (isNaN(year) || year < 2000 || year > 2026) {
        errs.graduationYear = "Graduation year must be between 2000 and 2026.";
      }
    }
    if (!undergraduateDegree.trim())
      errs.undergraduateDegree = "Undergraduate degree is required.";
    if (!university) errs.university = "University is required.";
    if (!city) errs.city = "City is required.";
    if (!country) errs.country = "Country is required.";
    if (hlSubjects.length === 0)
      errs.hlSubjects = "Select at least one HL subject.";
    if (!currentProfession.trim())
      errs.currentProfession = "Current profession is required.";
    if (!adviceToStudents.trim())
      errs.adviceToStudents = "Advice to students is required.";
    if (!favouriteMemory.trim())
      errs.favouriteMemory = "Favourite Southbank memory is required.";
    if (!interestingFirstYearClass.trim())
      errs.interestingFirstYearClass =
        "Interesting first-year class is required.";
    if (!consentGiven) errs.consentGiven = "You must consent to continue.";
    if (
      linkedinUrl &&
      !linkedinUrl.match(/^https?:\/\/(www\.)?linkedin\.com\//)
    ) {
      errs.linkedinUrl = "Please enter a valid LinkedIn URL.";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/alumni/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName.trim(),
          graduation_year: parseInt(graduationYear, 10),
          undergraduate_degree: undergraduateDegree.trim(),
          university,
          location_city: city,
          location_country: country,
          hl_subjects: hlSubjects,
          hl_teachers: hlTeachers,
          current_profession: currentProfession.trim(),
          advice_to_students: adviceToStudents.trim(),
          favourite_memory: favouriteMemory.trim(),
          took_gap_year: tookGapYear,
          interesting_first_year_class: interestingFirstYearClass.trim(),
          linkedin_url: linkedinUrl.trim() || null,
          open_to_contact: openToContact,
          open_to_mentoring: openToMentoring,
          consent_given: consentGiven,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed.");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function toggleSubject(subject: string) {
    setHlSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  }

  function addTeacher() {
    const name = teacherInput.trim();
    if (name && !hlTeachers.includes(name)) {
      setHlTeachers((prev) => [...prev, name]);
      setTeacherInput("");
    }
  }

  function removeTeacher(teacher: string) {
    setHlTeachers((prev) => prev.filter((t) => t !== teacher));
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-success/12 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-3">
            Profile Submitted
          </h1>
          <p className="text-text-muted mb-8">
            Thank you for submitting your alumni profile. It will be reviewed and
            approved shortly. You will appear on the map once approved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-accent-gold text-bg-dark px-5 py-2.5 font-medium hover:bg-accent-gold/90 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light pt-24 pb-12 px-4">
      <div className="max-w-[640px] mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-text-muted hover:text-accent-gold transition-colors"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mt-4">
            Submit Your Alumni Profile
          </h1>
          <p className="text-text-muted mt-2">
            Share your journey and inspire current students. All fields marked
            with * are required.
          </p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 rounded-lg bg-error/10 border border-error/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
            <p className="text-sm text-error">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <Field label="Full Name" required error={errors.fullName}>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Jane Smith"
              className={inputClass(errors.fullName)}
            />
          </Field>

          {/* Graduation Year */}
          <Field label="Graduation Year" required error={errors.graduationYear}>
            <input
              type="number"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              placeholder="e.g. 2024"
              min={2000}
              max={2026}
              className={inputClass(errors.graduationYear)}
            />
          </Field>

          {/* Undergraduate Degree */}
          <Field
            label="Undergraduate Degree"
            required
            error={errors.undergraduateDegree}
          >
            <input
              type="text"
              value={undergraduateDegree}
              onChange={(e) => setUndergraduateDegree(e.target.value)}
              placeholder="e.g. BSc Economics"
              className={inputClass(errors.undergraduateDegree)}
            />
          </Field>

          {/* University (searchable dropdown) */}
          <Field label="University" required error={errors.university}>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setUniversityOpen(!universityOpen);
                  setCityOpen(false);
                }}
                className={`${inputClass(errors.university)} flex items-center justify-between w-full text-left`}
              >
                <span
                  className={university ? "text-text-primary" : "text-text-muted"}
                >
                  {university || "Select university..."}
                </span>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </button>
              {universityOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-hidden">
                  <div className="p-2 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-text-muted" />
                      <input
                        type="text"
                        value={universitySearch}
                        onChange={(e) => setUniversitySearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold/40"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-48">
                    {filteredUniversities.map((u) => {
                      const isAlumniUni = alumniUniversities.includes(u);
                      return (
                        <button
                          key={u}
                          type="button"
                          onClick={() => {
                            setUniversity(u);
                            setUniversityOpen(false);
                            setUniversitySearch("");
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-accent-gold/8 transition-colors ${
                            university === u
                              ? "bg-accent-gold/12 text-accent-gold font-medium"
                              : "text-text-primary"
                          }`}
                        >
                          {u}
                          {isAlumniUni && (
                            <span className="ml-2 text-xs text-[#7BAFD4]">
                              Alumni
                            </span>
                          )}
                        </button>
                      );
                    })}
                    {filteredUniversities.length === 0 && (
                      <p className="px-3 py-4 text-sm text-text-muted text-center">
                        No results found.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Field>

          {/* City (searchable dropdown) */}
          <Field label="City" required error={errors.city}>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCityOpen(!cityOpen);
                  setUniversityOpen(false);
                }}
                className={`${inputClass(errors.city)} flex items-center justify-between w-full text-left`}
              >
                <span className={city ? "text-text-primary" : "text-text-muted"}>
                  {city || "Select city..."}
                </span>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </button>
              {cityOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-hidden">
                  <div className="p-2 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-text-muted" />
                      <input
                        type="text"
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        placeholder="Search..."
                        className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-gold/40"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto max-h-48">
                    {filteredCities.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCity(c);
                          setCityOpen(false);
                          setCitySearch("");
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-accent-gold/8 transition-colors ${
                          city === c
                            ? "bg-accent-gold/12 text-accent-gold font-medium"
                            : "text-text-primary"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                    {filteredCities.length === 0 && (
                      <p className="px-3 py-4 text-sm text-text-muted text-center">
                        No results found.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Field>

          {/* Country */}
          <Field label="Country" required error={errors.country}>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClass(errors.country)}
            >
              <option value="">Select country...</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          {/* HL Subjects (multi-select) */}
          <Field label="HL Subjects" required error={errors.hlSubjects}>
            <div className="flex flex-wrap gap-2">
              {HL_SUBJECTS.map((subject) => {
                const selected = hlSubjects.includes(subject);
                return (
                  <button
                    key={subject}
                    type="button"
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
          </Field>

          {/* HL Teachers (text array) */}
          <Field label="HL Teachers">
            <div className="flex gap-2">
              <input
                type="text"
                value={teacherInput}
                onChange={(e) => setTeacherInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTeacher();
                  }
                }}
                placeholder="e.g. Mr. Johnson"
                className={inputClass()}
              />
              <button
                type="button"
                onClick={addTeacher}
                className="shrink-0 rounded-lg border border-border px-3 py-2 hover:bg-black/5 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {hlTeachers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {hlTeachers.map((teacher) => (
                  <span
                    key={teacher}
                    className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-md bg-accent-gold/12 border border-accent-gold/20 text-accent-gold"
                  >
                    {teacher}
                    <button
                      type="button"
                      onClick={() => removeTeacher(teacher)}
                      className="hover:text-error transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Field>

          {/* Current Profession */}
          <Field
            label="Current Profession"
            required
            error={errors.currentProfession}
          >
            <input
              type="text"
              value={currentProfession}
              onChange={(e) => setCurrentProfession(e.target.value)}
              placeholder="e.g. Software Engineer at Google"
              className={inputClass(errors.currentProfession)}
            />
          </Field>

          {/* Advice to Students */}
          <Field
            label="Advice to Students"
            required
            error={errors.adviceToStudents}
          >
            <textarea
              value={adviceToStudents}
              onChange={(e) => {
                if (e.target.value.length <= ADVICE_MAX_LENGTH)
                  setAdviceToStudents(e.target.value);
              }}
              placeholder="What would you tell current IB students?"
              rows={4}
              maxLength={ADVICE_MAX_LENGTH}
              className={inputClass(errors.adviceToStudents)}
            />
            <p className="mt-1 text-xs text-text-muted text-right">
              {adviceToStudents.length}/{ADVICE_MAX_LENGTH} characters
            </p>
          </Field>

          {/* Favourite Southbank Memory */}
          <Field
            label="Favourite Southbank Memory"
            required
            error={errors.favouriteMemory}
          >
            <textarea
              value={favouriteMemory}
              onChange={(e) => {
                if (e.target.value.length <= MEMORY_MAX_LENGTH)
                  setFavouriteMemory(e.target.value);
              }}
              placeholder="What is your favourite memory from Southbank?"
              rows={4}
              maxLength={MEMORY_MAX_LENGTH}
              className={inputClass(errors.favouriteMemory)}
            />
            <p className="mt-1 text-xs text-text-muted text-right">
              {favouriteMemory.length}/{MEMORY_MAX_LENGTH} characters
            </p>
          </Field>

          {/* Gap Year Toggle */}
          <Field label="Did you take a gap year?">
            <button
              type="button"
              onClick={() => setTookGapYear(!tookGapYear)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                tookGapYear ? "bg-accent-gold" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                  tookGapYear ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="ml-3 text-sm text-text-muted">
              {tookGapYear ? "Yes" : "No"}
            </span>
          </Field>

          {/* Interesting First-Year Class */}
          <Field
            label="Interesting First-Year Class"
            required
            error={errors.interestingFirstYearClass}
          >
            <input
              type="text"
              value={interestingFirstYearClass}
              onChange={(e) => setInterestingFirstYearClass(e.target.value)}
              placeholder="e.g. Introduction to Philosophy"
              className={inputClass(errors.interestingFirstYearClass)}
            />
          </Field>

          {/* LinkedIn URL */}
          <Field label="LinkedIn URL" error={errors.linkedinUrl}>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className={inputClass(errors.linkedinUrl)}
            />
          </Field>

          {/* Preferences */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={openToMentoring}
                onChange={(e) => setOpenToMentoring(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border text-accent-gold focus:ring-accent-gold"
              />
              <span className="text-sm text-text-primary">
                I am open to mentoring students
              </span>
            </label>
          </div>

          {/* Consent */}
          <div className="space-y-4 rounded-lg border border-border bg-white p-4">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wide">
              Consent
            </p>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-accent-gold focus:ring-accent-gold"
              />
              <span className="text-sm text-text-primary leading-relaxed">
                I consent to the Southbank Alumni Network collecting and
                displaying the information I provide on this form on the
                Southbank Alumni Network website (southbank-alumni.vercel.app).
                I understand that my profile will be publicly visible and that I
                can request its removal at any time by emailing{" "}
                <a href="mailto:maxelijahcoppel@gmail.com" className="text-accent-gold hover:underline">maxelijahcoppel@gmail.com</a>.
                I have read and agree to the{" "}
                <Link href="/privacy" target="_blank" className="text-accent-gold hover:underline">Privacy Policy</Link>
                {" "}and{" "}
                <Link href="/terms" target="_blank" className="text-accent-gold hover:underline">Terms of Service</Link>.
                {" "}<span className="text-error">*</span>
              </span>
            </label>
            {errors.consentGiven && (
              <p className="text-sm text-error pl-7">{errors.consentGiven}</p>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={openToContact}
                onChange={(e) => setOpenToContact(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-accent-gold focus:ring-accent-gold"
              />
              <span className="text-sm text-text-primary leading-relaxed">
                I am happy to be contacted by current Southbank students via
                LinkedIn. I understand that my LinkedIn profile URL will be
                displayed on my alumni profile. Any messages I receive on
                LinkedIn are governed by LinkedIn&apos;s own privacy policy and
                terms of service.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent-gold text-bg-dark px-5 py-3 font-medium hover:bg-accent-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="inline-block w-5 h-5 border-2 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-error flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-lg border ${
    error ? "border-error" : "border-border"
  } bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 ${
    error ? "focus:ring-error/40" : "focus:ring-accent-gold/40"
  } transition-colors`;
}

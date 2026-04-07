"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Lightbulb, ArrowLeft, Check } from "lucide-react";

const HELP_TAGS = [
  "Mentorship",
  "Funding",
  "Expertise",
  "Connections",
  "Feedback",
  "Collaboration",
  "Resources",
  "Advice",
];

const SUBJECTS = [
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

export default function SubmitProjectPage() {
  const [studentName, setStudentName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [relatedSubjects, setRelatedSubjects] = useState<string[]>([]);
  const [fundingNeeded, setFundingNeeded] = useState("");
  const [logistics, setLogistics] = useState("");
  const [helpTags, setHelpTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleSubject = (s: string) => {
    setRelatedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const toggleTag = (t: string) => {
    setHelpTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!studentName.trim() || !projectTitle.trim() || !projectDescription.trim() || !logistics.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const { error: dbError } = await supabase.from("project_posts").insert({
        student_name: studentName.trim(),
        project_title: projectTitle.trim(),
        project_description: projectDescription.trim(),
        related_subjects: relatedSubjects,
        funding_needed: fundingNeeded.trim() || null,
        logistics: logistics.trim(),
        help_tags: helpTags,
        status: "pending",
      });

      if (dbError) {
        setError("Something went wrong. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#fafafa] pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#4ad99a]/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#4ad99a]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project submitted!</h1>
          <p className="text-gray-500 mb-6">
            Your project is pending review. Once approved, it will be visible to alumni who can help.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/projects"
              className="px-5 py-2.5 rounded-lg bg-[#7BAFD4] text-white text-sm font-medium hover:bg-[#7BAFD4]/90 transition-colors"
            >
              View projects
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-12 px-4">
      <div className="max-w-[640px] mx-auto">
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#7BAFD4]/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-[#7BAFD4]" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Post Your Project</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Share your project idea with Southbank alumni. They can offer mentorship, expertise, funding, or connections.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Your Name *
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Max Coppel"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#7BAFD4]/50 focus:ring-1 focus:ring-[#7BAFD4]/20"
            />
          </div>

          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Project Title *
            </label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. Sustainable Packaging Initiative"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#7BAFD4]/50 focus:ring-1 focus:ring-[#7BAFD4]/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Project Description *
            </label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe your project, what you're trying to achieve, and why it matters..."
              rows={4}
              maxLength={1000}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#7BAFD4]/50 focus:ring-1 focus:ring-[#7BAFD4]/20 resize-none"
            />
            <p className="text-xs text-gray-300 text-right mt-1">{projectDescription.length}/1000 characters</p>
          </div>

          {/* Related Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Related Subjects
            </label>
            <p className="text-xs text-gray-400 mb-2">Select the IB subjects related to your project</p>
            <div className="flex flex-wrap gap-1.5">
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSubject(s)}
                  className={`text-xs px-2.5 py-1.5 rounded-full border transition-all ${
                    relatedSubjects.includes(s)
                      ? "bg-[#7BAFD4]/10 border-[#7BAFD4]/25 text-[#5B9BC9] font-medium"
                      : "bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* What help do you need */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              What help do you need?
            </label>
            <div className="flex flex-wrap gap-2">
              {HELP_TAGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    helpTags.includes(t)
                      ? "bg-[#7BAFD4]/10 border-[#7BAFD4]/25 text-[#5B9BC9] font-medium"
                      : "bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Funding */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Funding Needed
            </label>
            <input
              type="text"
              value={fundingNeeded}
              onChange={(e) => setFundingNeeded(e.target.value)}
              placeholder="e.g. £500 for materials, or 'No funding needed'"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#7BAFD4]/50 focus:ring-1 focus:ring-[#7BAFD4]/20"
            />
          </div>

          {/* Logistics */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Logistics *
            </label>
            <textarea
              value={logistics}
              onChange={(e) => setLogistics(e.target.value)}
              placeholder="How would an alumni get involved? What's the timeline? What do you need from them specifically?"
              rows={3}
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#7BAFD4]/50 focus:ring-1 focus:ring-[#7BAFD4]/20 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#7BAFD4] text-white px-5 py-3 text-sm font-semibold hover:bg-[#7BAFD4]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? "Submitting..." : (
              <>
                <Lightbulb className="w-4 h-4" />
                Submit Project
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

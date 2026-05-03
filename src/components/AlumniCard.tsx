"use client";

import { useState } from "react";
import { AlumniProfile } from "@/lib/types";
import {
  X,
  MapPin,
  GraduationCap,
  Briefcase,
  ExternalLink,
  MessageCircle,
  Users,
  Copy,
  Check,
} from "lucide-react";

function LinkedInMessageButton({ alumni }: { alumni: AlumniProfile }) {
  const [showPanel, setShowPanel] = useState(false);
  const [copied, setCopied] = useState(false);

  const firstName = alumni.full_name.split(" ")[0];
  const message = `Hi ${firstName}! I'm a current student at Southbank International School. I saw your profile on the Alumni Network and would love to hear about your experience at ${alumni.university} and your career in ${alumni.current_profession}. Would you be open to a quick chat?`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!showPanel) {
    return (
      <button
        onClick={() => setShowPanel(true)}
        className="flex items-center justify-center gap-2 w-full rounded-lg bg-accent-blue text-white px-5 py-2.5 text-sm font-medium hover:bg-accent-blue/90 transition-colors cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" />
        Message on LinkedIn
      </button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg bg-white/[0.04] border border-white/[0.08] p-4">
        <p className="text-xs font-medium text-text-muted-dark uppercase tracking-wide mb-2">
          Suggested message
        </p>
        <p className="text-sm text-text-primary-dark leading-relaxed">
          {message}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
            copied
              ? "bg-success/20 text-success border border-success/30"
              : "bg-white/10 text-white border border-white/[0.1] hover:bg-white/15"
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
              Copy message
            </>
          )}
        </button>
        <a
          href={alumni.linkedin_url!}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-accent-blue text-white px-4 py-2.5 text-sm font-medium hover:bg-accent-blue/90 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Open LinkedIn
        </a>
      </div>
      <button
        onClick={() => setShowPanel(false)}
        className="w-full text-xs text-white/30 hover:text-white/50 transition-colors cursor-pointer py-1"
      >
        Close
      </button>
    </div>
  );
}

interface AlumniCardProps {
  alumni: AlumniProfile;
  onClose: () => void;
}

export function AlumniCard({ alumni, onClose }: AlumniCardProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[55] bg-black/40 cursor-pointer"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className="fixed z-[60] bg-[#0f1d32]/98 backdrop-blur-xl border-l border-white/[0.06] overflow-y-auto
          md:top-0 md:right-0 md:w-[380px] md:h-screen
          bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl md:rounded-none
          animate-slide-in"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[70] w-9 h-9 rounded-full bg-white/10 border border-white/[0.1] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 space-y-5">
          {/* Header */}
          <div>
            <h2 className="text-xl font-bold text-text-primary-dark pr-10">
              {alumni.full_name}
            </h2>
            {alumni.graduation_year && (
              <p className="text-sm text-text-muted-dark mt-1">
                Class of {alumni.graduation_year}
              </p>
            )}
          </div>

          {/* University & Degree */}
          <div className="flex items-start gap-3">
            <GraduationCap className="w-4 h-4 mt-0.5 text-accent-gold shrink-0" />
            <div>
              <p className="text-sm font-medium text-text-primary-dark">
                {alumni.university}
              </p>
              <p className="text-sm text-text-muted-dark">
                {alumni.undergraduate_degree}
              </p>
            </div>
          </div>

          {/* Current Profession */}
          <div className="flex items-start gap-3">
            <Briefcase className="w-4 h-4 mt-0.5 text-accent-gold shrink-0" />
            <p className="text-sm text-text-primary-dark">
              {alumni.current_profession}
            </p>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5 text-accent-gold shrink-0" />
            <p className="text-sm text-text-primary-dark">
              {alumni.location_city}, {alumni.location_country}
            </p>
          </div>

          {/* HL Subjects */}
          <div>
            <p className="text-xs font-medium text-text-muted-dark uppercase tracking-wide mb-2">
              HL Subjects
            </p>
            <div className="flex flex-wrap gap-2">
              {alumni.hl_subjects.map((subject) => (
                <span
                  key={subject}
                  className="rounded-md bg-accent-gold/12 border border-accent-gold/20 text-sm px-2.5 py-1 text-accent-gold"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border-dark" />

          {/* Advice */}
          <div>
            <p className="text-xs font-medium text-text-muted-dark uppercase tracking-wide mb-2">
              Advice to students
            </p>
            <blockquote className="text-sm text-text-primary-dark italic leading-relaxed border-l-2 border-accent-gold/40 pl-3">
              &ldquo;{alumni.advice_to_students}&rdquo;
            </blockquote>
          </div>

          {/* Favourite Memory */}
          <div>
            <p className="text-xs font-medium text-text-muted-dark uppercase tracking-wide mb-2">
              Favourite memory
            </p>
            <p className="text-sm text-text-primary-dark leading-relaxed">
              {alumni.favourite_memory}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-border-dark" />

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {alumni.open_to_contact && (
              <span className="inline-flex items-center gap-1.5 bg-success/12 text-success text-xs px-2.5 py-1 rounded-full">
                <MessageCircle className="w-3 h-3" />
                Open to contact
              </span>
            )}
            {alumni.open_to_mentoring && (
              <span className="inline-flex items-center gap-1.5 bg-accent-gold/12 text-accent-gold text-xs px-2.5 py-1 rounded-full">
                <Users className="w-3 h-3" />
                Open to mentoring
              </span>
            )}
          </div>

          {/* LinkedIn Button with Message Template */}
          {alumni.linkedin_url && alumni.open_to_contact && (
            <LinkedInMessageButton alumni={alumni} />
          )}
        </div>
      </div>
    </>
  );
}

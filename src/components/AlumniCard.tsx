"use client";

import { AlumniProfile } from "@/lib/types";
import {
  X,
  MapPin,
  GraduationCap,
  Briefcase,
  ExternalLink,
  MessageCircle,
  Users,
} from "lucide-react";

interface AlumniCardProps {
  alumni: AlumniProfile;
  onClose: () => void;
}

export function AlumniCard({ alumni, onClose }: AlumniCardProps) {
  return (
    <>
      {/* Backdrop on mobile */}
      <div
        className="md:hidden fixed inset-0 z-30 bg-black/50"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className="fixed z-40 bg-bg-dark/95 backdrop-blur-md border-l border-border-dark overflow-y-auto
          md:top-0 md:right-0 md:w-[380px] md:h-screen
          bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl md:rounded-none
          animate-slide-in"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 border border-border-dark flex items-center justify-center text-text-muted-dark hover:text-text-primary-dark transition-colors"
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

          {/* LinkedIn Button */}
          {alumni.linkedin_url && (
            <a
              href={alumni.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-accent-blue text-white px-5 py-2.5 text-sm font-medium hover:bg-accent-blue/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View LinkedIn Profile
            </a>
          )}
        </div>
      </div>
    </>
  );
}

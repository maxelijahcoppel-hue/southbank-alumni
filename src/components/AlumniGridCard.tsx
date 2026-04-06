"use client";

import { AlumniProfile } from "@/lib/types";
import { MapPin, GraduationCap } from "lucide-react";

interface AlumniGridCardProps {
  alumni: AlumniProfile;
  onClick?: () => void;
}

export function AlumniGridCard({ alumni, onClick }: AlumniGridCardProps) {
  const topSubjects = alumni.hl_subjects.slice(0, 2);

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl bg-white shadow-sm p-6 border border-border hover:shadow-md hover:border-accent-gold/30 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 ease-out group"
    >
      <div className="space-y-3">
        {/* Name */}
        <h3 className="text-base font-bold text-text-primary group-hover:text-accent-gold transition-colors">
          {alumni.full_name}
        </h3>

        {/* University */}
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <GraduationCap className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{alumni.university}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>
            {alumni.location_city}, {alumni.location_country}
          </span>
        </div>

        {/* Graduation year */}
        {alumni.graduation_year && (
          <p className="text-xs text-text-muted">
            Class of {alumni.graduation_year}
          </p>
        )}

        {/* HL Subject tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {topSubjects.map((subject) => (
            <span
              key={subject}
              className="rounded-md bg-accent-gold/12 border border-accent-gold/20 text-xs px-2 py-0.5 text-accent-gold"
            >
              {subject}
            </span>
          ))}
          {alumni.hl_subjects.length > 2 && (
            <span className="text-xs text-text-muted py-0.5">
              +{alumni.hl_subjects.length - 2}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Lightbulb,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  LogOut,
} from "lucide-react";
import type { AlumniProfile, ProjectPost } from "@/lib/types";

type Tab = "profiles" | "projects";

function StatusBadge({ status }: { status: string }) {
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1 bg-success/12 text-success text-xs px-2 py-0.5 rounded-full">
        <CheckCircle className="w-3 h-3" />
        Approved
      </span>
    );
  }
  if (status === "rejected") {
    return (
      <span className="inline-flex items-center gap-1 bg-error/12 text-error text-xs px-2 py-0.5 rounded-full">
        <XCircle className="w-3 h-3" />
        Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-accent-gold/12 text-accent-gold text-xs px-2 py-0.5 rounded-full">
      <Clock className="w-3 h-3" />
      Pending
    </span>
  );
}

export function AdminDashboard({
  profiles: initialProfiles,
  projects: initialProjects,
}: {
  profiles: AlumniProfile[];
  projects: ProjectPost[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profiles");
  const [profiles, setProfiles] = useState(initialProfiles);
  const [projects, setProjects] = useState(initialProjects);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const pendingProfiles = profiles.filter((p) => p.status === "pending").length;
  const pendingProjects = projects.filter((p) => p.status === "pending").length;

  async function handleProfileAction(
    id: string,
    action: "approve" | "reject"
  ) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "profile" }),
      });

      if (res.ok) {
        setProfiles((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, status: action === "approve" ? "approved" : "rejected" as const }
              : p
          )
        );
      }
    } catch {
      // silently fail
    } finally {
      setActionLoading(null);
    }
  }

  async function handleProjectAction(
    id: string,
    action: "approve" | "reject"
  ) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type: "project" }),
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, status: action === "approve" ? "approved" : "rejected" as const }
              : p
          )
        );
      }
    } catch {
      // silently fail
    } finally {
      setActionLoading(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/approve", { method: "OPTIONS" }).catch(() => {});
    // Client-side sign out
    const { supabase } = await import("@/lib/supabase");
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const filteredProfiles =
    filter === "all" ? profiles : profiles.filter((p) => p.status === filter);
  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">
              Admin Dashboard
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Manage alumni profiles and student projects.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:text-text-primary hover:bg-black/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-6">
          <button
            onClick={() => setTab("profiles")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === "profiles"
                ? "border-accent-gold text-accent-gold"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Users className="w-4 h-4" />
            Profiles
            {pendingProfiles > 0 && (
              <span className="ml-1 bg-accent-gold/12 text-accent-gold text-xs px-1.5 py-0.5 rounded-full">
                {pendingProfiles}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("projects")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === "projects"
                ? "border-accent-gold text-accent-gold"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            Projects
            {pendingProjects > 0 && (
              <span className="ml-1 bg-accent-gold/12 text-accent-gold text-xs px-1.5 py-0.5 rounded-full">
                {pendingProjects}
              </span>
            )}
          </button>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                filter === f
                  ? "bg-accent-gold text-bg-dark"
                  : "bg-white border border-border text-text-muted hover:text-text-primary"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Profiles Tab */}
        {tab === "profiles" && (
          <div className="space-y-3">
            {filteredProfiles.length === 0 && (
              <div className="text-center py-12 text-text-muted">
                No {filter === "all" ? "" : filter} profiles found.
              </div>
            )}
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="rounded-xl bg-white shadow-sm p-6 border border-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-text-primary truncate">
                        {profile.full_name}
                      </h3>
                      <StatusBadge status={profile.status} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-text-muted">
                      <p>
                        <span className="font-medium text-text-primary">Degree:</span>{" "}
                        {profile.undergraduate_degree}
                      </p>
                      <p>
                        <span className="font-medium text-text-primary">University:</span>{" "}
                        {profile.university}
                      </p>
                      <p>
                        <span className="font-medium text-text-primary">Location:</span>{" "}
                        {profile.location_city}, {profile.location_country}
                      </p>
                      <p>
                        <span className="font-medium text-text-primary">Profession:</span>{" "}
                        {profile.current_profession}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {profile.hl_subjects.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-0.5 rounded-md bg-accent-gold/12 border border-accent-gold/20 text-accent-gold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    {profile.linkedin_url && (
                      <a
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-xs text-accent-blue hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        LinkedIn
                      </a>
                    )}
                  </div>

                  {profile.status === "pending" && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() =>
                          handleProfileAction(profile.id, "approve")
                        }
                        disabled={actionLoading === profile.id}
                        className="flex items-center gap-1.5 rounded-lg bg-success/12 text-success px-3 py-1.5 text-sm font-medium hover:bg-success/20 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleProfileAction(profile.id, "reject")
                        }
                        disabled={actionLoading === profile.id}
                        className="flex items-center gap-1.5 rounded-lg bg-error/12 text-error px-3 py-1.5 text-sm font-medium hover:bg-error/20 transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {tab === "projects" && (
          <div className="space-y-3">
            {filteredProjects.length === 0 && (
              <div className="text-center py-12 text-text-muted">
                No {filter === "all" ? "" : filter} projects found.
              </div>
            )}
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl bg-white shadow-sm p-6 border border-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-text-primary truncate">
                        {project.project_title}
                      </h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="text-sm text-text-muted mb-2">
                      by {project.student_name}
                    </p>
                    <p className="text-sm text-text-primary line-clamp-2">
                      {project.project_description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.help_tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md bg-accent-gold/12 border border-accent-gold/20 text-accent-gold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.status === "pending" && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() =>
                          handleProjectAction(project.id, "approve")
                        }
                        disabled={actionLoading === project.id}
                        className="flex items-center gap-1.5 rounded-lg bg-success/12 text-success px-3 py-1.5 text-sm font-medium hover:bg-success/20 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleProjectAction(project.id, "reject")
                        }
                        disabled={actionLoading === project.id}
                        className="flex items-center gap-1.5 rounded-lg bg-error/12 text-error px-3 py-1.5 text-sm font-medium hover:bg-error/20 transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
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

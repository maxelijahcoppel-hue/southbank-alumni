import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import {
  Lightbulb,
  DollarSign,
  Tag,
  BookOpen,
  Plus,
  Users,
} from "lucide-react";
import type { ProjectPost } from "@/lib/types";

async function getApprovedProjects(): Promise<ProjectPost[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from("project_posts")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return data || [];
}

export default async function ProjectsPage() {
  const projects = await getApprovedProjects();

  return (
    <div className="min-h-screen bg-bg-light pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <Link
              href="/"
              className="text-sm text-text-muted hover:text-accent-gold transition-colors"
            >
              &larr; Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-text-primary mt-4 flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-accent-gold" />
              Student Projects
            </h1>
            <p className="text-text-muted mt-2">
              Browse student projects and find ways to collaborate.
            </p>
          </div>
          <Link
            href="/submit-project"
            className="shrink-0 mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-gold text-bg-dark px-5 py-2.5 font-medium hover:bg-accent-gold/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Post Your Project
          </Link>
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <Lightbulb className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
            <p className="text-text-muted text-lg mb-2">No projects yet.</p>
            <p className="text-text-muted text-sm mb-6">
              Be the first to share your project with the community.
            </p>
            <Link
              href="/submit-project"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-gold text-bg-dark px-5 py-2.5 font-medium hover:bg-accent-gold/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Post Your Project
            </Link>
          </div>
        )}

        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl bg-white shadow-sm p-6 border border-border flex flex-col"
              >
                <h3 className="font-bold text-text-primary text-lg mb-1">
                  {project.project_title}
                </h3>
                <p className="text-sm text-text-muted mb-3 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  {project.student_name}
                </p>
                <p className="text-sm text-text-primary mb-4 line-clamp-3 flex-1">
                  {project.project_description}
                </p>

                {project.related_subjects.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-text-muted mb-1.5 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Related Subjects
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.related_subjects.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-2 py-0.5 rounded-md bg-accent-gold/12 border border-accent-gold/20 text-accent-gold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.help_tags.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-text-muted mb-1.5 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Help Needed
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.help_tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md bg-accent-blue/12 border border-accent-blue/20 text-accent-blue"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.funding_needed && (
                  <div className="mt-auto pt-3 border-t border-border">
                    <p className="text-sm text-text-muted flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5" />
                      Funding needed: {project.funding_needed}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

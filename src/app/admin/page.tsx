"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { AdminDashboard } from "./admin-dashboard";
import type { AlumniProfile, ProjectPost } from "@/lib/types";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [profiles, setProfiles] = useState<AlumniProfile[]>([]);
  const [projects, setProjects] = useState<ProjectPost[]>([]);

  useEffect(() => {
    async function checkAuthAndFetch() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/admin/login");
        return;
      }

      setAuthenticated(true);

      // Fetch data using API routes (which use the service role key server-side)
      const [profilesRes, projectsRes] = await Promise.all([
        fetch("/api/admin/profiles"),
        fetch("/api/admin/projects"),
      ]);

      if (profilesRes.ok) setProfiles(await profilesRes.json());
      if (projectsRes.ok) setProjects(await projectsRes.json());
      setLoading(false);
    }

    checkAuthAndFetch();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading admin panel...</p>
      </div>
    );
  }

  if (!authenticated) return null;

  return <AdminDashboard profiles={profiles} projects={projects} />;
}

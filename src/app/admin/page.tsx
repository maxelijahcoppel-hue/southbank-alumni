import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { AdminDashboard } from "./admin-dashboard";

async function getSession() {
  const cookieStore = await cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch pending profiles and projects using the admin client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

  const [profilesRes, projectsRes] = await Promise.all([
    supabaseAdmin
      .from("alumni_profiles")
      .select("*")
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("project_posts")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <AdminDashboard
      profiles={profilesRes.data || []}
      projects={projectsRes.data || []}
    />
  );
}

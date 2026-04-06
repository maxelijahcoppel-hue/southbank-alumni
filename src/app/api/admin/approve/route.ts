import { supabaseAdmin } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { id, type } = await request.json();

    if (!id) {
      return Response.json({ error: "ID is required." }, { status: 400 });
    }

    const table = type === "project" ? "project_posts" : "alumni_profiles";

    const { error } = await supabaseAdmin
      .from(table)
      .update({ status: "approved" })
      .eq("id", id);

    if (error) {
      return Response.json({ error: "Failed to approve." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
}

import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      student_name,
      project_title,
      project_description,
      related_subjects,
      funding_needed,
      logistics,
      help_tags,
    } = body;

    // Server-side validation
    const errors: string[] = [];
    if (!student_name?.trim()) errors.push("Student name is required.");
    if (!project_title?.trim()) errors.push("Project title is required.");
    if (!project_description?.trim())
      errors.push("Project description is required.");
    if (!logistics?.trim()) errors.push("Logistics information is required.");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }

    const { data, error } = await supabase.from("project_posts").insert({
      student_name: student_name.trim(),
      project_title: project_title.trim(),
      project_description: project_description.trim(),
      related_subjects: Array.isArray(related_subjects) ? related_subjects : [],
      funding_needed: funding_needed?.trim() || null,
      logistics: logistics.trim(),
      help_tags: Array.isArray(help_tags) ? help_tags : [],
      status: "pending",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit project. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}

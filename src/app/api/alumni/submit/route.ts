import { supabase } from "@/lib/supabase";
import { getCityCoordinates } from "@/lib/cities";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      full_name,
      graduation_year,
      undergraduate_degree,
      university,
      location_city,
      location_country,
      hl_subjects,
      hl_teachers,
      current_profession,
      advice_to_students,
      favourite_memory,
      took_gap_year,
      interesting_first_year_class,
      linkedin_url,
      open_to_contact,
      open_to_mentoring,
      consent_given,
    } = body;

    // Server-side validation
    const errors: string[] = [];
    if (!full_name?.trim()) errors.push("Full name is required.");
    if (
      graduation_year != null &&
      (typeof graduation_year !== "number" || graduation_year < 2000 || graduation_year > 2026)
    ) {
      errors.push("Graduation year must be between 2000 and 2026.");
    }
    if (!undergraduate_degree?.trim())
      errors.push("Undergraduate degree is required.");
    if (!university?.trim()) errors.push("University is required.");
    if (!location_city?.trim()) errors.push("City is required.");
    if (!location_country?.trim()) errors.push("Country is required.");
    if (!Array.isArray(hl_subjects) || hl_subjects.length === 0)
      errors.push("At least one HL subject is required.");
    if (!current_profession?.trim())
      errors.push("Current profession is required.");
    if (!advice_to_students?.trim())
      errors.push("Advice to students is required.");
    if (!favourite_memory?.trim())
      errors.push("Favourite memory is required.");
    if (!interesting_first_year_class?.trim())
      errors.push("Interesting first-year class is required.");
    if (!consent_given) errors.push("Consent is required.");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }

    const coords = getCityCoordinates(location_city.trim(), location_country.trim());

    const { data, error } = await supabase.from("alumni_profiles").insert({
      full_name: full_name.trim(),
      graduation_year: graduation_year ?? null,
      undergraduate_degree: undergraduate_degree.trim(),
      university: university.trim(),
      location_city: location_city.trim(),
      location_country: location_country.trim(),
      latitude: coords?.lat ?? null,
      longitude: coords?.lng ?? null,
      hl_subjects,
      hl_teachers: Array.isArray(hl_teachers) ? hl_teachers : [],
      current_profession: current_profession.trim(),
      advice_to_students: advice_to_students.trim(),
      favourite_memory: favourite_memory.trim(),
      took_gap_year: !!took_gap_year,
      interesting_first_year_class: interesting_first_year_class.trim(),
      linkedin_url: linkedin_url?.trim() || null,
      open_to_contact: !!open_to_contact,
      open_to_mentoring: !!open_to_mentoring,
      consent_given: true,
      status: "pending",
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit profile. Please try again." },
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

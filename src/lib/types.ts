export interface AlumniProfile {
  id: string;
  full_name: string;
  undergraduate_degree: string;
  university: string;
  location_city: string;
  location_country: string;
  latitude: number | null;
  longitude: number | null;
  graduation_year: number | null;
  hl_subjects: string[];
  hl_teachers: string[];
  current_profession: string;
  advice_to_students: string;
  favourite_memory: string;
  took_gap_year: boolean;
  interesting_first_year_class: string;
  linkedin_url: string | null;
  open_to_contact: boolean;
  open_to_mentoring: boolean;
  consent_given: boolean;
  consent_given_at: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface ProjectPost {
  id: string;
  student_name: string;
  project_title: string;
  project_description: string;
  related_subjects: string[];
  funding_needed: string | null;
  logistics: string;
  help_tags: string[];
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  created_at: string;
}

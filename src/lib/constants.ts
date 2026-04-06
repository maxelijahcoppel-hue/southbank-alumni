/** IB Higher Level subject options */
export const HL_SUBJECTS = [
  "Biology",
  "Business Management",
  "Chemistry",
  "Computer Science",
  "Economics",
  "English A: Language and Literature",
  "English A: Literature",
  "Environmental Systems and Societies",
  "Film",
  "Geography",
  "Global Politics",
  "History",
  "Mathematics: Analysis and Approaches",
  "Mathematics: Applications and Interpretation",
  "Music",
  "Philosophy",
  "Physics",
  "Psychology",
  "Spanish A",
  "Spanish B",
  "French A",
  "French B",
  "Theatre",
  "Visual Arts",
] as const;

export type HLSubject = (typeof HL_SUBJECTS)[number];

/** Career field options for alumni profiles and filtering */
export const CAREER_FIELDS = [
  "Accounting & Auditing",
  "Architecture & Urban Planning",
  "Arts & Creative Industries",
  "Banking & Finance",
  "Consulting",
  "Data Science & Analytics",
  "Design (Graphic, UX/UI, Product)",
  "Education & Academia",
  "Energy & Utilities",
  "Engineering (Civil, Mechanical, Electrical)",
  "Entrepreneurship & Startups",
  "Environmental & Sustainability",
  "Fashion & Luxury",
  "Film, TV & Media Production",
  "Government & Public Policy",
  "Healthcare & Medicine",
  "Hospitality & Tourism",
  "Human Resources",
  "Insurance",
  "International Development & NGOs",
  "Journalism & Communications",
  "Law & Legal Services",
  "Management & Operations",
  "Marketing & Advertising",
  "Music & Performing Arts",
  "Pharmaceuticals & Biotech",
  "Product Management",
  "Real Estate & Property",
  "Research & Science",
  "Retail & E-Commerce",
  "Social Work & Community Services",
  "Software Engineering & IT",
  "Sports & Fitness",
  "Supply Chain & Logistics",
  "Telecommunications",
  "Venture Capital & Private Equity",
  "Other",
] as const;

export type CareerField = (typeof CAREER_FIELDS)[number];

/** Alumni profile status options */
export const PROFILE_STATUSES = ["pending", "approved", "rejected"] as const;

export type ProfileStatus = (typeof PROFILE_STATUSES)[number];

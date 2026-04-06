"use client";

import { sampleAlumni } from "@/lib/sample-data";
import { AlumniMap } from "@/components/AlumniMap";
import type { AlumniProfile } from "@/lib/types";

export default function Home() {
  const alumni = sampleAlumni as AlumniProfile[];

  return <AlumniMap alumni={alumni} />;
}

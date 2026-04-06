import { sampleAlumni } from "@/lib/sample-data";
import { AlumniMap } from "@/components/AlumniMap";

export default function Home() {
  // Server component: will eventually fetch from Supabase
  const alumni = sampleAlumni;

  return <AlumniMap alumni={alumni} />;
}

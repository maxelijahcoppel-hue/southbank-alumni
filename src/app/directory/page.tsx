import { sampleAlumni } from "@/lib/sample-data";
import { DirectoryClient } from "./directory-client";

export default function DirectoryPage() {
  // Server component: will eventually fetch from Supabase
  const alumni = sampleAlumni;

  return <DirectoryClient alumni={alumni} />;
}

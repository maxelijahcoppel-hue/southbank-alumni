"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { sampleAlumni } from "@/lib/sample-data";
import { DirectoryClient } from "./directory-client";
import type { AlumniProfile } from "@/lib/types";

export default function DirectoryPage() {
  const [alumni, setAlumni] = useState<AlumniProfile[]>(sampleAlumni as AlumniProfile[]);

  useEffect(() => {
    async function fetchAlumni() {
      const { data } = await supabase
        .from("alumni_profiles")
        .select("*")
        .eq("status", "approved");

      if (data && data.length > 0) {
        setAlumni(data);
      }
    }
    fetchAlumni();
  }, []);

  return <DirectoryClient alumni={alumni} />;
}

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import { sampleAlumni } from "@/lib/sample-data";
import type { AlumniProfile } from "@/lib/types";

const AlumniMap = dynamic(
  () => import("@/components/AlumniMap").then((m) => m.AlumniMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-[#070e1a] flex items-center justify-center">
        <div className="text-white/30 text-sm">Loading map...</div>
      </div>
    ),
  }
);

export default function Home() {
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
      // If fetch fails or returns empty, keep sample data as fallback
    }
    fetchAlumni();
  }, []);

  return <AlumniMap alumni={alumni} />;
}

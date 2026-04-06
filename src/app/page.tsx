"use client";

import dynamic from "next/dynamic";
import { sampleAlumni } from "@/lib/sample-data";
import type { AlumniProfile } from "@/lib/types";

const AlumniMap = dynamic(() => import("@/components/AlumniMap").then((m) => m.AlumniMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-[#070e1a] flex items-center justify-center">
      <div className="text-white/30 text-sm">Loading map...</div>
    </div>
  ),
});

export default function Home() {
  const alumni = sampleAlumni as AlumniProfile[];
  return <AlumniMap alumni={alumni} />;
}

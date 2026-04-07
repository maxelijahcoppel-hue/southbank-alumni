"use client";

import { useEffect, useState } from "react";
import { Users, Globe, GraduationCap } from "lucide-react";
import { supabase } from "@/lib/supabase";

const fallbackStats = [
  { label: "Alumni", value: "15", icon: Users },
  { label: "Countries", value: "14", icon: Globe },
  { label: "Universities", value: "15", icon: GraduationCap },
];

export default function LiveStats() {
  const [stats, setStats] = useState(fallbackStats);

  useEffect(() => {
    async function fetchStats() {
      const { data } = await supabase
        .from("alumni_profiles")
        .select("id, location_country, university")
        .eq("status", "approved");

      if (data && data.length > 0) {
        const alumniCount = data.length;
        const countries = new Set(data.map((d) => d.location_country).filter(Boolean));
        const universities = new Set(data.map((d) => d.university).filter(Boolean));

        setStats([
          { label: "Alumni", value: String(alumniCount), icon: Users },
          { label: "Countries", value: String(countries.size), icon: Globe },
          { label: "Universities", value: String(universities.size), icon: GraduationCap },
        ]);
      }
    }
    fetchStats();
  }, []);

  return (
    <section className="py-12 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center py-8 px-4 rounded-xl bg-white border border-gray-100 shadow-sm"
            >
              <stat.icon
                className="mx-auto text-[#7BAFD4] mb-3"
                size={22}
                strokeWidth={1.5}
              />
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 font-[family-name:var(--font-geist-mono)] leading-none">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

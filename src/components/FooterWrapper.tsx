"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer on the full-screen map page and admin pages
  if (pathname === "/" || pathname.startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}

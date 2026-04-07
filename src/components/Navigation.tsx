"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Map" },
  { href: "/directory", label: "Directory" },
  { href: "/match", label: "Find Your Match" },
  { href: "/quiz", label: "Quiz" },
  { href: "/projects", label: "Projects" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMapPage = pathname === "/";
  const isAdminPage = pathname.startsWith("/admin");

  if (isAdminPage) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        isMapPage
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-20">
        <Link href="/">
          <Image
            src="/southbank-logo.png"
            alt="Southbank International School — Alumni Network"
            width={220}
            height={48}
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1.5">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isMapPage
                    ? active
                      ? "text-white bg-white/15"
                      : "text-white/60 hover:text-white hover:bg-white/8"
                    : active
                      ? "text-gray-900 bg-gray-100"
                      : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/submit"
            className={`ml-4 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              isMapPage
                ? "bg-[#7BAFD4]/15 text-[#7BAFD4] border border-[#7BAFD4]/25 hover:bg-[#7BAFD4]/25"
                : "bg-[#7BAFD4]/10 text-[#5B9BC9] border border-[#7BAFD4]/20 hover:bg-[#7BAFD4]/20"
            }`}
          >
            Submit Profile
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className={isMapPage ? "text-white/70" : "text-gray-500"} size={22} />
          ) : (
            <Menu className={isMapPage ? "text-white/70" : "text-gray-500"} size={22} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t ${
            isMapPage
              ? "bg-[#070e1a]/98 backdrop-blur-xl border-white/[0.06]"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="px-4 py-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                    isMapPage
                      ? active
                        ? "text-white bg-white/10"
                        : "text-white/50 hover:text-white/80"
                      : active
                        ? "text-gray-900 bg-gray-50"
                        : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/submit"
              onClick={() => setMobileOpen(false)}
              className="block mt-2 px-4 py-3 rounded-lg text-[15px] font-semibold text-[#7BAFD4]"
            >
              Submit Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

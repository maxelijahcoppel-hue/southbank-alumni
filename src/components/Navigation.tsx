"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Map, Users, Heart, Lightbulb, Calendar, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Map", icon: Map },
  { href: "/directory", label: "Directory", icon: Users },
  { href: "/match", label: "Find Your Match", icon: Heart },
  { href: "/projects", label: "Projects", icon: Lightbulb },
  { href: "/events", label: "Events", icon: Calendar },
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
          ? "bg-[#0a1628]/95 backdrop-blur-sm border-b border-white/[0.08]"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-14">
        <Link
          href="/"
          className={`text-lg font-bold tracking-tight ${
            isMapPage ? "text-white" : "text-gray-900"
          }`}
        >
          Southbank{" "}
          <span className="text-[#d4a843]">Alumni</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-opacity ${
                  isMapPage
                    ? active
                      ? "text-[#d4a843] opacity-100"
                      : "text-white/60 hover:text-white/90"
                    : active
                      ? "text-[#d4a843] opacity-100"
                      : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/submit"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-[#d4a843] text-[#0a1628] hover:bg-[#d4a843]/90 transition-colors"
          >
            Submit Profile
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className={isMapPage ? "text-white" : "text-gray-900"} size={20} />
          ) : (
            <Menu className={isMapPage ? "text-white" : "text-gray-900"} size={20} />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t ${
            isMapPage
              ? "bg-[#0a1628]/98 border-white/[0.08]"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isMapPage
                      ? active
                        ? "text-[#d4a843] bg-white/5"
                        : "text-white/60 hover:text-white/90 hover:bg-white/5"
                      : active
                        ? "text-[#d4a843] bg-[#d4a843]/5"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/submit"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center text-sm font-medium px-4 py-2.5 rounded-lg bg-[#d4a843] text-[#0a1628]"
            >
              Submit Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Map" },
  { href: "/directory", label: "Directory" },
  { href: "/match", label: "Find Your Match" },
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
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
        <Link
          href="/"
          className={`text-[15px] font-semibold tracking-tight ${
            isMapPage ? "text-white/90" : "text-gray-900"
          }`}
        >
          Southbank <span className="text-[#d4a843]">Alumni</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
                  isMapPage
                    ? active
                      ? "text-white bg-white/10"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
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
            className={`ml-3 px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all ${
              isMapPage
                ? "text-white/70 border border-white/15 hover:text-white hover:border-white/30"
                : "text-gray-500 border border-gray-200 hover:text-gray-700 hover:border-gray-300"
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
            <X className={isMapPage ? "text-white/70" : "text-gray-500"} size={20} />
          ) : (
            <Menu className={isMapPage ? "text-white/70" : "text-gray-500"} size={20} />
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
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
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
              className={`block mt-1 px-3 py-2.5 rounded-lg text-sm font-medium ${
                isMapPage
                  ? "text-[#d4a843]"
                  : "text-[#d4a843]"
              }`}
            >
              Submit Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Map" },
  { href: "/directory", label: "Directory" },
  { href: "/match", label: "Find Your Match" },
  { href: "/submit", label: "Submit Profile" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div>
            <Image
              src="/southbank-logo.png"
              alt="Southbank International School — Alumni Network"
              width={160}
              height={36}
              className="h-7 w-auto brightness-0 invert"
            />
            <p className="mt-2 text-sm text-white/30 max-w-xs">
              Connecting Southbank International School students and alumni
              worldwide.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-white/25">
          <span>Built by Max Coppel &middot; Southbank International School</span>
          <span>&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { MapPin, Users, Send, Compass } from "lucide-react";

const suggestions = [
  {
    href: "/",
    label: "Alumni Map",
    description: "Explore where alumni are across the globe",
    icon: MapPin,
  },
  {
    href: "/directory",
    label: "Directory",
    description: "Browse and search all alumni profiles",
    icon: Users,
  },
  {
    href: "/submit",
    label: "Submit Profile",
    description: "Add yourself to the alumni network",
    icon: Send,
  },
];

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-5 sm:px-8">
      <div className="max-w-md w-full text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
          <Compass className="text-gray-300" size={28} strokeWidth={1.5} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
        <p className="mt-3 text-base text-gray-400">
          This page doesn&apos;t exist. Maybe you&apos;re looking for one of
          these?
        </p>

        <div className="mt-10 space-y-3 text-left">
          {suggestions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-gray-200 hover:shadow transition-all group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#7BAFD4]/10 flex items-center justify-center">
                <item.icon
                  className="text-[#7BAFD4]"
                  size={18}
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900 group-hover:text-[#7BAFD4] transition-colors">
                  {item.label}
                </div>
                <div className="text-xs text-gray-400">{item.description}</div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-block mt-8 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";
import {
  MapPin,
  Users,
  GraduationCap,
  Globe,
  Search,
  ExternalLink,
  Link2,
  ArrowRight,
  Heart,
} from "lucide-react";

export const metadata = {
  title: "About — Southbank Alumni Network",
  description:
    "The story behind the Southbank Alumni Network: connecting current students with alumni worldwide.",
};

const stats = [
  { label: "Alumni", value: "15", icon: Users },
  { label: "Countries", value: "14", icon: Globe },
  { label: "Universities", value: "15", icon: GraduationCap },
];

const steps = [
  {
    icon: MapPin,
    title: "Browse the map",
    description:
      "Explore an interactive globe showing where Southbank alumni have ended up — from London to Tokyo, New York to Sydney.",
  },
  {
    icon: Search,
    title: "Find your match",
    description:
      "Filter by university, subject, graduation year, or interests to find alumni who share your path or passions.",
  },
  {
    icon: Link2,
    title: "Connect on LinkedIn",
    description:
      "Reach out directly. Every profile links to LinkedIn so you can start a real conversation, not just browse.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            About the Southbank
            <br />
            Alumni Network
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            A place for Southbank students — past and present — to stay
            connected, wherever life takes them.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-base text-gray-600 leading-relaxed">
            When you leave Southbank, you join a community scattered across the
            world. Your classmates end up at universities on every continent,
            working in fields you never expected, living in cities you&apos;ve
            never heard of. But there&apos;s no easy way to find them.
          </p>
          <p className="mt-5 text-base text-gray-600 leading-relaxed">
            The Southbank Alumni Network changes that. It&apos;s a living map of
            where our alumni are — what they studied, where they went, what
            they&apos;re doing now. If you&apos;re a Year 12 student wondering
            what studying Economics at UCL is actually like, you can find someone
            who&apos;s done it. If you&apos;re deciding between universities in
            the US and the UK, you can talk to people who made that same choice.
          </p>
          <p className="mt-5 text-base text-gray-600 leading-relaxed">
            This isn&apos;t an official school project. It&apos;s something I
            built because I wished it existed when I was making my own decisions.
            I hope it helps you make yours.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center py-8 px-4 rounded-xl bg-white border border-gray-100 shadow-sm"
              >
                <stat.icon
                  className="mx-auto text-[#d4a843] mb-3"
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

      {/* How it works */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-12">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4a843]/10 mb-4">
                  <step.icon
                    className="text-[#d4a843]"
                    size={20}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="text-xs font-medium text-gray-300 mb-2">
                  Step {i + 1}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built by */}
      <section className="py-16 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-8 sm:p-10">
            <div className="flex items-center gap-2 mb-4">
              <Heart
                className="text-[#d4a843]"
                size={16}
                strokeWidth={1.5}
              />
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                Built by
              </span>
            </div>
            <p className="text-base text-gray-600 leading-relaxed">
              I&apos;m Max Coppel, Year 13 at Southbank International School,
              Westminster. I built this because I think the connections between
              Southbank students are one of the most valuable things about this
              school — and they shouldn&apos;t disappear after graduation.
            </p>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              If you have ideas, feedback, or just want to say hi, I&apos;d love
              to hear from you. This project is as much yours as it is mine.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 pb-24 px-5 sm:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Are you a Southbank alumnus?
          </h2>
          <p className="text-base text-gray-500 mb-8">
            Submit your profile and join the network. It takes two minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#d4a843] text-[#0a1628] text-sm font-medium hover:bg-[#d4a843]/90 transition-colors"
            >
              Submit your profile
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
            >
              Explore the map
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

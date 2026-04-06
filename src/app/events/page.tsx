import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Calendar, MapPin, Clock } from "lucide-react";
import type { Event } from "@/lib/types";

async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from("events")
    .select("*")
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true });

  return data || [];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <div className="min-h-screen bg-bg-light py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm text-text-muted hover:text-accent-gold transition-colors"
          >
            &larr; Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-text-primary mt-4 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-accent-gold" />
            Upcoming Events
          </h1>
          <p className="text-text-muted mt-2">
            Stay connected with the Southbank community.
          </p>
        </div>

        {events.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
            <p className="text-text-muted text-lg mb-1">No upcoming events.</p>
            <p className="text-text-muted text-sm">Check back soon!</p>
          </div>
        )}

        {events.length > 0 && (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-xl bg-white shadow-sm p-6 border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-14 h-14 rounded-lg bg-accent-gold/12 flex flex-col items-center justify-center text-accent-gold">
                    <span className="text-lg font-bold leading-none">
                      {new Date(event.event_date).getDate()}
                    </span>
                    <span className="text-xs uppercase">
                      {new Date(event.event_date).toLocaleString("en-GB", {
                        month: "short",
                      })}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-text-primary text-lg">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted mt-1 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(event.event_date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatTime(event.event_date)}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.location}
                        </span>
                      )}
                    </div>
                    {event.description && (
                      <p className="text-sm text-text-primary">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

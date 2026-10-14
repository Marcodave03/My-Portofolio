import Link from "next/link";
import type { Entry } from "@/lib/content";

/**
 * Ventures get the most room on the page: full-width records, the name set
 * large enough to read as a wordmark, and a tinted plate that fills from the
 * leading edge when you reach for one.
 */
export default function VentureList({ entries }: { entries: Entry[] }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {entries.map((entry) => (
        <li key={entry.slug}>
          <Link
            href={`/work/${entry.slug}`}
            className="venture group relative block py-8 sm:py-10"
            style={{ borderTop: "1px solid var(--rule)" }}
          >
            {/* the plate */}
            <span
              aria-hidden
              className="venture-plate pointer-events-none absolute inset-y-0 left-[-1rem] right-[-1rem] -z-10 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              style={{ background: "var(--fill)" }}
            />

            <div className="grid gap-x-10 gap-y-4 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)_auto]">
              <div>
                <h3
                  className="ui font-semibold"
                  style={{ fontSize: "var(--text-entry)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
                >
                  {entry.name}
                </h3>
                {entry.status ? (
                  <span
                    className="sounding mt-2.5 inline-flex items-center gap-2"
                    style={{ color: "var(--fg-soft)" }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: entry.status === "Live" ? "var(--accent-ink)" : "var(--fg-faint)",
                      }}
                    />
                    {entry.status}
                  </span>
                ) : null}
              </div>

              <div>
                <p className="prose" style={{ maxWidth: "48ch", color: "var(--fg)" }}>
                  {entry.line}
                </p>
                <p className="sounding mt-4">{entry.stack.join("   ·   ")}</p>
              </div>

              <div className="sounding self-start lg:pt-2 lg:text-right">
                <div>{entry.year}</div>
                <div
                  className="mt-1.5 transition-colors duration-300 group-hover:text-[var(--accent-ink)]"
                  style={{ color: "var(--fg-soft)" }}
                >
                  {entry.role}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

import Link from "next/link";
import type { Entry } from "@/lib/content";

/** Compact two-column records — these are internal tools, and the point
 *  is what each one carried, not how it looked. */
export default function SystemList({ entries }: { entries: Entry[] }) {
  return (
    <ul
      className="grid gap-x-14 gap-y-0 md:grid-cols-2"
      style={{ listStyle: "none", margin: 0, padding: 0 }}
    >
      {entries.map((entry) => (
        <li key={entry.slug}>
          <Link
            href={`/work/${entry.slug}`}
            className="group block py-6"
            style={{ borderTop: "1px solid var(--rule)" }}
          >
            <div className="flex items-baseline justify-between gap-5">
              <h3 className="ui text-[1.2rem] font-semibold transition-colors duration-300 group-hover:text-[var(--accent-ink)]">
                {entry.name}
              </h3>
              <span className="sounding shrink-0">{entry.year}</span>
            </div>
            <p className="prose mt-2" style={{ maxWidth: "44ch", fontSize: "0.975rem" }}>
              {entry.line}
            </p>
            <p className="sounding mt-3">{entry.stack.join("   ·   ")}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Entry } from "@/lib/content";

/** This register really is a chronology, so it is set as one: a dated
 *  rail running down the left, newest first. */
type Award = { id?: number; year: string; title: string; note: string; url?: string };

export default function HackathonTimeline({
  entries,
  recognition,
}: {
  entries: Entry[];
  recognition: Award[];
}) {
  return (
    <div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {entries.map((entry) => (
          <li key={entry.slug} style={{ borderTop: "1px solid var(--rule)" }}>
            <Link
              href={`/work/${entry.slug}`}
              className="group grid gap-x-10 gap-y-6 py-9 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,22rem)] lg:py-12"
            >
              <div className="sounding lg:pt-2" style={{ fontSize: "0.9rem", color: "var(--fg)" }}>
                {entry.year}
              </div>

              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3
                    className="ui font-semibold transition-colors duration-300 group-hover:text-[var(--accent-ink)]"
                    style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)", letterSpacing: "-0.03em" }}
                  >
                    {entry.name}
                  </h3>
                  {entry.status ? (
                    <span
                      className="ui text-[0.72rem] font-medium"
                      style={{
                        background: "var(--accent)",
                        color: "var(--on-accent)",
                        padding: "0.22rem 0.55rem",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {entry.status}
                    </span>
                  ) : null}
                </div>
                <p className="prose mt-3" style={{ maxWidth: "46ch" }}>
                  {entry.line}
                </p>
                <p className="sounding mt-4">
                  {entry.role}
                  <span style={{ opacity: 0.5 }}>{"   ·   "}</span>
                  {entry.stack.join("   ·   ")}
                </p>
              </div>

              {entry.image ? (
                <div
                  className="relative overflow-hidden self-start"
                  style={{ aspectRatio: "16 / 10", background: "var(--fill)" }}
                >
                  <Image
                    src={entry.image}
                    alt={`${entry.name} — project mockup`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 22rem"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ol>

      {/* Recognition */}
      <div className="mt-20">
        <h3
          className="ui mb-7 pb-3 text-[1.35rem] font-semibold"
          style={{ borderBottom: "1px solid var(--fg)" }}
        >
          Placings and certifications
        </h3>
        <ul
          className="grid gap-x-14 md:grid-cols-2"
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {recognition.map((r) => (
            <li
              key={`${r.year}-${r.title}`}
              className="flex items-baseline gap-5 py-3.5"
              style={{ borderBottom: "1px solid var(--rule)" }}
            >
              <span className="sounding shrink-0" style={{ minWidth: "2.6rem" }}>
                {r.year}
              </span>
              <span className="ui flex-1 text-[0.975rem]">{r.title}</span>
              {r.note ? (
                <span className="sounding hidden shrink-0 text-right sm:block">{r.note}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

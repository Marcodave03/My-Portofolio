import Image from "next/image";
import Link from "next/link";
import type { Entry } from "@/lib/content";

/**
 * Widths vary by weight of the piece, so the grid reads as a layout rather
 * than a row of identical cards. Heights are fixed per row instead of being
 * derived from an aspect ratio, so captions across a row sit on one line.
 */
const span: Record<string, string> = {
  "eden-clinic": "lg:col-span-7",
  watchgoods: "lg:col-span-5",
  "nusa-travel": "lg:col-span-5",
  nuattime: "lg:col-span-7",
  oceaneed: "lg:col-span-12",
};

export default function ClientGrid({ entries }: { entries: Entry[] }) {
  // Only shipped sites get a preview frame. Anything still in progress is
  // listed below rather than shown as an empty plate.
  const shipped = entries.filter((e) => e.image);
  const inProgress = entries.filter((e) => !e.image);

  return (
    <div>
      <ul
        className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-16"
        style={{ listStyle: "none", margin: 0, padding: 0 }}
      >
        {shipped.map((entry) => {
          const wide = span[entry.slug] === "lg:col-span-12";
          return (
            <li
              key={entry.slug}
              className={`${span[entry.slug] ?? "lg:col-span-6"} sm:col-span-1`}
            >
              <Link href={`/work/${entry.slug}`} className="group block">
                {/* Below lg the frame is sized by ratio; from lg it takes a
                    fixed height so captions across a row share a baseline.
                    aspect-auto is required, or the ratio sizes the width. */}
                <div
                  className={`relative overflow-hidden ${
                    wide
                      ? "aspect-[21/9] lg:aspect-auto lg:h-[28rem]"
                      : "aspect-[16/10] lg:aspect-auto lg:h-[26rem]"
                  }`}
                  style={{
                    background: "var(--fill)",
                    border: "1px solid var(--rule)",
                  }}
                >
                  <Image
                    src={entry.image!}
                    alt={`${entry.name} — the site as it ships`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                    className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                  {entry.links[0] ? (
                    <span
                      className="ui absolute top-0 right-0 px-3 py-1.5 text-[0.7rem] font-medium tracking-tight opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      style={{ background: "var(--accent)", color: "var(--on-accent)" }}
                    >
                      Live
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-5">
                  <h3 className="ui text-[1.3rem] font-semibold sm:text-[1.5rem]">
                    {entry.name}
                  </h3>
                  <span className="sounding shrink-0">{entry.year}</span>
                </div>
                <p
                  className="prose mt-2"
                  style={{ maxWidth: wide ? "62ch" : "42ch", fontSize: "1rem" }}
                >
                  {entry.line}
                </p>
                <p className="sounding mt-3">{entry.stack.slice(0, 4).join("   ·   ")}</p>
              </Link>
            </li>
          );
        })}
      </ul>

      {inProgress.length ? (
        <div className="mt-16">
          <h3
            className="ui mb-1 pb-3 text-[1.1rem] font-semibold"
            style={{ borderBottom: "1px solid var(--fg)" }}
          >
            Still in the workshop
          </h3>
          <ul
            className="grid gap-x-14 md:grid-cols-2"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {inProgress.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={`/work/${entry.slug}`}
                  className="group block py-6"
                  style={{ borderBottom: "1px solid var(--rule)" }}
                >
                  <div className="flex items-baseline justify-between gap-5">
                    <h4 className="ui text-[1.2rem] font-semibold transition-colors duration-300 group-hover:text-[var(--accent-ink)]">
                      {entry.name}
                    </h4>
                    <span className="sounding shrink-0">{entry.status}</span>
                  </div>
                  <p className="prose mt-2" style={{ maxWidth: "44ch", fontSize: "0.975rem" }}>
                    {entry.line}
                  </p>
                  <p className="sounding mt-3">{entry.stack.join("   ·   ")}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

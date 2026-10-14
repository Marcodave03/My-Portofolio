import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllEntries, getEntry } from "@/lib/queries";
import Pill from "@/components/Pill";

export function generateStaticParams() {
  return getAllEntries().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = getEntry(slug);
  if (!found) return {};
  return {
    title: found.entry.name,
    description: found.entry.line,
    openGraph: {
      title: `${found.entry.name} — Marco Davincent Dermawan`,
      description: found.entry.line,
      images: found.entry.image ? [found.entry.image] : undefined,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getEntry(slug);
  if (!found) notFound();

  const { entry, register } = found;

  // Neighbours within the same register, so "next" stays meaningful.
  const siblings = register.entries;
  const i = siblings.findIndex((e) => e.slug === entry.slug);
  const next = siblings[(i + 1) % siblings.length];

  return (
    <article className="mx-auto max-w-[88rem] px-5 pt-8 sm:px-8 sm:pt-12 lg:px-12">
      <Link
        href={`/#${register.id}`}
        className="sounding trace inline-block"
        style={{ color: "var(--fg-soft)" }}
      >
        {register.title}
      </Link>

      <header className="mt-6 grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <div>
          <h1 className="expanded" style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}>
            {entry.name}
          </h1>
          <p
            className="prose mt-6"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "var(--fg)", maxWidth: "40ch" }}
          >
            {entry.line}
          </p>
        </div>

        <dl className="self-end" style={{ margin: 0 }}>
          {[
            { term: "Year", detail: entry.year },
            { term: "Role", detail: entry.role },
            ...(entry.status ? [{ term: "Status", detail: entry.status }] : []),
            { term: "Built with", detail: entry.stack.join(", ") },
          ].map((row) => (
            <div
              key={row.term}
              className="flex gap-5 py-2.5"
              style={{ borderTop: "1px solid var(--rule)" }}
            >
              <dt className="sounding shrink-0" style={{ minWidth: "5.5rem" }}>
                {row.term}
              </dt>
              <dd className="ui text-[0.95rem]" style={{ margin: 0 }}>
                {row.detail}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {entry.links.length ? (
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {entry.links.map((link, n) => (
            <Pill key={link.url} href={link.url} size="sm" arrow={n === 0} external>
              {link.label}
            </Pill>
          ))}
        </div>
      ) : null}

      {entry.image ? (
        <div
          className="relative mt-14 overflow-hidden"
          style={{ aspectRatio: "16 / 9", background: "var(--fill)" }}
        >
          <Image
            src={entry.image}
            alt={`${entry.name} — project mockup`}
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 88rem"
            className="object-cover"
          />
        </div>
      ) : null}

      {entry.body ? (
        <div className="mt-16 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div className="prose" style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)" }}>
            {entry.body.map((para, n) => (
              <p key={n} style={{ marginTop: n === 0 ? 0 : "1.15em" }}>
                {para}
              </p>
            ))}
          </div>

          {entry.facts ? (
            <dl className="self-start" style={{ margin: 0 }}>
              {entry.facts.map((fact) => (
                <div
                  key={fact.term}
                  className="py-3.5"
                  style={{ borderTop: "1px solid var(--rule)" }}
                >
                  <dt className="sounding">{fact.term}</dt>
                  <dd className="ui mt-1 text-[0.95rem]" style={{ margin: 0 }}>
                    {fact.detail}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      ) : null}

      {entry.gallery?.length ? (
        <div className="mt-20">
          <h2
            className="ui mb-6 pb-3 text-[1.2rem] font-semibold"
            style={{ borderBottom: "1px solid var(--rule)" }}
          >
            Screens
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-7">
            {entry.gallery.map((src, n) => (
              <div
                key={src}
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "16 / 10",
                  background: "var(--fill)",
                  border: "1px solid var(--rule)",
                }}
              >
                {/* Contained, not cropped: these are interface screens, and
                    cutting one in half hides the thing being shown. */}
                <Image
                  src={src}
                  alt={`${entry.name} — screen ${n + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 44vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Next in this register */}
      <nav
        className="mt-24 pt-8"
        style={{ borderTop: "2px solid var(--fg)" }}
        aria-label="Next project"
      >
        <Link href={`/work/${next.slug}`} className="group block">
          <span className="sounding">Next in {register.title.toLowerCase()}</span>
          <h2
            className="expanded mt-3 transition-colors duration-300 group-hover:text-[var(--accent-ink)]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            {next.name}
          </h2>
          <p className="prose mt-3" style={{ maxWidth: "48ch" }}>
            {next.line}
          </p>
        </Link>
      </nav>
    </article>
  );
}

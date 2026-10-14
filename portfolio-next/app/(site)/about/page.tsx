import type { Metadata } from "next";
import {
  getCareer,
  getSkills,
  getTech,
  getRegisters,
  getRecognition,
} from "@/lib/queries";
import Pill from "@/components/Pill";
import SectionBanner from "@/components/SectionBanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Marco Davincent Dermawan — full-stack developer and designer from Jakarta. Six ventures, a web studio, and work for a bank and a student organisation of hundreds.",
};

/** The first year anything on record happened. */
function firstYear(values: string[]): number {
  const years = values
    .map((v) => Number((v.match(/\d{4}/) ?? [])[0]))
    .filter((n) => Number.isFinite(n) && n > 1990);
  return years.length ? Math.min(...years) : new Date().getFullYear();
}

export default function About() {
  const career = getCareer();
  const skills = getSkills();
  const stackList = getTech();
  const registers = getRegisters();
  const recognition = getRecognition();

  const ventures = registers.find((r) => r.id === "ventures")?.entries.length ?? 0;
  const projects = registers.reduce((n, r) => n + r.entries.length, 0);
  const since = firstYear([
    ...career.map((c) => c.year),
    ...recognition.map((r) => r.year),
  ]);

  // A definition list, the same device the project pages use for their
  // metadata — it gives the header a right-hand column without a portrait.
  const facts = [
    { term: "Based in", detail: "Jakarta, Indonesia — GMT+7" },
    { term: "Building since", detail: String(since) },
    { term: "Ventures", detail: String(ventures) },
    { term: "Projects on record", detail: String(projects) },
    { term: "Placings", detail: String(recognition.length) },
  ];

  return (
    <div className="mx-auto max-w-[88rem] px-5 pt-6 sm:px-8 sm:pt-10 lg:px-12">
      <SectionBanner text="ABOUT" as="h1" />

      <header className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]">
        <div>
          <p
            className="prose"
            style={{
              fontSize: "clamp(1.35rem, 2.6vw, 2rem)",
              lineHeight: 1.55,
              color: "var(--fg)",
              maxWidth: "26ch",
            }}
          >
            I build the whole thing — the research, the interface, the API
            behind it, and the conversation with whoever is paying for it.
          </p>

          <div className="prose mt-7" style={{ maxWidth: "56ch" }}>
            <p>
              It started with student organisation platforms: competition sites
              and intake systems that had to work on the day, for hundreds of
              people, with no second attempt. That turned into client sites, and
              then into products of my own.
            </p>
            <p>
              Today I run six ventures — an AI avatar platform, point-of-sale
              software for Indonesian small businesses, indoor mall navigation, a
              trading bot, a quantitative market terminal, and the studio that
              funds them all.
            </p>
            <p>
              The common thread is wayfinding. Nearly everything I build exists
              to get someone from where they are to the thing they were actually
              looking for.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Pill href="/contact" arrow>
              Get in touch
            </Pill>
            <Pill href="/marco-davincent-dermawan-cv.pdf" size="sm" download external>
              CV
            </Pill>
          </div>
        </div>

        <dl className="self-start lg:pt-3" style={{ margin: 0 }}>
          {facts.map((f) => (
            <div
              key={f.term}
              className="flex items-baseline justify-between gap-5 py-2.5"
              style={{ borderTop: "1px solid var(--rule)" }}
            >
              <dt className="sounding shrink-0">{f.term}</dt>
              <dd
                className="ui text-right text-[0.95rem]"
                style={{ margin: 0, color: "var(--fg)" }}
              >
                {f.detail}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* What I do */}
      <section className="mt-24 sm:mt-32" aria-labelledby="skills-heading">
        <h2
          className="expanded pt-4"
          id="skills-heading"
          style={{ fontSize: "var(--text-register)", borderTop: "2px solid var(--fg)" }}
        >
          What I do
        </h2>

        <div className="mt-10 grid gap-x-16 gap-y-0 md:grid-cols-2">
          {skills.map((s) => (
            <div key={s.id} className="py-7" style={{ borderTop: "1px solid var(--rule)" }}>
              <h3 className="ui text-[1.35rem] font-semibold">{s.area}</h3>
              <p className="prose mt-3" style={{ maxWidth: "48ch", fontSize: "1rem" }}>
                {s.detail}
              </p>
            </div>
          ))}
        </div>

        <h3
          className="ui mt-14 mb-5 pb-2 text-[1.05rem] font-semibold"
          style={{ borderBottom: "1px solid var(--rule)" }}
        >
          What I build with
        </h3>
        <ul
          className="flex flex-wrap gap-x-2.5 gap-y-2.5"
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {stackList.map((tech) => (
            <li
              key={tech}
              className="ui text-[0.85rem]"
              style={{
                border: "1px solid var(--rule)",
                color: "var(--fg-soft)",
                padding: "0.4rem 0.85rem",
              }}
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {/* Where I have worked */}
      <section className="mt-24 sm:mt-32" aria-labelledby="career-heading">
        <h2
          className="expanded pt-4"
          id="career-heading"
          style={{ fontSize: "var(--text-register)", borderTop: "2px solid var(--fg)" }}
        >
          Where I have worked
        </h2>

        <ol className="mt-10" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {career.map((job) => (
            <li
              key={job.id}
              className="grid gap-x-12 gap-y-3 py-8 lg:grid-cols-[6.5rem_minmax(0,22rem)_minmax(0,1fr)]"
              style={{ borderTop: "1px solid var(--rule)" }}
            >
              <div
                className="sounding lg:pt-1.5"
                style={{ fontSize: "0.9rem", color: "var(--fg)" }}
              >
                {job.year}
              </div>
              <div>
                <h3 className="ui text-[1.2rem] font-semibold">{job.role}</h3>
                <div className="sounding mt-1">{job.org}</div>
              </div>
              <p className="prose" style={{ maxWidth: "62ch", fontSize: "1rem" }}>
                {job.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

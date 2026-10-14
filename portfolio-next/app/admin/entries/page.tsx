import Link from "next/link";
import { adminListEntries, REGISTERS } from "@/lib/queries";

export default async function EntriesList({
  searchParams,
}: {
  searchParams: Promise<{ register?: string; saved?: string }>;
}) {
  const { register, saved } = await searchParams;
  const active = REGISTERS.find((r) => r.id === register)?.id;
  const rows = adminListEntries(active);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="expanded" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
            Projects
          </h1>
          <p className="prose mt-3" style={{ fontSize: "1rem", maxWidth: "52ch" }}>
            Ventures, client sites, AI work, organisation systems and hackathon
            entries all live here — the register decides where one appears.
          </p>
        </div>
        <Link
          href="/admin/entries/new"
          className="ui rounded-full px-5 py-2.5 text-[0.95rem] font-semibold"
          style={{
            border: "2px solid var(--fg)",
            background: "var(--accent)",
            color: "var(--on-accent)",
          }}
        >
          Add a project
        </Link>
      </div>

      {saved ? (
        <p
          className="ui mt-6 px-4 py-3 text-[0.92rem]"
          style={{ background: "var(--accent)", color: "var(--on-accent)" }}
          role="status"
        >
          Saved “{saved}”.
        </p>
      ) : null}

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Filter by register">
        <FilterLink href="/admin/entries" label="All" on={!active} />
        {REGISTERS.map((r) => (
          <FilterLink
            key={r.id}
            href={`/admin/entries?register=${r.id}`}
            label={r.title}
            on={active === r.id}
          />
        ))}
      </nav>

      <ul className="mt-8" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {rows.length === 0 ? (
          <li className="prose py-8" style={{ fontSize: "1rem" }}>
            Nothing here yet. Add your first project.
          </li>
        ) : null}

        {rows.map((e) => (
          <li key={e.id}>
            <Link
              href={`/admin/entries/${e.id}`}
              className="group grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto]"
              style={{ borderBottom: "1px solid var(--rule)" }}
            >
              <div>
                <span className="ui text-[1.05rem] font-semibold transition-colors duration-200 group-hover:text-[var(--accent-ink)]">
                  {e.name}
                </span>
                {!e.published ? (
                  <span
                    className="ui ml-2 px-1.5 py-0.5 text-[0.68rem] font-medium"
                    style={{ border: "1px solid var(--fg-faint)", color: "var(--fg-soft)" }}
                  >
                    Draft
                  </span>
                ) : null}
                <div className="sounding mt-0.5">{e.register}</div>
              </div>
              <p className="prose" style={{ fontSize: "0.92rem", maxWidth: "58ch" }}>
                {e.line}
              </p>
              <div className="sounding sm:text-right">{e.year}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FilterLink({ href, label, on }: { href: string; label: string; on: boolean }) {
  return (
    <Link
      href={href}
      className="ui px-3 py-1.5 text-[0.85rem]"
      style={{
        border: `2px solid ${on ? "var(--fg)" : "var(--rule)"}`,
        background: on ? "var(--accent)" : "transparent",
        color: on ? "var(--on-accent)" : "var(--fg-soft)",
      }}
    >
      {label}
    </Link>
  );
}

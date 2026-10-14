import Link from "next/link";
import { counts, REGISTERS, adminListEntries } from "@/lib/queries";

export default function AdminHome() {
  const c = counts();
  const all = adminListEntries();

  const tiles = [
    { label: "Projects", n: c.entries, sub: `${c.published} published`, href: "/admin/entries" },
    { label: "Certificates", n: c.recognition, sub: "placings and awards", href: "/admin/recognition" },
    { label: "Experience", n: c.career, sub: "roles", href: "/admin/career" },
    { label: "Skills", n: c.skills, sub: "areas", href: "/admin/about" },
  ];

  return (
    <div>
      <h1 className="expanded" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
        Overview
      </h1>
      <p className="prose mt-4" style={{ maxWidth: "54ch", fontSize: "1rem" }}>
        Everything the site shows is stored in <code>data/portfolio.db</code>.
        Changes appear on the site as soon as you save.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="group block p-5"
            style={{ border: "2px solid var(--fg)" }}
          >
            <div
              className="expanded transition-colors duration-200 group-hover:text-[var(--accent-ink)]"
              style={{ fontSize: "2.4rem" }}
            >
              {t.n}
            </div>
            <div className="ui mt-1 text-[1rem] font-semibold">{t.label}</div>
            <div className="sounding mt-0.5">{t.sub}</div>
          </Link>
        ))}
      </div>

      <h2
        className="ui mt-14 mb-4 pb-2 text-[1.2rem] font-semibold"
        style={{ borderBottom: "1px solid var(--rule)" }}
      >
        Projects by register
      </h2>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {REGISTERS.map((r) => {
          const n = all.filter((e) => e.register === r.id).length;
          return (
            <li key={r.id}>
              <Link
                href={`/admin/entries?register=${r.id}`}
                className="group flex items-baseline justify-between gap-6 py-3"
                style={{ borderBottom: "1px solid var(--rule)" }}
              >
                <span className="ui text-[1rem] transition-colors duration-200 group-hover:text-[var(--accent-ink)]">
                  {r.title}
                </span>
                <span className="sounding">{n}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <Link
          href="/admin/entries/new"
          className="ui inline-block rounded-full px-6 py-3 text-[0.98rem] font-semibold"
          style={{
            border: "2px solid var(--fg)",
            background: "var(--accent)",
            color: "var(--on-accent)",
          }}
        >
          Add a project
        </Link>
      </div>
    </div>
  );
}

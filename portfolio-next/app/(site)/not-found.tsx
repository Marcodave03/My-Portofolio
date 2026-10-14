import Link from "next/link";
import { REGISTERS } from "@/lib/registers";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[88rem] px-5 pt-16 pb-10 sm:px-8 sm:pt-24 lg:px-12">
      <h1 className="expanded" style={{ fontSize: "var(--text-hero)", maxWidth: "12ch" }}>
        No route here
      </h1>
      <p className="prose mt-7" style={{ maxWidth: "42ch", fontSize: "1.15rem" }}>
        This page does not exist — or it moved when the site was rebuilt. The
        five registers below cover everything.
      </p>

      <ul className="mt-12 max-w-xl" style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {REGISTERS.map((r) => (
          <li key={r.id}>
            <Link
              href={`/#${r.id}`}
              className="group flex items-baseline justify-between gap-6 py-4"
              style={{ borderTop: "1px solid var(--rule)" }}
            >
              <span className="ui text-[1.2rem] font-medium transition-colors duration-300 group-hover:text-[var(--accent-ink)]">
                {r.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

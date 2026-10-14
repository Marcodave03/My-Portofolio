import Link from "next/link";
import { REGISTERS } from "@/lib/registers";
import { getProfile } from "@/lib/queries";
import Pill from "./Pill";

function elsewhereLinks(github: string) {
  return [
  { href: "/about", label: "About", external: false },
  { href: "/contact", label: "Contact", external: false },
  { href: github, label: "GitHub", external: true },
  { href: "/marco-davincent-dermawan-cv.pdf", label: "Download CV", external: true },
  ];
}

function Column({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="sounding mb-4 pb-2" style={{ borderBottom: "1px solid var(--rule)" }}>
        {heading}
      </h2>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>{children}</ul>
    </div>
  );
}

function Row({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className = "ui trace text-[0.95rem]";
  const style = { color: "var(--fg-soft)" };
  return (
    <li className="py-1.5">
      {external ? (
        <a
          href={href}
          target={href.startsWith("/") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className={className}
          style={style}
        >
          {label}
        </a>
      ) : (
        <Link href={href} className={className} style={style}>
          {label}
        </Link>
      )}
    </li>
  );
}

export default function SiteFooter() {
  const profile = getProfile();
  const elsewhere = elsewhereLinks(profile.github);
  return (
    <footer
      className="relative z-10 mt-28 sm:mt-36"
      style={{ background: "var(--bg-deep)", borderTop: "1px solid var(--rule)" }}
    >
      <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)_minmax(0,0.85fr)]">
          {/* The ask */}
          <div>
            <p
              className="expanded"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", maxWidth: "13ch" }}
            >
              Have something that needs building?
            </p>
            <p className="prose mt-5" style={{ maxWidth: "34ch", fontSize: "1rem" }}>
              Tell me what it is and who it is for. That is usually enough for me
              to say whether I am the right person.
            </p>
            <div className="mt-7">
              <Pill href={`mailto:${profile.email}`} arrow>
                {profile.email}
              </Pill>
            </div>
          </div>

          <Column heading="The work">
            {REGISTERS.map((r) => (
              <Row key={r.id} href={`/#${r.id}`} label={r.title} />
            ))}
          </Column>

          <Column heading="Elsewhere">
            {elsewhere.map((item) => (
              <Row key={item.label} {...item} />
            ))}
          </Column>
        </div>

        <div
          className="sounding mt-16 flex flex-col gap-2 pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid var(--rule)" }}
        >
          <span>
            {profile.name} — Jakarta, Indonesia (GMT+7)
          </span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}

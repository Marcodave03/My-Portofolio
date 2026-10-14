import type { Metadata } from "next";
import { getProfile } from "@/lib/queries";
import Pill from "@/components/Pill";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Marco Davincent Dermawan — full-stack development and web design from Jakarta.",
};

function routesFor(profile: { email: string; github: string }) {
  return [
  {
    label: "Email",
    detail: profile.email,
    href: `mailto:${profile.email}`,
    note: "The fastest way to reach me. I answer within a day or two.",
  },
  {
    label: "GitHub",
    detail: "Marcodave03",
    href: profile.github,
    note: "Source for the competition projects and a few of the client builds.",
  },
  {
    label: "CryptoBot",
    detail: "cryptobot.id",
    href: "https://www.cryptobot.id/",
    note: "The trading product, if that is what brought you here.",
  },
  ];
}

export default function Contact() {
  const profile = getProfile();
  const routes = routesFor(profile);
  return (
    <div className="mx-auto max-w-[88rem] px-5 pt-10 sm:px-8 sm:pt-16 lg:px-12">
      <h1 className="expanded" style={{ fontSize: "var(--text-hero)", maxWidth: "11ch" }}>
        Start a project
      </h1>

      <div className="mt-10 grid gap-14 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:gap-24">
        <div>
          <p
            className="prose"
            style={{ fontSize: "clamp(1.15rem, 2.1vw, 1.45rem)", color: "var(--fg)", maxWidth: "34ch" }}
          >
            Tell me what you are trying to build and who it is for. That is
            usually enough for me to say whether I am the right person.
          </p>
          <div className="mt-8 mb-10">
            <Pill href={`mailto:${profile.email}`} arrow>
              Email me
            </Pill>
          </div>
          <div className="prose" style={{ maxWidth: "52ch" }}>
            <p>
              I take on company profiles and catalogue sites through the studio,
              and full product builds where there is a real problem underneath.
              If you already have a developer and need the design and front end,
              that works too.
            </p>
            <p>
              Include a rough timeline and budget if you have one. If you do not,
              say so — I would rather work it out together than have you guess.
            </p>
          </div>
        </div>

        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {routes.map((r) => (
            <li key={r.label}>
              <a
                href={r.href}
                target={r.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group block py-6"
                style={{ borderTop: "1px solid var(--rule)" }}
              >
                <div className="flex items-baseline justify-between gap-6">
                  <span className="sounding">{r.label}</span>
                  <span
                    className="ui text-[1.05rem] font-medium transition-colors duration-300 group-hover:text-[var(--accent-ink)] sm:text-[1.25rem]"
                    style={{ textAlign: "right" }}
                  >
                    {r.detail}
                  </span>
                </div>
                <p className="prose mt-2.5" style={{ fontSize: "0.95rem", maxWidth: "42ch" }}>
                  {r.note}
                </p>
              </a>
            </li>
          ))}
          <li style={{ borderTop: "1px solid var(--rule)" }} className="py-6">
            <div className="sounding">Based in</div>
            <div className="ui mt-1 text-[1.05rem]">Jakarta, Indonesia — GMT+7</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

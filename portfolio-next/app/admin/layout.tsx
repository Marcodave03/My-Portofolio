import type { Metadata } from "next";
import Link from "next/link";
import { isSignedIn, isConfigured } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// The admin area reads and writes the database on every request.
export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/entries", label: "Projects" },
  { href: "/admin/recognition", label: "Certificates" },
  { href: "/admin/career", label: "Experience" },
  { href: "/admin/about", label: "About & profile" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isSignedIn())) {
    return <LoginForm configured={isConfigured()} />;
  }

  return (
    <div className="mx-auto max-w-[76rem] px-5 py-10 sm:px-8">
      <header
        className="flex flex-wrap items-center justify-between gap-4 pb-5"
        style={{ borderBottom: "2px solid var(--fg)" }}
      >
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="ui text-[1.05rem] font-semibold">Admin</span>
          <nav className="flex flex-wrap gap-x-5 gap-y-1" aria-label="Admin sections">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="ui trace text-[0.9rem]"
                style={{ color: "var(--fg-soft)" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="ui trace text-[0.9rem]"
            style={{ color: "var(--fg-soft)" }}
          >
            View site
          </Link>
          <form action={logout}>
            <button type="submit" className="ui trace text-[0.9rem]">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="py-8">{children}</div>
    </div>
  );
}

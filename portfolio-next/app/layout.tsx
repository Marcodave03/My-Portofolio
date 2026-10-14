import type { Metadata, Viewport } from "next";
import "./globals.css";

/**
 * The root layout is deliberately bare: the document shell, the theme, and
 * nothing else. The public site's header, footer and cursor live in
 * app/(site)/layout.tsx so the admin area does not inherit them.
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://marcodavincent.com"),
  title: {
    default: "Marco Davincent Dermawan — Full-stack developer and founder",
    template: "%s — Marco Davincent Dermawan",
  },
  description:
    "I build products that route people to what they need: an AI avatar platform, point-of-sale software for Indonesian small businesses, indoor mall navigation and a quantitative trading terminal. Full-stack developer, designer and founder.",
  openGraph: {
    title: "Marco Davincent Dermawan",
    description:
      "Full-stack developer and founder. Conversia, Bantoo, Conversia Map, CryptoBot, LuxQuant, and client work through the studio.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Sets the stored theme before first paint, so a reader who chose
            dark never gets a white flash on the way in. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}

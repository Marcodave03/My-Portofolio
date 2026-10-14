import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Cursor from "@/components/Cursor";
import RisingCircles from "@/components/RisingCircles";
import PageCover from "@/components/PageCover";

/** Everything the public site wears. The admin area sits outside this group. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="ui sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <RisingCircles />
      <Cursor />
      <PageCover />
      <SiteHeader />
      <main id="main" className="relative z-10">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}

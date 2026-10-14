import SectionBanner from "./SectionBanner";
import { SHORT_LABEL } from "@/lib/registers";

/**
 * The banner is the heading. An earlier version set the name twice — once
 * oversized, then again immediately below at heading size — with a rule
 * under each, which read as a stutter. The short label keeps the banner to
 * one line at every width; the blurb carries the detail.
 */
export default function RegisterHeading({
  id,
  title,
  blurb,
  count,
}: {
  id: string;
  title: string;
  blurb: string;
  count: string;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <SectionBanner
        text={(SHORT_LABEL[id] ?? title).toUpperCase()}
        as="h2"
        id={`${id}-heading`}
      />

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-12">
        <p className="prose" style={{ maxWidth: "54ch" }}>
          {blurb}
        </p>
        <div className="sounding shrink-0 sm:text-right">{count}</div>
      </div>
    </div>
  );
}

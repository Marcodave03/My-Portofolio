import type { ElementType } from "react";

/**
 * The oversized label that opens a section: the word, then a hairline
 * running off to the edge.
 *
 * This replaces an earlier version that padded the word out with typographic
 * hyphens and drifted it on scroll. At display size those hyphens rendered as
 * a row of heavy black slabs rather than a rule, and the drift clipped the
 * word on narrow screens. One line carries the same idea and holds at every
 * width.
 *
 * Pass `as` to make the banner the actual heading — used where the word would
 * otherwise be repeated by a heading directly beneath it. Left as a plain
 * `div` it is decorative, and the heading that follows is what gets announced.
 */
export default function SectionBanner({
  text,
  as,
  id,
}: {
  text: string;
  as?: "h1" | "h2";
  id?: string;
}) {
  const Tag: ElementType = as ?? "div";
  const decorative = !as;

  return (
    <Tag
      className="flex items-center gap-4 sm:gap-7"
      id={id}
      aria-hidden={decorative || undefined}
      style={{ margin: 0 }}
    >
      <span
        className="expanded shrink-0"
        style={{
          fontSize: "clamp(2.1rem, 7.4vw, 6.25rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.035em",
        }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="min-w-0 flex-1"
        style={{ height: "3px", background: "var(--fg)" }}
      />
    </Tag>
  );
}

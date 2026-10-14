import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  /** Show the sliding circle-and-arrow. Off for compact, secondary pills. */
  arrow?: boolean;
  /** Sits on the page as a filled button rather than an outline. */
  filled?: boolean;
  size?: "sm" | "md";
  download?: boolean;
  external?: boolean;
};

/**
 * The pill from the original portfolio: a black hairline capsule that
 * fills sky-blue from the left on hover, while a black disc carrying an
 * arrow slides across to the far edge and tips up 45°.
 */
export default function Pill({
  href,
  children,
  arrow = false,
  filled = false,
  size = "md",
  download,
  external,
}: Props) {
  const pad = size === "sm" ? "0.55rem 1.3rem" : "0.8rem 1.7rem";
  const text = size === "sm" ? "0.95rem" : "1.1rem";
  const disc = size === "sm" ? 26 : 32;

  const inner = (
    <>
      {/* the fill */}
      <span
        aria-hidden
        className="pill-fill absolute inset-y-0 left-0 w-0 transition-[width] duration-500 ease-out"
        style={{ background: "var(--accent)" }}
      />
      <span
        className="relative z-10 block text-center"
        style={{ fontSize: text, paddingLeft: arrow ? `${disc + 10}px` : undefined }}
      >
        {children}
      </span>
      {arrow ? (
        <span
          aria-hidden
          className="pill-disc absolute top-1/2 z-10 flex items-center justify-center rounded-full transition-[left,transform] duration-500 ease-out"
          style={{
            width: disc,
            height: disc,
            left: "6px",
            marginTop: -disc / 2,
            background: "var(--fg)",
            color: "var(--bg)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h13M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : null}
    </>
  );

  const className = "pill group relative inline-block overflow-hidden rounded-full ui";
  const style = {
    border: "2px solid var(--fg)",
    background: filled ? "var(--accent)" : "transparent",
    color: "var(--fg)",
    padding: pad,
    paddingRight: arrow ? `${disc + 18}px` : undefined,
    lineHeight: 1.2,
    // The disc travels to the far edge on hover; its size drives the stop.
    ["--disc" as string]: `${disc}px`,
  } as React.CSSProperties;

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        download={download}
        target={href.startsWith("mailto:") || download ? undefined : "_blank"}
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style} download={download}>
      {inner}
    </Link>
  );
}

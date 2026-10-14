/**
 * The rising circles from the original background. Deliberately thinned
 * out — the old one drew 270 nodes, which is a lot of compositing for
 * decoration. Twelve at hairline weight reads the same and costs nothing.
 */
const circles = [
  { left: "8%", size: 22, delay: 0, duration: 24 },
  { left: "16%", size: 80, delay: 3, duration: 30 },
  { left: "24%", size: 15, delay: 8, duration: 20 },
  { left: "33%", size: 60, delay: 1, duration: 27 },
  { left: "41%", size: 28, delay: 12, duration: 22 },
  { left: "50%", size: 110, delay: 5, duration: 34 },
  { left: "58%", size: 18, delay: 15, duration: 19 },
  { left: "66%", size: 45, delay: 2, duration: 29 },
  { left: "74%", size: 25, delay: 10, duration: 23 },
  { left: "82%", size: 140, delay: 6, duration: 36 },
  { left: "90%", size: 20, delay: 18, duration: 21 },
  { left: "96%", size: 55, delay: 9, duration: 31 },
];

export default function RisingCircles() {
  return (
    <ul className="circles" aria-hidden>
      {circles.map((c, i) => (
        <li
          key={i}
          style={{
            left: c.left,
            width: `${c.size}px`,
            height: `${c.size}px`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        />
      ))}
    </ul>
  );
}

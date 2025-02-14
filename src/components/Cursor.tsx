import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../index.css";

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    gsap.set([cursorDot, cursorOutline], { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(cursorOutline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed top-0 left-0 w-full h-full z-[9999]">
      <div ref={cursorDotRef} className="cursor-dot" data-cursor-dot></div>
      <div ref={cursorOutlineRef} className="cursor-outline" data-cursor-outline></div>
    </div>
  );
};

export default CustomCursor;

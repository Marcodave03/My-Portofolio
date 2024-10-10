import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../index.css'; 

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorOutline, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(cursorOutline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" data-cursor-dot></div>
      <div ref={cursorOutlineRef} className="cursor-outline" data-cursor-outline></div>
    </>
  );
};

export default CustomCursor;
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css'; // Create a separate CSS file for styling the cursor

const CustomCursor: React.FC = () => {
  // Refs for the cursor elements
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the cursor elements exist
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    // GSAP animations for cursor dot and outline
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorOutline, { xPercent: -50, yPercent: -50 });

    // Define the animation to follow the mouse
    const onMouseMove = (e: MouseEvent) => {
      // Smoothly move the cursor dot with the mouse
      gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      
      // Move the cursor outline with a slight delay
      gsap.to(cursorOutline, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Add event listener for mouse movement
    window.addEventListener('mousemove', onMouseMove);

    // Cleanup the event listener on component unmount
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
// TextAnimation.tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextAnimationProps {
  text: string; // Text to animate
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text }) => {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      // GSAP animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <div className="text-container">
      <h1 ref={textRef} className="animate-text">
        {text}
      </h1>
    </div>
  );
};

export default TextAnimation;

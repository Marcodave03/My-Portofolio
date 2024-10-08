// src/utils/gsapAnimation.ts
import { gsap } from 'gsap';

export const pageTransitionIn = (targetText: string, onComplete?: () => void): void => {
  const tl = gsap.timeline({
    onComplete: () => {
      console.log("Transition In Complete");
      onComplete && onComplete();
    },
  });

  // Animation sequence for transitioning in the cover
  tl.set(".page-cover", { display: 'block' })
    .fromTo(
      ".page-cover",
      { y: "100%" }, // Start from the bottom
      { y: "0%", duration: 1, ease: "power3.inOut" } // Move up to cover the screen
    )
    .fromTo(
      ".cover-text",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    )
    .set(".cover-text", { textContent: targetText });
};

export const pageTransitionOut = (onComplete?: () => void): void => {
  const tl = gsap.timeline({
    onComplete: () => {
      console.log("Transition Out Complete");
      onComplete && onComplete();
    },
  });

  // Animation sequence for transitioning out the cover
  tl.fromTo(
    ".page-cover",
    { y: "0%" }, // Start from the current position (covering the screen)
    { y: "-100%", duration: 1, ease: "power3.inOut" } // Move up to hide the cover
  )
    .set(".page-cover", { display: 'none' }); // Hide the cover after transition
};

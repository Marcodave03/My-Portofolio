import { gsap } from "gsap";

// Page transition in animation (triggered when leaving the current page)
export const pageTransitionIn = (targetText: string, onComplete?: () => void): void => {
  const tl = gsap.timeline({
    onComplete: () => {
      console.log("Transition In Complete");
      onComplete && onComplete();
    },
  });

  tl.set(".page-cover", { display: "block" })
    .fromTo(
      ".page-cover",
      { y: "100%" }, // Start off-screen at the bottom
      { y: "0%", duration: 1, ease: "power3.inOut" } // Animate upwards to full visibility
    )
    .fromTo(
      ".cover-text",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    )
    .set(".cover-text", { textContent: targetText }); // Set cover text
};

// Page transition out animation (triggered when entering the new page)
export const pageTransitionOut = (onComplete?: () => void): void => {
  const tl = gsap.timeline({
    onComplete: () => {
      console.log("Transition Out Complete");
      onComplete && onComplete();
    },
  });

  tl.fromTo(
    ".page-cover",
    { y: "0%" }, // Start at full visibility
    { y: "-100%", duration: 1, ease: "power3.inOut" } // Animate off-screen (upwards)
  ).set(".page-cover", { display: "none" }); // Hide cover after animation ends
};

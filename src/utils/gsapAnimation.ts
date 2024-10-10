import { gsap } from 'gsap';

export const pageTransitionIn = (targetText: string, onComplete?: () => void): void => {
  const tl = gsap.timeline({
    onComplete: () => {
      console.log("Transition In Complete");
      if (onComplete) onComplete();
    },
  });


  tl.set(".page-cover", { display: 'block' })
    .fromTo(
      ".page-cover",
      { y: "100%" }, 
      { y: "0%", duration: 0.8, ease: "power3.inOut" }
    )
    .set(".cover-text", { textContent: targetText }) 
    .fromTo(
      ".cover-text",
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" } 
    );
};

export const pageTransitionOut = (onComplete?: () => void): void => {
  const tl = gsap.timeline({
    onComplete: () => {
      console.log("Transition Out Complete");
      if (onComplete) onComplete();
    },
  });


  tl.fromTo(
    ".page-cover",
    { y: "0%" }, 
    { y: "-100%", duration: 0.8, ease: "power3.inOut" } 
  )
    .set(".page-cover", { display: 'none' });
};


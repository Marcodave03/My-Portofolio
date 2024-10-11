import { gsap } from "gsap";

export const pageTransitionIn = (
  targetText: string,
  onComplete?: () => void
): void => {
  const tl = gsap.timeline({
    onComplete: () => {
      console.log("Transition In Complete");
      if (onComplete) onComplete();
    },
  });

  if (targetText === "Home") {
    tl.set(".page-cover", { display: "block" })
      .fromTo(
        ".page-cover",
        { y: "100%" },
        { y: "0%", duration: 0.8, ease: "power3.inOut" }
      )
      .set(".cover-text", { textContent: "ANEHH KAU " })
      .fromTo(
        ".cover-text",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );
  } else {
    tl.set(".page-cover", { display: "block" })
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
  }
};

// export const pageHomeTransition = (targetText: string, setLoadingPercentage: (value: number) => void, onComplete?: () => void): void => {
//   const tl = gsap.timeline({
//     onComplete: () => {
//       console.log("Transition In Complete");
//       if (onComplete) onComplete();
//     },
//   });

//   const loadingScreen = document.querySelector(".splash-screen") as HTMLElement;

//   if (loadingScreen) {
//     loadingScreen.classList.remove("hidden"); // Show loading screen

//     // Initialize loading percentage
//     setLoadingPercentage(0); // Reset percentage to 0

//     // Start loading animation
//     gsap.to(".fill-button", {
//       width: "100%",
//       duration: 2,
//       ease: "power2.out",
//       onUpdate: () => {
//         const width = gsap.getProperty(".fill-button", "width");
//         const totalWidth = document.querySelector(".relative")?.clientWidth || 0;
//         const progress = Math.min((width / totalWidth) * 100, 100);
//         const percentageText = `${Math.floor(progress)}%`; // Create percentage text
//         setLoadingPercentage(Math.floor(progress)); // Update loading percentage

//         // Update the cover text with the loading percentage
//         gsap.set(".cover-text", { textContent: percentageText });
//       },
//       onComplete: () => {
//         // Hide loading screen after animation
//         loadingScreen.classList.add("hidden");

//         // Trigger transition out
//         tl.to(".page-cover", {
//           y: "-100%",
//           duration: 0.8,
//           ease: "power3.inOut",
//           onComplete: () => {
//             // Hide the cover after the transition out
//             tl.set(".page-cover", { display: 'none' });
//           }
//         });

//         // Call the onComplete callback if provided
//         if (onComplete) onComplete();
//       }
//     });

//     // Transition In Sequence
//     tl.set(".page-cover", { display: 'block' })
//       .fromTo(
//         ".page-cover",
//         { y: "100%" },
//         { y: "0%", duration: 0.8, ease: "power3.inOut" }
//       )
//       .set(".cover-text", { textContent: "0%" }) // Set initial text to "0%"
//       .fromTo(
//         ".cover-text",
//         { opacity: 0, scale: 0.8 },
//         { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
//       );
//   }
// };

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
  ).set(".page-cover", { display: "none" });
};

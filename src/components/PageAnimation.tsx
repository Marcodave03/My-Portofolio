// src/components/PageTransition.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { pageTransitionIn, pageTransitionOut } from "../utils/gsapAnimation";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextContent, setNextContent] = useState<React.ReactNode>(children); // State to store next content

  useEffect(() => {
    const targetText = location.pathname.substring(1).toUpperCase() || "HOME";
    const coverTextElement = document.querySelector(".cover-text");

    if (coverTextElement) {
      coverTextElement.textContent = targetText; // Update text immediately
    }

    // Start the page transition
    setIsAnimating(true);

    // Set next content before the transition in
    setNextContent(children); // Update the next content

    // Trigger the transition in animation
    pageTransitionIn(targetText, () => {
      // Start the transition out
      pageTransitionOut(() => {
        setIsAnimating(false); // Hide the cover once transition out is complete
      });
    });
  }, [location, children]); // Add children to the dependency array

  return (
    <div className="page-container relative">
      {/* Page Cover Element */}
      <div
        className={`page-cover fixed inset-0 z-50 bg-black text-white flex items-center justify-center ${
          isAnimating ? "block" : "hidden"
        }`}
      >
        <div className="cover-text text-4xl font-bold">LOADING...</div>
      </div>

      {/* Render the old children (current page) */}
      <div
        className={`page-content transition-opacity duration-500 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>

      {/* Render the new children (next page) */}
      <div
        className={`page-content transition-opacity duration-500 absolute inset-0 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      >
        {nextContent}
      </div>
    </div>
  );
};

export default PageTransition;

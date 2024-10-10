import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { pageTransitionIn, pageTransitionOut } from "../utils/gsapAnimation";

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [nextContent, setNextContent] = useState<React.ReactNode>(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetText, setTargetText] = useState("LOADING...");
  const animationInProgress = useRef(false); // Track if an animation is in progress
  const coverTextRef = useRef(null);
  

  useEffect(() => {
    // setTargetText(location.pathname.substring(1).toUpperCase() || "HOME");
    // Only proceed if not already animating
    if (!animationInProgress.current) {
      animationInProgress.current = true; // Set the animation flag

      // Update the next content
      setNextContent(children);

      // Start the page transition
      pageTransitionOut(() => {
        setIsAnimating(false); 
        animationInProgress.current = false; 
      });
    }


  }, [location, children]);

  return (
    <div className="page-container relative">
      {/* Page Cover Element */}
      <div
        className={`page-cover fixed inset-0 z-50 flex items-center justify-center 
          ${isAnimating ? "flex" : "hidden"
        }`}
      >
        <div className="cover-text text-4xl font-bold" ref={coverTextRef}>{targetText}</div> 
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

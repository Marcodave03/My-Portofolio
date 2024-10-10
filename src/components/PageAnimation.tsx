import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { pageTransitionOut } from "../utils/gsapAnimation";

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [nextContent, setNextContent] = useState<React.ReactNode>(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [targetText] = useState("LOADING...");
  const animationInProgress = useRef(false); 
  const coverTextRef = useRef(null);
  

  useEffect(() => {
    if (!animationInProgress.current) {
      animationInProgress.current = true; 

      setNextContent(children);

      pageTransitionOut(() => {
        setIsAnimating(false); 
        animationInProgress.current = false; 
      });
    }


  }, [location, children]);

  return (
    <div className="page-container relative">
      <div
        className={`page-cover fixed inset-0 z-50 flex items-center justify-center 
          ${isAnimating ? "flex" : "hidden"
        }`}
      >
        <div className="cover-text text-4xl font-bold" ref={coverTextRef}>{targetText}</div> 
      </div>


      <div
        className={`page-content transition-opacity duration-500 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>

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

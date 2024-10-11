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
        className={`page-cover fixed inset-0 z-[70] flex items-center justify-center 
          ${isAnimating ? "flex" : "hidden"
        }`}
      >
        <div className="cover-text text-6xl" style={{fontSize:"100px"}} ref={coverTextRef}>{targetText}</div> 
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

// import React, { useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { pageTransitionOut } from "../utils/gsapAnimation";
// import gsap from "gsap"; // GSAP for animation

// const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [nextContent, setNextContent] = useState<React.ReactNode>(children);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [loadingPercentage, setLoadingPercentage] = useState(0);
//   const animationInProgress = useRef(false); 

//   useEffect(() => {
//     // Check if navigating to Home and start loading animation
//     if (location.pathname === "/") {
//       setLoadingPercentage(0);
//       gsap.to(".fill-button", {
//         width: "100%",
//         duration: 2,
//         ease: "power2.out",
//         onUpdate: () => {
//           const width = gsap.getProperty(".fill-button", "width");
//           const totalWidth = document.querySelector(".relative")?.clientWidth || 0; 
//           const progress = Math.min((width / totalWidth) * 100, 100); 
//           setLoadingPercentage(Math.floor(progress));
//         },
//         onComplete: () => {
//           navigate("/home"); // Navigate to the home page when loading is complete
//         }
//       });
//     } else {
//       // Trigger page transition
//       if (!animationInProgress.current) {
//         animationInProgress.current = true; 
//         setNextContent(children);
        
//         pageTransitionOut(() => {
//           setIsAnimating(false); 
//           animationInProgress.current = false; 
//         });
//       }
//     }
//   }, [location, children, navigate]);

//   return (
//     <div className="page-container relative">
//       {location.pathname === "/" ? ( // Display splash screen if on the root path
//         <div className="h-screen w-screen flex items-center justify-center text-white z-51" style={{ backgroundColor: '#333333' }}>
//           <div className="text-center">
//             <h1 className="text-4xl mb-6">{loadingPercentage}% Loading</h1> 
//             <div className="relative w-[20vw] h-2 border-2 border-white rounded-full overflow-hidden">
//               <div className="absolute top-0 left-0 h-full bg-white fill-button" style={{ width: "0%" }}></div>
//               <div className="relative z-10 h-full flex items-center justify-center">
//                 <span className="text-lg">Loading...</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className={`page-cover fixed inset-0 z-50 flex items-center justify-center ${isAnimating ? "flex" : "hidden"}`}>
//           <div className="cover-text text-4xl font-bold">LOADING...</div> 
//         </div>
//       )}

//       <div className={`page-content transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
//         {children}
//       </div>

//       <div className={`page-content transition-opacity duration-500 absolute inset-0 ${isAnimating ? "opacity-100" : "opacity-0"}`}>
//         {nextContent}
//       </div>
//     </div>
//   );
// };

// export default PageTransition;


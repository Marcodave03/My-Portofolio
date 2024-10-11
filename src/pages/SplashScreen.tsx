import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap"; // You can use GSAP for button animation

const SplashScreen: React.FC = () => {
  const [isButtonFilling, setIsButtonFilling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically start the button animation after a delay
    const timeout = setTimeout(() => {
      setIsButtonFilling(true);
    }, 1000); // Delay before starting the button fill

    return () => clearTimeout(timeout); 
  }, []);

  useEffect(() => {
    if (isButtonFilling) {
      gsap.to(".fill-button", {
        width: "100%",
        duration: 2,
        ease: "power2.out",
        onComplete: () => {
          navigate("/home");
        },
      });
    }
  }, [isButtonFilling, navigate]);

  return (
    <div className="splash-screen h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl mb-6">Welcome to Our App</h1>

        <div className="relative w-64 h-12 border-2 border-white rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-blue-500 fill-button" style={{ width: "0%" }}></div>
          <div className="relative z-10 h-full flex items-center justify-center">
            <span className="text-lg">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

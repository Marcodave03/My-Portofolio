import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type TransitionProps = {
  Component: React.ComponentType;
  navigateTo?: string; // The path to navigate to after animation
};

const Transition: React.FC<TransitionProps> = ({ Component, navigateTo }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Trigger exit animation when the component mounts
    const timer = setTimeout(() => {
      setIsExiting(true);
      setShowText(true); // Show the animated text after a short delay
    }, 1000); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isExiting && navigateTo) {
      const timer = setTimeout(() => {
        navigate(navigateTo); // Navigate after exit animation
      }, 500); // Delay navigation until after the exit animation

      return () => clearTimeout(timer);
    }
  }, [isExiting, navigateTo, navigate]);

  return (
    <motion.div>
      {isExiting ? (
        <>
          <motion.div
            className="slide-out"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top" }}
          >
            {showText && (
              <motion.div
                className="animated-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-center text-white">Navigating to New Page...</h1>
              </motion.div>
            )}
          </motion.div>
        </>
      ) : (
        <motion.div
          className="slide-in"
          key="entry"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }} // Optional: add exit animation
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
        >
          <Component />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Transition;

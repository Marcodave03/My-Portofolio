import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type TransitionProps = {
  Component: React.ComponentType; 
  navigateTo?: string; 
};

const Transition: React.FC<TransitionProps> = ({ Component, navigateTo }) => {
  const [isEntering, setIsEntering] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEntering && navigateTo) {
      const exitTimer = setTimeout(() => {
        navigate(navigateTo); 
      }, 800); 
      return () => clearTimeout(exitTimer);
    }
  }, [isEntering, navigateTo, navigate]);

  const handleExitAnimation = () => {
    setIsEntering(false); 
  };

  return (
    <motion.div >
      {isEntering ? (
        <motion.div
          className="slide-in"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "bottom" }}
        >
          <Component />
        </motion.div>
      ) : (
        <motion.div
          className="slide-out"
          initial={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            transformOrigin: "top",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onAnimationComplete={handleExitAnimation} 
        >
          <Component />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Transition;

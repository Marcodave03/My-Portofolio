import React from "react";
import { useNavigate } from "react-router-dom";
import { pageTransitionIn } from "../utils/gsapAnimation";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (target: string) => {
    const targetText = target.substring(1).toUpperCase() || "HOME";
    pageTransitionIn(targetText, () => {
      navigate(target);
    });
  };

  return (
    <div className="navbar-bg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={() => handleNavigation("/about")}
          className="relative overflow-hidden text-gray-600 group"
        >
          <span className="text-xl font-bold text-gray-600 block transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-full">
            Marco D.
          </span>
          <span className="text-xl font-bold block absolute inset-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 text-black">
            Marco D.
          </span>
        </button>

        <div className="flex space-x-6">
          <button
            onClick={() => handleNavigation("/home")}
            className="w-16 relative overflow-hidden text-gray-600 group"
          >
            <span className="block transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-full">
              Home
            </span>
            <span className="block absolute inset-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 font-bold">
              Home
            </span>
          </button>

          <button
            onClick={() => handleNavigation("/work")}
            className="w-16 relative overflow-hidden text-gray-600 group"
          >
            <span className="block transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-full">
              Project
            </span>
            <span className="block absolute inset-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 font-bold">
              Project
            </span>
          </button>

          <button
            onClick={() => handleNavigation("/about")}
            className="w-16 relative overflow-hidden text-gray-600 group"
          >
            <span className="block transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-full">
              About
            </span>
            <span className="block absolute inset-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 font-bold">
              About
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

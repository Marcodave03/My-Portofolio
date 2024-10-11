import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { pageTransitionIn } from "../utils/gsapAnimation";

const Work = () => {
  // const [activeSection, setActiveSection] = useState(null);
  // const navigate = useNavigate();
  // const sectionRefs = {
  //   project1: useRef(null),
  //   project2: useRef(null),
  //   project3: useRef(null),
  // };

  // const handleNavigation = (target: string) => {
  //   const targetText = target.substring(1).toUpperCase() || "HOME";
  //   pageTransitionIn(targetText, () => {
  //     navigate(target);
  //   });
  // };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = Object.keys(sectionRefs);
  //     let currentSection = null;
  //     for (let section of sections) {
  //       const sectionTop = sectionRefs[section].current.offsetTop;
  //       const scrollPosition = window.scrollY + 100;

  //       if (scrollPosition >= sectionTop) {
  //         currentSection = section;
  //       }
  //     }
  //     setActiveSection(currentSection);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div className="flex">
{/*       <div
        className="fixed top-1/2 right-0 transform -translate-y-1/2 h-[20vw] w-8 bg-black z-10 hover:w-14 transition-all duration-300 ease-in-out"
        onClick={() => handleNavigation("/about")}
      >
        <div className="flex items-center justify-center h-full text-white rotate-90">
          <h1 className="text-xl">About</h1>
        </div>
      </div>
      <div
        className="w-[25vw] h-full fixed top-0 left-0 p-4 overflow-y-auto"
        style={{ backgroundColor: "rgba(31, 41, 55, 0.2)" }}
      >
        <div className="space-y-4 m-14" style={{ paddingLeft: "50px" }}>
          <h2 className="font-semibold text-lg">Projects</h2>
          <ul className="space-y-2" style={{ paddingLeft: "20px" }}>
            <li>
              <a
                href="#project1"
                className={`block cursor-pointer p-2 ${
                  activeSection === "project1" ? "underline text-red-500" : ""
                }`}
              >
                Project 1
              </a>
            </li>
            <li>
              <a
                href="#project2"
                className={`block cursor-pointer p-2 ${
                  activeSection === "project2" ? "underline text-red-500" : ""
                }`}
              >
                Project 2
              </a>
            </li>
            <li>
              <a
                href="#project3"
                className={`block cursor-pointer p-2 ${
                  activeSection === "project3" ? "underline text-red-500" : ""
                }`}
              >
                Project 3
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ml-[25vw] w-full h-full overflow-y-auto p-2 m-12">

        <div id="project1" ref={sectionRefs.project1} className="h-screen">
          <h1 className="text-3xl font-bold text-center">Project 1</h1>
          <p className="text-center mt-4">
            This is the description for Project 1.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 1.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 1.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 1.
          </p>
        </div>


        <div id="project2" ref={sectionRefs.project2} className="h-screen">
          <h1 className="text-3xl font-bold text-center">Project 2</h1>
          <p className="text-center mt-4">
            This is the description for Project 2.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 2.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 2.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 2.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 2.
          </p>
        </div>


        <div id="project3" ref={sectionRefs.project3} className="h-screen">
          <h1 className="text-3xl font-bold text-center">Project 3</h1>
          <p className="text-center mt-4">
            This is the description for Project 3.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 3.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 3.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 3.
          </p>
          <p className="text-center mt-4">
            This is the description for Project 3.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Work;

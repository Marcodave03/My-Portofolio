import { useState, useEffect, useRef, RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { pageTransitionIn } from "../utils/gsapAnimation";
import Footer from "../components/Footer";
import Mockup from "../assets/mockup.jpg";

type SectionKeys = 'project1' | 'project2' | 'project3';

const Work = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const sectionRefs: Record<SectionKeys, RefObject<HTMLDivElement>> = {
    project1: useRef<HTMLDivElement>(null),
    project2: useRef<HTMLDivElement>(null),
    project3: useRef<HTMLDivElement>(null),
  };
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleNavigation = (target: string) => {
    const targetText = target.substring(1).toUpperCase() || "HOME";
    pageTransitionIn(targetText, () => {
      navigate(target);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionRefs) as SectionKeys[]; // Assert keys as SectionKeys
      const scrollPosition = window.scrollY;
      let currentSection: string | null = null;

      for (const section of sections) {
        const sectionTop = sectionRefs[section].current?.offsetTop ?? 0; // Use optional chaining
        if (scrollPosition >= sectionTop - 100) {
          currentSection = section;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionRefs]);

  return (
    <div>
      <div
        className="fixed top-1/2 right-0 transform -translate-y-1/2 h-[20vw] w-8 bg-black z-10 hover:w-14 transition-all duration-300 ease-in-out hidden lg:block"
        onClick={() => handleNavigation("/about")}
      >
        <div className="flex items-center justify-center h-full text-white rotate-90">
          <h1 className="text-xl">About</h1>
        </div>
      </div>
      {/* Landing Page */}
      {/* <div className="absolute animate-up-down top-6 left-80 transform -translate-y-1/2 -translate-x-1/2 z-20">
        <img
          src={Laptop}
          alt="Marco"
          className="h-auto w-[40vw] opacity-65"
        />
      </div> */}

      <div className="h-screen  text-black hidden lg:block">
        <div className="overflow-hidden h-[30vw] relative ">
            <div
              className="absolute w-[200vw] text-[16vw] font-bold text-center whitespace-nowrap mt-36 hover:opacity-0"
              style={{
                transform: `translateX(${-scrollPosition * 0.9}px)`, 
              }}
            >
              - PROJECTS ----------------------------
            </div>
          </div>

          <div className="text-6xl text-start w-[80vw] text-wrap mt-8 ml-48 hover:opacity-100 transition-opacity duration-300">
            Marco Davincent Dermawan
          </div>
      </div>

      <div className="flex">
        <div
          className="sidebar h-screen w-[25vw] p-4 border-r-[2px] hidden lg:flex" style={{borderColor:"#D6D6D6FF"}}>
          <div className="space-y-1 m-14">
            <h2 className="font-semibold text-2xl text-black mb-4">Web Development</h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="#project1"
                  className={`block cursor-pointer p-2 ${
                    activeSection === "project1"
                      ? "text-xl font-bold text-black"
                      : "text-lg text-gray-400"
                  }`}
                >
                  Project 1
                </a>
              </li>
              <li>
                <a
                  href="#project2"
                  className={`block cursor-pointer p-2 ${
                    activeSection === "project2"
                      ? "text-xl font-bold text-black"
                      : "text-lg text-gray-400"
                  }`}
                >
                  Project 2
                </a>
              </li>
              <li>
                <a
                  href="#project3"
                  className={`block cursor-pointer p-2 ${
                    activeSection === "project3"
                      ? "text-xl font-bold text-black"
                      : "text-lg text-gray-400"
                  }`}
                >
                  Project 3
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Project Sections */}
        <div className="flex-1 mt-20">
          <div id="project1" ref={sectionRefs.project1} className="lg:h-screen mt-4 lg:mt-0">
            <h2 className="text-3xl">Project 1</h2>
            <img src={Mockup} alt="mockup" className="w-[100vw] lg:w-[90vw] h-auto lg:h-[80vh]" />
          </div>
          <div id="project2" ref={sectionRefs.project2} className="lg:h-screen mt-4 lg:mt-0">
            <h2 className="text-3xl">Project 2</h2>
            <img src={Mockup} alt="mockup" className="w-[100vw] lg:w-[90vw] h-auto lg:h-[80vh]" />
          </div>
          <div id="project3" ref={sectionRefs.project3} className="lg:h-screen mt-4 lg:mt-0">
            <h2 className="text-3xl">Project 3</h2>
            <img src={Mockup} alt="mockup" className="w-[100vw] lg:w-[90vw] h-auto lg:h-[80vh]" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Work;

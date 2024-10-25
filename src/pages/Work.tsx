import { useState, useEffect, useRef, RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { pageTransitionIn } from "../utils/gsapAnimation";
import Footer from "../components/Footer";
import Streamverse from "../assets/Macbook Streamverse.png";
import CareerSpot from "../assets/Macbook Careerspot.png";
import ImagineCup from "../assets/Mockup Imaginecup.png";
import NuatTime from "../assets/Macbook Nuattime.png";
import NusaTravel from "../assets/Macbook Nusatravel.png";
import BXplore from "../assets/Mockup BExplore.png";
import HealthyGood from "../assets/Mockup Healthygoods.png"


type SectionKeys = 'project1' | 'project2' | 'project3' | 'project4' | 'project5' | 'project6' | 'project7';

const Work = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const sectionRefs: Record<SectionKeys, RefObject<HTMLDivElement>> = {
    project1: useRef<HTMLDivElement>(null),
    project2: useRef<HTMLDivElement>(null),
    project3: useRef<HTMLDivElement>(null),
    project4: useRef<HTMLDivElement>(null),
    project5: useRef<HTMLDivElement>(null),
    project6: useRef<HTMLDivElement>(null),
    project7: useRef<HTMLDivElement>(null),
  };
  const [scrollPosition, setScrollPosition] = useState(0);
  const projectNames = [
    { id: 'project1', name: 'Streamverse' },
    { id: 'project2', name: 'NusaTravel' },
    { id: 'project3', name: 'CareerSpot' },
    { id: 'project4', name: 'NuatTime' },
    { id: 'project5', name: 'PreForm' },
    { id: 'project6', name: 'BXplore' },
    { id: 'project7', name: 'HealthyGood' },
  ];

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
      const sections = Object.keys(sectionRefs) as SectionKeys[];
      const scrollPosition = window.scrollY;
      let currentSection: string | null = null;

      for (const section of sections) {
        const sectionTop = sectionRefs[section].current?.offsetTop ?? 0;
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

      <div className="h-screen text-black hidden lg:block">
        <div className="overflow-hidden h-[30vw] relative">
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
    className="sidebar h-screen w-[15vw] border-r-[2px] hidden lg:flex" style={{ borderColor: "#D6D6D6FF" }}>
    <div className="space-y-1 m-4">
      <h2 className="text-2xl text-black mb-4 mt-14">Projects</h2>
      <ul className="space-y-1">
        {projectNames.map((project) => (
          <li key={project.id}>
            <a
              href={`#${project.id}`}
              className={`block cursor-pointer p-2 ${activeSection === project.id ? "text-xl text-black" : "text-lg text-gray-400"}`}
            >
              {project.name} {/* Display the actual project name */}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>

        {/* Project Sections */}
        <div className="flex-1 mt-20">
          <div id="project1" ref={sectionRefs.project1} className="mt-4 lg:mt-0 h-screen">
            <img src={Streamverse} alt="Streamverse mockup" className="w-[90vw] h-[100vh] object-cover" />
          </div>
          <div id="project2" ref={sectionRefs.project2} className="mt-4 lg:mt-0 h-screen">
            <img src={NusaTravel} alt="NusaTravel mockup" className="w-[90vw] h-[100vh] object-cover" />
          </div>
          <div id="project3" ref={sectionRefs.project3} className="mt-4 lg:mt-0 h-screen">
            <img src={CareerSpot} alt="CareerSpot mockup" className="w-[90vw] h-[100vh] object-cover" />
          </div>
          <div id="project4" ref={sectionRefs.project4} className="mt-4 lg:mt-0 h-screen">
            <img src={NuatTime} alt="NuatTime mockup" className="w-[90vw] h-[100vh] object-cover" />
          </div>
          <div id="project5" ref={sectionRefs.project5} className="mt-4 lg:mt-0 h-screen">
            <img src={ImagineCup} alt="ImagineCup mockup" className="w-[90vw] h-[100vh] object-cover" />
          </div>
          <div id="project6" ref={sectionRefs.project6} className="mt-4 lg:mt-0 h-screen">
            <img src={BXplore} alt="BXplore mockup" className="w-[90vw] h-[100vh] object-cover" />
          </div>
          <div id="project7" ref={sectionRefs.project7} className="mt-4 lg:mt-0 h-screen">
            <img src={HealthyGood} alt="HealthyGood mockup" className="w-[90vw] h-[100vh] object-cover" />
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

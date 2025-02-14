import { useNavigate } from "react-router-dom";
import { pageTransitionIn } from "../utils/gsapAnimation";
import { useState, useEffect } from "react";
import Marco from "../assets/Marcocolor.svg";
import { ArrowForward } from "@mui/icons-material";
import Experience from "./Experience";
import CV from "../assets/CV - Marco Davincent Dermawan.pdf";

const About = () => {
  const [isVisible] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (target: string) => {
    const targetText = target.substring(1).toUpperCase() || "HOME";
    pageTransitionIn(targetText, () => {
      navigate(target);
    });
  };

  const [scrollPosition, setScrollPosition] = useState(0);

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

  return (
    <div className="overflow-hidden">
      <div
        className="fixed top-1/2 right-0 transform -translate-y-1/2 h-[20vw] w-8 bg-black z-10 hover:w-14 transition-all duration-300 ease-in-out hidden lg:block"
        onClick={() => handleNavigation("/home")}
      >
        <div className="flex items-center justify-center h-full text-white rotate-90">
          <h1 className="text-xl">Marco.</h1>
        </div>
      </div>

      {/* <div className="overflow-hidden h-[30vw] relative ">
        <div
          className="absolute w-[200vw] text-[16vw] font-bold text-center whitespace-nowrap mt-36 hover:opacity-0"
          style={{
            transform: `translateX(${-scrollPosition * 0.9}px)`,
          }}
        >
          - ABOUT ME ----------------------------
        </div>
      </div> */}

      <div className="hidden lg:block">
        <div className="overflow-hidden h-[20vh] lg:h-[20vw] relative mt-64 lg:mt-44 -ml-16">
          <div
            className="absolute w-[200vw] text-[26vw] lg:text-[16vw] font-bold text-center whitespace-nowrap hover:opacity-0"
            style={{
              transform: `translateX(${-scrollPosition * 0.9}px)`,
            }}
          >
            - ABOUT ME ----------------------------
          </div>
        </div>

        <div className="text-4xl lg:text-6xl text-start w-[100vw] text-wrap mt-6 lg:mt-8 ml-4 lg:ml-48 hover:opacity-100 transition-opacity duration-300">
          Marco Davincent Dermawan
        </div>
      </div>

      <div className="flex items-center justify-start mt-32  lg:mt-96 lg:ml-36">
        <div className="relative lg:w-[30vw] lg:h-[28vw] border-2 border-black rounded-full bg-transparent items-center justify-center mb-2 sm:mb-0  hidden lg:flex">
          <div
            className={`w-[97%] h-[97%] bg-black rounded-full ${
              isVisible ? "scale-100" : "scale-0"
            }`}
          ></div>
          <div className="absolute inset-0 flex items-end justify-center">
            <img
              src={Marco}
              alt="Marco"
              className={`mb-10 w-[30vw] h-auto ${
                isVisible ? "translate-y-20" : "translate-y-full"
              }`}
            />
          </div>
        </div>

        <div className="text-xl lg:text-3xl ml-4 lg:ml-8 lg:mr-24 lg:w-[60vw] text-wrap leading-relaxed text-start lg:text-left ">
          "As a <strong className="font-bold">fullstack developer</strong> , I
          turn complex problems into intuitive solutions, blending creativity
          with technical expertise. From{" "}
          <strong className="font-bold">
            designing responsive user interfaces
          </strong>{" "}
          to building robust{" "}
          <strong className="font-bold">backend systems</strong>, my goal is to
          craft seamless and scalable digital experiences that make an impact."
          <div className="flex">
            <div
              className="relative w-64 h-12 border-2 border-black overflow-hidden group cursor-pointer rounded-full mt-8 lg:mt-5 mr-3"
              onClick={() => {
                window.location.href = "mailto:marcodave03@gmail.com";
              }}
            >
              <div className="absolute top-0 left-0 h-full w-0 bg-blue-300 transition-all duration-500 group-hover:w-full"></div>
              <div className="relative z-10 flex items-center justify-center h-full text-black">
                <span className="text-2xl font-normal">Get in touch</span>
              </div>
              <div className="absolute top-1/2 left-2 w-8 h-8 bg-black rounded-full flex items-center justify-center transition-all duration-500 group-hover:translate-x-[12.5rem] group-hover:-rotate-45 transform -translate-y-1/2">
                <ArrowForward fontSize="medium" sx={{ color: "white" }} />
              </div>
            </div>
            <div
              className="relative w-20 h-12 border-2 border-black overflow-hidden group cursor-pointer rounded-full mt-8 lg:mt-5"
              onClick={() => {
                const link = document.createElement("a");
                link.href = CV;
                link.download = "Marco Davincent Dermawan.pdf";
                link.target = "_blank";
                link.click();
              }}
            >
              <div className="absolute top-0 left-0 h-full w-0 bg-blue-300 transition-all duration-500 group-hover:w-full"></div>
              <div className="relative z-10 flex items-center justify-center h-full text-black">
                <span className="text-2xl font-normal">CV</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-6xl text-start w-[100vw] text-wrap mt-64 ml-4 lg:ml-48 transition-opacity duration-300">
        My Journey
      </div>
      <Experience />
    </div>
  );
};

export default About;

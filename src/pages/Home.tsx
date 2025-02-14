import { useEffect, useState } from "react";
import Marco from "../assets/Marcocolor.svg";
import { GitHub, Instagram, LinkedIn, ArrowForward } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { pageTransitionIn } from "../utils/gsapAnimation";
import { IoIosArrowDown } from "react-icons/io";
import CV from "../assets/CV - Marco Davincent Dermawan.pdf";
import Streamverse from "../assets/Macbook Streamverse.png";
import BXplore from "../assets/Mockup BExplore.png";
import ImagineCup from "../assets/Mockup Imaginecup.png";


const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (target: string) => {
    const targetText = target.substring(1).toUpperCase() || "HOME";
    pageTransitionIn(targetText, () => {
      navigate(target);
    });
  };

  return (
    <div className="overflow-hidden">
      <div className="h-16 mx-auto"></div>
      <div className="flex flex-col sm:flex-row items-center justify-center z-10">
        <div className="col-span-2 text-wrap mb-2 z-10 text-start lg:text-right w-[100vw] lg:w-[30vw]">
          <div className="text-6xl mr-0 lg:mr-6 ml-4 lg:ml-0 mt-32 lg:mt-0">Marco Davincent </div>

          <div className="text-2xl lg:text-lg text-start ml-6 lg:ml-0 lg:text-right lg:mr-6 mt-10 lg:mt-0">
            Tangerang, Indonesia
          </div>

          <div className="flex items-center justify-start lg:justify-end text-start lg:text-right mr-0 lg:mr-6 mt-2 lg:mt-0">
            <div className="relative w-5 h-5 mr-2">
              <div className="bg-green-200 w-full h-full rounded-full blinking-circle opacity-70 flex items-center justify-center"></div>
              <div className="absolute bg-green-500 w-2 h-2 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="text-xl lg:text-lg">
              Available for full-time position
            </div>
          </div>
          
          <div className="flex items-center justify-start lg:justify-end text-start lg:text-right ml-8 lg:ml-4 mr-0 lg:mr-8 mt-8 space-x-4">
            <GitHub
              fontSize="large"
              className="w-12 h-12 transform scale-125 hover:scale-150 ease-in-out hover:text-purple-900 transition-transform duration-1000 cursor-pointer"
              onClick={() =>
                window.open("https://github.com/Marcodave03", "_blank")
              }
            />
            <Instagram
              fontSize="large"
              className="w-12 h-12 transform scale-125 hover:scale-150 ease-in-out hover:text-fuchsia-700 transition-transform  duration-1000 cursor-pointer"
              onClick={() =>
                window.open("https://www.instagram.com/marcodave_/", "_blank")
              }
            />
            <LinkedIn
              fontSize="large"
              className="w-12 h-12 transform scale-125 hover:scale-150 ease-in-out hover:text-blue-700 transition-transform  duration-1000 cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/marcodavincent/",
                  "_blank"
                )
              }
            />
          </div>
        </div>

        <div
          className={`col-span-8 w-[40vw] h-[40vw] border-2 border-black rounded-full bg-transparent flex items-center justify-center transition-transform duration-500 ease-in-out 
                ${isVisible ? "scale-100" : "scale-110"} mb-2 hidden lg:flex `}
        >
          <div
            className={`w-[97%] h-[97%] bg-black rounded-full delay-200 transition-transform duration-500 ease-in-out 
                        ${isVisible ? "scale-100" : "scale-0"}`}
          ></div>
          <div className="absolute inset-0 flex items-end justify-center">
            <img
              src={Marco}
              alt="Marco"
              className={`mb-8 w-[40vw] h-auto delay-200 transition-transform duration-700 ease-in-out ${
                isVisible ? "translate-y-20" : "translate-y-full"
              }`}
            />
          </div>
        </div>

        <div className="text-5xl lg:text-6xl col-span-2 text-start text-wrap mb-2 ml-0 lg:ml-6 z-10 mt-72 lg:mt-0 w-[350px] lg:w-[30vw]">
          Web Developer & Digital Designer
          <div className="flex">
            <div
              className="relative w-64 h-12 border-2 border-black overflow-hidden group cursor-pointer rounded-full mt-5 mr-3"
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
              className="relative w-20 h-12 border-2 border-black overflow-hidden group cursor-pointer rounded-full mt-5"
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

      <div className="mt-10 lg:mt-64 mb-2 text-gray-600 text-lg flex items-center justify-center">
        scroll
      </div>
      <div className="flex items-center justify-center ">
        <div className="relative w-1 h-40 bg-gray-500 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-300 animate-move"></div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <IoIosArrowDown color="gray" size={50} />
      </div>

      <div className="ml-4 lg:ml-14 text-6xl col-span-2 text-start w-[100vw] text-wrap mb-4 z-10 mt-64 hover:text-9xl">
        Code. Create. Innovate
      </div>
      <div className="mx-auto w-[95vw] h-[1px] bg-black mb-8"></div>
      <div className="flex flex-col sm:flex-row justify-center mx-auto w-[90vw]">
        <Link href="">
          <img
            src={ImagineCup}
            alt="mockup"
            className="mb-2 lg:m-4 w-full sm:w-[44vw] h-auto"
          />
        </Link>
       
        <img
          src={BXplore}
          alt="mockup"
          className="lg:m-4 w-full sm:w-[44vw] h-auto"
        />
      </div>
      <div className="flex justify-center mx-auto w-[90vw] mt-4">
        <img
          src={Streamverse}
          alt="mockup"
          className="w-full sm:w-[90vw] h-auto lg:h-[30vw] object-cover"
        />
      </div>




      <div className="text-4xl col-span-2 text-start lg:text-right w-[100vw] mb-4 mt-14 pr-24 z-20 group ml-4 lg:ml-0">
        <span className="inline-flex items-center relative group-hover:cursor-pointer">
          <ArrowForward
            fontSize="large"
            sx={{ color: "black" }}
            className="transition-transform duration-300 transform group-hover:-rotate-45 z-30"
          />
          <span
            className="ml-2 relative animated-underline"
            onClick={() => handleNavigation("/work")}
          >
            All Projects
            <span className="animated-underline"></span>
          </span>
        </span>
      </div>

      <div className="mx-auto w-[95vw] h-[1px] bg-black mb-8"></div>

      <div className="ml-4 lg:ml-24 text-6xl text-start w-[100vw] mb-8 lg:mb-24 mt-24 lg:mt-4">
        My Journey
      </div>

      <div className="text-xl lg:text-3xl ml-4 lg:ml-24 w-[90vw] lg:w-[70vw] text-wrap leading-relaxed text-left mb-2">
        "As a <strong className="font-bold">fullstack developer</strong> , I
        turn complex problems into intuitive solutions, blending creativity with
        technical expertise. From{" "}
        <strong className="font-bold">
          designing responsive user interfaces
        </strong>{" "}
        to building robust{" "}
        <strong className="font-bold">backend systems</strong>, my goal is to
        craft seamless and scalable digital experiences that make an impact."
      </div>

      <div className="text-4xl lg:col-span-2 text-start lg:text-right w-[100vw] mt-14 lg:pr-24 z-20 group mb-64 ml-4 lg:ml-0">
        <span className="inline-flex items-center relative group-hover:cursor-pointer">
          <ArrowForward
            fontSize="large"
            sx={{ color: "black" }}
            className="transition-transform duration-300 transform group-hover:-rotate-45 z-30"
          />
          <span
            className="ml-2 relative"
            onClick={() => handleNavigation("/about")}
          >
            About Me
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform  transition-transform duration-300 scale-x-100"></span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Home;

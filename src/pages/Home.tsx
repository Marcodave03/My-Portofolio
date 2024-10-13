import { useEffect, useState } from "react";
import Marco from "../assets/Group 176.svg";
import { GitHub, Instagram, LinkedIn, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { pageTransitionIn } from "../utils/gsapAnimation";
import Footer from "../components/Footer";
import Mockup from "../assets/mockup.jpg";
import { IoIosArrowDown } from "react-icons/io";

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
      <div
        className="fixed top-1/2 right-0 transform -translate-y-1/2 h-[20vw] w-8 bg-black z-10 hover:w-14 transition-all duration-300 ease-in-out"
        onClick={() => handleNavigation("/work")}
      >
        <div className="flex items-center justify-center h-full text-white rotate-90">
          <h1 className="text-xl">Projects</h1>
        </div>
      </div>
      <div className="h-16 mx-auto"></div>
      <div className="flex flex-col sm:flex-row items-center justify-center z-10">
        <div className="md:text-6xl sm:text-sm col-span-2 text-right w-[30vw] text-wrap mb-2 sm:mb-0 sm:mr-4 z-10">
          <div className="mr-6">Marco Davincent </div>

          <div className="md:text-lg sm:text-sm text-right mr-6">
            Tangerang, Indonesia
          </div>

          <div className="flex items-center justify-end text-right mr-6">
            <div className="relative w-5 h-5 mr-2">
              <div className="bg-green-200 w-full h-full rounded-full blinking-circle opacity-70 flex items-center justify-center"></div>
              <div className="absolute bg-green-500 w-2 h-2 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="md:text-lg sm:text-sm">
              Available for full-time position
            </div>
          </div>
          <div className="flex items-center justify-end text-right mr-8 mt-8 space-x-4">
            <GitHub
              fontSize="large"
              className="w-12 h-12 transform scale-125 hover:scale-150 ease-in-out hover:text-purple-900 transition-transform duration-1000 cursor-pointer"
              onClick={() => window.open("https://github.com", "_blank")}
            />
            <Instagram
              fontSize="large"
              className="w-12 h-12 transform scale-125 hover:scale-150 ease-in-out hover:text-fuchsia-700 transition-transform  duration-1000 cursor-pointer"
              onClick={() => window.open("https://instagram.com", "_blank")}
            />
            <LinkedIn
              fontSize="large"
              className="w-12 h-12 transform scale-125 hover:scale-150 ease-in-out hover:text-blue-700 transition-transform  duration-1000 cursor-pointer"
              onClick={() => window.open("https://linkedin.com", "_blank")}
            />
          </div>
        </div>

        <div
          className={`col-span-8 w-[40vw] h-[40vw] border-2 border-black rounded-full bg-transparent flex items-center justify-center mb-2 sm:mb-0 transition-transform duration-500 ease-in-out 
                ${isVisible ? "scale-100" : "scale-110"}`}
        >
          <div
            className={`w-[97%] h-[97%] bg-black rounded-full delay-200 transition-transform duration-500 ease-in-out 
                        ${isVisible ? "scale-100" : "scale-0"}`}
          ></div>

          <div className="absolute inset-0 flex items-end justify-center">
            <img
              src={Marco}
              alt="Marco"
              className={`mb-2 w-[40vw] h-auto delay-200 transition-transform duration-700 ease-in-out ${
                isVisible ? "translate-y-20" : "translate-y-full"
              }`}
            />
          </div>
        </div>

        <div className="md:text-6xl sm:text-sm col-span-2 text-start w-[30vw] text-wrap mb-2 sm:mb-0 lg:ml-6 sm:ml-4 z-10">
          Web Developer & Digital Designer
          <div className="flex">
            <div className="relative w-64 h-12 border-2 border-black overflow-hidden group cursor-pointer rounded-full mt-5 mr-3">
              <div className="absolute top-0 left-0 h-full w-0 bg-blue-300 transition-all duration-500 group-hover:w-full"></div>
              <div className="relative z-10 flex items-center justify-center h-full text-black">
                <span className="text-2xl font-normal">Get in touch</span>
              </div>
              <div className="absolute top-1/2 left-2 w-8 h-8 bg-black rounded-full flex items-center justify-center transition-all duration-500 group-hover:translate-x-[12.5rem] group-hover:-rotate-45 transform -translate-y-1/2">
                <ArrowForward fontSize="medium" sx={{ color: "white" }} />
              </div>
            </div>
            <div className="relative w-20 h-12 border-2 border-black overflow-hidden group cursor-pointer rounded-full mt-5">
              <div className="absolute top-0 left-0 h-full w-0 bg-blue-300 transition-all duration-500 group-hover:w-full"></div>
              <div className="relative z-10 flex items-center justify-center h-full text-black">
                <span className="text-2xl font-normal">CV</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-64 mb-2 text-gray-600 text-lg flex items-center justify-center">
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

      <div className="ml-14 text-6xl col-span-2 text-start w-[100vw] text-wrap mb-4 z-10 mt-64">
        Code. Create. Innovate
      </div>
      <div className="mx-auto w-[95vw] h-[1px] bg-black mb-8"></div>
      <div className="flex justify-center mx-auto w-[90vw]">
        <img src={Mockup} alt="mockup" className="m-4 w-[44vw] h-auto" />
        <img src={Mockup} alt="mockup" className="m-4 w-[44vw] h-auto" />
      </div>
      <div className="flex justify-center mx-auto w-[90vw] mt-4">
        <img
          src={Mockup}
          alt="mockup"
          className="w-[90vw] h-[30vw] object-cover"
        />
      </div>

      <div className="text-4xl col-span-2 text-right w-[100vw] mb-4 mt-14 pr-24 z-20 group">
      <span className="inline-flex items-center relative group-hover:cursor-pointer">
        <ArrowForward
          fontSize="large"
          sx={{ color: 'black' }}
          className="transition-transform duration-300 transform group-hover:-rotate-45 z-30"
        />
        <span className="ml-2 relative">
          All Projects
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </span>
      </span>
    </div>

      <div className="mx-auto w-[95vw] h-[1px] bg-black mb-8"></div>

      <div className="ml-24 text-6xl text-start w-[100vw]  mb-24 mt-4">
        My Journey
      </div>

      <div className="text-3xl ml-24 w-[70vw] text-wrap leading-relaxed text-left mb-2">
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

      <div className="text-4xl col-span-2 text-right w-[100vw] mb-64 mt-2 underline pr-24">
        <ArrowForward fontSize="large" sx={{ color: "black" }} /> About Me
      </div>

      <Footer />
    </div>
  );
};

export default Home;

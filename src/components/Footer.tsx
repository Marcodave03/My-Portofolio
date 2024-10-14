import { ArrowForward } from "@mui/icons-material";
import { pageTransitionIn } from "../utils/gsapAnimation";
import { useNavigate } from "react-router-dom";
import CV from "../assets/CV - Marco Davincent Dermawan.pdf";

const Footer = () => {
  const navigate = useNavigate();
  const handleNavigation = (target: string) => {
    const targetText = target.substring(1).toUpperCase() || "HOME";
    pageTransitionIn(targetText, () => {
      navigate(target);
    });
  };

  return (
    <div className="flex bg-gray-200 text-black p-4 h-[75vh] justify-between">
      <div className="w-[75vw] mt-14">
        <h2 className="ml-14 text-4xl mb-8">Let's Collaborate</h2>
        <div className="ml-14 flex">
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
      <div className="w-[10vw] mt-14">
        <ul className="flex flex-col space-y-4">
          <li>
            <div
              className="text-2xl hover:text-gray-400 hover:cursor-pointer"
              onClick={() => handleNavigation("/home")}
            >
              Home
            </div>
          </li>
          <li>
            <div
              className="text-2xl hover:text-gray-400 hover:cursor-pointer"
              onClick={() => handleNavigation("/work")}
            >
              Projects
            </div>
          </li>
          <li>
            <div
              className="text-2xl hover:text-gray-400 hover:cursor-pointer"
              onClick={() => handleNavigation("/about")}
            >
              About
            </div>
          </li>
        </ul>
      </div>
      <div className="w-[15vw] mt-14">
        <ul className="flex flex-col space-y-4">
          <li>
            <div
              className="text-2xl hover:text-gray-400 hover:cursor-pointer"
              onClick={() =>
                window.open("https://www.instagram.com/marcodave_/", "_blank")
              }
            >
              [1] Instagram
            </div>
          </li>
          <li>
            <div
              className="text-2xl hover:text-gray-400 hover:cursor-pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/marcodavincent/",
                  "_blank"
                )
              }
            >
              [2] Linkedin
            </div>
          </li>
          <li>
            <div
              className="text-2xl hover:text-gray-400 hover:cursor-pointer"
              onClick={() =>
                window.open("https://github.com/Marcodave03", "_blank")
              }
            >
              [3] Github
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

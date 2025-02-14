import { ArrowForward } from "@mui/icons-material"
import { pageTransitionIn } from "../utils/gsapAnimation"
import { useNavigate } from "react-router-dom"
import CV from "../assets/CV - Marco Davincent Dermawan.pdf"
import "../index.css"

const Footer = () => {
  const navigate = useNavigate()
  const handleNavigation = (target: string) => {
    const targetText = target.substring(1).toUpperCase() || "HOME"
    pageTransitionIn(targetText, () => {
      navigate(target)
    })
  }

  return (
    <div className="flex flex-col lg:flex-row bg-gray-200 text-black h-auto justify-between w-auto relative z-[10]">
      <div className="w-full lg:w-[75vw] mt-14">
        <h2 className="ml-4 lg:ml-14 text-4xl mb-8">Let's Collaborate</h2>

        <div className="ml-4 lg:ml-14 flex">
          <div
            className="relative w-64 h-12 border-2 border-black overflow-hidden group cursor-pointer rounded-full mt-5 mr-3"
            onClick={() => {
              window.location.href = "mailto:marcodave03@gmail.com"
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
              const link = document.createElement("a")
              link.href = CV
              link.download = "Marco Davincent Dermawan.pdf"
              link.target = "_blank"
              link.click()
            }}
          >
            <div className="absolute top-0 left-0 h-full w-0 bg-blue-300 transition-all duration-500 group-hover:w-full"></div>
            <div className="relative z-10 flex items-center justify-center h-full text-black">
              <span className="text-2xl font-normal">CV</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-14">
          <ul className="flex flex-col space-y-4">
            {[
              { label: "Home", link: "/home" },
              { label: "Projects", link: "/work" },
              { label: "About", link: "/about" },
            ].map((item, index) => (
              <li key={index}>
                <div
                  className="animated-underline text-2xl ml-4 lg:ml-0 hover:cursor-pointer"
                  onClick={() => handleNavigation(item.link)}
                >
                  {item.label}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-[15vw] mt-14 mb-20">
          <ul className="flex flex-col space-y-4">
            {[
              { label: "[1] Instagram", link: "https://www.instagram.com/marcodave_/" },
              { label: "[2] Linkedin", link: "https://www.linkedin.com/in/marcodavincent/" },
              { label: "[3] Github", link: "https://github.com/Marcodave03" },
            ].map((item, index) => (
              <li key={index}>
                <div
                  className="animated-underline text-2xl ml-4 lg:ml-0 hover:cursor-pointer"
                  onClick={() => window.open(item.link, "_blank")}
                >
                  {item.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer


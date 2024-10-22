import React, { useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { FaReact, FaVuejs, FaBootstrap, FaNodeJs } from "react-icons/fa";
import {
  SiTailwindcss,
  SiLaravel,
  SiDotnet,
  SiMysql,
  SiPostgresql,
  SiSocketdotio,
  SiFlutter,
} from "react-icons/si";

const Experience: React.FC = () => {
  // State to manage the active accordion
  const [activeSections, setActiveSections] = useState<{
    [key: number]: boolean;
  }>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const toggleAccordion = (index: number) => {
    setActiveSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex justify-center items-center mt-14 relative z-40 mb-56">
      <div className="w-[80vw]">
        <div>
          <button
            className={`w-full bg-transparent border-t border-black cursor-pointer`}
            onClick={() => toggleAccordion(0)}
          >
            <div className="flex justify-between items-center p-8">
              <h4 className="text-4xl font-medium">Skills</h4>
              <FiPlus
                className={`transition-transform duration-300 ${
                  activeSections[0] ? "transform rotate-45" : ""
                } text-blue-600`}
                size={22}
              />
            </div>
            <div
              ref={(el) => (contentRefs.current[0] = el)}
              className={`overflow-hidden transition-all duration-500 ease-in-out`}
              style={{
                maxHeight: activeSections[0]
                  ? `${contentRefs.current[0]?.scrollHeight}px`
                  : "0px",
              }}
            >
              <div className="ml-4">
                <div className="text-start p-4">
                  <div className="text-2xl text-black mb-3">UI UX Design</div>
                  <div className="text-sm text-gray-500">
                    In the realm of UI/UX, I aim to design intuitive and
                    user-centered experiences. I prioritize understanding user
                    needs, creating wireframes, and crafting visually appealing
                    designs that simplify navigation and engagement. My goal is
                    always to ensure the user’s journey is seamless, balancing
                    aesthetics with functionality.
                  </div>
                </div>
                <div className="text-start p-4">
                  <div className="text-2xl text-black mb-3">
                    Frontend Development
                  </div>
                  <div className="text-sm text-gray-500 ">
                    On the frontend, I specialize in React, where I’ve created
                    dynamic and interactive user interfaces for web
                    applications. My focus is on building responsive,
                    mobile-friendly designs that enhance user experience. I’ve
                    used tools like Tailwind CSS and MUI to streamline the
                    design process and ensure consistency across different
                    screen sizes. My experience includes implementing complex
                    components, state management, and optimizing performance for
                    fast loading times.
                  </div>
                </div>
                <div className="text-start p-4 mb-8">
                  <div className="text-2xl text-black mb-3">
                    Backend Development
                  </div>
                  <div className="text-sm text-gray-500">
                    For the backend, I work primarily with Node.js and Laravel.
                    Using Node.js, I build scalable, real-time applications,
                    ensuring smooth communication between frontend and backend
                    through RESTful APIs. With Express.js and Sequelize, I
                    handle data operations efficiently, working with relational
                    databases like PostgreSQL. In Laravel, I’ve built robust
                    server-side applications, managing authentication, database
                    migrations, and middleware to ensure secure and
                    well-structured systems.
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div>
          <button
            className={`w-full bg-transparent border-t border-black cursor-pointer`}
            onClick={() => toggleAccordion(1)}
          >
            <div className="flex justify-between items-center p-8">
              <h4 className="text-3xl font-medium">TechStack</h4>
              <FiPlus
                className={`transition-transform duration-300 ${
                  activeSections[1] ? "transform rotate-45" : ""
                } text-blue-600`}
                size={22}
              />
            </div>
            <div
              ref={(el) => (contentRefs.current[1] = el)}
              className={`overflow-hidden transition-all duration-500 ease-in-out`}
              style={{
                maxHeight: activeSections[1]
                  ? `${contentRefs.current[1]?.scrollHeight}px`
                  : "0px",
              }}
            >
              <div className="lg:p-4">
                <div className="lg:ml-4">
                  <div className="text-start p-4 flex flex-wrap justify-center">
                    {/* Each technology box */}
                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <FaReact size={50} style={{ color: "#3AC0FDFF" }} />
                      <span className="ml-2 text-xl text-black ">REACT</span>
                    </div>

                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <FaVuejs size={50} style={{ color: "#41B883" }} />
                      <span className="ml-2 text-xl text-black">VUE.JS</span>
                    </div>

                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <FaBootstrap size={50} style={{ color: "#5E009CFF" }} />
                      <span className="ml-2 text-xl text-black">BOOTSTRAP</span>
                    </div>

                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <SiTailwindcss size={50} style={{ color: "#3AC0FDFF" }} />
                      <span className="ml-2 text-xl text-black">
                        TAILWIND CSS
                      </span>
                    </div>

                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <SiLaravel size={50} style={{ color: "#B90202FF" }} />
                      <span className="ml-2 text-xl text-black">LARAVEL</span>
                    </div>

                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <SiDotnet size={50} style={{ color: "#720081FF" }} />
                      <span className="ml-2 text-xl text-black">ASP.NET</span>
                    </div>

                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <FaNodeJs size={50} style={{ color: "#054D23FF" }} />
                      <span className="ml-2 text-xl text-black">NODE.JS</span>
                    </div>

                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <SiMysql size={50} style={{ color: "#F56200FF" }} />
                      <span className="ml-2 text-xl text-black">MYSQL</span>
                    </div>

                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <SiPostgresql size={50} style={{ color: "#0E008DFF" }} />
                      <span className="ml-2 text-xl text-black">
                        POSTGRESQL
                      </span>
                    </div>

                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <SiSocketdotio size={50} style={{ color: "#000000FF" }} />
                      <span className="ml-2 text-xl text-black">SOCKET.IO</span>
                    </div>

                    <div className="flex items-center m-4 p-4 border border-black rounded-lg W-[10VW] justify-center">
                      <SiFlutter size={50} style={{ color: "#4B83D8FF" }} />
                      <span className="ml-2 text-xl text-black">FLUTTER</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div>
          <button
            className={`w-full bg-transparent border-t border-black cursor-pointer`}
            onClick={() => toggleAccordion(2)}
          >
            <div className="flex justify-between items-center p-8">
              <h4 className="text-3xl font-medium">Experience</h4>
              <FiPlus
                className={`transition-transform duration-300 ${
                  activeSections[2] ? "transform rotate-45" : ""
                } text-blue-600`}
                size={22}
              />
            </div>
            <div
              ref={(el) => (contentRefs.current[2] = el)}
              className={`overflow-hidden transition-all duration-500 ease-in-out`}
              style={{
                maxHeight: activeSections[2]
                  ? `${contentRefs.current[2]?.scrollHeight}px`
                  : "0px",
              }}
            >
              <div className="ml-4 mb-12">
                <div className="text-start p-4">
                  <h4 className="text-3xl font-medium mb-8">2024</h4>
                  <div className="mt-4">
                    <div className="text-2xl text-black mb-2">
                      BCA Group Strategic Information Techonology
                    </div>
                    <div className="text-sm text-gray-500">
                      - Working on one of BCA Internal website "Emoji", that
                      streamlines work process by using OCR to scan documents
                      and convert to JSON data for further process
                    </div>
                    <div className="text-sm text-gray-500">
                      - Responsible for updating deprecated libraries and
                      developed new frontend features for "Emoji"
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl text-black mb-2">
                      Nuat Time Reflexology Freelance
                    </div>
                    <div className="text-sm text-gray-500">
                      - Developed nuattime.com to provide comprehensive
                      information about reflexology services
                    </div>
                    <div className="text-sm text-gray-500">
                      - Ensuring optimized profile management, accurate location
                      details, and streamlined contact options
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl text-black mb-2">
                      UREEKA Binus Lead Core Competition Team
                    </div>
                    <div className="text-sm text-gray-500">
                      - Overseeing 261 members, providing Laravel training, and
                      mentoring members for competitions
                    </div>
                    <div className="text-sm text-gray-500">
                      - Document all competition winners and gaining National
                      and International Competition Experience
                    </div>
                  </div>
                </div>

                <div className="text-start p-4">
                  <h4 className="text-3xl font-medium mb-8">2023</h4>
                  <div className="mt-4">
                    <div className="text-2xl text-black mb-2">
                      iOS Foundation Program
                    </div>
                    <div className="text-sm text-gray-500 ">
                      Creating the iOS application "Binus Xplore" to assist
                      users with disabilities
                    </div>
                    <div className="text-sm text-gray-500 ">
                      Featuring user-friendly design for ease of use, developed
                      using Swift.
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl text-black mb-2">
                      BNEC Staff of Information Technology{" "}
                    </div>
                    <div className="text-sm text-gray-500 ">
                      Develop [neo.mybnec.org] website for national english
                      competition participated by 56 students selected from each
                      universities
                    </div>
                    <div className="text-sm text-gray-500 ">
                      Develop [recruitment.mybnec.org] website for bnec member
                      recruitment. Facilitating registration and backend
                      operations for 600+ emails
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div>
          <button
            className={`w-full bg-transparent border-t border-black cursor-pointer`}
            onClick={() => toggleAccordion(3)}
          >
            <div className="flex justify-between items-center p-8">
              <h4 className="text-3xl font-medium">Recognition</h4>
              <FiPlus
                className={`transition-transform duration-300 ${
                  activeSections[3] ? "transform rotate-45" : ""
                } text-blue-600`}
                size={22}
              />
            </div>
            <div
              ref={(el) => (contentRefs.current[3] = el)}
              className={`overflow-hidden transition-all duration-500 ease-in-out`}
              style={{
                maxHeight: activeSections[3]
                  ? `${contentRefs.current[3]?.scrollHeight}px`
                  : "0px",
              }}
            >
              <div className="ml-4">
                <div className="text-start p-4">
                  <div className="text-lg lg:text-2xl text-black mb-3 underline">
                    Top 10 Winners Hedera Hello Future Hackaton [2024]
                  </div>
                  <div className="text-lg lg:text-2xl text-black mb-3 underline">
                    8th ICITISEE 2024 Publication [2024]
                  </div>
                  <div className="text-lg lg:text-2xl text-black mb-3 underline">
                    B-Startion Finalist [2022]
                  </div>
                  <div className="text-lg lg:text-2xl text-black mb-3 underline">
                    Compfest Traveloka Finalist [2021]
                  </div>

                  <div className="text-lg lg:text-2xl text-black mb-3 mt-12">
                    Other Participation
                  </div>
                  <div className="text-lg text-gray-500 mb-1 mt-1">
                    Top 100 INC Binus University Competitive Programming [2024]
                  </div>
                  <div className="text-lg text-gray-500 mb-1 mt-1">
                    WebIfest Web Design Competition [2023]
                  </div>
                  <div className="text-lg text-gray-500 mb-1 mt-1">
                    Imagine Cup AI Hackaton [2023]
                  </div>
                  <div className="text-lg text-gray-500 mb-1 mt-1">
                    Techfest UX Competition [2022]
                  </div>
                  <div className="text-lg text-gray-500 mb-1 mt-1">
                    Gematik VI UX Competition [2022]
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;

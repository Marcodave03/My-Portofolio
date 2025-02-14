import Macbook from "../assets/Macbook Streamverse.png";
import { useNavigate } from "react-router-dom";
import { pageTransitionIn } from "../utils/gsapAnimation";
import {ArrowForward } from "@mui/icons-material";

const Work = () => {
    const navigate = useNavigate();

    const handleNavigation = (target: string) => {
        const targetText = target.substring(1).toUpperCase() || "HOME";
        pageTransitionIn(targetText, () => {
          navigate(target);
        });
      };

  return (
    <div>
      <div className="flex">
        <div
          className="sidebar ml-8 h-screen w-[25vw] border-r-[2px] hidden lg:flex"
          style={{ borderColor: "#D6D6D6FF" }}
        >
          <div className="m-4">
            <div className="text-2xl text-gray-500 mt-20">Project Title</div>
            <div className="text-2xl">CareerSpot</div>  {/*Can be changed*/}
            <div className="text-2xl text-gray-500 mt-8">Year</div>
            <div className="text-2xl">2023</div> {/*Can be changed*/}
            <div className="text-2xl text-gray-500 mt-8">Role Position</div>
            <div className="text-2xl">Full Stack Engineer & Designer</div> {/*Can be changed*/}
            <div className="text-2xl text-gray-500 mt-8">Publication</div>
            <div className="">
                <div className="text-2xl mt-2">Links</div>{/*Can be changed can insert as many link as user wanr */}
            </div> 
          </div>
        </div>

        <div className="mt-20">
          <div className="flex flex-col mr-20 ml-14 ">
            <div>
              <div>
                <div className="text-4xl mt-8">Careespot</div> {/*Can be changed*/}
                <div className="text-wrap w-[60vw] mt-8 mb-8">
                  Streamverse is a game-changing digital content creation
                  platform built on the Hedera network, embracing Web3
                  principles. It empowers creators with full ownership and
                  control over their work, eliminating intermediaries. By
                  leveraging Hedera's secure and cost-effective infrastructure,
                  Streamverse maximizes profits for creators while promoting
                  transparency and fairness. The platform fosters a sustainable,
                  equitable ecosystem where creators can thrive and directly
                  monetize their content without limitations {/*Can be changed*/}
                </div>
              </div>
            </div>
            <div className="p-5 bg-gray-500 bg-opacity-30 rounded-lg">
              <img className="w-[73vw] rounded-lg" src={Macbook} alt="" />
            </div>

            <div>
              <div className="text-4xl mt-8">Case Study </div>
              <div className="text-wrap w-[60vw] mt-8 mb-8">
                Streamverse is a game-changing digital content creation platform
                built on the Hedera network, embracing Web3 principles. It
                empowers creators with full ownership and control over their
                work, eliminating intermediaries. By leveraging Hedera's secure
                and cost-effective infrastructure, Streamverse maximizes profits
                for creators while promoting transparency and fairness. The
                platform fosters a sustainable, equitable ecosystem where
                creators can thrive and directly monetize their content without {/*Can be changed*/}
                limitations
              </div>
            </div>

            <div className="h-[1px] w-[70vw] bg-black my-4"></div>

            <div>
              <div className="text-4xl mt-36">Problem Definition </div>
              <div className="text-wrap w-[60vw] mt-8 mb-8">
                Streamverse is a game-changing digital content creation platform
                built on the Hedera network, embracing Web3 principles. It
                empowers creators with full ownership and control over their
                work, eliminating intermediaries. By leveraging Hedera's secure
                and cost-effective infrastructure, Streamverse maximizes profits
                for creators while promoting transparency and fairness. The
                platform fosters a sustainable, equitable ecosystem where
                creators can thrive and directly monetize their content without {/*Can be changed*/}
                limitations
              </div>
            </div>

            <div>
              <div className="text-4xl mt-8">Solution </div> 
              <div className="text-wrap w-[60vw] mt-8 mb-8">
                Streamverse is a game-changing digital content creation platform
                built on the Hedera network, embracing Web3 principles. It
                empowers creators with full ownership and control over their
                work, eliminating intermediaries. By leveraging Hedera's secure
                and cost-effective infrastructure, Streamverse maximizes profits
                for creators while promoting transparency and fairness. The
                platform fosters a sustainable, equitable ecosystem where
                creators can thrive and directly monetize their content without {/*Can be changed*/}
                limitations
              </div>
            </div>
            <div>
              <div className="text-4xl mt-8">Feature & Scope</div>
              <div className="text-wrap w-[60vw] mt-8 mb-8">
                Streamverse is a game-changing digital content creation platform
                built on the Hedera network, embracing Web3 principles. It
                empowers creators with full ownership and control over their
                work, eliminating intermediaries. By leveraging Hedera's secure
                and cost-effective infrastructure, Streamverse maximizes profits
                for creators while promoting transparency and fairness. The
                platform fosters a sustainable, equitable ecosystem where
                creators can thrive and directly monetize their content without {/*Can be changed*/}
                limitations
              </div>
            </div>
            <div>
              <div className="text-4xl mt-8">Development</div>
              <div className="text-wrap w-[60vw] mt-8 mb-8">
                Streamverse is a game-changing digital content creation platform
                built on the Hedera network, embracing Web3 principles. It
                empowers creators with full ownership and control over their
                work, eliminating intermediaries. By leveraging Hedera's secure
                and cost-effective infrastructure, Streamverse maximizes profits
                for creators while promoting transparency and fairness. The
                platform fosters a sustainable, equitable ecosystem where 
                creators can thrive and directly monetize their content without {/*Can be changed*/}
                limitations
              </div>
            </div>
            <div>
                <div className="text-4xl mt-36 mb-8">Project Gallery</div>
                <div className="flex flex-wrap">
                    {/*Can be changed can insert as many image as user want */}
                    <div className="p-5 m-4 bg-gray-500 bg-opacity-30 rounded-lg"> 
                        <img className="w-[30vw] rounded-lg" src={Macbook} alt="Project 1" />
                    </div>
                    <div className="p-5 m-4 bg-gray-500 bg-opacity-30 rounded-lg">
                        <img className="w-[30vw] rounded-lg" src={Macbook} alt="Project 2" />
                    </div>
                    <div className="p-5 m-4 bg-gray-500 bg-opacity-30 rounded-lg">
                        <img className="w-[30vw] rounded-lg" src={Macbook} alt="Project 3" />
                    </div>
                    <div className="p-5 m-4 bg-gray-500 bg-opacity-30 rounded-lg">
                        <img className="w-[30vw] rounded-lg" src={Macbook} alt="Project 4" />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>


      <div className="text-4xl col-span-2 text-start lg:text-right w-[100vw] mb-4 mt-14 pr-24 z-20 group ml-4 lg:ml-0">
        <span className="inline-flex items-center relative group-hover:cursor-pointer">
          <ArrowForward
            fontSize="large"
            sx={{ color: "black" }}
            className="transition-transform duration-300 transform group-hover:-rotate-45 z-30"
          />
          <span
            className="ml-2 relative"
            onClick={() => handleNavigation("/work")}
          >
            All Projects
            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform  transition-transform duration-300 scale-x-100"></span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Work;

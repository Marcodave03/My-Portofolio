import { useNavigate } from 'react-router-dom';
import { pageTransitionIn } from "../utils/gsapAnimation";


const About = () => {

  const navigate = useNavigate();
  const handleNavigation = (target: string) => {
      const targetText = target.substring(1).toUpperCase() || "HOME";
      pageTransitionIn(targetText, () => {
        navigate(target);
      });
  };

  return (
    <div>
       <div className="fixed top-1/2 right-0 transform -translate-y-1/2 h-[20vw] w-8 bg-black z-10 hover:w-14 transition-all duration-300 ease-in-out" onClick={() => handleNavigation("/home")}>
            <div className="flex items-center justify-center h-full text-white rotate-90">
                <h1 className="text-xl">Marco.</h1>
            </div>
        </div>
    </div>
  )
}

export default About

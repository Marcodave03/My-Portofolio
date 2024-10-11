import { ArrowForward } from '@mui/icons-material';
import React from 'react';

const Footer = () => {
  return (
    <div className="flex bg-gray-200 text-black p-4 h-[75vh] justify-between">
      {/* First Column: Let's Connect */}
      <div className="w-[75vw] mt-14">
        <h2 className="ml-14 text-4xl mb-8">Let's Get to Work</h2>
        <div className="ml-14 flex">
                    <div className="relative w-64 h-12 border-2 border-black overflow-hidden group cursor-pointer rounded-full mt-5 mr-3">
                        <div className="absolute top-0 left-0 h-full w-0 bg-blue-300 transition-all duration-500 group-hover:w-full"></div>
                        <div className="relative z-10 flex items-center justify-center h-full text-black">
                            <span className="text-2xl font-normal">Get in touch</span>
                        </div>
                        <div className="absolute top-1/2 left-2 w-8 h-8 bg-black rounded-full flex items-center justify-center transition-all duration-500 group-hover:translate-x-[12.5rem] group-hover:-rotate-45 transform -translate-y-1/2">
                            <ArrowForward fontSize="medium" sx={{color:'white'}}/>
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

      {/* Second Column: Footer List */}
      <div className="w-[10vw] mt-14">
        <ul className="flex flex-col space-y-4">
          <li><a href="#" className="text-2xl hover:text-gray-400">Home</a></li>
          <li><a href="#" className="text-2xl hover:text-gray-400">Projects</a></li>
          <li><a href="#" className="text-2xl hover:text-gray-400">About</a></li>
        </ul>
      </div>
      <div className="w-[15vw] mt-14">
        <ul className="flex flex-col space-y-4">
          <li><a href="#" className="text-2xl hover:text-gray-400">[1] Instagram</a></li>
          <li><a href="#" className="text-2xl hover:text-gray-400">[2] Linkedin</a></li>
          <li><a href="#" className="text-2xl hover:text-gray-400">[3] Github</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

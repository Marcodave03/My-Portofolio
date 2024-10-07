import React from 'react'
import Navbar from '../components/Navbar'
import { useEffect, useState, useRef } from 'react'
import Marco from "../assets/Marco.svg"
import Transition from '../transition';

const Home = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100); 
      return () => clearTimeout(timer);
    }, []);

  return (
    <div >

        <div className="flex flex-col sm:flex-row items-center justify-center z-10">
            <div className="text-2xl col-span-2 text-center max-w-[20vw] text-wrap mb-2 sm:mb-0 sm:mr-4 z-10">
                Marco Davincent Dermawan
            </div>

            <div className={`col-span-8 w-[40vw] h-[40vw] border-2 border-black rounded-full bg-transparent flex items-center justify-center mb-2 sm:mb-0 transition-transform duration-500 ease-in-out 
                ${isVisible ? 'scale-100' : 'scale-110'}`}>
                
                <div
                    className={`w-[97%] h-[97%] bg-black rounded-full transition-transform duration-500 ease-in-out 
                        ${isVisible ? 'scale-100' : 'scale-0'}`}>
                </div>

                <div className="absolute inset-0 flex items-end justify-center">
                    <img 
                        src={Marco} 
                        alt="Marco" 
                        className={`mb-2 md:w-[27vw] w-[30vw] h-auto transition-transform duration-700 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
                    />
                </div>
            </div>

            <div className="text-2xl col-span-2 text-center max-w-[20vw] text-wrap mb-2 sm:mb-0 sm:ml-4 z-10" >
                Web Developer & Design Enthusiast
            </div>
        </div>

        <div className="relative z-10">
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
            <p className='text-red-500 text-center'>WORK WORK WORK</p>
        </div>

        
    </div>
  )
}

export default (props: any) => <Transition Component={Home} {...props} />;

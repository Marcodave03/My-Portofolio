import React from 'react'
import BubbleBackground from '../background/AnimatedBackground';
import Transition from '../transition';

const Work = () => {
  return (
    <div>
        <BubbleBackground/> 
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

export default (props: any) => <Transition Component={Work} {...props} />;

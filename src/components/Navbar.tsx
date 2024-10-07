import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar-bg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/about" className="relative overflow-hidden text-gray-600 group">
            <span className="text-xl font-bold text-black block transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-full">
              Marco D.
            </span>
            <span className="text-xl font-bold block absolute inset-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 text-blue-600">
                Marco D.
            </span>
          </Link>
        <div className="flex space-x-6">
          <Link to="/home" className="relative overflow-hidden text-gray-600 group">
            <span className="block transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-full">
              Home
            </span>
            <span className="block absolute inset-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 text-blue-600">
              Home
            </span>
          </Link>
          <Link to="/work" className="relative overflow-hidden text-gray-600 group">
            <span className="block transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-full">
              Work
            </span>
            <span className="block absolute inset-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 text-blue-600">
              Work
            </span>
          </Link>
          <Link to="/about" className="relative overflow-hidden text-gray-600 group">
            <span className="block transition-transform duration-300 transform translate-y-0 group-hover:-translate-y-full">
              About
            </span>
            <span className="block absolute inset-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 text-blue-600">
              About
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

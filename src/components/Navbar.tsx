import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar-bg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold black">
          Marco D.
        </div>
        {/* Desktop Menu */}
        <div className="flex space-x-6">
            <Link to="/home" className="text-gray-600 hover:text-blue-500">Home</Link>
            <Link to="/work" className="text-gray-600 hover:text-blue-500">Work</Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-500">About</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-800">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-3xl mt-4">Page Not Found</h2>
      <p className="mt-2 text-lg">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="mt-4 text-black hover:text-gray-700">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;

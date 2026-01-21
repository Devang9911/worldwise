import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 px-4">
      <div className="text-center max-w-md">
        {/* Error Code */}
        <h1 className="text-8xl font-extrabold text-white tracking-widest">
          404
        </h1>

        {/* Divider */}
        <div className="h-1 w-24 bg-indigo-500 mx-auto my-6 rounded-full"></div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-200 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Action */}
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;

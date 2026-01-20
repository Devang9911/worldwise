import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <section className="min-h-screen bg-[#020617] flex items-center justify-center px-6 pt-10 bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>

      <div className="absolute inset-0 backdrop-blur-xl bg-black/80 border-b border-white/10"></div>
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-center z-10">

        {/* Left: Text */}
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Affordable Travel Tracking
          </h2>

          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Track your journeys, save locations, and revisit your travel
            memories anytime. Simple pricing with everything you need
            to explore the world without limits.
          </p>

          {/* <button className="rounded-full bg-white px-8 py-3 text-lg font-semibold text-black hover:bg-gray-200 transition">
            <Link to={"/login"}>
            Get Started
            </Link>
          </button> */}
        </div>

        {/* Right: Image */}
        <div className="flex justify-center">
          <img
            src="bg.jpg"
            alt="Travel Pricing"
            className="w-full max-w-md rounded-2xl shadow-2xl object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default Pricing;

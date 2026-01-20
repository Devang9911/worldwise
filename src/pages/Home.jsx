import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main
      className="relative w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/80 border-b border-white/10"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 pt-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white/80 leading-tight">
          Travel the World.
          <br />
          Track Every Journey.
        </h1>

        <p className="mt-6 max-w-2xl text-md md:text-lg text-gray-300 ">
          Keep a record of the places you’ve been, relive your memories, and map
          your adventures across the globe — all in one place.
        </p>

        <button className="mt-8 rounded-full bg-white/70 px-8 py-3 text-md font-semibold text-black transition hover:bg-gray-200">
        <Link to={"/app"}>
          Start Tracking Now
          </Link>
        </button>
      </div>
    </main>
  );
}

export default Home;

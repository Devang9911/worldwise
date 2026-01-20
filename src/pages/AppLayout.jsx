import React from "react";
import Sidebar from "../components/Sidebar";
import MapBox from "../components/MapBox";

function AppLayout() {
  return (
    <main
      className="relative w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-black/80 border-b border-white/10"></div>
      <div className="hidden md:flex relative z-10 h-full items-center justify-center text-center px-6">
        <Sidebar/>
        <MapBox/>
      </div>
    </main>
  );
}

export default AppLayout;

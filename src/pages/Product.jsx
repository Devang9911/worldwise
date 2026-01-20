import React from "react";

function Product() {
  return (
    <section className="min-h-screen bg-[#020617] flex items-center justify-center px-6 pt-10 bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="absolute inset-0 backdrop-blur-xl bg-black/80 border-b border-white/10"></div>
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-center z-10">
        
        {/* Image */}
        <div className="flex justify-center">
          <img
            src="bg.jpg"
            alt="Travel Location"
            className="w-full max-w-md rounded-2xl shadow-2xl object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Track Your Travel Locations
          </h2>

          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            Save every destination you visit, mark locations on the map,
            and relive your travel memories anytime. Your journeys,
            beautifully organized in one place.
          </p>

          <ul className="space-y-3 text-gray-400 mb-8">
            <li>📍 Save visited places</li>
            <li>🗺️ Interactive map tracking</li>
          </ul>

        </div>

      </div>
    </section>
  );
}

export default Product;

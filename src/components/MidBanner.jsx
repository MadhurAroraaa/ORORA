import React from "react";
import banner from "../assets/banner.png";
import { useNavigate } from "react-router-dom";

const MidBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 py-16 sm:py-20 md:py-24">
      <div
        className="relative max-w-7xl mx-auto rounded-none md:rounded-2xl bg-cover bg-center min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[600px]"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: "center",
          backgroundAttachment: window.innerWidth > 768 ? "fixed" : "scroll", // disables parallax on mobile
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 md:rounded-2xl flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-8 md:px-12">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
              Next-Gen Electronics at Your Fingertips
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-2xl mx-auto">
              Discover the latest tech innovations with unbeatable prices and free
              shipping on all orders.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-blue-900 to-slate-900 text-white hover:from-slate-700 hover:to-blue-700 font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition duration-300 text-sm sm:text-base md:text-lg"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MidBanner;

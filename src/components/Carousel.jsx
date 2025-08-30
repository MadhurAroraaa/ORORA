import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white text-blue-900 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
    onClick={onClick}
    aria-label="Next slide"
  >
    <FaArrowRight className="text-lg md:text-xl" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white text-blue-900 rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
    onClick={onClick}
    aria-label="Previous slide"
  >
    <FaArrowLeft className="text-lg md:text-xl" />
  </div>
);

const Carousel = () => {
  const navigate = useNavigate();
  const { data, fetchAllProducts } = getData();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: { arrows: false }
      }
    ]
  };

  // Keyboard + scroll nav
  useEffect(() => {
    const handleKey = (e) => {
      const slider = document.querySelector(".slick-slider");
      if (!slider) return;
      if (e.key === "ArrowRight") slider.querySelector(".slick-next")?.click();
      if (e.key === "ArrowLeft") slider.querySelector(".slick-prev")?.click();
    };

    const handleWheel = (e) => {
      const slider = document.querySelector(".slick-slider");
      if (!slider) return;
      if (e.deltaY > 0) slider.querySelector(".slick-next")?.click();
      else if (e.deltaY < 0) slider.querySelector(".slick-prev")?.click();
    };

    window.addEventListener("keydown", handleKey);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div>
      <Slider {...settings}>
        {data?.slice(0, 7)?.map((item, index) => (
          <div key={index} className="bg-gradient-to-br from-slate-900 via-blue-300 to-slate-900">
            <div className="flex flex-col md:flex-row justify-center items-center md:gap-20 lg:gap-40 px-4 py-10 md:h-[600px]">
              {/* Text Section */}
              <div className="space-y-4 md:space-y-6 text-center md:text-left max-w-lg">
                <h3 className="text-gray-200 font-semibold text-xs sm:text-sm">
                  Powering Your World With The Best In Electronics
                </h3>
                <h1
                  className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase line-clamp-3 text-white mb-4 cursor-pointer"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  {item.title}
                </h1>
                <p className="text-gray-900 font-medium text-sm sm:text-base md:text-lg mb-6 line-clamp-3">
                  {item.description}
                </p>
                <button
                  className="bg-gradient-to-r from-blue-900 to-slate-900 text-white px-4 sm:px-5 py-2 rounded-md font-bold transition hover:from-slate-800 hover:to-blue-800"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  Shop Now
                </button>
              </div>

              {/* Image Section */}
              <div className="mt-6 md:mt-0">
                <img
                  src={item.image}
                  onError={(e) => (e.target.style.display = "none")}
                  className="rounded-full w-52 sm:w-72 md:w-[400px] lg:w-[500px] hover:scale-105 transition-all shadow-2xl shadow-blue-300 cursor-pointer"
                  onClick={() => navigate(`/products/${item.id}`)}
                  alt={item.title}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;

import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Category from './Category';
import { useNavigate } from "react-router-dom";


// Custom arrow components
const NextArrow = ({ onClick }) => {
    return (
        <div
            className="absolute right-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white text-blue-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            onClick={onClick}
            aria-label="Next slide"
        >
            <FaArrowRight className="text-xl" />
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div
            className="absolute left-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/80 hover:bg-white text-blue-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            onClick={onClick}
            aria-label="Previous slide"
        >
            <FaArrowLeft className="text-xl" />
        </div>
    );
};

const Carousel = () => {
    const navigate = useNavigate();

    const { data, fetchAllProducts } = getData()
    
    useEffect(() => {
        fetchAllProducts()
    }, [])

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
                settings: {
                    arrows: false
                }
            }
        ]
    };
    useEffect(() => {
    const handleKey = (e) => {
        const slider = document.querySelector(".slick-slider"); 
        if (!slider) return;

        if (e.key === "ArrowRight") {
            slider.querySelector(".slick-next")?.click();
        }
        if (e.key === "ArrowLeft") {
            slider.querySelector(".slick-prev")?.click();
        }
    };

    const handleWheel = (e) => {
        const slider = document.querySelector(".slick-slider");
        if (!slider) return;

        if (e.deltaY > 0) {
            slider.querySelector(".slick-next")?.click();
        } else if (e.deltaY < 0) {
            slider.querySelector(".slick-prev")?.click();
        }
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
                {
                    data?.slice(0, 7)?.map((item, index) => {
                        return (
                            <div key={index} className='bg-gradient-to-br from-slate-900 via-blue-300 to-slate-900 -z-10'>
                                <div className='flex gap-60 justify-center h-[700px] items-center px-4'>
                                    <div className='space-y-6'>
                                        <h3 className='text-gray-200 font-semibold font-sans text-sm'>Powering Your World With The Best In Electronics</h3>
                                        <h1 className='text-5xl font-bold uppercase line-clamp-3 w-[600px] text-white mb-6' onClick={() => navigate(`/products/${item.id}`)}>{item.title}</h1>
                                        <p className='md:w-[500px] line-clamp-3 text-gray-900 pr-7 font-semibold mb-8'>{item.description}</p>
                                        <button className='bg-gradient-to-r from-blue-900 to-slate-900 text-white hover:from-slate-800 hover:to-blue-800 px-3 py-2 rounded-md cursor-pointer mt-2 font-bold transition duration-400' onClick={() => navigate(`/products/${item.id}`)}>Shop Now</button>
                                    </div>
                                    <div className='flex justify-between'>
                                        <img src={item.image} onError={(e) => {
                                            e.target.style.display = 'none';
                                        }} className='rounded-full w-[600px] hover:scale-105 transition-all shadow-2xl shadow-blue-300 ' 
                                        onClick={() => navigate(`/products/${item.id}`)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </Slider>
        </div>
    )
}

export default Carousel
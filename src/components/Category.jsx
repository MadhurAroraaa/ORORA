// src/components/Category.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { getData } from '../context/DataContext'

// Import your images
import mobileImg from "../assets/mobile.png"
import laptopImg from "../assets/laptop.png"
import tvImg from "../assets/tv.png"
import audioImg from "../assets/audio.webp"
import gamingImg from "../assets/gaming.png"
import appliancesImg from "../assets/appliances.png"

const Category = () => {
    const { categoryOnlyData } = getData()

    // Map category names to images
    const categoryImages = {
        mobile: mobileImg,
        laptop: laptopImg,
        tv: tvImg,
        audio: audioImg,
        gaming: gamingImg,
        appliances: appliancesImg,
    }

    // Make sure we have category data before rendering
    if (!categoryOnlyData || categoryOnlyData.length === 0) {
        return <div className="h-40 flex items-center justify-center">Loading categories...</div>;
    }

    return (
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {categoryOnlyData
                    ?.filter((cat) => cat && cat.toLowerCase() !== "all") // remove null/undefined and "All Category"
                    .map((cat, index) => (
                        <Link
                            to={`/category/${cat.toLowerCase()}`}
                            key={index}
                    className="flex flex-col items-center text-center transition-transform hover:scale-108 bg-gradient-to-br from-gray-300 via-sky-50 to-gray-300 rounded-2xl "
                        >
                    <div className="w-50 h-50 flex items-center justify-center hover:scale-115 transition-transform">
                                <img
                                    src={categoryImages[cat.toLowerCase()] || ''}
                                    alt={cat}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentNode.innerHTML = 
                                            `<div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                                                <span class="text-2xl">${cat.charAt(0).toUpperCase()}</span>
                                            </div>`;
                                    }}
                                />
                            </div>
                            <p className="text-sm font-medium text-gray-700 text-center capitalize">{cat}</p>
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default Category
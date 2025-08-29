import React from "react";
import { IoCartOutline, IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const {addToCart,cartItem} = useCart()

    // Convert price to INR
    const priceInRupeesNum = product.price * 85;
    const priceInRupees = priceInRupeesNum.toLocaleString("en-IN");

    const originalPriceNum = priceInRupeesNum + (priceInRupeesNum * product.discount) / 100;
    const originalPrice = originalPriceNum.toLocaleString("en-IN");

    // Ensure rating between 1–5
    const rating = Math.min(5, Math.max(1, Math.round(product.rating?.rate || 4)));

    return (
        <div
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100 hover:border-blue-100 hover:scale-105 cursor-pointer"
            
        >
            
            {/* Product Image */}
            <div className="relative pt-[120%] bg-gray-50 overflow-hidden" onClick={() => navigate(`/products/${product.id}`)}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = "https://placehold.co/300x300?text=No+Image";
                    }}
                />
            </div>

            {/* Product Info */}
            <div className="p-5 flex-1 flex flex-col" >
                {/* Title */}
                <h2 className="text-gray-900 font-medium text-sm leading-tight line-clamp-2 overflow-auto mb-2 min-h-[2.5rem]" onClick={() => navigate(`/products/${product.id}`)}>
                    {product.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center mb-3 ">
                    <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                            <IoStar
                                key={i}
                                className={i < rating ? "fill-current" : "text-gray-300"}
                                size={14}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                        ({product.rating?.count || 0})
                    </span>
                </div>

                {/* Price */}
                <div className="mt-auto ">
                        <p className="text-lg font-bold text-gray-900">
                        ₹{priceInRupees}
                        <span className="text-xs text-gray-500 ml-1 line-through">
                            ₹{originalPrice}
                        </span>
                        <span className="text-xs text-green-600 font-medium ml-2">{product.discount}% off</span>
                    </p>
                </div>

                {/* Add to Cart Button */}
                <button
                    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:opacity-90 transition-opacity hover:shadow-md" onClick={()=>addToCart(product)}
                >
                    <IoCartOutline size={16} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

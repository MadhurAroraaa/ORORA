import axios from 'axios'
import Loading from '../assets/loading.gif'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from "../context/CartContext";


const SingleProduct = () => {
    const params = useParams()
    const [SingleProduct, setSingleProduct] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)
    

    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`https://fakestoreapi.in/api/products/${params.id}`)
            const product = res.data.product
            setSingleProduct(product)
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getSingleProduct()
    }, [])
    const priceInRupeesNum = SingleProduct.price * 85;
    const priceInRupees = priceInRupeesNum.toLocaleString("en-IN");

    const originalPriceNum = priceInRupeesNum + (priceInRupeesNum * SingleProduct.discount) / 100;
    const originalPrice = originalPriceNum.toLocaleString("en-IN");
        const {addToCart,cartItem} = useCart()

    return (
        <>
            {
                SingleProduct ? <div className='px-4 pb-4 md:px-0'>
                    <Breadcrumbs title={SingleProduct.title} />
                    <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-2 gap-10'>
                        <div className='w-full'>
                            <img
                                src={SingleProduct.image}
                                alt={SingleProduct.title}
                                className="w-full rounded-2xl object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    e.target.src = "https://placehold.co/300x300?text=No+Image";
                                }}
                            />
                        </div>
                        <div className='flex flex-col gap-6'>
                            <h1 className='md:text-3xl font-bold text-gray-800'>{SingleProduct.title}</h1>
                            <div className='text-gray-700'>{SingleProduct.brand.toUpperCase()} / {SingleProduct.category.toUpperCase()} / {SingleProduct.model}</div>
                            <p className="text-xl font-bold text-blue-950">
                                ₹{priceInRupees}
                                <span className="text-base text-gray-600 ml-1 line-through">
                                    ₹{originalPrice}
                                </span>
                                <br />
                                <span className="text-sm text-green-600 font-medium">{SingleProduct.discount}% off</span>
                            </p>
                            <div className="text-slate-700">
                                {isExpanded
                                    ? SingleProduct.description
                                    : `${SingleProduct.description.slice(0, 250)}...`}
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-blue-900 font-medium ml-2 hover:text-blue-700 transition-transform"
                                >
                                    {isExpanded ? "Read Less" : "Read More"}
                                </button>
                            </div>
                            {/* <div className='flex items-center gap-4'>
                                <label htmlFor="" className='text-base font-medium text-gray-700'>Quantity: </label>
                                <input type="number" min={1}  className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-950'/>
                            </div> */}
                            <div className='flex gap-4 mt-4'>
                                <button className='px-6 flex gap-2 py-2 text-lg bg-gradient-to-r from-blue-900 to-slate-900 text-white hover:from-slate-700 hover:to-blue-800 transition duration-400 rounded-2xl' onClick={()=>addToCart(SingleProduct)}>
                                    <IoCartOutline className='w-6 h-6'/>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div> : <div className='flex items-center justify-center h-[70vh]'>
                    <img src={Loading} alt="Loading..." className='w-24 h-24 animate-pulse' />
                </div>
            }
        </>
    )
}

export default SingleProduct

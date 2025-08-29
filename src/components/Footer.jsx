import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className='bg-gradient-to-br from-gray-200 via-blue-100 to-gray-300 text-black py-10 font-semibold '>
            <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
                {/*  info */}
                <div className='mb-6 md:mb-0'>
                    <Link to="#"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center">
                        <img src={Logo} alt="" className='h-45 w-45' />
                    </Link>
                    <p className='text-sm'>Powering Your World with the Best in Electronics.</p>
                    <p className='mt-2 text-sm'>Chowk Bazaar,Jagadhri, Yamunanagar, 135003</p>
                    <p className='mb-2 text-sm'>Haryana, India</p>
                    <p className='text-sm'><a href="mailto:aroramadhur0248@gmail.com">Email: aroramadhur0248@gmail.com</a></p>
                    <p className='text-sm'><a href="telto:7419190554">Phone: 7419190554</a></p>
                </div>
                {/* customer service link */}
                <div className='mb-6 md:mb-0'>
                    <h3 className='text-xl font-semibold'>Customer Service</h3>
                    <ul className='mt-2 text-sm space-y-2'>
                        <li>Contact Us</li>
                        <li>Shipping & Returns</li>
                        <li>FAQs</li>
                        <li>Order Tracking</li>
                        <li>Size Guide</li>
                    </ul>
                </div>
                {/* social media links */}
                <div className='mb-6 md:mb-0'>
                    <h3 className='text-xl font-semibold'>Follow Us</h3>
                    <div className='flex space-x-4 mt-2'>
                        <FaFacebook />
                        <FaInstagram />
                        <FaTwitterSquare />
                        <FaPinterest />
                    </div>
                </div>
                {/* newsletter subscription */}
                <div>
                    <h3 className='text-xl font-semibold'>Stay in the Loop</h3>
                    <p className='mt-2 text-sm'>Subscribe to get special offers, free giveaways, and more</p>
                    <form action="" className='mt-4 flex'>
                        <input
                            type="email"
                            placeholder='Your email address'
                            className='w-full p-2 rounded-l-md  text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-50'
                        />
                        <button type='submit' className='bg-gradient-to-r from-blue-900 to-slate-900 text-white hover:from-slate-700 hover:to-blue-700 font-bold py-2 px-4 md:py-3 md:px-6 rounded-lg transition duration-400'>Subscribe</button>
                    </form>
                </div>
            </div>
            {/* bottom section */}
            <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm'>
                <p>&copy; {new Date().getFullYear()} <span className='text-red-500'>Orora</span>. All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer
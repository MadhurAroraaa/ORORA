import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-200 via-blue-100 to-gray-300 text-black py-10 font-semibold">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Info */}
        <div>
          <Link
            to="#"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="flex items-center"
          >
            <img src={Logo} alt="Orora Logo" className="h-25 w-auto" />
          </Link>
          <p className="text-sm mt-2">
            Powering Your World with the Best in Electronics.
          </p>
          <p className="mt-2 text-sm">
            Chowk Bazaar, Jagadhri, Yamunanagar, 135003
          </p>
          <p className="mb-2 text-sm">Haryana, India</p>
          <p className="text-sm">
            <a href="mailto:aroramadhur0248@gmail.com">
              Email: aroramadhur0248@gmail.com
            </a>
          </p>
          <p className="text-sm">
            <a href="tel:+917419190554">Phone: +91 7419190554</a>
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl font-semibold">Customer Service</h3>
          <ul className="mt-3 text-sm space-y-2">
            <li>
              <Link to="/contact" className="hover:text-blue-700 transition">
                Contact Us
              </Link>
            </li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-3 text-2xl">
            <a href="#" className="hover:text-blue-600">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-pink-600">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-400">
              <FaTwitterSquare />
            </a>
            <a href="#" className="hover:text-red-600">
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold">Stay in the Loop</h3>
          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <form action="" className="mt-4 flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full p-2 rounded-md sm:rounded-l-md sm:rounded-r-none text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-50"
            />
            <button
              type="submit"
              className="mt-3 sm:mt-0 bg-gradient-to-r from-blue-900 to-slate-900 text-white hover:from-slate-700 hover:to-blue-700 font-bold py-2 px-6 rounded-md sm:rounded-l-none sm:rounded-r-md transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 border-t border-gray-400 pt-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500">Orora</span>. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;

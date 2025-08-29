import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { MapPin, ShoppingCart } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import '../index.css';
import { CgClose } from "react-icons/cg";
import { useCart } from "../context/CartContext";

const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {
      const {cartItem} = useCart()

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  return (
    <div className="bg-gray-50 shadow-xl bg-gradient-to-br from-slate-100 via-blue-100 to-slate-100">
      <div className="max-w-8xl ml-20 mr-40 h-30 flex justify-between  items-center   ">

        {/* Left Section */}
        <div className="flex gap-10 items-center">
          {/* Logo */}
          <Link to={"/"}>
            <img src={logo} alt="ORORA" className="h-40 w-40 rounded-full" />
          </Link>

          {/* Location */}
          <div className="md:flex gap-1 cursor-pointer text-slate-700 items-center font-semibold hidden">
            <MapPin className="text-slate-700" />
            <div className="-space-y-1">
              {location ? (
                <>
                  <p>{location.county || location.city}</p>
                  <p className="text-sm text-gray-500">{location.state}</p>
                </>
              ) : (
                "Add Address"
              )}
            </div>
            <FaCaretDown onClick={toggleDropDown} />
          </div>

          {/* Location Dropdown */}
          {openDropDown && (
            <div className="w-[250px] h-max shadow-2xl z-50 bg-gray-50 fixed top-27 left-74 border-2 p-5 border-gray-100 rounded-md">
              <h1 className="font-semibold mb-4 text-xl flex justify-between">
                Change Location 
                <span onClick={toggleDropDown} className="cursor-pointer"> 
                  <CgClose />
                </span>
              </h1>
              <button 
                onClick={getLocation} 
                className='bg-gradient-to-r from-blue-900 to-blue-500 text-white hover:from-blue-400 hover:to-blue-800 px-3 py-2 rounded-md cursor-pointer mt-2 font-bold transition duration-400 '
              >
                Detect My Location
              </button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <nav className="flex gap-7 items-center">
          {/* Nav Links */}
          <ul className="md:flex gap-7 items-center text-lg font-semibold hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-black hover:text-blue-600"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-black hover:text-blue-600"
                }`
              }
            >
              Products
            </NavLink>

            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-black hover:text-blue-600"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-black hover:text-blue-600"
                }`
              }
            >
              Contact
            </NavLink>
          </ul>

          {/* Cart */}
          <Link to={"/cart"} className="relative">
            <ShoppingCart className="h-7 w-7 text-slate-700 hover:text-slate-900 transition" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-sm">
              {cartItem.length}
            </span>
          </Link>

          {/* Auth Buttons */}
          <div className="text-slate-700">
            <SignedOut>
              <SignInButton className="text-white bg-gradient-to-r from-blue-900 to-blue-500 px-4 py-2 rounded-xl font-bold cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

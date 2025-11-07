import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { MapPin, ShoppingCart } from "lucide-react";
import { FaCaretDown, FaBars } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { CgClose } from "react-icons/cg";
import { useCart } from "../context/CartContext";

const Navbar = ({ location, getLocation, openDropDown, setOpenDropDown }) => {
  const { cartItem } = useCart();
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  return (
    <div className="bg-gray-50 shadow-xl bg-gradient-to-br from-slate-100 via-blue-100 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to={"/"}>
            <img src={logo} alt="ORORA" className="h-16 w-16 rounded-full" />
          </Link>

          {/* Location (hidden on small screens) */}
          <div className="hidden md:flex gap-1 cursor-pointer text-slate-700 items-center font-semibold">
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
            <div className="w-[250px] shadow-2xl z-50 bg-gray-50 fixed top-20 left-5 md:left-40 border p-5 rounded-md">
              <h1 className="font-semibold mb-4 text-lg flex justify-between">
                Change Location
                <span onClick={toggleDropDown} className="cursor-pointer">
                  <CgClose />
                </span>
              </h1>
              <button
                onClick={getLocation}
                className="bg-gradient-to-r from-blue-900 to-blue-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2 font-bold transition duration-400"
              >
                Detect My Location
              </button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-7 items-center text-lg font-semibold">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <NavLink
                key={item}
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className={({ isActive }) =>
                  `cursor-pointer transition-all duration-200 ${isActive
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-black hover:text-blue-600"
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
          </ul>

          {/* Cart */}
          <Link to={"/cart"} className="relative">
            <ShoppingCart className="h-7 w-7 text-slate-700 hover:text-slate-900 transition" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-2 -right-2 text-white text-sm">
              {cartItem.length}
            </span>
          </Link>

          {/* Auth */}
          <div className="text-slate-700">
            <SignedOut>
              <SignInButton className="text-white bg-gradient-to-r from-blue-900 to-blue-500 px-4 py-2 rounded-xl font-bold cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Hamburger for mobile */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-2xl text-slate-700"
          >
            {mobileMenu ? <CgClose /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-4">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                `block font-semibold ${isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                }`
              }
            >
              {item}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;

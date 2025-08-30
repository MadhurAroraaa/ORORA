import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItem, updateQuantity } = useCart();
  const totalPrice = cartItem.reduce((total, item) => total + (item.price * 85), 0)

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    postcode: "",
    country: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // GET LOCATION
  const getLocation = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();

      setFormData((prev) => ({
        ...prev,
        state: data.region || "",
        postcode: data.postal || "",
        country: data.country_name || "",
      }));
    } catch (err) {
      console.error("Error fetching location:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 min-h-screen">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl ml-3 ">
            My Cart ({cartItem.length} Products)
          </h1>

          {/* CART ITEMS */}
          <div className="mt-10">
            {cartItem.map((item, index) => {
              const priceInRupeesNum = item.price * 85;
              const priceInRupees = priceInRupeesNum.toLocaleString("en-IN");

              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-300 via-sky-50 to-gray-300 p-5 rounded-md flex flex-col sm:flex-row items-center justify-between mt-3 w-full"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 lg:gap-20 w-full">
                    <img
                      src={item.image}
                      alt={item.title.slice(0, 15)}
                      className="w-20 h-20 rounded-md object-cover "
                    />
                    <div className="flex-1">
                      <h1 className="line-clamp-2 text-sm sm:text-base md:text-base lg:text-base break-words">
                        {item.title}
                      </h1>
                      <p className="text-blue-800 font-semibold mt-2 text-sm sm:text-base">
                        ₹{priceInRupees}
                      </p>
                    </div>
                  </div>





                  {/* Quantity Controls */}
                  <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white flex items-center justify-center gap-3 sm:gap-4 p-2 rounded-md font-bold hover:from-slate-700 hover:to-blue-700 transition-transform text-base sm:text-lg md:text-xl m-2 w-full sm:w-auto">
                    <button
                      className="cursor-pointer px-2 sm:px-3"
                      onClick={() => updateQuantity(cartItem, item.id, "decrease")}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="cursor-pointer px-2 sm:px-3"
                      onClick={() => updateQuantity(cartItem, item.id, "increase")}
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Button */}
                  <span className="hover:bg-white/60 transition-all rounded-full p-2 sm:p-3 hover:shadow-2xl flex justify-center items-center">
                    <FaRegTrashCan
                      className="text-blue-800 text-lg sm:text-xl md:text-2xl cursor-pointer"
                      onClick={() => updateQuantity(cartItem, item.id, "delete")}
                    />
                  </span>

                </div>
              );
            })}
          </div>

          {/* DELIVERY INFO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
            <div className="bg-gray-100 rounded-md p-5 sm:p-7 mt-4 space-y-4">
              <h1 className="text-gray-800 text-lg sm:text-xl font-bold">Delivery Info</h1>

              {/* Full Name */}
              <div className="flex flex-col space-y-1">
                <label>Full Name: </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />
              </div>

              {/* Address */}
              <div className="flex flex-col space-y-1">
                <label>Address: </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Your Address"
                  className="p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />
              </div>

              {/* State & Post Code */}
              <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="flex flex-col space-y-1 w-full">
                  <label>State: </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter Your State"
                    className="p-2 rounded-md w-full border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-800"
                  />
                </div>

                <div className="flex flex-col space-y-1 w-full">
                  <label>Post Code: </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    placeholder="Enter Your Post Code"
                    className="p-2 rounded-md w-full border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-800"
                  />
                </div>
              </div>

              {/* Country & Phone */}
              <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="flex flex-col space-y-1 w-full">
                  <label>Country: </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter Your Country"
                    className="p-2 rounded-md w-full border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-800"
                  />
                </div>

                <div className="flex flex-col space-y-1 w-full">
                  <label>Phone Number: </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter Your Phone Number"
                    className="p-2 rounded-md w-full border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-800"
                  />
                </div>
              </div>

              {/* Submit */}
              <button className="bg-gradient-to-r from-blue-900 to-slate-900 text-white w-full sm:w-auto flex justify-center gap-2 py-2 px-3 rounded-md font-bold hover:from-slate-700 hover:to-blue-700 transition-transform text-lg sm:text-xl mt-4">
                Submit
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center w-full text-gray-700">
                ---------------OR---------------
              </div>

              {/* Detect My Location */}
              <div className="flex justify-center">
                <button
                  onClick={getLocation}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-900 to-blue-500 text-white hover:from-blue-400 hover:to-blue-800 px-3 py-2 rounded-md cursor-pointer mt-2 font-bold transition duration-400 disabled:bg-gray-400 w-full sm:w-auto"
                >
                  {loading ? "Detecting..." : "Detect My Location"}
                </button>
              </div>

            </div>
            <div className="bg-white border border-gray-200 shadow-xl rounded-md p-7 mt-4 space-y-4 h-max">
              <h2 className="text-gray-800 text-xl font-bold">Invoice Details</h2>

              {/* Items Total */}
              <div className="flex justify-between items-center">
                <span className="flex gap-1 items-center text-gray-700">
                  <LuNotebookText /> Items Total
                </span>
                <p>₹{totalPrice}</p>
              </div>

              {/* Delivery Fee */}
              <div className="flex justify-between items-center">
                <span className="flex gap-1 items-center text-gray-700">
                  <MdDeliveryDining /> Delivery Fee
                </span>
                <p>
                  <span className="line-through text-sm">₹50</span>
                  <span className="text-green-800 ml-1 text-base">FREE</span>
                </p>
              </div>

              {/* Handling Charge */}
              <div className="flex justify-between items-center">
                <span className="flex gap-1 items-center text-gray-700">
                  <GiShoppingBag /> Handling Charge
                </span>
                <p>₹20</p>
              </div>

              <hr className="text-gray-300 my-2" />

              {/* Grand Total */}
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Grand Total</span>
                <p>₹{totalPrice + 20}</p>
              </div>

              {/* Promo Code */}
              <div>
                <p className="font-semibold text-gray-700 mb-3 mt-5">Apply Promo Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Code"
                    className="flex-1 p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-800"
                  />
                  <button className="bg-gradient-to-r from-blue-900 to-slate-900 text-white px-4 py-2 rounded-md font-bold hover:from-slate-700 hover:to-blue-700 transition text-base">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="bg-gradient-to-br from-red-600 to-slate-900 text-white hover:from-slate-900/70 hover:to-red-600/70 transition duration-500 px-3 py-3 rounded-md w-full font-bold mt-4">
                Proceed To Checkout
              </button>
            </div>

          </div>
        </div>
      ) : (
        // EMPTY CART UI
        <div className="flex flex-col items-center justify-center py-20 h-full w-full text-gray-600 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20 mb-4 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293A1 1 0 007 17h10m-4 4a2 2 0 104 0m-8 0a2 2 0 104 0"
            />
          </svg>
          <h2 className="text-2xl font-semibold uppercase">Your cart is empty</h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven’t added anything yet.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-900 to-slate-900 text-white hover:from-slate-700 hover:to-blue-700 rounded-lg shadow  transition-transform"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import { DataProvider } from "./context/DataContext";
import SingleProduct from "./pages/SingleProduct";
import ScrollToTop from "./components/ScrollToTop"
import { useCart } from "./context/CartContext";


function App() {
  const [location, setLocation] = useState(null);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { cartItem, setCartItem } = useCart()

  const getLocation = async () => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
          const response = await axios.get(url);
          const exactLocation = response.data.address;
          setLocation(exactLocation);
          setOpenDropDown(false);
        } catch (error) {
          console.log("Error fetching location:", error);
        }
      },
      (err) => {
        console.log("Location access denied:", err);
      }
    );
  };

  useEffect(() => {
    getLocation();
    // Show popup on every visit
    setShowPopup(true);
  }, []);
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }
  }, [])

  // Save to localStorage whenever cartItem changes
  useEffect(() => {
    if (cartItem.length > 0) {
      localStorage.setItem('cartItem', JSON.stringify(cartItem))
    } else {
      localStorage.removeItem('cartItem') // optional: clean up when empty
    }
  }, [cartItem])
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <DataProvider>
      <BrowserRouter>
        {/* API Notice Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative animate-fadeIn">
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">Developer Note</h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  This project was originally designed for an electronics API, but the API service crashed.
                  To keep the demo functional, I've switched to an alternative API. Please note that the
                  product data may not perfectly match the UI design. This is a learning project, and I'm
                  focused on building bigger and better projects ahead!
                </p>

                <button
                  onClick={closePopup}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        )}
        <ScrollToTop />
        <Navbar
          location={location}
          getLocation={getLocation}
          openDropDown={openDropDown}
          setOpenDropDown={setOpenDropDown}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
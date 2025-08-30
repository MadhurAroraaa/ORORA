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
  return (
    <DataProvider>
      <BrowserRouter>
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
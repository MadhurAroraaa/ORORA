import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);

    const addToCart = (product) => {
        const itemInCart = cartItem.find((item) => item.id === product.id);

        if (itemInCart) {
            const updatedCart = cartItem.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCartItem(updatedCart);
            toast.success("Product quantity increased");
        } else {
            setCartItem([...cartItem, { ...product, quantity: 1 }]);
            toast.success("Product added to cart!");
        }
    };

    const updateQuantity = (productId, action) => {
        setCartItem((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.id === productId) {
                        let newUnit = item.quantity;
                        if (action === "increase") newUnit++;
                        else if (action === "decrease") newUnit--;
                        else if (action === "delete") newUnit = 0;
                        return newUnit > 0 ? { ...item, quantity: newUnit } : null;
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };

    return (
        <CartContext.Provider
            value={{ cartItem, setCartItem, addToCart, updateQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};

// ✅ custom hook
export const useCart = () => useContext(CartContext);

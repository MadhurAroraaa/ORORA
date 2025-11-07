import { createContext, useContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const fetchAllProducts = async () => {
        try {
            const res = await axios.get("/api/products");
            console.log("Fetched products:", res.data);

            // fakestoreapi.com returns a direct array
            const products = Array.isArray(res.data) ? res.data : [];
            
            if (products.length === 0) {
                console.warn("No products found in API response");
                setData([]);
                return [];
            }

            // Transform data to add missing fields for fakestoreapi.com
            const productData = products.map(product => ({
                ...product,
                brand: product.category || 'Generic',
                model: `Model ${product.id}`,
                discount: Math.floor(Math.random() * 30) + 10, // Random discount 10-40%
                image: product.image || 'https://placehold.co/300x300?text=No+Image'
            }));

            setData(productData);
            return productData;
        } catch (error) {
            console.error("Error fetching products:", error);
            setData([]);
            return [];
        }
    };

    const getUniqueCategory = (data, property) => {
        let newVal = data?.map((curElem) => curElem[property])
        newVal = ["All", ...new Set(newVal)]
        return newVal
    }

    const categoryOnlyData = getUniqueCategory(data, 'category')
    const brandOnlyData = getUniqueCategory(data, 'brand')

    return (
        <DataContext.Provider value={{ data, setData, fetchAllProducts, categoryOnlyData, brandOnlyData }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
export const getData = () => useContext(DataContext)
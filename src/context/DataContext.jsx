import { createContext, useContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    
    const fetchAllProducts = async () => {
        try {
            const res = await axios.get("https://fakestoreapi.in/api/products?limit=150");
            console.log("Fetched products:", res.data);
            const productData=res.data.products
            setData(productData);
            return productData;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    };
        const getUniqueCategory = (data, property) => {
            let newVal = data?.map((curElem) => curElem[property])
            newVal = ["All",...new Set(newVal)]
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
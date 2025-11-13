import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import DataContext from "./DataContext";

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    const fetchAllProducts = useCallback(async () => {
        try {
            const res = await axios.get("/api/products");
            const products = Array.isArray(res.data) ? res.data : [];

            if (products.length === 0) {
                console.warn("No products found in API response");
                setData([]);
                return [];
            }

            const seededDiscount = (id) => (Number(id) % 31) + 10;

            const productData = products.map((product) => ({
                ...product,
                brand: product.category || "Generic",
                model: `Model ${product.id}`,
                discount: seededDiscount(product.id),
                image:
                    product.image || "https://placehold.co/300x300?text=No+Image",
            }));

            setData(productData);
            return productData;
        } catch (error) {
            console.error("Error fetching products:", error);
            setData([]);
            return [];
        }
    }, []);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    const getUniqueCategory = useCallback((items, property) => {
        if (!Array.isArray(items) || items.length === 0) return ["All"];
        const values = items.map((item) => item?.[property]).filter(Boolean);
        return ["All", ...Array.from(new Set(values))];
    }, []);

    const categoryOnlyData = useMemo(
        () => getUniqueCategory(data, "category"),
        [data, getUniqueCategory]
    );
    const brandOnlyData = useMemo(
        () => getUniqueCategory(data, "brand"),
        [data, getUniqueCategory]
    );

    const value = useMemo(
        () => ({
            data,
            setData,
            fetchAllProducts,
            categoryOnlyData,
            brandOnlyData,
        }),
        [data, fetchAllProducts, categoryOnlyData, brandOnlyData]
    );

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};

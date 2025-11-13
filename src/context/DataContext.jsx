import { createContext, useContext, useState, useCallback } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJson = async (url) => {
    const res = await fetch(url);
    const contentType = res.headers.get("content-type") || "";
    if (!res.ok || !contentType.includes("application/json")) {
      throw new Error(`Non-JSON or bad status from ${url}`);
    }
    return res.json();
  };

  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    const remoteUrl = "https://fakestoreapi.com/products";
    const fallbackUrl = "/products.json";
    try {
      const remote = await fetchJson(remoteUrl);
      setData(Array.isArray(remote) ? remote : []);
      return remote;
    } catch (e) {
      console.warn("Remote fetch failed, using local fallback:", e?.message);
      try {
        const local = await fetchJson(fallbackUrl);
        setData(Array.isArray(local) ? local : []);
        return local;
      } catch (fallbackErr) {
        setError(fallbackErr?.message || "Failed to load products");
        setData([]);
        return [];
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getUniqueCategory = (items, property) => {
    const values = (items || []).map((it) => it?.[property]).filter(Boolean);
    return ["All", ...Array.from(new Set(values))];
  };

  const categoryOnlyData = getUniqueCategory(data, "category");
  const brandOnlyData = getUniqueCategory(data, "brand");

  const value = {
    data,
    loading,
    error,
    fetchAllProducts,
    categoryOnlyData,
    brandOnlyData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const getData = () => useContext(DataContext);
export const useData = () => useContext(DataContext);
export default DataContext;
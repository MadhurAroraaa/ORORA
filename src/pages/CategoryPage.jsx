import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../context/DataContext';
import ProductCard from '../components/ProductCard';
import Loading from '../assets/loading.gif';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { data, fetchAllProducts } = getData();
  
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Filter products by category
  const filteredProducts = data.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={Loading} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 capitalize">
          {categoryName} Products
        </h1>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="h-full w-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

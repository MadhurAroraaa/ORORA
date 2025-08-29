import React from 'react'
import { getData } from '../context/DataContext'

const FilterSection = ({
  search, setSearch,
  category, setCategory,
  brand, setBrand,
  priceRange, setPriceRange,
  handleCategoryChange,
  handleBrandChange,
  data
}) => {
  const { categoryOnlyData, brandOnlyData } = getData()
  
  // Calculate min and max prices from data
  const getPriceRange = () => {
    if (data && data.length > 0) {
      const pricesInRupees = data.map(item => item.price * 85);
      const minPrice = Math.floor(Math.min(...pricesInRupees) / 100) * 100;
      const maxPrice = Math.ceil(Math.max(...pricesInRupees) / 100) * 100;
      return { minPrice, maxPrice };
    }
    return { minPrice: 0, maxPrice: 50000 };
  }
  
  const { minPrice, maxPrice } = getPriceRange();

  return (
    <div className='bg-gradient-to-br from-gray-300 via-sky-50 to-gray-300 mt-10 p-4 rounded-md h-max'>
      <input 
        type="text" 
        placeholder='Search' 
        onChange={(e) => setSearch(e.target.value)} 
        value={search} 
        className='w-full p-2 rounded-md bg-white border-2 border-gray-400' 
      />
      
      <h1 className='mt-5 font-semibold text-xl'>Category</h1>
      <div className='flex flex-col gap-2 mt-3'>
        {categoryOnlyData?.map((item, index) => (
          <div key={index} className='flex gap-2'>
            <input 
              type="checkbox" 
              name={item} 
              checked={category === item} 
              value={item} 
              onChange={handleCategoryChange}
            />
            <button className='cursor-pointer uppercase'>{item}</button>
          </div>
        ))}
      </div>

      <h1 className='mt-5 font-semibold text-xl mb-3'>Brand</h1>
      <select 
        className='uppercase bg-white w-full border-gray-200 p-2 border-2 rounded-md' 
        value={brand} 
        onChange={handleBrandChange}
      >
        {brandOnlyData?.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
      <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
      <div className='space-y-3'>
        <div className='text-sm text-gray-600'>
          <span>Up to Rs {priceRange[1]}</span>
        </div>
        <div className='relative'>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([minPrice, parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%, #e5e7eb ${((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%, #e5e7eb 100%)`
            }}
          />
        </div>
      <button 
                    onClick={() => {
                      setSearch('');
                      setCategory('All');
                      setBrand('All');
                      setPriceRange([0, 493400]);
                    }}
                    className='mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-900 to-slate-900 text-white hover:from-slate-700 hover:to-blue-700 rounded-md transition-transform text-sm font-medium'
                  >
                    Reset All Filters
                  </button>
      </div>
    </div>
  )
}

export default FilterSection

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

  // Calculate min and max prices
  const getPriceRange = () => {
    if (data && data.length > 0) {
      const pricesInRupees = data.map(item => item.price * 85)
      const minPrice = Math.floor(Math.min(...pricesInRupees) / 100) * 100
      const maxPrice = Math.ceil(Math.max(...pricesInRupees) / 100) * 100
      return { minPrice, maxPrice }
    }
    return { minPrice: 0, maxPrice: 50000 }
  }

  const { minPrice, maxPrice } = getPriceRange()

  return (
    <div className="bg-gradient-to-br from-gray-300 via-sky-50 to-gray-300 mt-6 p-4 md:p-6 rounded-lg shadow-md w-full h-max">

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="w-full p-2 md:p-3 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
      />

      {/* Category */}
      <h2 className="mt-6 font-semibold text-lg md:text-xl">Category</h2>
      <div className="flex flex-col gap-2 mt-3">
        {categoryOnlyData?.map((item, index) => (
          <label key={index} className="flex items-center gap-2 text-sm md:text-base cursor-pointer">
            <input
              type="checkbox"
              name={item}
              checked={category === item}
              value={item}
              onChange={handleCategoryChange}
              className="h-4 w-4"
            />
            <span className="uppercase">{item}</span>
          </label>
        ))}
      </div>

      {/* Brand */}
      <h2 className="mt-6 font-semibold text-lg md:text-xl">Brand</h2>
      <select
        className="uppercase bg-white w-full border border-gray-300 p-2 md:p-3 rounded-md text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={brand}
        onChange={handleBrandChange}
      >
        {brandOnlyData?.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>

      {/* Price */}
      <h2 className="mt-6 font-semibold text-lg md:text-xl">Price Range</h2>
      <p className="text-sm text-gray-700 mb-2">Up to ₹{priceRange[1]}</p>
      <div className="relative">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step="100"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([minPrice, parseInt(e.target.value)])}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 accent-blue-600"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={() => {
          setSearch('')
          setCategory('All')
          setBrand('All')
          setPriceRange([0, maxPrice])
        }}
        className="mt-6 w-full px-4 py-2.5 bg-gradient-to-r from-blue-900 to-slate-900 text-white hover:from-slate-700 hover:to-blue-700 rounded-md transition-all duration-300 text-sm md:text-base font-medium"
      >
        Reset All Filters
      </button>
    </div>
  )
}

export default FilterSection

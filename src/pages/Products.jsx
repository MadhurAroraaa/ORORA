import React, { useEffect, useState } from 'react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import Loading from '../assets/loading.gif'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination.jsx'

const Products = () => {
  const { data, fetchAllProducts } = getData()
  const [search, setSearch] = useState("")
  const [Category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 50000]) 
  const [page, setPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    fetchAllProducts()
  }, [])

  useEffect(() => {
    if (data && data.length > 0) {
      const pricesInRupees = data.map(item => item.price * 85)
      const minPrice = Math.floor(Math.min(...pricesInRupees) / 100) * 100
      const maxPrice = Math.ceil(Math.max(...pricesInRupees) / 100) * 100
      setPriceRange([minPrice, maxPrice])
    }
  }, [data])

  useEffect(() => {
    setPage(1)
  }, [search, Category, brand, priceRange])

  const handleCategoryChange = (e) => setCategory(e.target.value)
  const handleBrandChange = (e) => setBrand(e.target.value)

  const filteredData = data?.filter((item) => {
    const priceInRupees = item.price * 85
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (Category === "All" || item.category === Category) &&
      (brand === "All" || item.brand === brand) &&
      priceInRupees >= priceRange[0] &&
      priceInRupees <= priceRange[1]
    )
  }) || []

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {data.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* ✅ Sidebar responsive (full width on mobile, fixed on lg) */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <FilterSection 
                search={search} 
                setSearch={setSearch} 
                category={Category} 
                setCategory={setCategory} 
                brand={brand} 
                setBrand={setBrand} 
                priceRange={priceRange} 
                setPriceRange={setPriceRange} 
                handleCategoryChange={handleCategoryChange} 
                handleBrandChange={handleBrandChange}
                data={data}
              />
            </div>
            
            {/* ✅ Products grid auto-adjusts */}
            <div className="flex-1 min-w-0">
              {filteredData.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedData.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-12">
                      <Pagination 
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center p-6 bg-white rounded-lg shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">No products found</h2>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search term</p>
                  <button 
                    onClick={() => {
                      setSearch('')
                      setCategory('All')
                      setBrand('All')
                      setPriceRange([0, 493400])
                    }}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-900 to-slate-900 text-white hover:from-slate-700 hover:to-blue-700 rounded-md transition text-sm font-medium"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[70vh]">
            <img src={Loading} alt="Loading..." className="w-20 h-20 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Products

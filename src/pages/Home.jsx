import React, { useEffect } from 'react'
import Carousel from '../components/Carousel.jsx'
import MidBanner from '../components/MidBanner.jsx'
import Features from '../components/Features.jsx'
import Category from '../components/Category.jsx'
import Footer from '../components/Footer.jsx'
import { getData } from '../context/DataContext'

const Home = () => {
  const { fetchAllProducts } = getData()

  useEffect(() => {
    fetchAllProducts()
  }, [fetchAllProducts])

  return (
    <div>
      <Carousel/>
      <Category />
      <MidBanner/>
      <Features/>
      <Footer/>
    </div>
  )
}

export default Home

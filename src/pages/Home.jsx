import { useEffect } from 'react';
import { useData } from '../context/DataContext';
import Carousel from '../components/Carousel.jsx';
import MidBanner from '../components/MidBanner.jsx';
import Features from '../components/Features';
import Category from '../components/Category';
import Footer from '../components/Footer';

const Home = () => {
  const { fetchAllProducts } = useData();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);


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

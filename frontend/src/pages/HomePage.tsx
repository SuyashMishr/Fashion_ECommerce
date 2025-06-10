import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ShoppingBagIcon, TruckIcon, ShieldCheckIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { TypeAnimation } from 'react-type-animation';
import banner from "../assets/sp.mp4"

const HomePage: React.FC = () => {
  // Mock data for featured products\
  const featuredProducts = [
    {
      id: 1,
      name: "Classic White Shirt",
      brand: "Zara",
      price: 2999,
      originalPrice: 3999,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      rating: 4.5,
      reviews: 128,
      discount: 25
    },
    {
      id: 2,
      name: "Denim Jacket",
      brand: "Levi's",
      price: 4999,
      originalPrice: 6999,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 89,
      discount: 29
    },
    {
      id: 3,
      name: "Summer Dress",
      brand: "H&M",
      price: 1999,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      rating: 4.3,
      reviews: 156,
      discount: 33
    },
    {
      id: 4,
      name: "Casual Sneakers",
      brand: "Nike",
      price: 7999,
      originalPrice: 9999,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 234,
      discount: 20
    }
  ];

  const categories = [
    {
      name: "Women's Fashion",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
      link: "/products?category=women"
    },
    {
      name: "Men's Fashion",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      link: "/products?category=men"
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
      link: "/products?category=accessories"
    },
    {
      name: "Footwear",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop",
      link: "/products?category=footwear"
    }
  ];

  return (
<<<<<<< HEAD
    <div className="min-h-screen overflow-x-hidde">
      {/* Metro Hero Section */}
      <section className="relative bg-slate-700 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
        {/* Metro Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600 opacity-5" style={{ backgroundColor: '#0078D4' }}></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-pink-500 opacity-5" style={{ backgroundColor: '#E91E63' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              {/* Metro Live Tile Badge */}
              <div className="mb-8">
                <div className="inline-flex items-center px-6 py-3 bg-pink-500 text-white font-bold text-sm uppercase tracking-wide" style={{ backgroundColor: '#E91E63', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                  <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
                  Limited Time Offer
                </div>
              </div>

              {/* Metro Typography */}
              <h1 className='flex flex-row text-6xl items-center text-amber-600  '>
                      < TypeAnimation repeat={Infinity} sequence={[`FASHION REDEFINED`,2000,""] } omitDeletionAnimation={true}
                    style={
                      {
                        whiteSpace:"pre-line",
                        display:"block"
                      }
                    }
             /> 
              </h1>
       
              
            

              <p className="text-xl md:text-2xl mb-12 text-gray-600 leading-relaxed max-w-lg" style={{ color: '#4A5568', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                Discover premium collections from global designers.
                <span className="font-bold text-pink-600" style={{ color: '#E91E63' }}> Up to 70% OFF</span> on luxury brands.
              </p>

              {/* Metro Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="group inline-flex items-center px-10 py-5 bg-blue-600 text-white font-bold text-lg uppercase tracking-wide hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#0078D4', fontFamily: 'Inter, Segoe UI, sans-serif' }}
                >
                  SHOP COLLECTION
                  <ArrowRightIcon className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products?featured=true"
                  className="inline-flex items-center px-10 py-5 border-2 border-gray-800 text-gray-800 font-bold text-lg uppercase tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-200"
                  style={{ borderColor: '#2D3748', color: '#2D3748', fontFamily: 'Inter, Segoe UI, sans-serif' }}
                >
                  VIEW DEALS
                </Link>
              </div>
            </div>

            {/* Metro Image Tile */}
            <div className="relative">
              <div className="relative shadow-black shadow-xl border2-gray-400 rounded-sm h-[60%]" >
                <video
                  src={banner} muted loop autoPlay
                />
                {/* Metro Overlay Badge */}
                <div className="absolute top-6 right-6 bg-pink-500 text-white px-6 py-4 font-bold text-xl" style={{ backgroundColor: '#E91E63', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                  <div className="text-center">
                    <div className="text-3xl font-black">70%</div>
                    <div className="text-sm uppercase tracking-wide">OFF</div>
                  </div>
                </div>
              </div>
            </div>
=======
      <div className="min-h-screen font-sans">
    {/* Hero Section */}
  <section className="bg-white py-24">
  <div className="max-w-7xl mx-auto px-4 lg:flex lg:items-center lg:justify-between gap-12">
    
    {/* Image Section - LEFT */}
    <div className="lg:w-1/2 w-full mb-10 lg:mb-0">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop"
          alt="Fashion Model"
          className="w-full h-[500px] object-cover rounded-lg shadow-xl"
        />
        {/* Badge Overlay */}
        <div className="absolute top-6 right-6 bg-[#E91E63] text-white px-6 py-4 font-bold text-xl rounded shadow-md">
          <div className="text-center">
            <div className="text-3xl font-black">70%</div>
            <div className="text-sm uppercase tracking-wide">OFF</div>
>>>>>>> d75c094ab26bb7987cd7a72128265fc7dc8cf652
          </div>
        </div>
      </div>
    </div>

    {/* Text Section - RIGHT */}
    <div className="lg:w-1/2 w-full text-center lg:text-left">
      {/* Offer Badge */}
      <div className="inline-flex items-center mb-6 px-5 py-2 bg-[#E91E63] text-white font-semibold text-xs uppercase tracking-wider rounded-full shadow-md">
        <div className="w-2.5 h-2.5 bg-white rounded-full mr-3 animate-ping" />
        Limited Time Offer
      </div>

      {/* Headings */}
      <h1 className="text-5xl font-extrabold leading-tight text-gray-900 mb-6">
        <span className="block">FASHION</span>
        <span className="block text-[#0078D4]">REDEFINED</span>
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-md mx-auto lg:mx-0">
        Discover premium collections from global designers.
        <span className="font-bold text-[#E91E63]"> Up to 70% OFF</span> on luxury brands.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
        <Link
          to="/products"
          className="group inline-flex items-center px-8 py-4 bg-[#0078D4] text-white text-lg font-bold uppercase rounded-md shadow hover:bg-blue-700 transition"
        >
          SHOP COLLECTION
          <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          to="/products?featured=true"
          className="inline-flex items-center px-8 py-4 border-2 border-gray-800 text-gray-800 text-lg font-bold uppercase rounded-md hover:bg-gray-800 hover:text-white transition"
        >
          VIEW DEALS
        </Link>
      </div>
    </div>
  </div>
</section>



      {/* Metro Live Tiles Section */}
      <section className="py-20 bg-white" style={{ backgroundColor: '#F7FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Free Shipping Tile */}
            <div className="group bg-blue-600 text-white p-8 hover:bg-blue-700 transition-colors duration-200 cursor-pointer" style={{ backgroundColor: '#0078D4', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
              <div className="flex items-center justify-between mb-4">
                <TruckIcon className="h-12 w-12" />
                <div className="w-4 h-4 bg-white rounded-full opacity-60"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Free Shipping</h3>
              <p className="text-blue-100 text-sm font-medium">Orders above ₹999</p>
            </div>

            {/* Secure Payment Tile */}
            <div className="group bg-green-600 text-white p-8 hover:bg-green-700 transition-colors duration-200 cursor-pointer" style={{ backgroundColor: '#059669', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
              <div className="flex items-center justify-between mb-4">
                <ShieldCheckIcon className="h-12 w-12" />
                <div className="w-4 h-4 bg-white rounded-full opacity-60"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Secure Payment</h3>
              <p className="text-green-100 text-sm font-medium">100% Protection</p>
            </div>

            {/* Easy Returns Tile */}
            <div className="group bg-purple-600 text-white p-8 hover:bg-purple-700 transition-colors duration-200 cursor-pointer" style={{ backgroundColor: '#8B5CF6', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
              <div className="flex items-center justify-between mb-4">
                <ShoppingBagIcon className="h-12 w-12" />
                <div className="w-4 h-4 bg-white rounded-full opacity-60"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Easy Returns</h3>
              <p className="text-purple-100 text-sm font-medium">30-Day Policy</p>
            </div>

            {/* Premium Quality Tile */}
            <div className="group bg-pink-600 text-white p-8 hover:bg-pink-700 transition-colors duration-200 cursor-pointer" style={{ backgroundColor: '#E91E63', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
              <div className="flex items-center justify-between mb-4">
                <StarIcon className="h-12 w-12" />
                <div className="w-4 h-4 bg-white rounded-full opacity-60"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wide">Premium Quality</h3>
              <p className="text-pink-100 text-sm font-medium">Global Brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metro Category Grid */}
      <section className="py-20 bg-white" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Metro Section Header */}
          <div className="mb-16">
            <h2 className="text-5xl font-black text-gray-800 mb-6 uppercase tracking-tight" style={{ fontFamily: 'Inter, Segoe UI, sans-serif', color: '#2D3748' }}>
              SHOP BY CATEGORY
            </h2>
            <div className="w-24 h-1 bg-blue-600" style={{ backgroundColor: '#0078D4' }}></div>
          </div>

          {/* Metro Category Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Men's Category Tile */}
            <Link to="/products?category=men" className="group">
              <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
                  alt="Men's Fashion"
                  className="w-full h-80 object-cover"
                />
                {/* Metro Overlay */}
 
               <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex items-end" style={{ backgroundColor: '#0078D4' }}>
                  <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                      MEN'S
                    </h3>
                    <p className="text-blue-100 text-sm font-medium mb-4">
                      Premium shirts, suits & accessories
                    </p>
                    <div className="flex items-center text-white font-bold text-sm uppercase tracking-wide">
                      <span>SHOP NOW</span>
                      <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                {/* Metro Badge */}
                <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-2 text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: '#E91E63', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                  NEW
                </div>
              </div>
            </Link>

            {/* Women's Category Tile */}
            <Link to="/products?category=women" className="group">
              <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <img
                  src="https://i.pinimg.com/736x/77/6a/47/776a479bdb2ede313785c1c42bf3ad62.jpg"
                  alt="Women's Fashion"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-pink-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-end" style={{ backgroundColor: '#E91E63' }}>
                  <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                      WOMEN'S
                    </h3>
                    <p className="text-pink-100 text-sm font-medium mb-4">
                      Elegant dresses, tops & ethnic wear
                    </p>
                    <div className="flex items-center text-white font-bold text-sm uppercase tracking-wide">
                      <span>SHOP NOW</span>
                      <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-2 text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: '#FF6B35', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                  TRENDING
                </div>
              </div>
            </Link>

            {/* Kids Category Tile */}
            <Link to="/products?category=kids" className="group">
              <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop"
                  alt="Kids Fashion"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex items-end" style={{ backgroundColor: '#8B5CF6' }}>
                  <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                      KIDS
                    </h3>
                    <p className="text-purple-100 text-sm font-medium mb-4">
                      Comfortable & stylish kidswear
                    </p>
                    <div className="flex items-center text-white font-bold text-sm uppercase tracking-wide">
                      <span>SHOP NOW</span>
                      <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: '#10B981', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                  SALE
                </div>
              </div>
            </Link>

            {/* Footwear Category Tile */}
            <Link to="/products?category=footwear" className="group">
              <div className="relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop"
                  alt="Footwear"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gray-800 bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex items-end" style={{ backgroundColor: '#2D3748' }}>
                  <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                    <h3 className="text-2xl font-black mb-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                      FOOTWEAR
                    </h3>
                    <p className="text-gray-100 text-sm font-medium mb-4">
                      Sneakers, boots & formal shoes
                    </p>
                    <div className="flex items-center text-white font-bold text-sm uppercase tracking-wide">
                      <span>SHOP NOW</span>
                      <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-2 text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: '#3B82F6', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                  HOT
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Deal of the Day - Myntra Style */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">DEAL OF THE DAY</h2>
            <p className="text-lg text-gray-600">
              Hurry up! Limited time offers
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/products/${product.id}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-pink-600 text-white px-2 py-1 rounded text-xs font-bold">
                        {product.discount}% OFF
                      </span>
                    </div>
                    <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
                      <HeartSolidIcon className="h-4 w-4 text-gray-400 hover:text-pink-500" />
                    </button>
                  </div>

                  <div className="p-3">
                    <div className="mb-1">
                      <span className="text-xs text-gray-500 font-medium uppercase">{product.brand}</span>
                    </div>

                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
                        <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-bold rounded-md hover:bg-pink-700 transition-colors"
            >
              VIEW ALL
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Showcase - Myntra Style */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">SHOP BY BRAND</h2>
            <p className="text-lg text-gray-600">
              Your favorite brands at unbeatable prices
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { name: 'Zara', logo: 'https://static.vecteezy.com/system/resources/thumbnails/037/976/418/small/zara-popular-clothing-brand-and-logo-illustration-free-vector.jpg?w=100&h=100&fit=crop' },
              { name: 'H&M', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXpRqYm8ZV9DX0FdTQzy6Lpcm6GMKfBbNO7Q&s?w=100&h=100&fit=crop' },
              { name: 'Nike', logo: 'https://i.pinimg.com/736x/2b/d2/5a/2bd25a29fc238ec571985e13c7f5647c.jpg?w=100&h=100&fit=crop' },
              { name: "Levi's", logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykXwwnz529UwXEi_tH9ddj8Ocn9RJevFOVQ&s?w=100&h=100&fit=crop' },
              { name: 'Adidas', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4vb_PGup4QOhnnxELbGprz9ZWCvF6xbQMJQ&s?w=100&h=100&fit=crop' },
              { name: 'Puma', logo: 'https://static.vecteezy.com/system/resources/thumbnails/022/076/746/small_2x/puma-logo-and-art-free-vector.jpg?w=100&h=100&fit=crop' }
            ].map((brand, index) => (
              <Link
                key={index}
                to={`/products?brand=${brand.name.toLowerCase()}`}
                className="group bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-16 mx-auto rounded-full object-cover mb-3 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                    {brand.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">
              Find exactly what you're looking for in our curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-w-4 aspect-h-5 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
                  <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                    Explore Collection →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <TruckIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free delivery on orders above ₹999. Fast and reliable shipping nationwide.
              </p>
            </div>

            <div className="text-center group">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <ShieldCheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                100% secure payment with multiple payment options and buyer protection.
              </p>
            </div>

            <div className="text-center group">
              <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                30-day easy return policy. Shop with confidence and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay in Style
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and fashion tips.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-purple-200 text-sm mt-4">
              Join 50,000+ fashion enthusiasts. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join millions of fashion lovers who trust us for their style needs.
            Discover exclusive collections, amazing deals, and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-10 py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-all transform hover:scale-105"
            >
              Start Shopping Now
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center px-10 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all"
            >
              Browse Collection
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

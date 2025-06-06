import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FunnelIcon, Squares2X2Icon, ListBulletIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ProductsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    brand: '',
    priceRange: '',
    size: '',
    color: ''
  });

  // Mock products data with real fashion images
  const products = [
    {
      id: 1,
      name: "Classic White Button Shirt",
      brand: "Zara",
      price: 2999,
      originalPrice: 3999,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      rating: 4.5,
      reviews: 128,
      discount: 25,
      colors: ['white', 'blue', 'black'],
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'shirts',
      isWishlisted: false
    },
    {
      id: 2,
      name: "Vintage Denim Jacket",
      brand: "Levi's",
      price: 4999,
      originalPrice: 6999,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 89,
      discount: 29,
      colors: ['blue', 'black'],
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'jackets',
      isWishlisted: true
    },
    {
      id: 3,
      name: "Floral Summer Dress",
      brand: "H&M",
      price: 1999,
      originalPrice: 2999,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      rating: 4.3,
      reviews: 156,
      discount: 33,
      colors: ['floral', 'red', 'blue'],
      sizes: ['XS', 'S', 'M', 'L'],
      category: 'dresses',
      isWishlisted: false
    },
    {
      id: 4,
      name: "Premium Sneakers",
      brand: "Nike",
      price: 7999,
      originalPrice: 9999,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 234,
      discount: 20,
      colors: ['white', 'black', 'red'],
      sizes: ['7', '8', '9', '10', '11'],
      category: 'footwear',
      isWishlisted: false
    },
    {
      id: 5,
      name: "Casual Blazer",
      brand: "Mango",
      price: 3999,
      originalPrice: 5999,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      rating: 4.4,
      reviews: 67,
      discount: 33,
      colors: ['navy', 'black', 'gray'],
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'blazers',
      isWishlisted: false
    },
    {
      id: 6,
      name: "Leather Handbag",
      brand: "Coach",
      price: 12999,
      originalPrice: 15999,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 45,
      discount: 19,
      colors: ['brown', 'black', 'tan'],
      sizes: ['One Size'],
      category: 'bags',
      isWishlisted: true
    },
    {
      id: 7,
      name: "Slim Fit Jeans",
      brand: "Wrangler",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      rating: 4.2,
      reviews: 198,
      discount: 29,
      colors: ['blue', 'black', 'gray'],
      sizes: ['28', '30', '32', '34', '36'],
      category: 'jeans',
      isWishlisted: false
    },
    {
      id: 8,
      name: "Silk Scarf",
      brand: "Hermès",
      price: 8999,
      originalPrice: 10999,
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 23,
      discount: 18,
      colors: ['multicolor', 'blue', 'red'],
      sizes: ['One Size'],
      category: 'accessories',
      isWishlisted: false
    }
  ];

  const categories = [
    'All Categories',
    'Shirts',
    'Dresses',
    'Jeans',
    'Jackets',
    'Footwear',
    'Accessories',
    'Bags'
  ];

  const brands = [
    'All Brands',
    'Zara',
    'H&M',
    'Nike',
    'Levi\'s',
    'Mango',
    'Coach',
    'Wrangler',
    'Hermès'
  ];

  const priceRanges = [
    'All Prices',
    'Under ₹2,000',
    '₹2,000 - ₹5,000',
    '₹5,000 - ₹10,000',
    'Above ₹10,000'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Professional Header */}
        <div className="mb-12">
          <div className="text-center">
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              FASHION COLLECTION
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover premium fashion from global brands. Curated collections for every style and occasion.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-sm">
                🔥 70% OFF Sale
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-full text-sm">
                ✨ Free Shipping
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-bold rounded-full text-sm">
                🚀 Fast Delivery
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-4 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 -m-8 mb-6 p-6 text-white">
                <div className="flex items-center">
                  <FunnelIcon className="h-6 w-6 mr-3" />
                  <h3 className="text-xl font-bold">Smart Filters</h3>
                </div>
                <p className="text-indigo-100 text-sm mt-2">Find your perfect style</p>
              </div>

              {/* Enhanced Category Filter */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Categories
                </h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category} className="group flex items-center p-3 rounded-xl hover:bg-indigo-50 transition-all duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        defaultChecked={category === 'All Categories'}
                      />
                      <span className="ml-4 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                        {category}
                      </span>
                      <span className="ml-auto text-xs text-gray-400 group-hover:text-indigo-400">
                        {Math.floor(Math.random() * 50) + 10}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Enhanced Brand Filter */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Brands
                </h4>
                <div className="space-y-3">
                  {brands.slice(0, 6).map((brand) => (
                    <label key={brand} className="group flex items-center p-3 rounded-xl hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                      <input
                        type="checkbox"
                        className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded-lg"
                      />
                      <span className="ml-4 text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                        {brand}
                      </span>
                      <span className="ml-auto text-xs text-gray-400 group-hover:text-purple-400">
                        {Math.floor(Math.random() * 30) + 5}
                      </span>
                    </label>
                  ))}
                  <button className="w-full text-left text-sm text-purple-600 hover:text-purple-700 font-medium mt-2 px-3 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200">
                    + Show More Brands
                  </button>
                </div>
              </div>

              {/* Enhanced Price Range Filter */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Price Range
                </h4>
                <div className="space-y-3">
                  {priceRanges.map((range) => (
                    <label key={range} className="group flex items-center p-3 rounded-xl hover:bg-pink-50 transition-all duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300"
                        defaultChecked={range === 'All Prices'}
                      />
                      <span className="ml-4 text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors">
                        {range}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="pt-6 border-t border-gray-200">
                <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-4 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Enhanced Toolbar */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {products.length} Products
                    </span>
                    <span className="ml-2 px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full">
                      In Stock
                    </span>
                  </div>
                  <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-500">
                    <span>•</span>
                    <span>Free shipping on orders above ₹999</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Enhanced Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                    >
                      <option value="popularity">🔥 Most Popular</option>
                      <option value="price-low">💰 Price: Low to High</option>
                      <option value="price-high">💎 Price: High to Low</option>
                      <option value="rating">⭐ Top Rated</option>
                      <option value="newest">✨ Newest First</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Enhanced View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-lg transition-all duration-200 ${
                        viewMode === 'grid'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                      }`}
                    >
                      <Squares2X2Icon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-3 rounded-lg transition-all duration-200 ${
                        viewMode === 'list'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                      }`}
                    >
                      <ListBulletIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Metro Products Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {products.map((product) => (
                <div key={product.id} className={`group bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${viewMode === 'list' ? 'flex' : ''}`} style={{ backgroundColor: '#FFFFFF' }}>
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`object-cover transition-transform duration-300 ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-80'}`}
                      />
                    </Link>

                    {/* Metro Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.discount > 0 && (
                        <div className="bg-pink-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: '#E91E63', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                          -{product.discount}% OFF
                        </div>
                      )}
                      {product.rating >= 4.5 && (
                        <div className="bg-orange-500 text-white px-4 py-2 text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: '#FF6B35', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                          TOP RATED
                        </div>
                      )}
                    </div>

                    {/* Metro Wishlist Button */}
                    <button className="absolute top-4 right-4 p-3 bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200" style={{ backgroundColor: '#FFFFFF' }}>
                      {product.isWishlisted ? (
                        <HeartSolidIcon className="h-6 w-6 text-pink-600" style={{ color: '#E91E63' }} />
                      ) : (
                        <HeartIcon className="h-6 w-6 text-gray-400 hover:text-pink-600" />
                      )}
                    </button>

                    {/* Metro Quick View Overlay */}
                    <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center" style={{ backgroundColor: '#0078D4' }}>
                      <button className="bg-white text-blue-600 px-8 py-4 font-bold text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 duration-300" style={{ color: '#0078D4', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                        QUICK VIEW
                      </button>
                    </div>
                  </div>

                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`} style={{ backgroundColor: '#FFFFFF' }}>
                    <div>
                      {/* Metro Brand Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-blue-600 uppercase tracking-wide" style={{ color: '#0078D4', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                          {product.brand}
                        </span>
                        <div className="flex items-center bg-gray-100 px-3 py-1" style={{ backgroundColor: '#F7FAFC' }}>
                          <StarIcon className="h-4 w-4 text-orange-500 fill-current" style={{ color: '#FF6B35' }} />
                          <span className="text-sm font-bold text-gray-800 ml-1" style={{ color: '#2D3748' }}>{product.rating}</span>
                          <span className="text-xs text-gray-600 ml-1" style={{ color: '#4A5568' }}>({product.reviews})</span>
                        </div>
                      </div>

                      {/* Metro Product Title */}
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 text-xl leading-tight" style={{ color: '#2D3748', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                          {product.name}
                        </h3>
                      </Link>

                      {/* Metro Color Swatches */}
                      <div className="flex items-center space-x-3 mb-6">
                        <span className="text-sm font-medium text-gray-600" style={{ color: '#4A5568', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                          COLORS:
                        </span>
                        {product.colors.slice(0, 4).map((color, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 border-2 border-gray-300 hover:border-blue-600 transition-colors cursor-pointer"
                            style={{
                              backgroundColor: color === 'multicolor' ? '#E91E63' : color,
                              borderColor: '#A0AEC0'
                            }}
                          ></div>
                        ))}
                        {product.colors.length > 4 && (
                          <span className="text-sm text-gray-500" style={{ color: '#A0AEC0' }}>
                            +{product.colors.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metro Pricing Section */}
                    <div className={`${viewMode === 'list' ? 'mt-4' : ''}`}>
                      <div className="mb-6">
                        <div className="flex items-baseline space-x-3 mb-2">
                          <span className="text-3xl font-black text-gray-900" style={{ color: '#2D3748', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-xl text-gray-500 line-through" style={{ color: '#A0AEC0' }}>
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {product.discount > 0 && (
                          <div className="text-sm font-bold text-green-600" style={{ color: '#10B981', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                            YOU SAVE ₹{(product.originalPrice - product.price).toLocaleString()}
                          </div>
                        )}
                      </div>

                      {/* Metro Add to Cart Button */}
                      <button className="w-full bg-blue-600 text-white font-bold py-4 px-6 hover:bg-blue-700 transition-colors duration-200 text-sm uppercase tracking-wide shadow-lg hover:shadow-xl" style={{ backgroundColor: '#0078D4', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center space-x-3">
                <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 border-2 border-gray-300 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200">
                  ← Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-3 text-sm font-bold border-2 rounded-xl transition-all duration-200 ${
                      page === 1
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-lg'
                        : 'text-gray-700 border-gray-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 border-2 border-gray-300 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200">
                  Next →
                </button>
              </nav>
            </div>

            {/* Load More Button */}
            <div className="mt-8 text-center">
              <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-4 px-8 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Load More Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

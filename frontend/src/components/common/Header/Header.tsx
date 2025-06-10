import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ShoppingCartIcon, HeartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { totalItems } = useAppSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowUserMenu(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const categories = [
    {
      name: 'MEN',
      link: '/products?category=men',
      submenu: ['Shirts', 'T-Shirts', 'Jeans', 'Formal Wear', 'Casual Wear', 'Accessories']
    },
    {
      name: 'WOMEN',
      link: '/products?category=women',
      submenu: ['Dresses', 'Tops', 'Ethnic Wear', 'Western Wear', 'Lingerie', 'Accessories']
    },
    {
      name: 'KIDS',
      link: '/products?category=kids',
      submenu: ['Boys', 'Girls', 'Baby', 'Toys', 'School Supplies']
    },
    {
      name: 'FOOTWEAR',
      link: '/products?category=footwear',
      submenu: ['Sneakers', 'Formal Shoes', 'Sandals', 'Boots', 'Sports Shoes']
    },
    {
      name: 'ACCESSORIES',
      link: '/products?category=accessories',
      submenu: ['Bags', 'Watches', 'Jewelry', 'Sunglasses', 'Belts']
    },
    {
      name: 'BEAUTY',
      link: '/products?category=beauty',
      submenu: ['Skincare', 'Makeup', 'Haircare', 'Fragrances', 'Personal Care']
    }
  ];

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-gray-800 text-white text-sm py-2" style={{ backgroundColor: '#2D3748', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Free shipping on orders over ₹999
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                24/7 Support
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <select className="bg-transparent text-white text-sm border-none focus:outline-none">
                <option value="en">🌍 EN</option>
                <option value="hi">🇮🇳 HI</option>
              </select>
              <select className="bg-transparent text-white text-sm border-none focus:outline-none">
                <option value="inr">💰 INR</option>
                <option value="usd">💵 USD</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      
      <header className="bg-white shadow-lg sticky top-0 z-50">
        {/* Main Header */}
        <div className="border-b border-gray-100 flex items-center justify-between">
      <div className="w-full px-2">


     <div className="flex items-center justify-between h-20">

            {/* Modern Metro Logo - Metro Design Language */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  {/* Metro-style Logo Tile */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-none flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105" style={{ backgroundColor: '#0078D4' }}>
                    <div className="text-white font-black text-2xl tracking-tight">
                      MM
                    </div>
                  </div>
                  {/* Live Tile Indicator */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-sm animate-pulse" style={{ backgroundColor: '#E91E63' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="flex items-center ">
                    <span className="text-2xl font-black text-gray-800 tracking-tight hidden md:inline-block" style={{ fontFamily: 'Inter, Segoe UI, sans-serif', color: '#2D3748' }}>
                      Modern Metro
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-600 tracking-wide hidden md:inline-block" style={{ color: '#4A5568' }}>
                    Fashion Redefined
                  </div>
                </div>
              </Link>
            </div>

            {/* Metro Design Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {categories.map((category) => (
                <div key={category.name} className="relative group">
                  <Link
                    to={category.link}
                    className="px-4 py-4 text-sm font-semibold text-gray-800 hover:text-white hover:bg-blue-600 transition-all duration-200 uppercase tracking-wide flex items-center border-b-2 border-transparent hover:border-blue-600"
                    style={{
                      fontFamily: 'Inter, Segoe UI, sans-serif',
                      color: '#2D3748',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0078D4';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#2D3748';
                    }}
                  >
                    {category.name}
                    <svg className="w-4 h-4 ml-2 transform group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Metro-Style Mega Menu */}
                  <div className="absolute top-full left-0 w-96 bg-white shadow-xl border-t-4 border-blue-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50" style={{ backgroundColor: '#FFFFFF', borderTopColor: '#0078D4' }}>
                    {/* Metro Header */}
                    <div className="bg-blue-600 p-6 text-white" style={{ backgroundColor: '#0078D4' }}>
                      <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                        {category.name}
                      </h3>
                      <p className="text-blue-100 text-sm font-medium">
                        Discover premium fashion
                      </p>
                    </div>

                    {/* Metro Content Grid */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                        {category.submenu.map((item, index) => (
                          <Link
                            key={index}
                            to={`${category.link}&subcategory=${item.toLowerCase()}`}
                            className="group/item block p-4 bg-gray-50 hover:bg-blue-600 text-gray-800 hover:text-white transition-all duration-200 border-l-4 border-transparent hover:border-pink-500"
                            style={{
                              backgroundColor: '#F7FAFC',
                              color: '#2D3748',
                              fontFamily: 'Inter, Segoe UI, sans-serif'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#0078D4';
                              e.currentTarget.style.color = '#FFFFFF';
                              e.currentTarget.style.borderLeftColor = '#E91E63';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#F7FAFC';
                              e.currentTarget.style.color = '#2D3748';
                              e.currentTarget.style.borderLeftColor = 'transparent';
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-sm">{item}</span>
                              <svg className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Metro CTA */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <Link
                          to={category.link}
                          className="w-full bg-blue-600 text-white font-bold py-4 px-2 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center text-sm uppercase tracking-wide"
                          style={{
                            backgroundColor: '#0078D4',
                            fontFamily: 'Inter, Segoe UI, sans-serif'
                          }}
                        >
                          <span>View All {category.name}</span>
                          <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Special Offers Badge */}
              <div className="ml-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full text-xs uppercase tracking-wide animate-pulse shadow-lg">
                🔥 Sale 70% Off
              </div>
            </nav>

            {/* Metro Search Bar */}
            <div className="hidden md:flex flex-1 max-w-4xl mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" style={{ color: '#A0AEC0' }} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-16 pr-20 py-6 border-2 border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-600 text-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderColor: '#A0AEC0',
                      color: '#2D3748',
                      fontFamily: 'Inter, Segoe UI, sans-serif'
                    }}
                    placeholder="Search for products, brands, categories..."
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#0078D4';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 120, 212, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#A0AEC0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
                    <div className="flex items-center space-x-4">
                      <kbd className="hidden lg:inline-block px-3 py-2 text-sm font-bold text-blue-600 bg-blue-50 border border-blue-200 shadow-sm" style={{ backgroundColor: '#EBF8FF', color: '#0078D4', borderColor: '#90CDF4' }}>
                        Ctrl+K
                      </kbd>
                      <button
                        type="submit"
                        className="p-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                        style={{ backgroundColor: '#0078D4' }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Advanced Search Suggestions */}
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-2xl border border-gray-200 opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50" style={{ backgroundColor: '#FFFFFF' }}>
                    <div className="p-6">
                      {/* Trending & Recent */}
                      <div className="grid grid-cols-3 gap-6 mb-6">
                        <div>
                          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3" style={{ color: '#2D3748', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                            🔥 Trending
                          </div>
                          <div className="space-y-2">
                            {['dresses', 'jeans', 'sneakers'].map((trend, index) => (
                              <button
                                key={index}
                                className="block text-left text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                style={{ color: '#4A5568', fontFamily: 'Inter, Segoe UI, sans-serif' }}
                              >
                                {trend}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3" style={{ color: '#2D3748', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                            🕒 Recent
                          </div>
                          <div className="space-y-2">
                            {['black shirt', 'heels', 'summer tops'].map((recent, index) => (
                              <button
                                key={index}
                                className="block text-left text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                style={{ color: '#4A5568', fontFamily: 'Inter, Segoe UI, sans-serif' }}
                              >
                                {recent}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3" style={{ color: '#2D3748', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                            📂 Categories
                          </div>
                          <div className="space-y-2">
                            {['Women (1.2k)', 'Men (890)', 'Kids (456)'].map((category, index) => (
                              <button
                                key={index}
                                className="block text-left text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                style={{ color: '#4A5568', fontFamily: 'Inter, Segoe UI, sans-serif' }}
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Popular Products Preview */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4" style={{ color: '#2D3748', fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                          Popular Products
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { name: 'Black Dress', price: '₹1,999', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop' },
                            { name: 'White Sneakers', price: '₹2,499', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop' },
                            { name: 'Denim Jacket', price: '₹1,799', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop' }
                          ].map((product, index) => (
                            <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                              <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                              <div>
                                <div className="text-sm font-medium text-gray-900" style={{ fontFamily: 'Inter, Segoe UI, sans-serif' }}>
                                  {product.name}
                                </div>
                                <div className="text-sm text-blue-600 font-bold" style={{ color: '#0078D4' }}>
                                  {product.price}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2">
              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex flex-col items-center text-gray-700 hover:text-purple-600 transition-all duration-200 p-3 rounded-xl hover:bg-purple-50 group"
                >
                  <div className="relative">
                    <UserIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                    {isAuthenticated && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <span className="text-xs font-medium mt-1 group-hover:text-purple-600">
                    {isAuthenticated ? 'Account' : 'Sign In'}
                  </span>
                </button>

                {/* Enhanced User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 transform opacity-0 scale-95 animate-in">
                    {isAuthenticated ? (
                      <>
                        <div className="px-6 py-4 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                {user?.firstName?.charAt(0) || 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Hello, {user?.firstName}!</p>
                              <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          <Link
                            to="/profile"
                            className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <UserIcon className="h-5 w-5 mr-3" />
                            My Profile
                          </Link>
                          <Link
                            to="/orders"
                            className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <ShoppingCartIcon className="h-5 w-5 mr-3" />
                            My Orders
                          </Link>
                          <Link
                            to="/wishlist"
                            className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <HeartIcon className="h-5 w-5 mr-3" />
                            My Wishlist
                          </Link>
                        </div>

                        <div className="border-t border-gray-100 py-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                          >
                            <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-6 py-4 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Welcome to Modern Metro</h3>
                          <p className="text-sm text-gray-500">Sign in to access your account</p>
                        </div>
                        <div className="py-2">
                          <Link
                            to="/login"
                            className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m0 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Sign In
                          </Link>
                          <Link
                            to="/register"
                            className="flex items-center px-6 py-3 text-sm text-purple-600 hover:bg-purple-50 font-medium transition-all duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Create Account
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="flex flex-col items-center text-gray-700 hover:text-purple-600 transition-all duration-200 p-3 rounded-xl hover:bg-purple-50 group relative"
              >
                <div className="relative">
                  <HeartIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>
                <span className="text-xs font-medium mt-1 group-hover:text-purple-600">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="flex flex-col items-center text-gray-700 hover:text-purple-600 transition-all duration-200 p-3 rounded-xl hover:bg-purple-50 group relative"
              >
                <div className="relative">
                  <ShoppingCartIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium mt-1 group-hover:text-purple-600">
                  Cart {totalItems > 0 && `(${totalItems})`}
                </span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-gray-100"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          {/* Search Bar - Mobile */}
          <div className="px-4 py-3 border-b border-gray-200">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm"
                  placeholder="Search for products..."
                />
              </div>
            </form>
          </div>

          {/* Mobile Navigation */}
          <div className="px-2 py-3 space-y-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="block px-2 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}

            {/* Mobile User Actions */}
            <div className="pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <>
                  <div className="px-2 py-2 text-sm text-gray-500">
                    Signed in as {user?.firstName}
                  </div>
                  <Link
                    to="/profile"
                    className="block px-2 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-2 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-2 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block px-2 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ShoppingCartIcon, HeartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import SearchBar from '../../SearchBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery('');
  }
};

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { totalItems } = useAppSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowUserMenu(false);
    toast.success("Loggeed out successfully");
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
      <div
        className="hidden md:block bg-gray-800 text-white text-sm py-2 "
        style={{ backgroundColor: '#2D3748', fontFamily: 'Inter, Segoe UI, sans-serif' }}
      >
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
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
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



      {/*navigation*/}
      <nav className="hidden lg:flex bg-slate-400 space-x-1 flex-row justify-center items-center text-orange-400 relative z-40">
        {categories.map((category) => (
          <div key={category.name} className="relative group z-40 hover:z-50">
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


      {/* Main Navigation Header */}
      <header className="bg-cyan-500 rounded-md text-white shadow-lg sticky top-0 z-38 flex flex-col flex-wrap">
        {/* Main Header */}
        <div className="border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Modern Metro Logo - Metro Design Language */}
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center group">
                  <div className="relative">
                    {/* Metro-style Logo Tile */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105" style={{ backgroundColor: '#0078D4' }}>
                      <div className="text-white font-black text-2xl tracking-tight">
                        MM
                      </div>
                    </div>
                    {/* Live Tile Indicator */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r -translate-x-7 translate-y-2 from-pink-500 to-pink-600 rounded-full animate-pulse" style={{ backgroundColor: '#E91E63' }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6">
                    <div className="flex items-center">
                      <span className="text-3xl font-black text-gray-800 tracking-tight" style={{ fontFamily: 'Inter, Segoe UI, sans-serif', color: '#2D3748' }}>
                        Modern Metro
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-600 tracking-wide" style={{ color: '#4A5568' }}>
                      Fashion Redefined
                    </div>
                  </div>
                </Link>
              </div>

              {/* Metro Design Navigation */}

              {/* Search Bar */}
              <SearchBar
                isAuthenticated={isAuthenticated}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
              />

              {/* Right Side Icons */}
              <div className="flex items-center space-x-2">

                <div className="hidden md:flex items-center gap-3">
                  {!isAuthenticated ? (
                    <>
                      {/* Sign In Button */}
                      <Link
                        to="/login"
                        className="flex items-center text-gray-700 hover:text-purple-600 transition-all duration-200 p-3 rounded-xl hover:bg-purple-50"
                      >
                        <UserIcon className="h-6 w-6 mr-2" />
                        <span className="text-sm font-medium">Sign In</span>
                      </Link>

                      {/* Create Account Button */}
                      <Link
                        to="/register"
                        className="flex items-center text-gray-600 transition-all duration-200 p-3 rounded-xl hover:bg-purple-50 font-medium"
                      >
                        <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Create Account
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* My Profile */}
                      <Link
                        to="/profile"
                        className="flex items-center text-gray-700 hover:text-purple-600 transition-all duration-200 p-3 rounded-xl hover:bg-purple-50"
                      >
                        <UserIcon className="h-6 w-6 mr-2" />
                        <span className="text-sm font-medium">My Profile</span>
                      </Link>

                      {/* My Orders */}
                      <Link
                        to="/orders"
                        className="flex items-center text-gray-700 hover:text-purple-600 transition-all duration-200 p-3 rounded-xl hover:bg-purple-50"
                      >
                        <ShoppingCartIcon className="h-6 w-6 mr-2" />
                        <span className="text-sm font-medium">My Orders</span>
                      </Link>

                      {/* My Wishlist */}
                      <Link
                        to="/wishlist"
                        className="flex items-center text-gray-700 hover:text-purple-600 transition-all duration-200 p-3 rounded-xl hover:bg-purple-50"
                      >
                        <HeartIcon className="h-6 w-6 mr-2" />
                        <span className="text-sm font-medium">My Wishlist</span>
                      </Link>

                      {/* Cart */}
                      <Link
                        to="/cart"
                        className="flex items-center text-gray-700 hover:text-purple-600 transition-all duration-200 p-3 rounded-xl hover:bg-purple-50 relative"
                      >
                        <ShoppingCartIcon className="h-6 w-6 mr-2" />
                        {totalItems > 0 && (
                          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                            {totalItems}
                          </span>
                        )}
                        <span className="text-sm font-medium">Cart {totalItems > 0 && `(${totalItems})`}</span>
                      </Link>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center text-red-600 hover:text-red-700 transition-all duration-200 p-3 rounded-xl hover:bg-red-50"
                      >
                        <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </>
                  )}
                </div>




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
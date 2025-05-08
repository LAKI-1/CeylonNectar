import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when navigating
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-${isScrolled ? 'forest-900' : 'white'} hover:text-honey-500 transition-colors font-medium`}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={`text-${isScrolled ? 'forest-900' : 'white'} hover:text-honey-500 transition-colors font-medium`}
          >
            Shop
          </Link>
          <Link 
            to="#about" 
            className={`text-${isScrolled ? 'forest-900' : 'white'} hover:text-honey-500 transition-colors font-medium`}
          >
            Our Story
          </Link>
          <Link 
            to="#contact" 
            className={`text-${isScrolled ? 'forest-900' : 'white'} hover:text-honey-500 transition-colors font-medium`}
          >
            Contact
          </Link>
        </nav>

        {/* User actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-2 text-${isScrolled ? 'forest-900' : 'white'} hover:text-honey-500 transition-colors`}
              >
                <User size={20} />
                <span className="hidden sm:inline">{user?.name}</span>
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  {user?.role === 'vendor' && (
                    <Link 
                      to="/vendor/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Vendor Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/order-tracking" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className={`flex items-center text-${isScrolled ? 'forest-900' : 'white'} hover:text-honey-500 transition-colors`}
            >
              <User size={20} className="mr-1" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
          
          <Link 
            to="/checkout" 
            className="relative"
          >
            <ShoppingCart 
              size={20} 
              className={`text-${isScrolled ? 'forest-900' : 'white'} hover:text-honey-500 transition-colors`} 
            />
            {cart.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-honey-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className={`text-${isScrolled ? 'forest-900' : 'white'}`} />
            ) : (
              <Menu size={24} className={`text-${isScrolled ? 'forest-900' : 'white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 z-50 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-forest-900 hover:text-honey-500 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="text-forest-900 hover:text-honey-500 transition-colors font-medium"
            >
              Shop
            </Link>
            <Link 
              to="#about" 
              className="text-forest-900 hover:text-honey-500 transition-colors font-medium"
            >
              Our Story
            </Link>
            <Link 
              to="#contact" 
              className="text-forest-900 hover:text-honey-500 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
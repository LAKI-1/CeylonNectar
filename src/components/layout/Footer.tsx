import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand and description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Logo className="h-12 w-auto mb-4" isWhite />
            <p className="text-gray-300 mb-6">
              Bringing the finest Sri Lankan honey directly from our dedicated farmers to your table. 
              Sustainable, pure, and full of natural goodness.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-honey-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-honey-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-honey-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-honey-300">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-honey-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-honey-400 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="#about" className="text-gray-300 hover:text-honey-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#blog" className="text-gray-300 hover:text-honey-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#contact" className="text-gray-300 hover:text-honey-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-honey-300">Our Honey</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-honey-400 transition-colors">
                  Wild Forest Honey
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-honey-400 transition-colors">
                  Cinnamon Blossom Honey
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-honey-400 transition-colors">
                  Multifloral Mountain Honey
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-honey-400 transition-colors">
                  Royal Manuka Honey
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-300 hover:text-honey-400 transition-colors">
                  Gift Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-honey-300">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-honey-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  23 Honey Grove,<br />
                  Kandy 20000,<br />
                  Sri Lanka
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 text-honey-400" />
                <a href="tel:+94112345678" className="text-gray-300 hover:text-honey-400 transition-colors">
                  +94 11 234 5678
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 text-honey-400" />
                <a href="mailto:info@ceylonnectar.com" className="text-gray-300 hover:text-honey-400 transition-colors">
                  info@ceylonnectar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-forest-700 pt-8 pb-6">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2 text-honey-300">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-4">Get the latest updates, offers and recipes directly to your inbox</p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 rounded-md bg-forest-800 border border-forest-700 text-white focus:outline-none focus:ring-2 focus:ring-honey-500"
              />
              <button 
                type="submit" 
                className="px-6 py-2 bg-honey-500 hover:bg-honey-600 transition-colors rounded-md font-medium text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-forest-700 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Ceylon Nectar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
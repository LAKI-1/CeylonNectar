import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { id, name, price, images, type, origin, qualityMetrics, discount } = product;

  const discountedPrice = discount ? price - (price * discount / 100) : price;

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div 
      className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
        featured ? 'md:flex' : 'flex flex-col'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : 'w-full aspect-square'}`}>
        <img 
          src={images[0]} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {discount && (
          <div className="absolute top-2 left-2 bg-honey-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {discount}% OFF
          </div>
        )}
        
        {product.bestSeller && !discount && (
          <div className="absolute top-2 left-2 bg-forest-700 text-white px-2 py-1 rounded-md text-sm font-semibold">
            Best Seller
          </div>
        )}
      </div>
      
      <div className={`flex flex-col ${featured ? 'md:w-1/2 p-6' : 'p-4'} h-full`}>
        <div className="mb-2">
          <div className="text-sm text-gray-600 mb-1">{type} • {origin}</div>
          <Link to={`/product/${id}`}>
            <h3 className="font-serif text-xl font-semibold text-forest-900 hover:text-honey-600 transition-colors">
              {name}
            </h3>
          </Link>
        </div>
        
        {featured && (
          <div className="flex flex-wrap gap-3 my-3">
            <div className="bg-cream-50 px-3 py-1.5 rounded-full text-sm">
              <span className="font-medium">Purity:</span> {qualityMetrics.purity}%
            </div>
            <div className="bg-cream-50 px-3 py-1.5 rounded-full text-sm">
              <span className="font-medium">Color:</span> {qualityMetrics.color}
            </div>
          </div>
        )}
        
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div className="flex items-baseline">
            {discount ? (
              <>
                <span className="text-lg font-bold text-forest-800">${discountedPrice.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-bold text-forest-800">${price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-honey-50 hover:bg-honey-100 text-honey-600 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
            
            {featured && (
              <Button
                to={`/product/${id}`}
                variant="outline"
                size="sm"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                View
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
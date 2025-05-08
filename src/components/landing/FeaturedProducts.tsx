import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from '../common/ProductCard';
import Button from '../common/Button';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  // Get featured products
  const featuredProducts = products.filter(product => product.featured).slice(0, 3);
  
  return (
    <section className="py-16 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-serif font-semibold text-forest-900 mb-3">
              Featured Collection
            </h2>
            <p className="text-gray-600">
              Discover our finest honey varieties, carefully selected from the diverse landscapes of Sri Lanka. 
              Each jar carries the essence of its unique origin.
            </p>
          </div>
          <Button
            to="/shop"
            variant="outline"
            className="mt-4 md:mt-0"
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            View All Products
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
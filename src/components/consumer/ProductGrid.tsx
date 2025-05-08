import React from 'react';
import { Grid, List } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from '../common/ProductCard';

interface ProductGridProps {
  products: Product[];
  view?: 'grid' | 'list';
  onViewChange?: (view: 'grid' | 'list') => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  view = 'grid', 
  onViewChange 
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-gray-600">{products.length} products</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-600">Sort by:</div>
          <select className="text-sm border-gray-300 rounded-md focus:border-honey-500 focus:ring focus:ring-honey-200 focus:ring-opacity-50">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
            <option>Best Selling</option>
          </select>
          
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              className={`p-2 ${
                view === 'grid'
                  ? 'bg-honey-50 text-honey-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => onViewChange && onViewChange('grid')}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              className={`p-2 ${
                view === 'list'
                  ? 'bg-honey-50 text-honey-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => onViewChange && onViewChange('list')}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className={view === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-6"
        }>
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              featured={view === 'list'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
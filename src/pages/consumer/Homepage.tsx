import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProductFilters from '../../components/consumer/ProductFilters';
import ProductGrid from '../../components/consumer/ProductGrid';
import { Product } from '../../types';
import { products } from '../../data/mockData';

const Homepage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    type: [],
    origin: [],
    color: []
  });

  // Filter products based on search query and active filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.type.toLowerCase().includes(query)
      );
    }
    
    // Apply category filters
    Object.entries(activeFilters).forEach(([filterName, selectedValues]) => {
      if (selectedValues.length > 0) {
        result = result.filter(product => {
          if (filterName === 'color') {
            return selectedValues.includes(product.qualityMetrics.color);
          }
          return selectedValues.includes((product as any)[filterName]);
        });
      }
    });
    
    setFilteredProducts(result);
  }, [searchQuery, activeFilters]);

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="bg-forest-800 py-12 mb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-semibold text-white mb-3">
            Discover Premium Sri Lankan Honey
          </h1>
          <p className="text-forest-50 max-w-3xl mb-8">
            Explore our collection of pure, sustainably harvested honey varieties direct from Sri Lanka's diverse ecosystems
          </p>
          
          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="search"
              className="w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-honey-500 focus:ring-opacity-50"
              placeholder="Search for honey varieties, flavors, or origins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="md:w-1/4 mb-6 md:mb-0">
            <ProductFilters 
              products={products} 
              onFilterChange={handleFilterChange} 
            />
          </div>
          
          <div className="md:w-3/4">
            <ProductGrid 
              products={filteredProducts} 
              view={viewMode}
              onViewChange={setViewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
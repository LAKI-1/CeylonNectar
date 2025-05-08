import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Product } from '../../types';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  name: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  products: Product[];
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ products, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    type: [],
    origin: [],
    color: []
  });
  
  // Extract unique filter values from products
  const filterGroups: FilterGroup[] = [
    {
      name: 'type',
      options: Array.from(new Set(products.map(p => p.type))).map(type => ({
        label: type,
        value: type
      }))
    },
    {
      name: 'origin',
      options: Array.from(new Set(products.map(p => p.origin))).map(origin => ({
        label: origin.split(',')[0].trim(), // Just take the first part of the origin
        value: origin
      }))
    },
    {
      name: 'color',
      options: Array.from(new Set(products.map(p => p.qualityMetrics.color))).map(color => ({
        label: color,
        value: color
      }))
    }
  ];
  
  const toggleFilter = (group: string, value: string) => {
    const newFilters = { ...selectedFilters };
    
    if (newFilters[group].includes(value)) {
      newFilters[group] = newFilters[group].filter(v => v !== value);
    } else {
      newFilters[group] = [...newFilters[group], value];
    }
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    const emptyFilters = Object.keys(selectedFilters).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {} as Record<string, string[]>);
    
    setSelectedFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };
  
  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).flat().length;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      {/* Mobile filter button */}
      <div className="md:hidden p-4 flex justify-between items-center border-b">
        <button
          className="flex items-center text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter size={18} className="mr-2" />
          <span>Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-honey-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
        
        {getActiveFilterCount() > 0 && (
          <button 
            className="text-sm text-gray-600 hover:text-gray-800"
            onClick={clearFilters}
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Filter content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block p-4`}>
        <div className="md:flex md:justify-between md:items-center mb-4 hidden">
          <h3 className="font-medium text-gray-900">Filter Products</h3>
          
          {getActiveFilterCount() > 0 && (
            <button 
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
              onClick={clearFilters}
            >
              <X size={14} className="mr-1" />
              Clear all filters
            </button>
          )}
        </div>
        
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {filterGroups.map((group) => (
            <div key={group.name} className="md:border-r md:border-gray-200 md:pr-4 last:border-0">
              <h4 className="font-medium text-gray-900 capitalize mb-2">{group.name}</h4>
              <div className="space-y-2">
                {group.options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`${group.name}-${option.value}`}
                      type="checkbox"
                      className="h-4 w-4 text-honey-500 focus:ring-honey-500 border-gray-300 rounded"
                      checked={selectedFilters[group.name].includes(option.value)}
                      onChange={() => toggleFilter(group.name, option.value)}
                    />
                    <label
                      htmlFor={`${group.name}-${option.value}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Selected filters */}
      {getActiveFilterCount() > 0 && (
        <div className="px-4 py-3 bg-gray-50 flex flex-wrap gap-2">
          {Object.entries(selectedFilters).map(([group, values]) =>
            values.map(value => (
              <div
                key={`${group}-${value}`}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-cream-100 text-forest-700"
              >
                <span className="capitalize">{group}:</span> {value.split(',')[0].trim()}
                <button
                  className="ml-1 text-gray-500 hover:text-gray-700"
                  onClick={() => toggleFilter(group, value)}
                >
                  <X size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
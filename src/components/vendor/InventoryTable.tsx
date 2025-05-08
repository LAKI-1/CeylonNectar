import React, { useState } from 'react';
import { Package, AlertCircle, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';
import { InventoryItem } from '../../types';

interface InventoryTableProps {
  inventoryItems: InventoryItem[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventoryItems }) => {
  const [sortField, setSortField] = useState<keyof InventoryItem>('productName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof InventoryItem) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedItems = [...inventoryItems].sort((a, b) => {
    if (sortField === 'stock' || sortField === 'reorderPoint') {
      return sortDirection === 'asc' 
        ? (a[sortField] as number) - (b[sortField] as number)
        : (b[sortField] as number) - (a[sortField] as number);
    } else {
      return sortDirection === 'asc'
        ? (a[sortField] as string).localeCompare(b[sortField] as string)
        : (b[sortField] as string).localeCompare(a[sortField] as string);
    }
  });

  const renderSortIcon = (field: keyof InventoryItem) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-forest-900">Inventory Management</h3>
        <button className="text-forest-600 flex items-center text-sm hover:text-forest-800">
          <RefreshCw size={16} className="mr-1" /> Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('productName')}
              >
                <div className="flex items-center">
                  Product
                  {renderSortIcon('productName')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center">
                  Current Stock
                  {renderSortIcon('stock')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('reorderPoint')}
              >
                <div className="flex items-center">
                  Reorder Point
                  {renderSortIcon('reorderPoint')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastRestocked')}
              >
                <div className="flex items-center">
                  Last Restocked
                  {renderSortIcon('lastRestocked')}
                </div>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedItems.map((item) => (
              <tr key={item.productId} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-honey-100 rounded-md flex items-center justify-center">
                      <Package size={20} className="text-honey-600" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                      <div className="text-sm text-gray-500">ID: {item.productId}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.stock} units</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.reorderPoint} units</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(item.lastRestocked).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {item.stock <= item.reorderPoint ? (
                    <div className="flex items-center text-red-600">
                      <AlertCircle size={16} className="mr-1" />
                      <span className="text-sm font-medium">Low Stock</span>
                    </div>
                  ) : (
                    <div className="text-sm text-green-600 font-medium">In Stock</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryTable;
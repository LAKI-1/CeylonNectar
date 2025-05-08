import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Check, Truck, MapPin, FileText, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Order } from '../../types';
import { orders } from '../../data/mockData';

const OrderTracking: React.FC = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={18} />;
      case 'processing':
        return <Package size={18} />;
      case 'shipped':
        return <Truck size={18} />;
      case 'delivered':
        return <Check size={18} />;
      case 'cancelled':
        return <FileText size={18} />;
      default:
        return <Package size={18} />;
    }
  };
  
  return (
    <div className="pt-24 pb-16 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-serif font-semibold text-forest-900">My Orders</h1>
            <Link 
              to="/shop" 
              className="text-honey-600 hover:text-honey-700 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Package size={48} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-medium text-forest-900 mb-2">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders with us yet. Explore our products and start your honey journey.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-honey-500 hover:bg-honey-600"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Order header */}
                  <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-forest-900">Order #{order.id.split('-')[1]}</h3>
                        <span className={`ml-3 text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="flex items-center text-forest-600 hover:text-forest-800"
                    >
                      {expandedOrder === order.id ? (
                        <>
                          <span className="mr-1">Hide Details</span>
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          <span className="mr-1">View Details</span>
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Order summary (always visible) */}
                  <div className="p-4 flex flex-wrap items-center gap-6 bg-gray-50">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Total</div>
                      <div className="font-medium">${order.totalAmount.toFixed(2)}</div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Items</div>
                      <div className="font-medium">{order.products.length} products</div>
                    </div>
                    
                    {order.trackingInfo && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Tracking</div>
                        <div className="font-medium">{order.trackingInfo.carrier}: {order.trackingInfo.trackingNumber}</div>
                      </div>
                    )}
                    
                    {order.trackingInfo?.estimatedDelivery && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Estimated Delivery</div>
                        <div className="font-medium">{order.trackingInfo.estimatedDelivery}</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Expanded order details */}
                  {expandedOrder === order.id && (
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        {/* Order items */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Items in Your Order</h4>
                          <div className="space-y-4">
                            {order.products.map((product) => (
                              <div key={product.productId} className="flex items-start">
                                <div className="bg-gray-100 p-2 rounded-md mr-3">
                                  <Package size={24} className="text-forest-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-forest-900">{product.name}</div>
                                  <div className="text-sm text-gray-600">
                                    Quantity: {product.quantity} · ${product.price.toFixed(2)} each
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Shipping info */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">Shipping Address</h4>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm text-gray-700">
                              {order.shippingAddress.fullName}<br />
                              {order.shippingAddress.street}<br />
                              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                              {order.shippingAddress.country}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Tracking information */}
                      {order.trackingInfo && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">Tracking Information</h4>
                          <div className="relative">
                            {/* Progress bar */}
                            <div className="absolute left-6 top-5 bottom-0 w-0.5 bg-gray-200" />
                            
                            {/* Status updates */}
                            <div className="space-y-8">
                              {order.trackingInfo.updates.map((update, index) => (
                                <div key={index} className="flex items-start relative">
                                  <div className={`z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                                    index === 0 ? 'bg-forest-100 text-forest-600' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {index === 0 
                                      ? getStatusIcon(order.status) 
                                      : <MapPin size={18} />
                                    }
                                  </div>
                                  <div className="ml-4">
                                    <div className="font-medium text-forest-900">{update.status}</div>
                                    <div className="text-sm text-gray-600">{update.location}</div>
                                    <div className="text-xs text-gray-500">
                                      {new Date(update.timestamp).toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
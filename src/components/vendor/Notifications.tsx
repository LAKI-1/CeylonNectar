import React, { useState } from 'react';
import { Bell, ShoppingBag, Truck, CreditCard, Info, Check, Package } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag size={18} className="text-blue-500" />;
      case 'inventory':
        return <Package size={18} className="text-red-500" />;
      case 'payment':
        return <CreditCard size={18} className="text-green-500" />;
      case 'system':
        return <Info size={18} className="text-purple-500" />;
      default:
        return <Bell size={18} className="text-gray-500" />;
    }
  };
  
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => !notification.read);
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const hours = Math.floor(diffTime / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diffTime / (1000 * 60));
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
      }
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-forest-900">Notifications</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              activeTab === 'all'
                ? 'bg-forest-100 text-forest-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              activeTab === 'unread'
                ? 'bg-forest-100 text-forest-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('unread')}
          >
            Unread
          </button>
        </div>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            <Bell size={30} className="mx-auto mb-2 text-gray-400" />
            <p>No notifications to display</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-cream-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                  
                  {!notification.read && (
                    <button 
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                      aria-label="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-t">
        <a href="#" className="text-sm text-forest-600 hover:text-forest-800">
          View all notifications
        </a>
      </div>
    </div>
  );
};

export default Notifications;
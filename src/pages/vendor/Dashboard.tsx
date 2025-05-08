import React from 'react';
import { Gauge, Package, TrendingUp, Bell, AlertTriangle } from 'lucide-react';
import AnalyticsChart from '../../components/vendor/AnalyticsChart';
import InventoryTable from '../../components/vendor/InventoryTable';
import Notifications from '../../components/vendor/Notifications';
import Card from '../../components/common/Card';
import { 
  priceHistory, 
  pricePrediction, 
  inventoryItems, 
  notifications,
  orders
} from '../../data/mockData';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon, color }) => {
  return (
    <Card className="flex items-center" variant="elevated">
      <div className={`p-3 rounded-md ${color} mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-forest-900">{value}</p>
        <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {change} from last month
        </p>
      </div>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-semibold text-forest-900">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your honey business</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Average Quality Score"
            value="92.5%"
            change="2.3%"
            isPositive={true}
            icon={<Gauge size={24} className="text-blue-600" />}
            color="bg-blue-100"
          />
          <StatCard
            title="Total Sales"
            value="$4,271"
            change="12.5%"
            isPositive={true}
            icon={<TrendingUp size={24} className="text-green-600" />}
            color="bg-green-100"
          />
          <StatCard
            title="Inventory Status"
            value="186 units"
            change="3.8%"
            isPositive={false}
            icon={<Package size={24} className="text-purple-600" />}
            color="bg-purple-100"
          />
          <StatCard
            title="Low Stock Items"
            value="2 products"
            change="1 item"
            isPositive={false}
            icon={<AlertTriangle size={24} className="text-red-600" />}
            color="bg-red-100"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnalyticsChart
            actualData={priceHistory}
            predictedData={pricePrediction}
            title="Market Price Trends & AI Prediction"
            dataLabel="Price per jar"
          />
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-forest-900 mb-4">Quality Metrics Overview</h3>
            
            <div className="space-y-4">
              {/* Purity */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Purity</span>
                  <span className="text-sm text-forest-900 font-medium">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-forest-600 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              
              {/* Density */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Density</span>
                  <span className="text-sm text-forest-900 font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-forest-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              {/* Moisture */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Moisture Level</span>
                  <span className="text-sm text-forest-900 font-medium">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-forest-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              {/* Color Consistency */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Color Consistency</span>
                  <span className="text-sm text-forest-900 font-medium">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-forest-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Quality Tests</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Wild Forest Honey</span>
                  <span className="font-medium text-green-600">Passed - Jun 12</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Cinnamon Blossom Honey</span>
                  <span className="font-medium text-green-600">Passed - Jun 8</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Tea Blossom Honey</span>
                  <span className="font-medium text-yellow-600">Review - Jun 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Inventory and Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InventoryTable inventoryItems={inventoryItems} />
          </div>
          <div>
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
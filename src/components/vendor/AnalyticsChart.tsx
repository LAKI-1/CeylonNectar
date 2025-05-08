import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PriceData } from '../../types';

interface AnalyticsChartProps {
  actualData: PriceData[];
  predictedData: PriceData[];
  title: string;
  dataLabel: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  actualData,
  predictedData,
  title,
  dataLabel
}) => {
  // Combine actual and predicted data for display
  const combinedData = [...actualData];
  
  // Skip the first predicted data point if it matches the last actual data point's date
  const lastActualDate = actualData[actualData.length - 1]?.date;
  const filteredPredicted = predictedData.filter((item, index) => 
    index === 0 ? item.date !== lastActualDate : true
  );
  
  // Add predicted data
  filteredPredicted.forEach(item => {
    combinedData.push({
      ...item,
      isPredicted: true
    });
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm h-full">
      <h3 className="text-lg font-medium text-forest-900 mb-4">{title}</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={combinedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={['auto', 'auto']}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value, name) => [`$${value}`, dataLabel]}
              labelFormatter={formatDate}
              contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              name={dataLabel}
              stroke="#047857"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="predictedPrice"
              name={`Predicted ${dataLabel}`}
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-forest-700 rounded-full mr-2"></div>
          <span className="text-gray-600">Historical Data</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-honey-500 rounded-full mr-2"></div>
          <span className="text-gray-600">AI Predicted Trend</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
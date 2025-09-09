import React from 'react';
import { Card } from '../ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CommodityDetailedStats = ({ commodityStats, topMarkets, selectedCrop }) => {
  const currentCropStats = commodityStats?.find(
    stat => stat.Commodity === selectedCrop
  );

  const currentCropTopMarkets = topMarkets
    ?.filter(market => market.Commodity === selectedCrop)
    ?.sort((a, b) => b.Average_Price - a.Average_Price)
    ?.slice(0, 5);

  const marketChartData = currentCropTopMarkets?.map(market => ({
    market: market.Market,
    price: parseFloat(market.Average_Price)
  }));

  if (!currentCropStats || !currentCropTopMarkets) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Commodity Statistics */}
      <Card className="w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {selectedCrop} Statistics
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600 mb-1">Total Markets</p>
                <p className="text-2xl font-bold text-blue-700">
                  {currentCropStats.Total_Markets}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600 mb-1">Total Districts</p>
                <p className="text-2xl font-bold text-green-700">
                  {currentCropStats.Total_Districts}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Price Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Modal Price</span>
                  <span className="font-semibold">₹{parseFloat(currentCropStats.Modal_Price_Mean).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price Range</span>
                  <span className="font-semibold">
                    ₹{parseFloat(currentCropStats.Modal_Price_Min).toLocaleString()} - 
                    ₹{parseFloat(currentCropStats.Modal_Price_Max).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-700 mb-2">Available Varieties</h3>
              <div className="flex flex-wrap gap-2">
                {currentCropStats.Varieties.split(', ').map((variety, index) => (
                  <span
                    key={index}
                    className="inline-block bg-white px-2 py-1 rounded text-sm text-purple-600"
                  >
                    {variety}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Top Markets */}
      <Card className="w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Top Markets
          </h2>
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={marketChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="market"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  label={{
                    value: 'Average Price (₹)',
                    angle: -90,
                    position: 'insideLeft',
                    offset: 0
                  }}
                />
                <Tooltip
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Average Price']}
                />
                <Bar dataKey="price" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {currentCropTopMarkets.map((market, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3
                    ${index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-amber-600' :
                      'bg-gray-300'}
                  `}>
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{market.Market}</p>
                    <p className="text-sm text-gray-600">{market.Records} records</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    ₹{parseFloat(market.Average_Price).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Average Price</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommodityDetailedStats;

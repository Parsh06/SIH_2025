import React from 'react';
import { Card } from '../ui/card';

const TopCrops = ({ data }) => {
  const topCrops = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.Commodity]) {
        acc[item.Commodity] = {
          commodity: item.Commodity,
          totalPrice: 0,
          count: 0,
          maxPrice: parseInt(item.Modal_Price),
          minPrice: parseInt(item.Modal_Price)
        };
      }
      acc[item.Commodity].totalPrice += parseInt(item.Modal_Price);
      acc[item.Commodity].count += 1;
      acc[item.Commodity].maxPrice = Math.max(acc[item.Commodity].maxPrice, parseInt(item.Modal_Price));
      acc[item.Commodity].minPrice = Math.min(acc[item.Commodity].minPrice, parseInt(item.Modal_Price));
      return acc;
    }, {})
  )
    .map((item) => ({
      ...item,
      averagePrice: Math.round(item.totalPrice / item.count),
    }))
    .sort((a, b) => b.averagePrice - a.averagePrice)
    .slice(0, 5);

  const getRankColor = (index) => {
    switch(index) {
      case 0: return 'bg-yellow-500';
      case 1: return 'bg-gray-400';
      case 2: return 'bg-amber-600';
      default: return 'bg-gray-300';
    }
  };

  return (
    <Card className="w-full shadow-lg rounded-2xl overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-800">🌾 Top 5 Most Valuable Crops</h2>
          <p className="text-sm text-gray-500 mt-1">Based on average market price</p>
        </div>

        {/* Crop List */}
        <div className="grid grid-cols-1 gap-4">
          {topCrops.map((crop, index) => (
            <div
              key={index}
              className={`relative rounded-xl border p-4 transition-transform transform hover:scale-[1.01] hover:shadow-md ${
                index === 0
                  ? 'bg-gradient-to-r from-yellow-50 to-white border-yellow-200'
                  : 'bg-white'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Rank Circle */}
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                  text-white font-bold text-lg shadow-md ${getRankColor(index)}
                `}>
                  #{index + 1}
                </div>

                {/* Crop Details */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {/* Crop Name */}
                  <div className="flex items-center">
                    <h3 className="font-semibold text-gray-800 text-lg leading-tight truncate">
                      {crop.commodity}
                    </h3>
                  </div>

                  {/* Average Price */}
                  <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Average Price</p>
                    <p className="mt-1 text-lg font-bold text-green-600 break-words">
                      ₹{crop.averagePrice.toLocaleString()}
                    </p>
                  </div>

                  {/* Price Range */}
                  <div className="bg-gray-50 rounded-lg p-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Price Range</p>
                    <p className="mt-1 text-sm font-semibold flex flex-wrap items-center">
                      <span className="text-red-500">₹{crop.minPrice.toLocaleString()}</span>
                      <span className="mx-1 text-gray-400">→</span>
                      <span className="text-green-600">₹{crop.maxPrice.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TopCrops;

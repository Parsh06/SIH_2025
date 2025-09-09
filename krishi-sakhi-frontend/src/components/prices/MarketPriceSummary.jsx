import React from 'react';
import { Card } from '../ui/card';

const MarketPriceSummary = ({ data, selectedCrop, selectedDistrict }) => {
  // Filter and process data
  const processedData = data
    .filter(
      (item) =>
        item.Commodity === selectedCrop &&
        (!selectedDistrict || item.District === selectedDistrict)
    )
    .reduce((acc, item) => {
      const key = `${item.District}-${item.Market}`;
      if (!acc[key]) {
        acc[key] = {
          district: item.District,
          market: item.Market,
          varieties: new Set(),
          minPrice: parseInt(item.Min_Price),
          maxPrice: parseInt(item.Max_Price),
          modalPrices: []
        };
      }
      acc[key].varieties.add(item.Variety);
      acc[key].minPrice = Math.min(acc[key].minPrice, parseInt(item.Min_Price));
      acc[key].maxPrice = Math.max(acc[key].maxPrice, parseInt(item.Max_Price));
      acc[key].modalPrices.push(parseInt(item.Modal_Price));
      return acc;
    }, {});

  const summaryData = Object.values(processedData)
    .map(item => ({
      ...item,
      avgModalPrice: Math.round(
        item.modalPrices.reduce((sum, price) => sum + price, 0) / item.modalPrices.length
      ),
      varieties: Array.from(item.varieties).join(', ')
    }))
    .sort((a, b) => b.avgModalPrice - a.avgModalPrice);

  return (
    <Card className="w-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Market Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {summaryData.map((item, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">{item.market}</h3>
                  <span className="text-sm text-gray-500">{item.district}</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Average Price</p>
                    <p className="text-2xl font-bold text-green-600">₹{item.avgModalPrice}</p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Price Range</span>
                    <span>₹{item.minPrice} - ₹{item.maxPrice}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Varieties: </span>
                    <span className="text-gray-800">{item.varieties}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MarketPriceSummary;

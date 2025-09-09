import React from 'react';
import { Card } from '../ui/card';

const VolatilityIndicator = ({ data, selectedCrop, selectedDistrict }) => {
  const filteredData = data
    .filter(
      (item) =>
        item.Commodity === selectedCrop &&
        (!selectedDistrict || item.District === selectedDistrict)
    )
    .map((item) => ({
      ...item,
      spread: parseInt(item.Max_Price) - parseInt(item.Min_Price),
    }))
    .sort((a, b) => b.spread - a.spread);

  const averageSpread =
    filteredData.reduce((sum, item) => sum + item.spread, 0) / filteredData.length;

  return (
    <Card className="w-full">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Price Volatility (Risk Index)</h2>
        <div className="space-y-4">
          {filteredData.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                item.spread > averageSpread * 1.5
                  ? 'bg-red-100 border border-red-300'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    {item.Market} ({item.District})
                  </p>
                  <p className="text-sm text-gray-600">
                    Price Range: ₹{item.Min_Price} - ₹{item.Max_Price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Spread: ₹{item.spread}</p>
                  {item.spread > averageSpread * 1.5 && (
                    <p className="text-red-600 text-sm">High price variation</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default VolatilityIndicator;

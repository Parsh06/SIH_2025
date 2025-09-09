import React from 'react';
import { Card } from '../ui/card';

const MarketPriceTable = ({ data, selectedCrop, selectedDistrict }) => {
  const filteredData = data.filter(
    (item) =>
      item.Commodity === selectedCrop &&
      (!selectedDistrict || item.District === selectedDistrict)
  );

  return (
    <Card className="w-full overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Market Prices</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  District
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variety
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Max Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Modal Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.District}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Market}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.Variety}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{item.Min_Price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{item.Max_Price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{item.Modal_Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};

export default MarketPriceTable;

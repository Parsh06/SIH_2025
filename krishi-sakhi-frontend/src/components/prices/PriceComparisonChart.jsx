import React from 'react';
import { Card } from '../ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const PriceComparisonChart = ({ data, selectedCrop, selectedDistrict }) => {
  const filteredData = data
    .filter(
      (item) =>
        item.Commodity === selectedCrop &&
        (!selectedDistrict || item.District === selectedDistrict)
    )
    // Group by market and calculate average price
    .reduce((acc, item) => {
      const key = `${item.Market} (${item.District})`;
      if (!acc[key]) {
        acc[key] = {
          market: item.Market,
          district: item.District,
          prices: [],
          count: 0
        };
      }
      acc[key].prices.push(parseInt(item.Modal_Price));
      acc[key].count += 1;
      return acc;
    }, {});

  // Convert to array and calculate average price
  const chartData = Object.values(filteredData)
    .map(item => ({
      market: `${item.market}\n(${item.district})`,
      price: Math.round(item.prices.reduce((sum, price) => sum + price, 0) / item.count),
      priceRange: `₹${Math.min(...item.prices)} - ₹${Math.max(...item.prices)}`
    }))
    .sort((a, b) => b.price - a.price);

  return (
    <Card className="w-full h-[500px]">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Price Comparison Across Markets</h2>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing average prices for {selectedCrop} {selectedDistrict ? `in ${selectedDistrict}` : 'across all districts'}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="market"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              tick={{ fontSize: 11 }}
              tickFormatter={(value) => value.split('\n').join(' ')}
            />
            <YAxis
              label={{ 
                value: 'Average Price (₹)', 
                angle: -90, 
                position: 'insideLeft',
                offset: -10,
                style: {
                  textAnchor: 'middle',
                  fontSize: '14px',
                  fill: '#666',
                  paddingLeft: '20px'
                }
              }}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
              width={100}
              padding={{ left: 20 }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-4 shadow-lg rounded-lg border">
                      <p className="font-semibold">{data.market}</p>
                      <p className="text-green-600 font-bold">Average: ₹{data.price}</p>
                      <p className="text-sm text-gray-600">Range: {data.priceRange}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="price" 
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
            >
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PriceComparisonChart;

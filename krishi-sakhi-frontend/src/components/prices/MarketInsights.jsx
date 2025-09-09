import React, { useMemo } from 'react';
import { Card } from '../ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const MarketInsights = ({ commodityStats, topMarkets, selectedCrop }) => {
  const insights = useMemo(() => {
    if (!commodityStats || !topMarkets) return null;

    // Get current commodity data
    const currentCrop = commodityStats.find(stat => stat.Commodity === selectedCrop);
    const cropMarkets = topMarkets.filter(market => market.Commodity === selectedCrop);

    if (!currentCrop || !cropMarkets.length) return null;

    // Calculate price stability index (0-100)
    const priceRange = currentCrop.Modal_Price_Max - currentCrop.Modal_Price_Min;
    const avgPrice = parseFloat(currentCrop.Modal_Price_Mean);
    const stabilityIndex = Math.round(100 - (priceRange / avgPrice * 100));

    // Calculate market concentration
    const totalRecords = cropMarkets.reduce((sum, market) => sum + parseInt(market.Records), 0);
    const marketShare = cropMarkets.map(market => ({
      name: market.Market,
      value: (parseInt(market.Records) / totalRecords) * 100
    }));

    // Identify price segments
    const prices = cropMarkets.map(m => parseFloat(m.Average_Price));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange1 = minPrice + (maxPrice - minPrice) / 3;
    const priceRange2 = minPrice + 2 * (maxPrice - minPrice) / 3;

    const priceSegments = {
      budget: cropMarkets.filter(m => parseFloat(m.Average_Price) <= priceRange1),
      midRange: cropMarkets.filter(m => parseFloat(m.Average_Price) > priceRange1 && parseFloat(m.Average_Price) <= priceRange2),
      premium: cropMarkets.filter(m => parseFloat(m.Average_Price) > priceRange2)
    };

    return {
      stabilityIndex,
      marketShare: marketShare.sort((a, b) => b.value - a.value).slice(0, 5),
      priceSegments,
      cropMarkets,
      currentCrop
    };
  }, [commodityStats, topMarkets, selectedCrop]);

  if (!insights) return null;

  const COLORS = ['#4f46e5', '#7c3aed', '#2563eb', '#db2777', '#9333ea'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Market Health Score */}
      <Card className="col-span-2">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Market Health Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <p className="text-sm text-blue-600 mb-2">Price Stability Index</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-blue-700">{insights.stabilityIndex}</span>
                <span className="text-blue-600 mb-1">/100</span>
              </div>
              <p className="text-sm text-blue-600 mt-2">
                {insights.stabilityIndex > 70 ? 'Very Stable Market' :
                 insights.stabilityIndex > 50 ? 'Moderately Stable' : 'Volatile Market'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <p className="text-sm text-purple-600 mb-2">Market Coverage</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-purple-700">{insights.currentCrop.Total_Markets}</span>
                <span className="text-purple-600 mb-1">Markets</span>
              </div>
              <p className="text-sm text-purple-600 mt-2">
                Across {insights.currentCrop.Total_Districts} Districts
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <p className="text-sm text-green-600 mb-2">Trading Volume</p>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-green-700">{insights.currentCrop.Records_Count}</span>
                <span className="text-green-600 mb-1">Records</span>
              </div>
              <p className="text-sm text-green-600 mt-2">
                Active Trading Activity
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Market Distribution */}
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Market Share Distribution</h2>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={insights.marketShare}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name} (${Math.round(value)}%)`}
                >
                  {insights.marketShare.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Math.round(value)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Price Segments */}
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Price Segment Analysis</h2>
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-700 mb-2">Premium Markets ({insights.priceSegments.premium.length})</h3>
              <div className="space-y-2">
                {insights.priceSegments.premium.map((market, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-green-600">{market.Market}</span>
                    <span className="font-semibold">₹{parseFloat(market.Average_Price).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-700 mb-2">Mid-Range Markets ({insights.priceSegments.midRange.length})</h3>
              <div className="space-y-2">
                {insights.priceSegments.midRange.slice(0, 3).map((market, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-blue-600">{market.Market}</span>
                    <span className="font-semibold">₹{parseFloat(market.Average_Price).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Budget Markets ({insights.priceSegments.budget.length})</h3>
              <div className="space-y-2">
                {insights.priceSegments.budget.slice(0, 3).map((market, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-gray-600">{market.Market}</span>
                    <span className="font-semibold">₹{parseFloat(market.Average_Price).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MarketInsights;

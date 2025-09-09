
import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import Page from '../components/Page';
import BestPriceRecommendation from '../components/prices/BestPriceRecommendation';
import CommodityDetailedStats from '../components/prices/CommodityDetailedStats';
import MarketInsights from '../components/prices/MarketInsights';
import MarketPriceSummary from '../components/prices/MarketPriceSummary';
import MarketPriceTable from '../components/prices/MarketPriceTable';
import PriceComparisonChart from '../components/prices/PriceComparisonChart';
import TopCrops from '../components/prices/TopCrops';
import VolatilityIndicator from '../components/prices/VolatilityIndicator';
import { Card } from '../components/ui/card';

const Prices = () => {
  const [data, setData] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [crops, setCrops] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commodityStats, setCommodityStats] = useState([]);
  const [topMarkets, setTopMarkets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch main market data
        const marketResponse = await fetch('/data/scrapeddata.csv');
        const marketCsvText = await marketResponse.text();

        // Fetch commodity stats
        const statsResponse = await fetch('/data/commodity_stats.csv');
        const statsCsvText = await statsResponse.text();

        // Fetch top markets
        const topMarketsResponse = await fetch('/data/top_markets.csv');
        const topMarketsCsvText = await topMarketsResponse.text();

        // Parse market data
        Papa.parse(marketCsvText, {
          header: true,
          complete: (results) => {
            const parsedData = results.data.filter(row =>
              row.Commodity && row.District && row.Market &&
              row.Min_Price && row.Max_Price && row.Modal_Price
            );

            setData(parsedData);

            // Extract unique crops and districts
            const uniqueCrops = [...new Set(parsedData.map(item => item.Commodity))];
            const uniqueDistricts = [...new Set(parsedData.map(item => item.District))];

            setCrops(uniqueCrops);
            setDistricts(uniqueDistricts);
            setSelectedCrop(uniqueCrops[0]);
          },
        });

        // Parse commodity stats
        Papa.parse(statsCsvText, {
          header: true,
          complete: (results) => {
            setCommodityStats(results.data.filter(row => row.Commodity));
          },
        });

        // Parse top markets
        Papa.parse(topMarketsCsvText, {
          header: true,
          complete: (results) => {
            setTopMarkets(results.data.filter(row => row.Commodity));
          },
        });

        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Page title="Market Prices">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading data...</div>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Market Prices">
      <div className="container mx-auto">
        {/* Filters */}
        <Card className="mb-8">
          <div className="p-4 flex flex-wrap gap-4">
            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Crop
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {crops.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-64">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select District (Optional)
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Districts</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Best Price Recommendation */}
        <div className="mb-8">
          <BestPriceRecommendation data={data} selectedCrop={selectedCrop} />
        </div>

        {/* Price Comparison Chart */}
        <div className="mb-8">
          <PriceComparisonChart
            data={data}
            selectedCrop={selectedCrop}
            selectedDistrict={selectedDistrict}
          />
        </div>

        {/* Market Insights */}
        <MarketInsights
          commodityStats={commodityStats}
          topMarkets={topMarkets}
          selectedCrop={selectedCrop}
        />

        {/* Commodity Detailed Stats */}
        <CommodityDetailedStats
          commodityStats={commodityStats}
          topMarkets={topMarkets}
          selectedCrop={selectedCrop}
        />

        {/* Market Price Summary */}
        <div className="mb-8">
          <MarketPriceSummary
            data={data}
            selectedCrop={selectedCrop}
            selectedDistrict={selectedDistrict}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Volatility Indicator */}
          <VolatilityIndicator
            data={data}
            selectedCrop={selectedCrop}
            selectedDistrict={selectedDistrict}
          />

          {/* Top Crops */}
          <TopCrops data={data} />
        </div>


        
      </div>
    </Page>
  );
};

export default Prices;

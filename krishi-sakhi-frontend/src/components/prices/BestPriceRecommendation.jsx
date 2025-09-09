import React from 'react';
import { Card } from '../ui/card';

const BestPriceRecommendation = ({ data, selectedCrop }) => {
  const filteredData = data.filter((item) => item.Commodity === selectedCrop);
  const bestPrice = filteredData.reduce(
    (max, item) =>
      parseInt(item.Modal_Price) > parseInt(max.Modal_Price) ? item : max,
    filteredData[0]
  );

  if (!bestPrice) return null;

  return (
    <Card className="w-full">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Best Price Recommendation</h2>
        <p className="text-lg">
          Best price for {selectedCrop} today:{' '}
          <span className="font-bold text-green-600">₹{bestPrice.Modal_Price}</span>{' '}
          at {bestPrice.Market} ({bestPrice.District})
        </p>
      </div>
    </Card>
  );
};

export default BestPriceRecommendation;

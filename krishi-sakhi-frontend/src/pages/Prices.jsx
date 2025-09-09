import React from 'react';
import Page from '../components/Page';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const sample = [
  { market: "Ernakulam", crop: "Paddy", price: "₹22/kg" },
  { market: "Thrissur", crop: "Coconut", price: "₹38/kg" },
  { market: "Kozhikode", crop: "Banana", price: "₹58/kg" },
];

export default function Prices(){
  return (
    <Page title="Market Prices">
      <div className="grid md:grid-cols-3 gap-4">
        {sample.map((r, idx) => (
          <Card key={idx}><CardHeader><CardTitle>{r.crop}</CardTitle></CardHeader><CardContent>
            <div className="text-soil-700">{r.market}</div>
            <div className="text-2xl font-semibold">{r.price}</div>
          </CardContent></Card>
        ))}
      </div>
    </Page>
  );
}

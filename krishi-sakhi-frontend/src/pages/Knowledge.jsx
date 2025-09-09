import React from 'react';
import Page from '../components/Page';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { useI18n } from '../context/I18nContext';

const items = [
  { id:1, title: "Paddy Calendar - Kharif", desc: "Field prep → Sowing → Fertilizer → Weed mgmt → Harvest" },
  { id:2, title: "Brinjal Pest: Shoot & Fruit Borer", desc: "Scout twice a week; pheromone traps; spray on threshold." },
  { id:3, title: "Soil Health", desc: "Add farmyard manure; test soil every 2 years." },
];

export default function Knowledge(){
  const { t } = useI18n();
  return (
    <Page title={t["knowledge.title"]}>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map(it => (
          <Card key={it.id}>
            <CardHeader>
              <CardTitle>{it.title}</CardTitle>
              <CardDescription>{it.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <a className="btn btn-outline" href="#" onClick={e=>e.preventDefault()}>Read</a>
            </CardContent>
          </Card>
        ))}
      </div>
    </Page>
  );
}

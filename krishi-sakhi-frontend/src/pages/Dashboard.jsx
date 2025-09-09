import React, { useEffect, useState } from 'react';
import { useI18n } from '../context/I18nContext';
import Page from '../components/Page';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { CloudSun, CloudRain, Wind, Droplets, ThermometerSun, MapPin, Search } from 'lucide-react';
import Sparkline from '../components/charts/Sparkline';
import Radial from '../components/charts/Radial';
import { geocodeCity, getForecast, geocodeSuggest } from '../services/weather';

export default function Dashboard(){
  const [city, setCity] = useState('Kerala');
  const [country, setCountry] = useState('IN');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);
  const [suggest, setSuggest] = useState([]);

  async function loadByName(cityName){
    setLoading(true); setError('');
    try {
      const geo = await geocodeCity(cityName, country);
      const data = await getForecast(geo);
      setCurrent({
        temp: Math.round(data.current.temperature_2m),
        humidity: Math.round(data.current.relative_humidity_2m),
        wind: Math.round(data.current.wind_speed_10m),
        precip: data.current.precipitation,
      });
      setDaily({
        tempMax: data.daily.temperature_2m_max,
        rainProb: data.daily.precipitation_probability_max,
        windMax: data.daily.wind_speed_10m_max,
        dates: data.daily.time
      });
    } catch (e) {
      setError(e.message || 'Failed to load weather');
    } finally {
      setLoading(false);
    }
  }

  async function onType(val){
    setCity(val);
    const results = await geocodeSuggest(val, country, 6).catch(()=>[]);
    setSuggest(results);
  }

  useEffect(()=>{ loadByName(city); }, []);

  const highs = daily?.tempMax || [];
  const rain = daily?.rainProb || [];
  const wind = daily?.windMax || [];

  return (
    <Page title="Dashboard" subtitle="Weather-focused overview for planning">
      {/* Search */}
      <div className="card card-tight mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="input-group grow">
            <MapPin className="text-leaf-700" size={18}/>
            <input
              value={city}
              onChange={e=>onType(e.target.value)}
              placeholder="Search city or district (e.g., Nashik, Pune, Delhi)"
              className="input input-pill"
            />
            <select value={country} onChange={e=>setCountry(e.target.value)} className="border rounded-xl px-2 py-1 text-sm">
              <option value="IN">India</option>
              <option value="">Any</option>
            </select>
            <button onClick={()=>loadByName(city)} className="btn bg-leaf-600 text-white hover:bg-leaf-700 inline-flex items-center gap-2">
              <Search size={16}/> Search
            </button>
          </div>
        </div>
        {suggest.length>0 && (
          <div className="suggest-box">
            {suggest.map((s, i)=>(
              <div key={i} className="suggest-item" onClick={()=>{ setCity(s.label); setSuggest([]); loadByName(s.label); }}>{s.label}</div>
            ))}
          </div>
        )}
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="min-h-[180px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudSun className="text-leaf-700" size={18}/> Today
            </CardTitle>
            <CardDescription>{current ? 'Live conditions' : 'Loading...'}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <div className="text-sm text-soil-700">Loading weather…</div>}
            {current && (
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-left">
                  <div className="text-4xl font-bold leading-none">{current.temp}°C</div>
                  <div className="text-xs text-soil-700 mt-1">Now</div>
                </div>
                <div className="text-left">
                  <Droplets size={18} className="text-leaf-700"/>
                  <div className="text-lg font-semibold">{current.humidity}%</div>
                  <div className="text-xs text-soil-700">Humidity</div>
                </div>
                <div className="text-left">
                  <Wind size={18} className="text-leaf-700"/>
                  <div className="text-lg font-semibold">{current.wind} km/h</div>
                  <div className="text-xs text-soil-700">Wind</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="min-h-[180px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudRain className="text-leaf-700" size={18}/> Rain Probability (7d)
            </CardTitle>
            <CardDescription>Plan irrigation and spray windows</CardDescription>
          </CardHeader>
          <CardContent>
            {daily ? <Sparkline data={rain} width={280} height={70} stroke="#0ea5e9" /> : <div className="text-sm text-soil-700">Loading…</div>}
            <div className="text-xs text-soil-700 mt-2">Higher values mean higher chance of rain.</div>
          </CardContent>
        </Card>

        <Card className="min-h-[180px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThermometerSun className="text-leaf-700" size={18}/> Temperature (High, 7d)
            </CardTitle>
            <CardDescription>Prepare irrigation based on heat</CardDescription>
          </CardHeader>
          <CardContent>
            {daily ? <Sparkline data={highs} width={280} height={70} stroke="#16a34a" /> : <div className="text-sm text-soil-700">Loading…</div>}
            <div className="text-xs text-soil-700 mt-2">Daily high temperatures (°C).</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        <Card className="min-h-[220px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="text-leaf-700" size={18}/> Humidity
            </CardTitle>
            <CardDescription>Comfort & disease risk indicator</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {current ? <Radial value={current.humidity} size={110} /> : <div className="text-sm text-soil-700">Loading…</div>}
            <div className="text-xs text-soil-700 mt-2">Ideal ranges vary by crop.</div>
          </CardContent>
        </Card>

        <Card className="min-h-[220px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="text-leaf-700" size={18}/> Wind Speed (7d)
            </CardTitle>
            <CardDescription>Spray drift & lodging risk</CardDescription>
          </CardHeader>
          <CardContent>
            {daily ? <Sparkline data={wind} width={280} height={70} stroke="#64748b" /> : <div className="text-sm text-soil-700">Loading…</div>}
            <div className="text-xs text-soil-700 mt-2">Units in km/h.</div>
          </CardContent>
        </Card>

        <Card className="min-h-[220px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudSun className="text-leaf-700" size={18}/> Advisory (auto)
            </CardTitle>
            <CardDescription>Simple actions for this week</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-soil-800 space-y-1">
            <div>• <strong>Watering:</strong> Prefer evenings on hotter days. Reduce if rain probability ≥ 30%.</div>
            <div>• <strong>Spray:</strong> Choose days with lower wind (≤ 12 km/h) and low rain chance (&lt; 20%).</div>
            <div>• <strong>Harvest:</strong> Aim for lower humidity days to reduce post-harvest moisture.</div>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}

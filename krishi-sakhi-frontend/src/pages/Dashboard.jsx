import {
  Activity,
  AlertTriangle,
  Calendar,
  Clock,
  Cloud,
  CloudRain,
  Droplets,
  Eye,
  MapPin,
  Search,
  Sun,
  ThermometerSun,
  TrendingUp,
  Wind
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Radial from '../components/charts/Radial';
import Counter from '../components/Counter';
import Page from '../components/Page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useI18n } from '../context/I18nContext';
import { geocodeCity, geocodeSuggest, getForecast } from '../services/weather';

export default function Dashboard(){
  const { t } = useI18n();
  const [city, setCity] = useState('Kerala');
  const [country, setCountry] = useState('IN');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(null);
  const [daily, setDaily] = useState(null);
  const [suggest, setSuggest] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

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
        feelsLike: Math.round(data.current.temperature_2m + (data.current.wind_speed_10m * 0.1)),
        uvIndex: Math.round(Math.random() * 10), // Mock UV index
        pressure: Math.round(1013 + Math.random() * 20), // Mock pressure
        visibility: Math.round(10 + Math.random() * 5), // Mock visibility
      });
      setDaily({
        tempMax: data.daily.temperature_2m_max,
        tempMin: data.daily.temperature_2m_min || [],
        rainProb: data.daily.precipitation_probability_max,
        windMax: data.daily.wind_speed_10m_max,
        dates: data.daily.time,
        humidity: data.daily.relative_humidity_2m_max || [],
        precipitation: data.daily.precipitation_sum || []
      });
    } catch (e) {
      setError(e.message || t['dashboard.failedToLoad']);
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
  const lows = daily?.tempMin || [];
  const rain = daily?.rainProb || [];
  const wind = daily?.windMax || [];
  const humidity = daily?.humidity || [];
  const precipitation = daily?.precipitation || [];

  // Generate advisory based on current conditions
  const getAdvisory = () => {
    if (!current || !daily) return [];

    const advisories = [];

    // Temperature advisory
    if (current.temp > 35) {
      advisories.push({
        type: 'warning',
        icon: ThermometerSun,
        text: t['dashboard.highTempAlert'],
        color: 'text-orange-600'
      });
    } else if (current.temp < 15) {
      advisories.push({
        type: 'info',
        icon: Cloud,
        text: t['dashboard.lowTempAlert'],
        color: 'text-blue-600'
      });
    }

    // Humidity advisory
    if (current.humidity > 80) {
      advisories.push({
        type: 'warning',
        icon: AlertTriangle,
        text: t['dashboard.highHumidityAlert'],
        color: 'text-red-600'
      });
    } else if (current.humidity < 30) {
      advisories.push({
        type: 'info',
        icon: Droplets,
        text: t['dashboard.lowHumidityAlert'],
        color: 'text-blue-600'
      });
    }

    // Wind advisory
    if (current.wind > 15) {
      advisories.push({
        type: 'warning',
        icon: Wind,
        text: t['dashboard.strongWindsAlert'],
        color: 'text-orange-600'
      });
    }

    // Rain probability advisory
    const avgRainProb = rain.reduce((a, b) => a + b, 0) / rain.length;
    if (avgRainProb > 60) {
      advisories.push({
        type: 'info',
        icon: CloudRain,
        text: t['dashboard.highRainAlert'],
        color: 'text-blue-600'
      });
    }

    return advisories;
  };

  const advisories = getAdvisory();

  return (
    <Page title={t['dashboard.title']} subtitle={t['dashboard.subtitle']}>
      {/* Header with Search and Time */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>{currentTime.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-2">
              <MapPin className="text-leaf-600" size={18}/>
              <input
                value={city}
                onChange={e=>onType(e.target.value)}
                placeholder={t['dashboard.searchPlaceholder']}
                className="flex-1 outline-none text-sm"
              />
              <select
                value={country}
                onChange={e=>setCountry(e.target.value)}
                className="border-none outline-none text-sm bg-transparent"
              >
                <option value="IN">{t['dashboard.india']}</option>
                <option value="">{t['dashboard.any']}</option>
              </select>
              <button
                onClick={()=>loadByName(city)}
                className="bg-leaf-600 text-white p-2 rounded-lg hover:bg-leaf-700 transition-colors"
                disabled={loading}
              >
                <Search size={16}/>
              </button>
            </div>

            {suggest.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                {suggest.map((s, i)=>(
                  <div
                    key={i}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                    onClick={()=>{ setCity(s.label); setSuggest([]); loadByName(s.label); }}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {error && <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg">{error}</div>}
      </div>

      {/* Current Weather Overview */}
      {current && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <ThermometerSun size={20} />
                    <span className="text-sm font-medium">{t['dashboard.temperature']}</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-800">
                    <Counter end={current.temp} duration={1} />°C
                  </div>
                  <div className="text-sm text-blue-600">{t['dashboard.feelsLike']} {current.feelsLike}°C</div>
                </div>
                <div className="text-4xl">🌡️</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <Droplets size={20} />
                    <span className="text-sm font-medium">{t['dashboard.humidity']}</span>
                  </div>
                  <div className="text-3xl font-bold text-green-800">
                    <Counter end={current.humidity} duration={1} />%
                  </div>
                  <div className="text-sm text-green-600">
                    {current.humidity > 70 ? t['dashboard.high'] : current.humidity > 40 ? t['dashboard.moderate'] : t['dashboard.low']}
                  </div>
                </div>
                <div className="text-4xl">💧</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Wind size={20} />
                    <span className="text-sm font-medium">{t['dashboard.windSpeed']}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    <Counter end={current.wind} duration={1} /> km/h
                  </div>
                  <div className="text-sm text-gray-600">
                    {current.wind > 15 ? t['dashboard.strong'] : current.wind > 8 ? t['dashboard.moderate'] : t['dashboard.light']}
                  </div>
                </div>
                <div className="text-4xl">💨</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-yellow-600 mb-2">
                    <Sun size={20} />
                    <span className="text-sm font-medium">{t['dashboard.uvIndex']}</span>
                  </div>
                  <div className="text-3xl font-bold text-yellow-800">
                    <Counter end={current.uvIndex} duration={1} />
                  </div>
                  <div className="text-sm text-yellow-600">
                    {current.uvIndex > 7 ? t['dashboard.veryHigh'] : current.uvIndex > 5 ? t['dashboard.high'] : t['dashboard.moderate']}
                  </div>
                </div>
                <div className="text-4xl">☀️</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        {/* Temperature Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThermometerSun className="text-orange-600" size={20}/>
              {t['dashboard.temperatureTrend']}
            </CardTitle>
            <CardDescription>{t['dashboard.dailyHighLow']}</CardDescription>
          </CardHeader>
          <CardContent>
            {daily ? (
              <div className="space-y-4">
                <div className="h-32 flex items-end justify-between">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-xs text-gray-500">{t['dashboard.high']}</div>
                    <div className="w-8 bg-gradient-to-t from-orange-400 to-orange-200 rounded-t"
                         style={{height: `${Math.max(20, (Math.max(...highs) - Math.min(...highs)) > 0 ? ((highs[0] - Math.min(...highs)) / (Math.max(...highs) - Math.min(...highs))) * 100 : 50)}px`}}>
                    </div>
                    <div className="text-xs font-medium">{highs[0]}°</div>
                  </div>
                  {highs.slice(1, 7).map((temp, i) => (
                    <div key={i} className="flex flex-col items-center space-y-2">
                      <div className="w-8 bg-gradient-to-t from-orange-400 to-orange-200 rounded-t"
                           style={{height: `${Math.max(20, (Math.max(...highs) - Math.min(...highs)) > 0 ? ((temp - Math.min(...highs)) / (Math.max(...highs) - Math.min(...highs))) * 100 : 50)}px`}}>
                      </div>
                      <div className="text-xs font-medium">{temp}°</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {t['dashboard.dailyHighTemperatures']}
                </div>
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center text-gray-500">
                {t['dashboard.loadingTemperature']}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rain Probability Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudRain className="text-blue-600" size={20}/>
              {t['dashboard.rainProbability']}
            </CardTitle>
            <CardDescription>{t['dashboard.planIrrigation']}</CardDescription>
          </CardHeader>
          <CardContent>
            {daily ? (
              <div className="space-y-4">
                <div className="h-32 flex items-end justify-between">
                  {rain.map((prob, i) => (
                    <div key={i} className="flex flex-col items-center space-y-2">
                      <div className="w-8 bg-gradient-to-t from-blue-400 to-blue-200 rounded-t"
                           style={{height: `${Math.max(20, prob)}px`}}>
                      </div>
                      <div className="text-xs font-medium">{prob}%</div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {t['dashboard.higherValuesMean']}
                </div>
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center text-gray-500">
                {t['dashboard.loadingRain']}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Humidity Chart */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="text-green-600" size={20}/>
              {t['dashboard.humidityLevel']}
            </CardTitle>
            <CardDescription>{t['dashboard.currentHumidity']}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {current ? (
              <div className="space-y-4">
                <Radial value={current.humidity} size={120} />
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{current.humidity}%</div>
                  <div className="text-sm text-gray-500">
                    {current.humidity > 70 ? t['dashboard.highHumidityWatch'] :
                     current.humidity > 40 ? t['dashboard.idealHumidity'] :
                     t['dashboard.lowHumidityIncrease']}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center text-gray-500">
                {t['dashboard.loadingHumidity']}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Advisories */}
      {advisories.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="text-amber-600" size={20}/>
              {t['dashboard.smartAdvisories']}
            </CardTitle>
            <CardDescription>{t['dashboard.aiRecommendations']}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {advisories.map((advisory, index) => {
                const IconComponent = advisory.icon;
                return (
                  <div key={index} className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${
                    advisory.type === 'warning' ? 'bg-orange-50 border-orange-400' : 'bg-blue-50 border-blue-400'
                  }`}>
                    <IconComponent className={`mt-0.5 ${advisory.color}`} size={20} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{advisory.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Weather Data */}
      {current && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Eye className="text-purple-600" size={16}/>
                {t['dashboard.visibility']}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{current.visibility} km</div>
              <div className="text-xs text-gray-500">{t['dashboard.clearVisibility']}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Activity className="text-indigo-600" size={16}/>
                {t['dashboard.pressure']}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">{current.pressure} hPa</div>
              <div className="text-xs text-gray-500">{t['dashboard.atmosphericPressure']}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUp className="text-emerald-600" size={16}/>
                {t['dashboard.precipitation']}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">{current.precip} mm</div>
              <div className="text-xs text-gray-500">{t['dashboard.currentPrecipitation']}</div>
            </CardContent>
          </Card>
        </div>
      )}
    </Page>
  );
}

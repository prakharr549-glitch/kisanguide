/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Search, MapPin, AlertCircle, RefreshCw, Sunrise, Sunset, Calendar } from 'lucide-react';
import { fetchCurrentWeather, fetchForecast, WeatherData, ForecastData } from '../services/weatherService';
import { motion } from 'motion/react';

export const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const API_KEY = process.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (API_KEY) {
      // Try to get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            loadWeatherData(position.coords.latitude, position.coords.longitude);
          },
          () => {
            loadWeatherData(undefined, undefined, 'New Delhi');
          }
        );
      } else {
        loadWeatherData(undefined, undefined, 'New Delhi');
      }
    } else {
      setLoading(false);
    }
  }, [API_KEY]);

  const loadWeatherData = async (lat?: number, lon?: number, city?: string) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(lat, lon, city),
        fetchForecast(lat, lon, city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      loadWeatherData(undefined, undefined, searchQuery);
    }
  };

  if (!API_KEY) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md p-8 bg-white rounded-3xl border border-stone-200 shadow-sm">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Weather API Key Required</h2>
          <p className="text-stone-600 mb-6">
            Please add your <strong>VITE_OPENWEATHER_API_KEY</strong> from OpenWeatherMap in the app settings to enable live weather forecasting.
          </p>
          <div className="text-left bg-stone-50 p-4 rounded-2xl text-sm space-y-2">
            <p>1. Get a free key at <a href="https://openweathermap.org/api" target="_blank" rel="noopener" className="text-emerald-600 underline">openweathermap.org</a></p>
            <p>2. Open <strong>Settings (⚙️)</strong> → <strong>Secrets</strong></p>
            <p>3. Add <code>VITE_OPENWEATHER_API_KEY</code> with your key.</p>
          </div>
        </div>
      </div>
    );
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Group forecast by day
  const dailyForecast = forecast?.list.filter((_, index) => index % 8 === 0).slice(0, 5) || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">Weather Forecast</h1>
          <p className="text-stone-600">Accurate weather updates for your farming needs.</p>
        </div>

        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
          />
        </form>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-stone-500">
          <RefreshCw className="w-10 h-10 animate-spin text-emerald-600" />
          <p className="font-medium">Fetching latest weather data...</p>
        </div>
      ) : weather && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <MapPin className="w-5 h-5 text-emerald-200" />
                <span className="text-xl font-bold">{weather.name}</span>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="text-7xl md:text-8xl font-bold mb-2 tracking-tighter">
                    {Math.round(weather.main.temp)}°
                  </div>
                  <div className="text-xl font-medium text-emerald-100 capitalize">
                    {weather.weather[0].description}
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
                    alt={weather.weather[0].main}
                    className="w-32 h-32 md:w-48 md:h-48 drop-shadow-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Humidity</p>
                    <p className="font-bold">{weather.main.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Wind</p>
                    <p className="font-bold">{weather.wind.speed} m/s</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Sunrise className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Sunrise</p>
                    <p className="font-bold">{formatTime(weather.sys.sunrise)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Sunset className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-200 uppercase font-bold tracking-wider">Sunset</p>
                    <p className="font-bold">{formatTime(weather.sys.sunset)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
          </motion.div>

          {/* 5-Day Forecast Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[2rem] border border-stone-200 shadow-sm"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              5-Day Forecast
            </h3>
            <div className="space-y-6">
              {dailyForecast.map((day, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="w-24">
                    <p className="font-bold text-stone-900">{idx === 0 ? 'Tomorrow' : formatDate(day.dt_txt)}</p>
                    <p className="text-xs text-stone-500 capitalize">{day.weather[0].description}</p>
                  </div>
                  <img 
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                    alt={day.weather[0].main}
                    className="w-10 h-10"
                  />
                  <div className="text-right">
                    <p className="font-bold text-stone-900">{Math.round(day.main.temp)}°</p>
                    <p className="text-xs text-stone-400">Feels {Math.round(day.main.temp)}°</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Weather Tips for Farmers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
          <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
            <CloudRain className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-blue-900 mb-2">Irrigation Planning</h4>
          <p className="text-blue-800 text-sm">Check rain forecast before scheduling irrigation to save water and prevent root rot.</p>
        </div>
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
          <div className="bg-amber-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-amber-900 mb-2">Pesticide Spraying</h4>
          <p className="text-amber-800 text-sm">Avoid spraying during high winds or expected rainfall to ensure effective pest control.</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
          <div className="bg-emerald-600 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
            <Thermometer className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-emerald-900 mb-2">Harvest Timing</h4>
          <p className="text-emerald-800 text-sm">Monitor temperature and humidity to choose the perfect window for harvesting your crops.</p>
        </div>
      </div>
    </div>
  );
};

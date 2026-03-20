/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, ShieldAlert, FileText, Calendar, Lightbulb, ArrowRight, Cloud, MapPin, Wind, Droplets } from 'lucide-react';
import { motion } from 'motion/react';
import { BannerAd } from '../components/BannerAd';
import { MANDI_PRICES, BLOG_POSTS } from '../constants';
import { fetchMandiPrices } from '../services/mandiService';
import { fetchCurrentWeather, WeatherData } from '../services/weatherService';
import { MandiPrice } from '../types';

const features = [
  { name: 'Calculators', path: '/calculators', icon: Calculator, color: 'bg-blue-500', desc: 'Fertilizer, Seed, Profit' },
  { name: 'Mandi Prices', path: '/mandi-prices', icon: TrendingUp, color: 'bg-emerald-500', desc: 'Daily crop rates' },
  { name: 'Weather', path: '/weather', icon: Cloud, color: 'bg-sky-500', desc: 'Live local forecast' },
  { name: 'Disease ID', path: '/disease-id', icon: ShieldAlert, color: 'bg-orange-500', desc: 'Identify crop issues' },
  { name: 'Govt Schemes', path: '/schemes', icon: FileText, color: 'bg-purple-500', desc: 'PM-KISAN & more' },
  { name: 'Crop Guide', path: '/crop-guide', icon: Calendar, color: 'bg-teal-500', desc: 'Seasonal farming' },
];

export const Home: React.FC = () => {
  const [mandiPreview, setMandiPreview] = React.useState<MandiPrice[]>(MANDI_PRICES.slice(0, 4));
  const [loadingMandi, setLoadingMandi] = React.useState(false);
  const [weather, setWeather] = React.useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = React.useState(false);

  const GOV_API_KEY = import.meta.env.VITE_GOV_DATA_API_KEY;
  const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  React.useEffect(() => {
    if (GOV_API_KEY) {
      setLoadingMandi(true);
      fetchMandiPrices(undefined, undefined, undefined, 4)
        .then(data => {
          if (data && data.length > 0) {
            setMandiPreview(data);
          } else {
            setMandiPreview(MANDI_PRICES.slice(0, 4));
          }
        })
        .catch(() => setMandiPreview(MANDI_PRICES.slice(0, 4)))
        .finally(() => setLoadingMandi(false));
    }

    if (WEATHER_API_KEY) {
      setLoadingWeather(true);
      fetchCurrentWeather()
        .then(data => setWeather(data))
        .catch(() => setWeather(null))
        .finally(() => setLoadingWeather(false));
    }
  }, [GOV_API_KEY, WEATHER_API_KEY]);

  return (
    <div className="space-y-12">
      <BannerAd />
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-emerald-800 text-white p-8 md:p-16">
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            Modern Farming, <br />
            <span className="text-emerald-300">Better Yields.</span>
          </motion.h1>
          <p className="text-emerald-100 text-lg mb-8">
            Access daily mandi prices, farming calculators, and expert guides to grow your farming business.
          </p>
          <Link 
            to="/calculators" 
            className="inline-flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors"
          >
            Try Calculators <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000" 
            alt="Farming" 
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <SproutIcon className="w-6 h-6 text-emerald-600" />
          Useful Tools & Guides
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to={feature.path}
                className="group block bg-white p-6 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:shadow-lg transition-all text-center h-full"
              >
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 mb-1">{feature.name}</h3>
                <p className="text-xs text-stone-500">{feature.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mandi Prices Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold">Today Mandi Prices</h2>
            <Link to="/mandi-prices" className="text-emerald-600 text-sm font-medium hover:underline">View All</Link>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Crop</th>
                  <th className="px-6 py-4 font-semibold">Price (₹)</th>
                  <th className="px-6 py-4 font-semibold">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {loadingMandi ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-stone-500 text-sm">
                      Loading live prices...
                    </td>
                  </tr>
                ) : mandiPreview.map((price, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{price.crop}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold">{price.price}</span>
                      <span className="text-xs text-stone-500 ml-1">/{price.unit}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-stone-900">{price.location}</div>
                      <div className="text-xs text-stone-500">{price.state}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Weather & Updates */}
        <div className="space-y-8">
          {/* Weather Preview */}
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Local Weather</h2>
              <Link to="/weather" className="text-sky-100 text-xs font-medium hover:underline">Full Forecast</Link>
            </div>
            
            {!WEATHER_API_KEY ? (
              <div className="text-center py-4">
                <Cloud className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-xs text-sky-100">Add OpenWeather API key to see live weather.</p>
              </div>
            ) : loadingWeather ? (
              <div className="text-center py-4 text-sky-100 text-sm">Loading...</div>
            ) : weather ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</div>
                    <div className="text-sm text-sky-100 capitalize">{weather.weather[0].description}</div>
                  </div>
                  <img 
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt={weather.weather[0].main}
                    className="w-16 h-16"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-sky-100">
                  <MapPin className="w-3 h-3" /> {weather.name}
                </div>
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2 text-xs">
                    <Droplets className="w-3 h-3" /> {weather.main.humidity}%
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Wind className="w-3 h-3" /> {weather.wind.speed}m/s
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-sky-100 text-sm">Weather unavailable</div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Latest Updates</h2>
            <div className="space-y-4">
              {BLOG_POSTS.map((post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.id}`}
                  className="flex gap-4 group"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm leading-snug group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                    <p className="text-xs text-stone-500 mt-1">{post.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function SproutIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 20h10" />
      <path d="M10 20c5.5-3 5.5-13 0-17" />
      <path d="M14 20c-5.5-3-5.5-13 0-17" />
    </svg>
  );
}

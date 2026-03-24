import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, MapPin, Search, Calendar, Lightbulb, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

const Weather: React.FC = () => {
  const city = 'Ludhiana, Punjab';
  
  const forecast = [
    { day: 'Mon', temp: 32, condition: 'Sunny', icon: Sun },
    { day: 'Tue', temp: 30, condition: 'Cloudy', icon: Cloud },
    { day: 'Wed', temp: 28, condition: 'Rain', icon: CloudRain },
    { day: 'Thu', temp: 31, condition: 'Sunny', icon: Sun },
    { day: 'Fri', temp: 33, condition: 'Sunny', icon: Sun },
    { day: 'Sat', temp: 34, condition: 'Hot', icon: Sun },
    { day: 'Sun', temp: 32, condition: 'Sunny', icon: Sun },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-blue-600 text-white p-8 md:p-12 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000&auto=format&fit=crop" 
          alt="Sky background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-bold">{city}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Weather Forecast</h1>
            <p className="text-blue-50 text-lg max-w-md">Real-time hyper-local weather data to optimize your irrigation and harvesting schedule.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-200" />
              <input 
                type="text" 
                placeholder="Search your village..." 
                className="bg-white/10 border border-white/30 backdrop-blur-md rounded-full py-4 pl-12 pr-6 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 w-64 md:w-80 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Weather Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center space-x-8">
            <div className="bg-amber-100 p-6 rounded-3xl">
              <Sun className="h-20 w-20 text-amber-500" />
            </div>
            <div>
              <div className="text-7xl font-black text-slate-900">32°C</div>
              <div className="text-xl font-bold text-slate-500">Sunny & Clear</div>
              <div className="text-sm text-slate-400 mt-1">Feels like 35°C</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Droplets className="h-5 w-5" /></div>
              <div>
                <div className="text-xs text-slate-500 font-bold uppercase">Humidity</div>
                <div className="text-lg font-bold text-slate-900">45%</div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-600"><Wind className="h-5 w-5" /></div>
              <div>
                <div className="text-xs text-slate-500 font-bold uppercase">Wind</div>
                <div className="text-lg font-bold text-slate-900">12 km/h</div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Thermometer className="h-5 w-5" /></div>
              <div>
                <div className="text-xs text-slate-500 font-bold uppercase">Pressure</div>
                <div className="text-lg font-bold text-slate-900">1012 hPa</div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center space-x-3">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><Sun className="h-5 w-5" /></div>
              <div>
                <div className="text-xs text-slate-500 font-bold uppercase">UV Index</div>
                <div className="text-lg font-bold text-slate-900">High (8)</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Advisory Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-green-600 rounded-[2rem] p-8 text-white space-y-6 shadow-lg shadow-green-600/20"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg"><Lightbulb className="h-6 w-6" /></div>
            <h2 className="text-xl font-bold">Agri Advisory</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <div className="font-bold mb-1 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-300" />
                Irrigation Alert
              </div>
              <p className="text-sm text-green-50">High evaporation rates today. Recommended to irrigate during early morning or late evening.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <div className="font-bold mb-1">Pest Management</div>
              <p className="text-sm text-green-50">Current humidity levels are ideal for fungal growth. Inspect your crops for early signs.</p>
            </div>
          </div>
          <button className="w-full bg-white text-green-700 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors">
            View Full Report
          </button>
        </motion.div>
      </div>

      {/* 7-Day Forecast */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-green-600" />
            7-Day Forecast
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecast.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center space-y-4 hover:border-blue-200 hover:shadow-md transition-all cursor-default"
            >
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{item.day}</div>
              <div className="flex justify-center">
                <item.icon className={`h-10 w-10 ${item.condition === 'Rain' ? 'text-blue-500' : item.condition === 'Cloudy' ? 'text-slate-400' : 'text-amber-500'}`} />
              </div>
              <div className="text-2xl font-black text-slate-900">{item.temp}°</div>
              <div className="text-xs font-bold text-slate-50">{item.condition}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Weather;

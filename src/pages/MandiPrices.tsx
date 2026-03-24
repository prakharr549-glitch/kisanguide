import React, { useState, useMemo } from 'react';
import { ShoppingBag, Search, ArrowUpRight, ArrowDownRight, TrendingUp, MapPin, Calendar, ChevronDown, Filter, Info } from 'lucide-react';
import { motion } from 'motion/react';

// Mock Mandi Data
const mandiData = [
  { id: 1, crop: 'Wheat', state: 'Punjab', mandi: 'Khanna', price: 2125, unit: 'Quintal', change: 1.2, trend: 'up' },
  { id: 2, crop: 'Rice (Paddy)', state: 'Haryana', mandi: 'Karnal', price: 2040, unit: 'Quintal', change: -0.5, trend: 'down' },
  { id: 3, crop: 'Mustard', state: 'Rajasthan', mandi: 'Alwar', price: 5450, unit: 'Quintal', change: 2.1, trend: 'up' },
  { id: 4, crop: 'Cotton', state: 'Gujarat', mandi: 'Rajkot', price: 7200, unit: 'Quintal', change: 0.8, trend: 'up' },
  { id: 5, crop: 'Onion', state: 'Maharashtra', mandi: 'Lasalgaon', price: 1850, unit: 'Quintal', change: -3.2, trend: 'down' },
  { id: 6, crop: 'Potato', state: 'Uttar Pradesh', mandi: 'Agra', price: 1200, unit: 'Quintal', change: 0.0, trend: 'stable' },
  { id: 7, crop: 'Soybean', state: 'Madhya Pradesh', mandi: 'Indore', price: 4800, unit: 'Quintal', change: 1.5, trend: 'up' },
  { id: 8, crop: 'Tomato', state: 'Karnataka', mandi: 'Kolar', price: 2500, unit: 'Quintal', change: 5.4, trend: 'up' },
];

const MandiPrices: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');

  const states = ['All States', 'Punjab', 'Haryana', 'Rajasthan', 'Gujarat', 'Maharashtra', 'Uttar Pradesh', 'Madhya Pradesh', 'Karnataka'];

  const filteredData = useMemo(() => {
    return mandiData.filter(item => {
      const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.mandi.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'All States' || item.state === selectedState;
      return matchesSearch && matchesState;
    });
  }, [searchQuery, selectedState]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-amber-600 text-white p-8 md:p-12 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1595273670150-db0a3d39074f?q=80&w=2000&auto=format&fit=crop" 
          alt="Market background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit">
            <ShoppingBag className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Market Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Mandi Price Explorer</h1>
          <p className="text-amber-50 text-lg max-w-2xl">Get real-time market rates from over 1,200 mandis across India. Make informed selling decisions to maximize your profits.</p>
          
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-200" />
              <input 
                type="text" 
                placeholder="Search crop or mandi..." 
                className="w-full bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-amber-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-200" />
                <select 
                  className="bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl py-4 pl-10 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none transition-all"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  {states.map(s => <option key={s} value={s} className="text-slate-900">{s}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-200 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Trends Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-2xl text-green-600"><TrendingUp className="h-6 w-6" /></div>
          <div>
            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Top Gainer</div>
            <div className="text-xl font-bold text-slate-900">Tomato (+5.4%)</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><MapPin className="h-6 w-6" /></div>
          <div>
            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Active Mandis</div>
            <div className="text-xl font-bold text-slate-900">1,248 Today</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-amber-100 p-3 rounded-2xl text-amber-600"><Calendar className="h-6 w-6" /></div>
          <div>
            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Last Updated</div>
            <div className="text-xl font-bold text-slate-900">10 mins ago</div>
          </div>
        </div>
      </div>

      {/* Prices Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Live Market Rates</h2>
          <div className="text-sm text-slate-400 font-medium">Showing {filteredData.length} results</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Crop Name</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">State / Mandi</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Current Price</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Trend</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item, idx) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-900 text-lg">{item.crop}</div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Updated Today</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center text-slate-600 font-medium">
                      <MapPin className="h-4 w-4 mr-2 text-slate-300" />
                      {item.mandi}, {item.state}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-xl font-black text-slate-900">₹{item.price.toLocaleString()}</div>
                    <div className="text-xs text-slate-400 font-medium">per {item.unit}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      item.trend === 'up' ? 'bg-green-100 text-green-700' : 
                      item.trend === 'down' ? 'bg-red-100 text-red-700' : 
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {item.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                       item.trend === 'down' ? <ArrowDownRight className="h-3 w-3 mr-1" /> : null}
                      {item.change}%
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="text-green-600 font-bold text-sm hover:underline flex items-center group-hover:translate-x-1 transition-transform">
                      View History <ArrowUpRight className="h-4 w-4 ml-1" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No results found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      {/* Market Insight Note */}
      <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 flex items-start space-x-6">
        <div className="bg-amber-100 p-3 rounded-2xl text-amber-600 flex-shrink-0"><Info className="h-6 w-6" /></div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-amber-900">Expert Market Insight</h3>
          <p className="text-amber-800 text-sm leading-relaxed">
            Wheat prices are expected to remain stable over the next week due to steady arrivals in Punjab mandis. However, Mustard prices might see a slight uptick due to increased demand from processing units. Consider holding your stock if you're in Rajasthan for better rates next month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MandiPrices;

import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Search, TrendingUp, MapPin, Calendar, ChevronDown, Filter, Info, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface MandiRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

const MandiPrices: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [mandiRecords, setMandiRecords] = useState<MandiRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const states = ['All States', 'Punjab', 'Haryana', 'Rajasthan', 'Gujarat', 'Maharashtra', 'Uttar Pradesh', 'Madhya Pradesh', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh'];

  const fetchMandiPrices = useCallback(async (state: string = '') => {
    setLoading(true);
    setError(null);
    try {
      const stateParam = state && state !== 'All States' ? `&state=${state}` : '';
      const response = await fetch(`/api/mandi-prices?${stateParam}`);
      const data = await response.json();
      if (data.records) {
        setMandiRecords(data.records);
      } else {
        setError('No records found for the selected criteria.');
      }
    } catch {
      setError('Failed to fetch Mandi prices.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMandiPrices(selectedState);
  }, [selectedState, fetchMandiPrices]);

  const filteredData = mandiRecords.filter(item => {
    const matchesSearch = item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Status</div>
            <div className="text-xl font-bold text-slate-900">Market Active</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><MapPin className="h-6 w-6" /></div>
          <div>
            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Records</div>
            <div className="text-xl font-bold text-slate-900">{mandiRecords.length} Mandis</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="bg-amber-100 p-3 rounded-2xl text-amber-600"><Calendar className="h-6 w-6" /></div>
          <div>
            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Last Updated</div>
            <div className="text-xl font-bold text-slate-900">Real-time</div>
          </div>
        </div>
      </div>

      {/* Prices Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Live Market Rates</h2>
          <div className="text-sm text-slate-400 font-medium">Showing {filteredData.length} results</div>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-12 w-12 text-amber-600 animate-spin" />
            <p className="text-slate-500 font-medium">Fetching live Mandi prices...</p>
          </div>
        ) : error ? (
          <div className="p-20 text-center space-y-4">
            <p className="text-red-600 font-bold">{error}</p>
            <button onClick={() => fetchMandiPrices(selectedState)} className="text-amber-600 underline font-medium">Try again</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Crop Name</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">District / Mandi</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Modal Price</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Range (Min-Max)</th>
                  <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredData.map((item, idx) => (
                  <motion.tr 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 text-lg">{item.commodity}</div>
                      <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.variety}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center text-slate-600 font-medium">
                        <MapPin className="h-4 w-4 mr-2 text-slate-300" />
                        {item.market}, {item.district}
                      </div>
                      <div className="text-xs text-slate-400">{item.state}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-xl font-black text-slate-900">₹{parseInt(item.modal_price).toLocaleString()}</div>
                      <div className="text-xs text-slate-400 font-medium">per Quintal</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-600">
                        ₹{parseInt(item.min_price).toLocaleString()} - ₹{parseInt(item.max_price).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm text-slate-500">{item.arrival_date}</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && filteredData.length === 0 && (
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

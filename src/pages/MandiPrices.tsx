/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, AlertCircle, RefreshCw, Settings, X, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { MANDI_PRICES } from '../constants';
import { fetchMandiPrices } from '../services/mandiService';
import { MandiPrice } from '../types';
import { cn } from '../lib/utils';

export const MandiPrices: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [prices, setPrices] = useState<MandiPrice[]>(MANDI_PRICES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [customApiKey, setCustomApiKey] = useState(localStorage.getItem('mandi_api_key') || '');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const ENV_API_KEY = import.meta.env.VITE_GOV_DATA_API_KEY;
  const ACTIVE_API_KEY = customApiKey || ENV_API_KEY;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (ACTIVE_API_KEY) {
      loadRealData();
    }
  }, [ACTIVE_API_KEY, selectedState, selectedDistrict, debouncedSearch]);

  const loadRealData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMandiPrices(selectedState, selectedDistrict, debouncedSearch, 100, 0, customApiKey);
      if (data && data.length > 0) {
        setPrices(data);
      } else {
        // If API returns no data, keep local data for a better UX
        setPrices(MANDI_PRICES);
      }
    } catch (err: any) {
      if (err.message === 'API_KEY_MISSING') {
        setError('API Key is missing. Please add it in Settings or use the "Configure API" button.');
      } else {
        setError(`Error: ${err.message}. Falling back to local data.`);
        setPrices(MANDI_PRICES);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mandi_api_key', customApiKey);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowApiSettings(false);
    }, 1500);
    loadRealData();
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('mandi_api_key');
    setCustomApiKey('');
    setShowApiSettings(false);
    loadRealData();
  };

  const states = Array.from(new Set(MANDI_PRICES.map(p => p.state))).sort();
  const districts = Array.from(new Set(MANDI_PRICES
    .filter(p => !selectedState || p.state === selectedState)
    .map(p => p.district))).sort();

  const filteredPrices = (prices || []).filter(p => {
    if (!p) return false;
    const crop = p.crop || '';
    const location = p.location || '';
    const state = p.state || '';
    const district = p.district || '';
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch = !searchTerm || 
                         crop.toLowerCase().includes(searchTerm) || 
                         location.toLowerCase().includes(searchTerm);
    const matchesState = !selectedState || state.toLowerCase().includes(selectedState.toLowerCase()) || selectedState.toLowerCase().includes(state.toLowerCase());
    const matchesDistrict = !selectedDistrict || district.toLowerCase().includes(selectedDistrict.toLowerCase()) || selectedDistrict.toLowerCase().includes(district.toLowerCase());
    return matchesSearch && matchesState && matchesDistrict;
  });

  const clearFilters = () => {
    setSearch('');
    setSelectedState('');
    setSelectedDistrict('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Today Mandi Prices</h1>
            <button 
              onClick={() => setShowApiSettings(!showApiSettings)}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
              title="Configure API"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <p className="text-stone-600">Live updates from major mandis across India.</p>
          
          {showApiSettings && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-6 bg-white border border-stone-200 rounded-3xl shadow-lg max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-stone-900">Configure Mandi API</h3>
                <button onClick={() => setShowApiSettings(false)} className="text-stone-400 hover:text-stone-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSaveApiKey} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase mb-1.5">API Key from data.gov.in</label>
                  <input 
                    type="password"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    placeholder="Paste your API key here..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button 
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {saveSuccess ? <><CheckCircle className="w-4 h-4" /> Saved!</> : 'Save & Refresh'}
                  </button>
                  <button 
                    type="button"
                    onClick={handleClearApiKey}
                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold text-sm hover:bg-stone-50 transition-colors"
                  >
                    Reset
                  </button>
                </div>
                
                <p className="text-[10px] text-stone-400 leading-relaxed">
                  Your API key is stored locally in your browser. If you've already set <code>VITE_GOV_DATA_API_KEY</code> in the platform settings, it will be used as a fallback.
                </p>
              </form>
            </motion.div>
          )}

          {!ACTIVE_API_KEY && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-800 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-bold">Live API Not Configured</p>
                <p>Showing sample data. To get real-time prices, add your <strong>VITE_GOV_DATA_API_KEY</strong> from data.gov.in in the app settings.</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-[2]">
          <div className="relative">
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1.5 ml-1">Search Crop</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Wheat, Rice..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none w-full text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1.5 ml-1">State</label>
            <select 
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('');
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white"
            >
              <option value="">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1.5 ml-1">District</label>
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white"
            >
              <option value="">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button 
              onClick={clearFilters}
              className="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 text-stone-600 font-bold text-sm hover:bg-stone-50 transition-colors"
            >
              Clear
            </button>
            {ACTIVE_API_KEY && (
              <button 
                onClick={loadRealData}
                disabled={loading}
                className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={cn("w-5 h-5", loading && "animate-spin")} />
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl text-rose-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-lg mb-2">Live Price Fetch Error</p>
              <p className="mb-4">{error}</p>
              
              {error.includes('authorised') && (
                <div className="bg-white/50 p-4 rounded-2xl border border-rose-100 space-y-3 text-sm">
                  <p className="font-bold text-rose-900">Troubleshooting Steps:</p>
                  <ul className="list-disc list-inside space-y-2 text-rose-800">
                    <li><strong>Verify Email:</strong> Log in to <a href="https://data.gov.in" target="_blank" rel="noopener" className="underline font-bold">data.gov.in</a> and ensure you've clicked the verification link in the email they sent you.</li>
                    <li><strong>Key Activation:</strong> If you just created the key, it can take 10-15 minutes to activate on their servers.</li>
                    <li><strong>Check Secret Name:</strong> Ensure the secret name in <strong>Settings → Secrets</strong> is exactly <code>VITE_GOV_DATA_API_KEY</code>.</li>
                    <li><strong>Regenerate Key:</strong> If the issue persists, try regenerating a new key on the government portal.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
              <tr>
                <th className="px-6 py-5 font-semibold">Crop Name</th>
                <th className="px-6 py-5 font-semibold">Price (₹)</th>
                <th className="px-6 py-5 font-semibold">Unit</th>
                <th className="px-6 py-5 font-semibold">Trend</th>
                <th className="px-6 py-5 font-semibold">State & District</th>
                <th className="px-6 py-5 font-semibold">Mandi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-stone-500">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Loading live prices...
                    </div>
                  </td>
                </tr>
              ) : filteredPrices.length > 0 ? (
                filteredPrices.map((price, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-stone-900">{price.crop}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-emerald-700">{price.price}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">{price.unit}</td>
                    <td className="px-6 py-4">
                      {price.change === 'up' && <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full w-fit"><TrendingUp className="w-3 h-3" /> UP</span>}
                      {price.change === 'down' && <span className="flex items-center gap-1 text-rose-600 text-xs font-bold bg-rose-50 px-2 py-1 rounded-full w-fit"><TrendingDown className="w-3 h-3" /> DOWN</span>}
                      {price.change === 'stable' && <span className="flex items-center gap-1 text-stone-600 text-xs font-bold bg-stone-50 px-2 py-1 rounded-full w-fit"><Minus className="w-3 h-3" /> STABLE</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-stone-900">{price.state}</div>
                      <div className="text-xs text-stone-500">{price.district}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-stone-600">{price.location}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-stone-500">
                    <div className="flex flex-col items-center gap-2">
                      <p>No results found for "{search}".</p>
                      <button 
                        onClick={() => setSearch('')}
                        className="text-emerald-600 font-bold hover:underline"
                      >
                        Clear search
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
          <h2 className="text-xl font-bold text-emerald-900 mb-4">Why Mandi Prices Matter?</h2>
          <p className="text-emerald-800 text-sm leading-relaxed">
            Knowing the daily rates helps you decide the best time to sell your produce. 
            We track prices from major hubs like Azadpur (Delhi), Vashi (Mumbai), and local mandis in UP, Bihar, and Punjab.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator as CalcIcon, Droplets, Wheat, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export const Calculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fertilizer' | 'seed' | 'profit' | 'water'>('fertilizer');

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Farming Calculator Hub</h1>
        <p className="text-stone-600">Quick and accurate tools to help you plan your farming activities and maximize profits.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <TabButton active={activeTab === 'fertilizer'} onClick={() => setActiveTab('fertilizer')} icon={Wheat} label="Fertilizer" />
        <TabButton active={activeTab === 'seed'} onClick={() => setActiveTab('seed')} icon={CalcIcon} label="Seed Rate" />
        <TabButton active={activeTab === 'profit'} onClick={() => setActiveTab('profit')} icon={TrendingUp} label="Crop Profit" />
        <TabButton active={activeTab === 'water'} onClick={() => setActiveTab('water')} icon={Droplets} label="Irrigation" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm"
        >
          {activeTab === 'fertilizer' && <FertilizerCalculator />}
          {activeTab === 'seed' && <SeedRateCalculator />}
          {activeTab === 'profit' && <ProfitCalculator />}
          {activeTab === 'water' && <WaterCalculator />}
        </motion.div>
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
      active ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
    }`}
  >
    <Icon className="w-5 h-5" />
    {label}
  </button>
);

const FertilizerCalculator = () => {
  const [area, setArea] = useState<number>(1);
  const [unit, setUnit] = useState<'acre' | 'hectare'>('acre');
  const [crop, setCrop] = useState('wheat');

  const results = {
    urea: area * (unit === 'acre' ? 50 : 125),
    dap: area * (unit === 'acre' ? 25 : 62),
    mop: area * (unit === 'acre' ? 15 : 37),
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Fertilizer Requirement Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Land Area</label>
          <input 
            type="number" 
            value={area} 
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Unit</label>
          <select 
            value={unit} 
            onChange={(e) => setUnit(e.target.value as any)}
            className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="acre">Acre</option>
            <option value="hectare">Hectare</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Crop Type</label>
          <select 
            value={crop} 
            onChange={(e) => setCrop(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="wheat">Wheat (गेहूं)</option>
            <option value="paddy">Paddy (धान)</option>
            <option value="maize">Maize (मक्का)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
        <ResultCard label="Urea" value={results.urea} unit="kg" color="bg-blue-50" textColor="text-blue-700" />
        <ResultCard label="DAP" value={results.dap} unit="kg" color="bg-emerald-50" textColor="text-emerald-700" />
        <ResultCard label="MOP" value={results.mop} unit="kg" color="bg-orange-50" textColor="text-orange-700" />
      </div>
    </div>
  );
};

const SeedRateCalculator = () => {
  const [area, setArea] = useState<number>(1);
  const [crop, setCrop] = useState('wheat');

  const seedRates: Record<string, number> = { wheat: 40, paddy: 20, maize: 8 };
  const totalSeed = area * (seedRates[crop] || 0);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Seed Rate Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Land Area (Acre)</label>
          <input 
            type="number" 
            value={area} 
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Crop Type</label>
          <select 
            value={crop} 
            onChange={(e) => setCrop(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-stone-200 focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="wheat">Wheat (100kg/ha avg)</option>
            <option value="paddy">Paddy (50kg/ha avg)</option>
            <option value="maize">Maize (20kg/ha avg)</option>
          </select>
        </div>
      </div>
      <div className="pt-6">
        <ResultCard label="Total Seed Required" value={totalSeed} unit="kg" color="bg-emerald-50" textColor="text-emerald-700" />
      </div>
    </div>
  );
};

const ProfitCalculator = () => {
  const [cost, setCost] = useState<number>(15000);
  const [yieldAmount, setYieldAmount] = useState<number>(20);
  const [price, setPrice] = useState<number>(2275);

  const totalRevenue = yieldAmount * price;
  const profit = totalRevenue - cost;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Crop Profit Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Total Cost (₹/Acre)</label>
          <input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl border border-stone-200" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Expected Yield (Quintal/Acre)</label>
          <input type="number" value={yieldAmount} onChange={(e) => setYieldAmount(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl border border-stone-200" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Market Price (₹/Quintal)</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl border border-stone-200" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
        <ResultCard label="Total Revenue" value={totalRevenue} unit="₹" color="bg-blue-50" textColor="text-blue-700" />
        <ResultCard label="Net Profit" value={profit} unit="₹" color="bg-emerald-50" textColor="text-emerald-700" />
      </div>
    </div>
  );
};

const WaterCalculator = () => {
  const [area, setArea] = useState<number>(1);
  const [depth, setDepth] = useState<number>(5); // cm

  const waterLiters = area * 4046.86 * (depth / 100) * 1000;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Irrigation Water Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Land Area (Acre)</label>
          <input type="number" value={area} onChange={(e) => setArea(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl border border-stone-200" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Water Depth (cm)</label>
          <input type="number" value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="w-full px-4 py-2 rounded-xl border border-stone-200" />
        </div>
      </div>
      <div className="pt-6">
        <ResultCard label="Total Water Required" value={Math.round(waterLiters)} unit="Liters" color="bg-blue-50" textColor="text-blue-700" />
      </div>
    </div>
  );
};

const ResultCard = ({ label, value, unit, color, textColor }: any) => (
  <div className={`${color} p-6 rounded-2xl border border-stone-100`}>
    <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className={`text-3xl font-bold ${textColor}`}>{value.toLocaleString()}</span>
      <span className="text-sm text-stone-500">{unit}</span>
    </div>
  </div>
);

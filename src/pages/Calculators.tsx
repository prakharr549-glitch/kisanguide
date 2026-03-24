import React, { useState } from 'react';
import { Calculator as CalcIcon, Droplets, Sprout, Wind, Thermometer, Info, Zap, PieChart, TrendingUp, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Calculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fertilizer' | 'water' | 'yield'>('fertilizer');
  const [inputs, setInputs] = useState({
    area: '',
    crop: 'wheat',
    soilType: 'loamy'
  });
  const [result, setResult] = useState<{
    main: string;
    unit: string;
    breakdown: { label: string; value: string; color: string }[];
    advice: string;
  } | null>(null);

  const calculate = () => {
    if (activeTab === 'fertilizer') {
      setResult({
        main: '450',
        unit: 'kg Total',
        breakdown: [
          { label: 'Nitrogen (N)', value: '180kg', color: 'bg-blue-500' },
          { label: 'Phosphorus (P)', value: '120kg', color: 'bg-emerald-500' },
          { label: 'Potassium (K)', value: '150kg', color: 'bg-amber-500' }
        ],
        advice: 'Based on your soil type, we recommend applying Nitrogen in three split doses for maximum absorption.'
      });
    } else if (activeTab === 'water') {
      setResult({
        main: '12,500',
        unit: 'Liters/Acre',
        breakdown: [
          { label: 'Daily Need', value: '1,800L', color: 'bg-blue-400' },
          { label: 'Evaporation Loss', value: '450L', color: 'bg-slate-400' },
          { label: 'Effective Water', value: '10,250L', color: 'bg-blue-600' }
        ],
        advice: 'Consider using drip irrigation to reduce water consumption by up to 40% while maintaining yield.'
      });
    } else {
      setResult({
        main: '2.4',
        unit: 'Tons/Acre',
        breakdown: [
          { label: 'Expected Yield', value: '2.4T', color: 'bg-emerald-600' },
          { label: 'Market Value', value: '₹48,000', color: 'bg-amber-600' },
          { label: 'Net Profit', value: '₹32,500', color: 'bg-blue-600' }
        ],
        advice: 'Current market trends suggest holding your harvest for 2 weeks to get 10% better pricing.'
      });
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-indigo-700 text-white p-8 md:p-12 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2000&auto=format&fit=crop" 
          alt="Agriculture calculation background" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit">
            <CalcIcon className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Precision Farming</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Agri Calculators</h1>
          <p className="text-indigo-50 text-lg max-w-2xl">Optimize your farm resources with our precision calculators. Get accurate estimates for fertilizers, water needs, and expected yields.</p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
              <TrendingUp className="h-5 w-5 text-indigo-300" />
              <span className="text-sm font-bold">Maximize Yield</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
              <Layers className="h-5 w-5 text-indigo-300" />
              <span className="text-sm font-bold">Resource Efficiency</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1 space-y-4">
          <button 
            onClick={() => { setActiveTab('fertilizer'); setResult(null); }}
            className={`w-full p-6 rounded-[2rem] text-left transition-all flex items-center space-x-4 border-2 ${
              activeTab === 'fertilizer' 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200'
            }`}
          >
            <div className={`p-3 rounded-2xl ${activeTab === 'fertilizer' ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
              <Sprout className="h-6 w-6" />
            </div>
            <div>
              <div className="font-black text-lg">Fertilizer Calc</div>
              <div className={`text-xs ${activeTab === 'fertilizer' ? 'text-indigo-100' : 'text-slate-400'}`}>NPK requirement based on soil</div>
            </div>
          </button>

          <button 
            onClick={() => { setActiveTab('water'); setResult(null); }}
            className={`w-full p-6 rounded-[2rem] text-left transition-all flex items-center space-x-4 border-2 ${
              activeTab === 'water' 
                ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
            }`}
          >
            <div className={`p-3 rounded-2xl ${activeTab === 'water' ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>
              <Droplets className="h-6 w-6" />
            </div>
            <div>
              <div className="font-black text-lg">Irrigation Guide</div>
              <div className={`text-xs ${activeTab === 'water' ? 'text-blue-100' : 'text-slate-400'}`}>Water needs by crop & area</div>
            </div>
          </button>

          <button 
            onClick={() => { setActiveTab('yield'); setResult(null); }}
            className={`w-full p-6 rounded-[2rem] text-left transition-all flex items-center space-x-4 border-2 ${
              activeTab === 'yield' 
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-100' 
                : 'bg-white border-slate-100 text-slate-600 hover:border-emerald-200'
            }`}
          >
            <div className={`p-3 rounded-2xl ${activeTab === 'yield' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
              <PieChart className="h-6 w-6" />
            </div>
            <div>
              <div className="font-black text-lg">Yield Predictor</div>
              <div className={`text-xs ${activeTab === 'yield' ? 'text-emerald-100' : 'text-slate-400'}`}>Estimate harvest & profit</div>
            </div>
          </button>
        </div>

        {/* Main Calculator Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Farm Area (Acres)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 5"
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:ring-0 transition-all font-bold text-slate-900"
                  value={inputs.area}
                  onChange={(e) => setInputs({...inputs, area: e.target.value})}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Select Crop</label>
                <select 
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:ring-0 transition-all font-bold text-slate-900 appearance-none"
                  value={inputs.crop}
                  onChange={(e) => setInputs({...inputs, crop: e.target.value})}
                >
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice (Paddy)</option>
                  <option value="maize">Maize (Corn)</option>
                  <option value="cotton">Cotton</option>
                  <option value="sugarcane">Sugarcane</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest">Soil Type</label>
                <select 
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:ring-0 transition-all font-bold text-slate-900 appearance-none"
                  value={inputs.soilType}
                  onChange={(e) => setInputs({...inputs, soilType: e.target.value})}
                >
                  <option value="loamy">Loamy Soil</option>
                  <option value="clayey">Clayey Soil</option>
                  <option value="sandy">Sandy Soil</option>
                  <option value="black">Black Soil</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={calculate}
                  className="w-full py-4 bg-slate-900 text-white font-black text-lg rounded-2xl hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  <Zap className="h-5 w-5" />
                  <span>Calculate Now</span>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-8 border-t border-slate-100 space-y-8"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Requirement</div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-5xl font-black text-slate-900">{result.main}</span>
                        <span className="text-xl font-bold text-slate-400">{result.unit}</span>
                      </div>
                    </div>
                    <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 max-w-sm">
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-bold text-indigo-900 leading-relaxed">{result.advice}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.breakdown.map((item, i) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                        </div>
                        <div className="text-2xl font-black text-slate-900">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex items-start space-x-6">
          <div className="bg-amber-50 p-4 rounded-2xl text-amber-600">
            <Thermometer className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-slate-900">Climate Adjustment</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Our algorithms automatically adjust recommendations based on current seasonal temperatures and humidity levels in your region.</p>
          </div>
        </div>
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex items-start space-x-6">
          <div className="bg-blue-50 p-4 rounded-2xl text-blue-600">
            <Wind className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-slate-900">Soil Health Focus</h4>
            <p className="text-slate-500 text-sm leading-relaxed">We prioritize long-term soil health. Our fertilizer recommendations include organic alternatives to maintain soil microbial balance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;

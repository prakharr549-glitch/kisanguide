import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Sprout, Droplets, Thermometer, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

// Mock Crop Data
const cropData = [
  {
    id: 1,
    name: 'Wheat',
    category: 'Cereal',
    season: 'Rabi',
    duration: '120-150 days',
    water: 'Moderate',
    temp: '15°C - 25°C',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800&auto=format&fit=crop',
    description: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food.',
    tips: ['Sow in November', 'Ensure 4-6 irrigations', 'Use NPK fertilizer']
  },
  {
    id: 2,
    name: 'Rice',
    category: 'Cereal',
    season: 'Kharif',
    duration: '100-150 days',
    water: 'High',
    temp: '20°C - 35°C',
    image: 'https://images.unsplash.com/photo-1536633100187-055a454a62e4?q=80&w=800&auto=format&fit=crop',
    description: 'Rice is the seed of the grass species Oryza sativa. As a cereal grain, it is the most widely consumed staple food.',
    tips: ['Transplant in standing water', 'Keep field flooded', 'Control stem borers']
  },
  {
    id: 3,
    name: 'Mustard',
    category: 'Oilseed',
    season: 'Rabi',
    duration: '110-140 days',
    water: 'Low',
    temp: '10°C - 25°C',
    image: 'https://images.unsplash.com/photo-1594488425028-20703848972a?q=80&w=800&auto=format&fit=crop',
    description: 'Mustard seeds are the small round seeds of various mustard plants. They are an important oilseed crop.',
    tips: ['Thinning is essential', 'Control aphids early', 'Harvest when pods turn yellow']
  },
  {
    id: 4,
    name: 'Cotton',
    category: 'Fiber',
    season: 'Kharif',
    duration: '160-180 days',
    water: 'Moderate',
    temp: '21°C - 30°C',
    image: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=800&auto=format&fit=crop',
    description: 'Cotton is a soft, fluffy staple fiber that grows in a boll, or protective case, around the seeds.',
    tips: ['Use Bt varieties', 'Maintain proper spacing', 'Pick when bolls are fully open']
  },
  {
    id: 5,
    name: 'Sugarcane',
    category: 'Cash Crop',
    season: 'Annual',
    duration: '10-12 months',
    water: 'High',
    temp: '20°C - 30°C',
    image: 'https://images.unsplash.com/photo-1594488425028-20703848972a?q=80&w=800&auto=format&fit=crop',
    description: 'Sugarcane is a perennial grass used for sugar production and ethanol.',
    tips: ['Use healthy setts', 'Apply organic manure', 'Earthing up is required']
  },
  {
    id: 6,
    name: 'Maize',
    category: 'Cereal',
    season: 'Kharif/Rabi',
    duration: '90-110 days',
    water: 'Moderate',
    temp: '18°C - 27°C',
    image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?q=80&w=800&auto=format&fit=crop',
    description: 'Maize, also known as corn, is a cereal grain first domesticated by indigenous peoples in southern Mexico.',
    tips: ['Control fall armyworm', 'Avoid waterlogging', 'Apply nitrogen in stages']
  }
];

const CropGuide: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cereal', 'Oilseed', 'Fiber', 'Cash Crop', 'Vegetable'];

  const filteredCrops = useMemo(() => {
    return cropData.filter(crop => {
      const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-emerald-700 text-white p-8 md:p-12 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
          alt="Crop field" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Knowledge Base</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Crop Management Guide</h1>
          <p className="text-emerald-50 text-lg max-w-2xl">Master the art of farming with our comprehensive guides on sowing, irrigation, and harvesting for over 50 Indian crops.</p>
          
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-200" />
              <input 
                type="text" 
                placeholder="Search for a crop (e.g. Wheat, Rice)..." 
                className="w-full bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105' 
                : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCrops.map((crop, idx) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="relative h-56 overflow-hidden">
              <img 
                src={crop.image} 
                alt={crop.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
                {crop.season}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">{crop.name}</h3>
                <p className="text-emerald-100 text-xs font-medium uppercase tracking-widest">{crop.category}</p>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Droplets className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">{crop.water} Water</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Thermometer className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">{crop.temp}</span>
                </div>
              </div>
              
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                {crop.description}
              </p>
              
              <div className="space-y-3">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <Star className="h-3 w-3 mr-1 text-amber-400" /> Expert Tips
                </div>
                <ul className="space-y-2">
                  {crop.tips.slice(0, 2).map((tip, i) => (
                    <li key={i} className="flex items-start text-xs font-medium text-slate-700">
                      <ChevronRight className="h-3 w-3 mr-1 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full py-4 bg-slate-50 text-emerald-700 font-bold rounded-2xl hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center group">
                Full Cultivation Guide <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pro Tip Section */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-emerald-100 p-6 rounded-3xl text-emerald-600 flex-shrink-0">
          <Sprout className="h-12 w-12" />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold text-emerald-900">Soil Testing: The First Step to Success</h3>
          <p className="text-emerald-800 text-sm leading-relaxed max-w-3xl">
            Before following any crop guide, we highly recommend getting your soil tested at the nearest Krishi Vigyan Kendra. Knowing your soil's pH and nutrient levels can help you choose the right crop and save up to 30% on fertilizer costs.
          </p>
        </div>
        <button className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all whitespace-nowrap shadow-lg shadow-emerald-200">
          Find Lab
        </button>
      </div>
    </div>
  );
};

export default CropGuide;

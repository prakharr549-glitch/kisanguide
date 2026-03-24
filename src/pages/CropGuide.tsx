import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Search, Sprout, Droplets, Thermometer, ChevronRight, Loader2, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Crop {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  default_image: {
    original_url: string;
    regular_url: string;
    medium_url: string;
    small_url: string;
    thumbnail: string;
  } | null;
}

interface CropDetails extends Crop {
  description: string;
  type: string;
  dimension: string;
  care_level: string;
  propagation: string[];
  hardiness: { min: string; max: string };
  flowers: boolean;
  fruits: boolean;
  edible_fruit: boolean;
  leaf: boolean;
  edible_leaf: boolean;
  medicinal: boolean;
  poisonous_to_humans: number;
  poisonous_to_pets: number;
  maintenance: string;
  growth_rate: string;
  indoor: boolean;
}

const CropGuide: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
  const [cropDetails, setCropDetails] = useState<CropDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  const fetchCrops = useCallback(async (query: string = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/search-crops?q=${query}`);
      const data = await response.json();
      if (data.data) {
        setCrops(data.data);
      } else {
        setError('No crops found.');
      }
    } catch {
      setError('Failed to fetch crops. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCrops();
  }, [fetchCrops]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCrops(searchQuery);
  };

  const fetchCropDetails = async (id: number) => {
    setDetailsLoading(true);
    setSelectedCropId(id);
    try {
      const response = await fetch(`/api/crop-details/${id}`);
      const data = await response.json();
      setCropDetails(data);
    } catch {
      console.error('Failed to fetch crop details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedCropId(null);
    setCropDetails(null);
  };

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
          <p className="text-emerald-50 text-lg max-w-2xl">Explore our comprehensive database of crops. Get expert guidance on cultivation, care, and harvesting.</p>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 pt-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-200" />
              <input 
                type="text" 
                placeholder="Search for a crop (e.g. Tomato, Wheat)..." 
                className="w-full bg-white/10 border border-white/30 backdrop-blur-md rounded-2xl py-4 pl-12 pr-6 text-white placeholder:text-emerald-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-2xl hover:bg-emerald-50 transition-all shadow-lg"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
          <p className="text-slate-500 font-medium">Fetching the latest crop data...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-100 rounded-3xl p-8 text-center">
          <p className="text-red-600 font-bold">{error}</p>
          <button 
            onClick={() => fetchCrops()}
            className="mt-4 text-red-700 underline font-medium"
          >
            Try reloading
          </button>
        </div>
      )}

      {/* Crop Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {crops.map((crop, idx) => (
            <motion.div
              key={crop.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
              onClick={() => fetchCropDetails(crop.id)}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={crop.default_image?.medium_url || 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?q=80&w=800&auto=format&fit=crop'} 
                  alt={crop.common_name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
                  {crop.cycle}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white capitalize">{crop.common_name}</h3>
                  <p className="text-emerald-100 text-xs font-medium italic">{crop.scientific_name?.[0]}</p>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Droplets className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">{crop.watering} Water</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-600">
                    <Thermometer className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">{crop.sunlight?.[0] || 'Full Sun'}</span>
                  </div>
                </div>
                
                <button className="w-full py-4 bg-slate-50 text-emerald-700 font-bold rounded-2xl hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center group">
                  Full Cultivation Guide <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Crop Details Modal */}
      <AnimatePresence>
        {selectedCropId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDetails}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button 
                onClick={closeDetails}
                className="absolute top-6 right-6 z-10 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
              >
                <X className="h-6 w-6" />
              </button>

              {detailsLoading ? (
                <div className="flex flex-col items-center justify-center py-40 space-y-4">
                  <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
                  <p className="text-slate-500 font-medium">Loading details...</p>
                </div>
              ) : cropDetails ? (
                <div className="flex flex-col">
                  <div className="relative h-64 md:h-96">
                    <img 
                      src={cropDetails.default_image?.original_url || 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?q=80&w=800&auto=format&fit=crop'} 
                      alt={cropDetails.common_name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 text-white">
                      <h2 className="text-4xl md:text-5xl font-black capitalize">{cropDetails.common_name}</h2>
                      <p className="text-emerald-200 text-lg italic">{cropDetails.scientific_name?.[0]}</p>
                    </div>
                  </div>

                  <div className="p-8 md:p-12 space-y-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="bg-slate-50 p-4 rounded-3xl space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cycle</span>
                        <p className="font-bold text-slate-800">{cropDetails.cycle}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-3xl space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Watering</span>
                        <p className="font-bold text-slate-800">{cropDetails.watering}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-3xl space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sunlight</span>
                        <p className="font-bold text-slate-800">{cropDetails.sunlight?.join(', ')}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-3xl space-y-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Care Level</span>
                        <p className="font-bold text-slate-800">{cropDetails.care_level}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-slate-900 flex items-center">
                        <Info className="h-6 w-6 mr-2 text-emerald-600" /> About this Crop
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {cropDetails.description || `The ${cropDetails.common_name} (${cropDetails.scientific_name?.[0]}) is a ${cropDetails.cycle} plant known for its ${cropDetails.watering.toLowerCase()} watering needs and preference for ${cropDetails.sunlight?.join(' and ').toLowerCase()}. It has a ${cropDetails.growth_rate.toLowerCase()} growth rate and is considered ${cropDetails.care_level.toLowerCase()} to care for.`}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-slate-900">Cultivation Details</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center text-slate-600">
                            <ChevronRight className="h-4 w-4 mr-2 text-emerald-500" />
                            <span className="font-medium">Propagation: {cropDetails.propagation?.join(', ')}</span>
                          </li>
                          <li className="flex items-center text-slate-600">
                            <ChevronRight className="h-4 w-4 mr-2 text-emerald-500" />
                            <span className="font-medium">Maintenance: {cropDetails.maintenance}</span>
                          </li>
                          <li className="flex items-center text-slate-600">
                            <ChevronRight className="h-4 w-4 mr-2 text-emerald-500" />
                            <span className="font-medium">Growth Rate: {cropDetails.growth_rate}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-slate-900">Characteristics</h4>
                        <div className="flex flex-wrap gap-2">
                          {cropDetails.flowers && <span className="px-3 py-1 bg-pink-50 text-pink-600 text-xs font-bold rounded-full">Flowers</span>}
                          {cropDetails.fruits && <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full">Fruits</span>}
                          {cropDetails.edible_fruit && <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">Edible Fruit</span>}
                          {cropDetails.medicinal && <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">Medicinal</span>}
                          {cropDetails.indoor && <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-full">Indoor Friendly</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

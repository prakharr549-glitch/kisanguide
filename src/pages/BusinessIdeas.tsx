import React, { useState } from 'react';
import { Lightbulb, TrendingUp, ArrowRight, Briefcase, BarChart3, Zap, Globe, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const businessIdeas = [
  {
    id: 1,
    title: 'Organic Fertilizer Production',
    category: 'Manufacturing',
    investment: 'Low to Medium',
    profitMargin: '30-40%',
    description: 'Setting up a vermicompost or organic fertilizer unit using farm waste and cow dung. High demand due to increasing organic farming trends.',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=800&auto=format&fit=crop',
    tags: ['Eco-friendly', 'Scalable']
  },
  {
    id: 2,
    title: 'Cold Storage Facility',
    category: 'Infrastructure',
    investment: 'High',
    profitMargin: '20-25%',
    description: 'Providing temperature-controlled storage for perishable crops like fruits and vegetables to reduce post-harvest losses.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    tags: ['Essential', 'Long-term']
  },
  {
    id: 3,
    title: 'Mushroom Cultivation',
    category: 'Farming',
    investment: 'Low',
    profitMargin: '40-50%',
    description: 'Small-scale indoor farming of button or oyster mushrooms. Requires minimal space and provides quick returns.',
    image: 'https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?q=80&w=800&auto=format&fit=crop',
    tags: ['Quick Returns', 'Indoor']
  },
  {
    id: 4,
    title: 'Agro-Tourism',
    category: 'Service',
    investment: 'Medium',
    profitMargin: '35-45%',
    description: 'Converting a portion of the farm into a tourist destination offering farm stays, traditional food, and agricultural experiences.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop',
    tags: ['Experiential', 'Hospitality']
  }
];

const BusinessIdeas: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Manufacturing', 'Infrastructure', 'Farming', 'Service'];

  const filteredIdeas = selectedCategory === 'All' 
    ? businessIdeas 
    : businessIdeas.filter(idea => idea.category === selectedCategory);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 text-white p-8 md:p-12 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1464232355350-7e89bb2f7bb1?q=80&w=2000&auto=format&fit=crop" 
          alt="Business ideas background" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="flex items-center space-x-2 bg-amber-500/20 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-amber-500/30">
            <TrendingUp className="h-4 w-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Entrepreneurship</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Agri-Business Opportunities</h1>
          <p className="text-slate-300 text-lg">Turn your passion for agriculture into a profitable venture. Explore curated business models with investment insights and market potential.</p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-bold">High ROI</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-bold">Global Demand</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-bold">Low Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        <div className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm flex space-x-1">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredIdeas.map((idea) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={idea.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={idea.image} 
                  alt={idea.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <div className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {idea.category}
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-black text-white leading-tight">{idea.title}</h3>
                </div>
              </div>

              <div className="p-8 space-y-6 flex-grow flex flex-col">
                <p className="text-slate-500 leading-relaxed">{idea.description}</p>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50">
                  <div className="space-y-1">
                    <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Briefcase className="h-3 w-3 mr-1.5 text-amber-500" /> Investment
                    </div>
                    <div className="text-lg font-black text-slate-800">{idea.investment}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <BarChart3 className="h-3 w-3 mr-1.5 text-emerald-500" /> Profit Margin
                    </div>
                    <div className="text-lg font-black text-emerald-600">{idea.profitMargin}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {idea.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full border border-slate-100 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 mt-auto">
                  <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-amber-600 transition-all flex items-center justify-center group/btn shadow-lg shadow-slate-100">
                    Explore Business Plan 
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Consultation Section */}
      <div className="bg-amber-500 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-amber-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left max-w-2xl">
            <div className="bg-white/20 text-white px-4 py-1 rounded-full text-xs font-bold w-fit mx-auto lg:mx-0 border border-white/30">Expert Guidance</div>
            <h2 className="text-4xl font-black leading-tight">Ready to start your agri-business?</h2>
            <p className="text-amber-50 text-lg opacity-90">Get a personalized consultation with our business experts to refine your idea, secure funding, and build a sustainable roadmap.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <button className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl">
                Book Consultation
              </button>
              <button className="px-10 py-4 bg-white text-amber-600 font-bold rounded-2xl hover:bg-amber-50 transition-all shadow-xl">
                Download PDF Guide
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="w-64 h-64 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
              <Lightbulb className="h-32 w-32 text-white animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessIdeas;

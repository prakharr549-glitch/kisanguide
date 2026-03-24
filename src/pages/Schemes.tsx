import React, { useState, useMemo } from 'react';
import { Search, Landmark, Users, Award, ArrowUpRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const schemesData = [
  {
    id: 1,
    title: 'PM-Kisan Samman Nidhi',
    category: 'Financial Support',
    benefit: '₹6,000 per year in 3 installments',
    eligibility: 'All landholding farmer families',
    description: 'A central sector scheme to provide income support to all landholding farmers families in the country to supplement their financial needs.',
    image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=800&auto=format&fit=crop',
    tags: ['Income Support', 'Central Govt']
  },
  {
    id: 2,
    title: 'Pradhan Mantri Fasal Bima Yojana',
    category: 'Insurance',
    benefit: 'Comprehensive insurance cover against crop failure',
    eligibility: 'All farmers including sharecroppers and tenant farmers',
    description: 'To provide insurance coverage and financial support to the farmers in the event of failure of any of the notified crop as a result of natural calamities.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop',
    tags: ['Crop Insurance', 'Risk Mitigation']
  },
  {
    id: 3,
    title: 'Kisan Credit Card (KCC)',
    category: 'Credit & Loan',
    benefit: 'Short term credit for crops at low interest rates',
    eligibility: 'All farmers, individuals/joint borrowers',
    description: 'To provide adequate and timely credit support from the banking system under a single window with flexible and simplified procedure.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop',
    tags: ['Low Interest', 'Banking']
  },
  {
    id: 4,
    title: 'Soil Health Card Scheme',
    category: 'Technical Support',
    benefit: 'Detailed soil analysis and fertilizer recommendations',
    eligibility: 'All farmers across the country',
    description: 'To assist State Governments to issue Soil Health Cards to all farmers in the country to provide a basis to address nutrient deficiencies.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop',
    tags: ['Soil Health', 'Productivity']
  }
];

const Schemes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Financial Support', 'Insurance', 'Credit & Loan', 'Technical Support'];

  const filteredSchemes = useMemo(() => {
    return schemesData.filter(scheme => {
      const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-emerald-800 text-white p-8 md:p-12 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
          alt="Government schemes background" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit">
            <Landmark className="h-4 w-4" />
            <span className="text-sm font-bold uppercase tracking-wider">Govt. Initiatives</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Farmer Welfare Schemes</h1>
          <p className="text-emerald-50 text-lg max-w-2xl">Discover government programs designed to support your farming journey. From financial aid to technical guidance, find the right scheme for you.</p>
          
          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <div className="relative flex-grow max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-300" />
              <input 
                type="text" 
                placeholder="Search schemes by name or benefit..."
                className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:bg-white/20 focus:outline-none placeholder:text-emerald-200 text-white font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredSchemes.map((scheme) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={scheme.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={scheme.image} 
                  alt={scheme.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                    {scheme.category}
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6 flex-grow flex flex-col">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">{scheme.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2">{scheme.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 py-4 border-y border-slate-50">
                  <div className="flex items-start space-x-3">
                    <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600 mt-0.5">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Benefit</div>
                      <div className="text-sm font-bold text-slate-700">{scheme.benefit}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-0.5">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Eligibility</div>
                      <div className="text-sm font-bold text-slate-700">{scheme.eligibility}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {scheme.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full border border-slate-100 uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 mt-auto">
                  <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center group/btn shadow-lg shadow-slate-100">
                    View Details & Apply 
                    <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Help Section */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-xs font-bold w-fit mx-auto md:mx-0">Support Center</div>
            <h2 className="text-3xl font-black">Need help with application?</h2>
            <p className="text-slate-400 max-w-md">Our experts can guide you through the documentation and application process for any government scheme.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center">
              <BookOpen className="mr-2 h-5 w-5" /> Guide Book
            </button>
            <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center">
              Contact Helpline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schemes;

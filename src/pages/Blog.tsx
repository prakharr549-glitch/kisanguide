import React, { useState } from 'react';
import { BookOpen, Calendar, ArrowRight, MessageSquare, Share2, Bookmark, Search, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const blogPosts = [
  {
    id: 1,
    title: 'Modern Irrigation Techniques for Small Farms',
    category: 'Technology',
    author: 'Dr. Ramesh Kumar',
    date: 'March 15, 2024',
    excerpt: 'Explore how drip and sprinkler irrigation can save water and increase crop yield for small-scale farmers.',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=800&auto=format&fit=crop',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'The Rise of Organic Farming in India',
    category: 'Trends',
    author: 'Sunita Sharma',
    date: 'March 12, 2024',
    excerpt: 'Why more farmers are switching to organic methods and how it impacts the market and soil health.',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=800&auto=format&fit=crop',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'Managing Soil Health During Monsoon',
    category: 'Soil Science',
    author: 'Prof. Anil Verma',
    date: 'March 10, 2024',
    excerpt: 'Essential tips to prevent soil erosion and nutrient leaching during heavy rainfall seasons.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Post-Harvest Management of Vegetables',
    category: 'Logistics',
    author: 'Meera Reddy',
    date: 'March 08, 2024',
    excerpt: 'Learn about effective cooling and packaging techniques to extend the shelf life of your produce.',
    image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=800&auto=format&fit=crop',
    readTime: '7 min read'
  }
];

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technology', 'Trends', 'Soil Science', 'Logistics'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-12">
      {/* Header Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 text-white p-8 md:p-16 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop" 
          alt="Blog header background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-8 max-w-3xl text-center lg:text-left">
            <div className="flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md px-4 py-2 rounded-full w-fit mx-auto lg:mx-0 border border-emerald-500/30">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Knowledge Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">KisanGuide <span className="text-emerald-500">Insights</span></h1>
            <p className="text-slate-300 text-xl leading-relaxed">Expert advice, latest trends, and success stories from the heart of Indian agriculture. Empowering farmers through knowledge.</p>
            
            <div className="relative max-w-xl mx-auto lg:mx-0">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search articles, guides, or authors..."
                className="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-md border border-white/10 rounded-[1.5rem] focus:bg-white/20 focus:outline-none placeholder:text-slate-500 text-white font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-48 w-48 rounded-3xl overflow-hidden shadow-2xl rotate-3">
                  <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                </div>
                <div className="h-32 w-48 rounded-3xl overflow-hidden shadow-2xl -rotate-6 bg-emerald-600 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="h-32 w-48 rounded-3xl overflow-hidden shadow-2xl rotate-6 bg-slate-800 flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-emerald-500" />
                </div>
                <div className="h-48 w-48 rounded-3xl overflow-hidden shadow-2xl -rotate-3">
                  <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        <div className="bg-white p-2 rounded-[1.5rem] border border-slate-100 shadow-sm flex space-x-1">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post (Optional, showing first filtered) */}
      {filteredPosts.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl cursor-pointer"
        >
          <img src={blogPosts[0].image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 space-y-6">
            <div className="flex items-center space-x-4">
              <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">Featured Article</span>
              <span className="text-white/60 text-sm font-medium">{blogPosts[0].readTime}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight max-w-3xl group-hover:text-emerald-400 transition-colors">{blogPosts[0].title}</h2>
            <p className="text-slate-300 text-lg max-w-2xl line-clamp-2">{blogPosts[0].excerpt}</p>
            <div className="flex items-center space-x-4 pt-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">RK</div>
              <div>
                <div className="text-white font-bold">{blogPosts[0].author}</div>
                <div className="text-white/50 text-xs uppercase tracking-widest font-black">{blogPosts[0].date}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredPosts.filter((_, i) => !(selectedCategory === 'All' && !searchQuery && i === 0)).map((post) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={post.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-lg">
                    {post.category}
                  </div>
                </div>
                <div className="absolute bottom-6 right-6">
                  <div className="bg-emerald-600 text-white p-3 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1.5 text-emerald-500" /> {post.date}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1.5 text-emerald-500" /> {post.readTime}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-slate-500 leading-relaxed line-clamp-3">{post.excerpt}</p>

                <div className="pt-6 mt-auto border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-sm font-bold text-slate-700">{post.author}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><Bookmark className="h-4 w-4" /></button>
                    <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><Share2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Newsletter Section */}
      <div className="bg-emerald-600 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-emerald-100">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mb-48" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">Stay updated with KisanGuide</h2>
            <p className="text-emerald-50 text-lg opacity-90">Subscribe to our newsletter and get the latest agricultural news, expert tips, and market insights delivered straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-8 py-5 bg-white/20 backdrop-blur-md border border-white/30 rounded-[1.5rem] focus:bg-white/30 focus:outline-none placeholder:text-emerald-100 text-white font-medium"
              />
              <button className="px-10 py-5 bg-white text-emerald-600 font-black rounded-[1.5rem] hover:bg-emerald-50 transition-all shadow-xl whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
            <p className="text-emerald-200 text-xs">Join 50,000+ farmers who receive our weekly insights.</p>
          </div>
          <div className="hidden lg:block">
            <MessageSquare className="h-48 w-48 text-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

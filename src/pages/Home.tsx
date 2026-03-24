import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Cloud, ShoppingBag, BookOpen, Calculator, Newspaper, Lightbulb, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    { name: 'Weather Forecast', path: '/weather', icon: Cloud, color: 'bg-blue-500', desc: 'Real-time local weather updates and 7-day agricultural forecasts.' },
    { name: 'Mandi Prices', path: '/mandi', icon: ShoppingBag, color: 'bg-green-500', desc: 'Latest market rates for crops across major Indian mandis.' },
    { name: 'Crop Guide', path: '/crop-guide', icon: BookOpen, color: 'bg-amber-500', desc: 'Expert advice on sowing, irrigation, and harvesting techniques.' },
    { name: 'Agri Calculators', path: '/calculators', icon: Calculator, color: 'bg-indigo-500', desc: 'Calculate fertilizer, seed rate, and irrigation needs precisely.' },
    { name: 'Govt Schemes', path: '/schemes', icon: Newspaper, color: 'bg-purple-500', desc: 'Information on latest subsidies, insurance, and credit schemes.' },
    { name: 'Business Ideas', path: '/business-ideas', icon: Lightbulb, color: 'bg-yellow-500', desc: 'Profitable agri-business opportunities for rural entrepreneurs.' },
    { name: 'Expert Blog', path: '/blog', icon: Newspaper, color: 'bg-emerald-500', desc: 'Articles on modern farming and sustainable agriculture.' },
  ];

  const stats = [
    { label: 'Active Farmers', value: '50,000+', icon: Users },
    { label: 'Mandis Covered', value: '1,200+', icon: ShoppingBag },
    { label: 'Crop Guides', value: '150+', icon: BookOpen },
    { label: 'Success Rate', value: '94%', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative h-[600px] -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
          alt="Lush green farm" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                Modernizing <span className="text-green-400">Indian Agriculture</span>
              </h1>
              <p className="text-xl text-green-50/90 leading-relaxed">
                Empowering the backbone of our nation with digital tools, real-time data, and expert knowledge to ensure a prosperous future for every farmer.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/mandi" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center space-x-2">
                  <span>Check Mandi Prices</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/weather" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all">
                  Weather Forecast
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center space-y-2"
            >
              <div className="inline-flex p-3 bg-green-50 rounded-xl text-green-600 mb-2">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Comprehensive Digital Farming Suite</h2>
          <p className="text-slate-600 text-lg">Everything a modern farmer needs to succeed in today's competitive agricultural landscape.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Link
                to={feature.path}
                className="group block h-full bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-green-200 transition-all"
              >
                <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">{feature.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {feature.desc}
                </p>
                <div className="flex items-center text-green-600 font-bold text-sm">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2000&auto=format&fit=crop" 
              alt="Farmer in field" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 p-12 md:p-20 text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
              Ready to take your farming to the next level?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Join thousands of farmers who are already using KisanGuide to increase their yields and maximize profits.
            </p>
            <div className="flex justify-center">
              <Link to="/crop-guide" className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-green-500/20">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Note */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-100 bg-white/50 rounded-[3rem] my-12">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-3xl overflow-hidden border-4 border-white shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-all duration-500">
              <img 
                src="/founder.jpg" 
                alt="Prakhar Rai" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://picsum.photos/seed/prakhar-founder/600/800";
                }}
              />
            </div>
          </div>
          <div className="space-y-8 text-center md:text-left flex-grow max-w-2xl">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <Users className="h-3 w-3" />
                <span>Meet the Founder</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                A Vision for <span className="text-green-600">Digital Agriculture</span>
              </h2>
            </div>
            
            <div className="relative">
              <span className="absolute -top-8 -left-8 text-8xl text-green-100 font-serif opacity-50">"</span>
              <p className="text-slate-600 text-xl italic leading-relaxed relative z-10">
                KisanGuide was born out of a simple vision: to bridge the gap between traditional farming and modern technology. We believe that by providing farmers with the right information at the right time, we can transform lives and secure our nation's food future.
              </p>
            </div>

            <div className="pt-6 flex flex-col md:flex-row items-center gap-6">
              <div>
                <div className="font-black text-3xl text-slate-900">Prakhar Rai</div>
                <div className="text-green-600 font-bold tracking-wide uppercase text-sm">Founder & Visionary, KisanGuide</div>
              </div>
              <div className="h-px w-12 bg-slate-200 hidden md:block"></div>
              <div className="flex space-x-4">
                <a href="https://x.com/NishaRai141818" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-green-500 hover:text-white transition-all">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

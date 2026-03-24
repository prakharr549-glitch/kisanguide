import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Cloud, ShoppingBag, BookOpen, Calculator, Menu, X, Lightbulb, Newspaper } from 'lucide-react';
import { SocialAd } from './SocialAd';
import { BannerAd } from './BannerAd';
import { BottomAd } from './BottomAd';
import { StickyFooterAd } from './StickyFooterAd';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Weather', path: '/weather', icon: Cloud },
    { name: 'Mandi Prices', path: '/mandi', icon: ShoppingBag },
    { name: 'Crop Guide', path: '/crop-guide', icon: BookOpen },
    { name: 'Calculators', path: '/calculators', icon: Calculator },
    { name: 'Schemes', path: '/schemes', icon: Newspaper },
    { name: 'Business Ideas', path: '/business-ideas', icon: Lightbulb },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-green-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-white p-1 rounded-full">
                  <Home className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-xl font-bold tracking-tight">KisanGuide</span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-4">
              {navItems.slice(0, 5).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path ? 'bg-green-700 text-white' : 'text-green-50 hover:bg-green-500'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-green-500 focus:outline-none">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-green-700 border-t border-green-500 animate-in slide-in-from-top duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium ${
                    location.pathname === item.path ? 'bg-green-800 text-white' : 'text-green-50 hover:bg-green-600'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area with Sidebar Ad */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex">
        <main className="flex-grow">
          {children}
          <BannerAd />
        </main>
        <BottomAd />
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto mb-12 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md-col-span-2">
              <h3 className="text-white text-xl font-bold mb-4">KisanGuide</h3>
              <p className="text-sm leading-relaxed max-w-md">
                Empowering farmers with real-time data, expert advice, and digital tools to improve agricultural productivity and profitability across India.
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="https://x.com/NishaRai141818" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/weather" className="hover:text-white transition-colors">Weather Forecast</Link></li>
                <li><Link to="/mandi" className="hover:text-white transition-colors">Mandi Prices</Link></li>
                <li><Link to="/crop-guide" className="hover:text-white transition-colors">Crop Management</Link></li>
                <li><Link to="/calculators" className="hover:text-white transition-colors">Agri Calculators</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">About KisanGuide</h3>
              <div className="space-y-3 text-sm">
                <p>Founded by <span className="text-white font-black">Prakhar Rai</span></p>
                <p>Powered by <span className="text-white font-medium">Omnician Tech</span></p>
                <p className="mt-4 pt-4 border-t border-slate-800">Email: support@kisanguide.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
            <p>&copy; {new Date().getFullYear()} KisanGuide. All rights reserved.</p>
            <p className="mt-2 md:mt-0 italic">Made with ❤️ for Indian Farmers</p>
          </div>
        </div>
      </footer>

      <StickyFooterAd />
      <SocialAd />
    </div>
  );
};

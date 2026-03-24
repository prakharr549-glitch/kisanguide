import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Cloud, ShoppingBag, BookOpen, Calculator, Menu, X, Lightbulb, Newspaper } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-white p-1.5 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-xl font-bold tracking-tight">KisanGuide</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-green-700 text-white'
                      : 'text-green-100 hover:bg-green-500 hover:text-white'
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-green-600 border-t border-green-500">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'bg-green-700 text-white'
                      : 'text-green-100 hover:bg-green-500 hover:text-white'
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

      {/* Main Content Area */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold text-white">KisanGuide</span>
              </div>
              <p className="text-sm">
                Empowering farmers with real-time information, expert guidance, and modern tools to improve agricultural productivity.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/weather" className="hover:text-green-500 transition-colors">Weather Forecast</Link></li>
                <li><Link to="/mandi" className="hover:text-green-500 transition-colors">Mandi Prices</Link></li>
                <li><Link to="/crop-guide" className="hover:text-green-500 transition-colors">Crop Guide</Link></li>
                <li><Link to="/calculators" className="hover:text-green-500 transition-colors">Fertilizer Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact Us</h3>
              <p className="text-sm">
                Email: support@kisanguide.com<br />
                Phone: +91 1800-123-4567<br />
                Address: Krishi Bhawan, New Delhi, India
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} KisanGuide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Calculator, TrendingUp, ShieldAlert, FileText, Calendar, Lightbulb, Menu, X, Cloud } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { SocialAd } from './SocialAd';
import { StickyFooterAd } from './StickyFooterAd';
import { BannerAd } from './BannerAd';
import { BottomAd } from './BottomAd';

const navItems = [
  { name: 'Home', path: '/', icon: Sprout },
  { name: 'Calculators', path: '/calculators', icon: Calculator },
  { name: 'Mandi Prices', path: '/mandi-prices', icon: TrendingUp },
  { name: 'Weather', path: '/weather', icon: Cloud },
  { name: 'Disease ID', path: '/disease-id', icon: ShieldAlert },
  { name: 'Schemes', path: '/schemes', icon: FileText },
  { name: 'Crop Guide', path: '/crop-guide', icon: Calendar },
  { name: 'Business Ideas', path: '/business-ideas', icon: Lightbulb },
  { name: 'Blog', path: '/blog', icon: FileText },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-emerald-900">KisanGuide</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-4">
              {navItems.slice(0, 5).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-stone-600 hover:text-emerald-600 hover:bg-emerald-50/50"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-stone-600 hover:bg-stone-100"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium",
                    location.pathname === item.path
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-stone-600 hover:bg-stone-50"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
        <BottomAd />
      </main>

      <div className="hidden md:block">
        <BannerAd />
      </div>

      {/* Footer */}
      <footer className="bg-emerald-900 text-emerald-50 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sprout className="w-6 h-6" />
                <span className="text-xl font-bold">KisanGuide</span>
              </div>
              <p className="text-emerald-200 text-sm">
                Empowering Indian farmers with technology and information.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-emerald-200">
                <li><Link to="/calculators">Calculators</Link></li>
                <li><Link to="/mandi-prices">Mandi Prices</Link></li>
                <li><Link to="/schemes">Govt Schemes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-emerald-200">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-emerald-200">
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/disclaimer">Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-800 mt-12 pt-8 text-center text-sm text-emerald-300">
            © {new Date().getFullYear()} KisanGuide. All rights reserved.
          </div>
        </div>
      </footer>

      <StickyFooterAd />
      <SocialAd />
    </div>
  );
};

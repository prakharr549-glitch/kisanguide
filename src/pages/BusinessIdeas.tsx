/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';
import { BUSINESS_IDEAS } from '../constants';

export const BusinessIdeas: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Farming Business Ideas</h1>
        <p className="text-stone-600">Explore high-profit agricultural ventures with low to medium investment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {BUSINESS_IDEAS.map((idea) => (
          <div key={idea.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 flex-grow space-y-6">
              <div className="flex justify-between items-start">
                <div className="bg-yellow-50 w-12 h-12 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  idea.risk === 'Low' ? 'bg-emerald-100 text-emerald-700' : 
                  idea.risk === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {idea.risk} Risk
                </span>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">{idea.title}</h2>
                <p className="text-stone-600 text-sm leading-relaxed">{idea.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> Investment
                  </p>
                  <p className="font-bold text-stone-900 text-sm">{idea.investment}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Profit Potential
                  </p>
                  <p className="font-bold text-emerald-900 text-sm">{idea.profit}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-stone-50 border-t border-stone-100">
              <button className="w-full text-emerald-600 font-bold hover:underline text-sm">View Full Business Plan</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

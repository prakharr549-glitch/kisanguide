/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { CROP_SUGGESTIONS } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const CropGuide: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Seasonal Crop Guide</h1>
        <p className="text-stone-600">Best crops to grow month-by-month in North India (UP, Bihar, Punjab, Haryana).</p>
      </div>

      <AdPlaceholder slot="guide-top" />

      <div className="space-y-8">
        {CROP_SUGGESTIONS.map((suggestion, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="bg-emerald-800 p-6 text-white flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{suggestion.month}</h2>
                <p className="text-emerald-200 text-sm">Recommended Sowing Guide</p>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-4">Best Crops to SOW</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestion.crops.map((crop, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-bold border border-emerald-100">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-4">Expert Tips</h3>
                <ul className="space-y-3">
                  {suggestion.tips.map((tip, i) => (
                    <li key={i} className="flex gap-3 text-stone-700 text-sm leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdPlaceholder slot="guide-bottom" />
    </div>
  );
};

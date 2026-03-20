/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { SCHEMES } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const Schemes: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Government Schemes for Farmers</h1>
        <p className="text-stone-600">Detailed information about central and state government schemes to support your farming journey.</p>
      </div>

      <AdPlaceholder slot="schemes-top" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SCHEMES.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 flex-grow">
              <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{scheme.title}</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Eligibility
                  </h3>
                  <ul className="space-y-2">
                    {scheme.eligibility.map((item, i) => (
                      <li key={i} className="text-stone-700 text-sm flex gap-2">
                        <span className="text-emerald-500">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" /> Benefits
                  </h3>
                  <ul className="space-y-2">
                    {scheme.benefits.map((item, i) => (
                      <li key={i} className="text-stone-700 text-sm flex gap-2">
                        <span className="text-blue-500">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
            
            <div className="bg-stone-50 p-6 border-t border-stone-100">
              <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                How to Apply <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AdPlaceholder slot="schemes-bottom" />
    </div>
  );
};

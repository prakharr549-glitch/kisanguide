/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight, RefreshCcw, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DISEASES } from '../constants';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const DiseaseIdentifier: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState('');

  const crops = Array.from(new Set(DISEASES.map(d => d.crop)));
  const symptoms = DISEASES.filter(d => d.crop === selectedCrop).map(d => d.symptom);
  const result = DISEASES.find(d => d.crop === selectedCrop && d.symptom === selectedSymptom);

  const reset = () => {
    setStep(1);
    setSelectedCrop('');
    setSelectedSymptom('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Crop Disease Identifier</h1>
        <p className="text-stone-600">Identify crop diseases by symptoms and get expert solutions instantly.</p>
      </div>

      <AdPlaceholder slot="disease-top" />

      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold">Step 1: Select Your Crop</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {crops.map(crop => (
                    <button
                      key={crop}
                      onClick={() => { setSelectedCrop(crop); setStep(2); }}
                      className="p-6 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-center font-bold"
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                  <button onClick={() => setStep(1)} className="hover:text-emerald-600">Crops</button>
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-medium text-stone-900">{selectedCrop}</span>
                </div>
                <h2 className="text-xl font-bold">Step 2: Select the Symptom</h2>
                <div className="space-y-3">
                  {symptoms.map(symptom => (
                    <button
                      key={symptom}
                      onClick={() => { setSelectedSymptom(symptom); setStep(3); }}
                      className="w-full p-4 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left flex justify-between items-center group"
                    >
                      <span className="font-medium">{symptom}</span>
                      <ChevronRight className="w-5 h-5 text-stone-300 group-hover:text-emerald-500" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <img src={result.image} alt={result.name} className="w-full aspect-video object-cover rounded-2xl shadow-lg" />
                  </div>
                  <div className="md:w-1/2 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" /> Diagnosis Found
                    </div>
                    <h2 className="text-3xl font-bold text-stone-900">{result.name}</h2>
                    <p className="text-stone-600 italic">"{result.symptom}"</p>
                    
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                      <h3 className="font-bold text-emerald-900 mb-2">Recommended Solution:</h3>
                      <p className="text-stone-800 leading-relaxed">{result.solution}</p>
                    </div>

                    <button 
                      onClick={reset}
                      className="flex items-center gap-2 text-emerald-600 font-bold hover:underline pt-4"
                    >
                      <RefreshCcw className="w-4 h-4" /> Start Over
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AdPlaceholder slot="disease-bottom" />
    </div>
  );
};

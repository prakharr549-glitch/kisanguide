/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

interface AdPlaceholderProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
  adSlotId?: string;
  adClientId?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ 
  slot, 
  format = 'auto', 
  className,
  adSlotId = "4738815888", // Default to the one provided by user
  adClientId = "ca-pub-7128077409769767"
}) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClientId}
        data-ad-slot={adSlotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
      {/* Fallback placeholder for development/debugging */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center min-h-[100px] text-gray-300 text-[10px] uppercase tracking-widest mt-1">
          Ad Slot: {slot}
        </div>
      )}
    </div>
  );
};

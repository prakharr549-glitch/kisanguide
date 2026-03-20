/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export const StickyFooterAd: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && adRef.current.childNodes.length === 0) {
      const scriptConfig = document.createElement('script');
      scriptConfig.type = 'text/javascript';
      scriptConfig.innerHTML = `
        atOptions = {
          'key' : '7dd7b97e9b031833d7d0628b50bfc596',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      
      const scriptInvoke = document.createElement('script');
      scriptInvoke.type = 'text/javascript';
      scriptInvoke.src = "https://www.highperformanceformat.com/7dd7b97e9b031833d7d0628b50bfc596/invoke.js";

      adRef.current.appendChild(scriptConfig);
      adRef.current.appendChild(scriptInvoke);
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white/80 backdrop-blur-sm border-t border-stone-200 p-1 md:hidden">
      <div className="min-h-[50px] min-w-[320px]" ref={adRef} />
    </div>
  );
};

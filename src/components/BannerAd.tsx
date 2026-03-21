/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export const BannerAd: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent double injection in dev mode
    if (adRef.current && adRef.current.childNodes.length === 0) {
      const scriptConfig = document.createElement('script');
      scriptConfig.type = 'text/javascript';
      scriptConfig.innerHTML = `
        atOptions = {
          'key' : '7dd7b97e9b031833d7d0628b50bfc596',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      
      const scriptInvoke = document.createElement('script');
      scriptInvoke.type = 'text/javascript';
      scriptInvoke.src = "https://pl28953359.profitablecpmratenetwork.com/d2/48/73/d24873c6a8c5c101a1c1dc6a168fefee.js";

      adRef.current.appendChild(scriptConfig);
      adRef.current.appendChild(scriptInvoke);
    }
  }, []);

  return (
    <div className="flex justify-center my-4 overflow-hidden min-h-[90px]">
      <div ref={adRef} />
    </div>
  );
};

import React, { useEffect, useRef } from 'react';

export const BannerAd: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current) {
      adRef.current.innerHTML = '';
      const conf = document.createElement('script');
      conf.type = 'text/javascript';
      conf.innerHTML = `
        atOptions = {
          'key' : 'ade34d097a6918ed62a0e3a911f0a623',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.highperformanceformat.com/ade34d097a6918ed62a0e3a911f0a623/invoke.js';
      
      adRef.current.appendChild(conf);
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center my-8 w-full overflow-hidden">
      <div 
        ref={adRef} 
        className="min-h-[90px] w-full max-w-[728px] bg-slate-50 rounded-lg flex items-center justify-center text-[10px] text-slate-300 uppercase tracking-[0.2em] font-bold border border-dashed border-slate-200"
      >
        Advertisement
      </div>
    </div>
  );
};

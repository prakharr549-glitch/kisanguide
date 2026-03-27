import React, { useEffect, useRef } from 'react';

export const BannerAd: React.FC = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adContainerRef.current) {
      // Clear existing content
      adContainerRef.current.innerHTML = '';

      // Define atOptions globally
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).atOptions = {
        'key' : 'ade34d097a6918ed62a0e3a911f0a623',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };

      // Create the script element
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//www.highperformanceformat.com/ade34d097a6918ed62a0e3a911f0a623/invoke.js';
      
      // Append the script to the container
      adContainerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-4 px-4">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div 
          ref={adContainerRef} 
          className="min-h-[90px] min-w-[728px] bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden"
        >
          {/* The ad will be injected here by the script */}
          <div className="text-center text-slate-400 dark:text-slate-500 text-xs font-medium">
            <p>Advertisement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

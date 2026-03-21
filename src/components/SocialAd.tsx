/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

export const SocialAd: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.highperformanceformat.com/7dd7b97e9b031833d7d0628b50bfc596/invoke.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed, though usually these scripts stay
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null; // This component doesn't render anything itself
};

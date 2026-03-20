/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

export const SocialAd: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pl28951109.profitablecpmratenetwork.com/fb/63/d5/fb63d58f8c91af5427a9c34099be8ace.js';
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

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

export const SocialAd: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pl28953359.profitablecpmratenetwork.com/d2/48/73/d24873c6a8c5c101a1c1dc6a168fefee.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null; // The script handles its own rendering (Social Bar)
};

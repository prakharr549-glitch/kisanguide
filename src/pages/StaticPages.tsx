/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const StaticPage: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="max-w-3xl mx-auto py-12 px-4">
    <h1 className="text-4xl font-bold mb-8 text-emerald-900">{title}</h1>
    <div className="prose prose-emerald max-w-none text-stone-700 leading-relaxed space-y-6">
      {children}
    </div>
  </div>
);

export const About: React.FC = () => (
  <StaticPage title="About Us">
    <p>KisanGuide is dedicated to empowering Indian farmers with the latest technology and information. Our platform provides daily mandi prices, farming calculators, and expert guides to help you make informed decisions.</p>
    <p>Our mission is to bridge the gap between traditional farming and modern agricultural practices, ensuring sustainable growth for every farmer.</p>
  </StaticPage>
);

export const Contact: React.FC = () => (
  <StaticPage title="Contact Us">
    <p>Have questions or suggestions? We'd love to hear from you!</p>
    <div className="bg-white p-8 rounded-3xl border border-stone-200 space-y-4">
      <div>
        <h3 className="font-bold text-stone-900">Email</h3>
        <p>support@kisanguide.com</p>
      </div>
      <div>
        <h3 className="font-bold text-stone-900">Address</h3>
        <p>123, Agriculture Hub, Lucknow, Uttar Pradesh, India</p>
      </div>
    </div>
  </StaticPage>
);

export const Privacy: React.FC = () => (
  <StaticPage title="Privacy Policy">
    <p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.</p>
    <h2 className="text-2xl font-bold mt-8">Information Collection</h2>
    <p>We do not collect any personal data unless explicitly provided by you through our contact forms.</p>
    <h2 className="text-2xl font-bold mt-8">Cookies</h2>
    <p>We use cookies to enhance your browsing experience and analyze site traffic through Google AdSense and Analytics.</p>
  </StaticPage>
);

export const Terms: React.FC = () => (
  <StaticPage title="Terms & Conditions">
    <p>By using KisanGuide, you agree to these terms. Please read them carefully.</p>
    <h2 className="text-2xl font-bold mt-8">Use of Content</h2>
    <p>The information provided on this platform is for educational purposes only. We are not responsible for any farming losses based on the data provided.</p>
  </StaticPage>
);

export const Disclaimer: React.FC = () => (
  <StaticPage title="Disclaimer">
    <p>The mandi prices and crop guides provided are based on market trends and expert opinions. Actual prices and results may vary depending on local conditions and market fluctuations.</p>
    <p>Always consult with local agricultural experts before making significant farming investments.</p>
  </StaticPage>
);

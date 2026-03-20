/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { NotificationManager } from './components/NotificationManager';
import { Home } from './pages/Home';
import { Calculators } from './pages/Calculators';
import { MandiPrices } from './pages/MandiPrices';
import { Weather } from './pages/Weather';
import { DiseaseIdentifier } from './pages/DiseaseIdentifier';
import { Schemes } from './pages/Schemes';
import { CropGuide } from './pages/CropGuide';
import { BusinessIdeas } from './pages/BusinessIdeas';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { About, Contact, Privacy, Terms, Disclaimer } from './pages/StaticPages';

export default function App() {
  return (
    <Router>
      <Layout>
        <NotificationManager />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/mandi-prices" element={<MandiPrices />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/disease-id" element={<DiseaseIdentifier />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/crop-guide" element={<CropGuide />} />
          <Route path="/business-ideas" element={<BusinessIdeas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

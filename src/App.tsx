import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Weather = lazy(() => import('./pages/Weather'));
const MandiPrices = lazy(() => import('./pages/MandiPrices'));
const CropGuide = lazy(() => import('./pages/CropGuide'));
const Calculators = lazy(() => import('./pages/Calculators'));
const Schemes = lazy(() => import('./pages/Schemes'));
const BusinessIdeas = lazy(() => import('./pages/BusinessIdeas'));
const Blog = lazy(() => import('./pages/Blog'));

const Loading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/mandi" element={<MandiPrices />} />
            <Route path="/crop-guide" element={<CropGuide />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/business-ideas" element={<BusinessIdeas />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;

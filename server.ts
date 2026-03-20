/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Proxy endpoint for Mandi Prices to avoid CORS
  app.get('/api/mandi-proxy', async (req, res) => {
    const headerKey = req.headers['x-api-key'] as string;
    const envKey = process.env.VITE_GOV_DATA_API_KEY;
    
    // Use header key if provided, otherwise use environment key
    const rawKey = headerKey || envKey;
    
    // Remove whitespace and potential surrounding quotes
    const API_KEY = rawKey?.trim().replace(/^["']|["']$/g, '');
    console.log('Mandi Proxy Request:', { 
      source: headerKey ? 'header' : 'env',
      hasApiKey: !!API_KEY, 
      keyLength: API_KEY?.length 
    });

    if (!API_KEY) {
      return res.status(500).json({ 
        error: 'API_KEY_MISSING', 
        message: 'Mandi API Key is not set. Please add it in Settings -> Secrets or use the "Configure API" option in the app.' 
      });
    }

    const { state, district, commodity, q, limit = '20', offset = '0' } = req.query;
    const RESOURCE_ID = '9ef84265-d588-465a-a308-a864a43d0070';
    const url = new URL(`https://api.data.gov.in/resource/${RESOURCE_ID}`);
    
    url.searchParams.append('api-key', API_KEY);
    url.searchParams.append('format', 'json');
    url.searchParams.append('limit', limit as string);
    url.searchParams.append('offset', offset as string);

    if (q) url.searchParams.append('q', q as string);
    if (state) url.searchParams.append('filters[state]', state as string);
    if (district) url.searchParams.append('filters[district]', district as string);
    if (commodity) url.searchParams.append('filters[commodity]', commodity as string);

    try {
      console.log('Fetching from Gov API:', url.toString().replace(API_KEY, 'REDACTED'));
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        console.error('Gov API Error:', response.status, errorBody);
        
        let message = `Government API returned status ${response.status}`;
        if (response.status === 403) {
          message = 'API Key not authorised. Please ensure your key is active and your email is verified on data.gov.in.';
        } else if (errorBody.message || errorBody.error) {
          message = errorBody.message || errorBody.error;
        }

        return res.status(response.status).json({ 
          error: 'API_FETCH_FAILED', 
          status: response.status,
          message: message,
          details: errorBody
        });
      }

      const data = await response.json();
      console.log('Gov API Success:', { 
        count: data.count, 
        total: data.total,
        hasRecords: !!data.records,
        recordsCount: data.records?.length 
      });
      
      if (!data.records || data.records.length === 0) {
        console.warn('Gov API returned 0 records for URL:', url.toString().replace(API_KEY, 'REDACTED'));
      }

      res.json(data);
    } catch (error: any) {
      console.error('Proxy internal error:', error);
      res.status(500).json({ 
        error: 'INTERNAL_SERVER_ERROR', 
        message: error.message 
      });
    }
  });

  // Weather Proxy Endpoint
  app.get('/api/weather-proxy', async (req, res) => {
    const rawKey = process.env.VITE_OPENWEATHER_API_KEY;
    const API_KEY = rawKey?.trim().replace(/^["']|["']$/g, '');
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'API_KEY_MISSING', message: 'VITE_OPENWEATHER_API_KEY is not set.' });
    }

    const { lat, lon, q, units = 'metric' } = req.query;
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('appid', API_KEY);
    url.searchParams.append('units', units as string);
    
    if (lat && lon) {
      url.searchParams.append('lat', lat as string);
      url.searchParams.append('lon', lon as string);
    } else if (q) {
      url.searchParams.append('q', q as string);
    } else {
      return res.status(400).json({ error: 'MISSING_PARAMS', message: 'Provide lat/lon or q (city name).' });
    }

    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
      
      res.json(data);
    } catch (error: any) {
      console.error('Weather proxy error:', error);
      res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
  });

  // Forecast Proxy Endpoint
  app.get('/api/forecast-proxy', async (req, res) => {
    const rawKey = process.env.VITE_OPENWEATHER_API_KEY;
    const API_KEY = rawKey?.trim().replace(/^["']|["']$/g, '');
    
    if (!API_KEY) {
      return res.status(500).json({ error: 'API_KEY_MISSING', message: 'VITE_OPENWEATHER_API_KEY is not set.' });
    }

    const { lat, lon, q, units = 'metric' } = req.query;
    const url = new URL('https://api.openweathermap.org/data/2.5/forecast');
    url.searchParams.append('appid', API_KEY);
    url.searchParams.append('units', units as string);
    
    if (lat && lon) {
      url.searchParams.append('lat', lat as string);
      url.searchParams.append('lon', lon as string);
    } else if (q) {
      url.searchParams.append('q', q as string);
    }

    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
      
      res.json(data);
    } catch (error: any) {
      console.error('Forecast proxy error:', error);
      res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import express from "express";
import { createServer as createViteServer } from "vite";
import axios, { AxiosError } from "axios";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to handle JSON bodies
  app.use(express.json({ limit: '20mb' }));

  // API Route to proxy Perenual identification
  app.post("/api/identify-disease", async (req, res) => {
    try {
      const { image } = req.body;
      const apiKey = process.env.VITE_PERENUAL_API_KEY || 'sk-kYxe69c15823cd04615715';

      if (!image) {
        return res.status(400).json({ error: "No image provided" });
      }

      const response = await axios.post(`https://perenual.com/api/pest-disease-id-api?key=${apiKey}`, {
        image: image,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000 // 15 seconds timeout
      });

      res.json(response.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const statusCode = axiosError.response?.status || 500;
      const errorData = axiosError.response?.data as { message?: string } | undefined;
      
      console.error('Perenual API Error:', errorData || axiosError.message);
      
      let message = "Identification service error.";
      if (statusCode === 429) {
        message = "Daily API limit reached (100/day). Please try again tomorrow.";
      } else if (errorData && errorData.message) {
        message = errorData.message;
      } else if (axiosError.message) {
        message = axiosError.message;
      }

      res.status(statusCode).json({ error: message });
    }
  });

  // API Route to search for crops using Perenual
  app.get("/api/search-crops", async (req, res) => {
    try {
      const { q, page } = req.query;
      const apiKey = process.env.VITE_PERENUAL_API_KEY || 'sk-kYxe69c15823cd04615715';

      const response = await axios.get(`https://perenual.com/api/species-list?key=${apiKey}`, {
        params: { q, page: page || 1 },
        timeout: 15000
      });

      res.json(response.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error('Perenual Search API Error:', axiosError.message);
      res.status(axiosError.response?.status || 500).json({ error: "Failed to fetch crops" });
    }
  });

  // API Route to get crop care guide using Perenual
  app.get("/api/crop-care-guide/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const apiKey = process.env.VITE_PERENUAL_API_KEY || 'sk-kYxe69c15823cd04615715';

      // First get the care guide list for this species
      const listResponse = await axios.get(`https://perenual.com/api/species-care-guide-list?key=${apiKey}&species_id=${id}`, {
        timeout: 15000
      });

      res.json(listResponse.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error('Perenual Care Guide API Error:', axiosError.message);
      res.status(axiosError.response?.status || 500).json({ error: "Failed to fetch care guide" });
    }
  });

  // API Route to get weather data
  app.get("/api/weather", async (req, res) => {
    try {
      const { lat, lon, city } = req.query;
      const apiKey = process.env.VITE_OPENWEATHER_API_KEY || '5f8e9e9e9e9e9e9e9e9e9e9e9e9e9e9e'; // Placeholder

      let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
      if (city) {
        url += `&q=${city}`;
      } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
      } else {
        url += `&q=Ludhiana`; // Default
      }

      const response = await axios.get(url, { timeout: 10000 });
      res.json(response.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error('Weather API Error:', axiosError.message);
      res.status(axiosError.response?.status || 500).json({ error: "Failed to fetch weather" });
    }
  });

  // API Route to get Mandi prices (Agmarknet)
  app.get("/api/mandi-prices", async (req, res) => {
    try {
      const { state, district, market, commodity } = req.query;
      const apiKey = process.env.VITE_GOV_INDIA_API_KEY || '579b3158e03507200c3d77af28631c13'; // Placeholder

      // Using Data.gov.in Agmarknet API
      const response = await axios.get(`https://api.data.gov.in/resource/9ef2731d-91f2-4502-ad35-e774833966a7`, {
        params: {
          'api-key': apiKey,
          format: 'json',
          limit: 50,
          'filters[state]': state,
          'filters[district]': district,
          'filters[market]': market,
          'filters[commodity]': commodity
        },
        timeout: 15000
      });

      res.json(response.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error('Mandi API Error:', axiosError.message);
      res.status(axiosError.response?.status || 500).json({ error: "Failed to fetch Mandi prices" });
    }
  });

  // API Route to get crop details using Perenual
  app.get("/api/crop-details/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const apiKey = process.env.VITE_PERENUAL_API_KEY || 'sk-kYxe69c15823cd04615715';

      const response = await axios.get(`https://perenual.com/api/species/details/${id}?key=${apiKey}`, {
        timeout: 15000
      });

      res.json(response.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      console.error('Perenual Details API Error:', axiosError.message);
      res.status(axiosError.response?.status || 500).json({ error: "Failed to fetch crop details" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

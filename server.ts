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

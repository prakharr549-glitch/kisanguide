import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const finalUrl = url.toString();
    console.log('Fetching from OpenWeather API:', finalUrl.replace(API_KEY || '', 'REDACTED'));

    const response = await fetch(finalUrl);
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('OpenWeather API Error Status:', response.status);
      console.error('OpenWeather API Error Body:', errorText);

      let errorBody = {};
      try {
        errorBody = JSON.parse(errorText);
      } catch (e) {
        // Not JSON
      }

      return res.status(response.status).json({ 
        error: 'API_FETCH_FAILED', 
        status: response.status,
        message: (errorBody as any).message || (errorBody as any).error || `OpenWeather API returned status ${response.status}`,
        details: errorBody,
        raw: errorText.substring(0, 200)
      });
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    console.error('Proxy internal error:', error);
    res.status(500).json({ error: 'INTERNAL_SERVER_ERROR', message: error.message });
  }
}

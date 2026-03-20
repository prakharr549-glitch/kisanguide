import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const headerKey = req.headers['x-api-key'] as string;
  const envKey = process.env.VITE_GOV_DATA_API_KEY;
  const rawKey = headerKey || envKey;
  const API_KEY = rawKey?.trim().replace(/^["']|["']$/g, '');

  if (!API_KEY) {
    return res.status(500).json({ 
      error: 'API_KEY_MISSING', 
      message: 'Mandi API Key is not set in Vercel environment variables.' 
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
    const finalUrl = url.toString();
    console.log('Fetching from Gov API:', finalUrl.replace(API_KEY, 'REDACTED'));
    
    const response = await fetch(finalUrl);
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error('Gov API Error Status:', response.status);
      console.error('Gov API Error Body:', errorText);
      
      let errorBody = {};
      try {
        errorBody = JSON.parse(errorText);
      } catch (e) {
        // Not JSON
      }

      return res.status(response.status).json({ 
        error: 'API_FETCH_FAILED', 
        status: response.status,
        message: (errorBody as any).message || (errorBody as any).error || `Gov API returned status ${response.status}`,
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

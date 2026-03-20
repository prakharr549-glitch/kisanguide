/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MandiPrice } from '../types';

export interface GovDataResponse {
  records: Array<{
    state: string;
    district: string;
    market: string;
    commodity: string;
    variety: string;
    arrival_date: string;
    min_price: string;
    max_price: string;
    modal_price: string;
  }>;
  total: number;
  count: number;
  status?: string;
  message?: string;
}

export const fetchMandiPrices = async (
  state?: string,
  district?: string,
  search?: string,
  limit = 100,
  offset = 0,
  apiKey?: string
): Promise<MandiPrice[]> => {
  // Use provided apiKey or fallback to Vite env variable
  const activeApiKey = apiKey || import.meta.env.VITE_GOV_DATA_API_KEY;

  // We call our server-side proxy to avoid CORS issues
  const url = new URL('/api/mandi-proxy', window.location.origin);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());

  // Add filters if provided
  if (state) url.searchParams.append('state', state);
  if (district) url.searchParams.append('district', district);
  if (search) url.searchParams.append('q', search);

  const headers: HeadersInit = {};
  if (activeApiKey) {
    headers['x-api-key'] = activeApiKey;
  }

  console.log('Mandi API: Fetching via proxy:', url.toString());

  try {
    const response = await fetch(url.toString(), { headers });
    
    if (!response.ok) {
      const status = response.status;
      let errorMessage = `API_FETCH_FAILED (${status})`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.status || errorMessage;
      } catch (e) {
        // If not JSON, try text
        const text = await response.text().catch(() => '');
        if (text.includes('The page could not be found') || text.includes('404')) {
          errorMessage = 'Mandi API endpoint not found (404). Please check deployment.';
        } else if (text.includes('invalid api key') || text.includes('Unauthorised')) {
          errorMessage = 'Invalid or Unauthorised API Key';
        } else if (text.length > 0) {
          errorMessage = `Server error: ${text.substring(0, 100)}...`;
        }
      }
      
      if (errorMessage === 'API_KEY_MISSING') {
        throw new Error('API_KEY_MISSING');
      }
      
      console.error(`Mandi API Error: ${errorMessage}`, { status });
      throw new Error(errorMessage);
    }

    const data: GovDataResponse = await response.json();

    if (!data || !data.records) {
      console.error('Mandi API: Invalid response format', data);
      throw new Error('INVALID_RESPONSE_FORMAT');
    }

    return (data.records || []).map((record) => ({
      crop: record.commodity || 'Unknown Crop',
      price: record.modal_price || 'N/A',
      unit: 'Quintal',
      change: 'stable',
      location: record.market || 'Unknown Mandi',
      state: record.state || 'Unknown State',
      district: record.district || 'Unknown District',
    }));
  } catch (error: any) {
    console.error('Mandi API: Fetch exception:', error.message);
    throw error;
  }
};

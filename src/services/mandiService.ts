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
}

export const fetchMandiPrices = async (
  state?: string,
  district?: string,
  search?: string,
  limit = 100,
  offset = 0,
  apiKey?: string
): Promise<MandiPrice[]> => {
  const url = new URL('/api/mandi-proxy', window.location.origin);
  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('offset', offset.toString());

  if (state) url.searchParams.append('state', state);
  if (district) url.searchParams.append('district', district);
  if (search) url.searchParams.append('q', search);

  const headers: HeadersInit = {};
  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    if (errorData.error === 'API_KEY_MISSING') {
      throw new Error('API_KEY_MISSING');
    }
    throw new Error(errorData.message || errorData.error || `API_FETCH_FAILED (${response.status})`);
  }

  const data: GovDataResponse = await response.json();

  return data.records.map((record) => ({
    crop: `${record.commodity} (${record.variety})`,
    price: record.modal_price,
    unit: 'Quintal',
    change: 'stable',
    location: record.market,
    state: record.state,
    district: record.district,
  }));
};

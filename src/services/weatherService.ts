/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
}

export const fetchCurrentWeather = async (lat?: number, lon?: number, city?: string): Promise<WeatherData> => {
  const url = new URL('/api/weather-proxy', window.location.origin);
  if (lat && lon) {
    url.searchParams.append('lat', lat.toString());
    url.searchParams.append('lon', lon.toString());
  } else if (city) {
    url.searchParams.append('q', city);
  } else {
    // Default to New Delhi if no location provided
    url.searchParams.append('q', 'New Delhi');
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch weather');
  }
  return response.json();
};

export const fetchForecast = async (lat?: number, lon?: number, city?: string): Promise<ForecastData> => {
  const url = new URL('/api/forecast-proxy', window.location.origin);
  if (lat && lon) {
    url.searchParams.append('lat', lat.toString());
    url.searchParams.append('lon', lon.toString());
  } else if (city) {
    url.searchParams.append('q', city);
  } else {
    url.searchParams.append('q', 'New Delhi');
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch forecast');
  }
  return response.json();
};

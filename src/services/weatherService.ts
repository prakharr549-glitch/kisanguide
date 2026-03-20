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
    let errorMessage = `Failed to fetch weather (${response.status})`;
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch (e) {
      const text = await response.text().catch(() => '');
      if (text.includes('The page could not be found') || text.includes('404')) {
        errorMessage = 'Weather API endpoint not found (404). Please check deployment.';
      } else if (text.length > 0) {
        errorMessage = `Server error: ${text.substring(0, 100)}...`;
      }
    }
    throw new Error(errorMessage);
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
    let errorMessage = `Failed to fetch forecast (${response.status})`;
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch (e) {
      const text = await response.text().catch(() => '');
      if (text.includes('The page could not be found') || text.includes('404')) {
        errorMessage = 'Forecast API endpoint not found (404). Please check deployment.';
      } else if (text.length > 0) {
        errorMessage = `Server error: ${text.substring(0, 100)}...`;
      }
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

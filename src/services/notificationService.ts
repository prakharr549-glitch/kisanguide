/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { fetchMandiPrices } from './mandiService';
import { fetchCurrentWeather } from './weatherService';

export class NotificationService {
  private static STORAGE_KEY = 'last_notification_time';
  private static INTERVAL_24H = 24 * 60 * 60 * 1000;

  static async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notifications');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    try {
      const permission = await Notification.requestPermission();
      return permission;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }

  static async showDailyUpdate() {
    const permission = await this.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission not granted. Skipping daily update.');
      return;
    }

    const lastTime = localStorage.getItem(this.STORAGE_KEY);
    const now = Date.now();

    if (lastTime && now - parseInt(lastTime) < this.INTERVAL_24H) {
      console.log('Daily notification already shown within last 24h.');
      return;
    }

    try {
      // Fetch real data
      const [mandiData, weatherData] = await Promise.allSettled([
        fetchMandiPrices(undefined, undefined, undefined, 5), // Get some top records
        fetchCurrentWeather()
      ]);

      let body = '';

      // Format Mandi Price (Wheat or first available)
      if (mandiData.status === 'fulfilled' && mandiData.value.length > 0) {
        const wheat = mandiData.value.find(m => m.crop.toLowerCase().includes('wheat')) || mandiData.value[0];
        body += `${wheat.crop} ₹${wheat.price} | `;
      } else {
        body += 'Mandi prices unavailable | ';
      }

      // Format Weather
      if (weatherData.status === 'fulfilled') {
        const w = weatherData.value;
        const condition = w.weather[0]?.main || 'Clear';
        const temp = Math.round(w.main.temp);
        const emoji = this.getWeatherEmoji(condition);
        body += `${condition} ${temp}°C ${emoji}`;
      } else {
        body += 'Weather update unavailable';
      }

      // Show the notification
      const notification = new Notification('🌾 Mandi & Weather Update', {
        body: body,
        icon: '/favicon.ico', // Fallback icon
        badge: '/favicon.ico',
        tag: 'daily-update',
        renotify: true
      } as any);

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      localStorage.setItem(this.STORAGE_KEY, now.toString());
      console.log('Daily notification triggered successfully.');

    } catch (error) {
      console.error('Failed to trigger daily notification:', error);
    }
  }

  private static getWeatherEmoji(condition: string): string {
    const c = condition.toLowerCase();
    if (c.includes('rain')) return '🌧';
    if (c.includes('cloud')) return '☁️';
    if (c.includes('clear')) return '☀️';
    if (c.includes('snow')) return '❄️';
    if (c.includes('thunder')) return '⛈';
    return '🌤';
  }

  static setupAutoTrigger() {
    // Trigger on load
    this.showDailyUpdate();

    // Set interval to check every hour (to see if 24h passed)
    setInterval(() => {
      this.showDailyUpdate();
    }, 60 * 60 * 1000);
  }
}

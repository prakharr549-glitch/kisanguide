/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { NotificationService } from '../services/notificationService';
import { Bell, BellOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NotificationManager: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if we should show the prompt
    if (permission === 'default') {
      const lastPrompt = localStorage.getItem('last_notification_prompt');
      const now = Date.now();
      const ONE_DAY = 24 * 60 * 60 * 1000;

      if (!lastPrompt || now - parseInt(lastPrompt) > ONE_DAY) {
        setShowPrompt(true);
      }
    }

    // Initialize auto-trigger logic
    if (permission === 'granted') {
      NotificationService.setupAutoTrigger();
    }
  }, [permission]);

  const handleRequestPermission = async () => {
    const result = await NotificationService.requestPermission();
    setPermission(result);
    setShowPrompt(false);
    localStorage.setItem('last_notification_prompt', Date.now().toString());

    if (result === 'granted') {
      NotificationService.showDailyUpdate();
      NotificationService.setupAutoTrigger();
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('last_notification_prompt', Date.now().toString());
  };

  if (!('Notification' in window)) return null;

  return (
    <>
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 z-50 overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Bell className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Daily Alerts
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                  Get daily updates on Mandi prices and weather directly on your device.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleRequestPermission}
                    className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Enable
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium transition-colors"
                  >
                    Later
                  </button>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status indicator in settings or profile if needed */}
      {permission === 'denied' && (
        <div className="fixed bottom-4 left-4 text-[10px] text-zinc-400 flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
          <BellOff className="w-3 h-3" />
          <span>Notifications Blocked</span>
        </div>
      )}
    </>
  );
};

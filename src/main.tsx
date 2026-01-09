
// Force hard refresh - Cache break 2025 v9-FULLPURGE
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Aggressive cache cleanup + SW registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const hadController = !!navigator.serviceWorker.controller;
      
      // Unregister all existing SWs
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));

      // Purge all cache storage
      const cacheKeys = await caches.keys();
      await Promise.all(cacheKeys.map((k) => caches.delete(k)));

      // One-time hard reload if we were controlled by old SW
      if (hadController && !sessionStorage.getItem('sw_cleaned')) {
        sessionStorage.setItem('sw_cleaned', '1');
        location.reload();
        return;
      }

      // Register fresh SW with no caching
      const registration = await navigator.serviceWorker.register('/sw.js', {
        updateViaCache: 'none',
      });
      await registration.update();
      console.log('SW registered (fresh): ', registration);
    } catch (err) {
      console.log('SW setup failed: ', err);
    }
  });
}

// Cleanup handlers
const cleanupHandlers = new Set<() => void>();

window.addEventListener('beforeunload', () => {
  cleanupHandlers.forEach(cleanup => cleanup());
  cleanupHandlers.clear();
});

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

const appRoot = createRoot(root);

try {
  appRoot.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} catch (error) {
  console.error('Render error:', error);
}

window.cleanupHandlers = cleanupHandlers;

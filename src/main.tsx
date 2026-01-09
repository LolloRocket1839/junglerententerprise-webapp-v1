
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Determine if we're in production (custom domain, not preview/dev)
const isProduction = !import.meta.env.DEV && 
  !window.location.hostname.includes('lovableproject.com') &&
  !window.location.hostname.includes('localhost') &&
  !window.location.hostname.includes('127.0.0.1');

// Service Worker: only register in production, cleanup in dev/preview
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      if (isProduction) {
        // Production: register SW for offline/performance
        const registration = await navigator.serviceWorker.register('/sw.js', {
          updateViaCache: 'none',
        });
        await registration.update();
        console.log('SW registered (production): ', registration);
      } else {
        // Dev/Preview: unregister all SWs and clear caches
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
        
        const cacheKeys = await caches.keys();
        await Promise.all(cacheKeys.map((k) => caches.delete(k)));
        
        if (regs.length > 0 || cacheKeys.length > 0) {
          console.log('SW/cache cleaned (dev/preview mode)');
        }
      }
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

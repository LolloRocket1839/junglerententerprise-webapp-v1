
// Force hard refresh - Cache break 2025 v8-CLEARCACHE
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Register service worker for PWA (disabled aggressive caching to avoid stale bundles)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // Unregister any existing SW to prevent stale cached JS causing runtime mismatches
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));

      const registration = await navigator.serviceWorker.register('/sw.js', {
        updateViaCache: 'none',
      });
      await registration.update();
      console.log('SW registered (fresh): ', registration);
    } catch (registrationError) {
      console.log('SW registration failed: ', registrationError);
    }
  });
}

// Assicurati che tutti gli handlers vengano puliti correttamente
const cleanupHandlers = new Set<() => void>();

window.addEventListener('beforeunload', () => {
  cleanupHandlers.forEach(cleanup => cleanup());
  cleanupHandlers.clear();
});

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

const appRoot = createRoot(root);

// Gestisci il cleanup quando l'app viene smontata
try {
  appRoot.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} catch (error) {
  console.error('Errore durante il rendering:', error);
}

// Esporta cleanupHandlers per uso globale
window.cleanupHandlers = cleanupHandlers;


// NUCLEAR CACHE RESET - COMPLETELY NEW STRUCTURE 2025.8
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
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
  appRoot.render(<App />);
} catch (error) {
  console.error('Errore durante il rendering:', error);
}

// Esporta cleanupHandlers per uso globale
window.cleanupHandlers = cleanupHandlers;

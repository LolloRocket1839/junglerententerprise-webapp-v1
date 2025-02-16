
/// <reference types="vite/client" />

declare global {
  interface Window {
    cleanupHandlers: Set<() => void>;
  }
}

export {};

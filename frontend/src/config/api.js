export const API_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.MODE === 'production' 
    ? '/api'  // Vercel'de aynı domain üzerinden
    : 'http://localhost:5000'
);

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Sahibinden Clone'; 
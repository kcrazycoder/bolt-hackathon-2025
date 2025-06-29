export const TAVUS_API_KEY = import.meta.env.VITE_APP_TAVUS_API_KEY;

// Validate API key exists
if (!TAVUS_API_KEY) {
  console.error('VITE_APP_TAVUS_API_KEY is not configured. Please add your Tavus API key to the .env file.');
}
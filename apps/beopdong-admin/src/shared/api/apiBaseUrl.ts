const beopdongApiBaseUrl = import.meta.env.VITE_BEOPDONG_API_BASE_URL?.trim();

if (!beopdongApiBaseUrl) {
  throw new Error('VITE_BEOPDONG_API_BASE_URL is required for the Beopdong admin API.');
}

export const apiBaseUrl = beopdongApiBaseUrl;

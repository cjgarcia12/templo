const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

if (!API_KEY) {
  console.warn('⚠️ NEXT_PUBLIC_API_KEY not set. API requests may fail.');
}

/**
 * Create headers with API key for authenticated requests
 */
function createHeaders(additionalHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...additionalHeaders
  };

  if (API_KEY) {
    headers['x-api-key'] = API_KEY;
  }

  return headers;
}

/**
 * Make an authenticated API request
 */
export async function apiRequest(
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const config: RequestInit = {
    ...options,
    headers: createHeaders(options.headers as Record<string, string> || {})
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * GET request helper
 */
export async function apiGet<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await apiRequest(endpoint, {
    method: 'GET',
    ...options
  });
  return response.json();
}

/**
 * POST request helper
 */
export async function apiPost<T = unknown>(endpoint: string, data?: unknown, options: RequestInit = {}): Promise<T> {
  const response = await apiRequest(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    ...options
  });
  return response.json();
}

/**
 * Make a public API request (without API key)
 */
export async function publicRequest(
  endpoint: string, 
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    }
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error(`Public API request failed for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Public POST request helper (no API key required)
 */
export async function publicPost<T = unknown>(endpoint: string, data?: unknown, options: RequestInit = {}): Promise<T> {
  const response = await publicRequest(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    ...options
  });
  return response.json();
}

/**
 * PUT request helper
 */
export async function apiPut<T = unknown>(endpoint: string, data?: unknown, options: RequestInit = {}): Promise<T> {
  const response = await apiRequest(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
    ...options
  });
  return response.json();
}

/**
 * DELETE request helper
 */
export async function apiDelete<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await apiRequest(endpoint, {
    method: 'DELETE',
    ...options
  });
  return response.json();
}

/**
 * Utility to check if API is configured properly
 */
export function isApiConfigured(): boolean {
  return Boolean(API_URL && API_KEY);
}

/**
 * Get API configuration
 */
export function getApiConfig() {
  return {
    url: API_URL,
    hasKey: Boolean(API_KEY),
    configured: isApiConfigured()
  };
} 
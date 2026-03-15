// Centralized API communication utility
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const UPLOADS_BASE = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5001/uploads';

/**
 * Make authenticated API request
 * @param {string} endpoint - API endpoint (e.g., '/foods')
 * @param {object} options - Fetch options
 * @param {boolean} auth - Whether to include auth token
 */
export const apiRequest = async (endpoint, options = {}, auth = true) => {
  const headers = { ...options.headers };

  // Add Content-Type for JSON requests
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Add JWT token if authenticated
  if (auth) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required: No token found. Please log in.');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (networkError) {
    throw new Error(`Network error: Unable to reach the server. ${networkError.message}`);
  }

  // Handle non-JSON responses safely
  const contentType = response.headers.get('Content-Type') || '';
  let data;
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Request failed (${response.status}): ${text || response.statusText}`);
    }
    return text;
  }

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
};

// ── Convenience methods ───────────────────────────────────────────────────
export const api = {
  get: (endpoint, auth = true) =>
    apiRequest(endpoint, { method: 'GET' }, auth),

  post: (endpoint, body, auth = true) =>
    apiRequest(endpoint, { method: 'POST', body: JSON.stringify(body) }, auth),

  put: (endpoint, body, auth = true) =>
    apiRequest(endpoint, { method: 'PUT', body: JSON.stringify(body) }, auth),

  delete: (endpoint, auth = true) =>
    apiRequest(endpoint, { method: 'DELETE' }, auth),

  upload: (endpoint, formData, auth = true) =>
    apiRequest(endpoint, { method: 'POST', body: formData }, auth),

  uploadPut: (endpoint, formData, auth = true) =>
    apiRequest(endpoint, { method: 'PUT', body: formData }, auth),
};

export const UPLOADS_URL = UPLOADS_BASE;
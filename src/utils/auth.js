// src/utils/auth.js
// Authentication helpers

/**
 * Save auth data to localStorage
 */
export const saveAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get current logged-in user
 */
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Get JWT token
 */
export const getToken = () => localStorage.getItem('token');

/**
 * Check if user is logged in
 */
export const isLoggedIn = () => !!getToken();

/**
 * Check if user is admin
 */
export const isAdmin = () => {
  const user = getUser();
  return user && user.role === 'admin';
};

/**
 * Logout - clear localStorage
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.hash = '#/login';
};

/**
 * Require auth - redirect to login if not authenticated
 */
export const requireAuth = () => {
  if (!isLoggedIn()) {
    window.location.hash = '#/login';
    return false;
  }
  return true;
};

/**
 * Require admin - redirect if not admin
 */
export const requireAdmin = () => {
  if (!isLoggedIn() || !isAdmin()) {
    window.location.hash = '#/login';
    return false;
  }
  return true;
};

// src/utils/toast.js
// Simple toast notification system

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {'success'|'error'|'info'} type - Toast type
 */
export const showToast = (message, type = 'info') => {
  // Remove existing toasts
  const existing = document.querySelectorAll('.toast');
  existing.forEach((t) => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div style="display:flex; align-items:center; gap:10px;">
      <span style="font-size:18px;">${
        type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'
      }</span>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 3000);
};

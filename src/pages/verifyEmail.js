// src/pages/verifyEmail.js
// Handle email verification token

import { api } from '../utils/api.js';

export const renderVerifyEmail = async () => {
  const page = document.createElement('div');
  page.className = 'page-enter';
  page.style.cssText = 'min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; background:#060606;';

  // Get token from URL hash params
  const hash = window.location.hash;
  const tokenMatch = hash.match(/[?&]token=([^&]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  if (!token) {
    page.innerHTML = `
      <div style="text-align:center; max-width:400px;">
        <div style="font-size:56px; margin-bottom:24px;">❌</div>
        <h2 class="font-luxury" style="font-size:24px; color:#f5f5f5; font-weight:400; margin-bottom:16px;">Invalid Link</h2>
        <p style="color:#888; margin-bottom:24px;">This verification link is invalid or expired.</p>
        <a href="#/register" class="btn-gold">Register Again</a>
      </div>
    `;
    return page;
  }

  // Show loading
  page.innerHTML = `
    <div style="text-align:center; max-width:400px;">
      <div class="spinner" style="margin:0 auto 24px;"></div>
      <p style="color:#888;">Verifying your email...</p>
    </div>
  `;

  try {
    await api.get(`/auth/verify-email?token=${token}`, false);
    page.innerHTML = `
      <div style="text-align:center; max-width:440px;">
        <div style="font-size:56px; margin-bottom:24px;">✉️</div>
        <h2 class="font-luxury" style="font-size:28px; color:#f5f5f5; font-weight:400; margin-bottom:16px;">Email Verified!</h2>
        <div class="gold-divider" style="margin:0 auto 24px;"></div>
        <p style="color:#888; font-size:14px; line-height:1.7; margin-bottom:32px;">
          Your email has been verified successfully. Welcome to Basq By Breve — your exclusive dining journey begins now.
        </p>
        <a href="#/login" class="btn-gold">Sign In Now</a>
      </div>
    `;
  } catch (err) {
    page.innerHTML = `
      <div style="text-align:center; max-width:440px;">
        <div style="font-size:56px; margin-bottom:24px;">⚠️</div>
        <h2 class="font-luxury" style="font-size:24px; color:#f5f5f5; font-weight:400; margin-bottom:16px;">Verification Failed</h2>
        <p style="color:#888; margin-bottom:24px;">${err.message || 'This link may have expired. Please register again.'}</p>
        <a href="#/register" class="btn-gold">Register Again</a>
      </div>
    `;
  }

  return page;
};

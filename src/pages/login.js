// src/pages/login.js
// Login page

import { api } from '../utils/api.js';
import { saveAuth, isLoggedIn } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';

export const renderLogin = () => {
  if (isLoggedIn()) {
    window.location.hash = '#/';
    return document.createElement('div');
  }

  const page = document.createElement('div');
  page.className = 'page-enter';
  page.style.cssText = 'min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; background:#060606;';

  page.innerHTML = `
    <div style="width:100%; max-width:440px;">
      <!-- Brand -->
      <div style="text-align:center; margin-bottom:40px;">
        <a href="#/" style="text-decoration:none;">
          <div class="font-luxury text-gold" style="font-size:28px; letter-spacing:3px; font-style:italic;">Basq By Breve</div>
          <div style="font-size:9px; letter-spacing:4px; color:#555; text-transform:uppercase; margin-top:4px;">Fine Dining</div>
        </a>
      </div>

      <!-- Form Card -->
      <div class="card-luxury" style="padding:40px;">
        <h2 class="font-luxury" style="font-size:26px; color:#f5f5f5; font-weight:400; margin-bottom:8px;">Welcome Back</h2>
        <p style="color:#666; font-size:13px; margin-bottom:32px;">Sign in to your account to continue</p>

        <div id="login-error" style="display:none; background:rgba(244,67,54,0.1); border:1px solid rgba(244,67,54,0.3); padding:12px 16px; font-size:13px; color:#f44336; margin-bottom:24px;"></div>

        <form id="login-form" style="display:flex; flex-direction:column; gap:20px;" autocomplete="off">
          <div>
            <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Email</label>
            <input type="email" id="email" class="input-luxury" placeholder="your@email.com" required />
          </div>
          <div>
            <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Password</label>
            <input type="password" id="password" class="input-luxury" placeholder="••••••••" required />
          </div>

          <button type="submit" id="login-btn" class="btn-gold" style="width:100%; padding:14px; margin-top:8px;">
            Sign In
          </button>
        </form>

        <div style="text-align:center; margin-top:24px; padding-top:24px; border-top:1px solid #1e1e1e;">
          <p style="font-size:13px; color:#666;">Don't have an account?
            <a href="#/register" style="color:#c9a84c; text-decoration:none; font-weight:600;"> Register</a>
          </p>
        </div>
      </div>
    </div>
  `;

  // Form submission
  const form = page.querySelector('#login-form');
  const errorDiv = page.querySelector('#login-error');
  const loginBtn = page.querySelector('#login-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const email = page.querySelector('#email').value.trim();
    const password = page.querySelector('#password').value;

    if (!email || !password) {
      errorDiv.textContent = 'Please fill in all fields';
      errorDiv.style.display = 'block';
      return;
    }

    loginBtn.textContent = 'Signing In...';
    loginBtn.disabled = true;

    try {
      const data = await api.post('/auth/login', { email, password }, false);
      saveAuth(data.token, data.user);
      showToast(`Welcome back, ${data.user.name}! 🍽️`, 'success');
      setTimeout(() => {
        window.location.hash = data.user.role === 'admin' ? '#/admin' : '#/';
        window.location.reload(); // Refresh to update navbar
      }, 500);
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
      loginBtn.textContent = 'Sign In';
      loginBtn.disabled = false;
    }
  });

  return page;
};

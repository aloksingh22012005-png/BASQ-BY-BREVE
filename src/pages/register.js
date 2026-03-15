// src/pages/register.js
// Registration page with email verification info

import { api } from '../utils/api.js';
import { isLoggedIn } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';

export const renderRegister = () => {
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
      <div class="card-luxury" style="padding:40px;" id="register-form-card">
        <h2 class="font-luxury" style="font-size:26px; color:#f5f5f5; font-weight:400; margin-bottom:8px;">Create Account</h2>
        <p style="color:#666; font-size:13px; margin-bottom:32px;">Join our exclusive dining community</p>

        <div id="register-error" style="display:none; background:rgba(244,67,54,0.1); border:1px solid rgba(244,67,54,0.3); padding:12px 16px; font-size:13px; color:#f44336; margin-bottom:24px;"></div>

        <form id="register-form" style="display:flex; flex-direction:column; gap:20px;">
          <div>
            <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Full Name</label>
            <input type="text" id="name" class="input-luxury" placeholder="Your Name" required />
          </div>
          <div>
            <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Email</label>
            <input type="email" id="email" class="input-luxury" placeholder="your@email.com" required />
          </div>
          <div>
            <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Password</label>
            <input type="password" id="password" class="input-luxury" placeholder="Min 6 characters" required minlength="6" />
          </div>
          <div>
            <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Confirm Password</label>
            <input type="password" id="confirm-password" class="input-luxury" placeholder="••••••••" required />
          </div>

          <button type="submit" id="register-btn" class="btn-gold" style="width:100%; padding:14px; margin-top:8px;">
            Create Account
          </button>
        </form>

        <div style="text-align:center; margin-top:24px; padding-top:24px; border-top:1px solid #1e1e1e;">
          <p style="font-size:13px; color:#666;">Already have an account?
            <a href="#/login" style="color:#c9a84c; text-decoration:none; font-weight:600;"> Sign In</a>
          </p>
        </div>
      </div>

      <!-- Success message (hidden) -->
      <div id="register-success" style="display:none;" class="card-luxury" style="padding:40px;">
        <div style="text-align:center; padding:40px 24px;">
          <div style="font-size:56px; margin-bottom:24px;">✉️</div>
          <h3 class="font-luxury" style="font-size:24px; color:#f5f5f5; font-weight:400; margin-bottom:16px;">Check Your Email</h3>
          <p style="color:#888; font-size:14px; line-height:1.7; margin-bottom:24px;">
            We've sent a verification link to your email. Please click the link to activate your account before signing in.
          </p>
          <a href="#/login" class="btn-gold">Go to Login</a>
        </div>
      </div>
    </div>
  `;

  const form = page.querySelector('#register-form');
  const errorDiv = page.querySelector('#register-error');
  const registerBtn = page.querySelector('#register-btn');
  const formCard = page.querySelector('#register-form-card');
  const successDiv = page.querySelector('#register-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const name = page.querySelector('#name').value.trim();
    const email = page.querySelector('#email').value.trim();
    const password = page.querySelector('#password').value;
    const confirmPassword = page.querySelector('#confirm-password').value;

    if (!name || !email || !password) {
      errorDiv.textContent = 'Please fill in all fields';
      errorDiv.style.display = 'block';
      return;
    }

    if (password !== confirmPassword) {
      errorDiv.textContent = 'Passwords do not match';
      errorDiv.style.display = 'block';
      return;
    }

    if (password.length < 6) {
      errorDiv.textContent = 'Password must be at least 6 characters';
      errorDiv.style.display = 'block';
      return;
    }

    registerBtn.textContent = 'Creating Account...';
    registerBtn.disabled = true;

    try {
      await api.post('/auth/register', { name, email, password }, false);
      formCard.style.display = 'none';
      successDiv.style.display = 'block';
      successDiv.classList.add('card-luxury');
      successDiv.style.padding = '40px';
      showToast('Account created! Check your email.', 'success');
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
      registerBtn.textContent = 'Create Account';
      registerBtn.disabled = false;
    }
  });

  return page;
};

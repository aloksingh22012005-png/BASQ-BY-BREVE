import { isLoggedIn, isAdmin, logout, getUser } from '../utils/auth.js';
import { getCartCount } from '../utils/cart.js';

export const renderNavbar = () => {
  const loggedIn = isLoggedIn();
  const admin = isAdmin();
  const user = getUser();
  const cartCount = getCartCount();

  const navbar = document.createElement('nav');
  navbar.id = 'navbar';
  navbar.className = 'py-5 px-6 md:px-12 bg-transparent';
  navbar.innerHTML = `
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <a href="#/" class="nav-logo" style="text-decoration:none;">
        <div class="font-luxury text-gold" style="font-size:22px; letter-spacing:3px; font-style:italic;">Basq By Breve</div>
        <div style="font-size:9px; letter-spacing:4px; color:#666; text-transform:uppercase; margin-top:2px;">Fine Dining</div>
      </a>

      <!-- Desktop Nav Links -->
      <div class="hidden md:flex items-center gap-8" id="nav-links">
        <a href="#/" class="nav-link" style="font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#ccc; text-decoration:none; transition: color 0.3s;">Home</a>
        <a href="#/banner" class="nav-link" style="font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#c9a84c; text-decoration:none; transition: color 0.3s;">Banner</a>
        <a href="#/menu" class="nav-link" style="font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#ccc; text-decoration:none; transition: color 0.3s;">Menu</a>
        <a href="#/reservation" class="nav-link" style="font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#ccc; text-decoration:none; transition: color 0.3s;">Reserve</a>
        ${admin ? `<a href="#/admin" class="nav-link" style="font-size:12px; letter-spacing:2px; text-transform:uppercase; color:#c9a84c; text-decoration:none;">Admin</a>` : ''}
      </div>

      <!-- Right side: Cart + Auth -->
      <div class="flex items-center gap-4">
        <!-- Cart -->
        <a href="#/cart" style="position:relative; color:#ccc; text-decoration:none; transition: color 0.3s;" class="cart-icon" title="Cart">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          ${cartCount > 0 ? `<span id="cart-count" style="position:absolute;top:-8px;right:-8px;background:#c9a84c;color:#000;border-radius:50%;width:18px;height:18px;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;">${cartCount}</span>` : `<span id="cart-count" style="position:absolute;top:-8px;right:-8px;background:#c9a84c;color:#000;border-radius:50%;width:18px;height:18px;font-size:11px;font-weight:700;display:${cartCount > 0 ? 'flex' : 'none'};align-items:center;justify-content:center;">${cartCount}</span>`}
        </a>

        <!-- Auth Buttons -->
        ${loggedIn
          ? `<div class="flex items-center gap-3">
               <span style="font-size:12px; color:#888; display:none; md:display:block;">${user?.name?.split(' ')[0]}</span>
               <button id="logout-btn" style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#c9a84c; background:transparent; border:1px solid rgba(201,168,76,0.4); padding:8px 16px; cursor:pointer; transition: all 0.3s;">Logout</button>
             </div>`
          : `<a href="#/login" style="font-size:11px; letter-spacing:2px; text-transform:uppercase; background:#c9a84c; color:#000; padding:9px 20px; text-decoration:none; font-weight:700; transition: all 0.3s;">Login</a>`
        }

        <!-- Mobile Menu Toggle -->
        <button id="mobile-menu-btn" class="md:hidden" style="color:#ccc; background:none; border:none; cursor:pointer;">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div id="mobile-menu" style="display:none; padding:20px 24px; border-top:1px solid #1e1e1e; margin-top:12px; background:#0a0a0a;">
      <div style="display:flex; flex-direction:column; gap:16px;">
        <a href="#/" class="nav-link" style="font-size:13px; letter-spacing:2px; text-transform:uppercase; color:#ccc; text-decoration:none;">Home</a>
        <a href="#/banner" class="nav-link" style="font-size:13px; letter-spacing:2px; text-transform:uppercase; color:#c9a84c; text-decoration:none;">Banner</a>
        <a href="#/menu" class="nav-link" style="font-size:13px; letter-spacing:2px; text-transform:uppercase; color:#ccc; text-decoration:none;">Menu</a>
        <a href="#/reservation" class="nav-link" style="font-size:13px; letter-spacing:2px; text-transform:uppercase; color:#ccc; text-decoration:none;">Reserve</a>
        ${admin ? `<a href="#/admin" class="nav-link" style="font-size:13px; letter-spacing:2px; text-transform:uppercase; color:#c9a84c; text-decoration:none;">Admin</a>` : ''}
      </div>
    </div>
  `;

  return navbar;
};

export const initNavbarEvents = () => {
  // Scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Logout button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.style.display = mobileMenu.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Hover effects on nav links
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('mouseenter', () => (link.style.color = '#c9a84c'));
    link.addEventListener('mouseleave', () => {
      if (!link.style.color.includes('#c9a84c') || link.href.includes('admin')) return;
      link.style.color = '#ccc';
    });
  });

  // Update cart count on cart update event
  window.addEventListener('cartUpdated', updateCartBadge);
};

export const updateCartBadge = () => {
  const count = getCartCount();
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
};
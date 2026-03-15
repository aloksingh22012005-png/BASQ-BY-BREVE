import './style.css';
import { renderNavbar, initNavbarEvents } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderHome } from './pages/home.js';
import { renderMenu } from './pages/menu.js';
import { renderCart } from './pages/cart.js';
import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';
import { renderReservation } from './pages/reservation.js';
import { renderPayment } from './pages/payment.js';
import { renderAdmin } from './pages/admin.js';
import { renderVerifyEmail } from './pages/verifyEmail.js';
import { renderBanner } from './pages/banner.js';

// ── App Layout ─────────────────────────────────────────────────────────────
const app = document.getElementById('app');

// Pages that should not show the footer
const noFooterPages = ['/login', '/register', '/payment'];

// Pages where the hero is full-screen (no extra top padding on body)
const fullScreenPages = ['/', '/login', '/register'];

// ── Router ─────────────────────────────────────────────────────────────────
const routes = {
  '/': renderHome,
  '/banner': renderBanner,
  '/menu': renderMenu,
  '/cart': renderCart,
  '/login': renderLogin,
  '/register': renderRegister,
  '/reservation': renderReservation,
  '/payment': renderPayment,
  '/admin': renderAdmin,
  '/verify-email': renderVerifyEmail,
};

// ── Render Layout ──────────────────────────────────────────────────────────
const renderLayout = async () => {
  // Get current route from hash
  let hash = window.location.hash.replace('#', '').split('?')[0] || '/';
  if (hash === '') hash = '/';

  // Clear app
  app.innerHTML = '';

  // Render navbar
  const navbar = renderNavbar();
  app.appendChild(navbar);

  // Get page renderer
  const renderer = routes[hash];

  // Main content wrapper
  const main = document.createElement('main');
  main.id = 'main-content';
  main.style.minHeight = '80vh';

  if (renderer) {
    try {
      const page = await renderer();
      if (page) main.appendChild(page);
    } catch (err) {
      console.error('Page render error:', err);
      main.innerHTML = `
        <div style="text-align:center; padding:120px 24px; min-height:60vh;">
          <h2 class="font-luxury" style="font-size:32px; color:#555; font-weight:400; margin-bottom:16px;">Something went wrong</h2>
          <p style="color:#444; margin-bottom:32px;">${err.message}</p>
          <a href="#/" class="btn-gold">Return Home</a>
        </div>
      `;
    }
  } else {
    // 404 page
    main.innerHTML = `
      <div style="text-align:center; padding:140px 24px; min-height:70vh;">
        <div class="font-luxury text-gold" style="font-size:100px; font-weight:400; line-height:1;">404</div>
        <div class="gold-divider"></div>
        <h2 class="font-luxury" style="font-size:28px; color:#f5f5f5; font-weight:400; margin:24px 0 16px;">Page Not Found</h2>
        <p style="color:#666; margin-bottom:32px;">The page you're looking for doesn't exist.</p>
        <a href="#/" class="btn-gold">Return Home</a>
      </div>
    `;
  }

  app.appendChild(main);

  // Render footer (except on certain pages)
  if (!noFooterPages.includes(hash)) {
    const footer = renderFooter();
    app.appendChild(footer);
  }

  // Initialize navbar events (after DOM is ready)
  initNavbarEvents();

  // Scroll to top on route change
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ── Listen to hash changes ─────────────────────────────────────────────────
window.addEventListener('hashchange', renderLayout);

// ── Initial render ─────────────────────────────────────────────────────────
renderLayout();
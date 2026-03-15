// src/pages/home.js
// Home page with Hero, About, Featured Foods

import { api, UPLOADS_URL } from '../utils/api.js';
import { addToCart } from '../utils/cart.js';
import { showToast } from '../utils/toast.js';

export const renderHome = async () => {
  const page = document.createElement('div');
  page.className = 'page-enter';

  // ── Hero Section ──────────────────────────────────────────────────────
  const hero = document.createElement('section');
  hero.style.cssText = `
    min-height: 100vh;
    background: linear-gradient(to bottom right, #0a0a0a, #0f0a00);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 120px 24px 80px;
    text-align: center;
  `;
  hero.innerHTML = `
    <!-- Background decorative elements -->
    <div style="position:absolute; inset:0; overflow:hidden; pointer-events:none;">
      <div style="position:absolute; top:20%; left:10%; width:300px; height:300px; background:radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%); border-radius:50%;"></div>
      <div style="position:absolute; bottom:20%; right:10%; width:400px; height:400px; background:radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%); border-radius:50%;"></div>
    </div>

    <div style="max-width:800px; position:relative; z-index:1;">
      <div style="font-size:10px; letter-spacing:5px; color:#c9a84c; text-transform:uppercase; margin-bottom:24px;">— Welcome to —</div>
      <h1 class="font-luxury" style="font-size:clamp(48px,8vw,88px); color:#f5f5f5; font-weight:400; line-height:1.1; margin-bottom:24px;">
        Basq <span style="color:#c9a84c; font-style:italic;">By</span> Breve
      </h1>
      <div class="gold-divider" style="margin:0 auto 32px;"></div>
      <p style="font-size:16px; color:#999; letter-spacing:1px; line-height:1.8; max-width:520px; margin:0 auto 48px;">
        An exclusive culinary experience where the finest ingredients meet timeless artistry. Reserve your table and discover extraordinary dining.
      </p>
      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
        <a href="#/menu" class="btn-gold">Explore Menu</a>
        <a href="#/reservation" class="btn-outline-gold">Reserve a Table</a>
      </div>
    </div>
  `;

  // ── Stats Banner ──────────────────────────────────────────────────────
  const stats = document.createElement('section');
  stats.style.cssText = 'background:#0f0f0f; border-top:1px solid #1a1a1a; border-bottom:1px solid #1a1a1a; padding:48px 24px;';
  stats.innerHTML = `
    <div style="max-width:1000px; margin:0 auto; display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:32px; text-align:center;">
      ${[
        ['15+', 'Years of Excellence'],
        ['200+', 'Signature Dishes'],
        ['50K+', 'Happy Guests'],
        ['12', 'Awards Won'],
      ].map(([num, label]) => `
        <div>
          <div class="font-luxury text-gold" style="font-size:40px; font-weight:400;">${num}</div>
          <div style="font-size:11px; letter-spacing:2px; color:#666; text-transform:uppercase; margin-top:8px;">${label}</div>
        </div>
      `).join('')}
    </div>
  `;

  // ── About Section ─────────────────────────────────────────────────────
  const about = document.createElement('section');
  about.style.cssText = 'padding:100px 24px; background:#0a0a0a;';
  about.innerHTML = `
    <div style="max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;">
      <!-- Text side -->
      <div>
        <div style="font-size:10px; letter-spacing:4px; color:#c9a84c; text-transform:uppercase; margin-bottom:16px;">Our Story</div>
        <h2 class="font-luxury" style="font-size:clamp(32px,4vw,48px); color:#f5f5f5; font-weight:400; line-height:1.2; margin-bottom:24px;">
          Where Culinary Art Becomes an Experience
        </h2>
        <div class="gold-divider" style="margin:0 0 32px;"></div>
        <p style="color:#888; line-height:1.9; margin-bottom:20px; font-size:15px;">
          Founded on a philosophy of perfection, Basq By Breve has been crafting extraordinary dining experiences since 2008. Our team of world-class chefs blends classical techniques with contemporary innovation.
        </p>
        <p style="color:#888; line-height:1.9; margin-bottom:32px; font-size:15px;">
          Every ingredient is hand-selected. Every dish is crafted with intention. Every visit is an occasion to be remembered.
        </p>
        <a href="#/menu" class="btn-gold">View Our Menu</a>
      </div>

      <!-- Visual side -->
      <div style="position:relative;">
        <div style="background:#111; border:1px solid #1e1e1e; padding:40px; position:relative;">
          <div style="font-size:80px; text-align:center; margin-bottom:24px;">🍽️</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            ${['Farm to Table', 'Chef\'s Table', 'Wine Pairing', 'Private Events'].map(item => `
              <div style="background:#0f0f0f; border:1px solid #1e1e1e; padding:16px; text-align:center;">
                <div style="font-size:10px; letter-spacing:2px; color:#c9a84c; text-transform:uppercase;">${item}</div>
              </div>
            `).join('')}
          </div>
          <!-- Decorative corner -->
          <div style="position:absolute; top:-1px; right:-1px; width:40px; height:40px; border-top:2px solid #c9a84c; border-right:2px solid #c9a84c;"></div>
          <div style="position:absolute; bottom:-1px; left:-1px; width:40px; height:40px; border-bottom:2px solid #c9a84c; border-left:2px solid #c9a84c;"></div>
        </div>
      </div>
    </div>
  `;

  // ── Featured Foods ─────────────────────────────────────────────────────
  const featuredSection = document.createElement('section');
  featuredSection.style.cssText = 'padding:100px 24px; background:#060606;';
  featuredSection.innerHTML = `
    <div style="max-width:1200px; margin:0 auto;">
      <div style="text-align:center; margin-bottom:64px;">
        <div style="font-size:10px; letter-spacing:4px; color:#c9a84c; text-transform:uppercase; margin-bottom:16px;">Culinary Highlights</div>
        <h2 class="font-luxury" style="font-size:clamp(32px,4vw,48px); color:#f5f5f5; font-weight:400;">Featured Selections</h2>
        <div class="gold-divider"></div>
      </div>
      <div id="featured-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:24px;">
        <!-- Loaded dynamically -->
        <div style="text-align:center; padding:40px; color:#555; grid-column:1/-1;">
          <div class="spinner" style="margin:0 auto 16px;"></div>
          <div>Loading featured dishes...</div>
        </div>
      </div>
      <div style="text-align:center; margin-top:48px;">
        <a href="#/menu" class="btn-outline-gold">View Full Menu</a>
      </div>
    </div>
  `;

  // ── Reservation CTA ────────────────────────────────────────────────────
  const ctaSection = document.createElement('section');
  ctaSection.style.cssText = `
    padding: 100px 24px;
    background: linear-gradient(135deg, #0f0b00, #0a0a0a);
    text-align: center;
    border-top: 1px solid #1a1a1a;
    border-bottom: 1px solid #1a1a1a;
    position: relative;
    overflow: hidden;
  `;
  ctaSection.innerHTML = `
    <div style="position:absolute; inset:0; background:radial-gradient(circle at 50% 50%, rgba(201,168,76,0.04), transparent 70%); pointer-events:none;"></div>
    <div style="max-width:700px; margin:0 auto; position:relative;">
      <div style="font-size:10px; letter-spacing:4px; color:#c9a84c; text-transform:uppercase; margin-bottom:16px;">Exclusive Dining</div>
      <h2 class="font-luxury" style="font-size:clamp(32px,4vw,48px); color:#f5f5f5; font-weight:400; margin-bottom:16px;">Reserve Your Table Tonight</h2>
      <div class="gold-divider"></div>
      <p style="color:#888; font-size:15px; line-height:1.8; margin:24px auto 40px; max-width:500px;">
        Join us for an unforgettable evening. Our tables fill quickly — book in advance to secure your preferred date and time.
      </p>
      <a href="#/reservation" class="btn-gold">Make a Reservation</a>
    </div>
  `;

  page.appendChild(hero);
  page.appendChild(stats);
  page.appendChild(about);
  page.appendChild(featuredSection);
  page.appendChild(ctaSection);

  // Load featured foods asynchronously
  setTimeout(async () => {
    try {
      const foods = await api.get('/foods?featured=true', false);
      const grid = document.getElementById('featured-grid');
      if (!grid) return;

      if (foods.length === 0) {
        grid.innerHTML = `<div style="text-align:center; color:#555; padding:40px; grid-column:1/-1;">No featured dishes available</div>`;
        return;
      }

      grid.innerHTML = foods.slice(0, 6).map(food => `
        <div class="card-luxury" style="overflow:hidden; cursor:pointer;" data-id="${food._id}">
          <div style="height:220px; overflow:hidden; background:#0f0f0f; position:relative;">
            <img src="${UPLOADS_URL}/${food.image}" alt="${food.name}"
              style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease;"
              onerror="this.src=''; this.parentElement.innerHTML='<div style=&quot;height:100%; display:flex; align-items:center; justify-content:center; font-size:60px;&quot;>🍽️</div>'"
              onmouseover="this.style.transform='scale(1.05)'"
              onmouseout="this.style.transform='scale(1)'"
            />
            <div style="position:absolute; top:12px; right:12px; background:rgba(0,0,0,0.8); border:1px solid rgba(201,168,76,0.4); padding:4px 10px; font-size:10px; letter-spacing:1px; color:#c9a84c; text-transform:uppercase;">${food.category}</div>
          </div>
          <div style="padding:24px;">
            <h3 class="font-luxury" style="font-size:20px; color:#f5f5f5; margin-bottom:8px;">${food.name}</h3>
            <p style="color:#666; font-size:13px; line-height:1.6; margin-bottom:20px; min-height:40px;">${food.description.substring(0, 80)}${food.description.length > 80 ? '...' : ''}</p>
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <span class="font-luxury text-gold" style="font-size:22px;">$${food.price.toFixed(2)}</span>
              <button class="btn-gold add-to-cart-btn" data-food='${JSON.stringify({_id: food._id, name: food.name, price: food.price, image: food.image})}' style="padding:8px 18px; font-size:11px;">Add to Cart</button>
            </div>
          </div>
        </div>
      `).join('');

      // Attach add to cart listeners
      grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const food = JSON.parse(btn.dataset.food);
          addToCart(food);
          showToast(`${food.name} added to cart`, 'success');
        });
      });
    } catch (err) {
      const grid = document.getElementById('featured-grid');
      if (grid) grid.innerHTML = `<div style="text-align:center; color:#555; padding:40px; grid-column:1/-1;">Could not load featured items</div>`;
    }
  }, 0);

  return page;
};

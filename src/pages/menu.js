// src/pages/menu.js
// Full menu page with category filter

import { api, UPLOADS_URL } from '../utils/api.js';
import { addToCart } from '../utils/cart.js';
import { showToast } from '../utils/toast.js';

const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks', 'Specials'];

export const renderMenu = async () => {
  const page = document.createElement('div');
  page.className = 'page-enter';
  page.style.paddingTop = '100px';

  // Page header
  const header = document.createElement('div');
  header.style.cssText = 'text-align:center; padding:60px 24px 48px; background:#060606; border-bottom:1px solid #1a1a1a;';
  header.innerHTML = `
    <div style="font-size:10px; letter-spacing:4px; color:#c9a84c; text-transform:uppercase; margin-bottom:16px;">Culinary Collection</div>
    <h1 class="font-luxury" style="font-size:clamp(36px,5vw,56px); color:#f5f5f5; font-weight:400;">Our Menu</h1>
    <div class="gold-divider"></div>
    <p style="color:#777; font-size:14px; letter-spacing:1px; margin-top:16px;">Each dish crafted with precision and passion</p>
  `;

  // Category filters
  const filterBar = document.createElement('div');
  filterBar.style.cssText = 'background:#0a0a0a; padding:32px 24px; border-bottom:1px solid #1a1a1a; position:sticky; top:70px; z-index:50;';
  filterBar.innerHTML = `
    <div style="max-width:1200px; margin:0 auto; display:flex; gap:8px; flex-wrap:wrap; justify-content:center;" id="category-filters">
      ${CATEGORIES.map((cat, i) => `
        <button class="category-btn" data-category="${cat}"
          style="padding:8px 20px; font-size:11px; letter-spacing:2px; text-transform:uppercase; cursor:pointer; transition:all 0.3s;
                 ${i === 0
                   ? 'background:#c9a84c; color:#000; border:1px solid #c9a84c;'
                   : 'background:transparent; color:#888; border:1px solid #2a2a2a;'
                 }">
          ${cat}
        </button>
      `).join('')}
    </div>
  `;

  // Food grid container
  const gridContainer = document.createElement('div');
  gridContainer.style.cssText = 'padding:60px 24px; min-height:60vh; background:#0a0a0a;';
  gridContainer.innerHTML = `
    <div style="max-width:1200px; margin:0 auto;">
      <div id="foods-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:24px;">
        <div style="text-align:center; padding:60px; color:#555; grid-column:1/-1;">
          <div class="spinner" style="margin:0 auto 16px;"></div>
          Loading menu...
        </div>
      </div>
    </div>
  `;

  page.appendChild(header);
  page.appendChild(filterBar);
  page.appendChild(gridContainer);

  let allFoods = [];

  // Load all foods
  setTimeout(async () => {
    try {
      allFoods = await api.get('/foods', false);
      renderFoods(allFoods);
    } catch (err) {
      document.getElementById('foods-grid').innerHTML = `
        <div style="text-align:center; color:#555; padding:60px; grid-column:1/-1;">
          Failed to load menu. Please try again.
        </div>`;
    }
  }, 0);

  // Category filter click handler
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.category-btn');
    if (!btn) return;

    // Update active state
    filterBar.querySelectorAll('.category-btn').forEach(b => {
      b.style.background = 'transparent';
      b.style.color = '#888';
      b.style.borderColor = '#2a2a2a';
    });
    btn.style.background = '#c9a84c';
    btn.style.color = '#000';
    btn.style.borderColor = '#c9a84c';

    const category = btn.dataset.category;
    const filtered = category === 'All' ? allFoods : allFoods.filter(f => f.category === category);
    renderFoods(filtered);
  });

  return page;
};

const renderFoods = (foods) => {
  const grid = document.getElementById('foods-grid');
  if (!grid) return;

  if (foods.length === 0) {
    grid.innerHTML = `<div style="text-align:center; color:#555; padding:60px; grid-column:1/-1;">No dishes in this category</div>`;
    return;
  }

  grid.innerHTML = foods.map(food => `
    <div class="card-luxury" style="overflow:hidden;">
      <!-- Image -->
      <div style="height:200px; overflow:hidden; background:#0f0f0f; position:relative;">
        <img src="${UPLOADS_URL}/${food.image}" alt="${food.name}"
          style="width:100%; height:100%; object-fit:cover; transition:transform 0.5s ease;"
          onerror="this.parentElement.innerHTML='<div style=&quot;height:100%;display:flex;align-items:center;justify-content:center;font-size:50px;&quot;>🍽️</div>'"
          onmouseover="this.style.transform='scale(1.08)'"
          onmouseout="this.style.transform='scale(1)'"
        />
        <div style="position:absolute; bottom:0; left:0; right:0; background:linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding:16px 12px 8px; display:flex; justify-content:space-between; align-items:flex-end;">
          <span style="font-size:10px; letter-spacing:1.5px; color:#c9a84c; text-transform:uppercase;">${food.category}</span>
          ${!food.isAvailable ? '<span style="font-size:10px; color:#f44336; background:rgba(244,67,54,0.15); padding:2px 8px; border:1px solid rgba(244,67,54,0.3);">Unavailable</span>' : ''}
        </div>
      </div>

      <!-- Content -->
      <div style="padding:20px;">
        <h3 class="font-luxury" style="font-size:19px; color:#f5f5f5; margin-bottom:6px;">${food.name}</h3>
        <p style="color:#666; font-size:13px; line-height:1.6; margin-bottom:16px; min-height:38px;">${food.description.substring(0, 90)}${food.description.length > 90 ? '...' : ''}</p>
        <div style="display:flex; align-items:center; justify-content:space-between;">
          <span class="font-luxury text-gold" style="font-size:20px;">₹${food.price.toFixed(2)}</span>
          <button class="add-to-cart-btn btn-gold"
            data-food='${JSON.stringify({_id: food._id, name: food.name, price: food.price, image: food.image})}'
            style="padding:8px 16px; font-size:10px; ${!food.isAvailable ? 'opacity:0.4; cursor:not-allowed;' : ''}"
            ${!food.isAvailable ? 'disabled' : ''}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Attach add to cart events
  grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const food = JSON.parse(btn.dataset.food);
      addToCart(food);
      showToast(`${food.name} added to cart! 🍽️`, 'success');
    });
  });
};
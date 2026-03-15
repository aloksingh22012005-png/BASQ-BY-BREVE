// src/pages/admin.js
// Admin dashboard with food, order, reservation management

import { api, UPLOADS_URL } from '../utils/api.js';
import { requireAdmin } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';

export const renderAdmin = async () => {
  if (!requireAdmin()) return document.createElement('div');

  const page = document.createElement('div');
  page.className = 'page-enter';
  page.style.paddingTop = '100px';

  page.innerHTML = `
    <!-- Header -->
    <div style="background:#060606; border-bottom:1px solid #1a1a1a; padding:40px 24px;">
      <div style="max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
        <div>
          <div style="font-size:10px; letter-spacing:4px; color:#c9a84c; text-transform:uppercase; margin-bottom:8px;">Management Console</div>
          <h1 class="font-luxury" style="font-size:clamp(28px,4vw,40px); color:#f5f5f5; font-weight:400;">Admin Dashboard</h1>
        </div>
        <div class="badge-gold">Administrator Access</div>
      </div>
    </div>

    <!-- Tabs -->
    <div style="background:#0a0a0a; border-bottom:1px solid #1a1a1a; position:sticky; top:70px; z-index:40;">
      <div style="max-width:1200px; margin:0 auto; padding:0 24px; display:flex; gap:0; overflow-x:auto;">
        ${['Foods', 'Add Food', 'Orders', 'Reservations'].map((tab, i) => `
          <button class="admin-tab" data-tab="${tab.toLowerCase().replace(' ', '-')}"
            style="padding:16px 24px; font-size:11px; letter-spacing:2px; text-transform:uppercase; background:transparent; border:none; cursor:pointer; white-space:nowrap; border-bottom:2px solid ${i === 0 ? '#c9a84c' : 'transparent'}; color:${i === 0 ? '#c9a84c' : '#666'}; transition:all 0.3s;">
            ${tab}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Tab Content -->
    <div style="max-width:1200px; margin:0 auto; padding:40px 24px;" id="admin-content">
      <div style="text-align:center; padding:40px; color:#555;">
        <div class="spinner" style="margin:0 auto 16px;"></div>
        Loading...
      </div>
    </div>
  `;

  // Tab switching
  page.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      page.querySelectorAll('.admin-tab').forEach(t => {
        t.style.borderBottomColor = 'transparent';
        t.style.color = '#666';
      });
      tab.style.borderBottomColor = '#c9a84c';
      tab.style.color = '#c9a84c';
      loadTab(tab.dataset.tab);
    });
  });

  // Load foods tab by default
  loadTab('foods');

  async function loadTab(tabName) {
    const content = document.getElementById('admin-content');
    if (!content) return;
    content.innerHTML = `<div style="text-align:center; padding:40px; color:#555;"><div class="spinner" style="margin:0 auto 16px;"></div>Loading...</div>`;

    switch (tabName) {
      case 'foods': await loadFoodsTab(content); break;
      case 'add-food': loadAddFoodTab(content); break;
      case 'orders': await loadOrdersTab(content); break;
      case 'reservations': await loadReservationsTab(content); break;
    }
  }

  // ── FOODS TAB ──────────────────────────────────────────────────────────
  async function loadFoodsTab(container) {
    try {
      const foods = await api.get('/foods');
      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h2 class="font-luxury" style="font-size:22px; color:#f5f5f5; font-weight:400;">Menu Items (${foods.length})</h2>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr style="border-bottom:2px solid #c9a84c;">
                ${['Image', 'Name', 'Category', 'Price', 'Status', 'Featured', 'Actions'].map(h =>
                  `<th style="padding:12px 16px; text-align:left; font-size:10px; letter-spacing:2px; color:#888; text-transform:uppercase; font-weight:400;">${h}</th>`
                ).join('')}
              </tr>
            </thead>
            <tbody>
              ${foods.map(food => `
                <tr style="border-bottom:1px solid #1a1a1a; transition:background 0.2s;" onmouseover="this.style.background='#0f0f0f'" onmouseout="this.style.background='transparent'">
                  <td style="padding:12px 16px;">
                    <div style="width:50px; height:50px; overflow:hidden; background:#111;">
                      <img src="${UPLOADS_URL}/${food.image}" alt="${food.name}" style="width:100%; height:100%; object-fit:cover;"
                        onerror="this.parentElement.innerHTML='<div style=&quot;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:20px;&quot;>🍽️</div>'"
                      />
                    </div>
                  </td>
                  <td style="padding:12px 16px; color:#f5f5f5; font-size:14px;">${food.name}</td>
                  <td style="padding:12px 16px;">
                    <span style="font-size:11px; letter-spacing:1px; background:rgba(201,168,76,0.1); color:#c9a84c; border:1px solid rgba(201,168,76,0.2); padding:3px 10px; text-transform:uppercase;">${food.category}</span>
                  </td>
                  <td style="padding:12px 16px; color:#c9a84c; font-family:Georgia,serif;">₹${food.price.toFixed(2)}</td>
                  <td style="padding:12px 16px;">
                    <span style="font-size:11px; padding:3px 10px; border:1px solid; ${food.isAvailable ? 'color:#4caf50; border-color:rgba(76,175,80,0.3); background:rgba(76,175,80,0.08);' : 'color:#f44336; border-color:rgba(244,67,54,0.3); background:rgba(244,67,54,0.08);'}">${food.isAvailable ? 'Available' : 'Unavailable'}</span>
                  </td>
                  <td style="padding:12px 16px; color:${food.isFeatured ? '#c9a84c' : '#555'}; font-size:13px;">${food.isFeatured ? '★ Yes' : '—'}</td>
                  <td style="padding:12px 16px;">
                    <div style="display:flex; gap:8px;">
                      <button class="edit-food-btn" data-id="${food._id}" style="font-size:11px; letter-spacing:1px; padding:6px 14px; background:transparent; border:1px solid #2a2a2a; color:#888; cursor:pointer; transition:all 0.3s;"
                        onmouseover="this.style.borderColor='#c9a84c'; this.style.color='#c9a84c'" onmouseout="this.style.borderColor='#2a2a2a'; this.style.color='#888'">Edit</button>
                      <button class="delete-food-btn" data-id="${food._id}" data-name="${food.name}" style="font-size:11px; letter-spacing:1px; padding:6px 14px; background:transparent; border:1px solid #2a2a2a; color:#888; cursor:pointer; transition:all 0.3s;"
                        onmouseover="this.style.borderColor='#f44336'; this.style.color='#f44336'" onmouseout="this.style.borderColor='#2a2a2a'; this.style.color='#888'">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          ${foods.length === 0 ? '<div style="text-align:center; padding:40px; color:#555;">No food items yet. Add some!</div>' : ''}
        </div>
      `;

      // Delete food
      container.querySelectorAll('.delete-food-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm(`Delete "${btn.dataset.name}"?`)) return;
          try {
            await api.delete(`/foods/${btn.dataset.id}`);
            showToast('Food item deleted', 'success');
            loadTab('foods');
          } catch (err) {
            showToast(err.message, 'error');
          }
        });
      });

      // Edit food (switch to edit mode)
      container.querySelectorAll('.edit-food-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          try {
            const food = await api.get(`/foods/${btn.dataset.id}`);
            loadEditFoodTab(container, food);
          } catch (err) {
            showToast(err.message, 'error');
          }
        });
      });

    } catch (err) {
      container.innerHTML = `<div style="text-align:center; padding:40px; color:#f44336;">Error loading foods: ${err.message}</div>`;
    }
  }

  // ── ADD FOOD TAB ───────────────────────────────────────────────────────
  function loadAddFoodTab(container, editFood = null) {
    const isEdit = !!editFood;
    container.innerHTML = `
      <div style="max-width:640px;">
        <h2 class="font-luxury" style="font-size:22px; color:#f5f5f5; font-weight:400; margin-bottom:24px;">${isEdit ? 'Edit' : 'Add New'} Food Item</h2>

        <div id="food-form-error" style="display:none; background:rgba(244,67,54,0.1); border:1px solid rgba(244,67,54,0.3); padding:12px 16px; font-size:13px; color:#f44336; margin-bottom:20px;"></div>

        <form id="food-form" style="display:flex; flex-direction:column; gap:20px;" enctype="multipart/form-data">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <div>
              <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Food Name *</label>
              <input type="text" id="food-name" class="input-luxury" placeholder="e.g. Truffle Risotto" value="${editFood?.name || ''}" required />
            </div>
            <div>
              <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Price (₹) *</label>
              <input type="number" id="food-price" class="input-luxury" placeholder="999.00" step="0.01" min="0" value="${editFood?.price || ''}" required />
            </div>
          </div>

          <div>
            <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Category *</label>
            <select id="food-category" class="input-luxury" required style="cursor:pointer;">
              ${['Starters', 'Mains', 'Desserts', 'Drinks', 'Specials'].map(cat =>
                `<option value="${cat}" style="background:#111;" ${editFood?.category === cat ? 'selected' : ''}>${cat}</option>`
              ).join('')}
            </select>
          </div>

          <div>
            <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Description *</label>
            <textarea id="food-description" class="input-luxury" rows="3" placeholder="Describe the dish..." style="resize:vertical;" required>${editFood?.description || ''}</textarea>
          </div>

          <!-- Image upload -->
          <div>
            <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Food Image ${isEdit ? '(leave empty to keep current)' : '*'}</label>
            <div id="image-drop-zone" style="border:2px dashed #2a2a2a; padding:32px; text-align:center; cursor:pointer; transition:border-color 0.3s; position:relative;"
              onmouseover="this.style.borderColor='#c9a84c'" onmouseout="this.style.borderColor='#2a2a2a'">
              <input type="file" id="food-image" accept="image/*" style="position:absolute; inset:0; opacity:0; cursor:pointer;" />
              <div id="image-preview" style="${editFood ? '' : 'display:none;'}">
                ${editFood ? `<img src="${UPLOADS_URL}/${editFood.image}" style="max-height:120px; object-fit:contain; display:block; margin:0 auto 8px;" />` : ''}
              </div>
              <div id="image-placeholder">
                <div style="font-size:32px; margin-bottom:8px;">📷</div>
                <div style="font-size:13px; color:#666;">Click to upload image</div>
                <div style="font-size:11px; color:#444; margin-top:4px;">Max 2MB • JPG, PNG, WebP</div>
              </div>
            </div>
          </div>

          <div style="display:flex; gap:24px;">
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-size:13px; color:#888;">
              <input type="checkbox" id="food-available" ${editFood === null || editFood?.isAvailable ? 'checked' : ''} style="accent-color:#c9a84c; width:16px; height:16px;" />
              Available on Menu
            </label>
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer; font-size:13px; color:#888;">
              <input type="checkbox" id="food-featured" ${editFood?.isFeatured ? 'checked' : ''} style="accent-color:#c9a84c; width:16px; height:16px;" />
              Featured on Home
            </label>
          </div>

          <div style="display:flex; gap:12px;">
            <button type="submit" id="food-submit-btn" class="btn-gold" style="padding:12px 32px;">
              ${isEdit ? 'Update' : 'Add'} Food Item
            </button>
            ${isEdit ? `<button type="button" id="cancel-edit-btn" class="btn-outline-gold" style="padding:12px 24px;">Cancel</button>` : ''}
          </div>
        </form>
      </div>
    `;

    // Image preview
    const imageInput = container.querySelector('#food-image');
    const imagePreview = container.querySelector('#image-preview');
    const imagePlaceholder = container.querySelector('#image-placeholder');

    imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) {
        showToast('Image must be under 2MB', 'error');
        imageInput.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        imagePreview.innerHTML = `<img src="${ev.target.result}" style="max-height:120px; object-fit:contain; display:block; margin:0 auto 8px;" />`;
        imagePreview.style.display = 'block';
        imagePlaceholder.style.display = 'none';
      };
      reader.readAsDataURL(file);
    });

    // Cancel edit
    const cancelBtn = container.querySelector('#cancel-edit-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => loadTab('foods'));
    }

    // Form submission
    const form = container.querySelector('#food-form');
    const errorDiv = container.querySelector('#food-form-error');
    const submitBtn = container.querySelector('#food-submit-btn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errorDiv.style.display = 'none';

      const formData = new FormData();
      formData.append('name', container.querySelector('#food-name').value.trim());
      formData.append('price', container.querySelector('#food-price').value);
      formData.append('category', container.querySelector('#food-category').value);
      formData.append('description', container.querySelector('#food-description').value.trim());
      formData.append('isAvailable', container.querySelector('#food-available').checked);
      formData.append('isFeatured', container.querySelector('#food-featured').checked);

      const imageFile = imageInput.files[0];
      if (imageFile) formData.append('image', imageFile);
      else if (!isEdit) {
        errorDiv.textContent = 'Please upload a food image';
        errorDiv.style.display = 'block';
        return;
      }

      submitBtn.textContent = isEdit ? 'Updating...' : 'Adding...';
      submitBtn.disabled = true;

      try {
        if (isEdit) {
          await api.uploadPut(`/foods/${editFood._id}`, formData);
          showToast('Food item updated!', 'success');
        } else {
          await api.upload('/foods', formData);
          showToast('Food item added!', 'success');
        }
        loadTab('foods');
      } catch (err) {
        errorDiv.textContent = err.message;
        errorDiv.style.display = 'block';
        submitBtn.textContent = isEdit ? 'Update Food Item' : 'Add Food Item';
        submitBtn.disabled = false;
      }
    });
  }

  function loadEditFoodTab(container, food) {
    page.querySelectorAll('.admin-tab').forEach(t => {
      t.style.borderBottomColor = 'transparent';
      t.style.color = '#666';
    });
    const addTab = page.querySelector('[data-tab="add-food"]');
    if (addTab) { addTab.style.borderBottomColor = '#c9a84c'; addTab.style.color = '#c9a84c'; }
    loadAddFoodTab(container, food);
  }

  // ── ORDERS TAB ─────────────────────────────────────────────────────────
  async function loadOrdersTab(container) {
    try {
      const orders = await api.get('/orders');
      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h2 class="font-luxury" style="font-size:22px; color:#f5f5f5; font-weight:400;">All Orders (${orders.length})</h2>
        </div>
        ${orders.length === 0
          ? '<div style="text-align:center; padding:60px; color:#555;">No orders yet.</div>'
          : `<div style="display:flex; flex-direction:column; gap:16px;">
              ${orders.map(order => `
                <div class="card-luxury" style="padding:24px;">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
                    <div>
                      <div style="font-size:12px; color:#666; margin-bottom:4px;">Order #${order._id.slice(-8).toUpperCase()}</div>
                      <div style="font-size:13px; color:#888;">${order.user?.name || 'Unknown'} • ${order.user?.email || ''}</div>
                      <div style="font-size:11px; color:#555; margin-top:4px;">${new Date(order.createdAt).toLocaleString()}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
                      <span class="font-luxury text-gold" style="font-size:20px;">₹${order.totalAmount.toFixed(2)}</span>
                      <select class="order-status-select" data-id="${order._id}"
                        style="background:#0f0f0f; border:1px solid #2a2a2a; color:#c9a84c; padding:6px 12px; font-size:11px; letter-spacing:1px; text-transform:uppercase; cursor:pointer;">
                        ${['pending','confirmed','preparing','delivered','cancelled'].map(s =>
                          `<option value="${s}" ${order.status === s ? 'selected' : ''} style="background:#111;">${s}</option>`
                        ).join('')}
                      </select>
                    </div>
                  </div>
                  <div style="display:flex; flex-wrap:wrap; gap:8px;">
                    ${order.items.map(item => `
                      <span style="font-size:12px; color:#888; background:#0f0f0f; border:1px solid #1e1e1e; padding:4px 10px;">
                        ${item.name} × ${item.quantity}
                      </span>
                    `).join('')}
                  </div>
                  ${order.deliveryAddress ? `<div style="font-size:12px; color:#555; margin-top:12px;">📍 ${order.deliveryAddress}</div>` : ''}
                </div>
              `).join('')}
            </div>`
        }
      `;

      container.querySelectorAll('.order-status-select').forEach(sel => {
        sel.addEventListener('change', async () => {
          try {
            await api.put(`/orders/${sel.dataset.id}/status`, { status: sel.value });
            showToast('Order status updated', 'success');
          } catch (err) {
            showToast(err.message, 'error');
          }
        });
      });
    } catch (err) {
      container.innerHTML = `<div style="text-align:center; padding:40px; color:#f44336;">Error loading orders: ${err.message}</div>`;
    }
  }

  // ── RESERVATIONS TAB ──────────────────────────────────────────────────
  async function loadReservationsTab(container) {
    try {
      const reservations = await api.get('/reservations');
      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h2 class="font-luxury" style="font-size:22px; color:#f5f5f5; font-weight:400;">Reservations (${reservations.length})</h2>
        </div>
        ${reservations.length === 0
          ? '<div style="text-align:center; padding:60px; color:#555;">No reservations yet.</div>'
          : `<div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse;">
                <thead>
                  <tr style="border-bottom:2px solid #c9a84c;">
                    ${['Guest', 'Contact', 'Date & Time', 'Guests', 'Special Requests', 'Status', 'Actions'].map(h =>
                      `<th style="padding:12px 16px; text-align:left; font-size:10px; letter-spacing:2px; color:#888; text-transform:uppercase; font-weight:400;">${h}</th>`
                    ).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${reservations.map(r => `
                    <tr style="border-bottom:1px solid #1a1a1a;" onmouseover="this.style.background='#0f0f0f'" onmouseout="this.style.background='transparent'">
                      <td style="padding:12px 16px; color:#f5f5f5; font-size:14px;">${r.name}</td>
                      <td style="padding:12px 16px; font-size:12px; color:#888;">${r.email}<br>${r.phone}</td>
                      <td style="padding:12px 16px; font-size:13px; color:#ccc;">
                        ${new Date(r.date).toLocaleDateString()}<br>
                        <span style="color:#888;">${r.time}</span>
                      </td>
                      <td style="padding:12px 16px; text-align:center; color:#c9a84c; font-size:16px; font-family:Georgia,serif;">${r.guests}</td>
                      <td style="padding:12px 16px; font-size:12px; color:#777; max-width:200px;">${r.specialRequests || '—'}</td>
                      <td style="padding:12px 16px;">
                        <select class="res-status-select" data-id="${r._id}"
                          style="background:#0f0f0f; border:1px solid #2a2a2a; color:#c9a84c; padding:6px 12px; font-size:11px; cursor:pointer;">
                          ${['pending','confirmed','cancelled'].map(s =>
                            `<option value="${s}" ${r.status === s ? 'selected' : ''} style="background:#111;">${s}</option>`
                          ).join('')}
                        </select>
                      </td>
                      <td style="padding:12px 16px;">
                        <button class="delete-res-btn" data-id="${r._id}" style="font-size:11px; padding:5px 12px; background:transparent; border:1px solid #2a2a2a; color:#888; cursor:pointer; transition:all 0.3s;"
                          onmouseover="this.style.borderColor='#f44336'; this.style.color='#f44336'" onmouseout="this.style.borderColor='#2a2a2a'; this.style.color='#888'">Delete</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>`
        }
      `;

      container.querySelectorAll('.res-status-select').forEach(sel => {
        sel.addEventListener('change', async () => {
          try {
            await api.put(`/reservations/${sel.dataset.id}/status`, { status: sel.value });
            showToast('Reservation status updated', 'success');
          } catch (err) {
            showToast(err.message, 'error');
          }
        });
      });

      container.querySelectorAll('.delete-res-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Delete this reservation?')) return;
          try {
            await api.delete(`/reservations/${btn.dataset.id}`);
            showToast('Reservation deleted', 'success');
            loadTab('reservations');
          } catch (err) {
            showToast(err.message, 'error');
          }
        });
      });
    } catch (err) {
      container.innerHTML = `<div style="text-align:center; padding:40px; color:#f44336;">Error loading reservations: ${err.message}</div>`;
    }
  }

  return page;
};
// src/pages/cart.js
// Shopping cart page

import { getCart, updateCartQuantity, removeFromCart, getCartTotal, clearCart } from '../utils/cart.js';
import { isLoggedIn } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';
import { UPLOADS_URL } from '../utils/api.js';

export const renderCart = () => {
  const page = document.createElement('div');
  page.className = 'page-enter';
  page.style.paddingTop = '100px';
  page.style.minHeight = '80vh';

  const renderCartContent = () => {
    const cart = getCart();
    const total = getCartTotal();

    page.innerHTML = `
      <!-- Header -->
      <div style="text-align:center; padding:60px 24px 48px; background:#060606; border-bottom:1px solid #1a1a1a;">
        <div style="font-size:10px; letter-spacing:4px; color:#c9a84c; text-transform:uppercase; margin-bottom:16px;">Your Selection</div>
        <h1 class="font-luxury" style="font-size:clamp(36px,5vw,52px); color:#f5f5f5; font-weight:400;">Cart</h1>
        <div class="gold-divider"></div>
      </div>

      <div style="max-width:1100px; margin:0 auto; padding:60px 24px;">
        ${cart.length === 0
          ? `<!-- Empty Cart -->
            <div style="text-align:center; padding:80px 24px;">
              <div style="font-size:72px; margin-bottom:24px;">🍽️</div>
              <h2 class="font-luxury" style="font-size:28px; color:#555; font-weight:400; margin-bottom:16px;">Your cart is empty</h2>
              <p style="color:#444; margin-bottom:32px;">Explore our menu and discover extraordinary dishes.</p>
              <a href="#/menu" class="btn-gold">Browse Menu</a>
            </div>`
          : `<div style="display:grid; grid-template-columns:1fr 340px; gap:32px; align-items:start;">
              <!-- Cart Items -->
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
                  <h2 class="font-luxury" style="font-size:22px; color:#f5f5f5; font-weight:400;">${cart.length} Item${cart.length > 1 ? 's' : ''}</h2>
                  <button id="clear-cart-btn" style="font-size:11px; letter-spacing:1px; color:#666; background:transparent; border:1px solid #2a2a2a; padding:6px 14px; cursor:pointer; transition:all 0.3s;"
                    onmouseover="this.style.borderColor='#f44336'; this.style.color='#f44336'"
                    onmouseout="this.style.borderColor='#2a2a2a'; this.style.color='#666'">Clear Cart</button>
                </div>

                <div id="cart-items-list" style="display:flex; flex-direction:column; gap:16px;">
                  ${cart.map(item => `
                    <div class="card-luxury" style="padding:20px; display:flex; gap:16px; align-items:center;" data-id="${item._id}">
                      <!-- Image -->
                      <div style="width:80px; height:80px; flex-shrink:0; overflow:hidden; background:#0f0f0f;">
                        <img src="${UPLOADS_URL}/${item.image}" alt="${item.name}"
                          style="width:100%; height:100%; object-fit:cover;"
                          onerror="this.parentElement.innerHTML='<div style=&quot;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:30px;&quot;>🍽️</div>'"
                        />
                      </div>

                      <!-- Info -->
                      <div style="flex:1;">
                        <h3 class="font-luxury" style="font-size:17px; color:#f5f5f5; margin-bottom:4px;">${item.name}</h3>
                        <div class="text-gold" style="font-size:14px; margin-bottom:12px;">₹${item.price.toFixed(2)} each</div>

                        <!-- Quantity controls -->
                        <div style="display:flex; align-items:center; gap:12px;">
                          <button class="qty-btn" data-id="${item._id}" data-delta="-1"
                            style="width:28px; height:28px; background:transparent; border:1px solid #2a2a2a; color:#ccc; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; transition:all 0.3s;"
                            onmouseover="this.style.borderColor='#c9a84c'" onmouseout="this.style.borderColor='#2a2a2a'">−</button>
                          <span style="font-size:16px; color:#f5f5f5; min-width:24px; text-align:center;">${item.quantity}</span>
                          <button class="qty-btn" data-id="${item._id}" data-delta="1"
                            style="width:28px; height:28px; background:transparent; border:1px solid #2a2a2a; color:#ccc; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; transition:all 0.3s;"
                            onmouseover="this.style.borderColor='#c9a84c'" onmouseout="this.style.borderColor='#2a2a2a'">+</button>
                        </div>
                      </div>

                      <!-- Item total + remove -->
                      <div style="text-align:right; flex-shrink:0;">
                        <div class="font-luxury text-gold" style="font-size:20px; margin-bottom:12px;">₹${(item.price * item.quantity).toFixed(2)}</div>
                        <button class="remove-btn" data-id="${item._id}"
                          style="font-size:11px; color:#555; background:transparent; border:none; cursor:pointer; transition:color 0.3s;"
                          onmouseover="this.style.color='#f44336'" onmouseout="this.style.color='#555'">Remove</button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Order Summary -->
              <div style="position:sticky; top:100px;">
                <div class="card-luxury" style="padding:32px;">
                  <h3 class="font-luxury" style="font-size:20px; color:#f5f5f5; margin-bottom:24px; font-weight:400;">Order Summary</h3>

                  <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:24px; padding-bottom:24px; border-bottom:1px solid #1e1e1e;">
                    ${cart.map(item => `
                      <div style="display:flex; justify-content:space-between; font-size:13px; color:#888;">
                        <span>${item.name} × ${item.quantity}</span>
                        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    `).join('')}
                  </div>

                  <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; color:#888;">
                    <span>Subtotal</span>
                    <span>₹${total.toFixed(2)}</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; color:#888;">
                    <span>Service Charge (10%)</span>
                    <span>₹${(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; padding-top:16px; border-top:1px solid #1e1e1e; margin-bottom:28px;">
                    <span class="font-luxury" style="font-size:18px; color:#f5f5f5;">Total</span>
                    <span class="font-luxury text-gold" style="font-size:22px;">₹${(total * 1.1).toFixed(2)}</span>
                  </div>

                  <button id="checkout-btn" class="btn-gold" style="width:100%; text-align:center; padding:14px;">
                    Proceed to Checkout
                  </button>
                  <a href="#/menu" style="display:block; text-align:center; margin-top:12px; font-size:12px; color:#666; text-decoration:none; letter-spacing:1px; transition:color 0.3s;"
                    onmouseover="this.style.color='#c9a84c'" onmouseout="this.style.color='#666'">← Continue Shopping</a>
                </div>
              </div>
            </div>`
        }
      </div>
    `;

    // Attach events
    const clearBtn = page.querySelector('#clear-cart-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear your entire cart?')) {
          clearCart();
          renderCartContent();
          showToast('Cart cleared', 'info');
        }
      });
    }

    const checkoutBtn = page.querySelector('#checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (!isLoggedIn()) {
          showToast('Please login to proceed to checkout', 'error');
          setTimeout(() => { window.location.hash = '#/login'; }, 1000);
          return;
        }
        window.location.hash = '#/payment';
      });
    }

    // Quantity buttons
    page.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const delta = parseInt(btn.dataset.delta);
        const item = getCart().find(i => i._id === id);
        if (item) {
          updateCartQuantity(id, item.quantity + delta);
          renderCartContent();
        }
      });
    });

    // Remove buttons
    page.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(btn.dataset.id);
        renderCartContent();
        showToast('Item removed from cart');
      });
    });
  };

  renderCartContent();
  return page;
};
// src/pages/payment.js
// Stripe payment integration
import { api } from '../utils/api.js';
import { getCart, getCartTotal, clearCart } from '../utils/cart.js';
import { requireAuth } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';
import { UPLOADS_URL } from '../utils/api.js';

export const renderPayment = async () => {
  if (!requireAuth()) return document.createElement('div');

  const cart = getCart();
  if (cart.length === 0) {
    window.location.hash = '#/cart';
    return document.createElement('div');
  }

  const subtotal = getCartTotal();
  const serviceCharge = subtotal * 0.1;
  const total = subtotal + serviceCharge;

  const page = document.createElement('div');
  page.className = 'page-enter';
  page.style.paddingTop = '100px';

  page.innerHTML = `
    <!-- Header -->
    <div style="text-align:center; padding:60px 24px 48px; background:#060606; border-bottom:1px solid #1a1a1a;">
      <div style="font-size:10px; letter-spacing:4px; color:#c9a84c; text-transform:uppercase; margin-bottom:16px;">Secure Checkout</div>
      <h1 class="font-luxury" style="font-size:clamp(32px,4vw,48px); color:#f5f5f5; font-weight:400;">Complete Your Order</h1>
      <div class="gold-divider"></div>
    </div>

    <div style="max-width:1000px; margin:0 auto; padding:60px 24px;">
      <div style="display:grid; grid-template-columns:1fr 360px; gap:40px; align-items:start;">

        <!-- Payment form -->
        <div>
          <div class="card-luxury" style="padding:32px;">
            <h3 class="font-luxury" style="font-size:20px; color:#f5f5f5; font-weight:400; margin-bottom:8px;">Delivery Details</h3>
            <p style="color:#666; font-size:13px; margin-bottom:24px;">Where should we deliver your order?</p>

            <div style="display:flex; flex-direction:column; gap:20px; margin-bottom:32px;">
              <div>
                <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Delivery Address *</label>
                <input type="text" id="delivery-address" class="input-luxury" placeholder="Enter your delivery address" required />
              </div>
              <div>
                <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Special Instructions</label>
                <textarea id="special-instructions" class="input-luxury" placeholder="Allergies, preferences..." rows="3" style="resize:vertical;"></textarea>
              </div>
            </div>

            <!-- Stripe Payment Section -->
            <div>
              <h3 class="font-luxury" style="font-size:20px; color:#f5f5f5; font-weight:400; margin-bottom:8px;">Payment Details</h3>
              <p style="color:#666; font-size:13px; margin-bottom:20px;">Secured by <span style="color:#c9a84c;">Stripe</span></p>

              <div id="card-element" style="background:#0f0f0f; border:1px solid #2a2a2a; padding:14px; border-radius:0; transition:border-color 0.3s; min-height:44px;">
                <div id="card-loading" style="color:#666; font-size:13px; display:flex; align-items:center; gap:8px;">
                  <div class="spinner" style="width:16px; height:16px; border-width:2px;"></div>
                  Loading payment form...
                </div>
              </div>
              <div id="card-errors" style="color:#f44336; font-size:13px; margin-top:8px; min-height:20px;"></div>

              <div style="display:flex; gap:12px; margin-top:8px; align-items:center; flex-wrap:wrap;">
                <span style="font-size:10px; letter-spacing:1px; color:#555; text-transform:uppercase;">🔒 Secured by Stripe</span>
                <span style="font-size:10px; color:#444;">|</span>
                <span style="font-size:10px; color:#555;">Test: 4242 4242 4242 4242</span>
                <span style="font-size:10px; color:#444;">|</span>
                <span style="font-size:10px; color:#555;">Exp: 12/26 CVC: 123</span>
              </div>
            </div>

            <div id="payment-error" style="display:none; background:rgba(244,67,54,0.1); border:1px solid rgba(244,67,54,0.3); padding:12px 16px; font-size:13px; color:#f44336; margin-top:20px;"></div>

            <!-- Pay button disabled until Stripe loads -->
            <button id="pay-btn" class="btn-gold" style="width:100%; padding:15px; margin-top:24px; font-size:13px; opacity:0.5; cursor:not-allowed;" disabled>
              Pay ₹${total.toFixed(2)}
            </button>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div style="position:sticky; top:100px;">
          <div class="card-luxury" style="padding:28px;">
            <h3 class="font-luxury" style="font-size:18px; color:#f5f5f5; font-weight:400; margin-bottom:20px;">Order Summary</h3>

            <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px; max-height:300px; overflow-y:auto;">
              ${cart.map(item => `
                <div style="display:flex; gap:12px; align-items:center; padding:10px 0; border-bottom:1px solid #1a1a1a;">
                  <div style="width:48px; height:48px; flex-shrink:0; overflow:hidden; background:#0f0f0f;">
                    <img src="${UPLOADS_URL}/${item.image}" alt="${item.name}"
                      style="width:100%; height:100%; object-fit:cover;"
                      onerror="this.parentElement.innerHTML='<div style=&quot;width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:20px;&quot;>🍽️</div>'"
                    />
                  </div>
                  <div style="flex:1;">
                    <div style="font-size:13px; color:#ccc;">${item.name}</div>
                    <div style="font-size:11px; color:#666;">× ${item.quantity}</div>
                  </div>
                  <div style="font-size:13px; color:#c9a84c;">₹${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              `).join('')}
            </div>

            <div style="display:flex; flex-direction:column; gap:8px; padding-top:12px; border-top:1px solid #1e1e1e;">
              <div style="display:flex; justify-content:space-between; font-size:13px; color:#888;">
                <span>Subtotal</span><span>₹${subtotal.toFixed(2)}</span>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:13px; color:#888;">
                <span>Service Charge (10%)</span><span>₹${serviceCharge.toFixed(2)}</span>
              </div>
              <div style="display:flex; justify-content:space-between; padding-top:12px; border-top:1px solid #1e1e1e;">
                <span class="font-luxury" style="font-size:16px; color:#f5f5f5;">Total</span>
                <span class="font-luxury text-gold" style="font-size:20px;">₹${total.toFixed(2)}</span>
              </div>
            </div>

            <!-- Items count badge -->
            <div style="margin-top:16px; padding-top:16px; border-top:1px solid #1a1a1a; text-align:center;">
              <span style="font-size:11px; letter-spacing:1px; color:#666; text-transform:uppercase;">
                ${cart.reduce((sum, item) => sum + item.quantity, 0)} item${cart.reduce((sum, item) => sum + item.quantity, 0) > 1 ? 's' : ''} in your order
              </span>
            </div>
          </div>

          <!-- Security badges -->
          <div style="margin-top:16px; display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
            <span style="font-size:11px; color:#444;">🔒 SSL Encrypted</span>
            <span style="font-size:11px; color:#444;">💳 Stripe Secured</span>
            <span style="font-size:11px; color:#444;">✅ Safe Checkout</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize Stripe
  setTimeout(async () => {
    const payBtn = page.querySelector('#pay-btn');
    const paymentError = page.querySelector('#payment-error');
    const cardErrors = page.querySelector('#card-errors');

    try {
      // Check if Stripe.js is loaded
      if (typeof Stripe === 'undefined') {
        throw new Error('Stripe.js failed to load. Please refresh the page.');
      }

      const { publishableKey } = await api.get('/payments/key');

      if (!publishableKey) {
        throw new Error('Payment configuration missing. Please contact support.');
      }

      const stripe = Stripe(publishableKey);
      const elements = stripe.elements({
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#c9a84c',
            colorBackground: '#0f0f0f',
            colorText: '#f5f5f5',
            colorDanger: '#f44336',
            fontFamily: 'Georgia, serif',
            borderRadius: '0px',
          },
        },
      });

      const cardElement = elements.create('card', {
        style: {
          base: {
            color: '#f5f5f5',
            fontFamily: 'Lato, sans-serif',
            fontSize: '15px',
            '::placeholder': { color: '#555' },
          },
          invalid: { color: '#f44336' },
        },
      });

      // Clear loading indicator before mounting
      const cardEl = page.querySelector('#card-element');
      cardEl.innerHTML = '';
      cardElement.mount('#card-element');

      // Enable pay button only after Stripe is ready
      cardElement.on('ready', () => {
        payBtn.disabled = false;
        payBtn.style.opacity = '1';
        payBtn.style.cursor = 'pointer';
      });

      cardElement.on('change', (e) => {
        cardErrors.textContent = e.error ? e.error.message : '';
      });

      // Pay button click
      payBtn.addEventListener('click', async () => {
        paymentError.style.display = 'none';

        // Validate delivery address before payment
        const address = page.querySelector('#delivery-address').value.trim();
        if (!address) {
          paymentError.textContent = 'Please enter your delivery address before paying.';
          paymentError.style.display = 'block';
          page.querySelector('#delivery-address').focus();
          return;
        }

        payBtn.textContent = 'Processing...';
        payBtn.disabled = true;

        try {
          // Create payment intent on backend
          const { clientSecret } = await api.post('/payments/create-intent', { amount: total });

          // Confirm payment with Stripe
          const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement },
          });

          if (error) {
            paymentError.textContent = error.message;
            paymentError.style.display = 'block';
            payBtn.textContent = `Pay ₹${total.toFixed(2)}`;
            payBtn.disabled = false;
            return;
          }

          if (paymentIntent.status === 'succeeded') {
            const instructions = page.querySelector('#special-instructions').value.trim();

            // Show processing state while creating order
            payBtn.textContent = 'Placing Order...';

            await api.post('/orders', {
              items: cart.map(item => ({ foodId: item._id, quantity: item.quantity })),
              totalAmount: total,
              deliveryAddress: address,
              specialInstructions: instructions,
              stripePaymentIntentId: paymentIntent.id,
            });

            clearCart();

            // Show success screen
            page.innerHTML = `
              <div style="min-height:80vh; display:flex; align-items:center; justify-content:center; padding:40px 24px; background:#060606;">
                <div style="text-align:center; max-width:480px;">
                  <div style="font-size:64px; margin-bottom:24px;">🎉</div>
                  <div style="font-size:10px; letter-spacing:4px; color:#c9a84c; text-transform:uppercase; margin-bottom:16px;">Order Confirmed</div>
                  <h2 class="font-luxury" style="font-size:36px; color:#f5f5f5; font-weight:400; margin-bottom:16px;">Thank You!</h2>
                  <p style="color:#888; font-size:14px; line-height:1.7; margin-bottom:8px;">Your payment of <span style="color:#c9a84c;">₹${total.toFixed(2)}</span> was successful.</p>
                  <p style="color:#666; font-size:13px; margin-bottom:32px;">A confirmation email has been sent to your inbox.</p>
                  <div style="background:#0f0f0f; border:1px solid #1e1e1e; padding:16px; margin-bottom:32px;">
                    <div style="font-size:11px; letter-spacing:2px; color:#666; text-transform:uppercase; margin-bottom:8px;">Payment ID</div>
                    <div style="font-size:12px; color:#555; font-family:monospace;">${paymentIntent.id}</div>
                  </div>
                  <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
                    <a href="#/menu" class="btn-gold" style="padding:12px 28px; text-decoration:none; font-size:12px; letter-spacing:2px;">Order Again</a>
                    <a href="#/" class="btn-outline-gold" style="padding:12px 28px; text-decoration:none; font-size:12px; letter-spacing:2px;">Back to Home</a>
                  </div>
                </div>
              </div>
            `;

            showToast('Payment successful! Order placed. 🎉', 'success');
          }
        } catch (err) {
          paymentError.textContent = err.message;
          paymentError.style.display = 'block';
          payBtn.textContent = `Pay ₹${total.toFixed(2)}`;
          payBtn.disabled = false;
        }
      });

    } catch (err) {
      console.error('Stripe init error:', err);
      const cardEl = page.querySelector('#card-element');
      if (cardEl) {
        cardEl.innerHTML = `<p style="color:#f44336; font-size:13px;">⚠️ ${err.message || 'Payment system unavailable. Please try again.'}</p>`;
      }
      if (payBtn) {
        payBtn.textContent = 'Payment Unavailable';
        payBtn.disabled = true;
        payBtn.style.opacity = '0.4';
      }
    }
  }, 0);

  return page;
};
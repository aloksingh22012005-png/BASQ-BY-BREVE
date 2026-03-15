// src/pages/reservation.js
// Table reservation form

import { api } from '../utils/api.js';
import { showToast } from '../utils/toast.js';

export const renderReservation = () => {
  const page = document.createElement('div');
  page.className = 'page-enter';
  page.style.paddingTop = '100px';

  page.innerHTML = `
    <!-- Header -->
    <div style="text-align:center; padding:60px 24px 48px; background:#060606; border-bottom:1px solid #1a1a1a;">
      <div style="font-size:10px; letter-spacing:4px; color:#c9a84c; text-transform:uppercase; margin-bottom:16px;">Exclusive Experience</div>
      <h1 class="font-luxury" style="font-size:clamp(36px,5vw,52px); color:#f5f5f5; font-weight:400;">Reserve Your Table</h1>
      <div class="gold-divider"></div>
      <p style="color:#777; font-size:14px; letter-spacing:1px; margin-top:16px; max-width:500px; margin-left:auto; margin-right:auto;">
        Every experience begins with a reservation. We look forward to welcoming you.
      </p>
    </div>

    <div style="max-width:1100px; margin:0 auto; padding:60px 24px;">
      <div style="display:grid; grid-template-columns:1fr 380px; gap:48px; align-items:start;">

        <!-- Form -->
        <div>
          <div id="reservation-success" style="display:none; background:rgba(76,175,80,0.1); border:1px solid rgba(76,175,80,0.3); padding:20px 24px; margin-bottom:32px;">
            <div style="display:flex; gap:12px; align-items:center;">
              <span style="font-size:24px;">✓</span>
              <div>
                <div style="font-size:14px; color:#4caf50; font-weight:600; margin-bottom:4px;">Reservation Submitted!</div>
                <div style="font-size:13px; color:#888;">We'll confirm your reservation within 24 hours.</div>
              </div>
            </div>
          </div>

          <div id="reservation-error" style="display:none; background:rgba(244,67,54,0.1); border:1px solid rgba(244,67,54,0.3); padding:12px 16px; font-size:13px; color:#f44336; margin-bottom:24px;"></div>

          <form id="reservation-form" style="display:flex; flex-direction:column; gap:24px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
              <div>
                <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Full Name *</label>
                <input type="text" id="res-name" class="input-luxury" placeholder="Your Name" required />
              </div>
              <div>
                <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Email *</label>
                <input type="email" id="res-email" class="input-luxury" placeholder="your@email.com" required />
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
              <div>
                <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Phone Number *</label>
                <input type="tel" id="res-phone" class="input-luxury" placeholder="+91 98765 43210" required />
              </div>
              <div>
                <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Number of Guests *</label>
                <select id="res-guests" class="input-luxury" required style="cursor:pointer;">
                  <option value="" style="background:#111;">Select guests</option>
                  ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}" style="background:#111;">${n} Guest${n > 1 ? 's' : ''}</option>`).join('')}
                  <option value="15" style="background:#111;">Up to 15 (Private)</option>
                  <option value="20" style="background:#111;">Up to 20 (Event)</option>
                </select>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
              <div>
                <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Date *</label>
                <input type="date" id="res-date" class="input-luxury" required />
              </div>
              <div>
                <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Preferred Time *</label>
                <select id="res-time" class="input-luxury" required style="cursor:pointer;">
                  <option value="" style="background:#111;">Select time</option>
                  ${['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM']
                    .map(t => `<option value="${t}" style="background:#111;">${t}</option>`).join('')}
                </select>
              </div>
            </div>

            <div>
              <label style="display:block; font-size:11px; letter-spacing:2px; color:#888; text-transform:uppercase; margin-bottom:8px;">Special Requests</label>
              <textarea id="res-requests" class="input-luxury" placeholder="Dietary requirements, seating preferences, special occasions..." rows="4" style="resize:vertical;"></textarea>
            </div>

            <button type="submit" id="res-submit-btn" class="btn-gold" style="align-self:flex-start; padding:14px 40px;">
              Request Reservation
            </button>
          </form>
        </div>

        <!-- Side info -->
        <div style="display:flex; flex-direction:column; gap:20px; position:sticky; top:100px;">
          <!-- Hours card -->
          <div class="card-luxury" style="padding:28px;">
            <h3 class="font-luxury text-gold" style="font-size:18px; font-weight:400; margin-bottom:20px;">Dining Hours</h3>
            ${[
              ['Monday – Thursday', '12:00 PM – 11:00 PM'],
              ['Friday – Saturday', '12:00 PM – 1:00 AM'],
              ['Sunday', '12:00 PM – 10:00 PM'],
            ].map(([day, hrs]) => `
              <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #1a1a1a; font-size:13px;">
                <span style="color:#888;">${day}</span>
                <span style="color:#ccc;">${hrs}</span>
              </div>
            `).join('')}
          </div>

          <!-- Location -->
          <div class="card-luxury" style="padding:28px;">
            <h3 class="font-luxury text-gold" style="font-size:18px; font-weight:400; margin-bottom:20px;">Location</h3>
            <p style="color:#888; font-size:13px; line-height:1.8;">
              12 Culinary Avenue<br>
              Bandra West, Mumbai<br>
              Maharashtra 400050, India
            </p>
            <div style="margin-top:16px; padding-top:16px; border-top:1px solid #1a1a1a; font-size:13px; color:#888;">
              📞 +91 98765 43210
            </div>
          </div>

          <!-- Policy -->
          <div style="padding:20px; background:rgba(201,168,76,0.05); border:1px solid rgba(201,168,76,0.15);">
            <div style="font-size:10px; letter-spacing:2px; color:#c9a84c; text-transform:uppercase; margin-bottom:8px;">Reservation Policy</div>
            <p style="color:#666; font-size:12px; line-height:1.7;">Reservations held for 15 minutes past booking time. Cancellations require 24-hour notice.</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Set min date to today
  const dateInput = page.querySelector('#res-date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  const form = page.querySelector('#reservation-form');
  const errorDiv = page.querySelector('#reservation-error');
  const successDiv = page.querySelector('#reservation-success');
  const submitBtn = page.querySelector('#res-submit-btn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const data = {
      name: page.querySelector('#res-name').value.trim(),
      email: page.querySelector('#res-email').value.trim(),
      phone: page.querySelector('#res-phone').value.trim(),
      guests: page.querySelector('#res-guests').value,
      date: page.querySelector('#res-date').value,
      time: page.querySelector('#res-time').value,
      specialRequests: page.querySelector('#res-requests').value.trim(),
    };

    if (!data.guests || !data.date || !data.time) {
      errorDiv.textContent = 'Please fill in all required fields';
      errorDiv.style.display = 'block';
      return;
    }

    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try {
      await api.post('/reservations', data, false);
      successDiv.style.display = 'block';
      form.reset();
      showToast('Reservation submitted successfully!', 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
    } finally {
      submitBtn.textContent = 'Request Reservation';
      submitBtn.disabled = false;
    }
  });

  return page;
};

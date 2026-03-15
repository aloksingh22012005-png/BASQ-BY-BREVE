// src/components/Footer.js

export const renderFooter = () => {
  const footer = document.createElement('footer');
  footer.style.cssText = 'background:#000; border-top:1px solid #1a1a1a; padding:60px 0 30px;';
  footer.innerHTML = `
    <div style="max-width:1200px; margin:0 auto; padding:0 24px;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:48px; margin-bottom:48px;">
        <!-- Brand -->
        <div>
          <div class="font-luxury text-gold" style="font-size:24px; letter-spacing:3px; font-style:italic; margin-bottom:12px;">Basq By Breve</div>
          <div style="font-size:9px; letter-spacing:4px; color:#555; text-transform:uppercase; margin-bottom:20px;">Fine Dining Experience</div>
          <p style="color:#666; font-size:13px; line-height:1.8;">An exclusive dining experience where culinary artistry meets luxury ambiance. Every dish tells a story.</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 style="font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#888; margin-bottom:20px;">Navigation</h4>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${['Home:#/', 'Menu:#/menu', 'Reserve a Table:#/reservation', 'Cart:#/cart'].map(item => {
              const [label, href] = item.split(':');
              return `<a href="${href}" style="color:#666; text-decoration:none; font-size:13px; transition:color 0.3s;" onmouseover="this.style.color='#c9a84c'" onmouseout="this.style.color='#666'">${label}</a>`;
            }).join('')}
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h4 style="font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#888; margin-bottom:20px;">Contact</h4>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="color:#666; font-size:13px; display:flex; gap:10px;">
              <span style="color:#c9a84c;">📍</span>
              <span>12 Culinary Avenue, Mumbai, India</span>
            </div>
            <div style="color:#666; font-size:13px; display:flex; gap:10px;">
              <span style="color:#c9a84c;">📞</span>
              <span>+91 9321201445</span>
            </div>
            <div style="color:#666; font-size:13px; display:flex; gap:10px;">
              <span style="color:#c9a84c;">✉️</span>
              <span>hello@basqbybreve.com</span>
            </div>
          </div>
        </div>

        <!-- Hours -->
        <div>
          <h4 style="font-size:10px; letter-spacing:3px; text-transform:uppercase; color:#888; margin-bottom:20px;">Hours</h4>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; justify-content:space-between; font-size:13px; color:#666;">
              <span>Mon – Thu</span><span style="color:#aaa;">12pm – 11pm</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:13px; color:#666;">
              <span>Fri – Sat</span><span style="color:#aaa;">12pm – 1am</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:13px; color:#666;">
              <span>Sunday</span><span style="color:#aaa;">12pm – 10pm</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div style="border-top:1px solid #1a1a1a; padding-top:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <p style="color:#444; font-size:12px;">&copy; ${new Date().getFullYear()} Basq By Breve. All Rights Reserved.</p>
        <p style="color:#333; font-size:11px; letter-spacing:2px; text-transform:uppercase;">Crafted with Excellence</p>
      </div>
    </div>
  `;
  return footer;
};

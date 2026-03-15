import restaurantBanner from '../assets/restaurant-banner.jpg';

export const renderBanner = () => {
    const page = document.createElement('div');
page.className = 'page-enter';
page.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');

        .banner-page {
          min-height: 100vh;
          background: #0a0605;
          overflow: hidden;
          position: relative;
        }

        /* Background image with warm overlay */
        .banner-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: url('${restaurantBanner}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.35);
        }

        /* Warm tint overlay on top of image */
        .banner-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            to bottom,
            rgba(20,12,5,0.55) 0%,
            rgba(10,6,2,0.35) 50%,
            rgba(20,12,5,0.75) 100%
          );
          pointer-events: none;
        }

        .banner-grain {
          position: fixed;
          inset: 0;
          z-index: 2;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .banner-glow-top {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(212,168,83,0.10) 0%, transparent 70%);
          pointer-events: none;
          z-index: 3;
        }

        .banner-glow-bottom {
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(212,168,83,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 3;
        }

        .banner-lines {
          position: absolute;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          overflow: hidden;
        }
        .banner-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(212,168,83,0.07), transparent);
          height: 1px;
          width: 100%;
          animation: lineSweep 8s ease-in-out infinite;
        }
        .banner-line:nth-child(1) { top: 20%; animation-delay: 0s; }
        .banner-line:nth-child(2) { top: 50%; animation-delay: 2.5s; }
        .banner-line:nth-child(3) { top: 80%; animation-delay: 5s; }
        @keyframes lineSweep {
          0%, 100% { opacity: 0; transform: scaleX(0) translateX(-100%); }
          50% { opacity: 1; transform: scaleX(1) translateX(0); }
        }

        .corner-decor {
          position: absolute;
          width: 80px;
          height: 80px;
          z-index: 10;
        }
        .corner-decor.tl { top: 32px; left: 32px; border-top: 1px solid rgba(212,168,83,0.5); border-left: 1px solid rgba(212,168,83,0.5); }
        .corner-decor.tr { top: 32px; right: 32px; border-top: 1px solid rgba(212,168,83,0.5); border-right: 1px solid rgba(212,168,83,0.5); }
        .corner-decor.bl { bottom: 32px; left: 32px; border-bottom: 1px solid rgba(212,168,83,0.5); border-left: 1px solid rgba(212,168,83,0.5); }
        .corner-decor.br { bottom: 32px; right: 32px; border-bottom: 1px solid rgba(212,168,83,0.5); border-right: 1px solid rgba(212,168,83,0.5); }

        .banner-content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 24px;
        }

        .banner-reveal {
          opacity: 0;
          transform: translateY(30px);
          animation: revealUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes revealUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealFade {
          to { opacity: 1; }
        }

        /* Warm gold shimmer */
        .gold-shimmer {
          background: linear-gradient(
            90deg,
            #8B6914 0%,
            #D4A853 25%,
            #F0CC7A 50%,
            #D4A853 75%,
            #8B6914 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .gold-diamond-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 28px auto;
          width: fit-content;
        }
        .gold-diamond-divider::before {
          content: '';
          display: block;
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #D4A853);
        }
        .gold-diamond-divider::after {
          content: '';
          display: block;
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, #D4A853, transparent);
        }
        .diamond {
          width: 8px;
          height: 8px;
          background: #D4A853;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .banner-badges {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin: 32px 0;
        }
        .banner-badge {
          border: 1px solid rgba(212,168,83,0.30);
          background: rgba(212,168,83,0.08);
          color: #D4A853;
          font-family: 'Lato', sans-serif;
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 8px 18px;
          transition: all 0.3s ease;
        }
        .banner-badge:hover {
          background: rgba(212,168,83,0.15);
          border-color: rgba(212,168,83,0.6);
          transform: translateY(-2px);
        }

        .banner-cta-group {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 48px;
        }
        .banner-btn-primary {
          background: #D4A853;
          color: #1a0f02;
          padding: 15px 44px;
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }
        .banner-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%);
          transition: transform 0.35s ease;
        }
        .banner-btn-primary:hover::before { transform: translateX(0); }
        .banner-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(212,168,83,0.35);
        }
        .banner-btn-secondary {
          background: transparent;
          color: #D4A853;
          padding: 14px 40px;
          font-family: 'Lato', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          border: 1px solid rgba(212,168,83,0.55);
          cursor: pointer;
          transition: all 0.35s ease;
        }
        .banner-btn-secondary:hover {
          background: rgba(212,168,83,0.10);
          border-color: #D4A853;
          transform: translateY(-2px);
        }

        .banner-strip {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          border-top: 1px solid rgba(212,168,83,0.12);
          background: rgba(10,6,2,0.4);
        }

        .banner-plate {
          position: absolute;
          z-index: 4;
          font-size: 48px;
          opacity: 0.05;
          animation: floatPlate 6s ease-in-out infinite;
          pointer-events: none;
          user-select: none;
        }
        @keyframes floatPlate {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: revealFade 1s ease 2.5s forwards;
        }
        .scroll-dot {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, #D4A853, transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }

        @media (max-width: 640px) {
          .corner-decor { width: 40px; height: 40px; }
          .banner-strip { padding: 16px 20px; }
          .banner-badge { font-size: 9px; padding: 6px 12px; }
        }
      </style>

      <div class="banner-page">
        <!-- Background image -->
        <div class="banner-bg"></div>
        <!-- Warm tint overlay -->
        <div class="banner-overlay"></div>
        <!-- Grain texture -->
        <div class="banner-grain"></div>
        <!-- Glow effects -->
        <div class="banner-glow-top"></div>
        <div class="banner-glow-bottom"></div>
        <!-- Animated lines -->
        <div class="banner-lines">
          <div class="banner-line"></div>
          <div class="banner-line"></div>
          <div class="banner-line"></div>
        </div>
        <!-- Corner decorations -->
        <div class="corner-decor tl"></div>
        <div class="corner-decor tr"></div>
        <div class="corner-decor bl"></div>
        <div class="corner-decor br"></div>
        <!-- Floating decorative plates -->
        <div class="banner-plate" style="top:12%; left:5%; animation-delay:0s;">🍷</div>
        <div class="banner-plate" style="top:15%; right:6%; animation-delay:1.5s; font-size:40px;">🥂</div>
        <div class="banner-plate" style="bottom:18%; left:8%; animation-delay:3s; font-size:36px;">🫚</div>
        <div class="banner-plate" style="bottom:20%; right:5%; animation-delay:4.5s;">🍽️</div>

        <!-- Main Content -->
        <div class="banner-content">

          <!-- Pre-title -->
          <div class="banner-reveal" style="animation-delay:0.1s;">
            <div style="display:flex; align-items:center; gap:16px; justify-content:center; margin-bottom:32px;">
              <div style="height:1px; width:40px; background:rgba(212,168,83,0.5);"></div>
              <span style="font-family:'Lato',sans-serif; font-size:10px; font-weight:300; letter-spacing:5px; color:#D4A853; text-transform:uppercase;">Est. 2008 · Mumbai, India</span>
              <div style="height:1px; width:40px; background:rgba(212,168,83,0.5);"></div>
            </div>
          </div>

          <!-- Main Title -->
          <div class="banner-reveal" style="animation-delay:0.3s;">
            <h1 style="font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(52px,10vw,110px); font-weight:300; line-height:0.95; color:#F5ECD7; margin:0; letter-spacing:2px;">
              Basq
              <em class="gold-shimmer" style="font-style:italic; display:block; font-size:clamp(40px,8vw,88px); font-weight:400;">By Breve</em>
            </h1>
          </div>

          <!-- Diamond divider -->
          <div class="banner-reveal" style="animation-delay:0.5s;">
            <div class="gold-diamond-divider">
              <div class="diamond"></div>
            </div>
          </div>

          <!-- Tagline -->
          <div class="banner-reveal" style="animation-delay:0.65s;">
            <p style="font-family:'Cormorant Garamond',Georgia,serif; font-size:clamp(16px,2.5vw,22px); color:#B8A082; font-style:italic; font-weight:300; letter-spacing:1px; max-width:560px; line-height:1.7; margin:0 auto;">
              Where culinary artistry meets timeless luxury.<br>
              Every dish, a masterpiece. Every moment, unforgettable.
            </p>
          </div>

          <!-- Feature Badges -->
          <div class="banner-reveal" style="animation-delay:0.8s;">
            <div class="banner-badges">
              <span class="banner-badge">Fine Dining</span>
              <span class="banner-badge">Chef's Table</span>
              <span class="banner-badge">Private Events</span>
              <span class="banner-badge">Wine Cellar</span>
              <span class="banner-badge">Live Music</span>
            </div>
          </div>

          <!-- Awards row -->
          <div class="banner-reveal" style="animation-delay:0.95s;">
            <div style="display:flex; gap:32px; justify-content:center; flex-wrap:wrap; margin:8px 0 0;">
              <div style="text-align:center;">
                <div style="font-family:'Cormorant Garamond',Georgia,serif; font-size:26px; font-weight:400; color:#D4A853;">★★★</div>
                <div style="font-family:'Lato',sans-serif; font-size:9px; font-weight:300; letter-spacing:2px; color:#8A7355; text-transform:uppercase; margin-top:4px;">Michelin Rated</div>
              </div>
              <div style="width:1px; background:rgba(212,168,83,0.2); align-self:stretch;"></div>
              <div style="text-align:center;">
                <div style="font-family:'Cormorant Garamond',Georgia,serif; font-size:26px; font-weight:400; color:#D4A853;">#1</div>
                <div style="font-family:'Lato',sans-serif; font-size:9px; font-weight:300; letter-spacing:2px; color:#8A7355; text-transform:uppercase; margin-top:4px;">Best in Mumbai</div>
              </div>
              <div style="width:1px; background:rgba(212,168,83,0.2); align-self:stretch;"></div>
              <div style="text-align:center;">
                <div style="font-family:'Cormorant Garamond',Georgia,serif; font-size:26px; font-weight:400; color:#D4A853;">15+</div>
                <div style="font-family:'Lato',sans-serif; font-size:9px; font-weight:300; letter-spacing:2px; color:#8A7355; text-transform:uppercase; margin-top:4px;">Years of Excellence</div>
              </div>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="banner-reveal" style="animation-delay:1.1s;">
            <div class="banner-cta-group">
              <a href="#/menu" class="banner-btn-primary">Explore Our Menu</a>
              <a href="#/reservation" class="banner-btn-secondary">Reserve a Table</a>
            </div>
          </div>

          <!-- Scroll indicator -->
          <div style="margin-top:64px;">
            <div class="scroll-indicator">
              <span style="font-family:'Lato',sans-serif; font-size:9px; font-weight:300; letter-spacing:3px; color:#5A4A35; text-transform:uppercase;">Scroll</span>
              <div class="scroll-dot"></div>
            </div>
          </div>

        </div>

        <!-- Bottom strip -->
        <div class="banner-strip">
          <div style="font-family:'Lato',sans-serif; font-size:10px; font-weight:300; letter-spacing:2px; color:#6B5A3E; text-transform:uppercase;">Mumbai · India</div>
          <div style="font-family:'Lato',sans-serif; font-size:10px; font-weight:300; letter-spacing:2px; color:#6B5A3E; text-transform:uppercase; display:flex; align-items:center; gap:8px;">
            <span style="width:6px; height:6px; background:#D4A853; border-radius:50%; display:inline-block; animation:scrollPulse 2s ease-in-out infinite;"></span>
            Open Today · 12pm – 11pm
          </div>
          <div style="font-family:'Lato',sans-serif; font-size:10px; font-weight:300; letter-spacing:2px; color:#6B5A3E; text-transform:uppercase;">+91 93212 01445</div>
        </div>
      </div>
    `;
return page;
  };
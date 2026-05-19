document.addEventListener('DOMContentLoaded', () => {
  // Page Transition Fade In on Load
  const overlay = document.querySelector('.page-transition-overlay');
  if (overlay) {
    // Small delay to ensure styles are painted
    setTimeout(() => {
      overlay.style.opacity = '0';
    }, 50);
  }

  // Navigation Logic
  const topNav = document.querySelector('.top-nav');
  
  // Handle nav background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      topNav.classList.add('scrolled');
    } else {
      topNav.classList.remove('scrolled');
    }
  });

  // Mobile Menu
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  
  if (mobileBtn && mobileOverlay) {
    mobileBtn.addEventListener('click', () => {
      mobileOverlay.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (mobileOverlay.classList.contains('active')) {
        icon.classList.remove('ti-menu-2');
        icon.classList.add('ti-x');
      } else {
        icon.classList.remove('ti-x');
        icon.classList.add('ti-menu-2');
      }
    });
  }

  // Page Transition on Link Click
  const navLinks = document.querySelectorAll('a[href$=".html"], a[href="index.html"], a[href="/"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Don't intercept target="_blank" or external links
      if (link.target === '_blank' || link.href.indexOf(window.location.host) === -1) return;
      
      e.preventDefault();
      const targetUrl = link.href;
      
      // Close mobile menu if open
      if (mobileOverlay && mobileOverlay.classList.contains('active')) {
        mobileOverlay.classList.remove('active');
      }

      // Trigger fade out
      if (overlay) {
        overlay.style.opacity = '1';
        
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 300); // Wait for transition
      } else {
        window.location.href = targetUrl;
      }
    });
  });
});

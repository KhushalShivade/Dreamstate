// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Navigation
  initNavigation();

  // Initialize Animations
  initScrollAnimations();
  initCounters();

  // Handle Hero Auto-advance
  initHeroAutoAdvance();
});

function initNavigation() {
  const sections = document.querySelectorAll('section');
  const navDots = document.querySelectorAll('.nav-dot');
  const progressBar = document.querySelector('.progress-bar');

  // Update progress bar on scroll
  window.addEventListener('scroll', () => {
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
    
    if (progressBar) {
      progressBar.style.width = scrolled;
    }
  });

  // Active state for side navigation based on scroll position
  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => updateNav(index),
      onEnterBack: () => updateNav(index)
    });
  });

  function updateNav(index) {
    navDots.forEach(dot => dot.classList.remove('active'));
    if (navDots[index]) {
      navDots[index].classList.add('active');
    }
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initScrollAnimations() {
  // Reveal elements on scroll
  const revealElements = document.querySelectorAll('.gsap-reveal');
  
  revealElements.forEach(element => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 85%", // Reveal when element is 85% down the viewport
        toggleActions: "play none none reverse"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // Specific animation for tiers
  const tiers = document.querySelectorAll('.tier-card');
  if (tiers.length > 0) {
    gsap.from(tiers, {
      scrollTrigger: {
        trigger: ".tiers-grid",
        start: "top 80%"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }

  // Luxury gallery stagger
  const luxuryBrands = document.querySelectorAll('.luxury-brand');
  if (luxuryBrands.length > 0) {
    gsap.from(luxuryBrands, {
      scrollTrigger: {
        trigger: ".luxury-gallery",
        start: "top 80%"
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });
  }
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';
    
    ScrollTrigger.create({
      trigger: counter,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 }, // Snap to integer or decimals based on value
          ease: "power2.out",
          onUpdate: function() {
            // Re-apply prefix and suffix during animation
            const currentVal = Math.round(this.targets()[0].innerHTML * 10) / 10;
            counter.innerHTML = `${prefix}${currentVal}${suffix}`;
          },
          onComplete: () => {
            counter.innerHTML = `${prefix}${target}${suffix}`; // Ensure exact final value
          }
        });
      }
    });
  });
}

function initHeroAutoAdvance() {
  const heroSection = document.getElementById('hero');
  const section01 = document.getElementById('why');
  
  if (heroSection && section01) {
    let hasInteracted = false;
    
    // Mark interaction on scroll, click, or keypress
    const markInteraction = () => { hasInteracted = true; };
    window.addEventListener('scroll', markInteraction, { once: true });
    window.addEventListener('click', markInteraction, { once: true });
    window.addEventListener('keydown', markInteraction, { once: true });

    // Auto advance after 8 seconds
    setTimeout(() => {
      if (!hasInteracted && window.scrollY < 100) {
        window.scrollTo({
          top: section01.offsetTop,
          behavior: 'smooth'
        });
      }
    }, 8000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Set up Intersection Observer for reveal animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add active class to trigger CSS animation
        entry.target.classList.add('active');
        // Unobserve after animating to only run once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Find all elements to reveal
  const revealElements = document.querySelectorAll('.reveal, .reveal-img');
  
  revealElements.forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter-val');
  
  if (counters.length === 0) return;

  const animateCounter = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        // Format based on whether target has decimals
        if (target % 1 !== 0) {
          counter.innerText = current.toFixed(1);
        } else {
          counter.innerText = Math.floor(current);
        }
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  };

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
});

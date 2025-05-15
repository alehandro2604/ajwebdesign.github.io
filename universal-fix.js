// Universal fix for both mobile and desktop
(function() {
  // Detect mobile more reliably
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  window.isMobile = isMobile;
  
  console.log('Device detection:', isMobile ? 'Mobile' : 'Desktop');
  console.log('Screen dimensions:', window.innerWidth, 'x', window.innerHeight);
  
  // Force all elements to be visible
  function forceVisibility() {
    const allElements = document.querySelectorAll('body *');
    allElements.forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    });
    
    // Specifically target common animation targets
    const animatedElements = document.querySelectorAll(
      'h1, h2, h3, p, .cta-btn, .service-card, .project-card, .stagger-item, ' +
      '.text-reveal, .services-grid, .projects-showcase, .fade-in-section, ' +
      '.stagger-container, .skill-item, .timeline-item, .education-item, nav, ' +
      '.hero-content, .about-content, .projects-grid, .contact-container'
    );
    
    animatedElements.forEach(el => {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
      el.style.transform = 'none';
      
      // For grid/flex containers
      if (getComputedStyle(el).display.includes('grid') || getComputedStyle(el).display.includes('flex')) {
        el.style.display = getComputedStyle(el).display;
      } else if (el.tagName.toLowerCase() === 'div') {
        el.style.display = 'block';
      }
    });
    
    // Ensure nav is visible
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.display = 'flex';
      nav.style.opacity = '1';
      nav.style.visibility = 'visible';
      nav.style.zIndex = '1000';
    }
  }
  
  // Apply CSS animations for mobile
  function applyCssAnimations() {
    if (!isMobile) return;
    
    console.log('Applying CSS animations for mobile');
    
    // Apply to headings
    document.querySelectorAll('h1').forEach((el, i) => {
      el.classList.add('mobile-slide-left', `mobile-stagger-${i+1}`);
    });
    
    document.querySelectorAll('h2').forEach((el, i) => {
      el.classList.add('mobile-slide-left', `mobile-stagger-${i+1}`);
    });
    
    document.querySelectorAll('h3').forEach((el, i) => {
      el.classList.add('mobile-fade-in', `mobile-stagger-${i % 5 + 1}`);
    });
    
    // Apply to paragraphs
    document.querySelectorAll('p').forEach((el, i) => {
      el.classList.add('mobile-fade-in', `mobile-stagger-${i % 5 + 1}`);
    });
    
    // Apply to buttons
    document.querySelectorAll('.cta-btn, .project-btn, .service-link, button').forEach((el, i) => {
      el.classList.add('mobile-scale-in', `mobile-stagger-${i % 5 + 1}`);
    });
    
    // Apply to cards
    document.querySelectorAll('.service-card, .project-card, .project-item, .skill-item, .timeline-item, .education-item').forEach((el, i) => {
      el.classList.add('mobile-fade-in', `mobile-stagger-${i % 5 + 1}`);
    });
    
    // Apply to sections
    document.querySelectorAll('section').forEach((el, i) => {
      el.style.opacity = '1'; // Ensure sections are visible
    });
  }
  
  // Run immediately
  forceVisibility();
  
  // Run again when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - ensuring visibility');
    forceVisibility();
    
    // Apply CSS animations for mobile
    if (isMobile) {
      applyCssAnimations();
    } else if (typeof gsap !== 'undefined') {
      // Use GSAP for desktop
      console.log('Using GSAP for desktop animations');
      
      // Register ScrollTrigger if available
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }
      
      // Desktop animations
      gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            once: true
          }
        });
      });
    }
  });
  
  // Run one more time after everything is loaded
  window.addEventListener('load', function() {
    console.log('Window loaded - final visibility check');
    forceVisibility();
    
    // Apply CSS animations again for mobile
    if (isMobile) {
      applyCssAnimations();
    }
    
    // Force refresh ScrollTrigger if available for desktop
    if (!isMobile && typeof ScrollTrigger !== 'undefined') {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  });
})();


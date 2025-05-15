// Mobile compatibility fixes
document.addEventListener('DOMContentLoaded', function() {
  console.log('Mobile fix script loaded');
  
  // Debug info
  console.log('Document ready state:', document.readyState);
  console.log('Window inner dimensions:', window.innerWidth, 'x', window.innerHeight);
  
  // Force all animation elements to be visible immediately
  const animatedElements = document.querySelectorAll(
    'h1, h2, h3, p, .cta-btn, .service-card, .project-card, .stagger-item, ' +
    '.text-reveal, .services-grid, .projects-showcase, .fade-in-section, ' +
    '.stagger-container, .skill-item, .timeline-item, .education-item'
  );
  
  console.log('Found animated elements:', animatedElements.length);
  
  animatedElements.forEach(el => {
    // Force visibility immediately
    el.style.opacity = '1';  
    el.style.visibility = 'visible';
    el.style.display = el.tagName.toLowerCase() === 'div' ? 'block' : '';
  });
  
  // Ensure nav is visible
  const nav = document.querySelector('nav');
  if (nav) {
    console.log('Nav found, forcing display');
    nav.style.display = 'flex';
    nav.style.opacity = '1';
    nav.style.visibility = 'visible';
  } else {
    console.error('Nav element not found');
  }
  
  // Ensure GSAP is available
  if (typeof gsap !== 'undefined') {
    console.log('GSAP is loaded and available');
    window.gsapDisabled = false;
  } else {
    console.error('GSAP not loaded!');
  }
});

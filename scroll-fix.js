// Scroll fix for desktop
document.addEventListener('DOMContentLoaded', function() {
  // Detect if desktop
  const isDesktop = window.innerWidth > 768;
  
  if (isDesktop) {
    // Force smooth scrolling with JS fallback
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      });
    });
    
    // Fix for stuck scrolling
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      
      const st = window.pageYOffset || document.documentElement.scrollTop;
      
      // Detect if scroll is stuck
      scrollTimeout = setTimeout(() => {
        if (st === lastScrollTop && st !== 0 && st !== document.body.scrollHeight - window.innerHeight) {
          // Force a small scroll to unstick
          window.scrollBy(0, 1);
          setTimeout(() => window.scrollBy(0, -1), 10);
        }
      }, 300);
      
      lastScrollTop = st <= 0 ? 0 : st;
    }, false);
  }
});
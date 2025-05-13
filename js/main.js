// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// GSAP animations
gsap.from('nav', {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: 'power3.out',
  onComplete: function() {
    // Force nav to be visible after animation
    document.querySelector('nav').style.opacity = 1;
    document.querySelector('nav').style.transform = 'translateY(0)';
  }
});

gsap.from('h1', {
  opacity: 0,
  x: -100,
  duration: 1,
  delay: 0.5,
  ease: 'power3.out',
  onComplete: () => gsap.to('h1', { opacity: 1 })
});

gsap.from('h2', {
  opacity: 0,
  x: -100,
  duration: 1,
  delay: 0.7,
  ease: 'power3.out',
  onComplete: () => gsap.to('h2', { opacity: 1 })
});

gsap.from('p', {
  opacity: 0,
  x: -100,
  duration: 1,
  delay: 0.9,
  ease: 'power3.out',
  onComplete: () => gsap.to('p', { opacity: 1 })
});

gsap.from('.cta-btn', {
  opacity: 0,
  x: -100,
  duration: 1,
  delay: 1.1,
  ease: 'power3.out',
  onComplete: () => gsap.to('.cta-btn', { opacity: 1 })
});

// 3D background with Three.js - only initialize on desktop
if (window.innerWidth > 768) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 2 / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth / 2, window.innerHeight);
  
  const heroElement = document.getElementById('hero-3d');
  if (heroElement) {
    heroElement.appendChild(renderer.domElement);
    
    // Create a sphere with custom shader material
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x6c63ff,
      metalness: 0.7,
      roughness: 0.2,
      wireframe: true
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Add lights
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.z = 8;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.005;
      sphere.rotation.x += 0.002;
      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / 2 / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
    });
  }
} else {
  // For mobile, just hide the element
  const heroElement = document.getElementById('hero-3d');
  if (heroElement) {
    heroElement.style.display = 'none';
  }
}

// Navigation enhancements

// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' && linkPage === 'index.html') {
      link.classList.add('active');
    }
  });
});

// Navigation scroll effect with threshold
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 30) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

// Mobile menu toggle with animation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  
  // Prevent scrolling when menu is open
  document.body.style.overflow = menuToggle.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
const navItems = document.querySelectorAll('.nav-links ul li a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// Newsletter subscription
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.getElementById('newsletter-form');
  const subscriptionMessage = document.getElementById('subscription-message');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('subscriber-email').value;
      
      // Show loading state
      subscriptionMessage.textContent = 'Subscribing...';
      subscriptionMessage.style.color = '#6c63ff';
      
      // Simulate sending data to server (replace with actual API call)
      setTimeout(() => {
        // In a real implementation, you would send this data to your server or email service
        sendSubscriptionToEmail(email);
        
        // Show success message
        subscriptionMessage.textContent = 'Thank you for subscribing!';
        subscriptionMessage.style.color = '#4CAF50';
        
        // Reset form
        newsletterForm.reset();
      }, 1500);
    });
  }
});

// Function to send subscription to email service
function sendSubscriptionToEmail(email) {
  // In a production environment, you would replace this with an actual API call
  // to your backend service or a third-party email service like Mailchimp, SendGrid, etc.
  
  console.log('New subscription:', email);
  
  // Example implementation using fetch and a hypothetical API endpoint:
  /*
  fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
    subscriptionMessage.textContent = 'Something went wrong. Please try again.';
    subscriptionMessage.style.color = '#f44336';
  });
  */
}

// GSAP animation for footer elements
gsap.registerPlugin(ScrollTrigger);

gsap.from('.footer-info, .footer-newsletter', {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.site-footer',
    start: 'top 80%'
  }
});

// Update ScrollSmoother configuration
if (typeof ScrollSmoother !== 'undefined') {
  const smoother = ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    normalizeScroll: true,
    smoothTouch: 0, // Disable on touch devices
    ignoreMobileResize: true,
    allowNestedScroll: true,
    preventDefault: true
  });
  
  // Force update on window resize to prevent sticking
  window.addEventListener('resize', () => {
    setTimeout(() => {
      smoother.refresh();
    }, 200);
  });
}



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

// Make sure DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // GSAP animations
  gsap.registerPlugin(ScrollTrigger);

  // Debug info
  console.log('Skills found:', document.querySelectorAll('.skill').length);
  console.log('Timeline items found:', document.querySelectorAll('.timeline-item').length);
  console.log('Education items found:', document.querySelectorAll('.education-item').length);

  // Force display of paragraph elements
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(paragraph => {
    paragraph.style.display = 'block';
    paragraph.style.opacity = '1';
    paragraph.style.visibility = 'visible';
  });

  // Force display of skills
  const skills = document.querySelectorAll('.skill');
  skills.forEach(skill => {
    skill.style.display = 'inline-block';
    skill.style.opacity = '1';
  });

  // Force display of timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.style.display = 'block';
    item.style.opacity = '1';
  });

  // Force display of education items
  const educationItems = document.querySelectorAll('.education-item');
  educationItems.forEach(item => {
    item.style.display = 'block';
    item.style.opacity = '1';
  });

  // Hero animation
  gsap.from('.about-hero h1', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  // About content animations
  gsap.from('.about-image', {
    x: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 80%',
      once: true
    }
  });

  gsap.from('.about-text h2, .about-text h3', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.about-text',
      start: 'top 80%',
      once: true
    }
  });

  gsap.from('.about-text p', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.about-text p',
      start: 'top 80%',
      once: true
    }
  });

  // Skills animations with delay to ensure they're visible
  setTimeout(() => {
    gsap.from('.skill', {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.skills',
        start: 'top 80%',
        once: true
      }
    });
  }, 500);

  // Timeline animations
  setTimeout(() => {
    // Make timeline items visible without animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.style.opacity = '1';
      item.style.transform = 'none';
      item.style.display = 'block';
    });
    
    // Make timeline details visible without animations
    const timelineDetails = document.querySelectorAll('.timeline-details li');
    timelineDetails.forEach(detail => {
      detail.style.opacity = '1';
      detail.style.transform = 'none';
      detail.style.display = 'block';
    });
  }, 500);

  // Education section animations
  setTimeout(() => {
    gsap.from('.education-item', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.education-grid',
        start: 'top 80%',
        once: true
      }
    });
  }, 500);

  // CTA section animations
  gsap.from('.cta-content', {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top 80%',
      once: true
    }
  });

  // Add Three.js background
  setupThreeJsBackground();
});

// Three.js background setup
function setupThreeJsBackground() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  const container = document.getElementById('about-3d');
  if (container) {
    container.appendChild(renderer.domElement);
  } else {
    console.error('3D container not found');
    return;
  }

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  const posArray = new Float32Array(particlesCount * 3);

  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x6c63ff,
    transparent: true,
    opacity: 0.8
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

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

// Navigation scroll effect with threshold
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 30) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

// Add this to your existing about.js file
document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Services section animations
  const serviceItems = document.querySelectorAll('.service-item');
  
  // Set initial state
  gsap.set(serviceItems, {
    opacity: 0,
    y: 50
  });
  
  // Create staggered animation for service items
  gsap.to(serviceItems, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".services-section",
      start: "top 75%",
      toggleActions: "play none none none"
    }
  });
  
  // Add a subtle parallax effect to the section background
  gsap.to('.services-section::before', {
    y: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".services-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

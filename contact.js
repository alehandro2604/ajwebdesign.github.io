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
gsap.registerPlugin(ScrollTrigger);

gsap.from('.contact-hero h1', {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});

gsap.from('.contact-info h2, .contact-info > p', {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.contact-info',
    start: 'top 80%'
  }
});

gsap.from('.contact-item', {
  x: -50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.contact-details',
    start: 'top 80%'
  }
});

// Ensure social links are visible and properly aligned
document.addEventListener('DOMContentLoaded', function() {
  // Force immediate display of all social links
  const socialLinks = document.querySelectorAll('.social-link');
  const socialLinksContainer = document.querySelector('.social-links');
  
  if (socialLinksContainer) {
    socialLinksContainer.style.display = 'flex';
    socialLinksContainer.style.alignItems = 'center';
    socialLinksContainer.style.opacity = '1';
    socialLinksContainer.style.visibility = 'visible';
  }
  
  // Set fixed dimensions and styling for all links
  socialLinks.forEach(link => {
    link.style.display = 'flex';
    link.style.alignItems = 'center';
    link.style.justifyContent = 'center';
    link.style.height = '50px';
    link.style.opacity = '1';
    link.style.visibility = 'visible';
  });
});

// Modify GSAP animations to prevent interference with visibility
window.addEventListener('load', function() {
  // Delay GSAP animations to ensure elements are visible first
  setTimeout(() => {
    // GSAP animations for social links - modified to not affect visibility
    gsap.from('.social-link', {
      y: 30,
      scale: 0.95,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.social-links',
        start: 'top 90%',
        once: true
      }
    });
  }, 100);
});

gsap.from('.contact-form', {
  x: 50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.contact-form',
    start: 'top 80%'
  }
});

gsap.from('.form-group', {
  y: 30,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.contact-form',
    start: 'top 70%'
  }
});

// 3D background with Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('contact-3d').appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;

const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  color: 0x6c63ff,
  transparent: true,
  opacity: 0.5
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  particlesMesh.rotation.y += 0.001;
  particlesMesh.rotation.x += 0.0005;
  renderer.render(scene, camera);
}
animate();

// Resize handler to maintain alignment
window.addEventListener('resize', function() {
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.style.height = '50px';
    link.style.display = 'flex';
    link.style.alignItems = 'center';
    link.style.justifyContent = 'center';
  });
});

// Form submission
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Add form submission logic here
  alert('Thank you for your message! I will get back to you soon.');
  form.reset();
});





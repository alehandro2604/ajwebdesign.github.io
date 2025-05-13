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

// Page load animations
const tl = gsap.timeline();

tl.from('nav', {
  y: -50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
}).from('.glitch-text', {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
}, "-=0.5").from('.subtitle', {
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
}, "-=0.7").from('.scroll-indicator', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
}, "-=0.5");

// Floating down arrow animation
gsap.to('.arrow', {
  y: 10,
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut'
});

// Add scroll functionality to the arrow
document.querySelector('.arrow').addEventListener('click', () => {
  const skillsSection = document.querySelector('.skills-showcase');
  window.scrollTo({
    top: skillsSection.offsetTop,
    behavior: 'smooth'
  });
});

// Scroll animations
gsap.from('.skills-container', {
  y: 100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.skills-showcase',
    start: 'top 80%'
  }
});

gsap.from('.skill-item', {
  scale: 0,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.skills-container',
    start: 'top 80%'
  }
});

// Add hover animation for skill items
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, {
      y: -5,
      boxShadow: '0 10px 20px rgba(108, 99, 255, 0.3)',
      backgroundColor: 'rgba(108, 99, 255, 0.2)',
      duration: 0.3
    });
  });
  
  item.addEventListener('mouseleave', () => {
    gsap.to(item, {
      y: 0,
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(108, 99, 255, 0.1)',
      duration: 0.3
    });
  });
});

// Make sure project cards are visible
document.addEventListener('DOMContentLoaded', function() {
  // Force project cards to be visible
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach(item => {
    item.style.display = 'flex';
    item.style.opacity = '1';
  });
  
  // Debug info
  console.log('Project items found:', projectItems.length);
  
  // Ensure projects grid is visible
  const projectsGrid = document.querySelector('.projects-grid');
  if (projectsGrid) {
    projectsGrid.style.display = 'grid';
    console.log('Projects grid style applied');
  }
});

// Scroll animations for projects
gsap.from('.project-item', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.projects-grid',
    start: 'top 80%',
    once: true
  }
});

gsap.from('.cta-content', {
  y: 50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.cta-section',
    start: 'top 80%'
  }
});

// Three.js background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('projects-3d').appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 15;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: 0x6c63ff,
  transparent: true,
  opacity: 0.7
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

// Mouse movement effect on particles
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation
function animate() {
  requestAnimationFrame(animate);
  
  particlesMesh.rotation.y += 0.001;
  particlesMesh.rotation.x += 0.0005;
  
  // Subtle movement based on mouse position
  particlesMesh.position.x += (mouseX * 0.01 - particlesMesh.position.x) * 0.05;
  particlesMesh.position.y += (mouseY * 0.01 - particlesMesh.position.y) * 0.05;
  
  renderer.render(scene, camera);
}
animate();

// Project card hover effects
const projectItems = document.querySelectorAll('.project-item');

projectItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    gsap.to(item, {
      y: -15,
      boxShadow: '0 25px 50px rgba(108, 99, 255, 0.3)',
      borderColor: 'rgba(108, 99, 255, 0.3)',
      duration: 0.5
    });
    
    gsap.to(item.querySelector('.project-image'), {
      scale: 1.1,
      duration: 0.5
    });
    
    gsap.to(item.querySelector('.project-btn'), {
      backgroundColor: '#8a80ff',
      scale: 1.05,
      duration: 0.3
    });
  });
  
  item.addEventListener('mouseleave', () => {
    gsap.to(item, {
      y: 0,
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
      borderColor: 'rgba(255, 255, 255, 0.05)',
      duration: 0.5
    });
    
    gsap.to(item.querySelector('.project-image'), {
      scale: 1,
      duration: 0.5
    });
    
    gsap.to(item.querySelector('.project-btn'), {
      backgroundColor: 'var(--primary)',
      scale: 1,
      duration: 0.3
    });
  });
});

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
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






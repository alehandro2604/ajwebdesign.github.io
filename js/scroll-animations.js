/**
 * Advanced Scroll Animations
 * Using GSAP, Three.js, and Anime.js
 * 
 * This file contains various scroll-triggered animations
 * that can be applied to different elements on the website.
 */

// Make sure required libraries are loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if required libraries are loaded
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded. Please include the GSAP library.');
    return;
  }
  
  if (typeof THREE === 'undefined') {
    console.error('Three.js is not loaded. Please include the Three.js library.');
    return;
  }
  
  if (typeof anime === 'undefined') {
    console.error('Anime.js is not loaded. Please include the Anime.js library.');
    return;
  }
  
  // Initialize animations immediately
  initializeAnimations();
  
  // Also initialize on load to ensure all elements are properly rendered
  window.addEventListener('load', initializeAnimations);
});

function initializeAnimations() {
  console.log('Initializing advanced scroll animations');
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  // Force ScrollTrigger refresh to ensure proper positioning
  ScrollTrigger.refresh();
  
  // Initialize all animations
  initGSAPAnimations();
  initThreeJSEffects();
  initAnimeJSAnimations();
  
  // Add scroll event listener for performance optimization
  window.addEventListener('scroll', debounce(checkScrollPosition, 10));
  
  // Manually trigger scroll event to activate visible animations
  window.dispatchEvent(new Event('scroll'));
}

// ===== GSAP Animations =====
function initGSAPAnimations() {
  // Fade-in animation for sections
  gsap.utils.toArray('.fade-in-section').forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 90%', // Trigger earlier
        end: 'bottom 10%',
        toggleActions: 'play none none none', // Play on enter, no reset
        once: false // Allow animation to replay
      }
    });
  });
  
  // Staggered items animation
  gsap.utils.toArray('.stagger-container').forEach(container => {
    const items = container.querySelectorAll('.stagger-item');
    
    gsap.from(items, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: container,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none none',
        once: false
      }
    });
  });
  
  // Text reveal animation
  gsap.utils.toArray('.text-reveal').forEach(text => {
    // Create a wrapper for the text
    const wrapper = document.createElement('div');
    wrapper.classList.add('text-reveal-wrapper');
    wrapper.style.overflow = 'hidden';
    
    // Clone the text element
    const clone = text.cloneNode(true);
    
    // Replace the original element with the wrapper
    text.parentNode.replaceChild(wrapper, text);
    wrapper.appendChild(clone);
    
    // Animate the text
    gsap.from(clone, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 90%',
        end: 'bottom 10%',
        toggleActions: 'play none none none',
        once: false
      }
    });
  });
  
  // Parallax effect
  gsap.utils.toArray('.parallax-section').forEach(section => {
    const parallaxElements = section.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.1;
      
      gsap.to(element, {
        y: () => -window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5 // Smoother scrubbing
        }
      });
    });
  });
  
  // Horizontal scroll for galleries
  gsap.utils.toArray('.horizontal-scroll').forEach(gallery => {
    const items = gallery.querySelectorAll('.gallery-item');
    const totalWidth = Array.from(items).reduce((width, item) => width + item.offsetWidth, 0);
    
    gsap.to(items, {
      x: () => -totalWidth + gallery.offsetWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: gallery,
        start: 'top center',
        end: () => `+=${totalWidth}`,
        scrub: 0.5,
        pin: true
      }
    });
  });
}

// ===== Three.js Effects =====
function initThreeJSEffects() {
  // Particle wave effect
  const particleContainers = document.querySelectorAll('.particle-wave');
  
  particleContainers.forEach(container => {
    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
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
    
    // Animation
    let animationFrame;
    let isVisible = false;
    
    // Scroll trigger for Three.js animation
    ScrollTrigger.create({
      trigger: container,
      start: 'top 90%',
      end: 'bottom 10%',
      onEnter: () => { isVisible = true; animate(); },
      onLeave: () => { isVisible = false; cancelAnimationFrame(animationFrame); },
      onEnterBack: () => { isVisible = true; animate(); },
      onLeaveBack: () => { isVisible = false; cancelAnimationFrame(animationFrame); }
    });
    
    function animate() {
      if (!isVisible) return;
      
      animationFrame = requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.001;
      particlesMesh.rotation.y += 0.002;
      
      // Wave effect
      const positions = particlesGeometry.attributes.position.array;
      const time = Date.now() * 0.0005;
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        
        // Apply sine wave
        positions[i3 + 2] = Math.sin((x + time) * 0.5) * 0.5 + Math.sin((y + time) * 0.5) * 0.5;
      }
      
      particlesGeometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    }
    
    // Initial render
    renderer.render(scene, camera);
    
    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
  });
  
  // 3D object rotation on scroll
  const objectContainers = document.querySelectorAll('.object-rotate');
  
  objectContainers.forEach(container => {
    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    
    // Create object (cube, sphere, etc.)
    let object;
    const objectType = container.dataset.object || 'cube';
    
    if (objectType === 'cube') {
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshStandardMaterial({
        color: 0x6c63ff,
        metalness: 0.7,
        roughness: 0.2,
        wireframe: true
      });
      object = new THREE.Mesh(geometry, material);
    } else if (objectType === 'sphere') {
      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0x6c63ff,
        metalness: 0.7,
        roughness: 0.2,
        wireframe: true
      });
      object = new THREE.Mesh(geometry, material);
    } else if (objectType === 'torus') {
      const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
      const material = new THREE.MeshStandardMaterial({
        color: 0x6c63ff,
        metalness: 0.7,
        roughness: 0.2,
        wireframe: true
      });
      object = new THREE.Mesh(geometry, material);
    }
    
    scene.add(object);
    
    // Add lights
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    camera.position.z = 5;
    
    // Scroll-based rotation
    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress;
        object.rotation.x = progress * Math.PI * 2;
        object.rotation.y = progress * Math.PI * 4;
        renderer.render(scene, camera);
      }
    });
    
    // Initial render
    renderer.render(scene, camera);
    
    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = container.offsetWidth / container.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.render(scene, camera);
    });
  });
}

// ===== Anime.js Animations =====
function initAnimeJSAnimations() {
  // SVG path drawing
  document.querySelectorAll('.svg-draw').forEach(svg => {
    const paths = svg.querySelectorAll('path');
    
    paths.forEach(path => {
      // Get the length of the path
      const pathLength = path.getTotalLength();
      
      // Make the path invisible initially
      path.style.strokeDasharray = pathLength;
      path.style.strokeDashoffset = pathLength;
      
      ScrollTrigger.create({
        trigger: svg,
        start: 'top 90%',
        onEnter: () => {
          anime({
            targets: path,
            strokeDashoffset: [pathLength, 0],
            duration: 2000,
            easing: 'easeInOutSine',
            delay: 300
          });
        },
        onEnterBack: () => {
          anime({
            targets: path,
            strokeDashoffset: [pathLength, 0],
            duration: 2000,
            easing: 'easeInOutSine',
            delay: 300
          });
        }
      });
    });
  });
  
  // Morphing shapes
  document.querySelectorAll('.morph-container').forEach(container => {
    const shapes = container.querySelectorAll('.morph-shape');
    
    if (shapes.length < 2) return;
    
    // Get all the points from the shapes
    const points = [];
    shapes.forEach(shape => {
      points.push(shape.getAttribute('points'));
      
      // Hide all shapes except the first one
      if (shape !== shapes[0]) {
        shape.style.display = 'none';
      }
    });
    
    let currentIndex = 0;
    let animationRunning = false;
    
    ScrollTrigger.create({
      trigger: container,
      start: 'top 90%',
      end: 'bottom 10%',
      onEnter: startMorphAnimation,
      onEnterBack: startMorphAnimation,
      onLeave: stopMorphAnimation,
      onLeaveBack: stopMorphAnimation
    });
    
    function startMorphAnimation() {
      if (!animationRunning) {
        animationRunning = true;
        animateMorph();
      }
    }
    
    function stopMorphAnimation() {
      animationRunning = false;
    }
    
    function animateMorph() {
      if (!animationRunning) return;
      
      const currentShape = shapes[currentIndex];
      const nextIndex = (currentIndex + 1) % shapes.length;
      const nextShape = shapes[nextIndex];
      
      // Show the next shape
      nextShape.style.display = '';
      
      anime({
        targets: currentShape,
        points: [
          { value: points[currentIndex] },
          { value: points[nextIndex] }
        ],
        duration: 2000,
        easing: 'easeInOutQuad',
        complete: function() {
          // Hide the current shape
          currentShape.style.display = 'none';
          
          // Update the current index
          currentIndex = nextIndex;
          
          // Continue the animation if still running
          if (animationRunning) {
            setTimeout(animateMorph, 1000);
          }
        }
      });
    }
  });
  
  // Text typing effect
  document.querySelectorAll('.typing-text').forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      onEnter: () => {
        anime({
          targets: element,
          innerHTML: [0, text.length].map(i => text.substring(0, i)),
          easing: 'steps(' + text.length + ')',
          duration: 2000,
          delay: 500
        });
      },
      onEnterBack: () => {
        anime({
          targets: element,
          innerHTML: [0, text.length].map(i => text.substring(0, i)),
          easing: 'steps(' + text.length + ')',
          duration: 2000,
          delay: 500
        });
      }
    });
  });
  
  // Staggered grid animation
  document.querySelectorAll('.grid-container').forEach(container => {
    const items = container.querySelectorAll('.grid-item');
    
    // Set initial state
    anime.set(items, {
      opacity: 0,
      translateY: 50
    });
    
    ScrollTrigger.create({
      trigger: container,
      start: 'top 90%',
      onEnter: () => {
        anime({
          targets: items,
          opacity: 1,
          translateY: 0,
          delay: anime.stagger(50, {grid: [Math.ceil(items.length/4), 4], from: 'center'}),
          duration: 800,
          easing: 'easeOutQuad'
        });
      },
      onEnterBack: () => {
        anime({
          targets: items,
          opacity: 1,
          translateY: 0,
          delay: anime.stagger(50, {grid: [Math.ceil(items.length/4), 4], from: 'center'}),
          duration: 800,
          easing: 'easeOutQuad'
        });
      }
    });
  });
}

// ===== Utility Functions =====

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Check scroll position for performance optimization
function checkScrollPosition() {
  // Update animations based on scroll position
  ScrollTrigger.update();
  
  // Check element visibility
  handleElementVisibility();
}

// Add CSS classes based on viewport visibility
function handleElementVisibility() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const isVisible = (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
    
    if (isVisible) {
      element.classList.add('is-visible');
    } else {
      element.classList.remove('is-visible');
    }
  });
}

// Export functions for use in other files
window.ScrollAnimations = {
  refresh: function() {
    ScrollTrigger.refresh();
  },
  initGSAPAnimations,
  initThreeJSEffects,
  initAnimeJSAnimations
};

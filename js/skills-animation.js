// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for window load
window.addEventListener('load', () => {
    console.log("Window loaded - initializing skills animation");
    
    // Get all skill items
    const skillItems = document.querySelectorAll('.skill-item');
    console.log("Found " + skillItems.length + " skill items");
    
    // Set initial state
    gsap.set(skillItems, {
        opacity: 0,
        y: 20
    });

    // Create staggered animation
    gsap.to(skillItems, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});
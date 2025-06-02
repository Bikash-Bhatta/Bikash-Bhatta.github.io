/*==================== toggle icon navbar and variables ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let navbarMenu = document.querySelector('.navbar ul');

/*==================== scroll sections active link ====================*/
window.onscroll = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar ul li');

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height) {
            // Remove active class from all menu items
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to current section's menu item
            const activeLink = document.querySelector(`.navbar ul li a[href*='#${id}']`);
            if (activeLink) {
                activeLink.parentElement.classList.add('active');
            }
        }
    });
    
    /*==================== sticky navbar ====================*/
    navbar.classList.toggle('sticky', window.scrollY > 100);
};

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded");
    console.log("Dynamic text element:", document.getElementById('dynamic-text'));
    console.log("Cursor element:", document.getElementById('cursor'));

    // Typewriter function directly inside the first (and only) DOMContentLoaded listener
    const typeWriter = function() {
        const roles = ["Researcher", "Coder", "AI/ML Engineer", "Cybersecurity Analyst"];
        const dynamicText = document.getElementById('dynamic-text');
        if (!dynamicText) {
            console.log("Dynamic text element not found");
            return;
        }
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                dynamicText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                dynamicText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at end
            } 
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 300; // Pause before new word
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing
        type();
    };

    // Only run typewriter if the elements exist
    if (document.getElementById('dynamic-text') && document.getElementById('cursor')) {
        typeWriter();
    }

    /*==================== scroll reveal ====================*/
    if (typeof ScrollReveal !== 'undefined') {
        // Initialize ScrollReveal
        const sr = ScrollReveal({
            distance: '60px',
            duration: 2500,
            delay: 400,
            reset: true
        });

        // About section reveal
        sr.reveal('.heading', { delay: 200, origin: 'top' });
        sr.reveal('.about-img', { delay: 500, origin: 'left' });
        sr.reveal('.about-content h3, .about-content p, .about-content .btn', { 
            delay: 600, 
            origin: 'right',
            interval: 200
        });

        // Skills section reveal
        sr.reveal('.skills-column', { 
            delay: 400,
            origin: 'bottom',
            interval: 200
        });

        // Projects section reveal
        sr.reveal('.project-box', { 
            delay: 300,
            origin: 'bottom',
            interval: 200,
            distance: '20px'
        });

        // Contact section reveal
        sr.reveal('.contact form', { 
            delay: 400,
            origin: 'bottom'
        });
        
        // Animate progress bars when they come into view
        const progressBars = document.querySelectorAll('.bar span');
        sr.reveal(progressBars, { 
            delay: 500,
            interval: 100,
            beforeReveal: (domEl) => {
                // Get the width from style attribute and set it to 0 initially
                const width = domEl.style.width;
                domEl.style.width = '0%';
                
                // Animate to the actual width
                setTimeout(() => {
                    domEl.style.width = width;
                }, 300);
            }
        });
    }
});

// Mobile Menu Toggle
if (menuIcon) {
    menuIcon.onclick = function() {
        console.log("Menu icon clicked");
        menuIcon.classList.toggle('bx-x');
        navbarMenu.classList.toggle('active');
    };
    
    // Add touch event for better mobile response
    menuIcon.addEventListener('touchend', function(e) {
        e.preventDefault();
        console.log("Menu icon touched");
        menuIcon.classList.toggle('bx-x');
        navbarMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbarMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Hide loading animation when page is fully loaded
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});
// Smooth scroll and expand effect for sections
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-item');
    const sections = document.querySelectorAll('.content');
    const burger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    // Show home section by default
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
    }
    
    // Burger menu toggle
    if (burger) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('is-active');
            navbarMenu.classList.toggle('is-active');
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Remove active class from all sections
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Close mobile menu if open
                if (burger && navbarMenu) {
                    burger.classList.remove('is-active');
                    navbarMenu.classList.remove('is-active');
                }
                
                // Scroll to the section smoothly
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add active class after a short delay to trigger the animation
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 100);
            }
        });
    });
    
    // Infographic modal functionality
    const infographicLink = document.getElementById('infographic-link');
    const infographicModal = document.getElementById('infographic-modal');
    const modalClose = infographicModal.querySelector('.modal-close');
    const modalBackground = infographicModal.querySelector('.modal-background');
    
    // Open modal
    if (infographicLink) {
        infographicLink.addEventListener('click', function(e) {
            e.preventDefault();
            infographicModal.classList.add('is-active');
        });
    }
    
    // Close modal when clicking the close button
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            infographicModal.classList.remove('is-active');
        });
    }
    
    // Close modal when clicking the background
    if (modalBackground) {
        modalBackground.addEventListener('click', function() {
            infographicModal.classList.remove('is-active');
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && infographicModal.classList.contains('is-active')) {
            infographicModal.classList.remove('is-active');
        }
    });
});

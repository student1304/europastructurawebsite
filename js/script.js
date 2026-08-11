// Europa Structura - Modern Interactive Experience

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Modal elements
    const infographicLink = document.getElementById('infographic-link');
    const modal = document.getElementById('infographic-modal');
    const modalClose = modal?.querySelector('.modal-close');
    const modalOverlay = modal?.querySelector('.modal-overlay');

    // ============================================
    // Header scroll effect
    // ============================================
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // ============================================
    // Mobile navigation
    // ============================================
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Update aria-expanded
            const isExpanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            nav?.classList.remove('active');
            navToggle?.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav?.contains(e.target) && !navToggle?.contains(e.target)) {
            navToggle?.classList.remove('active');
            nav?.classList.remove('active');
            navToggle?.setAttribute('aria-expanded', 'false');
        }
    });

    // ============================================
    // Smooth scroll for navigation
    // ============================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return;
            }

            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Hero buttons smooth scroll
    document.querySelectorAll('.hero-actions .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.getElementById(href.substring(1));
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Active section tracking
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ============================================
    // Scroll reveal animations
    // ============================================
    const revealElements = document.querySelectorAll(`
        .section:not(.hero) .section-header,
        .section:not(.hero) .about-text,
        .section:not(.hero) .feature-card,
        .section:not(.hero) .research-card,
        .section:not(.hero) .publications-card,
        .section:not(.hero) .partner-card,
        .section:not(.hero) .contact-card
    `);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ============================================
    // Modal functionality
    // ============================================
    function openModal() {
        modal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal?.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (infographicLink) {
        infographicLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // ============================================
    // Keyboard accessibility
    // ============================================
    // Allow Enter key to activate links styled as buttons
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.tagName !== 'A' && btn.tagName !== 'BUTTON') {
            btn.setAttribute('tabindex', '0');
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        }
    });

    // ============================================
    // Reduced motion support
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Remove scroll animations for users who prefer reduced motion
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
        });
        
        // Also remove hero animations
        document.querySelectorAll('.hero-content > *').forEach(el => {
            el.style.animation = 'none';
            el.style.opacity = '1';
        });
    }
});

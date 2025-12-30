// =====================================================
// SMASHBURGER TREVISO - JavaScript
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();

    // Header Scroll Effect
    initHeaderScroll();

    // Menu Navigation Active State
    initMenuNav();

    // Smooth Scroll for anchor links
    initSmoothScroll();
});

// =====================================================
// Mobile Menu
// =====================================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking on a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }
}

// =====================================================
// Header Scroll Effect
// =====================================================
function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (header && !header.classList.contains('header-solid')) {
        let lastScroll = 0;

        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }
}

// =====================================================
// Menu Navigation Active State
// =====================================================
function initMenuNav() {
    const menuNavItems = document.querySelectorAll('.menu-nav-item');
    const menuSections = document.querySelectorAll('.menu-section');

    if (menuNavItems.length && menuSections.length) {
        // Click handler
        menuNavItems.forEach(item => {
            item.addEventListener('click', function(e) {
                menuNavItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Scroll spy
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPos = window.pageYOffset + 200;

            menuSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            menuNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#' + current) {
                    item.classList.add('active');
                }
            });
        });
    }
}

// =====================================================
// Smooth Scroll
// =====================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const menuNav = document.querySelector('.menu-nav');
                const menuNavHeight = menuNav ? menuNav.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - menuNavHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =====================================================
// Animation on Scroll (Optional Enhancement)
// =====================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.menu-item, .menu-card, .contact-card').forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

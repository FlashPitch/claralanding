// ========================================
// ROOFING HOMEPAGE - JAVASCRIPT
// Excellence Toiture - Interactions & Animations
// ========================================

// ====== CONFIGURATION ======
const config = {
    animationDelay: 100,
    scrollThreshold: 0.1,
    testimonialAutoPlay: true,
    testimonialInterval: 5000,
};

// ====== UTILITY FUNCTIONS ======

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ====== NAVIGATION ======

class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav-header');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.mobileLinks = this.mobileMenu?.querySelectorAll('a');
        this.init();
    }

    init() {
        // Scroll effect on navigation
        window.addEventListener('scroll', throttle(() => {
            if (window.scrollY > 50) {
                this.nav?.classList.add('scrolled');
            } else {
                this.nav?.classList.remove('scrolled');
            }
        }, 100));

        // Mobile menu toggle
        this.mobileMenuToggle?.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on links
        this.mobileLinks?.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    toggleMobileMenu() {
        const isHidden = this.mobileMenu?.classList.contains('tw-hidden');
        if (isHidden) {
            this.mobileMenu?.classList.remove('tw-hidden');
            this.mobileMenuToggle.innerHTML = '<i class="bi bi-x"></i>';
        } else {
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        this.mobileMenu?.classList.add('tw-hidden');
        this.mobileMenuToggle.innerHTML = '<i class="bi bi-list"></i>';
    }
}

// ====== SCROLL ANIMATIONS ======

class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: config.scrollThreshold,
            rootMargin: '0px 0px -100px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate', 'visible');
                    }, index * config.animationDelay);
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe service cards
        document.querySelectorAll('.service-card').forEach(card => {
            this.observer.observe(card);
        });

        // Observe why cards
        document.querySelectorAll('.why-card').forEach(card => {
            this.observer.observe(card);
        });

        // Observe any fade-in elements
        document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
            this.observer.observe(element);
        });

        // Parallax effect for hero background
        this.initParallax();
    }

    initParallax() {
        const hero = document.querySelector('.hero-bg');
        if (!hero) return;

        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, 10));
    }
}

// ====== GALLERY FILTERS ======

class GalleryFilters {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterGallery(filter);
                this.updateActiveButton(btn);
            });
        });
    }

    filterGallery(filter) {
        this.galleryItems.forEach((item, index) => {
            const category = item.dataset.category;

            if (filter === 'all' || category === filter) {
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
                }, index * 50);
            } else {
                item.classList.add('hidden');
            }
        });
    }

    updateActiveButton(activeBtn) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}

// ====== TESTIMONIALS SLIDER ======

class TestimonialsSlider {
    constructor() {
        this.container = document.getElementById('testimonials-container');
        this.prevBtn = document.getElementById('testimonial-prev');
        this.nextBtn = document.getElementById('testimonial-next');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        if (!this.container || this.cards.length === 0) return;

        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => {
            this.prev();
            this.resetAutoPlay();
        });

        this.nextBtn?.addEventListener('click', () => {
            this.next();
            this.resetAutoPlay();
        });

        // Touch/swipe support
        this.initTouchSupport();

        // Auto-play
        if (config.testimonialAutoPlay) {
            this.startAutoPlay();
        }

        // Pause auto-play on hover
        this.container.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        this.container.addEventListener('mouseleave', () => {
            if (config.testimonialAutoPlay) {
                this.startAutoPlay();
            }
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.scrollToCard();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.scrollToCard();
    }

    scrollToCard() {
        const card = this.cards[this.currentIndex];
        if (card) {
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    initTouchSupport() {
        let startX = 0;
        let endX = 0;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }

    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
            this.resetAutoPlay();
        }
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, config.testimonialInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        if (config.testimonialAutoPlay) {
            this.startAutoPlay();
        }
    }
}

// ====== CONTACT FORM ======

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Add loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual endpoint)
        try {
            await this.simulateApiCall(data);
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            this.showError(error.message);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateApiCall(data) {
        return new Promise((resolve, reject) => {
            console.log('Form data:', data);
            setTimeout(() => {
                // Simulate success
                resolve({ success: true });

                // Uncomment to simulate error
                // reject(new Error('Erreur lors de l\'envoi'));
            }, 2000);
        });
    }

    showSuccess() {
        this.showNotification(
            'Message envoyé !',
            'Nous vous répondrons dans les 24h. Merci pour votre confiance.',
            'success'
        );
    }

    showError(message) {
        this.showNotification(
            'Erreur',
            message || 'Une erreur est survenue. Veuillez réessayer.',
            'error'
        );
    }

    showNotification(title, message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? '#10b981' : '#ef4444'};
                color: white;
                padding: 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                z-index: 9999;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            ">
                <div style="font-weight: bold; font-size: 1.125rem; margin-bottom: 0.5rem;">${title}</div>
                <div>${message}</div>
            </div>
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// ====== PERFORMANCE OPTIMIZATIONS ======

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();

        // Preload critical resources
        this.preloadCriticalResources();

        // Add loading animation
        this.handlePageLoad();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload hero image
        const heroImage = new Image();
        heroImage.src = 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=1920&h=1080&fit=crop';
    }

    handlePageLoad() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');

            // Remove any loading overlays
            const loader = document.querySelector('.page-loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 300);
            }
        });
    }
}

// ====== ANALYTICS & TRACKING ======

class Analytics {
    constructor() {
        this.init();
    }

    init() {
        // Track button clicks
        this.trackButtonClicks();

        // Track form interactions
        this.trackFormInteractions();

        // Track scroll depth
        this.trackScrollDepth();
    }

    trackButtonClicks() {
        const buttons = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], .btn-primary, .btn-hero-primary');

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.textContent.trim();
                const href = btn.getAttribute('href');

                console.log('Button clicked:', {
                    action,
                    href,
                    timestamp: new Date().toISOString()
                });

                // Send to analytics service (Google Analytics, Matomo, etc.)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'button_click', {
                        'event_category': 'engagement',
                        'event_label': action,
                        'value': href
                    });
                }
            });
        });
    }

    trackFormInteractions() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', () => {
            console.log('Form submitted:', {
                timestamp: new Date().toISOString()
            });

            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'engagement',
                    'event_label': 'contact_form'
                });
            }
        });
    }

    trackScrollDepth() {
        const milestones = [25, 50, 75, 100];
        const reached = new Set();

        window.addEventListener('scroll', throttle(() => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !reached.has(milestone)) {
                    reached.add(milestone);
                    console.log(`Scroll depth: ${milestone}%`);

                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_depth', {
                            'event_category': 'engagement',
                            'event_label': `${milestone}%`,
                            'value': milestone
                        });
                    }
                }
            });
        }, 500));
    }
}

// ====== ACCESSIBILITY ======

class Accessibility {
    constructor() {
        this.init();
    }

    init() {
        // Keyboard navigation
        this.enableKeyboardNav();

        // Focus management
        this.manageFocus();

        // ARIA labels
        this.enhanceARIA();
    }

    enableKeyboardNav() {
        // ESC to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('tw-hidden')) {
                    const nav = new Navigation();
                    nav.closeMobileMenu();
                }
            }
        });
    }

    manageFocus() {
        // Trap focus in mobile menu when open
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) return;

        const focusableElements = mobileMenu.querySelectorAll('a, button, input, select, textarea');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    enhanceARIA() {
        // Add ARIA labels to interactive elements without text
        document.querySelectorAll('button:not([aria-label])').forEach(btn => {
            if (!btn.textContent.trim()) {
                btn.setAttribute('aria-label', 'Button');
            }
        });
    }
}

// ====== INITIALIZATION ======

document.addEventListener('DOMContentLoaded', () => {
    console.log('🏠 Excellence Toiture - Website Initialized');

    // Initialize all modules
    new Navigation();
    new ScrollAnimations();
    new GalleryFilters();
    new TestimonialsSlider();
    new ContactForm();
    new PerformanceOptimizer();
    new Analytics();
    new Accessibility();

    console.log('✅ All modules loaded successfully');
});

// ====== ADDITIONAL CSS ANIMATIONS ======

// Add keyframes for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================================
//  PAGE TRANSITION OVERLAY
// ================================================
const overlay = document.getElementById('page-transition-overlay');

function runPageTransition(callback) {
    if (!overlay) { callback && callback(); return; }
    overlay.classList.add('entering');
    setTimeout(() => {
        overlay.classList.remove('entering');
        overlay.classList.add('leaving');
        callback && callback();
        setTimeout(() => { overlay.classList.remove('leaving'); }, 450);
    }, 450);
}

// Trigger transition on external link clicks (optional — keeps SPA feel for anchors)
document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && !href.startsWith('mailto') && !href.startsWith('tel')) {
            e.preventDefault();
            runPageTransition(() => { window.location.href = href; });
        }
    });
});

// ================================================
//  THEME TOGGLE
// ================================================
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const html = document.documentElement;

function getThemeIcon(isDark) { return isDark ? '🌙' : '☀️'; }

function applyTheme(isDark) {
    if (isDark) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    // Desktop toggle
    if (themeToggle) {
        const icon = themeToggle.querySelector('.theme-icon');
        if (isDark) {
            themeToggle.classList.add('active');
        } else {
            themeToggle.classList.remove('active');
        }
        if (icon) icon.textContent = getThemeIcon(isDark);
    }

    // Mobile toggle (mirror)
    if (mobileThemeToggle) {
        const mIcon = mobileThemeToggle.querySelector('.theme-icon');
        if (isDark) {
            mobileThemeToggle.classList.add('active');
        } else {
            mobileThemeToggle.classList.remove('active');
        }
        if (mIcon) mIcon.textContent = getThemeIcon(isDark);
    }

    // Fix project card borders
    const isDarkNow = html.classList.contains('dark');
    document.querySelectorAll('.project-card').forEach(card => {
        card.style.borderColor = isDarkNow ? '#27272a' : '#e5e7eb';
    });
}

// Init from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme === 'dark');

function toggleTheme() {
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    applyTheme(!isDark);
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

// ================================================
//  HAMBURGER MOBILE MENU
// ================================================
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu   = document.getElementById('mobile-menu');
const mobileBackdrop = document.getElementById('mobile-backdrop');
const mobileCloseBtn = document.getElementById('mobile-close-btn');

function openMobileMenu() {
    hamburgerBtn && hamburgerBtn.classList.add('open');
    mobileMenu && mobileMenu.classList.add('open');
    mobileBackdrop && mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    hamburgerBtn && hamburgerBtn.classList.remove('open');
    mobileMenu && mobileMenu.classList.remove('open');
    mobileBackdrop && mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        if (hamburgerBtn.classList.contains('open')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

// X close button inside panel
if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);

if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

// Close on Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => { closeMobileMenu(); });
});

// ================================================
//  NAVBAR SCROLL EFFECT
// ================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.pageYOffset > 100) {
        navbar.classList.add('nav-blur', 'border-b', 'border-gray-200', 'dark:border-gray-800');
    } else {
        navbar.classList.remove('nav-blur', 'border-b', 'border-gray-200', 'dark:border-gray-800');
    }
});

// ================================================
//  SMOOTH SCROLL
// ================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ================================================
//  ACTIVE NAV LINK (scroll spy) — desktop + mobile
// ================================================
const sections = document.querySelectorAll('section[id]');

function updateActiveLinks() {
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Desktop
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active-link');
        const href = link.getAttribute('href');
        if (href && href.slice(1) === current) {
            link.classList.add('active-link');
        }
    });

    // Mobile
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('active-link');
        const href = link.getAttribute('href');
        if (href && href.slice(1) === current) {
            link.classList.add('active-link');
        }
    });
}

window.addEventListener('scroll', updateActiveLinks);
updateActiveLinks();

// ================================================
//  REVEAL ANIMATIONS (Intersection Observer)
// ================================================
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ================================================
//  PARTICLE ANIMATION
// ================================================
const particlesContainer = document.getElementById('particles-container');
const heroSection = document.querySelector('.hero') || document.getElementById('home');

function createParticle(x, y) {
    if (!particlesContainer) return;
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top  = y + 'px';
    particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 3000);
}

let particleThrottle = false;
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        if (!particleThrottle) {
            const rect = heroSection.getBoundingClientRect();
            createParticle(e.clientX - rect.left, e.clientY - rect.top);
            particleThrottle = true;
            setTimeout(() => { particleThrottle = false; }, 100);
        }
    });
}

setInterval(() => {
    if (window.innerWidth > 768 && heroSection) {
        createParticle(Math.random() * heroSection.offsetWidth, Math.random() * heroSection.offsetHeight);
    }
}, 2000);

// ================================================
//  TYPING CURSOR
// ================================================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    setTimeout(() => { typingText.classList.remove('typing-cursor'); }, 3000);
}

// ================================================
//  PARALLAX BLOBS
// ================================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.blob').forEach((blob, i) => {
        blob.style.transform = `translateY(${scrolled * (i + 1) * 0.1}px)`;
    });
});

// ================================================
//  PROJECT CARD BORDER HOVER
// ================================================
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () { this.style.borderColor = '#8b5cf6'; });
    card.addEventListener('mouseleave', function () {
        this.style.borderColor = html.classList.contains('dark') ? '#27272a' : '#e5e7eb';
    });
});

// ================================================
//  RIPPLE EFFECT ON BUTTONS
// ================================================
document.querySelectorAll('.btn, a[class*="btn"], button[type="submit"]').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ================================================
//  PROFILE IMAGE TILT
// ================================================
const profileImage = document.getElementById('profile-image');
if (profileImage) {
    const imageContainer = profileImage.parentElement.parentElement;
    imageContainer.addEventListener('mousemove', (e) => {
        const rect = imageContainer.getBoundingClientRect();
        const rotateX = (e.clientY - rect.top  - rect.height / 2) / 10;
        const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 10;
        profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    imageContainer.addEventListener('mouseleave', () => {
        profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
}

// ================================================
//  COUNTER ANIMATION
// ================================================
const counterNumbers = document.querySelectorAll('.counter-number');
let countersAnimated = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            counterNumbers.forEach((counter, index) => {
                const target    = parseInt(counter.getAttribute('data-count'));
                const duration  = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                const update = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                setTimeout(update, index * 150);
            });
        }
    });
}, { threshold: 0.5 });

counterNumbers.forEach(c => counterObserver.observe(c));
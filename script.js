// Theme Toggle Functionality
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        const themeIcon = document.querySelector('.theme-icon');
        
        // Check for saved theme preference or default to 'dark'
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        if (currentTheme === 'dark') {
            html.classList.add('dark');
            themeToggle.classList.add('active');
            themeIcon.textContent = '🌙';
        } else {
            html.classList.remove('dark');
            themeToggle.classList.remove('active');
            themeIcon.textContent = '☀️';
        }
        
        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            themeToggle.classList.toggle('active');
            
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                themeIcon.textContent = '🌙';
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.textContent = '☀️';
            }
        });

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('nav-blur', 'border-b', 'border-gray-200', 'dark:border-gray-800');
            } else {
                navbar.classList.remove('nav-blur', 'border-b', 'border-gray-200', 'dark:border-gray-800');
            }
            
            lastScroll = currentScroll;
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Intersection Observer for reveal animations
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));

        // Particle animation on hero section
        const particlesContainer = document.getElementById('particles-container');
        let particleInterval;

        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particlesContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 3000);
        }

        // Create particles on mouse move in hero section
        const heroSection = document.querySelector('.hero');
        let particleThrottle = false;

        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                if (!particleThrottle) {
                    const rect = heroSection.getBoundingClientRect();
                    createParticle(e.clientX - rect.left, e.clientY - rect.top);
                    particleThrottle = true;
                    setTimeout(() => {
                        particleThrottle = false;
                    }, 100);
                }
            });
        }

        // Random particles
        setInterval(() => {
            if (window.innerWidth > 768 && heroSection) {
                const x = Math.random() * heroSection.offsetWidth;
                const y = Math.random() * heroSection.offsetHeight;
                createParticle(x, y);
            }
        }, 2000);

        // Typing effect for hero title
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            setTimeout(() => {
                typingText.classList.remove('typing-cursor');
            }, 3000);
        }

        // Add active state to nav links on scroll
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-accent-purple');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('text-accent-purple');
                }
            });
        });

        // Parallax effect for blobs
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const blobs = document.querySelectorAll('.blob');
            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 0.1;
                blob.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Add hover effect to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.borderColor = '#8b5cf6';
            });
            card.addEventListener('mouseleave', function() {
                const isDark = html.classList.contains('dark');
                this.style.borderColor = isDark ? '#27272a' : '#e5e7eb';
            });
        });

        // Button click animations
        const buttons = document.querySelectorAll('.btn, a[class*="btn"]');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Profile image tilt effect
        const profileImage = document.getElementById('profile-image');
        if (profileImage) {
            const imageContainer = profileImage.parentElement.parentElement;
            
            imageContainer.addEventListener('mousemove', (e) => {
                const rect = imageContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            
            imageContainer.addEventListener('mouseleave', () => {
                profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        }

        // Counter animation for stats
        const counterNumbers = document.querySelectorAll('.counter-number');
        let countersAnimated = false;

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        // Observe counter elements
        counterNumbers.forEach(counter => {
            counterObserver.observe(counter);
        });

        function animateCounters() {
            counterNumbers.forEach((counter, index) => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                // Delay each counter slightly for stagger effect
                setTimeout(() => {
                    updateCounter();
                }, index * 150);
            });
        }
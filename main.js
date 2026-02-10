document.addEventListener('DOMContentLoaded', () => {
    // 1. Page Loader & Navbar Scroll
    const loader = document.querySelector('.loader-wrapper');
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');

    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
        }, 500);
    });

    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Scroll progress bar
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const words = ['Digital Experiences', 'Web Applications', 'AI Solutions', 'Smart Interfaces'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                const delay = el.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    el.classList.add('revealed');
                }, delay * 1000);
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // 4. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // 5. Active Link Highlighting
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

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
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 6. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinksContainer.classList.toggle('mobile-active');
        });

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinksContainer.classList.remove('mobile-active');
            });
        });
    }

    // 7. Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let started = false;

    const startCounter = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const speed = 100;
            const updateCount = () => {
                const count = +stat.innerText;
                const inc = target / speed;
                if (count < target) {
                    stat.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    stat.innerText = target + (stat.getAttribute('data-target') == '100' ? '%' : '+');
                }
            };
            updateCount();
        });
    };

    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-container');
        if (statsSection) {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.1;
            if (sectionPos < screenPos && !started) {
                startCounter();
                started = true;
            }
        }
    });

    // 7. Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        });
    }
});

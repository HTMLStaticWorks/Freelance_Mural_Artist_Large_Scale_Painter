document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        let currentTheme = body.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon');
            themeIcon.classList.add('bi-sun');
        } else {
            themeIcon.classList.remove('bi-sun');
            themeIcon.classList.add('bi-moon');
        }
    }

    // Sticky Header Shrink
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const revealElements = document.querySelectorAll('.reveal-up, .stagger-item, .reveal-fade-left, .reveal-fade-right');
    revealElements.forEach(el => observer.observe(el));

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Parallax Effect for Signature Project
    const parallaxImg = document.querySelector('.parallax-img');
    if (parallaxImg) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            parallaxImg.style.transform = `translateY(${scrollPos * 0.15}px)`;
        });
    }

    // Before & After Slider Logic
    const slider = document.querySelector('.ba-slider');
    if (slider) {
        const afterImg = slider.querySelector('.ba-after');
        const handle = slider.querySelector('.ba-handle');
        let isSliding = false;

        const slide = (e) => {
            if (!isSliding) return;
            let rect = slider.getBoundingClientRect();
            let x = e.type.includes('mouse') ? e.pageX - rect.left : e.touches[0].pageX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            afterImg.style.width = x + 'px';
            handle.style.left = x + 'px';
        };

        slider.addEventListener('mousedown', () => isSliding = true);
        slider.addEventListener('touchstart', () => isSliding = true);
        window.addEventListener('mouseup', () => isSliding = false);
        window.addEventListener('touchend', () => isSliding = false);
        window.addEventListener('mousemove', slide);
        window.addEventListener('touchmove', slide);
    }

    // Skill Bar Animation Observer
    const skillObserverOptions = { threshold: 0.5 };
    const skillObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.skill-progress');
                if (bar) {
                    bar.style.width = bar.getAttribute('data-width') + '%';
                }
                obs.unobserve(entry.target);
            }
        });
    }, skillObserverOptions);

    const skillBars = document.querySelectorAll('.skill-bar-container');
    skillBars.forEach(bar => skillObserver.observe(bar));
});

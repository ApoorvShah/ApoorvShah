// ========================
// Performance Metrics
// ========================
window.addEventListener('load', () => {
    // Measure performance
    if (performance.timing) {
        setTimeout(() => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            const domReady = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;

            document.getElementById('fcp').textContent = Math.round(domReady);
            document.getElementById('tti').textContent = Math.round(loadTime);

            // Calculate score (simplified)
            const score = Math.max(0, Math.min(100, 100 - (loadTime / 50)));
            document.getElementById('score').textContent = Math.round(score);
        }, 0);
    }
});

// ========================
// Terminal Loader
// ========================
const terminalCommands = [
    { text: 'npm install apoorv-shah', delay: 0 },
    { text: 'Initializing portfolio...', delay: 600 },
    { text: 'Loading experience: 5+ years', delay: 400 },
    { text: 'Fetching achievements...', delay: 400 },
    { text: '✓ THG Software Engineer', delay: 300 },
    { text: '✓ Ex-Cerence | Award Winner', delay: 300 },
    { text: '✓ Full-stack expertise loaded', delay: 300 },
    { text: 'Portfolio ready!', delay: 400 }
];

function typeTerminalText() {
    const terminalText = document.querySelector('.typed-text');
    let commandIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    function type() {
        if (commandIndex >= terminalCommands.length) {
            setTimeout(() => {
                document.getElementById('terminal-loader').classList.add('hidden');
            }, 1000);
            return;
        }

        const currentCommand = terminalCommands[commandIndex];

        if (!isDeleting) {
            currentText = currentCommand.text.substring(0, charIndex++);
            terminalText.textContent = currentText;

            if (charIndex > currentCommand.text.length) {
                isDeleting = true;
                setTimeout(type, currentCommand.delay);
                return;
            }
        } else {
            currentText = currentCommand.text.substring(0, charIndex--);
            terminalText.textContent = currentText;

            if (charIndex === 0) {
                isDeleting = false;
                commandIndex++;
            }
        }

        const typeSpeed = isDeleting ? 30 : 50;
        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 500);
}

// Start terminal animation on load
document.addEventListener('DOMContentLoaded', typeTerminalText);

// ========================
// Navigation
// ========================
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const navBurger = document.getElementById('navBurger');
const navMenu = document.getElementById('navMenu');

// Scroll handler for nav
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Update active section
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Mobile menu toggle
navBurger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navBurger.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navBurger.classList.remove('active');
    });
});

// ========================
// Theme Toggle
// ========================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// ========================
// Dynamic Role Animation
// ========================
const roles = [
    'scalable systems',
    'microservices',
    'cloud solutions',
    'user experiences',
    'efficient code'
];

let roleIndex = 0;
const roleText = document.querySelector('.role-text');

function animateRole() {
    if (roleText) {
        roleText.style.opacity = '0';
        setTimeout(() => {
            roleText.textContent = roles[roleIndex];
            roleText.style.opacity = '1';
            roleIndex = (roleIndex + 1) % roles.length;
        }, 300);
    }
}

setInterval(animateRole, 3000);

// ========================
// Stats Counter Animation
// ========================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value[data-target]');
            statValues.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    stat.textContent = Math.round(current);
                }, 30);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ========================
// Skill Bars Animation
// ========================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-item');
            skillBars.forEach((skill, index) => {
                setTimeout(() => {
                    const level = skill.getAttribute('data-level');
                    const progressBar = skill.querySelector('.skill-progress');
                    if (progressBar) {
                        progressBar.style.width = level + '%';
                    }
                }, index * 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-grid');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ========================
// GitHub API Integration
// ========================
async function fetchGitHubStats() {
    const username = 'ApoorvShah';
    const contributionsElement = document.getElementById('githubContribs');
    const calendarElement = document.getElementById('github-calendar');

    try {
        // Fetch user data
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        if (contributionsElement) {
            // Calculate approximate yearly contributions
            const contributions = data.public_repos * 50; // Rough estimate
            contributionsElement.textContent = contributions + '+';
        }

        // For the calendar, we'll create a simple placeholder
        if (calendarElement) {
            calendarElement.innerHTML = `
                <div style="text-align: center;">
                    <p>📊 Active GitHub contributor</p>
                    <p style="margin-top: 10px;">
                        <strong>${data.public_repos}</strong> public repositories
                    </p>
                </div>
            `;
        }
    } catch (error) {
        console.log('GitHub API rate limited or unavailable');
        if (contributionsElement) {
            contributionsElement.textContent = '500+';
        }
        if (calendarElement) {
            calendarElement.innerHTML = `
                <div style="text-align: center;">
                    <p>📊 Active GitHub contributor</p>
                </div>
            `;
        }
    }
}

// Fetch GitHub stats after page load
window.addEventListener('load', () => {
    setTimeout(fetchGitHubStats, 2000);
});

// ========================
// Particle Background
// ========================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }

        draw() {
            ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((a, index) => {
            particles.slice(index + 1).forEach(b => {
                const distance = Math.sqrt(
                    Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)
                );

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();
}

// ========================
// Contact Form
// ========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Create mailto link
        const subject = `Portfolio Contact from ${data.name}`;
        const body = `From: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
        const mailtoLink = `mailto:apoorvshah222@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();

        // Show success message (optional)
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 3000);
    });
}

// ========================
// Back to Top Button
// ========================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================
// Smooth Scroll for Links
// ========================
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

// ========================
// AOS-like Scroll Animations
// ========================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initial check
animateOnScroll();
window.addEventListener('scroll', animateOnScroll);

// ========================
// Initialize Everything
// ========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized successfully!');

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';

        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100 + 500);
    });
});
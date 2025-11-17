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

// ========================
// Dynamic Projects Loading
// ========================
async function fetchGitHubProjects() {
    const username = 'ApoorvShah';
    const projectsGrid = document.getElementById('projectsGrid');

    // Custom project metadata (for descriptions and demos)
    const projectMetadata = {
        'pets.nvim': {
            description: 'Interactive Neovim plugin bringing virtual pets to your editor with customizable animations',
            type: 'Neovim Plugin',
            tech: ['Lua', 'Neovim API'],
            featured: true,
            priority: 2
        },
        'notes-app': {
            description: 'Real-time collaborative note-taking application with markdown support and cloud sync',
            type: 'Full Stack',
            tech: ['React', 'Node.js', 'MongoDB'],
            featured: true,
            priority: 4
        },
        'vim-translator': {
            description: 'Multi-language translation plugin for Vim/Neovim with support for 50+ languages',
            type: 'Dev Tool',
            tech: ['VimScript', 'Python'],
            featured: true,
            priority: 5
        },
        'AV-studio': {
            description: 'Interior design portfolio website showcasing architectural and design projects for AV Designs',
            type: 'Portfolio Website',
            tech: ['JavaScript', 'CSS', 'HTML'],
            demo: 'https://apoorvshah.github.io/AV-studio/',
            featured: true,
            priority: 2,  // Second highest priority - also has live demo
            alwaysShow: true  // Always display this project
        },
        'bikes-analysis': {
            description: 'Comprehensive data analysis platform for Indian motorcycle market with interactive visualizations and performance ratings',
            type: 'Data Science',
            tech: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
            demo: 'https://bikes-analysis-lvto8zz6rl8iocxhz6w6ls.streamlit.app/',
            featured: true,
            priority: 1,  // Highest priority since it has a live demo
            alwaysShow: true  // Always display this project
        }
    };

    // Show loading state
    projectsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i>
            <p style="margin-top: 16px; color: var(--text-secondary);">Loading projects from GitHub...</p>
        </div>
    `;

    try {
        // Fetch repositories
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
        const repos = await response.json();

        // Separate always-show projects from others
        const alwaysShowRepos = [];
        const otherRepos = [];

        repos
            .filter(repo => !repo.fork && !repo.private)
            .forEach(repo => {
                const meta = projectMetadata[repo.name];
                if (meta?.alwaysShow) {
                    alwaysShowRepos.push(repo);
                } else {
                    otherRepos.push(repo);
                }
            });

        // Sort always-show repos by priority
        alwaysShowRepos.sort((a, b) => {
            const aPriority = projectMetadata[a.name]?.priority || 999;
            const bPriority = projectMetadata[b.name]?.priority || 999;
            return aPriority - bPriority;
        });

        // Sort other repos
        otherRepos.sort((a, b) => {
            const aMeta = projectMetadata[a.name];
            const bMeta = projectMetadata[b.name];

            // Prioritize featured projects
            const aFeatured = aMeta?.featured || false;
            const bFeatured = bMeta?.featured || false;
            if (aFeatured && !bFeatured) return -1;
            if (!aFeatured && bFeatured) return 1;

            // Then sort by priority
            const aPriority = aMeta?.priority || 999;
            const bPriority = bMeta?.priority || 999;
            if (aPriority !== bPriority) return aPriority - bPriority;

            // Finally sort by stars
            return (b.stargazers_count - a.stargazers_count) ||
                   (b.forks_count - a.forks_count);
        });

        // Combine: always-show first, then fill with others up to 6 total
        const featuredRepos = [
            ...alwaysShowRepos,
            ...otherRepos.slice(0, 6 - alwaysShowRepos.length)
        ];

        // Clear loading state
        projectsGrid.innerHTML = '';

        // Create project cards
        featuredRepos.forEach((repo, index) => {
            const metadata = projectMetadata[repo.name] || {};
            const projectCard = createProjectCard(repo, metadata, index);
            projectsGrid.innerHTML += projectCard;
        });

        // Reinitialize animations for new elements
        initProjectAnimations();

    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // Fallback to default projects
        projectsGrid.innerHTML = getDefaultProjects();
        initProjectAnimations();
    }
}

function createProjectCard(repo, metadata, index) {
    const {
        description = repo.description || 'No description available',
        type = detectProjectType(repo),
        tech = detectTechStack(repo),
        demo = null
    } = metadata;

    return `
        <div class="project-card" data-aos="flip-left" data-aos-delay="${index * 100}">
            <div class="project-image">
                <div class="project-overlay">
                    <a href="${repo.html_url}" target="_blank" class="project-link" title="View on GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    ${demo ? `
                        <a href="${demo}" target="_blank" class="project-link" title="Live Demo">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    ` : ''}
                </div>
                <span class="project-type">${type}</span>
                ${repo.stargazers_count > 0 ? `
                    <span class="project-stars">
                        <i class="fas fa-star"></i> ${repo.stargazers_count}
                    </span>
                ` : ''}
            </div>
            <div class="project-content">
                <h3 class="project-title">${formatRepoName(repo.name)}</h3>
                <p class="project-description">${description}</p>
                <div class="project-tech">
                    ${tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="project-stats">
                    ${repo.language ? `<span><i class="fas fa-code"></i> ${repo.language}</span>` : ''}
                    ${repo.forks_count > 0 ? `<span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

function detectProjectType(repo) {
    const name = repo.name.toLowerCase();
    if (name.includes('vim') || name.includes('nvim') || name.includes('neovim')) return 'Vim Plugin';
    if (name.includes('app')) return 'Application';
    if (name.includes('api')) return 'API';
    if (name.includes('lib')) return 'Library';
    if (name.includes('analysis') || name.includes('data')) return 'Data Science';
    if (repo.language === 'JavaScript' || repo.language === 'HTML') return 'Web App';
    if (repo.language === 'Python') return 'Python Project';
    return 'Project';
}

function detectTechStack(repo) {
    const lang = repo.language;
    const name = repo.name.toLowerCase();

    const techMap = {
        'JavaScript': ['JavaScript', 'HTML', 'CSS'],
        'Python': ['Python'],
        'Java': ['Java'],
        'TypeScript': ['TypeScript', 'Node.js'],
        'Lua': ['Lua'],
        'Vim script': ['VimScript']
    };

    return techMap[lang] || [lang || 'Code'];
}

function formatRepoName(name) {
    return name
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getDefaultProjects() {
    // Fallback HTML if API fails
    return `
        <div class="project-card">
            <div class="project-image">
                <div class="project-overlay">
                    <a href="https://github.com/ApoorvShah/bikes-analysis" target="_blank" class="project-link" title="View on GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://bikes-analysis-lvto8zz6rl8iocxhz6w6ls.streamlit.app/" target="_blank" class="project-link" title="Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                <span class="project-type">Data Science</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">Bikes Analysis</h3>
                <p class="project-description">Comprehensive data analysis platform for Indian motorcycle market with interactive visualizations</p>
                <div class="project-tech">
                    <span>Python</span>
                    <span>Streamlit</span>
                    <span>Plotly</span>
                </div>
                <div class="project-stats">
                    <span><i class="fas fa-rocket"></i> Live Demo</span>
                </div>
            </div>
        </div>
        <div class="project-card">
            <div class="project-image">
                <div class="project-overlay">
                    <a href="https://github.com/ApoorvShah/AV-studio" target="_blank" class="project-link" title="View on GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="https://apoorvshah.github.io/AV-studio/" target="_blank" class="project-link" title="Live Demo">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                <span class="project-type">Portfolio Website</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">AV Studio</h3>
                <p class="project-description">Interior design portfolio website showcasing architectural and design projects for AV Designs</p>
                <div class="project-tech">
                    <span>JavaScript</span>
                    <span>CSS</span>
                    <span>HTML</span>
                </div>
                <div class="project-stats">
                    <span><i class="fas fa-rocket"></i> Live Demo</span>
                </div>
            </div>
        </div>
        <div class="project-card">
            <div class="project-image">
                <div class="project-overlay">
                    <a href="https://github.com/ApoorvShah/pets.nvim" target="_blank" class="project-link">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
                <span class="project-type">Neovim Plugin</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">Pets.nvim</h3>
                <p class="project-description">Interactive Neovim plugin bringing virtual pets to your editor</p>
                <div class="project-tech">
                    <span>Lua</span>
                    <span>Neovim API</span>
                </div>
            </div>
        </div>
        <div class="project-card">
            <div class="project-image">
                <div class="project-overlay">
                    <a href="https://github.com/ApoorvShah/notes-app" target="_blank" class="project-link">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
                <span class="project-type">Full Stack</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">Notes App</h3>
                <p class="project-description">Real-time collaborative note-taking application</p>
                <div class="project-tech">
                    <span>React</span>
                    <span>Node.js</span>
                </div>
            </div>
        </div>
        <div class="project-card">
            <div class="project-image">
                <div class="project-overlay">
                    <a href="https://github.com/ApoorvShah/vim-translator" target="_blank" class="project-link">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
                <span class="project-type">Dev Tool</span>
            </div>
            <div class="project-content">
                <h3 class="project-title">Vim Translator</h3>
                <p class="project-description">Multi-language translation plugin for Vim/Neovim</p>
                <div class="project-tech">
                    <span>VimScript</span>
                    <span>Python</span>
                </div>
            </div>
        </div>
    `;
}

function initProjectAnimations() {
    // Reinitialize AOS or any other animation library for new elements
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ========================
// Open Source Contributions
// ========================
function loadContributions() {
    const contributionsGrid = document.getElementById('contributionsGrid');

    // Manually maintained list of contributions
    const contributions = [
        {
            repo: 'browser-use/web-ui',
            prNumber: 430,
            title: 'feat: Unbound AI - API Integration',
            description: 'Integrated Unbound AI as a unified gateway for multiple AI models. Added configuration, requirements, and utility files to enable seamless model switching and analytics.',
            status: 'merged',
            link: 'https://github.com/browser-use/web-ui/pull/430',
            date: 'Apr 1, 2024',
            impact: 'Enabled multi-model AI support with analytics and logging',
            stats: '+13 -2 lines',
            commits: 3
        }
        // Add more contributions here as you make them
    ];

    if (contributionsGrid) {
        contributionsGrid.innerHTML = contributions.map(contrib => `
            <div class="contribution-card">
                <div class="contribution-header">
                    <div class="contribution-repo">
                        <i class="fas fa-code-branch"></i>
                        <span>${contrib.repo}</span>
                    </div>
                    <span class="contribution-status ${contrib.status}">
                        ${contrib.status === 'merged' ? '<i class="fas fa-check-circle"></i> Merged' :
                          contrib.status === 'open' ? '<i class="fas fa-clock"></i> Open' :
                          '<i class="fas fa-times-circle"></i> Closed'}
                    </span>
                </div>
                <h4 class="contribution-title">
                    <a href="${contrib.link}" target="_blank">
                        #${contrib.prNumber} - ${contrib.title}
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </h4>
                <p class="contribution-description">${contrib.description}</p>
                <div class="contribution-stats">
                    ${contrib.stats ? `<span><i class="fas fa-code"></i> ${contrib.stats}</span>` : ''}
                    ${contrib.commits ? `<span><i class="fas fa-code-branch"></i> ${contrib.commits} commits</span>` : ''}
                </div>
                <div class="contribution-footer">
                    <span class="contribution-impact">
                        <i class="fas fa-fire"></i> ${contrib.impact}
                    </span>
                    <span class="contribution-date">
                        <i class="far fa-calendar"></i> ${contrib.date}
                    </span>
                </div>
            </div>
        `).join('');

        // Add note about work email
        contributionsGrid.innerHTML += `
            <div class="contribution-note">
                <i class="fas fa-info-circle"></i>
                <p>Some contributions may not appear under my personal GitHub profile as they were made using my work email for employer-sponsored open source initiatives.</p>
            </div>
        `;
    }
}

// Fetch GitHub stats and projects after page load
window.addEventListener('load', () => {
    setTimeout(fetchGitHubStats, 2000);
    setTimeout(fetchGitHubProjects, 1000);
    setTimeout(loadContributions, 1500);
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
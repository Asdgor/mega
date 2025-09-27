// Main application
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.initMobileMenu();
        this.initSmoothScroll();
        this.initProjectModals();
        this.initContactForm();
        this.initLanguage();
        this.initAnimations();
        this.initTypingEffect();
        
        console.log('🚀 Portfolio App initialized!');
    }

    // Mobile menu
    initMobileMenu() {
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const navActions = document.querySelector('.nav-actions');

        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                menuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
                navActions.classList.toggle('active');
                document.body.style.overflow = 
                    document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    menuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    navActions.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            });
        }
    }

    // Smooth scroll
    initSmoothScroll() {
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
    }

    // Project modals
    initProjectModals() {
        const projects = {
            1: {
                title: "Интернет-магазин",
                description: "Полнофункциональный интернет-магазин с корзиной, фильтрами товаров и системой оплаты. Адаптивный дизайн, быстрая загрузка, SEO-оптимизация. Интеграция с платежными системами и CRM.",
                tech: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
                placeholder: "🛒"
            },
            2: {
                title: "Корпоративный сайт",
                description: "Сайт для строительной компании с каталогом услуг, формой заявок и административной панелью. Современный дизайн, система управления контентом, интеграция с Google Maps.",
                tech: ["Vue.js", "PHP", "MySQL", "REST API", "Figma"],
                placeholder: "🏢"
            },
            3: {
                title: "Образовательная платформа",
                description: "Платформа для онлайн-курсов с личным кабинетом, системой прогресса и видеоплеером. Адаптивная верстка, интерактивные элементы, система тестирования и сертификации.",
                tech: ["React", "TypeScript", "Firebase", "GSAP", "SCSS"],
                placeholder: "🎓"
            }
        };

        // Open modal
        document.querySelectorAll('.work-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectId = card.dataset.project;
                const project = projects[projectId];
                
                if (project) {
                    this.openProjectModal(project);
                }
            });
        });

        // Close modal
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Close on backdrop click
        document.getElementById('project-modal').addEventListener('click', (e) => {
            if (e.target.id === 'project-modal') {
                this.closeModal();
            }
        });

        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openProjectModal(project) {
        const modal = document.getElementById('project-modal');
        const placeholder = document.getElementById('modal-placeholder');
        const title = document.getElementById('modal-title');
        const description = document.getElementById('modal-description');
        const tech = document.getElementById('modal-tech');

        placeholder.textContent = project.placeholder;
        title.textContent = project.title;
        description.textContent = project.description;
        
        tech.innerHTML = '';
        project.tech.forEach(techName => {
            const span = document.createElement('span');
            span.textContent = techName;
            tech.appendChild(span);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('project-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Contact form
    initContactForm() {
        const form = document.getElementById('project-form');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const data = {
                    name: form.querySelector('input[type="text"]').value,
                    email: form.querySelector('input[type="email"]').value,
                    message: form.querySelector('textarea').value
                };

                // Simple validation
                if (!data.name || !data.email || !data.message) {
                    this.showNotification('⚠️ Заполните все поля', 'warning');
                    return;
                }

                if (!this.validateEmail(data.email)) {
                    this.showNotification('⚠️ Введите корректный email', 'warning');
                    return;
                }

                // Simulate sending
                this.showNotification('📧 Отправляем сообщение...', 'info');
                
                setTimeout(() => {
                    this.showNotification('✅ Сообщение отправлено! Свяжусь с вами в течение 24 часов.', 'success');
                    form.reset();
                    
                    // Redirect to Telegram after 2 seconds
                    setTimeout(() => {
                        window.open('https://t.me/sy1ka', '_blank');
                    }, 2000);
                }, 1500);
            });
        }
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Language switcher
    initLanguage() {
        const langButtons = document.querySelectorAll('.lang-btn');
        const currentLang = localStorage.getItem('portfolio-lang') || 'ru';

        this.setLanguage(currentLang);

        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.setLanguage(lang);
                
                // Update active state
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    setLanguage(lang) {
        localStorage.setItem('portfolio-lang', lang);
        document.documentElement.lang = lang;
        
        // You can add translations here later
        console.log('Language changed to:', lang);
    }

    // Animations
    initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add fade-in class to elements
        document.querySelectorAll('.work-card, .skill-item, .contact-form').forEach(el => {
            el.classList.add('fade-in');
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // Typing effect
    initTypingEffect() {
        const texts = ["впечатляют", "продают", "работают", "выделяются", "конвертируют"];
        const typingElement = document.querySelector('.typing-text');
        const cursorElement = document.querySelector('.cursor-blinking');
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        }

        // Start typing after page load
        setTimeout(type, 1000);
    }

    // Notifications
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196F3'
        };

        notification.textContent = message;
        notification.style.background = colors[type] || colors.info;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add some fun console message
console.log(`
%c🚀 SY1KA PORTFOLIO v2.0
%cПривет! Это консоль портфолио Sy1ka.
%cЕсли ты здесь, значит интересуешься веб-разработкой!
%cСвяжись со мной: @sy1ka в Telegram 💫
`, 
'color: #ff6b6b; font-size: 16px; font-weight: bold;',
'color: #4ecdc4; font-size: 14px;',
'color: #ffd166; font-size: 14px;',
'color: #ffffff; font-size: 12px;'
);

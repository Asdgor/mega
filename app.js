class PremiumPortfolio {
    constructor() {
        this.init();
    }

    async init() {
        // 1. Быстрая загрузка критического контента
        await this.loadCritical();
        
        // 2. Инициализация всех модулей
        this.initLoader();
        this.init3DBackground();
        this.initAnimations();
        this.initMicroInteractions();
        this.initPerformance();
        
        console.log('🚀 Premium Portfolio loaded!');
    }

    // Мгновенная загрузка видимой части
    async loadCritical() {
        // Preload critical resources
        const critical = [
            this.preloadImage('hero-bg.jpg'),
            this.preloadFont('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap')
        ];
        
        await Promise.all(critical);
        document.getElementById('content').style.display = 'block';
    }

    // 3D фон с частицами
    init3DBackground() {
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5
            });
        }
        
        function animate() {
            ctx.fillStyle = 'rgba(10, 10, 18, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.y += particle.speed;
                if (particle.y > canvas.height) particle.y = 0;
                
                ctx.fillStyle = `rgba(0, 255, 255, ${particle.size / 4})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Плавные анимации
    initAnimations() {
        // Intersection Observer для анимаций по скроллу
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Анимация счетчиков
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, { threshold: 0.1 });

        // Наблюдаем за элементами
        document.querySelectorAll('[data-scroll]').forEach(el => {
            observer.observe(el);
        });
    }

    // Микро-интерактивы
    initMicroInteractions() {
        // Магнитные кнопки
        document.querySelectorAll('[data-magnetic]').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });

        // Параллакс эффект
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.parallax-element');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    // Оптимизация производительности
    initPerformance() {
        // Lazy loading для изображений
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img.lazy').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Оптимизация скролла
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Логика скролла
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Вспомогательные методы
    preloadImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// Запуск при полной загрузке
window.addEventListener('load', () => {
    new PremiumPortfolio();
});

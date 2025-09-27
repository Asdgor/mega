// Основной класс приложения
class WowPortfolio {
    constructor() {
        this.init();
    }

    async init() {
        // Инициализация всех модулей
        await this.loadAssets();
        this.initLoader();
        this.initCursor();
        this.initAnimations();
        this.initMicroInteractions();
        this.initScrollEffects();
        
        console.log('🎉 Wow Portfolio initialized!');
    }

    // Загрузка ресурсов
    async loadAssets() {
        const promises = [
            this.preloadImages(),
            this.preloadFonts()
        ];
        
        await Promise.all(promises);
    }

    // Прелоадер
    initLoader() {
        window.addEventListener('load', () => {
            gsap.to('#loader', {
                duration: 0.5,
                opacity: 0,
                onComplete: () => {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('main-content').style.display = 'block';
                    this.animateEntrance();
                }
            });
        });
    }

    // Анимация появления контента
    animateEntrance() {
        gsap.from('#main-content > *', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }

    // Кастомный курсор
    initCursor() {
        const cursor = document.querySelector('.cursor');
        
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        // Эффекты при наведении
        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            });
        });
    }

    // Магнитные кнопки
    initMicroInteractions() {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Сложные анимации по скроллу
    initScrollEffects() {
        // Инициализация GSAP ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Анимация для герой секции
        gsap.to('.hero-bg .shape-1', {
            y: 100,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Анимация карточек портфолио
        gsap.from('.project-card', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.portfolio',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Параллакс эффекты
        gsap.to('.hero-bg', {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // Анимация счетчиков
    animateCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            
            gsap.to(counter, {
                innerText: target,
                duration: duration / 1000,
                snap: { innerText: 1 },
                stagger: 1,
                onUpdate: function() {
                    counter.innerText = Math.floor(this.targets()[0].innerText);
                }
            });
        });
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    new WowPortfolio();
});

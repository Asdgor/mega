// Простой и рабочий скрипт
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');
    
    // Мобильное меню
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            alert('Меню работает! 🎉');
        });
    }
    
    // Плавная прокрутка
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
    
    // Простая форма
    const form = document.getElementById('project-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо! Я свяжусь с вами в Telegram! 📧');
            this.reset();
        });
    }
});

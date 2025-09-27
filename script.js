// Кастомный курсор
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    const cursor = document.querySelector('.cursor');
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    const cursor = document.querySelector('.cursor');
    cursor.style.transform = 'scale(1)';
});

// Меняющийся текст
const typingTexts = [
    "впечатляют",
    "продают", 
    "работают",
    "выделяются",
    "конвертируют"
];

let currentTextIndex = 0;
const typingElement = document.querySelector('.typing-text');
const cursorElement = document.querySelector('.cursor-blinking');

function typeText() {
    const text = typingTexts[currentTextIndex];
    let charIndex = 0;
    
    typingElement.textContent = '';
    cursorElement.style.opacity = '1';
    
    const typingInterval = setInterval(() => {
        typingElement.textContent += text[charIndex];
        charIndex++;
        
        if (charIndex === text.length) {
            clearInterval(typingInterval);
            setTimeout(eraseText, 2000);
        }
    }, 100);
}

function eraseText() {
    const text = typingElement.textContent;
    let charIndex = text.length - 1;
    
    const eraseInterval = setInterval(() => {
        typingElement.textContent = text.substring(0, charIndex);
        charIndex--;
        
        if (charIndex < 0) {
            clearInterval(eraseInterval);
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(typeText, 500);
        }
    }, 50);
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

// Анимация при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Форма обратной связи
document.getElementById('project-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Здесь можно добавить отправку на email или Telegram
    const formData = new FormData(this);
    const name = formData.get('name') || 'Пользователь';
    
    // Просто показываем уведомление
    alert(`Спасибо, ${name}! Я свяжусь с вами в течение 24 часов!`);
    this.reset();
});

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Запускаем печатающий текст
    setTimeout(typeText, 1000);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.work-card, .tech-item, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Плавное появление страницы
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Изменение хедера при прокрутке
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
        header.style.boxShadow = 'none';
    }
});

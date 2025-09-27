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
// Данные проектов
const projects = [
    {
        id: 1,
        title: "E-commerce платформа",
        description: "Полнофункциональный интернет-магазин с корзиной, фильтрами и системой оплаты. Адаптивный дизайн, быстрая загрузка, SEO-оптимизация.",
        tech: ["HTML/CSS", "JavaScript", "React", "Node.js"],
        image: "project1.jpg",
        link: "#"
    },
    {
        id: 2, 
        title: "Корпоративный портал",
        description: "Сайт для строительной компании с каталогом услуг, формой заявок и административной панелью для управления контентом.",
        tech: ["Vue.js", "PHP", "MySQL", "API"],
        image: "project2.jpg", 
        link: "#"
    }
];

// Открытие модалки
function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    const modal = document.getElementById('project-modal');
    
    if (project) {
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').textContent = project.description;
        document.getElementById('modal-img').src = project.image;
        document.getElementById('modal-link').href = project.link;
        
        // Технологии
        const techContainer = document.getElementById('modal-tech');
        techContainer.innerHTML = '';
        project.tech.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            techContainer.appendChild(span);
        });
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Закрытие модалки
function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие по клику вне модалки
window.addEventListener('click', function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Закрытие по ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
// Мобильное меню
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            navActions.classList.toggle('active');
            document.body.style.overflow = document.body.style.overflow === 'hidden' ? 'auto' : 'hidden';
        });
    }
}

// В CSS добавляем:
.menu-btn.active span:nth-child(1) { 
    transform: rotate(45deg) translate(5px, 5px); 
}
.menu-btn.active span:nth-child(2) { 
    opacity: 0; 
}
.menu-btn.active span:nth-child(3) { 
    transform: rotate(-45deg) translate(7px, -6px); 
}

.nav-links.active, .nav-actions.active {
    display: flex !important;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: var(--bg-secondary);
    padding: 2rem;
    gap: 1rem;
}
// Отправка в Telegram
async function sendToTelegram(formData) {
    const BOT_TOKEN = '7108612353:AAHjqj8v9J6p5n8Y7R6XzVwQnL_mB7n8Y7k'; // Замени на свой
    const CHAT_ID = '704885434'; // Замени на свой chat_id
    
    const message = `📧 Новая заявка!\n\n👤 Имя: ${formData.name}\n📧 Email: ${formData.email}\n💼 Проект: ${formData.project}\n\n🕒 ${new Date().toLocaleString()}`;
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('Ошибка отправки:', error);
        return false;
    }
}

// Обработка формы
document.getElementById('project-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        project: this.querySelector('textarea').value
    };
    
    const success = await sendToTelegram(formData);
    
    if (success) {
        alert('✅ Сообщение отправлено! Свяжусь с вами в течение 24 часов.');
        this.reset();
    } else {
        alert('❌ Ошибка отправки. Напишите мне напрямую в Telegram: @sy1ka');
    }
});
// Показывает, когда ты онлайн
function updateOnlineStatus() {
    const statusElement = document.getElementById('online-status');
    if (statusElement) {
        const isOnline = Math.random() > 0.3; // 70% шанс быть онлайн
        statusElement.textContent = isOnline ? '🟢 Онлайн' : '⚫ Офлайн';
        statusElement.style.color = isOnline ? '#4CAF50' : '#666';
    }
}
// Прогресс-бар навыков
function initSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
}

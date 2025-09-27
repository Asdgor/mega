// Плавная прокрутка
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Модальное окно
function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Закрытие модалки по клику вне ее
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Отправка форм
function sendForm(event) {
    event.preventDefault();
    alert('Спасибо! Сообщение отправлено. Я свяжусь с вами в течение 24 часов!');
    event.target.reset();
}

function sendModalForm(event) {
    event.preventDefault();
    alert('Отлично! Я свяжусь с вами в ближайшее время для обсуждения проекта!');
    closeModal();
    event.target.reset();
}

// Показ проекта
function showProject(id) {
    const projects = [
        "Интернет-магазин - Лендинг для продажи товаров",
        "Корпоративный сайт - Сайт для строительной компании", 
        "Образовательная платформа - Сайт для онлайн-курсов"
    ];
    alert(projects[id-1] + "\n\n(Это демо-версия. В реальном портфолио здесь будут ссылки на работы)");
}

// Анимация при прокрутке
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

// Меню для мобильных
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Наблюдатель для анимаций
    document.querySelectorAll('.skill-card, .portfolio-item').forEach(el => {
        observer.observe(el);
    });
    
    // Мобильное меню
    document.querySelector('.menu-btn').addEventListener('click', toggleMenu);
    
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
        header.style.background = 'rgba(255,255,255,0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.boxShadow = 'none';
    }
});

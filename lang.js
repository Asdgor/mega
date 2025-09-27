// Переводы
const translations = {
    ru: {
        heroTitle: "Сайты, которые",
        heroDescription: "Создаю цифровые продукты с характером. Не просто код — а опыт, который цепляет и решает бизнес-задачи.",
        works: "Работы",
        contact: "Свяжитесь со мной",
        discussProject: "Обсудить проект",
        viewProject: "Смотреть проект",
        sendMessage: "Отправить сообщение",
        online: "Онлайн"
    },
    en: {
        heroTitle: "Websites that",
        heroDescription: "I create digital products with character. Not just code — but an experience that engages and solves business problems.",
        works: "Works", 
        contact: "Contact me",
        discussProject: "Discuss project",
        viewProject: "View project",
        sendMessage: "Send message",
        online: "Online"
    }
};

// Смена языка
function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    // Сохраняем в localStorage
    localStorage.setItem('preferred-language', lang);
    document.documentElement.lang = lang;
    
    // Обновляем тексты
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Показываем уведомление
    showNotification(lang === 'ru' ? 'Язык изменен на Русский' : 'Language changed to English');
}

// Инициализация языка
function initLanguage() {
    const savedLang = localStorage.getItem('preferred-language') || 'ru';
    changeLanguage(savedLang);
    
    // Добавляем переключатель в хедер
    addLanguageSwitcher();
}

// Добавляем переключатель языка
function addLanguageSwitcher() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;
    
    const langSwitcher = document.createElement('div');
    langSwitcher.className = 'lang-switcher';
    langSwitcher.innerHTML = `
        <button onclick="changeLanguage('ru')" class="lang-btn">RU</button>
        <span>|</span>
        <button onclick="changeLanguage('en')" class="lang-btn">EN</button>
    `;
    
    navActions.appendChild(langSwitcher);
}

// Уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--accent);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        z-index: 10000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

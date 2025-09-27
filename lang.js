const translations = {
    ru: {
        heroTitle: "Сайты, которые",
        works: "Работы",
        contact: "Свяжитесь со мной",
        discussProject: "Обсудить проект"
    },
    en: {
        heroTitle: "Websites that", 
        works: "Works",
        contact: "Contact me",
        discussProject: "Discuss project"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('preferred-language', lang);
    document.documentElement.lang = lang;
    
    // Обновляем тексты
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-language') || 'ru';
    changeLanguage(savedLang);
});

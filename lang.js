const translations = {
    ru: {
        heroTitle: "Сайты, которые",
        works: "Работы",
        contact: "Свяжитесь со мной"
    },
    en: {
        heroTitle: "Websites that",
        works: "Works", 
        contact: "Contact me"
    }
};

function changeLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelector('[data-lang="heroTitle"]').textContent = translations[lang].heroTitle;
    // ... остальные тексты
}

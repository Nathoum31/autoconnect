let currentLang = localStorage.getItem('lang') || 'en';
let translations = {};

async function loadTranslations() {
    const res = await fetch('/translate.json');
    translations = await res.json();
    updateText();
}

function updateText() {
    const langData = translations[currentLang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (Array.isArray(langData[key])) {
            const ul = document.querySelector(`[data-i18n="${key}"]`);
            if (ul) {
                ul.innerHTML = "";
                langData[key].forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = item;
                    ul.appendChild(li);
                });
            }
        } else {
            el.innerHTML = langData[key];
        }

    });

    document.documentElement.lang = currentLang;
}

document.getElementById('language-selector').addEventListener('change', e => {
    currentLang = e.target.value;
    localStorage.setItem('lang', currentLang);
    updateText();
});

loadTranslations();
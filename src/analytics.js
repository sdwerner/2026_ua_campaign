// Google Analytics 4 Measurement ID
const GA_ID = 'G-5M9HZGCTV1';

// Translations for the banner
const bannerText = {
    de: {
        text: "Wir nutzen Cookies, um unsere Website für Sie zu verbessern. Einige sind essenziell, andere helfen uns, das Nutzererlebnis zu optimieren (Google Analytics).",
        accept: "Alle akzeptieren",
        decline: "Nur essenzielle",
        privacy: "Datenschutzerklärung"
    },
    ua: {
        text: "Ми використовуємо файли cookie, щоб покращити наш веб-сайт для вас. Деякі з них є важливими, інші допомагають нам оптимізувати користувацький досвід (Google Analytics).",
        accept: "Прийняти всі",
        decline: "Лише необхідні",
        privacy: "Політика конфіденційності"
    },
    en: {
        text: "We use cookies to improve our website for you. Some are essential, others help us optimize the user experience (Google Analytics).",
        accept: "Accept All",
        decline: "Essential Only",
        privacy: "Privacy Policy"
    }
};

function getLang() {
    return localStorage.getItem('lang') || 'de'; // Default to German for legal safety
}

function initGA() {
    if (window['ga-disable-' + GA_ID]) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID, { 'anonymize_ip': true });

    console.log('GA4 Initialized');
}

function setConsent(status) {
    localStorage.setItem('cookie_consent', status);
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';

    if (status === 'granted') {
        initGA();
    }
}

function showBanner() {
    if (document.getElementById('cookie-banner')) return;

    const lang = getLang();
    const t = bannerText[lang] || bannerText.de;

    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
    <div class="cookie-content">
      <p>
        ${t.text} 
        <a href="privacy.html" class="cookie-link">${t.privacy}</a>.
      </p>
      <div class="cookie-buttons">
        <button id="cookie-decline" class="btn-cookie btn-cookie-secondary">${t.decline}</button>
        <button id="cookie-accept" class="btn-cookie btn-cookie-primary">${t.accept}</button>
      </div>
    </div>
  `;

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').onclick = () => setConsent('granted');
    document.getElementById('cookie-decline').onclick = () => setConsent('denied');
}

// Check on load
document.addEventListener('DOMContentLoaded', () => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'granted') {
        initGA();
    } else if (!consent) {
        showBanner();
    }
});

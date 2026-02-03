// Style imported via link tag in HTML for compatibility
import { translations } from './src/locales.js';

const defaultLang = 'ua';
let currentSavedLang = localStorage.getItem('lang');
let currentLang = (currentSavedLang && translations[currentSavedLang]) ? currentSavedLang : defaultLang;

// Function to render candidates
function renderCandidates(lang) {
    const grid = document.getElementById('candidates-grid');
    if (!grid) return;

    grid.innerHTML = '';
    // We have 16 candidates
    for (let i = 1; i <= 16; i++) {
        const name = translations[lang].candidates[`c${i}_name`];
        const role = translations[lang].candidates[`c${i}_role`];

        // Alt colors for avatars
        const bgColor = i % 2 === 0 ? '#fef08a' : '#e0f2fe';

        const card = document.createElement('div');
        card.style.cssText = 'background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; cursor: pointer; transition: transform 0.2s;';
        card.onmouseover = () => card.style.transform = 'translateY(-5px)';
        card.onmouseout = () => card.style.transform = 'translateY(0)';
        card.onclick = () => openModal(i);
        card.innerHTML = `
      <div style="height: 180px; background: ${bgColor}; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 3rem;">👤</span>
      </div>
      <div style="padding: 1.5rem; flex-grow: 1;">
         <h3 style="font-size: 1.15rem; margin-bottom: 0.25rem; font-family: var(--font-display); text-transform: uppercase;">${name}</h3>
         <div style="color: var(--color-primary); font-weight: 600; font-size: 0.9rem;">${role}</div>
      </div>
    `;
        grid.appendChild(card);
    }
}

// Modal Functions
function openModal(candidateId) {
    const lang = currentLang;
    const t = translations[lang];
    const modal = document.getElementById('candidate-modal');

    if (!modal) return;

    // Populate data
    document.getElementById('modal-name').textContent = t.candidates[`c${candidateId}_name`];
    document.getElementById('modal-role').textContent = t.candidates[`c${candidateId}_role`];
    document.getElementById('modal-bio').textContent = t.candidates[`c${candidateId}_bio`];

    // Image logic (placeholder for now, matching the card style)
    const i = candidateId;
    const bgColor = i % 2 === 0 ? '#fef08a' : '#e0f2fe';
    const imagePlaceholder = document.getElementById('modal-image-placeholder');
    if (imagePlaceholder) {
        imagePlaceholder.style.background = bgColor;
        // If we had real images, we would set an img src here
        // imagePlaceholder.innerHTML = `<img src="..." ...>`;
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('candidate-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Function to update content
function updateContent(lang) {
    // Render candidates first so they exist for data-i18n if we were using it there
    // but we are injecting text directly in renderCandidates for better control.
    renderCandidates(lang);

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[lang];

        keys.forEach(k => {
            value = value ? value[k] : null;
        });

        if (value) {
            if (element.tagName === 'META' && element.getAttribute('name') === 'description') {
                // Handle meta description if we added it to translations (optional for now)
            } else {
                element.innerHTML = value; // Use innerHTML to support span tags in titles
            }
        }
    });

    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.style.opacity = '1';
            btn.style.transform = 'scale(1.2)';
        } else {
            btn.style.opacity = '0.5';
            btn.style.transform = 'scale(1)';
        }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Save preference
    localStorage.setItem('lang', lang);
    currentLang = lang;
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    updateContent(currentLang);

    // Event listeners
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.getAttribute('data-lang');
            updateContent(lang);
        });
    });

    // Modal Close Listeners
    const modal = document.getElementById('candidate-modal');
    const closeBtn = document.getElementById('modal-close');

    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    if (modal) {
        window.onclick = (event) => {
            if (event.target == modal) {
                closeModal();
            }
        };
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

console.log('Campaign page loaded with i18n');

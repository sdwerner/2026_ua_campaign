// Style imported via link tag in HTML for compatibility
import { translations } from './src/locales.js';

const defaultLang = 'ua';
let currentSavedLang = localStorage.getItem('lang');
let currentLang = (currentSavedLang && translations[currentSavedLang]) ? currentSavedLang : defaultLang;

// Function to render representatives
function renderCandidates(lang) {
    const grid = document.getElementById('representatives-grid');
    if (!grid) return;

    // Candidates with photos (based on file availability)
    const candidatesWithPhotos = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    // Custom object positions for specific candidates
    const customPositions = {
        1: 'center 10%',
        3: 'center 20%',
        6: 'center 25%'
    };

    grid.innerHTML = '';

    // Define display order: Viktoriia (1) and Sofiia (2) first, followed by others numerically
    const displayOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    displayOrder.forEach(i => {
        const name = translations[lang].representatives[`c${i}_name`];
        const role = translations[lang].representatives[`c${i}_role`];

        // Alt colors for avatars
        const bgColor = i % 2 === 0 ? '#fef08a' : '#e0f2fe';
        const hasPhoto = candidatesWithPhotos.includes(i);
        const isElected = [1, 2].includes(i);

        const card = document.createElement('div');
        card.className = 'rep-card-wrapper' + (isElected ? ' elected-highlight' : '');
        card.style.cssText = 'background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; cursor: pointer; transition: transform 0.2s;';
        card.onmouseover = () => card.style.transform = 'translateY(-5px)';
        card.onmouseout = () => card.style.transform = 'translateY(0)';
        card.onclick = () => openModal(i);

        let imageHtml;
        if (hasPhoto) {
            const position = customPositions[i] || 'top';
            imageHtml = `<img src="./public/images/candidates/c${i}.jpg" alt="${name}" style="width: 100%; height: 100%; object-fit: cover; object-position: ${position};">`;
        } else {
            imageHtml = `<img src="./public/images/candidate-placeholder.svg" alt="Placeholder" style="width: 50%; opacity: 0.5;">`;
        }

        const badgeHtml = isElected ? `<span class="elected-rep-badge">${translations[lang].representatives.elected_badge}</span>` : '';

        card.innerHTML = `
      ${badgeHtml}
      <div style="height: 250px; background: ${hasPhoto ? 'transparent' : bgColor}; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        ${imageHtml}
      </div>
      <div style="padding: 1.5rem; flex-grow: 1;">
         <h3 style="font-size: 1.15rem; margin-bottom: 0.25rem; font-family: var(--font-display); text-transform: uppercase;">${name}</h3>
         <div style="color: var(--color-primary); font-weight: 600; font-size: 0.9rem;">${role}</div>
      </div>
    `;
        grid.appendChild(card);
    });
}

// Modal Functions
const kavLinks = {
    1: 'https://frankfurt.de/service-und-rathaus/verwaltung/aemter-und-institutionen/geschaeftsstelle-der-kav/die-kav/mitglieder-der-kav/viktoriia-freifrau-von-rosen',
    2: 'https://frankfurt.de/service-und-rathaus/verwaltung/aemter-und-institutionen/geschaeftsstelle-der-kav/die-kav/mitglieder-der-kav/sofiia-petroshenko'
};

function openModal(candidateId) {
    const lang = currentLang;
    const t = translations[lang];
    const modal = document.getElementById('candidate-modal');

    if (!modal) return;

    // Populate data
    document.getElementById('modal-name').textContent = t.representatives[`c${candidateId}_name`];
    document.getElementById('modal-role').textContent = t.representatives[`c${candidateId}_role`];
    document.getElementById('modal-bio').textContent = t.representatives[`c${candidateId}_bio`];

    // KAV Member Link Button
    const kavContainer = document.getElementById('modal-kav-container');
    if (kavContainer) {
        const link = kavLinks[candidateId];
        if (link) {
            const btnText = lang === 'ua' ? 'Офіційний профіль KAV ↗' : (lang === 'de' ? 'Offizielles KAV-Profil ↗' : 'Official KAV Profile ↗');
            kavContainer.innerHTML = `<a href="${link}" target="_blank" class="btn btn-primary" style="display: inline-block; font-size: 0.9rem; padding: 0.6rem 1.2rem; text-decoration: none;">${btnText}</a>`;
            kavContainer.style.display = 'block';
        } else {
            kavContainer.innerHTML = '';
            kavContainer.style.display = 'none';
        }
    }

    // Image logic
    const candidatesWithPhotos = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const customPositions = {
        1: 'center 10%',
        3: 'center 20%',
        6: 'center 25%'
    };

    const hasPhoto = candidatesWithPhotos.includes(candidateId);
    const i = candidateId;
    const bgColor = i % 2 === 0 ? '#fef08a' : '#e0f2fe';

    const imageWrapper = document.querySelector('.modal-image-wrapper');
    if (imageWrapper) {
        if (hasPhoto) {
            const position = customPositions[i] || 'top';
            imageWrapper.innerHTML = `<img src="./public/images/candidates/c${i}.jpg" alt="Candidate" style="width: 100%; height: 100%; object-fit: cover; object-position: ${position};">`;
        } else {
            imageWrapper.innerHTML = `
                <div style="width: 100%; height: 100%; background: ${bgColor}; display: flex; align-items: center; justify-content: center;">
                    <img src="./public/images/candidate-placeholder.svg" style="width: 50%; opacity: 0.5;">
                </div>`;
        }
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
    // Render candidates first
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
            element.innerHTML = value; // Use innerHTML to support span/br tags
        }
    });

    // Update input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        let value = translations[lang];

        keys.forEach(k => {
            value = value ? value[k] : null;
        });

        if (value) {
            element.setAttribute('placeholder', value);
        }
    });

    // Update language switcher button states
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

    // Event listeners for language switcher
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

    // Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous errors & alerts
            document.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
            document.querySelectorAll('.form-error-text').forEach(el => {
                el.textContent = '';
                el.style.display = 'none';
            });

            const successAlert = document.getElementById('contact-alert-success');
            const dangerAlert = document.getElementById('contact-alert-danger');
            if (successAlert) successAlert.style.display = 'none';
            if (dangerAlert) dangerAlert.style.display = 'none';

            // Get form inputs
            const nameInput = document.getElementById('contact-name');
            const emailInput = document.getElementById('contact-email');
            const subjectInput = document.getElementById('contact-subject');
            const bodyInput = document.getElementById('contact-body');

            let isValid = true;

            // Helper function to display input validation errors
            function showError(inputEl, errorId, message) {
                inputEl.classList.add('error');
                const errText = document.getElementById(errorId);
                if (errText) {
                    errText.textContent = message;
                    errText.style.display = 'block';
                }
                isValid = false;
            }

            // Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'error-contact-name', currentLang === 'ua' ? 'Ім\'я є обов\'язковим' : (currentLang === 'de' ? 'Name ist erforderlich' : 'Name is required'));
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, 'error-contact-email', currentLang === 'ua' ? 'Електронна пошта є обов\'язковою' : (currentLang === 'de' ? 'E-Mail ist erforderlich' : 'Email is required'));
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'error-contact-email', currentLang === 'ua' ? 'Некоректний формат пошти' : (currentLang === 'de' ? 'Ungültiges E-Mail-Format' : 'Invalid email format'));
            }

            // Validate Subject
            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'error-contact-subject', currentLang === 'ua' ? 'Тема є обов\'язковою' : (currentLang === 'de' ? 'Betreff ist erforderlich' : 'Subject is required'));
            }

            // Validate Message Body
            if (!bodyInput.value.trim()) {
                showError(bodyInput, 'error-contact-body', currentLang === 'ua' ? 'Повідомлення є обов\'язковим' : (currentLang === 'de' ? 'Nachricht ist erforderlich' : 'Message is required'));
            } else if (bodyInput.value.trim().length < 10) {
                showError(bodyInput, 'error-contact-body', currentLang === 'ua' ? 'Повідомлення має містити щонайменше 10 символів' : (currentLang === 'de' ? 'Die Nachricht muss mindestens 10 Zeichen lang sein' : 'Message must be at least 10 characters long'));
            }

            if (!isValid) {
                if (dangerAlert) {
                    dangerAlert.innerHTML = translations[currentLang].contact.validation_err;
                    dangerAlert.style.display = 'block';
                }
                return;
            }

            // If valid, format mailto parameters
            const mailto = 'viktoriia.vonrosen@gmail.com';
            const subjectValue = subjectInput.value.trim();
            const subject = `[UD-FFM] Kontakt - ${subjectValue}`;
            
            const body = 
`Sehr geehrte Damen und Herren, / Шановні представники,

Sie haben eine Nachricht über das Kontaktformular der Webseite ud-ffm.de erhalten:

--------------------------------------------------
Name: ${nameInput.value.trim()}
E-Mail: ${emailInput.value.trim()}
Betreff: ${subjectInput.value.trim()}
--------------------------------------------------

Nachricht:
${bodyInput.value.trim()}

--------------------------------------------------
Mit freundlichen Grüßen
${nameInput.value.trim()}`;

            const mailtoUrl = `mailto:${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Execute mailto action
            window.location.href = mailtoUrl;

            // Show success message
            if (successAlert) {
                successAlert.innerHTML = translations[currentLang].contact.success_msg;
                successAlert.style.display = 'block';
            }

            // Reset form
            contactForm.reset();
        });
    }
});

console.log('Campaign page loaded with i18n and post-election updates');

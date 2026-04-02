// ======================
// main.js — Оазис SPA
// ======================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Прогресс-бар
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #2E4F3C, #D4BFA8);
        z-index: 9999;
        width: 0%;
        transition: width 0.08s linear;
    `;
    document.body.appendChild(progressBar);

    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    }

    // 2. Кнопка в шапке
    const bookingBtn = document.getElementById('nav-booking-btn');

    function handleNavButton() {
        if (window.scrollY > 650) {
            bookingBtn.classList.remove('hidden', 'opacity-0', 'translate-y-2');
            bookingBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            bookingBtn.classList.add('hidden', 'opacity-0', 'translate-y-2');
        }
    }

    // 3. Быстрая анимация всех карточек и секций
    function animateAllSections() {
        const elements = document.querySelectorAll('.section-fade');

        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'none';

            // Быстрая анимация с небольшой задержкой
            setTimeout(() => {
                el.style.transition = `all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * 40}ms`;
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 80);
        });
    }

    // 4. Анимация Hero (ещё быстрее)
    function animateHero() {
        const title = document.getElementById('hero-title');
        const subtitle = document.getElementById('hero-subtitle');
        const buttons = document.getElementById('hero-buttons');
        const scrollHint = document.getElementById('scroll-hint');

        setTimeout(() => title.classList.add('opacity-100', 'translate-y-0'), 100);
        setTimeout(() => subtitle.classList.add('opacity-100', 'translate-y-0'), 300);
        setTimeout(() => buttons.classList.add('opacity-100', 'translate-y-0'), 500);
        setTimeout(() => scrollHint.classList.add('opacity-100'), 800);
    }

    // 5. Плавный скролл
    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    const offset = 80;
                    const offsetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });
    }

    // Главная инициализация
    function init() {
        updateProgressBar();
        handleNavButton();
        animateAllSections();
        animateHero();
        smoothScroll();

        window.addEventListener('scroll', () => {
            updateProgressBar();
            handleNavButton();
        });
    }

    // Запуск
    init();
});
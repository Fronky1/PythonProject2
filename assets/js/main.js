// ======================
// main.js — Оазис SPA
// ======================

document.addEventListener('DOMContentLoaded', () => {

    // === 1. Прогресс-бар при скролле ===
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, #2E4F3C, #D4BFA8);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${scrollPercent}%`;
    }

    // === 2. Появление кнопки "Записаться" в шапке ===
    const bookingBtn = document.getElementById('nav-booking-btn');

    function handleNavButton() {
        if (window.scrollY > 650) {
            bookingBtn.classList.remove('hidden', 'opacity-0', 'translate-y-2');
            bookingBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            bookingBtn.classList.add('hidden', 'opacity-0', 'translate-y-2');
            bookingBtn.classList.remove('opacity-100', 'translate-y-0');
        }
    }

    // === 3. Улучшенная анимация для карточек услуг ===
    function animateCards() {
        const cards = document.querySelectorAll('#services .section-fade');

        cards.forEach((card, index) => {
            // Добавляем задержку появления (каждая следующая карточка позже)
            card.style.transitionDelay = `${index * 100}ms`;
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';

            // Запускаем анимацию, когда карточка попадает в поле зрения
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            card.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                        observer.disconnect();
                    }
                });
            }, {
                threshold: 0.2
            });

            observer.observe(card);
        });
    }

    // === 4. Плавный скролл к якорям ===
    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();
                    const navHeight = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // === 5. Инициализация всего ===
    function init() {
        updateProgressBar();
        handleNavButton();
        animateCards();
        smoothScroll();

        // Обновляем прогресс-бар и кнопку при скролле
        window.addEventListener('scroll', () => {
            updateProgressBar();
            handleNavButton();
        });

        // Обновление при изменении размера окна
        window.addEventListener('resize', updateProgressBar);
    }

    // Запуск
    init();
});
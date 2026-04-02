// ======================
// main.js — Оазис SPA
// ======================

document.addEventListener('DOMContentLoaded', () => {

    // === 1. Появление кнопки "Записаться" в шапке ===
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

    // === 2. Плавная анимация секций ===
    function animateSections() {
        const fadeElements = document.querySelectorAll('.section-fade');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.12,           // когда 12% элемента видно
            rootMargin: "0px 0px -60px 0px"
        });

        fadeElements.forEach(el => observer.observe(el));
    }

    // === 3. Плавный скролл к якорям (для ссылок #services, #certificates и т.д.) ===
    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();
                    const navHeight = 80; // высота шапки
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

    // === 4. Инициализация всего ===
    function init() {
        handleNavButton();
        animateSections();
        smoothScroll();

        // Обновляем кнопку при скролле
        window.addEventListener('scroll', handleNavButton);

        // Пересчитываем анимации при изменении размера окна
        window.addEventListener('resize', () => {
            // Можно добавить дополнительные действия при ресайзе
        });
    }

    // Запуск
    init();
});
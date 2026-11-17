document.addEventListener('DOMContentLoaded', () => {
    /* ===== Кнопка «Наверх» ===== */
    const backToTopButton = document.getElementById('back-to-top');

    const toggleBackToTop = () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleBackToTop);

    /* ===== Лайтбокс для изображений ===== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const zoomables = document.querySelectorAll('.zoomable');

    // Вспомогательная функция: достаём подпись из соседнего figcaption
    const getCaption = (img) => {
        const figure = img.closest('figure');
        if (figure) {
            const cap = figure.querySelector('figcaption');
            if (cap) return cap.textContent.trim();
        }
        return img.alt || '';
    };

    const openLightbox = (img) => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || '';
        lightboxCaption.textContent = getCaption(img);
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
        lightboxClose.focus();
    };

    const closeLightbox = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
        // Очищаем src после анимации, чтобы не мигало
        setTimeout(() => {
            if (!lightbox.classList.contains('open')) {
                lightboxImg.src = '';
                lightboxCaption.textContent = '';
            }
        }, 300);
    };

    // Клик по картинке — открыть
    zoomables.forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
        // Доступность: Enter/Space для клавиатуры
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'Увеличить изображение');
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(img);
            }
        });
    });

    // Закрытие: кнопка ×
    lightboxClose.addEventListener('click', closeLightbox);

    // Закрытие: клик по тёмному фону
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Закрытие: клик по самой картинке в лайтбоксе
    lightboxImg.addEventListener('click', closeLightbox);

    // Закрытие: клавиша Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            closeLightbox();
        }
    });

    /* ===== Плавное появление блоков ===== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fact-box, blockquote, .gallery-item, .hero-poster');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
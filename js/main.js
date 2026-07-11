// ========================================
// Lenis smooth scroll
// ========================================
let lenis = null;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const lenisRaf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(lenisRaf);
  };
  requestAnimationFrame(lenisRaf);
}

// ========================================
// AOS init
// ========================================
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 900,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic',
  });
  if (lenis) lenis.on('scroll', AOS.refresh);
}

// ========================================
// Product slider (Swiper)
// ========================================
if (typeof Swiper !== 'undefined') {
  new Swiper('.product-slider__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 22,
    navigation: {
      prevEl: '.product-slider__button--prev',
      nextEl: '.product-slider__button--next',
      disabledClass: 'is-disabled',
    },
    breakpoints: {
      1920: {
        spaceBetween: 30,
      },
    },
  });
}

// ========================================
// Footer "back to top"
// ========================================
const toTopButton = document.querySelector('.footer__to-top');
if (toTopButton) {
  toTopButton.addEventListener('click', () => {
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
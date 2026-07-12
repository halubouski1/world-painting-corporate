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
if (typeof Swiper !== 'undefined' && document.querySelector('.product-slider__swiper')) {
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
// History slider (Swiper)
// ========================================
if (typeof Swiper !== 'undefined' && document.querySelector('.history__swiper')) {
  new Swiper('.history__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 22,
    // align first/last card with the container edges (same as --container-padding)
    slidesOffsetBefore: 33,
    slidesOffsetAfter: 33,
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
    pagination: {
      el: '.history__pagination',
      clickable: true,
      bulletClass: 'history__page',
      bulletActiveClass: 'history__page--active',
      renderBullet: (index, className) =>
        '<button type="button" class="' + className + '">' + (index + 1) + '</button>',
    },
    breakpoints: {
      1920: {
        slidesOffsetBefore: 45,
        slidesOffsetAfter: 45,
      },
    },
  });
}

// ========================================
// Voices sliders (Swiper) — every .voices-slider instance
// ========================================
if (typeof Swiper !== 'undefined') {
  document.querySelectorAll('.voices-slider').forEach((slider) => {
    const swiperEl = slider.querySelector('.voices-slider__swiper');
    if (!swiperEl) return;
    new Swiper(swiperEl, {
      slidesPerView: 2,
      spaceBetween: 17,
       breakpoints: {
      1920: {
        spaceBetween: 23,
      },
    },
      loop: true,
      navigation: {
        prevEl: slider.querySelector('.voices-slider__button--prev'),
        nextEl: slider.querySelector('.voices-slider__button--next'),
      },
    });
  });
}

// ========================================
// Queens slider (3 cards per view)
// ========================================
if (typeof Swiper !== 'undefined' && document.querySelector('.queens-slider__swiper')) {
  new Swiper('.queens-slider__swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    navigation: {
      prevEl: '.queens-slider__button--prev',
      nextEl: '.queens-slider__button--next',
    },
    breakpoints: {
      1920: {
        spaceBetween: 30,
      },
    },
  });
}

// Keep the Queens nav buttons centred on the card image as it scales / re-wraps
const queensSlider = document.querySelector('.queens-slider');
if (queensSlider && 'ResizeObserver' in window) {
  const refImage = queensSlider.querySelector('.voices-card__image');
  const navButtons = queensSlider.querySelectorAll('.queens-slider__button');
  if (refImage && navButtons.length) {
    const centerNav = () => {
      // image sits at the top of the slider → its centre is half its height
      const center = refImage.offsetHeight / 2;
      navButtons.forEach((btn) => {
        btn.style.top = `${center}px`;
      });
    };
    // fires on first observe and whenever the image is resized (window/scale)
    new ResizeObserver(centerNav).observe(refImage);
  }
}

// ========================================
// Behind slider (Swiper) — full-bleed
// ========================================
if (typeof Swiper !== 'undefined' && document.querySelector('.behind__swiper')) {
  new Swiper('.behind__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 23,
    // first/last card aligned to the container edges
    slidesOffsetBefore: 33,
    slidesOffsetAfter: 33,
    navigation: {
      prevEl: '.behind__button--prev',
      nextEl: '.behind__button--next',
      disabledClass: 'is-disabled',
    },
    breakpoints: {
      1920: {
        slidesOffsetBefore: 45,
        slidesOffsetAfter: 45,
        spaceBetween: 30,
      },
    },
  });
}

// ========================================
// Hero scroll-down → next section
// ========================================
const scrollDown = document.querySelector('.hero__scrolldown');
if (scrollDown) {
  const nextSection = scrollDown.closest('.hero')?.nextElementSibling;
  if (nextSection) {
    scrollDown.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(nextSection);
      } else {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
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

// ========================================
// Animated stat counters (CountUp.js)
// ========================================
const counterEls = document.querySelectorAll('.planet__stat-number');
if (counterEls.length && typeof countUp !== 'undefined' && countUp.CountUp) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const counter = new countUp.CountUp(el, Number(el.dataset.count), {
        duration: 3,
        separator: ',',
        enableScrollSpy: false,
        startVal: 10000,
      });
      if (!counter.error) counter.start();
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  counterEls.forEach((el) => counterObserver.observe(el));
}
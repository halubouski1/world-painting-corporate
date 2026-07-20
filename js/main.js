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
    enabled: false, // disabled on mobile → cards stack (see media.css ≤1024)
    navigation: {
      prevEl: '.product-slider__button--prev',
      nextEl: '.product-slider__button--next',
      disabledClass: 'is-disabled',
    },
    breakpoints: {
      1025: {
        enabled: true,
        spaceBetween: 22,
      },
      1920: {
        enabled: true,
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
// Contact slider (video cards) — nav centred on the video
// ========================================
if (typeof Swiper !== 'undefined' && document.querySelector('.contact-slider__swiper')) {
  new Swiper('.contact-slider__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    slidesOffsetBefore: 33,
    slidesOffsetAfter: 33,
    navigation: {
      prevEl: '.contact-slider__button--prev',
      nextEl: '.contact-slider__button--next',
    },
    breakpoints: {
      1920: {
        slidesOffsetBefore: 45,
        slidesOffsetAfter: 45,
        spaceBetween: 40,
      },
    },
  });

  const contactSlider = document.querySelector('.contact-slider');
  const refVideo = contactSlider.querySelector('.contact-slide__video');
  const navButtons = contactSlider.querySelectorAll('.contact-slider__button');
  if ('ResizeObserver' in window && refVideo && navButtons.length) {
    const centerNav = () => {
      const center = refVideo.offsetHeight / 2;
      navButtons.forEach((btn) => {
        btn.style.top = `${center}px`;
      });
    };
    new ResizeObserver(centerNav).observe(refVideo);
  }
}

// ========================================
// Contact big slider (wide video cards, 2 per view) — nav centred on the video
// ========================================
if (typeof Swiper !== 'undefined' && document.querySelector('.contact-big-slider__swiper')) {
  const bigSlider = document.querySelector('.contact-big-slider');
  new Swiper('.contact-big-slider__swiper', {
    slidesPerView: 2,
    spaceBetween: 17,
    navigation: {
      prevEl: bigSlider.querySelector('.contact-big-slider__button--prev'),
      nextEl: bigSlider.querySelector('.contact-big-slider__button--next'),
    },
    breakpoints: {
      1920: {
        spaceBetween: 23,
      },
    },
  });

  const refVideo = bigSlider.querySelector('.contact-big-slide__video');
  const navButtons = bigSlider.querySelectorAll('.contact-big-slider__button');
  if ('ResizeObserver' in window && refVideo && navButtons.length) {
    const centerNav = () => {
      const center = refVideo.offsetHeight / 2;
      navButtons.forEach((btn) => {
        btn.style.top = `${center}px`;
      });
    };
    new ResizeObserver(centerNav).observe(refVideo);
  }
}

// ========================================
// News: "By recency" filter + pagination
// ========================================
const newsSection = document.querySelector('.news');
const newsGrid = document.querySelector('.news__grid');
if (newsSection && newsGrid) {
  const PAGE_SIZE = 10; // 2 featured + 8 small, one full screen
  const newsFilter = newsSection.querySelector('.news__filter');
  const newsPagination = newsSection.querySelector('.news__pagination');
  const allCards = Array.from(newsGrid.children);

  let sorted = true; // cards start sorted newest → oldest
  let ascending = false; // false = newest first (descending)
  let currentPage = 1;
  let busy = false; // ignore input while the fade is running

  const totalPages = () => Math.max(1, Math.ceil(allCards.length / PAGE_SIZE));

  const orderedCards = () => {
    if (!sorted) return allCards.slice();
    return allCards.slice().sort((a, b) => {
      const da = new Date(a.dataset.date).getTime();
      const db = new Date(b.dataset.date).getTime();
      return ascending ? da - db : db - da;
    });
  };

  const renderGrid = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageCards = orderedCards().slice(start, start + PAGE_SIZE);
    newsGrid.replaceChildren(...pageCards);
  };

  const renderPagination = () => {
    if (!newsPagination) return;
    const pages = totalPages();
    newsPagination.replaceChildren();
    if (pages <= 1) return; // nothing to page through
    for (let i = 1; i <= pages; i += 1) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'news__page' + (i === currentPage ? ' news__page--active' : '');
      btn.textContent = i;
      btn.addEventListener('click', () => goToPage(i));
      newsPagination.appendChild(btn);
    }
  };

  // fade out → swap → fade in; optionally scroll the section into view
  const rerender = (scroll) => {
    busy = true;
    newsGrid.classList.add('is-sorting');
    window.setTimeout(() => {
      renderGrid();
      renderPagination();
      newsGrid.classList.remove('is-sorting');
      busy = false;
      if (scroll) {
        if (lenis) lenis.scrollTo(newsSection);
        else newsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  function goToPage(page) {
    if (busy || page === currentPage) return;
    currentPage = page;
    rerender(true);
  }

  if (newsFilter) {
    newsFilter.addEventListener('click', () => {
      if (busy) return;
      ascending = newsFilter.classList.toggle('is-asc'); // flips arrow every click
      sorted = true;
      currentPage = 1; // re-sorting starts from the first page
      rerender(false);
    });
  }

  // initial paint (shows page 1, builds pagination if more than one page)
  renderGrid();
  renderPagination();
}

// ========================================
// Auto-rotating background + stories-style progress bars
// (shared by Newspapers and World Top)
// ========================================
const initStoriesSlider = (swiperEl, bars) => {
  const DELAY = 5000; // time each image is shown

  // past bars stay full, the active one fills over DELAY, future bars stay empty
  const setBars = (active) => {
    bars.forEach((fill, i) => {
      fill.style.transition = 'none';
      fill.style.width = i < active ? '100%' : '0%';
    });
    const current = bars[active];
    if (current) {
      void current.offsetWidth; // reflow so the fill animation restarts
      current.style.transition = `width ${DELAY}ms linear`;
      current.style.width = '100%';
    }
  };

  new Swiper(swiperEl, {
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 800,
    loop: true,
    allowTouchMove: false,
    autoplay: { delay: DELAY, disableOnInteraction: false },
    on: {
      init(sw) {
        setBars(sw.realIndex);
      },
      slideChangeTransitionEnd(sw) {
        setBars(sw.realIndex);
      },
    },
  });
};

if (typeof Swiper !== 'undefined') {
  const newspapersSwiperEl = document.querySelector('.newspapers__swiper');
  if (newspapersSwiperEl) {
    initStoriesSlider(newspapersSwiperEl, Array.from(document.querySelectorAll('.newspapers__bar-fill')));
  }

  const worldTopSwiperEl = document.querySelector('.world-top__swiper');
  if (worldTopSwiperEl) {
    initStoriesSlider(worldTopSwiperEl, Array.from(document.querySelectorAll('.world-top__bar-fill')));
  }

  const worldStageBgEl = document.querySelector('.world-stage__bg-swiper');
  if (worldStageBgEl) {
    initStoriesSlider(worldStageBgEl, Array.from(document.querySelectorAll('.world-stage__bar-fill')));
  }
}

// ========================================
// World Stage — looped logo marquee (never stops)
// ========================================
if (typeof Swiper !== 'undefined' && document.querySelector('.world-stage__logos')) {
  new Swiper('.world-stage__logos', {
    slidesPerView: 'auto',
    spaceBetween: 12,
    loop: true,
    allowTouchMove: false,
    speed: 4000,
    autoplay: { delay: 0, disableOnInteraction: false },
    breakpoints: {
      1920: {
        spaceBetween: 20,
      },
      1919: {
        spaceBetween: 15,
      },
    },
  });
}

// ========================================
// Coin of Peace — card slider (static image stays, cards slide)
// ========================================
if (typeof Swiper !== 'undefined' && document.querySelector('.peace__swiper')) {
  const peace = document.querySelector('.peace');
  new Swiper('.peace__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 22,
    navigation: {
      prevEl: peace.querySelector('.product-slider__button--prev'),
      nextEl: peace.querySelector('.product-slider__button--next'),
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
// For Peace — full-bleed card slider
// ========================================
if (typeof Swiper !== 'undefined' && document.querySelector('.for-peace__swiper')) {
  const forPeace = document.querySelector('.for-peace');
  new Swiper('.for-peace__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 15,
    slidesOffsetBefore: 33,
    slidesOffsetAfter: 33,
    navigation: {
      prevEl: forPeace.querySelector('.product-slider__button--prev'),
      nextEl: forPeace.querySelector('.product-slider__button--next'),
      disabledClass: 'is-disabled',
    },
    breakpoints: {
      1920: {
        slidesOffsetBefore: 45,
        slidesOffsetAfter: 45,
        spaceBetween: 20,
      },
    },
  });
}

// ========================================
// Stamp of Peace — image that follows the cursor over the rows
// ========================================
const stampRows = document.querySelector('.stamp__rows');
const stampCursor = document.querySelector('.stamp__cursor');
if (stampRows && stampCursor) {
  const moveStampCursor = (e) => {
    stampCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  };
  stampRows.addEventListener('mouseenter', (e) => {
    moveStampCursor(e); // place it under the cursor first, then reveal — no jump
    stampCursor.classList.add('is-visible');
  });
  stampRows.addEventListener('mouseleave', () => stampCursor.classList.remove('is-visible'));
  stampRows.addEventListener('mousemove', moveStampCursor);
}

// ========================================
// Beyond Earth — scroll-driven rotating wheel
// ========================================
const beyond = document.querySelector('.beyond');
if (beyond) {
  const circle = beyond.querySelector('.beyond__circle');
  const points = Array.from(beyond.querySelectorAll('.beyond__point'));
  const content = beyond.querySelector('.beyond__content');
  const numEl = beyond.querySelector('.beyond__num');
  const descEl = beyond.querySelector('.beyond__desc');
  const N = points.length;
  const STEP = 360 / N; // 72°

  let activeIndex = -1;
  let swapTimer = null;

  // place each star point on the circle perimeter for a given rotation
  const positionPoints = (rot) => {
    points.forEach((p, i) => {
      const a = ((-90 + i * STEP + rot) * Math.PI) / 180;
      p.style.left = `${50 + 50 * Math.cos(a)}%`;
      p.style.top = `${50 + 50 * Math.sin(a)}%`;
    });
    circle.style.transform = `rotate(${rot}deg)`;
  };

  const setActive = (idx) => {
    if (idx === activeIndex) return;
    activeIndex = idx;
    points.forEach((p, i) => p.classList.toggle('is-active', i === idx));

    const point = points[idx];
    content.classList.add('is-changing');
    window.clearTimeout(swapTimer); // drop any pending swap from a fast scroll
    swapTimer = window.setTimeout(() => {
      numEl.textContent = point.querySelector('.beyond__point-num').textContent;
      descEl.innerHTML = point.querySelector('.beyond__point-desc').innerHTML;
      content.classList.remove('is-changing');
    }, 350);
  };

  const update = () => {
    const total = beyond.offsetHeight - window.innerHeight;
    const progress = total > 0
      ? Math.min(1, Math.max(0, -beyond.getBoundingClientRect().top / total))
      : 0;
    const rot = -progress * STEP * (N - 1); // negative = counter-clockwise
    positionPoints(rot);
    setActive(Math.round(progress * (N - 1)));
  };

  positionPoints(0);
  points[0].classList.add('is-active');
  activeIndex = 0;
  update();

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  if (lenis) lenis.on('scroll', update);
}

// ========================================
// Cross-slider — horizontal panel transition driven by vertical scroll
// ========================================
const crossSlider = document.querySelector('.cross-slider');
if (crossSlider) {
  const track = crossSlider.querySelector('.cross-slider__track');
  const panelCount = track.children.length;
  const updateCrossSlider = () => {
    const total = crossSlider.offsetHeight - window.innerHeight;
    const progress = total > 0
      ? Math.min(1, Math.max(0, -crossSlider.getBoundingClientRect().top / total))
      : 0;
    // slide the track left so the next panel comes in from the right
    track.style.transform = `translate3d(-${progress * (panelCount - 1) * 100}vw, 0, 0)`;
  };
  updateCrossSlider();
  window.addEventListener('scroll', updateCrossSlider, { passive: true });
  window.addEventListener('resize', updateCrossSlider);
  if (lenis) lenis.on('scroll', updateCrossSlider);
}

// ========================================
// Buy modal — opens from every "Buy now" button
// ========================================
const buyModal = document.querySelector('#buy-modal');
if (buyModal) {
  const openModal = () => {
    buyModal.classList.add('is-open');
    buyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };
  const closeModal = () => {
    buyModal.classList.remove('is-open');
    buyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  document.querySelectorAll('.collectible-card__button').forEach((btn) => {
    btn.addEventListener('click', openModal);
  });
  buyModal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && buyModal.classList.contains('is-open')) closeModal();
  });

  // phone field with country selector
  const phoneInput = buyModal.querySelector('#modal-phone');
  if (phoneInput && typeof window.intlTelInput === 'function') {
    window.intlTelInput(phoneInput, {
      initialCountry: 'us',
      allowDropdown: false, // just the flag — no country dropdown
      separateDialCode: false, // dial code lives in the input, so it can be edited
      nationalMode: false, // keep the +code in the value
      autoPlaceholder: 'off',
    });

    const PREFILL = '+1 ';
    phoneInput.value = PREFILL; // prefilled — user can delete it and type their own

    // show a placeholder-style hint right after the "+1" until the user starts typing
    const hint = buyModal.querySelector('#modal-phone-hint');
    if (hint) {
      const cs = getComputedStyle(phoneInput);
      const meas = document.createElement('span');
      meas.style.cssText = 'position:absolute;visibility:hidden;white-space:pre';
      meas.style.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      meas.style.letterSpacing = cs.letterSpacing;
      meas.textContent = PREFILL;
      document.body.appendChild(meas);
      hint.style.left = `${parseFloat(cs.paddingLeft) + meas.offsetWidth}px`;
      meas.remove();

      const toggleHint = () => {
        hint.style.opacity = phoneInput.value.trim() === '+1' ? '1' : '0';
      };
      phoneInput.addEventListener('input', toggleHint);
      toggleHint();
    }
  }
}

// ========================================
// Burger menu — off-canvas panel
// ========================================
const burgerMenu = document.querySelector('#main-menu');
const burgerButton = document.querySelector('.burger');
if (burgerMenu && burgerButton) {
  const openMenu = () => {
    burgerMenu.classList.add('is-open');
    burgerMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };
  const closeMenu = () => {
    burgerMenu.classList.remove('is-open');
    burgerMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  burgerButton.addEventListener('click', openMenu);
  burgerMenu.querySelectorAll('[data-menu-close]').forEach((el) => {
    el.addEventListener('click', closeMenu);
  });
  burgerMenu.querySelectorAll('.menu__link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && burgerMenu.classList.contains('is-open')) closeMenu();
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
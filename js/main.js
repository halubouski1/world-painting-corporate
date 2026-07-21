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
    enabled: false, // <=570: plain vertical deck (re-enabled from 571 up, see CSS)
    navigation: {
      prevEl: '.product-slider__button--prev',
      nextEl: '.product-slider__button--next',
      disabledClass: 'is-disabled',
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
      571: {
        enabled: true,
        slidesOffsetBefore: 33,
        slidesOffsetAfter: 33,
        spaceBetween: 22,
      },
      1920: {
        enabled: true,
        slidesOffsetBefore: 45,
        slidesOffsetAfter: 45,
        spaceBetween: 30,
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
      slidesPerView: 1,
      spaceBetween: 17,
       breakpoints: {
      1920: {
        spaceBetween: 23,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 17,
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
    slidesPerView: 1,
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
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
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
    spaceBetween: 19,
    // first/last card aligned to the container edges
    slidesOffsetBefore: 14,
    slidesOffsetAfter: 14,
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
      1919: {
        slidesOffsetBefore: 33,
        slidesOffsetAfter: 33,
        spaceBetween: 23,
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
    spaceBetween: 18,
    slidesOffsetBefore: 14,
    slidesOffsetAfter: 14,
    navigation: {
      prevEl: '.contact-slider__button--prev',
      nextEl: '.contact-slider__button--next',
      disabledClass: 'is-disabled',
    },
    breakpoints: {
      1920: {
        slidesOffsetBefore: 45,
        slidesOffsetAfter: 45,
        spaceBetween: 40,
      },
      1024: {
        slidesOffsetBefore: 33,
        slidesOffsetAfter: 33,
        spaceBetween: 30,
      }
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
    slidesPerView: 1,
    spaceBetween: 17,
    navigation: {
      prevEl: bigSlider.querySelector('.contact-big-slider__button--prev'),
      nextEl: bigSlider.querySelector('.contact-big-slider__button--next'),
      disabledClass: 'is-disabled',
    },
    breakpoints: {
      1920: {
        spaceBetween: 23,
      },
      1024: {
        slidesPerView: 2,
      }
    },
  });

  const refVideo = bigSlider.querySelector('.contact-big-slide__video');
  const navButtons = bigSlider.querySelectorAll('.contact-big-slider__button');
  if ('ResizeObserver' in window && refVideo && navButtons.length) {
    const centerNav = () => {
      let top;
      if (window.matchMedia('(max-width: 570px)').matches) {
        // mobile: drop the arrows onto the title row, bottom-right (like the small slider)
        const mb = parseFloat(getComputedStyle(refVideo).marginBottom) || 0;
        const title = bigSlider.querySelector('.contact-cards__title');
        const titleH = title ? title.offsetHeight : 0;
        top = refVideo.offsetHeight + mb + titleH / 2;
      } else {
        top = refVideo.offsetHeight / 2;
      }
      navButtons.forEach((btn) => {
        btn.style.top = `${top}px`;
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

  // --- mobile (<=1024): first two cards stay stacked, the rest become a slider ---
  const newsMQ = window.matchMedia('(max-width: 1024px)');
  let newsSwiper = null;

  const clearMobileSlider = () => {
    if (newsSwiper) { newsSwiper.destroy(true, false); newsSwiper = null; }
    const existing = newsSection.querySelector('.news__slider');
    if (existing) existing.remove();
    // strip Swiper leftovers so the cards render cleanly wherever they land next
    allCards.forEach((c) => {
      c.classList.remove('swiper-slide');
      c.style.width = '';
      c.style.marginRight = '';
      c.style.marginLeft = '';
    });
  };

  const buildMobileSlider = () => {
    clearMobileSlider();
    if (!newsMQ.matches || typeof Swiper === 'undefined') return;
    const cards = Array.from(newsGrid.children);
    if (cards.length <= 2) return; // only the featured pair — nothing to slide
    const rest = cards.slice(2);

    const slider = document.createElement('div');
    slider.className = 'news__slider';
    slider.innerHTML =
      '<div class="news__slider-nav">' +
        '<button class="news__slider-button news__slider-button--prev" type="button" aria-label="Previous slide">' +
          '<img src="assets/icons/slider-nav-left.svg" alt="" width="12" height="12">' +
        '</button>' +
        '<button class="news__slider-button news__slider-button--next" type="button" aria-label="Next slide">' +
          '<img src="assets/icons/slider-nav-right.svg" alt="" width="12" height="12">' +
        '</button>' +
      '</div>' +
      '<div class="swiper news__swiper"><div class="swiper-wrapper"></div></div>';

    const swWrapper = slider.querySelector('.swiper-wrapper');
    rest.forEach((card) => {
      card.classList.add('swiper-slide');
      swWrapper.appendChild(card);
    });
    newsGrid.after(slider);

    // the swiper is full-bleed (negative margins in CSS); offset the first/last
    // slide by the container padding so the deck lines up with the cards above
    const container = newsSection.querySelector('.container');
    const pad = container ? parseFloat(getComputedStyle(container).paddingLeft) || 0 : 0;

    newsSwiper = new Swiper(slider.querySelector('.news__swiper'), {
      slidesPerView: 'auto',
      spaceBetween: 10,
      slidesOffsetBefore: pad,
      slidesOffsetAfter: pad,
      navigation: {
        prevEl: slider.querySelector('.news__slider-button--prev'),
        nextEl: slider.querySelector('.news__slider-button--next'),
        disabledClass: 'is-disabled',
      },
    });
  };

  const renderGrid = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageCards = orderedCards().slice(start, start + PAGE_SIZE);
    newsGrid.replaceChildren(...pageCards);
    buildMobileSlider();
  };

  // rebuild the layout when crossing the 1024 breakpoint
  newsMQ.addEventListener('change', () => renderGrid());

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
    enabled: false, // <=1024: cards stack above/below the static image (see CSS)
    navigation: {
      prevEl: peace.querySelector('.product-slider__button--prev'),
      nextEl: peace.querySelector('.product-slider__button--next'),
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
// For Peace — full-bleed card slider
// ========================================
if (typeof Swiper !== 'undefined' && document.querySelector('.for-peace__swiper')) {
  const forPeace = document.querySelector('.for-peace');
  new Swiper('.for-peace__swiper', {
    slidesPerView: 'auto', // <=570: one card fills the container (width set in CSS)
    spaceBetween: 15,
    slidesOffsetBefore: 14,
    slidesOffsetAfter: 14,
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
      1024: {
        slidesOffsetBefore: 33,
        slidesOffsetAfter: 33,
        spaceBetween: 15,
      },
    },
  });
}

// ========================================
// Stamp of Peace — image that follows the cursor over the rows
// ========================================
const stampSection = document.querySelector('.stamp');
const stampRows = document.querySelector('.stamp__rows');
const stampCursor = document.querySelector('.stamp__cursor');
if (stampSection && stampRows && stampCursor) {
  const rows = Array.from(stampRows.querySelectorAll('.stamp-row'));
  const mq = window.matchMedia('(max-width: 1024px)');

  // --- desktop: the image follows the cursor over the rows ---
  const moveStampCursor = (e) => {
    stampCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  };
  const onEnter = (e) => {
    moveStampCursor(e); // place it under the cursor first, then reveal — no jump
    stampCursor.classList.add('is-visible');
  };
  const onLeave = () => stampCursor.classList.remove('is-visible');

  // --- mobile: rows fill with colour on scroll; image rides the active frontier ---
  let ticking = false;
  const updateScroll = () => {
    ticking = false;
    const line = window.innerHeight * 0.65; // rows light up as their centre passes this line
    let frontier = null;
    rows.forEach((row) => {
      const rect = row.getBoundingClientRect();
      const active = rect.top + rect.height / 2 <= line;
      row.classList.toggle('is-active', active);
      if (active) frontier = row;
    });
    if (frontier) {
      // park the image on the bottom border of the last lit row, on the side
      stampCursor.style.top = `${frontier.offsetTop + frontier.offsetHeight}px`;
      stampCursor.classList.add('is-visible');
    } else {
      stampCursor.classList.remove('is-visible');
    }
  };
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  };

  const enableDesktop = () => {
    stampRows.addEventListener('mouseenter', onEnter);
    stampRows.addEventListener('mouseleave', onLeave);
    stampRows.addEventListener('mousemove', moveStampCursor);
  };
  const disableDesktop = () => {
    stampRows.removeEventListener('mouseenter', onEnter);
    stampRows.removeEventListener('mouseleave', onLeave);
    stampRows.removeEventListener('mousemove', moveStampCursor);
    stampCursor.style.transform = ''; // hand the transform back to CSS
    stampCursor.classList.remove('is-visible');
  };
  const enableMobile = () => {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateScroll();
  };
  const disableMobile = () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    rows.forEach((r) => r.classList.remove('is-active'));
    stampCursor.classList.remove('is-visible');
    stampCursor.style.top = '';
  };

  const setMode = (mobile) => {
    if (mobile) {
      disableDesktop();
      enableMobile();
    } else {
      disableMobile();
      enableDesktop();
    }
  };
  setMode(mq.matches);
  mq.addEventListener('change', (e) => setMode(e.matches));
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
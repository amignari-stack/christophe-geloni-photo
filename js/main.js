/* ============================================
   CHRISTOPHE GELONI PHOTOGRAPHIES — main.js
   Vanilla JS — aucune dépendance
   ============================================ */

(function () {
  'use strict';

  /* ----------------------------------------
     NAV — Scroll & Hamburger
     ---------------------------------------- */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const navLinks = document.querySelector('.nav__links');
  const navOverlay = document.querySelector('.nav__overlay');

  // Fond opaque au scroll
  function handleNavScroll() {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // état initial

  // Hamburger mobile
  function toggleMenu() {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    if (navOverlay) navOverlay.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    if (!navLinks || !navLinks.classList.contains('open')) return;
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Fermer le menu au clic sur un lien
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ----------------------------------------
     FADE-IN — Intersection Observer
     ---------------------------------------- */
  var fadeSel = '.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale';
  var fadeEls = document.querySelectorAll(fadeSel);

  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  /* ----------------------------------------
     PORTFOLIO — Filtres
     ---------------------------------------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery__item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = this.getAttribute('data-filter');

      // Active state
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      // Filtrer les items
      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ----------------------------------------
     LIGHTBOX
     ---------------------------------------- */
  var lightbox = document.querySelector('.lightbox');
  var lightboxImg = document.querySelector('.lightbox__img');
  var lightboxClose = document.querySelector('.lightbox__close');
  var lightboxPrev = document.querySelector('.lightbox__prev');
  var lightboxNext = document.querySelector('.lightbox__next');
  var lightboxCounter = document.querySelector('.lightbox__counter');
  var currentIndex = 0;

  function getVisibleItems() {
    return Array.prototype.filter.call(galleryItems, function (item) {
      return !item.classList.contains('hidden');
    });
  }

  function openLightbox(index) {
    if (!lightbox) return;
    var items = getVisibleItems();
    if (index < 0 || index >= items.length) return;

    currentIndex = index;
    var item = items[currentIndex];
    var img = item.querySelector('img');
    var src = img ? img.getAttribute('src') : '';
    var alt = img ? img.getAttribute('alt') : '';

    lightboxImg.setAttribute('src', src);
    lightboxImg.setAttribute('alt', alt);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateCounter(items.length);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    var items = getVisibleItems();
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = items.length - 1;
    if (currentIndex >= items.length) currentIndex = 0;

    var item = items[currentIndex];
    var img = item.querySelector('img');
    lightboxImg.setAttribute('src', img ? img.getAttribute('src') : '');
    lightboxImg.setAttribute('alt', img ? img.getAttribute('alt') : '');
    updateCounter(items.length);
  }

  function updateCounter(total) {
    if (lightboxCounter) {
      lightboxCounter.textContent = (currentIndex + 1) + ' / ' + total;
    }
  }

  // Ouvrir au clic
  galleryItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      var visibleItems = getVisibleItems();
      var visibleIndex = visibleItems.indexOf(this);
      openLightbox(visibleIndex !== -1 ? visibleIndex : 0);
    });
  });

  // Fermer
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Clic sur overlay (en dehors de l'image)
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Navigation
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function (e) {
      e.stopPropagation();
      navigateLightbox(-1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', function (e) {
      e.stopPropagation();
      navigateLightbox(1);
    });
  }

  // Clavier
  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  /* ----------------------------------------
     SMOOTH SCROLL — Ancres internes
     ---------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var offset = nav ? nav.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ----------------------------------------
     FORMULAIRE CONTACT — Validation basique
     ---------------------------------------- */
  var contactForm = document.querySelector('.contact__form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      var requiredFields = contactForm.querySelectorAll('[required]');
      var firstInvalid = null;

      // Nettoyer les erreurs précédentes
      contactForm.querySelectorAll('.form-error').forEach(function (el) {
        el.remove();
      });
      contactForm.querySelectorAll('.form-group--error').forEach(function (el) {
        el.classList.remove('form-group--error');
      });

      requiredFields.forEach(function (field) {
        var value = field.value.trim();
        var isValid = true;

        if (!value) {
          isValid = false;
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          isValid = false;
        }

        if (!isValid) {
          e.preventDefault();
          var group = field.closest('.form-group');
          if (group) {
            group.classList.add('form-group--error');
            var msg = document.createElement('span');
            msg.className = 'form-error';
            msg.textContent = field.type === 'email' && value
              ? 'Adresse email invalide'
              : 'Ce champ est requis';
            group.appendChild(msg);
          }
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
      }
    });

    // Retirer l'erreur au focus
    contactForm.addEventListener(
      'focus',
      function (e) {
        var group = e.target.closest('.form-group--error');
        if (group) {
          group.classList.remove('form-group--error');
          var err = group.querySelector('.form-error');
          if (err) err.remove();
        }
      },
      true
    );
  }
})();

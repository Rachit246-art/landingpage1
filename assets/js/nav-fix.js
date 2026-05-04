/**
 * RV Global Aviation – Nav Fix + Scroll Animations v2
 * 1. Dropdown hover-gap bridge (300ms delay before close)
 * 2. Scroll-triggered slide-in animations via IntersectionObserver
 */
(function () {
    'use strict';

    /* ─────────────────────────────────────────────
       1.  DROPDOWN HOVER-GAP FIX
    ───────────────────────────────────────────── */
    function initNavFix() {
        var menuItems = document.querySelectorAll(
            '.elementor-nav-menu--main li.menu-item-has-children'
        );

        menuItems.forEach(function (item) {
            var dropdown = item.querySelector(
                '.elementor-nav-menu--dropdown, .sub-menu'
            );
            if (!dropdown) return;

            var closeTimer = null;

            function showDropdown() {
                if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
                dropdown.style.display     = 'block';
                dropdown.style.opacity     = '1';
                dropdown.style.visibility  = 'visible';
                dropdown.style.pointerEvents = 'all';
            }

            function hideDropdown(delay) {
                closeTimer = setTimeout(function () {
                    dropdown.style.display     = '';
                    dropdown.style.opacity     = '';
                    dropdown.style.visibility  = '';
                    dropdown.style.pointerEvents = '';
                }, delay || 300);
            }

            item.addEventListener('mouseenter', showDropdown);
            item.addEventListener('mouseleave', function () { hideDropdown(300); });
            dropdown.addEventListener('mouseenter', showDropdown);
            dropdown.addEventListener('mouseleave', function () { hideDropdown(200); });
        });
    }

    /* ─────────────────────────────────────────────
       2.  SCROLL SLIDE-IN ANIMATIONS
    ───────────────────────────────────────────── */
    function initScrollAnimations() {
        // Elements to animate – Elementor widgets and sections
        var selectors = [
            '.elementor-widget',
            '.elementor-widget-icon-box',
            '.elementor-widget-heading',
            '.elementor-widget-image',
            '.elementor-widget-text-editor',
            '.elementor-widget-button',
            '.elementor-widget-image-carousel',
            '.elementor-column > .elementor-widget-wrap',
            '.e-con'
        ].join(', ');

        var elements = document.querySelectorAll(selectors);

        if (!('IntersectionObserver' in window)) {
            // Fallback: just show everything immediately
            elements.forEach(function (el) { el.classList.add('rv-visible'); });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('rv-visible');
                    observer.unobserve(entry.target); // animate once
                }
            });
        }, {
            threshold: 0.08,    // trigger when 8% visible
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(function (el, i) {
            // Skip elements already in the viewport on load (hero, nav)
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92) {
                el.classList.add('rv-visible');
                return;
            }

            el.classList.add('rv-animate');

            // Alternate left/right for columns, default up for rest
            if (el.classList.contains('elementor-column') || el.classList.contains('e-con')) {
                el.classList.add(i % 2 === 0 ? 'rv-animate--left' : 'rv-animate--right');
            }

            observer.observe(el);
        });
    }

    /* ─────────────────────────────────────────────
       3.  INIT on DOM ready
    ───────────────────────────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initNavFix();
            initScrollAnimations();
        });
    } else {
        initNavFix();
        initScrollAnimations();
    }
})();

/**
 * RV Global Aviation – Nav Dropdown Hover Fix
 * Ensures the "OUR SERVICES" dropdown stays open long enough to click.
 * Uses a timer-based hover that bridges the CSS gap between nav item and dropdown.
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var menuItems = document.querySelectorAll(
            '.elementor-nav-menu--main li.menu-item-has-children'
        );

        menuItems.forEach(function(item) {
            var dropdown = item.querySelector('.elementor-nav-menu--dropdown, .sub-menu');
            if (!dropdown) return;

            var closeTimer = null;

            // Show on hover
            item.addEventListener('mouseenter', function() {
                if (closeTimer) {
                    clearTimeout(closeTimer);
                    closeTimer = null;
                }
                dropdown.style.display = 'block';
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.pointerEvents = 'all';
            });

            // Delayed hide – gives user 300ms to move into dropdown
            item.addEventListener('mouseleave', function() {
                closeTimer = setTimeout(function() {
                    dropdown.style.display = '';
                    dropdown.style.opacity = '';
                    dropdown.style.visibility = '';
                    dropdown.style.pointerEvents = '';
                }, 300);
            });

            // Keep open while hovering dropdown itself
            dropdown.addEventListener('mouseenter', function() {
                if (closeTimer) {
                    clearTimeout(closeTimer);
                    closeTimer = null;
                }
            });

            dropdown.addEventListener('mouseleave', function() {
                closeTimer = setTimeout(function() {
                    dropdown.style.display = '';
                    dropdown.style.opacity = '';
                    dropdown.style.visibility = '';
                    dropdown.style.pointerEvents = '';
                }, 200);
            });
        });
    });
})();

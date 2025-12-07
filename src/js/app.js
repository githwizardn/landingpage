document.addEventListener('DOMContentLoaded', function() {
    
     // 1. MOBILE NAVIGATION TOGGLE
     const toggleButton = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav');

    // Toggle the navigation menu on button click
    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
            toggleButton.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Close the menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
    });


     //  TESTIMONIALS SLIDER FUNCTIONALITY
    
    //  Select cards specifically within the wrapper 
    // to ensure you're targeting the correct elements for the slider.
    const cards = document.querySelectorAll('.testimonial-cards-wrapper .testimonial-card');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let currentIndex = 0; // Start at the first slide

    if (cards.length > 0 && dots.length > 0) {
        /**
         * Updates the UI to show the slide at the specified index.
         * @param {number} index - The index of the slide to show.
         */
        function showSlide(index) {
            // Ensure index wraps around (for future auto-slide functionality)
            const totalSlides = cards.length;
            if (index >= totalSlides) {
                index = 0;
            } else if (index < 0) {
                index = totalSlides - 1;
            }
            currentIndex = index;

            // 1. Hide all cards and remove 'active' from all dots
            cards.forEach(card => card.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // 2. Show the current card and mark the corresponding dot as 'active'
            if (cards[currentIndex]) {
                cards[currentIndex].classList.add('active');
            }
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }

        // Initialize the slider to show the first slide (index 0)
        showSlide(currentIndex);

        // Add click listeners to all dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                // Get the index from the data-index attribute (must be present in HTML)
                const index = parseInt(this.getAttribute('data-index'));
                if (!isNaN(index)) {
                    showSlide(index);
                }
            });
        });
    }
});
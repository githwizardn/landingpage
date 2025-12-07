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


// HERO SECTION - PHOTO SLIDER FUNCTIONALITY
 
document.addEventListener('DOMContentLoaded', function() {
    const heroImages = document.querySelectorAll('.hero-slider .slider-image');
    let heroIndex = 0;
    const slideDuration = 5000; //  5 seconds

    if (heroImages.length > 1) {
        
        function showNextHeroSlide() {
            //  Remove 'active' class from current image
            heroImages[heroIndex].classList.remove('active');

            //   Increment index, wrapping around to 0 if we reach the end
            heroIndex = (heroIndex + 1) % heroImages.length; 

            //   Add 'active' class to the new image
            heroImages[heroIndex].classList.add('active');
        }

        // Initialize the automatic slide transition
        // Start the rotation: call showNextHeroSlide every 5 seconds
        setInterval(showNextHeroSlide, slideDuration);
    }
});

 // PROJECTS SECTION - FILTERING FUNCTIONALITY
 
 
 
 document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 1. მიიღე არჩეული კატეგორია ღილაკიდან
            const selectedCategory = this.getAttribute('data-category');

            // 2. ამოიღე 'active' კლასი ყველა ღილაკიდან
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // 3. დაამატე 'active' კლასი მხოლოდ დაწკაპულ ღილაკს
            this.classList.add('active');

            // 4. გაფილტრე პროექტები
            projectItems.forEach(project => {
                const projectCategories = project.getAttribute('data-category');

                if (selectedCategory === 'all') {
                    // თუ არჩეულია "ყველა", აჩვენე ყველა პროექტი
                    project.classList.remove('hidden');
                } else if (projectCategories.includes(selectedCategory)) {
                    // თუ პროექტს აქვს არჩეული კატეგორია, აჩვენე
                    project.classList.remove('hidden');
                } else {
                    // დამალე ყველა დანარჩენი
                    project.classList.add('hidden');
                }
            });
        });
    });
});
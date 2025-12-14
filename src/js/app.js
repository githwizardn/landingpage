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





 // ABOUT ME SECTION - SKILL BAR ANIMATION
 
document.addEventListener('DOMContentLoaded', function() {
    // შემოწმება, რომ About Me სექციას აქვს კლასი .about-section
    const aboutSection = document.querySelector('.about-section');
    const skillBars = document.querySelectorAll('.skill-bar span');
    
    if (!aboutSection) return; 

    function animateSkills() {
        skillBars.forEach(bar => {
            // იღებს data-progress-ს (მაგ. '95')
            const progress = bar.getAttribute('data-progress');
            
            //  ცვლის width-ს (მაგ. '95%'), რაც იწვევს CSS transition-ს.
            bar.style.width = progress + '%';
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // თუ სექცია გამოჩნდა, დაიწყე ანიმაცია
                animateSkills();
                
                // შეწყვიტე მონიტორინგი, რომ ანიმაცია არ განმეორდეს
                observer.unobserve(entry.target);
            }
        });
    }, {
        // სექციის 10% უნდა იყოს ეკრანზე
        threshold: 0.1 
    });

    observer.observe(aboutSection);
});

 // PROJECTS SECTION - FILTERING FUNCTIONALITY
 
 
 
 document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            //  არჩეული კატეგორია ღილაკიდან
            const selectedCategory = this.getAttribute('data-category');

            //   ამოიღე 'active' კლასი ყველა ღილაკიდან
            filterButtons.forEach(btn => btn.classList.remove('active'));

            //   დაამატე 'active' კლასი მხოლოდ დაწკაპულ ღილაკს
            this.classList.add('active');

            //   გაფილტრე პროექტები
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


    // 6. CONTACT FORM SUBMISSION AND MODAL

    const contactForm = document.querySelector('.contact-form');
    const modal = document.getElementById('successModal');
    const closeButton = document.querySelector('.close-button');
    const submitButton = document.querySelector('.contact-submit');

    // Submit  (POST to API)

    if (contactForm && modal) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Stop the default form submission

            // Temporarily disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Collect form data (using FormData for simplicity)
            const formData = new FormData(this);
            
            // Convert FormData to JSON object
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            data.userId = 1; 

            // **THE TARGET API ENDPOINT**
            const apiEndpoint = 'https://borjomi.loremipsum.ge/api/send-message';

            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                // Check if the response status is successful (HTTP 200-299)
                if (response.ok) {
                    const result = await response.json();
                    
                    // Check for the specific success status (status code 1 is typical for custom APIs)
                    if (result.status === 1) {
                        // Success logic: Show modal and reset form
                        showModal();
                        contactForm.reset(); // Clear form fields
                    } else {
                        // Handle API-specific error message
                        alert('Submission failed: ' + (result.desc || 'Unknown error.')); 
                    }
                } else {
                    // Handle HTTP error status (400, 500, etc.)
                    alert(`Error submitting form: HTTP status ${response.status}. Try again.`);
                }
            } catch (error) {
                console.error('Network or Fetch Error:', error);
                alert('An unexpected network error occurred. Please try again.');
            } finally {
                // Re-enable button and reset text
                submitButton.disabled = false;
                submitButton.textContent = 'Contact Me';
            }
        });

         // Modal 

        function showModal() {
            modal.classList.add('visible');
        }

        function hideModal() {
            modal.classList.remove('visible');
        }

        // Close modal when close button (x) is clicked
        closeButton.addEventListener('click', hideModal);

        // Close modal when pressing the ESC key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('visible')) {
                hideModal();
            }
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }


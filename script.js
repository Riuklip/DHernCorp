const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

// Close menu and restore scroll when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});
 document.addEventListener('DOMContentLoaded', function() {
            const carousel = document.querySelector('.carousel');
            const cards = document.querySelectorAll('.carousel-card');
            const indicatorBtns = document.querySelectorAll('.indicator-btn');
            const infoToggles = document.querySelectorAll('.info-toggle');
            
            let currentSlide = 0;
            const totalSlides = cards.length;
            
            // Initialize carousel
            function updateCarousel() {
                carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update dots

                
                // Update indicator buttons
                indicatorBtns.forEach((btn, index) => {
                    btn.classList.toggle('active', index === currentSlide);
                });
                
                // Close all extended info when changing slides
                document.querySelectorAll('.extended-info').forEach(info => {
                    info.classList.remove('active');
                });
                
                // Reset all info toggles
                infoToggles.forEach(toggle => {
                    toggle.classList.remove('active');
                    toggle.innerHTML = '<i class="fas fa-chevron-down"></i> More Details';
                });
            }
            
            // Next slide
            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            }
            
            // Previous slide
            function prevSlide() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            }
            
            // Go to specific slide
            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                updateCarousel();
            }
            
            // Toggle extended info
            function toggleInfo(cardNumber) {
                const info = document.getElementById(`info-${cardNumber}`);
                const toggle = document.querySelector(`.info-toggle[data-card="${cardNumber}"]`);
                
                const isActive = info.classList.contains('active');
                
                // Close all other info sections
                document.querySelectorAll('.extended-info').forEach(info => {
                    info.classList.remove('active');
                });
                
                // Reset all toggles
                infoToggles.forEach(toggle => {
                    toggle.classList.remove('active');
                    toggle.innerHTML = '<i class="fas fa-chevron-down"></i> More Details';
                });
                
                // Toggle current info if it wasn't already active
                if (!isActive) {
                    info.classList.add('active');
                    toggle.classList.add('active');
                    toggle.innerHTML = '<i class="fas fa-chevron-up"></i> Less Details';
                }
            }
            
            // Event listeners
            // prevBtn.addEventListener('click', prevSlide);
            // nextBtn.addEventListener('click', nextSlide);
            
            // dots.forEach(dot => {
            //     dot.addEventListener('click', function() {
            //         const slideIndex = parseInt(this.getAttribute('data-slide'));
            //         goToSlide(slideIndex);
            //     });
            // });
            
            indicatorBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-slide'));
                    goToSlide(slideIndex);
                });
            });
            
            infoToggles.forEach(toggle => {
                toggle.addEventListener('click', function() {
                    const cardNumber = this.getAttribute('data-card');
                    toggleInfo(cardNumber);
                });
            });
            
            // Auto-advance carousel (optional)
            // let autoSlideInterval = setInterval(nextSlide, 8000);
            
            // Pause auto-slide on hover
            // carousel.addEventListener('mouseenter', () => {
            //     clearInterval(autoSlideInterval);
            // });
            
            // carousel.addEventListener('mouseleave', () => {
            //     autoSlideInterval = setInterval(nextSlide, 8000);
         //});
            
            // Touch/swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            carousel.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            carousel.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                
                if (touchStartX - touchEndX > swipeThreshold) {
                    // Swipe left - next slide
                    nextSlide();
                } else if (touchEndX - touchStartX > swipeThreshold) {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
            
            // Initialize the carousel
            updateCarousel();
        });
// Photo Carousel Functionality
console.log('Photo carousel script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing carousels');
    
    // Find all carousels
    const carousels = document.querySelectorAll('.carousel-track');
    console.log(`Found ${carousels.length} carousel(s)`);
    
    carousels.forEach((track, index) => {
        const carouselId = track.getAttribute('data-carousel');
        console.log(`Initializing carousel: ${carouselId}`);
        
        const slides = track.querySelectorAll('.carousel-slide');
        const prevButton = document.querySelector(`.carousel-button.prev[data-carousel="${carouselId}"]`);
        const nextButton = document.querySelector(`.carousel-button.next[data-carousel="${carouselId}"]`);
        const currentSlideSpan = document.querySelector(`.current-slide[data-carousel="${carouselId}"]`);
        
        console.log(`Carousel ${carouselId}: ${slides.length} slides, prev button: ${!!prevButton}, next button: ${!!nextButton}`);
        
        let currentIndex = 0;
        
        function updateCarousel() {
            const offset = -currentIndex * 100;
            track.style.transform = `translateX(${offset}%)`;
            
            if (currentSlideSpan) {
                currentSlideSpan.textContent = currentIndex + 1;
            }
            
            // Update button states
            if (prevButton) {
                prevButton.disabled = currentIndex === 0;
                prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            }
            if (nextButton) {
                nextButton.disabled = currentIndex === slides.length - 1;
                nextButton.style.opacity = currentIndex === slides.length - 1 ? '0.5' : '1';
            }
            
            console.log(`Carousel ${carouselId} updated to slide ${currentIndex + 1}/${slides.length}`);
        }
        
        // Next button
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                console.log(`Next button clicked for ${carouselId}`);
                if (currentIndex < slides.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }
        
        // Previous button
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                console.log(`Prev button clicked for ${carouselId}`);
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            } else if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        track.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && currentIndex < slides.length - 1) {
                    // Swipe left (next)
                    currentIndex++;
                    updateCarousel();
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe right (previous)
                    currentIndex--;
                    updateCarousel();
                }
            }
        }
        
        // Initialize
        updateCarousel();
        console.log(`Carousel ${carouselId} initialized successfully`);
    });
});

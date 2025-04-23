// Quote Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const quoteSlider = {
        currentSlide: 0,
        slides: document.querySelectorAll('.quote-slide'),
        dots: document.querySelectorAll('.nav-dot'),
        
        init() {
            this.bindEvents();
            this.showSlide(0);
        },
        
        bindEvents() {
            // Navigation dots click handling
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.showSlide(index));
            });
            
            // Auto-advance slides
            setInterval(() => this.nextSlide(), 5000);
            
            // Touch events for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            document.querySelector('.quote-slider').addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });
            
            document.querySelector('.quote-slider').addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].clientX;
                this.handleSwipe();
            });
        },
        
        handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        },
        
        showSlide(index) {
            // Hide all slides
            this.slides.forEach(slide => {
                slide.style.opacity = '0';
                slide.style.display = 'none';
            });
            
            // Remove active class from all dots
            this.dots.forEach(dot => dot.classList.remove('active'));
            
            // Show current slide
            this.slides[index].style.display = 'block';
            setTimeout(() => {
                this.slides[index].style.opacity = '1';
            }, 50);
            
            // Update active dot
            this.dots[index].classList.add('active');
            this.currentSlide = index;
        },
        
        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(next);
        },
        
        prevSlide() {
            const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prev);
        }
    };
    
    // Initialize the slider
    quoteSlider.init();
});
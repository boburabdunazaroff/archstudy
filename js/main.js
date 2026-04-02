document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const scrollTop = document.getElementById('scrollTop');
    const registrationForm = document.getElementById('registrationForm');
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    const modalMessage = document.getElementById('modalMessage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const testimonialTrack = document.querySelector('.testimonial-track');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            const section = document.querySelector(link.getAttribute('href'));
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    link.classList.add('active');
                }
            }
        });
    });
    
    scrollTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
    
    function showModal(message) {
        modalMessage.textContent = message;
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function hideModal() {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeModal.addEventListener('click', hideModal);
    
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            hideModal();
        }
    });
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const course = document.getElementById('course').value;
            
            if (!fullName || !phone || !course) {
                showModal('Iltimos, barcha majburiy maydonlarni to\'ldiring!');
                return;
            }
            
            const formData = {
                fullName: fullName,
                phone: phone,
                email: document.getElementById('email').value,
                course: course,
                message: document.getElementById('message').value
            };
            
            console.log('Ro\'yxatdan o\'tish:', formData);
            
            showModal('Tabriklayman, ' + fullName + '! Siz muvaffaqiyatli ro\'yxatdan o\'tdingiz. Tez orada biz siz bilan bog\'lanamiz.');
            
            registrationForm.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#e2e8f0';
                }
            });
            
            if (!isValid) {
                showModal('Iltimos, barcha majburiy maydonlarni to\'ldiring!');
                return;
            }
            
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                subject: this.querySelectorAll('input')[2].value,
                message: this.querySelector('textarea').value
            };
            
            console.log('Kontakt xabari:', formData);
            
            showModal('Xabaringiz yuborildi! Tez orada biz siz bilan bog\'lanamiz.');
            
            contactForm.reset();
        });
    }
    
    let currentSlide = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const totalSlides = testimonialCards.length;
    
    function getSlideWidth() {
        if (window.innerWidth <= 480) {
            return 1;
        } else if (window.innerWidth <= 768) {
            return 1;
        }
        return 3;
    }
    
    function updateSlider() {
        const slideWidth = getSlideWidth();
        const maxSlide = Math.max(0, totalSlides - slideWidth);
        
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }
        
        const translateX = currentSlide * (100 / slideWidth);
        testimonialTrack.style.transform = `translateX(-${translateX}%)`;
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const slideWidth = getSlideWidth();
            const maxSlide = Math.max(0, totalSlides - slideWidth);
            
            if (currentSlide < maxSlide) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            
            updateSlider();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const slideWidth = getSlideWidth();
            const maxSlide = Math.max(0, totalSlides - slideWidth);
            
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = maxSlide;
            }
            
            updateSlider();
        });
    }
    
    window.addEventListener('resize', updateSlider);
    
    let autoSlideInterval = setInterval(() => {
        const slideWidth = getSlideWidth();
        const maxSlide = Math.max(0, totalSlides - slideWidth);
        
        if (currentSlide < maxSlide) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        
        updateSlider();
    }, 5000);
    
    const sliderContainer = document.getElementById('testimonialsSlider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                const slideWidth = getSlideWidth();
                const maxSlide = Math.max(0, totalSlides - slideWidth);
                
                if (currentSlide < maxSlide) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                
                updateSlider();
            }, 5000);
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .course-card, .teacher-card, .about-content, .about-image');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    document.querySelectorAll('.feature-card, .course-card, .teacher-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    console.log('ArchStudy website loaded successfully!');
});

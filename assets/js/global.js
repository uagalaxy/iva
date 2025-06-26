        document.addEventListener('DOMContentLoaded', () => {
            
            // --- Mobile Menu Toggle ---
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                });
                // Close menu when a link is clicked
                document.querySelectorAll('.nav-link a').forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    });
                });
            }
            
            // --- Theme Toggler ---
            const themeToggleBtn = document.getElementById('theme-toggle');
            const themeToggleBtn2 = document.getElementById('theme-toggler');
            const docElement = document.documentElement;
            const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
            const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
            
            const applyTheme = (theme) => {
                if (theme === 'dark') {
                    docElement.classList.add('dark');
                    if(themeToggleBtn) themeToggleBtn.innerHTML = sunIcon;
                    if(themeToggleBtn2) themeToggleBtn2.innerHTML = sunIcon;
                } else {
                    docElement.classList.remove('dark');
                    if(themeToggleBtn) themeToggleBtn.innerHTML = moonIcon;
                    if(themeToggleBtn2) themeToggleBtn2.innerHTML = moonIcon;
                }
            };

            const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            applyTheme(savedTheme);

            if(themeToggleBtn, themeToggleBtn2) {
                themeToggleBtn.addEventListener('click', () => {
                    const newTheme = docElement.classList.contains('dark') ? 'light' : 'dark';
                    localStorage.setItem('theme', newTheme);
                    applyTheme(newTheme);
                });
            }
            if(themeToggleBtn2) {
                themeToggleBtn2.addEventListener('click', () => {
                    const newTheme = docElement.classList.contains('dark') ? 'light' : 'dark';
                    localStorage.setItem('theme', newTheme);
                    applyTheme(newTheme);
                });
            }

            // --- Image Carousel Logic ---
            const slidesContainer = document.getElementById('carousel-slides');
            const slides = document.querySelectorAll('.carousel-slide');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const dotsContainer = document.getElementById('carousel-dots');
            
            let currentSlide = 0;
            let autoSlideInterval;
            const slideDuration = 5000; // 5 seconds for auto slide

            if (slides.length > 0) {
                // Create dots
                slides.forEach((_, i) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    dot.setAttribute('data-index', i);
                    dotsContainer.appendChild(dot);
                });

                const dots = document.querySelectorAll('.dot');

                const showSlide = (index) => {
                    // Ensure index wraps around for infinite carousel
                    currentSlide = (index + slides.length) % slides.length; 
                    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

                    // Update active dot
                    dots.forEach((dot, i) => {
                        if (i === currentSlide) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                };

                const nextSlide = () => {
                    showSlide(currentSlide + 1);
                };

                const prevSlide = () => {
                    showSlide(currentSlide - 1);
                };

                const startAutoSlide = () => {
                    clearInterval(autoSlideInterval); // Clear any existing interval
                    autoSlideInterval = setInterval(nextSlide, slideDuration);
                };

                const resetAutoSlide = () => {
                    clearInterval(autoSlideInterval);
                    startAutoSlide();
                };

                // Event Listeners for controls
                if (nextBtn) {
                    nextBtn.addEventListener('click', () => {
                        nextSlide();
                        resetAutoSlide();
                    });
                }
                if (prevBtn) {
                    prevBtn.addEventListener('click', () => {
                        prevSlide();
                        resetAutoSlide();
                    });
                }

                // Event Listeners for dots
                dots.forEach(dot => {
                    dot.addEventListener('click', (e) => {
                        showSlide(parseInt(e.target.dataset.index));
                        resetAutoSlide();
                    });
                });

                // Initial display and start auto-slide
                showSlide(currentSlide);
                startAutoSlide();

                // Handle window resize to adjust carousel position
                window.addEventListener('resize', () => {
                    slidesContainer.style.transition = 'none'; // Temporarily disable transition
                    showSlide(currentSlide); // Recalculate position
                    // Re-enable transition after a short delay
                    setTimeout(() => {
                        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
                    }, 50); 
                });
            } // End of carousel logic if (slides.length > 0)
        });
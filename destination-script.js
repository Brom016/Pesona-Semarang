// Destination Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Animation Observer for destination page elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animations to various elements
    function addAnimations() {
        // Hero content animation
        const heroContent = document.querySelector('.destination-hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in-up');
            observer.observe(heroContent);
        }

        // Quick info cards
        document.querySelectorAll('.info-card').forEach((card, index) => {
            card.classList.add('fade-in-up');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // About section
        const aboutText = document.querySelector('.about-text');
        const aboutImage = document.querySelector('.about-image');
        if (aboutText) {
            aboutText.classList.add('fade-in-left');
            observer.observe(aboutText);
        }
        if (aboutImage) {
            aboutImage.classList.add('fade-in-right');
            observer.observe(aboutImage);
        }

        // Attraction cards
        document.querySelectorAll('.attraction-card').forEach((card, index) => {
            card.classList.add('fade-in-up');
            card.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(card);
        });

        // Culinary items
        document.querySelectorAll('.culinary-item').forEach((item, index) => {
            item.classList.add('fade-in-up');
            item.style.transitionDelay = `${index * 0.15}s`;
            observer.observe(item);
        });

        // Tips cards
        document.querySelectorAll('.tip-card').forEach((card, index) => {
            card.classList.add('fade-in-left');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

        // Related destinations
        document.querySelectorAll('.related-card').forEach((card, index) => {
            card.classList.add('fade-in-up');
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }

    // Call animation function
    addAnimations();

    // View More Button handlers for attractions
    document.querySelectorAll('.view-more-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const attractionName = this.closest('.attraction-card').querySelector('h3').textContent;
            showNotification(`Detail tentang ${attractionName} akan segera tersedia!`, 'success');
        });
    });

    // Culinary item click handlers
    document.querySelectorAll('.culinary-item').forEach(item => {
        item.addEventListener('click', function() {
            const culinaryName = this.querySelector('h3').textContent;
            showNotification(`Resep dan info lengkap tentang ${culinaryName} akan segera hadir!`, 'success');
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.destination-hero-bg img');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Counter animation for ratings
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = start.toFixed(1);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Animate rating when visible
    const ratingElement = document.querySelector('.rating-text');
    if (ratingElement) {
        const ratingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ratingValue = parseFloat(ratingElement.textContent.match(/\d\.\d/)[0]);
                    animateCounter(ratingElement.querySelector('.rating-value') || 
                                   document.createElement('span'), ratingValue);
                    ratingObserver.unobserve(entry.target);
                }
            });
        });
        
        ratingObserver.observe(ratingElement);
    }

    // Image lazy loading with fade effect
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                const originalSrc = img.src;
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                // If image is already cached, show it immediately
                if (img.complete) {
                    img.style.opacity = '1';
                }
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Share functionality (if needed)
    function shareDestination() {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                showNotification('Link telah disalin ke clipboard!', 'success');
            });
        }
    }

    // Add share button if not exists
    function addShareButton() {
        const heroContent = document.querySelector('.destination-hero-content .container');
        if (heroContent && !document.querySelector('.share-btn')) {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'share-btn';
            shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Bagikan';
            shareBtn.style.cssText = `
                background: rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 0.8rem 1.5rem;
                border-radius: 25px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-top: 1rem;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
            `;
            
            shareBtn.addEventListener('click', shareDestination);
            shareBtn.addEventListener('mouseenter', () => {
                shareBtn.style.background = 'rgba(255, 255, 255, 0.3)';
                shareBtn.style.transform = 'translateY(-2px)';
            });
            shareBtn.addEventListener('mouseleave', () => {
                shareBtn.style.background = 'rgba(255, 255, 255, 0.2)';
                shareBtn.style.transform = 'translateY(0)';
            });
            
            heroContent.appendChild(shareBtn);
        }
    }

    // Add share button
    addShareButton();

    // Reading progress bar
    function addReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-primary);
            z-index: 10000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Add reading progress bar
    addReadingProgress();

    // Back to previous page functionality
    function addBackButton() {
        const breadcrumb = document.querySelector('.breadcrumb .container');
        if (breadcrumb) {
            const backBtn = document.createElement('button');
            backBtn.className = 'back-btn';
            backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Kembali';
            backBtn.style.cssText = `
                background: var(--gradient-primary);
                color: white;
                border: none;
                padding: 0.6rem 1.2rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                margin-left: 1rem;
            `;
            
            backBtn.addEventListener('click', () => {
                if (document.referrer && document.referrer.includes(window.location.host)) {
                    history.back();
                } else {
                    window.location.href = '../index.html';
                }
            });
            
            backBtn.addEventListener('mouseenter', () => {
                backBtn.style.transform = 'translateY(-2px)';
                backBtn.style.boxShadow = '0 4px 15px rgba(255, 107, 53, 0.3)';
            });
            
            backBtn.addEventListener('mouseleave', () => {
                backBtn.style.transform = 'translateY(0)';
                backBtn.style.boxShadow = 'none';
            });
            
            breadcrumb.appendChild(backBtn);
        }
    }

    // Add back button
    addBackButton();

    // Attraction card interactions
    document.querySelectorAll('.attraction-card').forEach(card => {
        let timeout;
        
        card.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                card.style.transform = 'translateY(0) scale(1)';
            }, 100);
        });
    });

    // Quick info card hover effects
    document.querySelectorAll('.info-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.background = 'white';
            card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = '#f8f9fa';
            card.style.boxShadow = 'none';
        });
    });

    // Add floating action button for quick actions
    function addFloatingActions() {
        const fabContainer = document.createElement('div');
        fabContainer.className = 'fab-container';
        fabContainer.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;

        const fabButtons = [
            { icon: 'fas fa-share-alt', action: shareDestination, title: 'Bagikan' },
            { icon: 'fas fa-bookmark', action: () => showNotification('Destinasi disimpan!', 'success'), title: 'Simpan' },
            { icon: 'fas fa-map', action: () => showNotification('Peta interaktif akan segera tersedia!', 'success'), title: 'Peta' }
        ];

        fabButtons.forEach(btn => {
            const fabBtn = document.createElement('button');
            fabBtn.innerHTML = `<i class="${btn.icon}"></i>`;
            fabBtn.title = btn.title;
            fabBtn.style.cssText = `
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--gradient-primary);
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.1rem;
            `;
            
            fabBtn.addEventListener('click', btn.action);
            fabBtn.addEventListener('mouseenter', () => {
                fabBtn.style.transform = 'scale(1.1)';
                fabBtn.style.boxShadow = '0 6px 25px rgba(255, 107, 53, 0.4)';
            });
            fabBtn.addEventListener('mouseleave', () => {
                fabBtn.style.transform = 'scale(1)';
                fabBtn.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.3)';
            });
            
            fabContainer.appendChild(fabBtn);
        });

        document.body.appendChild(fabContainer);
    }

    // Add floating action buttons
    addFloatingActions();

    console.log('🏝️ Destination page loaded successfully!');
});
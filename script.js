// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Animate destination cards
    document.querySelectorAll('.destination-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate culture cards
    document.querySelectorAll('.culture-card').forEach((card, index) => {
        card.classList.add('slide-in-left');
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    // Animate culinary cards
    document.querySelectorAll('.culinary-card').forEach((card, index) => {
        card.classList.add('slide-in-right');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Animate section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('fade-in');
        observer.observe(title);
    });

    // Animate recommendation card
    const recommendationCard = document.querySelector('.recommendation-card');
    if (recommendationCard) {
        recommendationCard.classList.add('fade-in');
        observer.observe(recommendationCard);
    }

    // Animate newsletter section
    const newsletter = document.querySelector('.newsletter-content');
    if (newsletter) {
        newsletter.classList.add('fade-in');
        observer.observe(newsletter);
    }
});

// Newsletter Form Handler
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            // Show success message
            showNotification('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
            e.target.reset();
        } else {
            showNotification('Mohon masukkan email yang valid.', 'error');
        }
    });
}

// Notification Function
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 350px;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Hero Button Animation
const heroBtn = document.querySelector('.hero-btn');
if (heroBtn) {
    heroBtn.addEventListener('click', () => {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        const rect = heroBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';

        heroBtn.style.position = 'relative';
        heroBtn.style.overflow = 'hidden';
        heroBtn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Scroll to destinations
        const destinationsSection = document.querySelector('#destinations');
        if (destinationsSection) {
            const offsetTop = destinationsSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Destination Cards Hover Effect
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });

    // Click handler for destination cards
    card.addEventListener('click', () => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    let destinationPage = '';
    
    switch(title) {
        case 'lawang sewu':
            destinationPage = 'destination/LawangSewu.html';
            break;
        case 'candi gedong songo':
            destinationPage = 'destination/GedongSongo.html';
            break;
        case 'curug indrokilo':
            destinationPage = 'destination/CurugIndrokilo.html';
            break;
        case 'kota lama':
            destinationPage = 'destination/KotaLama.html';
            break;
        case 'gunung bromo':
            destinationPage = 'destination/bromo.html';
            break;
        case 'toraja':
            destinationPage = 'destination/toraja.html';
            break;
        default:
            showNotification(`Informasi lebih lanjut tentang ${title} akan segera tersedia!`, 'success');
            return;
    }
    
    // redirect ke halaman
        window.location.href = destinationPage;
    });

});

// Recommendation Button Handler

const recommendationBtn = document.querySelector('.recommendation-btn');
if (recommendationBtn) {
    recommendationBtn.addEventListener('click', () => {
        window.location.href = 'destination/GedongSongo.html';
    });
}


// Partner Logo Interaction
document.querySelectorAll('.partner-logo').forEach(logo => {
    logo.addEventListener('click', () => {
        logo.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            logo.style.animation = '';
        }, 500);
    });
});

// Add bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }
`;
document.head.appendChild(bounceStyle);

// Culture and Culinary Cards Click Handlers
document.querySelectorAll('.culture-card, .culinary-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        showNotification(`Informasi lebih lanjut tentang ${title} akan segera hadir!`, 'success');
    });
});

// Social Links Animation
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) rotate(5deg)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) rotate(0deg)';
    });
});


// Lazy Loading for Images
// Lazy Loading for Images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;

            // Ganti src dari data-src
            img.src = img.dataset.src;

            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';

            img.onload = () => {
                img.style.opacity = '1';
            };

            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));


images.forEach(img => imageObserver.observe(img));

// Loading Screen
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
    }
});

// Add loading screen HTML if it doesn't exist
if (!document.querySelector('.loading')) {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.prepend(loading);
}

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect for back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'translateY(-3px) scale(1.1)';
    backToTopBtn.style.boxShadow = '0 6px 25px rgba(255, 107, 53, 0.4)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'translateY(0) scale(1)';
    backToTopBtn.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.3)';
});

// Console welcome message
console.log('%cWelcome to Wonderful Indonesia! 🇮🇩', 'color: #FF6B35; font-size: 24px; font-weight: bold;');
console.log('%cExplore the beauty of Indonesia with us!', 'color: #F7931E; font-size: 16px;');
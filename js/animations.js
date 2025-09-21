// Enhanced Animations for Achum's Special Place

document.addEventListener('DOMContentLoaded', function() {
    // Initialize entrance animations
    initializeEntranceAnimations();
    
    // Initialize floating elements
    initializeFloatingElements();
    
    // Initialize interactive animations
    initializeInteractiveAnimations();
});

function initializeEntranceAnimations() {
    // Staggered entrance for mood buttons
    const moodButtons = document.querySelectorAll('.mood-button');
    moodButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
    
    // Greeting text entrance
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        greeting.style.opacity = '0';
        greeting.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            greeting.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            greeting.style.opacity = '1';
            greeting.style.transform = 'scale(1)';
        }, 300);
    }
}

function initializeFloatingElements() {
    // Add random movement to floating elements
    const floatingElements = document.querySelectorAll('.tulip, .sparkle, .heart, .butterfly, .tulip-petal, .star, .confetti');
    
    floatingElements.forEach(element => {
        // Add random delay to animations
        const randomDelay = Math.random() * 5;
        element.style.animationDelay = `${randomDelay}s`;
        
        // Add hover effects
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

function initializeInteractiveAnimations() {
    // Add click animations to all interactive elements
    const interactiveElements = document.querySelectorAll('button, .game, .comfort-feature, .vent-game, .mood-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            createClickRipple(e, this);
        });
    });
    
    // Add hover animations to cards
    const cards = document.querySelectorAll('.game, .comfort-feature, .vent-game, .chat-container');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function createClickRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (element.contains(ripple)) {
            element.removeChild(ripple);
        }
    }, 600);
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes floatHeart {
        0% {
            opacity: 0;
            transform: translateY(0) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Add special effects for portal transitions
function createPortalTransitionEffect(portalType) {
    const effect = document.createElement('div');
    effect.className = 'portal-transition-effect';
    effect.style.position = 'fixed';
    effect.style.top = '0';
    effect.style.left = '0';
    effect.style.width = '100vw';
    effect.style.height = '100vh';
    effect.style.zIndex = '9999';
    effect.style.pointerEvents = 'none';
    
    // Different effects for different portals
    switch(portalType) {
        case 'happy':
            effect.style.background = 'radial-gradient(circle, rgba(255, 193, 7, 0.3), transparent)';
            break;
        case 'sad':
            effect.style.background = 'radial-gradient(circle, rgba(33, 150, 243, 0.3), transparent)';
            break;
        case 'angry':
            effect.style.background = 'radial-gradient(circle, rgba(233, 30, 99, 0.3), transparent)';
            break;
    }
    
    effect.style.opacity = '0';
    effect.style.animation = 'portalTransition 1s ease-out';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        if (document.body.contains(effect)) {
            document.body.removeChild(effect);
        }
    }, 1000);
}

// Add portal transition animation
const portalStyle = document.createElement('style');
portalStyle.textContent = `
    @keyframes portalTransition {
        0% {
            opacity: 0;
            transform: scale(0.5);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
        100% {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(portalStyle);

// Export functions for use in other files
window.createPortalTransitionEffect = createPortalTransitionEffect;
window.createClickRipple = createClickRipple;

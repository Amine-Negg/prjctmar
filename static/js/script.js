// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation class to elements when page loads
    const animateElements = document.querySelectorAll('.card, .table, .navbar, .footer, .btn');
    
    animateElements.forEach(function(element, index) {
        element.classList.add('animate-fadeIn');
        element.style.animationDelay = (index * 0.1) + 's';
    });
    
    // Enhanced Ripple Effect for Buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Match ripple color to button
            if (this.classList.contains('btn-primary')) {
                ripple.style.backgroundColor = 'rgba(44, 62, 80, 0.7)';
            } else if (this.classList.contains('btn-secondary')) {
                ripple.style.backgroundColor = 'rgba(52, 152, 219, 0.7)';
            } else if (this.classList.contains('btn-danger')) {
                ripple.style.backgroundColor = 'rgba(231, 76, 60, 0.7)';
            } else {
                ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            }
            
            this.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Form submission loading indicators
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function() {
            const submitButtons = this.querySelectorAll('button[type="submit"]');
            submitButtons.forEach(function(button) {
                button.innerHTML = '<span class="loading-spinner"></span> Processing...';
                button.disabled = true;
            });
        });
    });
    
    // Table row hover effects
    const tableRows = document.querySelectorAll('.table tr');
    tableRows.forEach(function(row) {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
        });
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Navbar active link indicator
    const navLinks = document.querySelectorAll('.nav-link');
    const currentUrl = window.location.pathname;
    
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === currentUrl) {
            link.classList.add('active');
            link.style.fontWeight = 'bold';
        }
    });

    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Check for saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
});

// Ripple effect animation
var rippleKeyframes = `
@keyframes ripple {
    to {
        transform: scale(2.5);
        opacity: 0;
    }
}`;

// FadeIn animation
var fadeInKeyframes = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}`;

// Add the styles to the head of the document
var styleElement = document.createElement('style');
styleElement.innerHTML = rippleKeyframes + fadeInKeyframes + `
.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

.loading-spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 0.15em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
}`;

document.head.appendChild(styleElement);
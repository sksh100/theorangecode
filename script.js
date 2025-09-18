// Form validation and submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('interestForm');
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirmEmail');
    const emailError = document.getElementById('emailError');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    const successMessage = document.getElementById('successMessage');
    
    // Real-time email validation
    function validateEmailMatch() {
        const email = emailInput.value.trim();
        const confirmEmail = confirmEmailInput.value.trim();
        
        if (confirmEmail && email !== confirmEmail) {
            emailError.textContent = 'Email addresses do not match';
            emailError.classList.add('show');
            confirmEmailInput.style.borderColor = '#ef4444';
            return false;
        } else {
            emailError.classList.remove('show');
            confirmEmailInput.style.borderColor = '';
            return true;
        }
    }
    
    // Email format validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone number validation
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    // Real-time validation listeners
    confirmEmailInput.addEventListener('input', validateEmailMatch);
    emailInput.addEventListener('input', function() {
        if (confirmEmailInput.value) {
            validateEmailMatch();
        }
    });
    
    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            firstName: formData.get('firstName').trim(),
            lastName: formData.get('lastName').trim(),
            email: formData.get('email').trim(),
            confirmEmail: formData.get('confirmEmail').trim(),
            phone: formData.get('phone').trim()
        };
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        // Check required fields
        if (!data.firstName) {
            errorMessage = 'First name is required';
            isValid = false;
        } else if (!data.lastName) {
            errorMessage = 'Last name is required';
            isValid = false;
        } else if (!data.email) {
            errorMessage = 'Email address is required';
            isValid = false;
        } else if (!isValidEmail(data.email)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        } else if (!data.confirmEmail) {
            errorMessage = 'Please confirm your email address';
            isValid = false;
        } else if (data.email !== data.confirmEmail) {
            errorMessage = 'Email addresses do not match';
            isValid = false;
        } else if (!data.phone) {
            errorMessage = 'Phone number is required';
            isValid = false;
        } else if (!isValidPhone(data.phone)) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
        
        if (!isValid) {
            showNotification(errorMessage, 'error');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        
        try {
            // Simulate API call (replace with actual endpoint)
            await submitFormData(data);
            
            // Show success state
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Something went wrong. Please try again.', 'error');
            
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
        }
    });
    
    // Form submission using Vercel serverless function (completely free)
    async function submitFormData(data) {
        const response = await fetch('/api/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                eventDate: '2025-10-09',
                timestamp: new Date().toISOString(),
                source: 'Your Luxury Agent Coming Soon Page'
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to submit form');
        }
        
        return response.json();
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(59, 130, 246, 0.9)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            border: 1px solid ${type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.3)'};
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            });
        }
    });
    
    // Add form field focus effects
    const formInputs = document.querySelectorAll('.form-group input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Add loading animation for better perceived performance
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Add some additional CSS for the notification system
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-message {
        flex: 1;
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .form-group.focused label {
        color: var(--bright-blue);
    }
    
    body.loaded .glass-card {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(notificationStyles);

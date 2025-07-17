/* Contact Page JavaScript - contact.js */

// Global variables
let currentStep = 1;
let selectedCategory = '';
let formData = {};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeEventListeners();
    initializeFormValidation();
    initializeAnimations();
});

// Initialize contact form functionality
function initializeContactForm() {
    // Set up category selection
    const categoryOptions = document.querySelectorAll('.category-option');
    categoryOptions.forEach(option => {
        option.addEventListener('click', function() {
            selectCategory(this.dataset.category);
            updateCategorySelection(this);
        });
        
        // Keyboard accessibility
        option.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make focusable
        option.setAttribute('tabindex', '0');
    });
    
    // Initialize form steps
    showStep(1);
    updateProgressIndicator();
}

// Initialize all event listeners
function initializeEventListeners() {
    // Phone number formatting
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', formatPhoneNumber);
    }
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', validateEmail);
    }
    
    // Auto-expand textarea
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.addEventListener('input', autoExpandTextarea);
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Enhanced button interactions
    document.querySelectorAll('.btn-cta, .btn-outline-cta, .btn').forEach(btn => {
        btn.addEventListener('click', createRippleEffect);
    });
}

// Category selection functions
function selectCategory(category) {
    selectedCategory = category;
    formData.category = category;
    
    // Update form fields based on category
    updateFormFieldsForCategory(category);
    
    // Enable next button
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function updateCategorySelection(selectedElement) {
    // Remove previous selections
    document.querySelectorAll('.category-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked element
    selectedElement.classList.add('selected');
}

function updateFormFieldsForCategory(category) {
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    // Pre-fill subject based on category
    if (subjectField) {
        switch(category) {
            case 'admissions':
                subjectField.value = 'Admissions Inquiry';
                if (messageField) {
                    messageField.placeholder = 'Please tell us about your child\'s needs, the program you\'re interested in, and any specific questions about the admission process...';
                }
                break;
            case 'support':
                subjectField.value = 'Student Support Request';
                if (messageField) {
                    messageField.placeholder = 'Please describe the support needed, including any specific concerns or challenges your child is experiencing...';
                }
                break;
            case 'general':
                subjectField.value = 'General Inquiry';
                if (messageField) {
                    messageField.placeholder = 'Please share your questions or feedback about our school, programs, or services...';
                }
                break;
            default:
                subjectField.value = '';
                if (messageField) {
                    messageField.placeholder = 'Please provide details about your inquiry...';
                }
        }
    }
}

// Multi-step form navigation
function changeStep(direction) {
    if (direction === 1) {
        // Validate current step before proceeding
        if (!validateCurrentStep()) {
            return;
        }
        
        if (currentStep < 3) {
            currentStep++;
            showStep(currentStep);
            updateProgressIndicator();
        }
    } else if (direction === -1) {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
            updateProgressIndicator();
        }
    }
}

function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    const currentStepElement = document.getElementById(`step-${getStepName(stepNumber)}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Update navigation buttons
    updateNavigationButtons();
}

function getStepName(stepNumber) {
    const stepNames = ['category', 'contact', 'message'];
    return stepNames[stepNumber - 1];
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) {
        prevBtn.style.display = currentStep === 1 ? 'none' : 'inline-block';
    }
    
    if (nextBtn) {
        nextBtn.style.display = currentStep === 3 ? 'none' : 'inline-block';
        nextBtn.disabled = currentStep === 1 && !selectedCategory;
    }
    
    if (submitBtn) {
        submitBtn.style.display = currentStep === 3 ? 'inline-block' : 'none';
    }
}

function updateProgressIndicator() {
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
        }
    });
}

// Form validation
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Real-time validation for all form fields
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => clearFieldError(field));
    });
}

function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            return selectedCategory !== '';
        case 2:
            return validateContactInformation();
        case 3:
            return validateMessageDetails();
        default:
            return true;
    }
}

function validateContactInformation() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    
    let isValid = true;
    
    if (!validateField(firstName)) isValid = false;
    if (!validateField(lastName)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(phone)) isValid = false;
    
    return isValid;
}

function validateMessageDetails() {
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    if (!validateField(subject)) isValid = false;
    if (!validateField(message)) isValid = false;
    
    // Check minimum message length
    if (message && message.value.trim().length < 10) {
        showFieldError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    if (!field) return true;
    
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (isRequired && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let feedback = field.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
    }
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
}

// Form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    if (!validateMessageDetails()) {
        return;
    }
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    
    // Collect form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.category = selectedCategory;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showSuccessMessage();
        resetForm();
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 2000);
}

function showSuccessMessage() {
    // Create success modal or notification
    const successHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 1050; min-width: 300px;">
            <i class="fas fa-check-circle me-2"></i>
            <strong>Message Sent Successfully!</strong>
            <br>We'll respond within 24 hours during business days.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const alert = document.querySelector('.alert-success');
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

function resetForm() {
    // Reset form data
    document.getElementById('contactForm').reset();
    
    // Reset step progression
    currentStep = 1;
    selectedCategory = '';
    formData = {};
    
    // Reset UI
    document.querySelectorAll('.category-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    showStep(1);
    updateProgressIndicator();
    updateNavigationButtons();
}

// Utility functions
function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // South African phone number formatting
    if (value.startsWith('27')) {
        // International format
        if (value.length >= 11) {
            value = value.replace(/(\d{2})(\d{2})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
        }
    } else if (value.startsWith('0')) {
        // Local format
        if (value.length >= 10) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
    }
    
    e.target.value = value;
}

function validateEmail(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showFieldError(e.target, 'Please enter a valid email address');
    } else {
        clearFieldError(e.target);
    }
}

function autoExpandTextarea(e) {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

// FAQ functionality
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.faq-icon');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(faq => {
        if (faq !== answer) {
            faq.classList.remove('active');
            faq.previousElementSibling.querySelector('.faq-icon').classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    icon.classList.toggle('active');
}

// Contact method functions
function showContactForm(category) {
    // Scroll to form
    document.getElementById('contact-form').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Pre-select category if provided
    if (category) {
        setTimeout(() => {
            const categoryOption = document.querySelector(`[data-category="${category}"]`);
            if (categoryOption) {
                categoryOption.click();
            }
        }, 500);
    }
}

// Location and visit functions
function getDirections() {
    const address = "Thiboloha Special School, Witsieshoek, Free State, South Africa";
    const encodedAddress = encodeURIComponent(address);
    
    // Try to open in Google Maps app first, fallback to web
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
    } else {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
}

function showLocationDetails() {
    const modal = createModal('Location Details', `
        <div class="row">
            <div class="col-md-6">
                <h6><i class="fas fa-map-marker-alt me-2"></i>Physical Location</h6>
                <p>Thiboloha Special School is located in the Witsieshoek area of the Free State Province, South Africa. The school is situated in a peaceful rural setting that provides an ideal environment for learning and development.</p>
                
                <h6><i class="fas fa-car me-2"></i>Travel Information</h6>
                <p>The school is accessible by road from major Free State towns. We recommend calling ahead to confirm directions, especially for first-time visitors.</p>
            </div>
            <div class="col-md-6">
                <h6><i class="fas fa-clock me-2"></i>Visiting Hours</h6>
                <p><strong>Monday - Friday:</strong> 8:00 AM - 4:00 PM<br>
                <strong>Weekends:</strong> By appointment only</p>
                
                <h6><i class="fas fa-info-circle me-2"></i>Visitor Guidelines</h6>
                <p>All visitors must check in at the main office. Please bring valid identification and allow extra time for security procedures.</p>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    // Show modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Clean up when modal is hidden
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

function scheduleVisit() {
    const modal = createModal('Schedule a Visit', `
        <form id="visitForm">
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="visitName" class="form-label">Full Name *</label>
                        <input type="text" class="form-control" id="visitName" required>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="visitPhone" class="form-label">Phone Number *</label>
                        <input type="tel" class="form-control" id="visitPhone" required>
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="visitEmail" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="visitEmail">
            </div>
            
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="visitType" class="form-label">Type of Visit *</label>
                        <select class="form-select" id="visitType" required>
                            <option value="">Select visit type</option>
                            <option value="tour">Campus Tour</option>
                            <option value="info">Information Session</option>
                            <option value="meet">Meet & Greet</option>
                            <option value="all">All of the Above</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="visitDate" class="form-label">Preferred Date</label>
                        <input type="date" class="form-control" id="visitDate" min="${getTodayDate()}">
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <label for="visitNotes" class="form-label">Special Requirements or Questions</label>
                <textarea class="form-control" id="visitNotes" rows="3" placeholder="Please let us know if you have any special requirements or specific areas of interest..."></textarea>
            </div>
            
            <div class="text-end">
                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary">Request Visit</button>
            </div>
        </form>
    `);
    
    document.body.appendChild(modal);
    
    // Show modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Handle form submission
    const visitForm = modal.querySelector('#visitForm');
    visitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const requiredFields = visitForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // Simulate submission
        const submitBtn = visitForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            bsModal.hide();
            showSuccessMessage();
        }, 1500);
    });
    
    // Clean up when modal is hidden
    modal.addEventListener('hidden.bs.modal', () => {
        modal.remove();
    });
}

// Utility functions
function createModal(title, content) {
    const modalHTML = `
        <div class="modal fade" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const div = document.createElement('div');
    div.innerHTML = modalHTML;
    return div.firstElementChild;
}

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Animation and scroll effects
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.contact-method-card, .staff-card, .location-card, .visit-card, .hours-card, .emergency-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Keyboard accessibility enhancements
document.addEventListener('keydown', function(e) {
    // Enhanced keyboard navigation for FAQ
    if (e.target.classList.contains('faq-question')) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFAQ(e.target);
        }
    }
    
    // Escape key to close all FAQs
    if (e.key === 'Escape') {
        document.querySelectorAll('.faq-answer.active').forEach(faq => {
            faq.classList.remove('active');
            faq.previousElementSibling.querySelector('.faq-icon').classList.remove('active');
        });
    }
    
    // Form navigation with Alt + Arrow keys
    if (e.altKey) {
        if (e.key === 'ArrowRight' && currentStep < 3) {
            e.preventDefault();
            changeStep(1);
        } else if (e.key === 'ArrowLeft' && currentStep > 1) {
            e.preventDefault();
            changeStep(-1);
        }
    }
});

// Error handling and user feedback
window.addEventListener('error', function(e) {
    console.error('Contact page error:', e.error);
    
    // Show user-friendly error message
    const errorHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 1050; min-width: 300px;">
            <i class="fas fa-exclamation-triangle me-2"></i>
            <strong>Something went wrong.</strong>
            <br>Please try again or contact us directly at (058) 713 0048.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', errorHTML);
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced search/filter functions if needed
const debouncedValidation = debounce(validateField, 300);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectCategory,
        changeStep,
        validateField,
        formatPhoneNumber,
        toggleFAQ
    };
}
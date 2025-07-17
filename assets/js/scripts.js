// Smooth scrolling for anchor links
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
        
        // Stats counter animation
        function animateStats() {
            const statNumbers = document.querySelectorAll('.stat-number');
            const targets = [50, 100, 4, 60]; // Target numbers
            
            statNumbers.forEach((stat, index) => {
                const target = targets[index];
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (index === 1) { // Percentage
                        stat.textContent = Math.floor(current) + '%';
                    } else if (index === 3) { // Plus sign
                        stat.textContent = Math.floor(current) + '+';
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 50);
            });
        }
        
        // Intersection Observer for stats animation
        const statsSection = document.querySelector('.stats');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        if (statsSection) {
            observer.observe(statsSection);
        }
        
        // Accessibility: Focus management for dropdown menus
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
                openDropdowns.forEach(dropdown => {
                    const toggle = dropdown.previousElementSibling;
                    if (toggle) {
                        toggle.click();
                        toggle.focus();
                    }
                });
            }
        });
        
        // Form validation and accessibility improvements
        function setupAccessibility() {
            // Add proper ARIA labels to form controls
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
                        const label = form.querySelector(`label[for="${input.id}"]`);
                        if (label) {
                            input.setAttribute('aria-labelledby', label.id || `label-${input.id}`);
                        }
                    }
                });
            });
        }
        
        // Initialize on DOM load
        document.addEventListener('DOMContentLoaded', function() {
            setupAccessibility();
            
            // Add loading states for better UX
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.addEventListener('click', function() {
                    if (this.type === 'submit') {
                        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
                        this.disabled = true;
                    }
                });
            });
        });
        
        // Performance optimization: Lazy load images
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
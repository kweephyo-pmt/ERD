// Member Registration System JavaScript

class RegistrationSystem {
    constructor() {
        this.currentMemberType = 'general';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFormValidation();
        this.setupFileUpload();
        this.setupPasswordStrength();
    }

    setupEventListeners() {
        // Member type selection
        const typeCards = document.querySelectorAll('.type-card');
        typeCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectMemberType(card.dataset.type);
            });
        });

        // Form submission
        const form = document.getElementById('registrationForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Real-time validation
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                this.validateField(e.target);
            });
            input.addEventListener('input', (e) => {
                this.clearFieldError(e.target);
            });
            
            // Special handling for date inputs to prevent immediate red styling
            if (input.type === 'date') {
                input.addEventListener('focus', (e) => {
                    e.target.classList.remove('invalid');
                });
            }
        });
    }

    selectMemberType(type) {
        // Update active card
        document.querySelectorAll('.type-card').forEach(card => {
            card.classList.remove('active');
        });
        document.querySelector(`[data-type="${type}"]`).classList.add('active');

        // Show corresponding form
        document.querySelectorAll('.form-section').forEach(section => {
            if (section.id === `${type}Form`) {
                section.classList.add('active');
            } else if (section.id.endsWith('Form')) {
                section.classList.remove('active');
            }
        });

        this.currentMemberType = type;
        this.updateRequiredFields();
    }

    updateRequiredFields() {
        // Clear all required attributes first
        document.querySelectorAll('input').forEach(input => {
            if (input.name !== 'password' && input.name !== 'confirmPassword' && input.name !== 'terms') {
                input.removeAttribute('required');
            }
        });

        // Add required attributes to current form fields
        const activeForm = document.querySelector(`#${this.currentMemberType}Form`);
        if (activeForm) {
            activeForm.querySelectorAll('input').forEach(input => {
                if (input.type !== 'checkbox' && input.name !== 'newsletter') {
                    input.setAttribute('required', 'required');
                }
            });
        }
    }

    setupFormValidation() {
        // Email validation
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                this.validateEmail(e.target);
            });
        });

        // Phone validation
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.formatPhoneNumber(e.target);
            });
        });

        // National ID validation
        const nationalIdInput = document.getElementById('generalNationalId');
        if (nationalIdInput) {
            nationalIdInput.addEventListener('input', (e) => {
                this.validateNationalId(e.target);
            });
        }

        // Student ID validation
        const studentIdInput = document.getElementById('studentId');
        if (studentIdInput) {
            studentIdInput.addEventListener('input', (e) => {
                this.validateStudentId(e.target);
            });
        }

        // Password confirmation
        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', (e) => {
                this.validatePasswordConfirmation();
            });
        }
    }

    setupFileUpload() {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleFileUpload(e.target);
            });

            // Drag and drop functionality
            const uploadDisplay = input.parentNode.querySelector('.file-upload-display');
            if (uploadDisplay) {
                uploadDisplay.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    uploadDisplay.classList.add('dragover');
                });

                uploadDisplay.addEventListener('dragleave', (e) => {
                    uploadDisplay.classList.remove('dragover');
                });

                uploadDisplay.addEventListener('drop', (e) => {
                    e.preventDefault();
                    uploadDisplay.classList.remove('dragover');
                    input.files = e.dataTransfer.files;
                    this.handleFileUpload(input);
                });
            }
        });
    }

    setupPasswordStrength() {
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                this.updatePasswordStrength(e.target.value);
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Specific field validations
        switch (field.type) {
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'tel':
                if (value && !this.isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number';
                }
                break;
            case 'date':
                if (value && field.name === 'dateOfBirth' && !this.isValidAge(value)) {
                    isValid = false;
                    errorMessage = 'You must be at least 13 years old';
                }
                break;
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    validateEmail(input) {
        const email = input.value.trim();
        const isValid = this.isValidEmail(email);
        this.showFieldValidation(input, isValid, isValid ? '' : 'Please enter a valid email address');
        return isValid;
    }

    validateNationalId(input) {
        const nationalId = input.value.trim();
        // Basic validation - adjust according to your country's format
        const isValid = nationalId.length >= 8 && /^[0-9]+$/.test(nationalId);
        this.showFieldValidation(input, isValid, isValid ? '' : 'Please enter a valid national ID number');
        return isValid;
    }

    validateStudentId(input) {
        const studentId = input.value.trim();
        const isValid = studentId.length >= 4;
        this.showFieldValidation(input, isValid, isValid ? '' : 'Please enter a valid student ID');
        return isValid;
    }

    validatePasswordConfirmation() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const isValid = password === confirmPassword;
        
        this.showFieldValidation(
            document.getElementById('confirmPassword'),
            isValid,
            isValid ? '' : 'Passwords do not match'
        );
        return isValid;
    }

    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{3})/, '$1-$2');
        }
        input.value = value;
    }

    handleFileUpload(input) {
        const files = input.files;
        const uploadDisplay = input.parentNode.querySelector('.file-upload-display');
        
        if (files.length > 0) {
            let fileNames = Array.from(files).map(file => file.name).join(', ');
            if (fileNames.length > 50) {
                fileNames = fileNames.substring(0, 47) + '...';
            }
            
            uploadDisplay.innerHTML = `
                <i class="fas fa-check-circle" style="color: #27ae60;"></i>
                <span style="color: #27ae60;">${files.length} file(s) selected</span>
                <small>${fileNames}</small>
            `;

            // Validate file size and type
            this.validateFiles(input, files);
        }
    }

    validateFiles(input, files) {
        const maxSize = input.name === 'legalDocs' ? 10 * 1024 * 1024 : 5 * 1024 * 1024; // 10MB for legal docs, 5MB for images
        const allowedTypes = input.name === 'legalDocs' 
            ? ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
            : ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

        let isValid = true;
        let errorMessage = '';

        for (let file of files) {
            if (file.size > maxSize) {
                isValid = false;
                errorMessage = `File size must be less than ${maxSize / (1024 * 1024)}MB`;
                break;
            }
            
            if (!allowedTypes.includes(file.type)) {
                isValid = false;
                errorMessage = 'Invalid file type';
                break;
            }
        }

        this.showFieldValidation(input, isValid, errorMessage);
        return isValid;
    }

    updatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        let strength = 0;
        let strengthLabel = '';
        let color = '#e74c3c';

        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        switch (strength) {
            case 0:
            case 1:
                strengthLabel = 'Very Weak';
                color = '#e74c3c';
                break;
            case 2:
                strengthLabel = 'Weak';
                color = '#f39c12';
                break;
            case 3:
                strengthLabel = 'Fair';
                color = '#f1c40f';
                break;
            case 4:
                strengthLabel = 'Good';
                color = '#27ae60';
                break;
            case 5:
                strengthLabel = 'Strong';
                color = '#2ecc71';
                break;
        }

        const percentage = (strength / 5) * 100;
        strengthBar.style.setProperty('--strength-width', `${percentage}%`);
        strengthBar.style.setProperty('--strength-color', color);
        strengthText.textContent = `Password strength: ${strengthLabel}`;
        strengthText.style.color = color;

        // Update CSS custom properties
        strengthBar.innerHTML = `<div style="width: ${percentage}%; height: 100%; background: ${color}; transition: all 0.3s ease;"></div>`;
    }

    showFieldValidation(field, isValid, message) {
        // Remove existing validation classes and messages
        field.classList.remove('valid', 'invalid');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        if (!isValid && message) {
            field.classList.add('invalid');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.8rem; margin-top: 0.25rem;';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        } else if (isValid && field.value.trim()) {
            field.classList.add('valid');
        }
    }

    clearFieldError(field) {
        field.classList.remove('invalid');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    handleFormSubmission() {
        const formData = this.collectFormData();
        
        if (this.validateForm(formData)) {
            this.submitForm(formData);
        }
    }

    collectFormData() {
        const formData = {
            memberType: this.currentMemberType,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            terms: document.getElementById('terms').checked,
            newsletter: document.getElementById('newsletter').checked
        };

        // Collect data based on member type
        const activeForm = document.querySelector(`#${this.currentMemberType}Form`);
        if (activeForm) {
            const inputs = activeForm.querySelectorAll('input');
            inputs.forEach(input => {
                if (input.type === 'file') {
                    formData[input.name] = input.files;
                } else {
                    formData[input.name] = input.value;
                }
            });
        }

        return formData;
    }

    validateForm(formData) {
        let isValid = true;
        const errors = [];

        // Validate required fields
        const activeForm = document.querySelector(`#${this.currentMemberType}Form`);
        if (activeForm) {
            const requiredInputs = activeForm.querySelectorAll('input[required]');
            requiredInputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
        }

        // Validate password
        if (!formData.password || formData.password.length < 8) {
            isValid = false;
            errors.push('Password must be at least 8 characters long');
        }

        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
            isValid = false;
            errors.push('Passwords do not match');
        }

        // Validate terms acceptance
        if (!formData.terms) {
            isValid = false;
            errors.push('You must accept the terms and conditions');
        }

        // Validate file uploads
        if (this.currentMemberType === 'student') {
            const idCardFile = document.getElementById('studentIdCard').files;
            if (!idCardFile || idCardFile.length === 0) {
                isValid = false;
                errors.push('Student ID card photo is required');
            }
        }

        if (this.currentMemberType === 'store') {
            const legalDocs = document.getElementById('storeLegalDocs').files;
            if (!legalDocs || legalDocs.length === 0) {
                isValid = false;
                errors.push('Legal entity documents are required');
            }
        }

        if (!isValid) {
            this.showMessage('error', 'Please correct the following errors:\n' + errors.join('\n'));
        }

        return isValid;
    }

    async submitForm(formData) {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<div class="loading"></div> Creating Account...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateApiCall(formData);
            
            // Show success message
            this.showMessage('success', 'Account created successfully! Please check your email for verification instructions.');
            
            // Reset form after delay
            setTimeout(() => {
                document.getElementById('registrationForm').reset();
                this.selectMemberType('general');
            }, 2000);
            
        } catch (error) {
            this.showMessage('error', 'Registration failed. Please try again.');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async simulateApiCall(formData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate random success/failure for demo
        if (Math.random() > 0.1) { // 90% success rate
            console.log('Registration data:', formData);
            return { success: true, message: 'Registration successful' };
        } else {
            throw new Error('Registration failed');
        }
    }

    showMessage(type, message) {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type} show`;
        messageDiv.textContent = message;
        
        // Insert at top of form
        const form = document.getElementById('registrationForm');
        form.insertBefore(messageDiv, form.firstChild);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }

    // Utility functions
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        return phoneRegex.test(phone) || /^\d{10}$/.test(phone.replace(/\D/g, ''));
    }

    isValidAge(dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age >= 13;
    }
}

// Initialize the registration system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RegistrationSystem();
});

// Additional utility functions for enhanced UX
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
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

    // Add loading animation to external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.target) {
                e.preventDefault();
                const loadingText = 'Loading...';
                const originalText = this.textContent;
                this.textContent = loadingText;
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 500);
            }
        });
    });
});

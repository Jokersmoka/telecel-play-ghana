/**
 * Telecel Play Ghana - Main JavaScript
 * Handles navigation, animations, and utility functions
 */

// ============================================================
// MOBILE MENU FUNCTIONALITY
// ============================================================

(function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  }

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = 'auto';
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  });
})();

// ============================================================
// SMOOTH SCROLL ANIMATIONS
// ============================================================

(function initScrollAnimations() {
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

  // Observe fade-up elements
  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });
})();

// ============================================================
// FORM UTILITIES
// ============================================================

const FormUtils = {
  /**
   * Format number as Ghanaian Cedis
   */
  formatGHS(value) {
    return 'GH\u20B5' + parseFloat(value).toLocaleString('en-GH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

  /**
   * Validate phone number (Telecel Ghana format)
   */
  validatePhone(phone) {
    const cleaned = phone.replace(/\s/g, '');
    return /^(05\d{8})$/.test(cleaned);
  },

  /**
   * Validate email
   */
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  /**
   * Show form error
   */
  showError(element, message) {
    if (!element) return;
    element.textContent = message;
    element.style.display = 'block';
    element.style.animation = 'slideIn 0.3s ease';
  },

  /**
   * Clear form error
   */
  clearError(element) {
    if (!element) return;
    element.style.display = 'none';
    element.textContent = '';
  },

  /**
   * Disable button with loading state
   */
  setButtonLoading(button, isLoading = true) {
    if (!button) return;
    if (isLoading) {
      button.disabled = true;
      button.dataset.originalText = button.innerHTML;
      button.innerHTML = '<span class="spinner"></span> Processing...';
    } else {
      button.disabled = false;
      button.innerHTML = button.dataset.originalText || 'Submit';
    }
  },

  /**
   * Reset button from loading state
   */
  resetButton(button) {
    if (!button) return;
    button.disabled = false;
    button.innerHTML = button.dataset.originalText || 'Submit';
  }
};

// ============================================================
// SESSION STORAGE UTILITIES
// ============================================================

const SessionUtils = {
  /**
   * Save loan parameters
   */
  saveLoanParams(amount, days) {
    sessionStorage.setItem('loan_amount', amount);
    sessionStorage.setItem('loan_days', days);
  },

  /**
   * Get loan parameters
   */
  getLoanParams() {
    return {
      amount: parseFloat(sessionStorage.getItem('loan_amount')) || 5000,
      days: parseInt(sessionStorage.getItem('loan_days')) || 60
    };
  },

  /**
   * Save application data
   */
  saveApplicationData(data) {
    Object.keys(data).forEach(key => {
      sessionStorage.setItem(`app_${key}`, data[key]);
    });
  },

  /**
   * Get application data
   */
  getApplicationData() {
    const data = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key.startsWith('app_')) {
        data[key.replace('app_', '')] = sessionStorage.getItem(key);
      }
    }
    return data;
  },

  /**
   * Clear all session data
   */
  clearAll() {
    sessionStorage.clear();
  }
};

// ============================================================
// ANALYTICS & TRACKING
// ============================================================

const Analytics = {
  /**
   * Track page view
   */
  trackPageView(pageName) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: pageName,
        page_path: window.location.pathname
      });
    }
  },

  /**
   * Track form submission
   */
  trackFormSubmission(formName) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submission', {
        form_name: formName
      });
    }
  },

  /**
   * Track button click
   */
  trackButtonClick(buttonName) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'button_click', {
        button_name: buttonName
      });
    }
  }
};

// ============================================================
// NOTIFICATION SYSTEM
// ============================================================

const Notifications = {
  /**
   * Show toast notification
   */
  show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#e00a1c' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      font-size: 0.9rem;
      z-index: 9999;
      animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideDown 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  success(message) {
    this.show(message, 'success');
  },

  error(message) {
    this.show(message, 'error');
  },

  info(message) {
    this.show(message, 'info');
  }
};

// ============================================================
// API UTILITIES
// ============================================================

const API = {
  /**
   * Make API request
   */
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  /**
   * Submit loan application
   */
  async submitApplication(data) {
    return this.request('/api/submit-application', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  /**
   * Get application status
   */
  async getApplicationStatus(refCode) {
    return this.request(`/api/application-status/${refCode}`);
  }
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Debounce function
 */
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

/**
 * Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Generate unique ID
 */
function generateId() {
  return 'TCL-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

/**
 * Format date
 */
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// ============================================================
// EXPORT FOR USE IN OTHER MODULES
// ============================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FormUtils,
    SessionUtils,
    Analytics,
    Notifications,
    API,
    debounce,
    throttle,
    generateId,
    formatDate
  };
}

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Track page view
  const pageName = document.title || 'Unknown Page';
  Analytics.trackPageView(pageName);

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+Enter to submit forms
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      const submitBtn = document.querySelector('[type="submit"], .btn-primary');
      if (submitBtn) submitBtn.click();
    }
  });
});

// ============================================================
// CSS ANIMATIONS (Injected)
// ============================================================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  .fade-up {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 6px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

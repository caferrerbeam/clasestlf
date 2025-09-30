/**
 * RoboLang Parser - Interactive JavaScript
 * Universidad EAM - Teoría de Lenguajes Formales
 * 
 * Provides interactivity for:
 * - Smooth navigation
 * - Progress tracking 
 * - Interactive checkboxes
 * - BNF link management
 * - Celebration effects
 */

class RoboLangInteractivity {
    constructor() {
        this.init();
        this.setupProgressTracking();
        this.setupSmoothScrolling();
        this.setupInteractiveCheckboxes();
        this.setupBNFLinks();
        this.setupResponsiveMenu();
        this.loadProgress();
    }

    init() {
        console.log('🤖 RoboLang Parser - Interactive System Started');
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    onDOMReady() {
        console.log('📚 DOM Ready - Initializing educational features');
        this.enhanceCodeBlocks();
        this.setupKeyboardNavigation();
        this.initializeAnimations();
    }

    /**
     * Progress Tracking System
     * Tracks completion of parser implementations
     */
    setupProgressTracking() {
        this.parserProgress = this.loadProgressFromStorage();
        this.updateProgressDisplay();
        
        // Listen for checkbox changes
        document.addEventListener('change', (event) => {
            if (event.target.classList.contains('parser-checkbox')) {
                this.handleParserProgressChange(event);
            }
        });
    }

    loadProgressFromStorage() {
        try {
            const saved = localStorage.getItem('robotlang-parser-progress');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.warn('Failed to load progress from localStorage:', error);
            return {};
        }
    }

    saveProgressToStorage() {
        try {
            localStorage.setItem('robotlang-parser-progress', JSON.stringify(this.parserProgress));
        } catch (error) {
            console.warn('Failed to save progress to localStorage:', error);
        }
    }

    handleParserProgressChange(event) {
        const checkbox = event.target;
        const parserId = checkbox.dataset.parserId;
        
        if (!parserId) return;

        // Prevent page jump when clicking checkbox
        event.preventDefault();
        
        // Toggle the checkbox state manually
        checkbox.checked = !checkbox.checked;
        
        // Update progress
        this.parserProgress[parserId] = checkbox.checked;
        this.saveProgressToStorage();
        this.updateProgressDisplay();
        
        // Visual feedback
        this.showProgressFeedback(checkbox, parserId);
        
        // Check for completion celebration
        if (this.isAllParsersCompleted()) {
            this.showCompletionCelebration();
        }
    }

    updateProgressDisplay() {
        const totalParsers = 16;
        const completedParsers = Object.values(this.parserProgress).filter(Boolean).length;
        const progressPercentage = Math.round((completedParsers / totalParsers) * 100);
        
        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        // Update progress stats
        const completedStat = document.querySelector('.stat-number[data-stat=\"completed\"]');
        const remainingStat = document.querySelector('.stat-number[data-stat=\"remaining\"]');
        const percentageStat = document.querySelector('.stat-number[data-stat=\"percentage\"]');
        
        if (completedStat) completedStat.textContent = completedParsers;
        if (remainingStat) remainingStat.textContent = totalParsers - completedParsers;
        if (percentageStat) percentageStat.textContent = `${progressPercentage}%`;
        
        // Update any progress indicators on the main page
        this.updateMainPageProgress();
    }

    updateMainPageProgress() {
        // Update the progress card on index.html if present
        const progressCard = document.querySelector('.progress-card[data-type=\"completed\"]');
        if (progressCard) {
            const numberElement = progressCard.querySelector('.progress-number');
            if (numberElement) {
                const completedCount = Object.values(this.parserProgress).filter(Boolean).length;
                numberElement.textContent = completedCount;
            }
        }
    }

    showProgressFeedback(checkbox, parserId) {
        const card = checkbox.closest('.parser-card');
        if (!card) return;

        if (checkbox.checked) {
            // Mark as completed
            card.classList.add('completed');
            this.createRippleEffect(checkbox, '#10b981'); // Green
            
            // Show completion message
            this.showToast(`✅ ${parserId} completado!`, 'success');
        } else {
            // Mark as incomplete
            card.classList.remove('completed');
            this.createRippleEffect(checkbox, '#ef4444'); // Red
            
            this.showToast(`⏳ ${parserId} marcado como pendiente`, 'info');
        }
    }

    isAllParsersCompleted() {
        const totalParsers = 16;
        const completedParsers = Object.values(this.parserProgress).filter(Boolean).length;
        return completedParsers === totalParsers;
    }

    showCompletionCelebration() {
        // Create celebration modal
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <h2>🎉 ¡Felicitaciones!</h2>
                <p>Has completado todos los 16 parsers de RoboLang</p>
                <p>Ahora eres un experto en implementación de parsers</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">
                    ¡Increíble! 🚀
                </button>
            </div>
        `;
        
        document.body.appendChild(celebration);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (celebration.parentElement) {
                celebration.remove();
            }
        }, 10000);
        
        // Trigger confetti effect
        this.createConfettiEffect();
    }

    /**
     * Smooth Scrolling Navigation
     */
    setupSmoothScrolling() {
        // Handle internal navigation links
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href^=\"#\"]');
            if (link) {
                event.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Add smooth scroll to back-to-top functionality
        this.addBackToTopButton();
    }

    addBackToTopButton() {
        // Create back to top button
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('aria-label', 'Volver arriba');
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: var(--primary-blue);
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        `;
        
        document.body.appendChild(backToTop);
        
        // Show/hide based on scroll position
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 300) {
                    backToTop.style.opacity = '1';
                    backToTop.style.visibility = 'visible';
                } else {
                    backToTop.style.opacity = '0';
                    backToTop.style.visibility = 'hidden';
                }
            }, 100);
        });
        
        // Smooth scroll to top
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Interactive Checkboxes
     * Prevents page jump and provides immediate feedback
     */
    setupInteractiveCheckboxes() {
        // Custom checkbox styling and behavior
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('parser-checkbox')) {
                // Prevent default to avoid page jump
                event.preventDefault();
                
                // The actual toggle is handled in handleParserProgressChange
                // This just prevents the default behavior
            }
        });

        // Keyboard accessibility for checkboxes
        document.addEventListener('keydown', (event) => {
            if (event.target.classList.contains('parser-checkbox') && 
                (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                event.target.click();
            }
        });
    }

    /**
     * BNF Links Management
     * Dynamic handling of grammar references
     */
    setupBNFLinks() {
        this.enhanceBNFLinks();
        this.createBNFTooltips();
    }

    enhanceBNFLinks() {
        const bnfLinks = document.querySelectorAll('.bnf-link');
        
        bnfLinks.forEach(link => {
            // Add visual indicators
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateX(4px)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateX(0)';
            });
            
            // Track clicks for analytics (if needed)
            link.addEventListener('click', () => {
                console.log(`📖 BNF Grammar opened: ${link.getAttribute('href')}`);
            });
        });
    }

    createBNFTooltips() {
        // Create tooltip for BNF grammar explanations
        const bnfCodes = document.querySelectorAll('.bnf-inline code');
        
        bnfCodes.forEach(code => {
            code.addEventListener('mouseenter', (event) => {
                this.showBNFTooltip(event.target, this.getBNFExplanation(code.textContent));
            });
            
            code.addEventListener('mouseleave', () => {
                this.hideBNFTooltip();
            });
        });
    }

    getBNFExplanation(bnfText) {
        const explanations = {
            '<number>': 'Representa un número entero positivo (secuencia de dígitos)',
            '<boolean>': 'Valor booleano: true o false',
            '<if_stmt>': 'Estructura condicional con condición entre paréntesis',
            '<condition>': 'Expresión que evalúa a verdadero o falso',
            '<statement_block>': 'Bloque de comandos entre llaves { }',
            '<movement_command>': 'Comando de movimiento del robot',
            '<comparison>': 'Comparación entre dos valores con un operador'
        };
        
        for (const [pattern, explanation] of Object.entries(explanations)) {
            if (bnfText.includes(pattern)) {
                return explanation;
            }
        }
        
        return 'Regla de gramática BNF - Click para ver diagrama visual';
    }

    showBNFTooltip(element, text) {
        this.hideBNFTooltip(); // Remove any existing tooltip
        
        const tooltip = document.createElement('div');
        tooltip.className = 'bnf-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--bg-dark);
            color: var(--text-white);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.875rem;
            max-width: 250px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.bottom + 8) + 'px';
        
        // Store reference for cleanup
        this.currentTooltip = tooltip;
    }

    hideBNFTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }

    /**
     * Responsive Menu
     */
    setupResponsiveMenu() {
        const navSections = document.querySelector('.nav-sections');
        if (!navSections) return;

        // Create mobile menu toggle
        const menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Menú de navegación');
        menuToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 8px;
        `;
        
        const navContent = document.querySelector('.nav-content');
        if (navContent) {
            navContent.insertBefore(menuToggle, navSections);
        }
        
        // Mobile menu functionality
        menuToggle.addEventListener('click', () => {
            navSections.classList.toggle('mobile-open');
            menuToggle.innerHTML = navSections.classList.contains('mobile-open') ? '✕' : '☰';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!navSections.contains(event.target) && 
                !menuToggle.contains(event.target) && 
                navSections.classList.contains('mobile-open')) {
                navSections.classList.remove('mobile-open');
                menuToggle.innerHTML = '☰';
            }
        });
        
        // Responsive breakpoint handling
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleResponsiveMenu = (e) => {
            if (e.matches) {
                menuToggle.style.display = 'block';
                navSections.style.cssText = `
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(0, 0, 0, 0.9);
                    flex-direction: column;
                    padding: 1rem;
                `;
            } else {
                menuToggle.style.display = 'none';
                navSections.style.cssText = '';
                navSections.classList.remove('mobile-open');
                menuToggle.innerHTML = '☰';
            }
        };
        
        mediaQuery.addListener(handleResponsiveMenu);
        handleResponsiveMenu(mediaQuery);
    }

    /**
     * Code Enhancement
     */
    enhanceCodeBlocks() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            // Add copy button to code blocks
            this.addCopyButton(block);
            
            // Add line numbers for longer code blocks
            if (block.textContent.split('\n').length > 3) {
                this.addLineNumbers(block);
            }
        });
    }

    addCopyButton(codeBlock) {
        const pre = codeBlock.parentElement;
        if (!pre || pre.tagName !== 'PRE') return;
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '📋';
        copyButton.setAttribute('aria-label', 'Copiar código');
        copyButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            border-radius: 4px;
            color: white;
            padding: 4px 8px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        // Show/hide copy button
        pre.addEventListener('mouseenter', () => copyButton.style.opacity = '1');
        pre.addEventListener('mouseleave', () => copyButton.style.opacity = '0');
        
        // Copy functionality
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                copyButton.innerHTML = '✅';
                this.showToast('Código copiado al portapapeles', 'success');
                
                setTimeout(() => {
                    copyButton.innerHTML = '📋';
                }, 2000);
            } catch (error) {
                console.warn('Failed to copy code:', error);
                this.showToast('Error al copiar código', 'error');
            }
        });
    }

    addLineNumbers(codeBlock) {
        const lines = codeBlock.textContent.split('\n');
        const lineNumbers = lines.map((_, index) => index + 1).join('\n');
        
        const lineNumbersElement = document.createElement('span');
        lineNumbersElement.className = 'line-numbers';
        lineNumbersElement.textContent = lineNumbers;
        lineNumbersElement.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            padding: inherit;
            color: rgba(255, 255, 255, 0.4);
            user-select: none;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            margin-right: 1rem;
        `;
        
        const pre = codeBlock.parentElement;
        pre.style.paddingLeft = '3rem';
        pre.insertBefore(lineNumbersElement, codeBlock);
    }

    /**
     * Keyboard Navigation
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            // Alt + Arrow keys for section navigation
            if (event.altKey) {
                const navItems = document.querySelectorAll('.nav-item');
                const currentIndex = Array.from(navItems).findIndex(item => 
                    item.classList.contains('active'));
                
                if (event.key === 'ArrowRight' && currentIndex < navItems.length - 1) {
                    event.preventDefault();
                    navItems[currentIndex + 1].click();
                } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
                    event.preventDefault();
                    navItems[currentIndex - 1].click();
                }
            }
            
            // Escape key to close modals/tooltips
            if (event.key === 'Escape') {
                this.hideBNFTooltip();
                const celebration = document.querySelector('.celebration');
                if (celebration) celebration.remove();
            }
        });
    }

    /**
     * Animations and Effects
     */
    initializeAnimations() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe sections and cards
        const animateElements = document.querySelectorAll(
            '.content-section, .section-card, .parser-card, .step-card'
        );
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    createRippleEffect(element, color = '#3b82f6') {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: ${color};
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s linear;
            opacity: 0.6;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    createConfettiEffect() {
        const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    z-index: 10000;
                    pointer-events: none;
                    animation: confetti-fall 3s linear forwards;
                `;
                
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }

    /**
     * Toast Notifications
     */
    showToast(message, type = 'info') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#3b82f6',
            warning: '#f59e0b'
        };
        
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: ${colors[type] || colors.info};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-weight: 600;
            animation: toast-in 0.3s ease forwards;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toast-out 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /**
     * Load progress from previous sessions
     */
    loadProgress() {
        // Apply saved progress to checkboxes
        const checkboxes = document.querySelectorAll('.parser-checkbox');
        checkboxes.forEach(checkbox => {
            const parserId = checkbox.dataset.parserId;
            if (this.parserProgress[parserId]) {
                checkbox.checked = true;
                const card = checkbox.closest('.parser-card');
                if (card) card.classList.add('completed');
            }
        });
    }
}

/**
 * CSS Animations (injected dynamically)
 */
function injectAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes confetti-fall {
            to {
                transform: translateY(100vh) rotate(720deg);
            }
        }
        
        @keyframes toast-in {
            from {
                transform: translateX(-50%) translateY(100px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes toast-out {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(100px);
                opacity: 0;
            }
        }
        
        @keyframes animate-in {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: animate-in 0.6s ease forwards;
        }
        
        .nav-sections.mobile-open {
            display: flex !important;
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Initialize the interactive system
 */
document.addEventListener('DOMContentLoaded', () => {
    injectAnimations();
    new RoboLangInteractivity();
});

/**
 * Global utility functions
 */
window.RoboLangUtils = {
    // Create BNF link with proper anchor
    createBNFLink(grammarName, displayText) {
        return `<a href="robotlangbnf.html#${grammarName}" target="_blank" class="bnf-link">${displayText}</a>`;
    },
    
    // Format parser name for display
    formatParserName(parserName) {
        return parserName.replace(/([A-Z])/g, ' $1').trim();
    },
    
    // Get difficulty level for parser
    getParserDifficulty(parserName) {
        const levels = {
            basic: ['NumberParser', 'BooleanParser', 'BooleanSensorParser', 'NumericSensorParser'],
            medium: ['MovementCommandParser', 'PenCommandParser', 'SimpleCommandParser'],
            advanced: ['ComparisonExpressionParser', 'NotExpressionParser', 'AndExpressionParser', 'OrExpressionParser', 'ConditionParser'],
            expert: ['IfStatementParser', 'WhileStatementParser', 'RepeatStatementParser', 'StatementBlockParser']
        };
        
        for (const [level, parsers] of Object.entries(levels)) {
            if (parsers.includes(parserName)) return level;
        }
        return 'basic';
    }
};

console.log('🚀 RoboLang Parser Interactive System Ready');